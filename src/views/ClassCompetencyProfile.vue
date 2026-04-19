<template>
  <div class="dashboard-wrapper">
    <div id="app" class="fade-in">
      <div class="human-watermark"></div>
      <div class="particles" id="particles-box">
        <div 
          v-for="(p, i) in particles" :key="i" class="particle"
          :style="{ left: p.left, top: p.top, animationDuration: p.duration, animationDelay: p.delay }"
        ></div>
      </div>

      <aside class="layout-side">
        <div class="panel panel-full clustering-panel">
          <div class="panel-title">班级优势基因图谱</div>
          
          <div ref="clusteringChartRef" class="clustering-chart"></div>
          
          <div class="cluster-cards-wrapper">
            <div class="cluster-card overall-card" style="--theme-color: #F59E0B; --theme-color-dark: #B45309" @click="handleCardClick('all', '全部学生')">
              <div class="card-header">
                <span class="badge">全部学员</span>
                <span class="count" style="color: #B45309;">综合前三</span>
              </div>
              <div class="top3-list">
                <div v-for="(stu, index) in clusteringData.overall_top3" :key="'overall-'+index" class="top3-item">
                  <span class="rank" :class="`rank-${index+1}`">
                    <i v-if="index === 0">👑</i><i v-else-if="index === 1">🥈</i><i v-else>🥉</i>
                  </span>
                  <span class="name">{{ stu.name }}</span>
                  <span class="score">{{ stu.score }}分</span>
                </div>
                <div v-if="!clusteringData.overall_top3 || clusteringData.overall_top3.length === 0" class="no-data">暂无突出代表</div>
              </div>
            </div>
            <div 
              v-for="cat in sortedCategories" :key="cat.l1Name"
              class="cluster-card"
              :style="{'--theme-color': l1Colors[cat.l1Name][0], '--theme-color-dark': l1Colors[cat.l1Name][1]}"
              @mouseenter="highlightPie(cat.l1Name)"
              @mouseleave="downplayPie(cat.l1Name)"
              @click="handleCardClick('category', cat.l1Name)"
            >
              <div class="card-header">
                <span class="badge">{{ cat.data.badge }}</span>
                <span class="count">{{ cat.data.count }}人 ({{ cat.data.ratio }}%)</span>
              </div>
              <div class="top3-list">
                <div v-for="(stu, index) in cat.data.top3" :key="index" class="top3-item">
                  <span class="rank" :class="`rank-${index+1}`">
                    <i v-if="index === 0">👑</i><i v-else-if="index === 1">🥈</i><i v-else>🥉</i>
                  </span>
                  <span class="name">{{ stu.name }}</span>
                  <span class="score">{{ stu.score }}分</span>
                </div>
                <div v-if="cat.data.top3.length === 0" class="no-data">暂无突出代表</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="layout-merged panel">
        <div class="merged-left">
          <header class="center-header">
            <h1>班级能力宏观画像</h1>
          </header>
          <section class="center-info">
            <div class="info-item">
              <span class="info-label">当前分析班级</span>
              <select class="info-val class-selector" v-model="currentClass" @change="updateAllCharts">
                <option v-for="cls in availableClasses" :key="cls" :value="cls">{{ cls }}</option>
              </select>
            </div>
            <div class="info-item"><span class="info-label">班级综合均分</span><span class="info-val s-rank">{{ currentClassAvg }}</span></div>
            <div class="info-item"><span class="info-label">年级综合均分</span><span class="info-val" style="color:#64748B;">{{ gradeAvg }}</span></div>
          </section>
          
          <section class="center-radar-container">
            <div ref="mainLineChart" id="main-radar"></div>
          </section>
          
          <section class="center-ai">
            <div class="ai-title">AI 综合洞察</div>
            <div class="ai-text" v-html="insightText"></div>
          </section>
        </div>

        <div class="merged-divider"></div>

        <div class="merged-right" :class="{'sweep-anim': isSweeping}" :style="resonanceStyle">
          <div class="panel-title" :style="{ color: currentThemeColor }">
            {{ currentFocusL2 ? `【${currentSession}】${currentFocusL2} - 三级指标对比` : '请在左侧曲线点击指标下钻' }}
          </div>
          <div ref="rightDetailChart" class="chart-box"></div>
        </div>
      </main>

      <div 
        v-if="cardState.visible" 
        class="custom-tooltip-card fade-in-fast"
        :class="{'is-pinned': cardState.pinned}"
        :style="{ left: cardState.x + 'px', top: cardState.y + 'px', borderColor: cardState.color }"
        v-html="cardState.html"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import classStats from './class_and_grade_stats.json';

const router = useRouter(); 

const rightDetailChart = ref(null);
const mainLineChart = ref(null);
const clusteringChartRef = ref(null); // 2. 新增：左侧极光环形图的 Ref

let charts = {};

const availableClasses = Object.keys(classStats).filter(k => k !== '年级全体');
const currentClass = ref(availableClasses.length > 0 ? availableClasses[0] : '');

const currentFocusL1 = ref('学业水平');
const currentFocusL2 = ref('知识掌握');
const currentSession = ref('课次十');
const insightText = ref('班级在<span class="strength">AI素养</span>与<span class="strength">常规知识掌握</span>方面表现优异。但在<span class="weakness">复杂问题攻坚</span>存在断层，建议结合自动化测验工具进行强化。');

const sessionsOrder = ['上课前', '课次一', '课次二', '课次三', '课次四', '课次五', '课次六', '课次七', '课次八', '课次九', '课次十'];

const isSweeping = ref(false);
const cardState = ref({ visible: false, pinned: false, x: 0, y: 0, html: '', color: '#1D4ED8' });

const l1Colors = {
  'AI素养': ['#3B82F6', '#1D4ED8'],   
  '学业水平': ['#10B981', '#047857'], 
  '科学思维': ['#F59E0B', '#B45309'], 
  '调控能力': ['#8B5CF6', '#6D28D9'], 
  '社会协同': ['#EC4899', '#BE185D'], 
  '默认': ['#3B82F6', '#1D4ED8']
};
const currentThemeColor = computed(() => l1Colors[currentFocusL1.value]?.[1] || l1Colors['默认'][1]);

const resonanceStyle = computed(() => {
  const color = l1Colors[currentFocusL1.value] ? l1Colors[currentFocusL1.value][0] : '#3B82F6';
  return { boxShadow: `inset 0 0 80px 0 ${color}15`, '--sweep-color': color };
});

const l1ToL2Mapping = {
  'AI素养': { '课前探究': ['AI工具预习使用率', 'AI生成预习资料利用率'], '课堂交互': ['课堂AI互动工具参与率', 'AI内容提问质量'], '课后拓展': ['课后AI作业辅助使用率', 'AI推荐拓展内容学习时长'] },
  '学业水平': { '知识掌握': ['知识内化率', '知识长效巩固度', '知识迁移应用度'], '题型攻坚': ['基础概念解析率', '逻辑表达与重构率', '复杂问题攻坚率'], '学科能力': ['多模态信息提取力', '科学逻辑推理力', '实践操作验证力'] },
  '科学思维': { '思维敏捷': ['信息处理响应度', '限时抗压效能'], '批判发散': ['批判质疑探究度', '多向思维发散度'], '自我认知': ['自我认知校准度', '深度归因复盘率'] },
  '调控能力': { '时间规划': ['任务节奏适配度', '全局效能把控度'], '测评应对': ['风险规避调控率', '审慎核验校验率'], '绩效抗压': ['绩效表现波动率', '操作细节严谨度'], '学术自律': ['测评规则遵从度', '学术原创自律度'] },
  '社会协同': { '个性潜能': ['个性化优势区', '待唤醒提升区'], '发展增值': ['自我超越增值度', '群体竞争位移度'], '团队协同': ['团队协同贡献比', '朋辈互助辐射度'] }
};

const getL1Trend = (scope, l1Name) => sessionsOrder.map(s => classStats[scope]?.[s]?.[l1Name]?.l1_avg || 0);
const getL1AvgTrend = (scope) => sessionsOrder.map(s => {
  let sum = 0, count = 0;
  Object.keys(l1ToL2Mapping).forEach(l1 => { if (classStats[scope]?.[s]?.[l1]) { sum += classStats[scope][s][l1].l1_avg; count++; } });
  return count ? (sum / count).toFixed(1) : 0;
});
const getL3Details = (scope, session, l1, l2, l3Keys) => {
  const details = classStats[scope]?.[session]?.[l1]?.l2?.[l2]?.l3_details || {};
  return l3Keys.map(k => details[k] || 0);
};

const currentClassAvg = computed(() => getL1AvgTrend(currentClass.value)[10] || 0);
const gradeAvg = computed(() => getL1AvgTrend('年级全体')[10] || 0);

// 3. 新增：左侧聚类数据的计算属性
const clusteringData = computed(() => {
  return classStats[currentClass.value]?.clustering || { total_students: 0, categories: {} };
});
const sortedCategories = computed(() => {
  const cats = clusteringData.value.categories;
  if (!cats) return [];
  // 将对象转为数组并按人数(count)降序排列
  return Object.entries(cats)
    .map(([l1Name, data]) => ({ l1Name, data }))
    .sort((a, b) => b.data.count - a.data.count);
});

// 4. 新增：Hover 卡片时高亮 ECharts 扇区的交互方法
const highlightPie = (l1Name) => {
  if (charts.clustering) {
    charts.clustering.dispatchAction({ type: 'highlight', name: l1Name });
  }
};
const downplayPie = (l1Name) => {
  if (charts.clustering) {
    charts.clustering.dispatchAction({ type: 'downplay', name: l1Name });
  }
};

// 新增：处理卡片点击事件
const handleCardClick = (categoryType, categoryName = '') => {
  // 存储学生类别到localStorage
  localStorage.setItem('studentCategory', JSON.stringify({
    type: categoryType,
    name: categoryName,
    classId: currentClass.value
  }));
  
  // 跳转到StudentCompetrncyProfile页面
  router.push('/student-archive/competrncy/101');
};

window.handleClassL2Click = (l1Name, l2Name, sessionLabel) => {
  currentFocusL1.value = l1Name;
  currentFocusL2.value = l2Name;
  currentSession.value = sessionLabel;
  isSweeping.value = true;
  setTimeout(() => { isSweeping.value = false; }, 400);
  
  // 补上 nextTick 确保 Vue 响应式状态更新完毕后再重绘 Echarts
  nextTick(() => {
    updateRightDetailChart();
  });
};

const updateRightDetailChart = () => {
  if (!charts.rightDetail) return;
  const l1Name = currentFocusL1.value; const l2Name = currentFocusL2.value; const l3Keys = l1ToL2Mapping[l1Name][l2Name]; const sessionLabel = currentSession.value;
  const classL3Values = getL3Details(currentClass.value, sessionLabel, l1Name, l2Name, l3Keys);
  const gradeL3Values = getL3Details('年级全体', sessionLabel, l1Name, l2Name, l3Keys);
  const themeColors = l1Colors[l1Name] || l1Colors['默认'];

  charts.rightDetail.setOption({
    tooltip: { trigger: 'item' },
    legend: { data: ['本班均值', '年级均值'], top: 0, left: 0, textStyle: { color: '#000', fontSize: 13 } },
    grid: { top: 40, height: '40%', left: 40, right: 20 },
    xAxis: { type: 'value', min: 60, max: 100, axisLabel: { color: '#000', fontSize: 12 }, splitLine: { lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.1)' } } },
    yAxis: { type: 'category', data: l3Keys, inverse: true, axisLabel: { color: '#000', fontSize: 13, interval: 0, formatter: v => v.length > 5 ? v.slice(0,5)+'\n'+v.slice(5) : v }, axisLine: { lineStyle: { color: 'rgba(0,0,0,0.25)' } } },
    series: [
      { name: '本班均值', type: 'bar', barWidth: 12, data: classL3Values, itemStyle: { color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{offset: 0, color: themeColors[0]}, {offset: 1, color: themeColors[1]}]), borderRadius: [0, 4, 4, 0] }, label: { show: true, position: 'right', color: themeColors[1], fontSize: 13, fontWeight: 'bold' } },
      { name: '年级均值', type: 'bar', barWidth: 12, data: gradeL3Values, itemStyle: { color: 'rgba(148, 163, 184, 0.5)', borderRadius: [0, 4, 4, 0] }, label: { show: false } },
      { name: '三级指标结构', type: 'pie', roseType: 'radius', radius: ['15%', '35%'], center: ['50%', '78%'], data: l3Keys.map((k, i) => ({ name: k, value: classL3Values[i] })), itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 }, label: { show: true, formatter: '{b}\n{c}分', fontSize: 13, color: '#000', fontWeight: 'bold' }, color: [themeColors[0], themeColors[1], '#FCD34D', '#FCA5A5', '#A78BFA'] }
    ]
  }, true);
};

const buildTooltipHtml = (l1Name, sessionLabel, score, color) => {
  const l2Mapping = l1ToL2Mapping[l1Name];
  let html = `<div style="color:${color}; font-size:16px; font-weight:900; border-bottom:2px solid rgba(0,0,0,0.1); padding-bottom:6px; margin-bottom:8px;">【${sessionLabel}】${l1Name} 得分: ${score}分</div>`;
  html += `<div style="font-size:12px; color:#DC2626; margin-bottom:23px; font-weight:bold;">👉 点击下方柱状图，右侧刷新明细</div>`;
  html += `<div style="display:flex; justify-content:space-around; align-items:flex-end; height:120px; padding-bottom:5px;">`;
  for (let l2Name in l2Mapping) {
    const l2Avg = classStats[currentClass.value]?.[sessionLabel]?.[l1Name]?.l2?.[l2Name]?.l2_avg || 0;
    const barHeight = Math.max(10, ((l2Avg - 60) / 40) * 80 + 20); 
    html += `<div onclick="event.stopPropagation(); window.handleClassL2Click('${l1Name}', '${l2Name}', '${sessionLabel}')" 
              style="cursor:pointer; display:flex; flex-direction:column; align-items:center; width:45px; transition:0.2s;"
                  onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
              <span style="font-size:13px; font-weight:900; color:#000; margin-bottom:4px;">${l2Avg}</span>
              <div style="width:20px; height:${barHeight}px; background:linear-gradient(to top, ${color}66, ${color}); border-radius:4px 4px 0 0; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
              <span style="font-size:12px; font-weight:bold; color:#333; margin-top:6px; text-align:center; line-height:1.2;">${l2Name.slice(0,2)}<br/>${l2Name.slice(2)}</span>
            </div>`;
  }
  html += `</div>`;
  return html;
};

const updateAllCharts = () => {
  const textColor = '#000000'; const axisColor = 'rgba(0, 0, 0, 0.25)'; const splitColor = 'rgba(0, 0, 0, 0.12)';
  const commonAxis = { axisLabel: { color: textColor, fontSize: 13, margin: 8 }, axisLine: { lineStyle: { color: axisColor } }, splitLine: { show: false } };
  const cls = currentClass.value;

  updateRightDetailChart();

  const aiTrend = getL1Trend(cls, 'AI素养'); const eduTrend = getL1Trend(cls, '学业水平'); const sciTrend = getL1Trend(cls, '科学思维');
  const regTrend = getL1Trend(cls, '调控能力'); const socTrend = getL1Trend(cls, '社会协同');
  const classAvgTrend = getL1AvgTrend(cls); const gradeAvgTrend = getL1AvgTrend('年级全体');

  const classLinesData = [...aiTrend, ...eduTrend, ...sciTrend, ...regTrend, ...socTrend].map(Number).filter(v => v > 0);
  const yMin = classLinesData.length ? Math.max(60, Math.floor(Math.min(...classLinesData)) - 2) : 60;
  const yMax = classLinesData.length ? Math.min(100, Math.ceil(Math.max(...classLinesData)) + 2) : 100;

  charts.mainLine.setOption({ 
    tooltip: { show: false }, 
    legend: [
      { data: ['AI素养', '学业水平', '科学思维', '调控能力', '社会协同'], bottom: '6%', textStyle: { color: textColor, fontSize: 13 }, icon: 'roundRect' },
      { data: ['本班综合均值', '年级综合均值'], bottom: '0%', textStyle: { color: textColor, fontSize: 13 }, icon: 'roundRect' }
    ],
    grid: { top: 20, bottom: 85, left: 45, right: 20 }, 
    xAxis: { type: 'category', boundaryGap: true, data: sessionsOrder, ...commonAxis }, 
    yAxis: { type: 'value', min: yMin, max: yMax, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor, type: 'dashed' } } }, 
    series: [ 
      { name: '本班综合均值', type: 'bar', barWidth: '35%', itemStyle: { color: 'rgba(29, 78, 216, 0.4)', borderRadius: [4,4,0,0] }, data: classAvgTrend },
      { name: '年级综合均值', type: 'bar', barWidth: '35%', itemStyle: { color: 'rgba(148, 163, 184, 0.3)', borderRadius: [4,4,0,0] }, data: gradeAvgTrend },
      { name: 'AI素养', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['AI素养'][0] }, data: aiTrend }, 
      { name: '学业水平', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['学业水平'][0] }, data: eduTrend }, 
      { name: '科学思维', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['科学思维'][0] }, data: sciTrend }, 
      { name: '调控能力', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['调控能力'][0] }, data: regTrend }, 
      { name: '社会协同', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['社会协同'][0] }, data: socTrend }
    ] 
  });

  // 5. 新增：更新左侧环形图
  if (charts.clustering) {
    const pieData = sortedCategories.value.map(cat => ({
      name: cat.l1Name,
      value: cat.data.count,
      itemStyle: { color: l1Colors[cat.l1Name][0] }
    })).filter(v => v.value > 0);

    charts.clustering.setOption({
      tooltip: { trigger: 'item', formatter: '{b} ({c}人)' },
      title: { 
        text: `{val|${clusteringData.value.total_students}}\n{label|班级总人数}`, 
        left: 'center', top: 'center', 
        textStyle: { rich: { val: { fontSize: 28, fontWeight: '900', color: '#1D4ED8' }, label: { fontSize: 13, color: '#64748B', paddingTop: 6 } } } 
      },
      series: [{
        type: 'pie', radius: ['55%', '80%'], avoidLabelOverlap: false,
        itemStyle: { borderRadius: 4, borderColor: '#F1F5F9', borderWidth: 2 },
        label: { show: false }, // 隐藏原生标签，因为卡片已经展示了详情
        data: pieData
      }]
    });
  }
};

const initEChartsInstances = () => {
  charts = { 
    rightDetail: echarts.init(rightDetailChart.value),
    mainLine: echarts.init(mainLineChart.value), 
    clustering: echarts.init(clusteringChartRef.value) // 注册新图表
  };
  
  charts.mainLine.on('mousemove', function(params) {
    if (params.seriesName.includes('均值') || cardState.value.pinned) return;
    let x = params.event.event.clientX + 15; let y = params.event.event.clientY + 15;
    if (x + 320 > window.innerWidth) x -= 340; if (y + 220 > window.innerHeight) y -= 240;
    cardState.value = { visible: true, pinned: false, x, y, html: buildTooltipHtml(params.seriesName, params.name, params.value, params.color), color: params.color };
  });

  charts.mainLine.getZr().on('mousemove', function(params) {
    if (!params.target && !cardState.value.pinned) cardState.value.visible = false;
  });

  charts.mainLine.on('click', function(params) {
    if (params.seriesName.includes('均值')) return;
    let x = params.event.event.clientX + 15; let y = params.event.event.clientY + 15;
    if (x + 320 > window.innerWidth) x -= 340; if (y + 220 > window.innerHeight) y -= 240;
    cardState.value = { visible: true, pinned: true, x, y, html: buildTooltipHtml(params.seriesName, params.name, params.value, params.color), color: params.color };
    window.__preventCardClose = true;
    setTimeout(() => { window.__preventCardClose = false; }, 100);
  });

  updateAllCharts();
};

const handleGlobalClick = (e) => {
  if (window.__preventCardClose) return; 
  if (cardState.value.pinned) {
    const isClickInsideCard = e.target.closest('.custom-tooltip-card');
    if (!isClickInsideCard) { cardState.value.pinned = false; cardState.value.visible = false; }
  }
};

const handleResizeWindow = () => { Object.values(charts).forEach(c => c && c.resize()); };
const particles = Array.from({ length: 20 }).map(() => ({ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', duration: (Math.random() * 4 + 2) + 's', delay: (Math.random() * 2) + 's' }));

onMounted(() => { 
  nextTick(() => { initEChartsInstances(); }); 
  document.addEventListener('click', handleGlobalClick); window.addEventListener('resize', handleResizeWindow); 
});
onUnmounted(() => { 
  delete window.handleClassL2Click;  // <--- 更改这里
  document.removeEventListener('click', handleGlobalClick); 
  window.removeEventListener('resize', handleResizeWindow); 
  Object.values(charts).forEach(c => c && c.dispose()); 
});
</script>

<style scoped>
.dashboard-wrapper {
  --main-color: #1D4ED8; --text-title: #020617; --text-norm: #0F172A; --text-sub: #334155; 
  --mod-bg: rgba(255, 255, 255, 0.85); --mod-border: rgba(203, 213, 225, 0.8); --mod-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9); --mod-radius: 14px; 
  --ai-bg: rgba(219, 234, 254, 0.85); --ai-border: rgba(191, 219, 254, 0.9);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif; 
  font-size: 16px; width: 100%; height: calc(100vh - 60px); 
  background-color: #F1F5F9; overflow: hidden; display: flex; justify-content: center; align-items: center; 
  background: linear-gradient(135deg, rgba(226, 232, 240, 0.5) 0%, rgba(203, 213, 225, 0.5) 100%); box-sizing: border-box;
}

#app { width: 100%; height: 100%; padding: 12px; display: flex; justify-content: space-between; align-items: stretch; gap: 8px; position: relative; box-sizing: border-box; }
#app::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
.human-watermark { position: absolute; left: 50%; top: 65%; transform: translate(-50%, -50%); width: 550px; height: 700px; opacity: 0; z-index: 1; pointer-events: none; }
.particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.particle { position: absolute; width: 2px; height: 2px; background: var(--main-color); border-radius: 50%; opacity: 0; box-shadow: 0 0 6px var(--main-color); animation: floatUp linear infinite; }
@keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.15; } 100% { transform: translateY(-100px); opacity: 0; } }

.layout-side { width: 29%; display: flex; flex-direction: column; gap: 12px; z-index: 10; }

.panel { background: var(--mod-bg); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 10px; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.panel:hover { background: rgba(255, 255, 255, 0.95); box-shadow: 0 12px 40px 0 rgba(15, 23, 42, 0.1), inset 0 1px 1px rgba(255, 255, 255, 1); transform: translateY(-1px); }
.panel-full { flex: 1; min-height: 0; }
.panel-title { font-size: 17px; font-weight: 700; color: var(--text-title); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px; transition: color 0.3s; }
.panel-title::before { content: ''; width: 4px; height: 16px; background: currentColor; border-radius: 2px; }
.chart-box { flex: 1; width: 100%; min-height: 0; position: relative; }

/* ================= 聚类面板专属样式 ================= */
.clustering-panel { padding: 8px; }
.clustering-chart { height: 160px; width: 100%; flex-shrink: 0; margin-bottom: 7px; }
.cluster-cards-wrapper { flex: 1; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px; }
/* 隐藏滚动条美化 */
.cluster-cards-wrapper::-webkit-scrollbar { width: 4px; }
.cluster-cards-wrapper::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }

.cluster-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
  border-left: 4px solid var(--theme-color);
  border-radius: 8px; padding: 10px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.2s ease; cursor: pointer;
  width: calc(50% - 5px);
}
.overall-card {
  /* 专属香槟金高光背景 */
  background: linear-gradient(135deg, rgba(253, 230, 138, 0.4), rgba(255, 255, 255, 0.9));
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
  margin-bottom: 8px; /* 与下方分类卡片拉开一点间距 */
  border-left: 4px solid var(--theme-color);
}
.overall-card:hover {
  transform: translateY(-2px); /* 总榜卡片上浮交互，区别于分榜的右移 */
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.25);
}
.cluster-card:hover { transform: translateX(4px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: rgba(255,255,255,0.95); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 6px; }
.badge { font-size: 15px; font-weight: 900; color: var(--theme-color-dark); }
.count { font-size: 13px; font-weight: bold; color: #64748B; }

.top3-list { display: flex; flex-direction: column; gap: 4px; }
.top3-item { display: flex; align-items: center; font-size: 13px; color: #334155; }
.rank { width: 24px; text-align: center; }
.rank-1 { font-size: 14px; }
.rank-2, .rank-3 { filter: grayscale(0.3); font-size: 12px; }
.name { flex: 1; margin-left: 8px; font-weight: 600; color: #000; }
.score { font-weight: 800; color: var(--theme-color); }
.no-data { font-size: 12px; color: #94A3B8; text-align: center; padding: 4px 0; }
/* ================================================= */

.layout-merged { width: 70%; display: flex; flex-direction: row; gap: 0; padding: 0; z-index: 10; overflow: hidden; }
.merged-left { flex: 6; display: flex; flex-direction: column; padding: 10px; gap: 12px; }
.merged-divider { width: 1px; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent); margin: 20px 0; }
.merged-right { flex: 4; display: flex; flex-direction: column; padding: 15px; position: relative; transition: box-shadow 0.3s ease; }

.sweep-anim { overflow: hidden; }
.sweep-anim::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, var(--sweep-color), transparent); opacity: 0.15; transform: skewX(-20deg); animation: sweep 0.4s ease-out forwards; pointer-events: none; z-index: 10; }
@keyframes sweep { 0% { left: -100%; } 100% { left: 200%; } }

.center-header { display: flex; justify-content: center; align-items: center; text-align: center; padding: 6px 0; background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(241,245,249,0.5) 100%); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); height: 58px; }
.center-header h1 { font-size: 28px; color: var(--text-title); font-weight: 800; letter-spacing: 5px; text-shadow: 0 2px 4px rgba(255, 255, 255, 1); }

.center-info { background: var(--mod-bg); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 5px 4px; display: flex; justify-content: space-around; align-items: center; height: 72px; }
.info-item { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 60px; }
.info-label { font-size: 15px; font-weight: 600; color: var(--text-sub); letter-spacing: 0.5px; }
.info-val { font-size: 22px; font-weight: 800; color: var(--text-title); white-space: nowrap; }
.info-val.s-rank { font-size: 36px; font-weight: 900; background: linear-gradient(135deg, #1D4ED8, #1E3A8A); -webkit-background-clip: text; color: transparent; line-height: 1; text-shadow: 0 4px 12px rgba(29, 78, 216, 0.3); }

.class-selector { background: rgba(255, 255, 255, 0.5); border: 2px solid #1D4ED8; border-radius: 6px; color: #1D4ED8; font-size: 18px; font-weight: 900; padding: 2px 8px; cursor: pointer; outline: none; transition: 0.2s; }
.class-selector:hover { background: rgba(255, 255, 255, 0.9); box-shadow: 0 2px 10px rgba(29, 78, 216, 0.2); }

.center-radar-container { flex: 1; position: relative; width: 100%; min-height: 0; cursor: default; }
#main-radar { position: absolute; inset: 0; width: 100%; height: 100%; }

.custom-tooltip-card { position: fixed; z-index: 9999; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px); border: 2px solid; border-radius: 8px; padding: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); pointer-events: auto; }
.custom-tooltip-card.is-pinned::after { content: ''; position: absolute; right: -12px; top: 50%; transform: translateY(-50%); border-width: 6px 0 6px 12px; border-style: solid; border-color: transparent transparent transparent currentColor; opacity: 0.8; }
.fade-in-fast { animation: fadeInFast 0.2s ease-out; }
@keyframes fadeInFast { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.center-ai { flex: none; background: var(--ai-bg); backdrop-filter: blur(16px); border: 1px solid var(--ai-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 4px 6px; min-height: 70px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 10; }
.ai-title { font-size: 18px; font-weight: 600; color: #D97706; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; }
.ai-title::before { content: '✦'; font-size: 18px; }
.ai-text { font-size: 16px; color: #000000; line-height: 1.6; }

:deep(.strength) { color: #10B981; font-weight: bold; background: rgba(16, 185, 129, 0.15); padding: 0 4px; border-radius: 4px; }
:deep(.weakness) { color: #EF4444; font-weight: bold; background: rgba(239, 68, 68, 0.15); padding: 0 4px; border-radius: 4px; }
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
</style>
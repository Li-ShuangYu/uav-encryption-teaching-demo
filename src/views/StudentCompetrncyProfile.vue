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
        <div class="panel panel-full student-list-panel">
          <div class="panel-title" :style="{ color: themeColorHex }">
            {{ currentCategory.classId }} - {{ currentCategory.name.includes('全能') || currentCategory.name.includes('全部') ? '全能领军总榜' : currentCategory.name + ' 榜单' }}
          </div>
          
          <div class="search-box">
            <input type="text" v-model="searchQuery" placeholder="🔍 输入姓名或学号模糊查询..." />
          </div>
          
          <div class="student-cards-wrapper">
            <div 
              v-for="(stu, index) in displayStudents" :key="stu.学号"
              class="student-card"
              :class="{ 'is-active': currentStudent && currentStudent.学号 === stu.学号 }"
              :style="{ '--theme-color': themeColorHex }"
              @click="selectStudent(stu)"
            >
              <div class="rank-badge" :class="'rank-'+(index+1)">{{ index + 1 }}</div>
              <div class="stu-info">
                <div class="stu-name" v-html="highlightText(stu.姓名)"></div>
                <div class="stu-id" v-html="highlightText(stu.学号)"></div>
                <div class="stu-scores">
                  <span>{{ isOverallList ? '综合' : '优势' }}: <b style="color:var(--theme-color)">{{ isOverallList ? stu.综合得分 : stu.优势得分 }}</b></span>
                  <span class="sep">|</span>
                  <span>{{ isOverallList ? '最高优势' : '综合' }}: <b style="color:#64748B;">{{ isOverallList ? stu.优势基因 : stu.综合得分 }}</b></span>
                </div>
              </div>
              <div class="active-indicator"></div>
            </div>
            <div v-if="displayStudents.length === 0" class="no-data-hint">未匹配到相关学生</div>
          </div>
        </div>
      </aside>

      <main class="layout-merged panel">
        <div class="merged-left">
          <header class="center-header">
            <h1>学生个体能力数字画像</h1>
          </header>
          <section class="center-info">
            <div class="info-item"><span class="info-label">当前聚焦学生</span><span class="info-val s-rank">{{ currentStudent?.姓名 || '未选择' }}</span></div>
            <div class="info-item"><span class="info-label">优势基因</span><span class="info-val" :style="{color: themeColorHex}">{{ currentStudent?.优势基因 || '-' }}</span></div>
            <div class="info-item"><span class="info-label">最新综合得分</span><span class="info-val">{{ currentStudent?.综合得分 || 0 }}</span></div>
          </section>
          <section class="center-radar-container"><div ref="mainLineChart" id="main-radar"></div></section>
          <section class="center-ai">
            <div class="ai-title">AI 综合洞察</div>
            <div class="ai-text">
              该生在<span class="strength">{{ currentStudent?.优势基因 || currentCategory.name }}</span>领域展现出极强的天赋。
              通过对比班级基准线，建议其在保持优势的同时，适当关注薄弱项的补齐，以提升综合竞争力。
            </div>
          </section>
        </div>

        <div class="merged-divider"></div>

        <div class="merged-right" :class="{'sweep-anim': isSweeping}" :style="resonanceStyle">
          <div class="panel-title" :style="{ color: currentThemeColor }">
            {{ currentFocusL2 ? `【${currentSession}】${currentFocusL2} - 个人 vs 基准` : '请在左侧曲线点击指标下钻' }}
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
import * as echarts from 'echarts';
import studentData from './student_profiles_data.json'; 
import classStats from './class_and_grade_stats.json'; 

const rightDetailChart = ref(null);
const mainLineChart = ref(null);
let charts = {};

const rawStorage = localStorage.getItem('studentCategory');
const currentCategory = ref(rawStorage ? JSON.parse(rawStorage) : { type: "category", name: "全部学生", classId: "3DK22-1" });

const isOverallList = computed(() => currentCategory.value.name.includes('全部学生') || currentCategory.value.name.includes('综合') || currentCategory.value.name.includes('全能'));

const searchQuery = ref('');

const highlightText = (text) => {
  if (!searchQuery.value) return text;
  const regex = new RegExp(`(${searchQuery.value})`, 'gi');
  return text.replace(regex, '<span style="color:#DC2626; font-weight:bold;">$1</span>');
};

const displayStudents = computed(() => {
  let list = studentData.filter(stu => stu.班级 === currentCategory.value.classId);
  if (isOverallList.value) {
    list = list.sort((a, b) => b.综合得分 - a.综合得分);
  } else {
    list = list.filter(stu => stu.优势基因 === currentCategory.value.name).sort((a, b) => b.优势得分 - a.优势得分);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(stu => stu.姓名.toLowerCase().includes(q) || stu.学号.includes(q));
  }
  return list;
});

const currentStudent = ref(displayStudents.value.length > 0 ? displayStudents.value[0] : null);

const selectStudent = (stu) => {
  if (currentStudent.value?.学号 === stu.学号) return;
  currentStudent.value = stu;
  currentSession.value = '课次十';
  currentFocusL1.value = stu.优势基因 !== '未知' ? stu.优势基因 : '学业水平';
  currentFocusL2.value = Object.keys(l1ToL2Mapping[currentFocusL1.value] || {'知识掌握':[]})[0];
  updateAllCharts();
};

const initFocus = () => {
  if (currentStudent.value) {
    const gene = currentStudent.value.优势基因 !== '未知' ? currentStudent.value.优势基因 : '学业水平';
    currentFocusL1.value = gene;
    currentFocusL2.value = Object.keys(l1ToL2Mapping[gene] || {'知识掌握':[]})[0];
  } else {
    currentFocusL1.value = '学业水平';
    currentFocusL2.value = '知识掌握';
  }
};

const currentFocusL1 = ref('学业水平');
const currentFocusL2 = ref('知识掌握');
const currentSession = ref('课次十');
const sessionsOrder = ['上课前', '课次一', '课次二', '课次三', '课次四', '课次五', '课次六', '课次七', '课次八', '课次九', '课次十'];

const isSweeping = ref(false);
const cardState = ref({ visible: false, pinned: false, x: 0, y: 0, html: '', color: '#1D4ED8' });

const l1Colors = {
  'AI素养': ['#3B82F6', '#1D4ED8'], '学业水平': ['#10B981', '#047857'], '科学思维': ['#F59E0B', '#B45309'], 
  '调控能力': ['#8B5CF6', '#6D28D9'], '社会协同': ['#EC4899', '#BE185D'], '默认': ['#3B82F6', '#1D4ED8']
};

const themeColorHex = computed(() => {
  if (isOverallList.value) return '#F59E0B'; 
  return l1Colors[currentCategory.value.name]?.[1] || '#1D4ED8';
});

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

const getStudentL1Trend = (l1Name) => sessionsOrder.map(s => currentStudent.value?.sessions?.[s]?.[l1Name]?.l1_avg || 0);
const getStudentL3Details = (session, l1, l2, l3Keys) => l3Keys.map(k => currentStudent.value?.sessions?.[session]?.[l1]?.l3_details?.[k] || 0);

const getL1AvgTrend = (scope) => sessionsOrder.map(s => {
  let sum = 0, count = 0;
  Object.keys(l1ToL2Mapping).forEach(l1 => { if (classStats[scope]?.[s]?.[l1]) { sum += classStats[scope][s][l1].l1_avg; count++; } });
  return count ? (sum / count).toFixed(1) : 0;
});

window.handleStudentL2Click = (l1Name, l2Name, sessionLabel) => {
  currentFocusL1.value = l1Name;
  currentFocusL2.value = l2Name;
  currentSession.value = sessionLabel;
  isSweeping.value = true;
  setTimeout(() => { isSweeping.value = false; }, 400);
  nextTick(() => {
    updateRightDetailChart();
  });
};

const updateRightDetailChart = () => {
  if (!charts.rightDetail || !currentStudent.value) return;
  const l1Name = currentFocusL1.value; const l2Name = currentFocusL2.value; const l3Keys = l1ToL2Mapping[l1Name][l2Name]; const sessionLabel = currentSession.value;
  
  const stuL3Values = getStudentL3Details(sessionLabel, l1Name, l2Name, l3Keys);
  const classL3Values = l3Keys.map(k => classStats[currentCategory.value.classId]?.[sessionLabel]?.[l1Name]?.l2?.[l2Name]?.l3_details?.[k] || 0);
  const gradeL3Values = l3Keys.map(k => classStats['年级全体']?.[sessionLabel]?.[l1Name]?.l2?.[l2Name]?.l3_details?.[k] || 0);
  const themeColors = l1Colors[l1Name] || l1Colors['默认'];

  charts.rightDetail.setOption({
    tooltip: { trigger: 'item' },
    legend: { data: ['个人成绩', '班级均值', '年级均值'], top: 0, right: 0, textStyle: { color: '#000', fontSize: 12 } },
    grid: { top: 40, height: '40%', left: 40, right: 20 },
    xAxis: { type: 'category', data: l3Keys, axisLabel: { color: '#000', fontSize: 13, interval: 0, formatter: v => v.length > 5 ? v.slice(0,5)+'\n'+v.slice(5) : v }, axisLine: { lineStyle: { color: 'rgba(0,0,0,0.25)' } } },
    yAxis: { type: 'value', min: 60, max: 100, axisLabel: { color: '#000', fontSize: 13 }, splitLine: { lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.1)' } } },
    series: [
      { name: '个人成绩', type: 'bar', barWidth: 10, data: stuL3Values, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: themeColors[0]}, {offset: 1, color: themeColors[1]}]), borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: themeColors[1], fontSize: 11, fontWeight: 'bold' } },
      { name: '班级均值', type: 'bar', barWidth: 10, data: classL3Values, itemStyle: { color: 'rgba(16, 185, 129, 0.6)', borderRadius: [4, 4, 0, 0] }, label: { show: false } },
      { name: '年级均值', type: 'bar', barWidth: 10, data: gradeL3Values, itemStyle: { color: 'rgba(148, 163, 184, 0.5)', borderRadius: [4, 4, 0, 0] }, label: { show: false } },
      { name: '三级指标结构', type: 'pie', roseType: 'radius', radius: ['15%', '35%'], center: ['50%', '78%'], data: l3Keys.map((k, i) => ({ name: k, value: stuL3Values[i] })), itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 }, label: { show: true, formatter: '{b}\n{c}分', fontSize: 13, color: '#000', fontWeight: 'bold' }, color: [themeColors[0], themeColors[1], '#FCD34D', '#FCA5A5', '#A78BFA'] }
    ]
  }, true);
};

const buildTooltipHtml = (l1Name, sessionLabel, score, color) => {
  const l2Mapping = l1ToL2Mapping[l1Name];
  const sIdx = sessionsOrder.indexOf(sessionLabel);
  const prevSession = sIdx > 0 ? sessionsOrder[sIdx - 1] : null;

  // 读取 Python 精准推演的行为归因文案
  const b_text = currentStudent.value?.sessions?.[sessionLabel]?.[l1Name]?.l1_behavior || "该课次教学数据追踪暂无异常。";

  let insightHtml = '';
  if (!prevSession) { 
    insightHtml = `<div style="font-size:12px; color:#1D4ED8; margin-bottom:10px; background:rgba(29,78,216,0.1); padding:8px; border-radius:6px;">
      🎯 <b>初始学情：</b>${b_text}
    </div>`;
  } else {
    const prevScore = currentStudent.value?.sessions?.[prevSession]?.[l1Name]?.l1_avg || 0;
    const diff = (score - prevScore).toFixed(1);
    
    // 逻辑闭环：严格根据真实计算的分差套用颜色与话术
    if (diff > 0) {
      insightHtml = `<div style="font-size:12px; color:#047857; margin-bottom:10px; background:rgba(16,185,129,0.15); padding:8px; border-radius:6px;">
        📈 <b>较上次提升 ${Math.abs(diff)} 分</b>。教学归因：${b_text}
      </div>`;
    } else if (diff < 0) {
      insightHtml = `<div style="font-size:12px; color:#B45309; margin-bottom:10px; background:rgba(245,158,11,0.15); padding:8px; border-radius:6px;">
        📉 <b>较上次波动 ${Math.abs(diff)} 分</b>。干预提示：${b_text}
      </div>`;
    } else {
      insightHtml = `<div style="font-size:12px; color:#334155; margin-bottom:10px; background:rgba(100,116,139,0.15); padding:8px; border-radius:6px;">
        ⚖️ <b>成绩平稳保持</b>。行为记录：${b_text}
      </div>`;
    }
  }

  let html = `<div style="color:${color}; font-size:16px; font-weight:900; border-bottom:2px solid rgba(0,0,0,0.1); padding-bottom:6px; margin-bottom:8px;">【${sessionLabel}】${l1Name} 个人得分: ${score}分</div>`;
  html += insightHtml; 
  html += `<div style="font-size:12px; color:#DC2626; margin-bottom:23px; font-weight:bold;">👉 点击下方柱状图，右侧刷新三轨明细</div>`;
  
  html += `<div style="display:flex; justify-content:space-around; align-items:flex-end; height:120px; padding-bottom:5px;">`;
  
  for (let l2Name in l2Mapping) {
    let l2Sum = 0, prevL2Sum = 0;
    const l3Keys = l2Mapping[l2Name];
    
    l3Keys.forEach(k => { 
      l2Sum += (currentStudent.value?.sessions?.[sessionLabel]?.[l1Name]?.l3_details?.[k] || 0);
      if (prevSession) prevL2Sum += (currentStudent.value?.sessions?.[prevSession]?.[l1Name]?.l3_details?.[k] || 0);
    });
    
    const l2Avg = l3Keys.length ? (l2Sum / l3Keys.length).toFixed(1) : 0;
    const prevL2Avg = (prevSession && l3Keys.length) ? (prevL2Sum / l3Keys.length).toFixed(1) : 0;

    const barHeight = Math.max(10, ((l2Avg - 60) / 40) * 80 + 20); 
    const prevBarHeight = Math.max(10, ((prevL2Avg - 60) / 40) * 80 + 20); 

    // BUG修复 2：加入 event.stopPropagation() 斩断原生事件冒泡
    html += `<div onclick="event.stopPropagation(); window.handleStudentL2Click('${l1Name}', '${l2Name}', '${sessionLabel}')" 
              style="cursor:pointer; display:flex; flex-direction:column; align-items:center; width:55px; transition:0.2s;"
                  onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">`;
    
    html += `<div style="display:flex; align-items:flex-end; gap:3px;">`;
    if (prevSession) { 
      html += `<div style="display:flex; flex-direction:column; align-items:center;">
                 <span style="font-size:10px; color:#94A3B8; margin-bottom:2px;">${prevL2Avg}</span>
                 <div style="width:14px; height:${prevBarHeight}px; background:#CBD5E1; border-radius:3px 3px 0 0;"></div>
               </div>`;
    }
    html += `<div style="display:flex; flex-direction:column; align-items:center;">
               <span style="font-size:12px; font-weight:900; color:#000; margin-bottom:2px;">${l2Avg}</span>
               <div style="width:16px; height:${barHeight}px; background:linear-gradient(to top, ${color}66, ${color}); border-radius:3px 3px 0 0; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
             </div>`;
    html += `</div>`;
    
    html += `<span style="font-size:12px; font-weight:bold; color:#333; margin-top:6px; text-align:center; line-height:1.2;">${l2Name.slice(0,2)}<br/>${l2Name.slice(2)}</span>
            </div>`;
  }
  html += `</div>`;
  return html;
};

const updateAllCharts = () => {
  if (!currentStudent.value) return;

  const textColor = '#000000'; const axisColor = 'rgba(0, 0, 0, 0.25)'; const splitColor = 'rgba(0, 0, 0, 0.12)';
  const commonAxis = { axisLabel: { color: textColor, fontSize: 13, margin: 8 }, axisLine: { lineStyle: { color: axisColor } }, splitLine: { show: false } };
  
  updateRightDetailChart();

  const aiTrend = getStudentL1Trend('AI素养'); const eduTrend = getStudentL1Trend('学业水平'); const sciTrend = getStudentL1Trend('科学思维');
  const regTrend = getStudentL1Trend('调控能力'); const socTrend = getStudentL1Trend('社会协同');
  const classAvgTrend = getL1AvgTrend(currentCategory.value.classId); 
  const gradeAvgTrend = getL1AvgTrend('年级全体');

  const stuLinesData = [...aiTrend, ...eduTrend, ...sciTrend, ...regTrend, ...socTrend].map(Number).filter(v => v > 0);
  const yMin = stuLinesData.length ? Math.max(60, Math.floor(Math.min(...stuLinesData)) - 2) : 60;
  const yMax = stuLinesData.length ? Math.min(100, Math.ceil(Math.max(...stuLinesData)) + 2) : 100;

  charts.mainLine.setOption({ 
    tooltip: { show: false }, 
    legend: [
      { data: ['AI素养', '学业水平', '科学思维', '调控能力', '社会协同'], bottom: '6%', textStyle: { color: textColor, fontSize: 13 }, icon: 'roundRect' },
      { data: ['班级综合均值', '年级综合均值'], bottom: '0%', textStyle: { color: textColor, fontSize: 13 }, icon: 'roundRect' }
    ],
    grid: { top: 20, bottom: 85, left: 45, right: 20 }, 
    xAxis: { type: 'category', boundaryGap: true, data: sessionsOrder, ...commonAxis }, 
    yAxis: { type: 'value', min: yMin, max: yMax, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor, type: 'dashed' } } }, 
    series: [ 
      { name: '班级综合均值', type: 'bar', barWidth: '35%', itemStyle: { color: 'rgba(16, 185, 129, 0.2)', borderRadius: [4,4,0,0] }, data: classAvgTrend },
      { name: '年级综合均值', type: 'bar', barWidth: '35%', itemStyle: { color: 'rgba(148, 163, 184, 0.2)', borderRadius: [4,4,0,0] }, data: gradeAvgTrend },
      { name: 'AI素养', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['AI素养'][0] }, data: aiTrend }, 
      { name: '学业水平', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['学业水平'][0] }, data: eduTrend }, 
      { name: '科学思维', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['科学思维'][0] }, data: sciTrend }, 
      { name: '调控能力', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['调控能力'][0] }, data: regTrend }, 
      { name: '社会协同', type: 'line', smooth: true, symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: l1Colors['社会协同'][0] }, data: socTrend }
    ] 
  });
};

const initEChartsInstances = () => {
  charts = { 
    rightDetail: echarts.init(rightDetailChart.value),
    mainLine: echarts.init(mainLineChart.value), 
  };
  
  charts.mainLine.on('mousemove', function(params) {
    if (params.seriesName.includes('均值') || cardState.value.pinned) return;
    let x = params.event.event.clientX + 15; let y = params.event.event.clientY + 15;
    if (x + 350 > window.innerWidth) x -= 370; if (y + 240 > window.innerHeight) y -= 260; 
    cardState.value = { visible: true, pinned: false, x, y, html: buildTooltipHtml(params.seriesName, params.name, params.value, params.color), color: params.color };
  });

  charts.mainLine.getZr().on('mousemove', function(params) {
    if (!params.target && !cardState.value.pinned) cardState.value.visible = false;
  });

  charts.mainLine.on('click', function(params) {
    if (params.seriesName.includes('均值')) return;
    let x = params.event.event.clientX + 15; let y = params.event.event.clientY + 15;
    if (x + 350 > window.innerWidth) x -= 370; if (y + 240 > window.innerHeight) y -= 260;
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
  nextTick(() => { 
    initFocus();
    initEChartsInstances(); 
  }); 
  document.addEventListener('click', handleGlobalClick); window.addEventListener('resize', handleResizeWindow); 
});
onUnmounted(() => { 
  delete window.handleStudentL2Click; // <--- 更改这里
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

#app { width: 100%; height: 100%; padding: 12px; display: flex; justify-content: space-between; align-items: stretch; gap: 16px; position: relative; box-sizing: border-box; }
#app::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
.human-watermark { position: absolute; left: 50%; top: 65%; transform: translate(-50%, -50%); width: 550px; height: 700px; opacity: 0; z-index: 1; pointer-events: none; }
.particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.particle { position: absolute; width: 2px; height: 2px; background: var(--main-color); border-radius: 50%; opacity: 0; box-shadow: 0 0 6px var(--main-color); animation: floatUp linear infinite; }
@keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.15; } 100% { transform: translateY(-100px); opacity: 0; } }

.layout-side { width: 29%; display: flex; flex-direction: column; gap: 12px; z-index: 10; }
.panel { background: var(--mod-bg); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 10px; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.panel-full { flex: 1; min-height: 0; }
.panel-title { font-size: 17px; font-weight: 700; color: var(--text-title); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px; transition: color 0.3s; }
.panel-title::before { content: ''; width: 4px; height: 16px; background: currentColor; border-radius: 2px; }
.chart-box { flex: 1; width: 100%; min-height: 0; position: relative; }

.search-box { margin-bottom: 12px; }
.search-box input { width: 100%; padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.7); font-size: 14px; color: #000; outline: none; transition: 0.2s; box-sizing: border-box; }
.search-box input:focus { background: rgba(255,255,255,1); border-color: var(--theme-colorHex, #1D4ED8); box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1); }

.student-list-panel { padding: 15px; }
.student-cards-wrapper { flex: 1; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: column; gap: 8px; }
.student-cards-wrapper::-webkit-scrollbar { width: 4px; }
.student-cards-wrapper::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }

/* BUG修复 2：增加 flex-shrink: 0 拒绝弹性挤压变形 */
.student-card { display: flex; align-items: center; height: 96.2px; padding: 12px; background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(0,0,0,0.05); border-left: 4px solid var(--theme-color); border-radius: 8px; cursor: pointer; transition: all 0.2s ease; position: relative; overflow: hidden; flex-shrink: 0; }
.student-card:hover { background: rgba(255, 255, 255, 0.9); transform: translateX(4px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.student-card.is-active { background: rgba(255, 255, 255, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-color: var(--theme-color); }
.student-card.is-active .active-indicator { position: absolute; right: 0; top: 0; bottom: 0; width: 4px; background: var(--theme-color); }
.rank-badge { width: 28px; height: 28px; border-radius: 50%; background: #E2E8F0; color: #64748B; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px; margin-right: 12px; }
.rank-1 { background: #FEF3C7; color: #D97706; font-size: 16px; }
.rank-2 { background: #F1F5F9; color: #94A3B8; }
.rank-3 { background: #FFEDD5; color: #B91C1C; }
.stu-info { flex: 1; }
.stu-name { font-size: 16px; font-weight: 800; color: #000; margin-bottom: 4px; display: flex; align-items: baseline; gap: 8px; }
.stu-id { font-size: 12px; color: #94A3B8; font-weight: normal; }
.stu-scores { font-size: 13px; color: #475569; display: flex; align-items: center; gap: 8px; }
.stu-scores b { font-size: 14px; }
.sep { color: #CBD5E1; }
.no-data-hint { text-align: center; color: #94A3B8; margin-top: 20px; font-size: 14px; }

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
.info-val.s-rank { font-size: 30px; font-weight: 900; background: linear-gradient(135deg, #1D4ED8, #1E3A8A); -webkit-background-clip: text; color: transparent; line-height: 1; text-shadow: 0 4px 12px rgba(29, 78, 216, 0.3); }

.center-radar-container { flex: 1; position: relative; width: 100%; min-height: 0; cursor: default; }
#main-radar { position: absolute; inset: 0; width: 100%; height: 100%; }

.custom-tooltip-card { position: fixed; width: 340px; z-index: 9999; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px); border: 2px solid; border-radius: 8px; padding: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); pointer-events: auto; }
.custom-tooltip-card.is-pinned::after { content: ''; position: absolute; right: -12px; top: 50%; transform: translateY(-50%); border-width: 6px 0 6px 12px; border-style: solid; border-color: transparent transparent transparent currentColor; opacity: 0.8; }
.fade-in-fast { animation: fadeInFast 0.2s ease-out; }
@keyframes fadeInFast { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.center-ai { flex: none; background: var(--ai-bg); backdrop-filter: blur(16px); border: 1px solid var(--ai-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 10px 15px; min-height: 70px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 10; }
.ai-title { font-size: 18px; font-weight: 600; color: #D97706; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; }
.ai-title::before { content: '✦'; font-size: 18px; }
.ai-text { font-size: 15px; color: #000000; line-height: 1.6; }

:deep(.strength) { color: #10B981; font-weight: bold; background: rgba(16, 185, 129, 0.15); padding: 0 4px; border-radius: 4px; }
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
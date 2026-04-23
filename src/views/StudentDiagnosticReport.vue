<template>
  <div class="diagnostic-wrapper">
    <div id="app" class="fade-in">
      <div class="particles" id="particles-box">
        <div v-for="(p, i) in particles" :key="i" class="particle" :style="{ left: p.left, top: p.top, animationDuration: p.duration, animationDelay: p.delay }"></div>
      </div>

      <header class="report-header panel">
        <div class="header-left">
          <h1>学情诊断可视化报告</h1>
          <span class="subtitle">Personalized Learning Diagnostic Report</span>
        </div>
        
        <div class="header-right">
          <div class="student-selector">
            <span class="label">当前诊断对象：</span>
            <select v-model="currentStudentId" @change="handleStudentChange" class="custom-select">
              <option v-for="stu in allStudents" :key="stu.学号" :value="stu.学号">
                {{ stu.班级 }} - {{ stu.姓名 }}
              </option>
            </select>
          </div>

          <div class="key-metrics">
            <div class="metric-box">
              <div class="m-val" style="color: #3B82F6;">{{ currentStudentData?.综合得分 || 0 }}</div>
              <div class="m-label">综合评估分</div>
            </div>
            <div class="metric-box">
              <div class="m-val" style="color: #10B981;">No.{{ currentRank }}</div>
              <div class="m-label">班级排位</div>
            </div>
            <div class="metric-box">
              <div class="m-val" style="color: #F59E0B;">{{ beatPercentage }}%</div>
              <div class="m-label">超越同侪</div>
            </div>
          </div>
        </div>
      </header>

      <div class="report-body">
        <aside class="col-left">
          <div class="panel profile-card">
            <div class="avatar-box">
              <div class="avatar">{{ currentStudentData?.姓名.charAt(0) || 'U' }}</div>
            </div>
            <div class="info">
              <h2>{{ currentStudentData?.姓名 || '-' }} <span class="stu-id">({{ currentStudentData?.学号 || '-' }})</span></h2>
              <div class="tags">
                <span class="tag tag-class">{{ currentStudentData?.班级 || '-' }}</span>
                <span class="tag tag-gene">优势: {{ currentStudentData?.优势基因 || '-' }}</span>
              </div>
            </div>
          </div>

          <div class="panel chart-panel flex-1">
            <div class="panel-title">五维能力结构雷达</div>
            <div ref="radarChartRef" class="chart-box"></div>
          </div>

          <div class="panel list-panel">
            <div class="panel-title">核心优势与亟待提升</div>
            <div class="sw-container">
              <div class="strength-list">
                <div class="list-title text-green">🚀 核心长板 (Top 3)</div>
                <div v-for="(item, idx) in strengths" :key="'s'+idx" class="sw-item">
                  <span class="name">{{ item.name }}</span>
                  <span class="score text-green">{{ item.score }}分</span>
                </div>
              </div>
              <div class="weakness-list">
                <div class="list-title text-red">⚠️ 亟待突围 (Bottom 3)</div>
                <div v-for="(item, idx) in weaknesses" :key="'w'+idx" class="sw-item">
                  <span class="name">{{ item.name }}</span>
                  <span class="score text-red">{{ item.score }}分</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main class="col-center">
          <div class="panel chart-panel h-45">
            <div class="panel-title">【学业水平】知识掌握深度剖析</div>
            <div ref="barChartRef" class="chart-box"></div>
          </div>
          
          <div class="panel chart-panel h-40">
            <div class="panel-title">综合能力发展生命周期轨迹</div>
            <div ref="lineChartRef" class="chart-box"></div>
          </div>

          <div class="panel ai-panel h-15">
            <div class="ai-title">🤖 AI 专家级诊断结案</div>
            <div class="ai-text">
              经系统追踪 11 个教学课次，该生在 <b>{{ currentStudentData?.优势基因 }}</b> 方面构建了核心壁垒。<br/>
              但在 <b>{{ weaknesses[0]?.name || '部分基础指标' }}</b> 存在薄弱环节（仅 {{ weaknesses[0]?.score || 0 }} 分）。建议后续分配更多注意力至对应的强化训练模块，以实现能力图谱的全面均衡。
            </div>
          </div>
        </main>

        <aside class="col-right">
          <div class="panel chart-panel h-50">
            <div class="panel-title">【调控能力】双维矩阵散点模型</div>
            <div class="chart-desc">X轴: 时间规划均值 | Y轴: 测评应对均值 (每个点代表一次课)</div>
            <div ref="scatterChartRef" class="chart-box"></div>
          </div>

          <div class="panel chart-panel h-50">
            <div class="panel-title">【社会协同】生态增值网络</div>
            <div class="chart-desc">节点大小代表该项协同能力得分强弱</div>
            <div ref="graphChartRef" class="chart-box"></div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import * as echarts from 'echarts';

// 导入底层 JSON 数据
import studentProfiles from './student_profiles_data.json'; 
import classStats from './class_and_grade_stats.json';

// ECharts DOM 引用
const radarChartRef = ref(null);
const barChartRef = ref(null);
const lineChartRef = ref(null);
const scatterChartRef = ref(null);
const graphChartRef = ref(null);
let charts = {};

// ================= 数据初始化与响应式状态 =================
const allStudents = ref(studentProfiles);
// 默认取第一个学生
const currentStudentId = ref(studentProfiles[0]?.学号 || '');

// 获取当前选中学生的完整数据
const currentStudentData = computed(() => {
  return allStudents.value.find(s => s.学号 === currentStudentId.value) || null;
});

// 计算班级排名和超越率
const currentRank = computed(() => {
  if (!currentStudentData.value) return 0;
  const myClass = currentStudentData.value.班级;
  const classMates = allStudents.value.filter(s => s.班级 === myClass).sort((a, b) => b.综合得分 - a.综合得分);
  return classMates.findIndex(s => s.学号 === currentStudentId.value) + 1;
});

const beatPercentage = computed(() => {
  if (!currentStudentData.value) return 0;
  const myClass = currentStudentData.value.班级;
  const total = allStudents.value.filter(s => s.班级 === myClass).length;
  if (total <= 1) return 100;
  return (((total - currentRank.value) / total) * 100).toFixed(1);
});

const sessionsOrder = ['上课前', '课次一', '课次二', '课次三', '课次四', '课次五', '课次六', '课次七', '课次八', '课次九', '课次十'];
const mapping = {
  'AI素养': ['AI工具预习使用率', 'AI生成预习资料利用率', '课堂AI互动工具参与率', 'AI内容提问质量', '课后AI作业辅助使用率', 'AI推荐拓展内容学习时长'],
  '学业水平': ['知识内化率', '知识长效巩固度', '知识迁移应用度', '基础概念解析率', '逻辑表达与重构率', '复杂问题攻坚率', '多模态信息提取力', '科学逻辑推理力', '实践操作验证力'],
  '科学思维': ['信息处理响应度', '限时抗压效能', '批判质疑探究度', '多向思维发散度', '自我认知校准度', '深度归因复盘率'],
  '调控能力': ['任务节奏适配度', '全局效能把控度', '风险规避调控率', '审慎核验校验率', '绩效表现波动率', '操作细节严谨度', '测评规则遵从度', '学术原创自律度'],
  '社会协同': ['个性化优势区', '待唤醒提升区', '自我超越增值度', '群体竞争位移度', '团队协同贡献比', '朋辈互助辐射度']
};

// 动态计算该生最新一次课的优劣势 (Top 3 和 Bottom 3)
const strengths = computed(() => {
  return extractL3Scores('desc').slice(0, 3);
});
const weaknesses = computed(() => {
  return extractL3Scores('asc').slice(0, 3);
});

const extractL3Scores = (order) => {
  if (!currentStudentData.value) return [];
  const latestSession = currentStudentData.value.sessions['课次十'];
  if (!latestSession) return [];
  
  let allL3 = [];
  for (let l1 in latestSession) {
    const details = latestSession[l1].l3_details;
    for (let l3 in details) {
      allL3.push({ name: l3, score: details[l3] });
    }
  }
  return allL3.sort((a, b) => order === 'desc' ? b.score - a.score : a.score - b.score);
};

// ================= 图表绘制逻辑 =================

const handleStudentChange = () => {
  nextTick(() => { updateAllCharts(); });
};

const updateAllCharts = () => {
  if (!currentStudentData.value) return;
  const stu = currentStudentData.value;
  const latest = stu.sessions['课次十'];
  const cls = stu.班级;

  const textColor = '#1E293B';
  const axisLineColor = 'rgba(0,0,0,0.1)';

  // 1. 五维雷达图
  if (charts.radar) {
    const l1Names = Object.keys(mapping);
    const stuRadarData = l1Names.map(k => latest[k]?.l1_avg || 0);
    const classRadarData = l1Names.map(k => classStats[cls]?.['课次十']?.[k]?.l1_avg || 0);

    charts.radar.setOption({
      tooltip: { trigger: 'item' },
      legend: { data: ['个人能力', '班级基准'], bottom: 0, textStyle: { fontSize: 12 } },
      radar: {
        indicator: l1Names.map(name => ({ name, max: 100 })),
        radius: '65%',
        axisName: { color: '#0F172A', fontSize: 13, fontWeight: 'bold' },
        splitArea: { areaStyle: { color: ['rgba(29,78,216,0.05)', 'rgba(29,78,216,0.02)'] } }
      },
      series: [{
        type: 'radar',
        data: [
          { value: stuRadarData, name: '个人能力', itemStyle: { color: '#1D4ED8' }, areaStyle: { color: 'rgba(29,78,216,0.3)' } },
          { value: classRadarData, name: '班级基准', itemStyle: { color: '#10B981' }, lineStyle: { type: 'dashed' } }
        ]
      }]
    });
  }

  // 2. 学业水平 L3 柱状图
  if (charts.bar) {
    const eduKeys = mapping['学业水平'];
    const eduData = eduKeys.map(k => latest['学业水平']?.l3_details[k] || 0);
    
    charts.bar.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { top: 30, bottom: 40, left: 40, right: 20 },
      xAxis: { type: 'category', data: eduKeys, axisLabel: { color: textColor, interval: 0, formatter: v => v.substring(0,4)+'\n'+v.substring(4) } },
      yAxis: { type: 'value', min: 60, max: 100, splitLine: { lineStyle: { type: 'dashed', color: axisLineColor } } },
      series: [{
        name: '掌握度', type: 'bar', barWidth: 20, data: eduData,
        itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#3B82F6'}, {offset: 1, color: '#1E3A8A'}]), borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: '#1D4ED8', fontSize: 12, fontWeight: 'bold' }
      }]
    });
  }

  // 3. 综合得分 11课次折线图
  if (charts.line) {
    const trendData = sessionsOrder.map(s => {
      let sum = 0, count = 0;
      for (let l1 in mapping) { if(stu.sessions[s]?.[l1]) { sum += stu.sessions[s][l1].l1_avg; count++; } }
      return count ? (sum/count).toFixed(1) : 0;
    });

    charts.line.setOption({
      tooltip: { trigger: 'axis' },
      grid: { top: 20, bottom: 30, left: 40, right: 20 },
      xAxis: { type: 'category', data: sessionsOrder, boundaryGap: false, axisLine: { lineStyle: { color: axisLineColor } } },
      yAxis: { type: 'value', min: 60, max: 100, splitLine: { lineStyle: { type: 'dashed', color: axisLineColor } } },
      series: [{
        name: '综合评估走势', type: 'line', smooth: true, symbolSize: 8,
        itemStyle: { color: '#F59E0B' }, lineStyle: { width: 3 }, areaStyle: { color: 'rgba(245, 158, 11, 0.2)' },
        data: trendData
      }]
    });
  }

  // 4. 调控能力散点图 (X: 时间规划均值, Y: 测评应对均值)
  if (charts.scatter) {
    const scatterData = [];
    sessionsOrder.forEach(s => {
      const details = stu.sessions[s]?.['调控能力']?.l3_details;
      if (details) {
        // 算出两个 L2 的均值
        const xVal = (details['任务节奏适配度'] + details['全局效能把控度']) / 2;
        const yVal = (details['风险规避调控率'] + details['审慎核验校验率']) / 2;
        scatterData.push([xVal.toFixed(1), yVal.toFixed(1), s]);
      }
    });

    charts.scatter.setOption({
      tooltip: { formatter: p => `课次: ${p.data[2]}<br/>时间规划: ${p.data[0]}<br/>测评应对: ${p.data[1]}` },
      grid: { top: 30, bottom: 40, left: 40, right: 20 },
      xAxis: { name: '时间规划', type: 'value', min: 60, max: 100, splitLine: { show: false } },
      yAxis: { name: '测评应对', type: 'value', min: 60, max: 100, splitLine: { lineStyle: { type: 'dashed', color: axisLineColor } } },
      series: [{
        type: 'scatter', symbolSize: 14, data: scatterData,
        itemStyle: { color: '#8B5CF6', opacity: 0.8, borderColor: '#fff', borderWidth: 1 }
      }]
    });
  }

  // 5. 社会协同生态网络图
  if (charts.graph) {
    const socKeys = mapping['社会协同'];
    const socDetails = latest['社会协同']?.l3_details || {};
    
    const nodes = socKeys.map(k => ({
      name: k, 
      value: socDetails[k] || 60,
      symbolSize: ((socDetails[k] || 60) - 50) * 1.2, // 根据分数计算节点大小
      itemStyle: { color: '#EC4899' }
    }));
    
    const links = [];
    for(let i=0; i<nodes.length; i++) {
      for(let j=i+1; j<nodes.length; j++) {
        if(Math.random() > 0.3) { // 随机连线营造网络感
          links.push({ source: nodes[i].name, target: nodes[j].name });
        }
      }
    }

    charts.graph.setOption({
      tooltip: { formatter: '{b}: {c}分' },
      series: [{
        type: 'graph', layout: 'force', roam: true,
        force: { repulsion: 200, edgeLength: 60 },
        label: { show: true, position: 'bottom', color: textColor, fontSize: 11 },
        lineStyle: { color: 'rgba(236,72,153,0.3)', width: 2, curveness: 0.1 },
        data: nodes, links: links
      }]
    });
  }
};

const initEChartsInstances = () => {
  charts = { 
    radar: echarts.init(radarChartRef.value),
    bar: echarts.init(barChartRef.value),
    line: echarts.init(lineChartRef.value),
    scatter: echarts.init(scatterChartRef.value),
    graph: echarts.init(graphChartRef.value)
  };
  updateAllCharts();
};

const handleResizeWindow = () => { Object.values(charts).forEach(c => c && c.resize()); };

// 粒子背景动画配置
const particles = Array.from({ length: 15 }).map(() => ({ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', duration: (Math.random() * 4 + 3) + 's', delay: (Math.random() * 2) + 's' }));

onMounted(() => { 
  nextTick(() => { initEChartsInstances(); }); 
  window.addEventListener('resize', handleResizeWindow); 
});
onUnmounted(() => { 
  window.removeEventListener('resize', handleResizeWindow); 
  Object.values(charts).forEach(c => c && c.dispose()); 
});
</script>

<style scoped>
.diagnostic-wrapper {
  --main-blue: #1D4ED8; --bg-glass: rgba(255, 255, 255, 0.85); --border-glass: rgba(203, 213, 225, 0.8);
  font-family: 'Inter', 'PingFang SC', sans-serif; 
  width: 100vw; height: 100vh; background: #F1F5F9; overflow: hidden;
}

#app { width: 100%; height: 100%; padding: 12px; display: flex; flex-direction: column; gap: 12px; box-sizing: border-box; position: relative; }
#app::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px); background-size: 30px 30px; }

.particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.particle { position: absolute; width: 3px; height: 3px; background: var(--main-blue); border-radius: 50%; opacity: 0; animation: floatUp linear infinite; }
@keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.2; } 100% { transform: translateY(-150px); opacity: 0; } }

.panel { background: var(--bg-glass); backdrop-filter: blur(16px); border: 1px solid var(--border-glass); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); position: relative; z-index: 10; }
.panel-title { font-size: 16px; font-weight: 800; color: #0F172A; margin-bottom: 8px; border-left: 4px solid var(--main-blue); padding-left: 8px; }

/* Header */
.report-header { height: 70px; display: flex; justify-content: space-between; align-items: center; padding: 0 24px; flex-shrink: 0; }
.header-left h1 { font-size: 24px; color: var(--main-blue); font-weight: 900; margin: 0; letter-spacing: 2px; }
.subtitle { font-size: 12px; color: #64748B; text-transform: uppercase; }

.header-right { display: flex; align-items: center; gap: 24px; }
.student-selector { display: flex; align-items: center; gap: 8px; }
.label { font-size: 14px; color: #334155; font-weight: bold; }
.custom-select { padding: 6px 12px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 15px; font-weight: bold; color: var(--main-blue); outline: none; cursor: pointer; }

.key-metrics { display: flex; gap: 16px; }
.metric-box { text-align: center; background: rgba(255,255,255,0.6); padding: 4px 16px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.05); }
.m-val { font-size: 22px; font-weight: 900; line-height: 1.2; }
.m-label { font-size: 12px; color: #64748B; }

/* Body Layout */
.report-body { flex: 1; display: flex; gap: 12px; overflow: hidden; }
.col-left { width: 25%; display: flex; flex-direction: column; gap: 12px; }
.col-center { width: 45%; display: flex; flex-direction: column; gap: 12px; }
.col-right { width: 30%; display: flex; flex-direction: column; gap: 12px; }

.flex-1 { flex: 1; }
.h-45 { height: 45%; }
.h-40 { height: 40%; }
.h-15 { height: 15%; }
.h-50 { height: 50%; }

/* Profile Card */
.profile-card { display: flex; align-items: center; gap: 16px; padding: 16px; }
.avatar-box { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #3B82F6, #8B5CF6); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 28px; font-weight: 900; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4); }
.info h2 { font-size: 20px; margin: 0 0 6px 0; color: #0F172A; }
.stu-id { font-size: 14px; color: #64748B; font-weight: normal; }
.tags { display: flex; gap: 8px; }
.tag { padding: 2px 8px; font-size: 12px; border-radius: 4px; font-weight: bold; }
.tag-class { background: #E0E7FF; color: #1D4ED8; }
.tag-gene { background: #FEF3C7; color: #D97706; }

/* Chart Panel Generic */
.chart-panel { display: flex; flex-direction: column; padding: 12px; }
.chart-box { flex: 1; width: 100%; min-height: 0; }
.chart-desc { font-size: 11px; color: #94A3B8; margin-top: -4px; margin-bottom: 4px; }

/* Strengths / Weaknesses */
.list-panel { flex: 1; padding: 12px; display: flex; flex-direction: column; }
.sw-container { flex: 1; display: flex; flex-direction: column; justify-content: space-around; }
.list-title { font-size: 14px; font-weight: 900; margin-bottom: 6px; }
.sw-item { display: flex; justify-content: space-between; font-size: 13px; padding: 4px 0; border-bottom: 1px dashed rgba(0,0,0,0.1); }
.name { color: #334155; }
.score { font-weight: 800; }
.text-green { color: #10B981; }
.text-red { color: #EF4444; }

/* AI Insights */
.ai-panel { padding: 12px 16px; background: rgba(219, 234, 254, 0.6); border-color: rgba(191, 219, 254, 0.9); display: flex; flex-direction: column; justify-content: center; }
.ai-title { font-size: 16px; font-weight: 800; color: #D97706; margin-bottom: 4px; }
.ai-text { font-size: 14px; color: #1E293B; line-height: 1.6; }

.fade-in { animation: fadeIn 0.6s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
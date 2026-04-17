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
        <div class="panel panel-half"><div class="panel-title">学业水平：知识留存与学科攻坚</div><div ref="cL1" class="chart-box"></div></div>
        <div class="panel panel-half"><div class="panel-title">AI素养：全链路渗透率剖析</div><div ref="cL3" class="chart-box"></div></div>
      </aside>

      <main class="layout-center">
        <header class="center-header">
          <h1>班级能力宏观画像</h1>
        </header>
        <section class="center-info">
          <div class="info-item"><span class="info-label">班级</span><span class="info-val">2025级 密码工程一班</span></div>
          <div class="info-item"><span class="info-label">整体优良率</span><span class="info-val s-rank">85%</span></div>
          <div class="info-item"><span class="info-label">全员出勤率</span><span class="info-val">98%</span></div>
        </section>
        
        <section class="center-radar-container">
          <div ref="mainRadar" id="main-radar"></div>
        </section>
        
        <section class="center-ai">
          <div class="ai-title">AI 综合洞察</div>
          <div class="ai-text" v-html="classData.insight"></div>
        </section>
      </main>

      <aside class="layout-side">
        <div class="panel panel-horizontal"><div class="panel-title">调控能力：学风纪律基石</div><div ref="cRTop1" class="chart-box"></div></div>
        <div class="panel panel-horizontal"><div class="panel-title">科学思维：敏捷与发散特征</div><div ref="cRTop2" class="chart-box"></div></div>
        <div class="panel panel-horizontal"><div class="panel-title">社会协同：团队贡献与增值位移</div><div ref="cR1" class="chart-box"></div></div>
      </aside>

      <div 
        v-for="popup in activePopups" :key="popup.name"
        class="l2-floating-container active"
        :style="{ left: popup.left, top: popup.top, zIndex: popup.zIndex }"
        @mousedown="startDrag($event, popup)"
      >
        <div class="l2-close-btn" @click.stop="closePopup(popup.name)">×</div>
        <div :id="`l2-chart-${popup.name}`" class="l2-chart-floating"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';

const cL1 = ref(null); const cL3 = ref(null); 
const cRTop1 = ref(null); const cRTop2 = ref(null);
const cR1 = ref(null); 
const mainRadar = ref(null);

let charts = {};
let l2ChartInstances = {};

// ===== 核心数据字典 =====
const classData = ref({
  // 100% 还原 .strength 和 .weakness 的 HTML 标记
  insight: '班级在<span class="strength">AI素养</span>与<span class="strength">常规知识掌握</span>方面表现优异。但在<span class="weakness">复杂问题攻坚</span>与<span class="weakness">逆向表现波动</span>存在断层，建议结合自动化测验工具进行二次强化。',
  radarL1: [88, 82, 85, 90, 86], 
  academic: {
    skills: ['概念解析', '逻辑重构', '复杂攻坚', '多模态提取', '科学推理', '实践操作'],
    skillScores: [92, 85, 68, 88, 80, 75],
    knowledge: ['知识内化率', '长效巩固度', '迁移应用度'],
    knowledgeScores: [88, 82, 76] 
  },
  aiLiteracy: {
    stages: ['课前探究', '课堂交互', '课后拓展'],
    metric1: { name: '预习/互动/作业辅助', data: [95, 90, 88] },
    metric2: { name: '资料利用/提问质量/时长', data: [92, 85, 80] }
  },
  regulation: [
    { value: 95, name: '规则遵从' }, { value: 92, name: '原创自律' },
    { value: 88, name: '任务节奏' }, { value: 90, name: '全局效能' },
    { value: 85, name: '风险规避' }, { value: 82, name: '审慎核验' },
    { value: 78, name: '操作严谨' }, { value: 80, name: '表现波动' }
  ],
  scienceThinking: [
    [90, 85, 88, '信息与批判组'], [82, 92, 80, '抗压与发散组'], [88, 80, 95, '认知与校准组']
  ],
  social: {
    names: ['竞争位移', '超越增值', '朋辈辐射', '协同贡献', '优势区', '待唤醒'],
    values: [85, 92, 88, 90, 75, 60]
  },
  radarData: {
    "AI素养": { sub: { "课前探究": { value: 93 }, "课堂交互": { value: 88 }, "课后拓展": { value: 84 } } },
    "学业水平": { sub: { "知识掌握": { value: 82 }, "题型攻坚": { value: 81 }, "学科能力": { value: 81 } } },
    "科学思维": { sub: { "思维敏捷": { value: 86 }, "批判发散": { value: 88 }, "自我认知": { value: 87 } } },
    "调控能力": { sub: { "时间规划": { value: 89 }, "测评应对": { value: 83 }, "绩效抗压": { value: 79 }, "学术自律": { value: 93 } } },
    "社会协同": { sub: { "个性潜能": { value: 67 }, "发展增值": { value: 88 }, "团队协同": { value: 89 } } }
  }
});

const particles = Array.from({ length: 20 }).map(() => ({
  left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
  duration: (Math.random() * 4 + 2) + 's', delay: (Math.random() * 2) + 's'
}));

const activePopups = ref([]);
let dragState = null;

const handleMouseMove = (e) => {
  if (dragState) {
    const target = activePopups.value.find(p => p.name === dragState.name);
    if(target) {
      target.left = (dragState.initialX + (e.clientX - dragState.startX)) + 'px';
      target.top = (dragState.initialY + (e.clientY - dragState.startY)) + 'px';
    }
  }
};
const handleMouseUp = () => { dragState = null; };
const startDrag = (e, popup) => {
  if (e.target.closest('.l2-close-btn')) return;
  activePopups.value.forEach(p => p.zIndex = 1000); popup.zIndex = 1005;
  dragState = { name: popup.name, startX: e.clientX, startY: e.clientY, initialX: e.currentTarget.offsetLeft, initialY: e.currentTarget.offsetTop };
};

// ======================== 100% 还原雷达图核心逻辑 ========================
const closePopup = (name) => {
  activePopups.value = activePopups.value.filter(p => p.name !== name);
  if(l2ChartInstances[name]) { l2ChartInstances[name].dispose(); delete l2ChartInstances[name]; }
  updateMainRadarLabels(); // 恢复关闭时的更新逻辑
};

const triggerPopup = (l1Name, originalEvent) => {
  if (!l1Name || !classData.value.radarData[l1Name] || activePopups.value.some(p => p.name === l1Name)) return;
  // 恢复原版彩色 Palette
  const colorPalette = [ { main: '#1D4ED8', bg: 'rgba(29, 78, 216, 0.95)', area: 'rgba(29, 78, 216, 0.35)', line: 'rgba(29, 78, 216, 0.5)' }, { main: '#047857', bg: 'rgba(4, 120, 87, 0.95)', area: 'rgba(4, 120, 87, 0.35)', line: 'rgba(4, 120, 87, 0.5)' }, { main: '#B45309', bg: 'rgba(180, 83, 9, 0.95)', area: 'rgba(180, 83, 9, 0.35)', line: 'rgba(180, 83, 9, 0.5)' }, { main: '#BE185D', bg: 'rgba(190, 24, 93, 0.95)', area: 'rgba(190, 24, 93, 0.35)', line: 'rgba(190, 24, 93, 0.5)' } ];
  const scheme = colorPalette[activePopups.value.length % colorPalette.length];
  
  let popX = originalEvent.clientX; let popY = originalEvent.clientY;
  activePopups.value.push({ name: l1Name, left: popX + 'px', top: popY + 'px', zIndex: 1005 });
  
  updateMainRadarLabels(); // 触发隐藏主雷达标签

  nextTick(() => {
    const chartDom = document.getElementById(`l2-chart-${l1Name}`);
    if (chartDom) {
      const chartInstance = echarts.init(chartDom);
      l2ChartInstances[l1Name] = chartInstance;
      renderLevel2Chart(chartInstance, l1Name, scheme);
    }
  });
};

const updateMainRadarLabels = () => {
  charts.mainRadar.setOption({ radar: { axisName: { formatter: (value) => activePopups.value.some(p => p.name === value) ? '{h|}' : '{n|' + value + '}' } } });
};

// 完全还原原版 L2 弹窗图表配置
const renderLevel2Chart = (chartInstance, l1Name, colorScheme) => {
  const subData = classData.value.radarData[l1Name].sub;
  const l2Indicators = Object.keys(subData).map(k => ({ name: k, max: 100 }));
  const l2Values = Object.values(subData).map(v => v.value);
  chartInstance.setOption({
    title: { text: l1Name, left: 'center', top: 'center', textStyle: { color: colorScheme.main, fontSize: 20, fontWeight: '900', textShadowColor: 'rgba(255, 255, 255, 0.9)', textShadowBlur: 6 } },
    radar: { indicator: l2Indicators, radius: '40%', center: ['50%', '50%'], nameGap: 14, axisName: { color: '#fff', backgroundColor: colorScheme.bg, borderRadius: 4, padding: [6, 8], fontSize: 18, fontWeight: '700', lineHeight: 18 }, splitArea: { show: true, areaStyle: { color: ['rgba(203, 213, 225, 0.4)', 'rgba(226, 232, 240, 0.4)'] } }, splitLine: { lineStyle: { color: colorScheme.line, width: 1.5 } }, axisLine: { lineStyle: { color: colorScheme.line, width: 1.5 } } },
    series: [{ type: 'radar', data: [{ value: l2Values, label: { show: true, formatter: (params) => (params.value / 100).toFixed(2), color: colorScheme.main, fontSize: 18, fontWeight: '900', distance: 5, padding: -10 } }], itemStyle: { color: colorScheme.main }, areaStyle: { color: colorScheme.area }, lineStyle: { width: 2 }, symbolSize: 6, symbol: 'circle' }]
  });
};

const initCharts = () => {
  const TEXT_BASE = { color: '#000000', fontSize: 15, fontWeight: 600 }; 
  const AXIS_LINE = { lineStyle: { color: 'rgba(71, 85, 105, 0.5)', width: 2 } };
  const SPLIT_LINE = { show: true, lineStyle: { color: 'rgba(71, 85, 105, 0.2)', width: 1 } };

  charts = { 
    l1: echarts.init(cL1.value), l3: echarts.init(cL3.value), 
    rTop1: echarts.init(cRTop1.value), rTop2: echarts.init(cRTop2.value), r1: echarts.init(cR1.value), 
    mainRadar: echarts.init(mainRadar.value) 
  };

  const d = classData.value;

  // 1-5 周边图表配置保留上次修改 (解决重叠换行问题)
  charts.l1.setOption({ tooltip: { trigger: 'axis', textStyle: TEXT_BASE }, legend: { data: ['学科攻坚得分', '内化-巩固-迁移线'], textStyle: TEXT_BASE, top: 0 }, grid: { top: 55, bottom: 40, left: 10, right: 10, containLabel: true }, xAxis: [ { type: 'category', data: d.academic.skills, axisLine: AXIS_LINE, axisTick: { alignWithLabel: true }, axisLabel: { ...TEXT_BASE, interval: 0, width: 45, overflow: 'break', margin: 12 } } ], yAxis: [ { type: 'value', name: '攻坚分', axisLabel: TEXT_BASE, axisLine: AXIS_LINE, splitLine: SPLIT_LINE }, { type: 'value', name: '留存率', axisLabel: TEXT_BASE, axisLine: AXIS_LINE, splitLine: { show: false } } ], series: [ { name: '学科攻坚得分', type: 'bar', barWidth: 16, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#3B82F6'}, {offset: 1, color: '#1D4ED8'}]), borderRadius: [4,4,0,0] }, data: d.academic.skillScores }, { name: '内化-巩固-迁移线', type: 'line', yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 8, itemStyle: { color: '#D97706' }, lineStyle: { width: 3 }, data: [d.academic.knowledgeScores[0], d.academic.knowledgeScores[1], d.academic.knowledgeScores[2], null, null, null] } ] });
  charts.l3.setOption({ tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, textStyle: TEXT_BASE }, legend: { data: [d.aiLiteracy.metric1.name, d.aiLiteracy.metric2.name], textStyle: { color: '#000000', fontSize: 15, fontWeight: 600, width: 260, overflow: 'truncate' }, top: 0 }, grid: { top: 55, bottom: 20, left: 10, right: 20, containLabel: true }, xAxis: { type: 'value', max: 100, axisLabel: TEXT_BASE, axisLine: AXIS_LINE, splitLine: SPLIT_LINE }, yAxis: { type: 'category', data: d.aiLiteracy.stages, axisLabel: TEXT_BASE, axisLine: AXIS_LINE }, series: [ { name: d.aiLiteracy.metric1.name, type: 'bar', barGap: '10%', barWidth: 14, itemStyle: { color: '#10B981', borderRadius: [0,4,4,0] }, data: d.aiLiteracy.metric1.data }, { name: d.aiLiteracy.metric2.name, type: 'bar', barWidth: 14, itemStyle: { color: '#047857', borderRadius: [0,4,4,0] }, data: d.aiLiteracy.metric2.data } ] });
  charts.rTop1.setOption({ tooltip: { trigger: 'item', textStyle: TEXT_BASE }, series: [{ type: 'pie', roseType: 'radius', radius: ['15%', '65%'], center: ['50%', '55%'], label: { color: '#000000', fontSize: 15, fontWeight: 600 }, itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 1 }, color: ['#1D4ED8', '#2563EB', '#3B82F6', '#10B981', '#059669', '#D97706', '#F59E0B', '#DC2626'], data: d.regulation }] });
  charts.rTop2.setOption({ tooltip: { formatter: (p) => `<div style="color:#000;font-weight:700;font-size:15px">${p.data[3]}<br/>响应: ${p.data[0]}<br/>探究: ${p.data[1]}<br/>复盘(大小): ${p.data[2]}</div>` }, grid: { top: 25, bottom: 25, left: 20, right: 30, containLabel: true }, xAxis: { name: '响应', type: 'value', min: 70, max: 100, axisLabel: TEXT_BASE, axisLine: AXIS_LINE, splitLine: SPLIT_LINE }, yAxis: { name: '探究', type: 'value', min: 70, max: 100, axisLabel: TEXT_BASE, axisLine: AXIS_LINE, splitLine: SPLIT_LINE }, series: [{ type: 'scatter', symbolSize: (data) => data[2] / 2.5, itemStyle: { color: '#7C3AED', opacity: 0.8, borderColor: '#fff', borderWidth: 1 }, label: { show: true, formatter: '{@[3]}', position: 'top', color: '#000000', fontSize: 15, fontWeight: 700 }, data: d.scienceThinking }] });
  charts.r1.setOption({ tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, textStyle: TEXT_BASE }, grid: { top: 20, bottom: 20, left: 10, right: 30, containLabel: true }, xAxis: { type: 'value', max: 100, axisLabel: TEXT_BASE, axisLine: AXIS_LINE, splitLine: SPLIT_LINE }, yAxis: { type: 'category', data: d.social.names, inverse: true, axisLabel: TEXT_BASE, axisLine: AXIS_LINE }, series: [{ type: 'bar', barWidth: 14, itemStyle: { color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{offset: 0, color: '#BE185D'}, {offset: 1, color: '#F43F5E'}]), borderRadius: [0,4,4,0] }, label: { show: true, position: 'right', color: '#000000', fontSize: 15, fontWeight: 700 }, data: d.social.values }] });

  // ======================== 主雷达图：完全拷贝并应用原版配置 ========================
  const l1Indicators = ['AI素养', '学业水平', '科学思维', '调控能力', '社会协同'].map(k => ({ name: k, max: 100 }));
  charts.mainRadar.setOption({
    radar: { 
      indicator: l1Indicators, startAngle: 90, clockwise: false, radius: '40%', center: ['50%', '50%'], splitNumber: 3, nameGap: 16, 
      axisName: { 
        formatter: (value) => '{n|' + value + '}', 
        rich: { 
          n: { color: '#ffffff', backgroundColor: 'rgba(29, 78, 216, 0.95)', borderRadius: 6, fontSize: 20, fontWeight: '700', padding: [6, 10], lineHeight: 20, textShadowBlur: 4, textShadowColor: 'rgba(0,0,0,0.4)', align: 'center', cursor: 'pointer' }, 
          h: { color: 'transparent', backgroundColor: 'transparent', padding: 0, fontSize: 10, lineHeight: 0 } 
        } 
      }, 
      splitLine: { lineStyle: { color: 'rgba(51, 65, 85, 0.4)', width: 1.5 } }, 
      splitArea: { show: true, areaStyle: { color: ['rgba(203, 213, 225, 0.6)', 'rgba(226, 232, 240, 0.6)'] } }, 
      axisLine: { lineStyle: { color: 'rgba(51, 65, 85, 0.4)', width: 1.5 } } 
    },
    series: [{ 
      type: 'radar', 
      data: [{ value: d.radarL1, name: '当前班级', label: { show: true, formatter: (params) => (params.value / 100).toFixed(2), color: '#1D4ED8', fontSize: 18, fontWeight: '900', distance: 6, padding: -12 } }], 
      itemStyle: { color: '#1D4ED8' }, areaStyle: { color: 'rgba(29, 78, 216, 0.3)' }, lineStyle: { color: '#1D4ED8', width: 2 }, symbol: 'circle', symbolSize: 8, 
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: '#1D4ED8' }, lineStyle: { width: 3 } } 
    }]
  });

  charts.mainRadar.getZr().on('click', function(e) {
    const zr = charts.mainRadar.getZr();
    const dx = e.offsetX - zr.getWidth() / 2; const dy = e.offsetY - zr.getHeight() / 2;
    if (Math.sqrt(dx*dx + dy*dy) < 20) return; 
    let angle = Math.atan2(dy, dx) * 180 / Math.PI; if (angle < 0) angle += 360;
    const targets = [270, 198, 126, 54, 342]; 
    let minDiff = 360; let closestIndex = -1;
    targets.forEach((t, i) => { let diff = Math.abs(angle - t); if (diff > 180) diff = 360 - diff; if (diff < minDiff) { minDiff = diff; closestIndex = i; } });
    if (closestIndex !== -1) triggerPopup(l1Indicators[closestIndex].name, e.event); 
  });
};

const handleResizeWindow = () => { Object.values(charts).forEach(c => c && c.resize()); Object.values(l2ChartInstances).forEach(c => c && c.resize()); };

onMounted(() => {
  nextTick(() => { initCharts(); });
  document.addEventListener('mousemove', handleMouseMove); document.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('resize', handleResizeWindow);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp);
  window.removeEventListener('resize', handleResizeWindow);
  Object.values(charts).forEach(c => c && c.dispose()); Object.values(l2ChartInstances).forEach(c => c && c.dispose());
});
</script>

<style scoped>
/* 100% 沿用并保留原有样式的精华属性，按要求缩小2px */
.dashboard-wrapper {
  --main-color: #1D4ED8; --warn-color: #B91C1C; --high-color: #B45309; --text-title: #020617; --text-norm: #0F172A; --text-sub: #334155; 
  --mod-bg: rgba(255, 255, 255, 0.85); --mod-border: rgba(203, 213, 225, 0.8); --mod-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9); --mod-radius: 14px; 
  --ai-bg: rgba(219, 234, 254, 0.85); --ai-border: rgba(191, 219, 254, 0.9);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif; 
  font-size: 16px; width: 100%; height: calc(100vh - 60px); 
  background-color: #F1F5F9; overflow: hidden; display: flex; justify-content: center; align-items: center; 
  background: linear-gradient(135deg, rgba(226, 232, 240, 0.5) 0%, rgba(203, 213, 225, 0.5) 100%);
  box-sizing: border-box;
}

#app { width: 100%; height: 100%; padding: 12px; display: flex; justify-content: space-between; align-items: stretch; gap: 16px; position: relative; box-sizing: border-box; }
#app::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
.human-watermark { position: absolute; left: 50%; top: 65%; transform: translate(-50%, -50%); width: 550px; height: 700px; opacity: 0; z-index: 1; pointer-events: none; }
.particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.particle { position: absolute; width: 2px; height: 2px; background: var(--main-color); border-radius: 50%; opacity: 0; box-shadow: 0 0 6px var(--main-color); animation: floatUp linear infinite; }
@keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.15; } 100% { transform: translateY(-100px); opacity: 0; } }

.layout-side { width: 28%; display: flex; flex-direction: column; gap: 12px; z-index: 10; }
.layout-center { width: 42%; display: flex; flex-direction: column; gap: 12px; z-index: 10; }

.panel { background: var(--mod-bg); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 10px; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.panel:hover { background: rgba(255, 255, 255, 0.95); box-shadow: 0 12px 40px 0 rgba(15, 23, 42, 0.1), inset 0 1px 1px rgba(255, 255, 255, 1); transform: translateY(-1px); }
.panel-half { flex: 1; min-height: 0; }
.panel-horizontal { height: 33.33%; min-height: 0; }

.panel-title { font-size: 17px; font-weight: 700; color: var(--text-title); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px; }
.panel-title::before { content: ''; width: 4px; height: 16px; background: linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%); border-radius: 2px; box-shadow: 0 1px 3px rgba(29, 78, 216, 0.4); }
.chart-box { flex: 1; width: 100%; min-height: 0; position: relative; }

.center-header { display: flex; justify-content: center; align-items: center; text-align: center; padding: 6px 0; background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(241,245,249,0.5) 100%); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); height: 58px; }
.center-header h1 { font-size: 28px; color: var(--text-title); font-weight: 800; letter-spacing: 5px; text-shadow: 0 2px 4px rgba(255, 255, 255, 1); }

.center-info { background: var(--mod-bg); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 5px 4px; display: flex; justify-content: space-around; align-items: center; height: 72px; }
.info-item { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 60px; }
.info-label { font-size: 15px; font-weight: 600; color: var(--text-sub); letter-spacing: 0.5px; }
.info-val { font-size: 22px; font-weight: 800; color: var(--text-title); white-space: nowrap; }
.info-val.s-rank { font-size: 44px; font-weight: 900; background: linear-gradient(135deg, #1D4ED8, #1E3A8A); -webkit-background-clip: text; color: transparent; line-height: 1; text-shadow: 0 4px 12px rgba(29, 78, 216, 0.3); }

.center-radar-container { flex: 1; position: relative; width: 100%; min-height: 0; cursor: pointer; }
#main-radar { position: absolute; inset: 0; width: 100%; height: 100%; }

.center-ai { flex: none; background: var(--ai-bg); backdrop-filter: blur(16px); border: 1px solid var(--ai-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 4px 6px; min-height: 70px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 10; }
.ai-title { font-size: 18px; font-weight: 600; color: #D97706; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; letter-spacing: 0.5px; }
.ai-title::before { content: '✦'; font-size: 18px; }
.ai-text { font-size: 16px; color: #000000; line-height: 1.6; letter-spacing: 0.3px; }

/* 100% 还原 AI 洞察区域红绿高亮 HTML 标签配置 */
:deep(.strength) { color: #10B981; font-weight: bold; background: rgba(16, 185, 129, 0.15); padding: 0 4px; border-radius: 4px; }
:deep(.weakness) { color: #EF4444; font-weight: bold; background: rgba(239, 68, 68, 0.15); padding: 0 4px; border-radius: 4px; }

.l2-floating-container { position: fixed; width: 480px; height: 480px; background: transparent; cursor: grab; opacity: 0; transform: translate(-50%, -50%) scale(0.2); transition: opacity 0.3s ease, transform 0.3s ease; }
.l2-floating-container:active { cursor: grabbing; }
@keyframes elasticPop { 0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; } 40% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; } 65% { transform: translate(-50%, -50%) scale(0.92); opacity: 1; } 85% { transform: translate(-50%, -50%) scale(1.03); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
.l2-floating-container.active { opacity: 1; transform: translate(-50%, -50%) scale(1); animation: elasticPop 0.65s cubic-bezier(0.28, 0.84, 0.42, 1) forwards; pointer-events: auto; }
.l2-chart-floating { width: 100%; height: 100%; }
.l2-close-btn { position: absolute; top: 32px; right: 32px; width: 32px; height: 32px; background: rgba(15, 23, 42, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #334155; font-size: 22px; font-weight: bold; cursor: pointer; z-index: 10; transition: all 0.2s; }
.l2-close-btn:hover { background: rgba(220, 38, 38, 0.2); color: #B91C1C; transform: scale(1.1); }
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
</style>
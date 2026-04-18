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
import 'echarts-liquidfill';

const cL1 = ref(null); const cL3 = ref(null); 
const cRTop1 = ref(null); const cRTop2 = ref(null);
const cR1 = ref(null); 
const mainRadar = ref(null);

let charts = {};
let l2ChartInstances = {};

// ===== 核心数据字典 (保留你的指标) =====
const classData = ref({
  insight: '班级在<span class="strength">AI素养</span>与<span class="strength">常规知识掌握</span>方面表现优异。但在<span class="weakness">复杂问题攻坚</span>与<span class="weakness">逆向表现波动</span>存在断层，建议结合自动化测验工具进行二次强化。',
  academic: {
    skills: ['概念解析', '逻辑重构', '复杂攻坚', '多模态提取', '科学推理', '实践操作'],
    skillScores: [92, 85, 68, 88, 80, 75]
  },
  aiLiteracy: {
    stages: ['课前探究', '课堂交互', '课后拓展'],
    metric1: { data: [95, 90, 88] },
    metric2: { data: [92, 85, 80] }
  },
  regulation: [
    { value: 95, name: '规则' }, { value: 92, name: '原创' }, { value: 88, name: '节奏' }, { value: 90, name: '效能' },
    { value: 85, name: '避险' }, { value: 82, name: '核验' }, { value: 78, name: '严谨' }, { value: 80, name: '波动' }
  ],
  mainLine: {
    ai: [85,88,92,95,94,96,98,96,98,99,100],
    edu: [80,85,88,90,92,94,95,96,98,98,99],
    sci: [82,85,86,88,90,92,94,95,96,98,98],
    reg: [80,82,85,85,88,90,88,92,94,95,94],
    soc: [75,78,80,82,85,88,86,90,90,92,90],
    avg: [70,72,75,76,78,80,82,84,85,86,88]
  },
  sciVal: 86,
  socVal: 0.89
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

const closePopup = (name) => {
  activePopups.value = activePopups.value.filter(p => p.name !== name);
  if(l2ChartInstances[name]) { l2ChartInstances[name].dispose(); delete l2ChartInstances[name]; }
};

const initCharts = () => {
  // 直接照搬提取新图表的配置变量
  const textColor = '#000000'; const axisColor = 'rgba(0, 0, 0, 0.25)'; const splitColor = 'rgba(0, 0, 0, 0.12)';
  const commonAxis = { axisLabel: { color: textColor, fontSize: 15, margin: 8 }, axisLine: { lineStyle: { color: axisColor, width: 1 } }, splitLine: { show: false } };
  const commonTooltip = { trigger: 'axis', textStyle: { fontSize: 15, color: textColor } };

  charts = { 
    l1: echarts.init(cL1.value), l3: echarts.init(cL3.value), 
    rTop1: echarts.init(cRTop1.value), rTop2: echarts.init(cRTop2.value), r1: echarts.init(cR1.value), 
    mainRadar: echarts.init(mainRadar.value) 
  };

  const d = classData.value;

  // 1. 学业水平：完全照搬 cLCombined 的垂直柱状图
  charts.l1.setOption({ tooltip: commonTooltip, legend: { data: ['班级表现', '年级均值'], textStyle: { color: textColor, fontSize: 15 }, top: 0, right: 0, itemWidth: 12 }, grid: { top: 40, bottom: 45, left: 40, right: 10 }, xAxis: { type: 'category', data: d.academic.skills, axisLabel: { interval: 0, color: textColor, fontSize: 15, formatter: function(value) { return value.substring(0, 3) + '\n' + value.substring(3); } }, axisLine: { lineStyle: { color: axisColor } }, axisTick: { show: false } }, yAxis: { type: 'value', max: 100, axisLabel: { color: textColor, fontSize: 15 }, splitLine: { show: false } }, series: [ { name: '班级表现', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0], color: '#8B5CF6' }, label: { show: false }, data: d.academic.skillScores }, { name: '年级均值', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0], color: 'rgba(148, 163, 184, 0.4)' }, data: [82, 75, 85, 65, 55, 70] } ] });

  // 2. AI素养：完全照搬 cL1 的横向对比条形图
  charts.l3.setOption({ tooltip: commonTooltip, legend: { data: ['核心应用', '深度利用', '年级均值'], textStyle: { color: textColor, fontSize: 15 }, top: 0, right: 0, itemWidth: 10 }, grid: { top: 35, bottom: 20, left: 45, right: 20 }, yAxis: { type: 'category', data: d.aiLiteracy.stages, ...commonAxis, inverse: true }, xAxis: { type: 'value', min: 50, max: 100, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor, width: 1 } } }, series: [ { name: '核心应用', type: 'bar', barWidth: 6, itemStyle: { borderRadius: [0, 4, 4, 0], color: '#3B82F6' }, data: d.aiLiteracy.metric1.data }, { name: '深度利用', type: 'bar', barWidth: 6, itemStyle: { borderRadius: [0, 4, 4, 0], color: '#10B981' }, data: d.aiLiteracy.metric2.data }, { name: '年级均值', type: 'line', smooth: true, symbol: 'none', lineStyle: { width: 2, type: 'dashed', color: '#94A3B8' }, data: [80, 85, 75] } ] });

  // 3. 宏观画像：完全照搬 mainLine 的多维折线成长曲线
  charts.mainRadar.setOption({ tooltip: commonTooltip, legend: { data: ['AI素养', '学业水平', '科学思维', '调控能力', '社会协同', '班级综合均值'], bottom: 0, textStyle: { color: textColor, fontSize: 15 }, icon: 'roundRect' }, grid: { top: 20, bottom: 65, left: 45, right: 20 }, xAxis: { type: 'category', boundaryGap: false, data: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11'], ...commonAxis }, yAxis: { type: 'value', min: 60, max: 100, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor, type: 'dashed' } } }, series: [ { name: 'AI素养', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#3B82F6' }, data: d.mainLine.ai }, { name: '学业水平', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#10B981' }, data: d.mainLine.edu }, { name: '科学思维', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#F59E0B' }, data: d.mainLine.sci }, { name: '调控能力', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#8B5CF6' }, data: d.mainLine.reg }, { name: '社会协同', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#EC4899' }, data: d.mainLine.soc }, { name: '班级综合均值', type: 'line', smooth: true, symbol: 'none', lineStyle: { width: 2, type: 'dashed', color: '#94A3B8' }, data: d.mainLine.avg } ] });

  // 4. 调控能力：完全照搬 cRWide2 的面积图 (X轴填入指标数组)
  charts.rTop1.setOption({ tooltip: commonTooltip, legend: { data: ['班级表现', '年级均值'], right: 0, top: 0, textStyle: { fontSize: 15, color: textColor } }, grid: { top: 40, bottom: 30, left: 45, right: 20 }, xAxis: { type: 'category', boundaryGap: false, data: d.regulation.map(r=>r.name), ...commonAxis }, yAxis: { type: 'value', max: 100, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor } } }, series: [ { name: '班级表现', type: 'line', smooth: true, areaStyle: { color: 'rgba(245, 158, 11, 0.2)' }, lineStyle: { width: 3, color: '#F59E0B' }, itemStyle: { color: '#F59E0B' }, data: d.regulation.map(r=>r.value) }, { name: '年级均值', type: 'line', smooth: true, lineStyle: { width: 2, type: 'dashed', color: '#94A3B8' }, symbol: 'none', data: [85, 88, 82, 85, 80, 75, 70, 75] } ] });

  // 5. 科学思维：完全照搬 cR4 的单项比例环形图
  charts.rTop2.setOption({ tooltip: { textStyle: { fontSize: 18, color: textColor } }, title: { text: d.sciVal + '%', left: 'center', top: 'center', textStyle: { fontSize: 18, fontWeight: 'bold', color: textColor } }, series: [{ type: 'pie', radius: ['60%', '80%'], center: ['50%', '50%'], hoverAnimation: false, label: { show: false }, data: [ { value: d.sciVal, name: '优良率', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{offset: 0, color: '#EF4444'}, {offset: 1, color: '#F59E0B'}]) } }, { value: 100 - d.sciVal, name: '待提升', itemStyle: { color: 'rgba(148, 163, 184, 0.3)' } } ] }] });

  // 6. 社会协同：完全照搬 cR3 的液态水球图
  charts.r1.setOption({ series: [{ type: 'liquidFill', data: [d.socVal, d.socVal - 0.05], radius: '75%', center: ['50%', '50%'], color: ['#10B981', 'rgba(16, 185, 129, 0.5)'], backgroundStyle: { color: 'rgba(16, 185, 129, 0.05)' }, outline: { borderDistance: 2, itemStyle: { borderWidth: 2, borderColor: '#10B981' } }, label: { fontSize: 20, color: textColor, fontWeight: 'bold', formatter: function() { return (d.socVal * 100).toFixed(0) + '%'; } } }] });
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
/* 此处与之前提供的 ClassCompetencyProfile 样式完全一致，100%未作任何修改 */
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

.center-radar-container { flex: 1; position: relative; width: 100%; min-height: 0; cursor: default; }
#main-radar { position: absolute; inset: 0; width: 100%; height: 100%; }

.center-ai { flex: none; background: var(--ai-bg); backdrop-filter: blur(16px); border: 1px solid var(--ai-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 4px 6px; min-height: 70px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 10; }
.ai-title { font-size: 18px; font-weight: 600; color: #D97706; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; letter-spacing: 0.5px; }
.ai-title::before { content: '✦'; font-size: 18px; }
.ai-text { font-size: 16px; color: #000000; line-height: 1.6; letter-spacing: 0.3px; }

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
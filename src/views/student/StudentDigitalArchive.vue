<template>
  <div class="dashboard-wrapper">
    <div id="app" class="fade-in">
      <div class="particles" id="particles-box">
        <div 
          v-for="(p, i) in particles" :key="i" class="particle"
          :style="{ left: p.left, top: p.top, animationDuration: p.duration, animationDelay: p.delay }"
        ></div>
      </div>

      <aside class="layout-left">
        <div class="panel left-top">
          <div class="panel-title">AI工具运用深度演进</div>
          <div ref="cL1" class="chart-box"></div>
        </div>
        <div class="left-bottom-wrapper">
          <div class="panel left-bottom-item">
            <div class="panel-title">学术原创自律度</div>
            <div ref="cR3" class="chart-box"></div>
          </div>
          <div class="panel left-bottom-item">
            <div class="panel-title">复杂问题攻坚率</div>
            <div ref="cR4" class="chart-box"></div>
          </div>
        </div>
      </aside>

      <main class="layout-center">
        <div class="panel profile-panel">
          <div class="profile-header">学生数字档案</div>
          <div class="profile-content">
            <div class="avatar-section">
              <div class="avatar-circle">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </div>
            <div class="info-section">
              <div class="info-row">
                <span class="lbl">姓名</span><span class="val name">{{ currentUser.name }}</span>
                <span class="lbl">性别</span><span class="val">{{ currentUser.gender }}</span>
                <span class="lbl">学号</span><span class="val">{{ currentUser.sno }}</span>
              </div>
            </div>
            <div class="highlight-section">
              <div class="high-item">
                <div class="lbl">综合评价</div>
                <div class="val s-rank">{{ currentUser.rank }}</div>
              </div>
              <div class="high-item">
                <div class="lbl">系统活跃度</div>
                <div class="val">{{ currentUser.activity }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="panel center-main-panel">
          <div class="human-watermark"></div>
          <div class="panel-title">核心素养一级指标成长曲线</div>
          <div ref="mainLine" class="chart-box"></div>
        </div>
        
        <section class="center-ai">
          <div class="ai-title">AI 综合洞察</div>
          <div class="ai-text" v-html="currentUser.insight"></div>
        </section>
      </main>

      <aside class="layout-right">
        <div class="panel panel-r-wide"><div class="panel-title">批判发散思维发展趋势</div><div ref="cRWide2" class="chart-box"></div></div>
        <div class="panel panel-r-wide"><div class="panel-title">AI素养与学业水平综合评估</div><div ref="cLCombined" class="chart-box"></div></div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import 'echarts-liquidfill';

const cL1 = ref(null); const cR3 = ref(null); const cR4 = ref(null);
const mainLine = ref(null); const cRWide2 = ref(null); const cLCombined = ref(null);

let charts = {};

const route = useRoute();

// ===== Mock 数据库 =====
const mockDatabase = {
  "101": { // 林浩轩
    name: '林浩轩', gender: '男', sno: 'EDU-2026-101', rank: 'S', activity: '98%',
    insight: '该生长处显著：<span class="strength">AI素养</span> 与 <span class="strength">学术自律</span> 远超均值。且在深层素养方面：<span class="strength">复杂问题攻坚</span> 能力突出，<span class="strength">多向发散思维</span> 同样卓越。建议后续参与更高阶的科研创新项目探究。',
    l1Data: { pre: [85, 88, 92, 90, 95, 98], class: [90, 92, 95, 96, 98, 100] }, // 左上AI演进
    mainLine: { ai: [85,88,92,95,94,96,98,96,98,99,100], edu: [80,85,88,90,92,94,95,96,98,98,99], sci: [82,85,86,88,90,92,94,95,96,98,98] }, // 中间主图
    rWide2: [75, 80, 85, 88, 92, 95], // 批判发散
    lCombined: [98, 95, 96, 92, 90, 95], // AI素养学业评估
    r3Val: 1.0, r4Val: 90 // 自律度 / 攻坚率
  },
  "102": { // 李若曦
    name: '李若曦', gender: '女', sno: 'EDU-2026-102', rank: 'A', activity: '94%',
    insight: '该生长处显著：<span class="strength">AI素养</span> 与 <span class="strength">学术自律</span> 远超均值。但深层素养存在短板：其 <span class="weakness">复杂问题攻坚</span> 遇强则弱，且 <span class="weakness">多向发散思维</span> 亟待提升。建议后续针对性强化高阶训练。',
    l1Data: { pre: [75, 78, 85, 82, 88, 92], class: [80, 85, 90, 85, 92, 95] },
    mainLine: { ai: [82,85,90,88,92,95,90,94,95,92,88], edu: [75,78,80,82,78,85,82,84,85,88,85], sci: [68,70,72,75,75,80,78,82,80,82,84] },
    rWide2: [60, 65, 70, 75, 72, 78],
    lCombined: [95, 92, 88, 76, 45, 85],
    r3Val: 0.95, r4Val: 45
  }
};

const currentUser = ref(mockDatabase["102"]); // 默认初始值

const particles = Array.from({ length: 20 }).map(() => ({
  left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
  duration: (Math.random() * 4 + 2) + 's', delay: (Math.random() * 2) + 's'
}));

const initCharts = () => {
  const textColor = '#000000'; const axisColor = 'rgba(0, 0, 0, 0.25)'; const splitColor = 'rgba(0, 0, 0, 0.12)';
  const commonAxis = { axisLabel: { color: textColor, fontSize: 15, margin: 8 }, axisLine: { lineStyle: { color: axisColor, width: 1 } }, splitLine: { show: false } };
  const commonTooltip = { trigger: 'axis', textStyle: { fontSize: 15, color: textColor } };
  const user = currentUser.value;

  charts = { l1: echarts.init(cL1.value), lCombined: echarts.init(cLCombined.value), rWide2: echarts.init(cRWide2.value), r3: echarts.init(cR3.value), r4: echarts.init(cR4.value), mainLine: echarts.init(mainLine.value) };

  charts.l1.setOption({ tooltip: commonTooltip, legend: { data: ['课前AI探究', '课堂AI交互', '班级均值'], textStyle: { color: textColor, fontSize: 15 }, top: 0, right: 0, itemWidth: 10 }, grid: { top: 35, bottom: 20, left: 45, right: 20 }, yAxis: { type: 'category', data: ['W1', 'W3','W5', 'W7',  'W9', 'W11'], ...commonAxis, inverse: true }, xAxis: { type: 'value', min: 50, max: 100, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor, width: 1 } } }, series: [ { name: '课前AI探究', type: 'bar', barWidth: 6, itemStyle: { borderRadius: [0, 4, 4, 0], color: '#3B82F6' }, data: user.l1Data.pre }, { name: '课堂AI交互', type: 'bar', barWidth: 6, itemStyle: { borderRadius: [0, 4, 4, 0], color: '#10B981' }, data: user.l1Data.class }, { name: '班级均值', type: 'line', smooth: true, symbol: 'none', lineStyle: { width: 2, type: 'dashed', color: '#94A3B8' }, data: [70, 72, 74, 75, 76, 78] } ] });

  charts.lCombined.setOption({ tooltip: commonTooltip, legend: { data: ['个人', '班级均值'], textStyle: { color: textColor, fontSize: 15 }, top: 0, right: 0, itemWidth: 12 }, grid: { top: 40, bottom: 45, left: 40, right: 10 }, xAxis: { type: 'category', data: ['AI工具使用', 'AI内容提问', '知识内化', '逻辑重构', '复杂攻坚', '多模态提取'], axisLabel: { interval: 0, color: textColor, fontSize: 15, formatter: function(value) { return value.substring(0, 3) + '\n' + value.substring(3); } }, axisLine: { lineStyle: { color: axisColor } }, axisTick: { show: false } }, yAxis: { type: 'value', max: 100, axisLabel: { color: textColor, fontSize: 15 }, splitLine: { show: false } }, series: [ { name: '个人', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0], color: '#8B5CF6' }, label: { show: false }, data: user.lCombined }, { name: '班级均值', type: 'bar', barWidth: 12, itemStyle: { borderRadius: [4, 4, 0, 0], color: 'rgba(148, 163, 184, 0.4)' }, data: [82, 75, 85, 65, 55, 70] } ] });

  charts.mainLine.setOption({ tooltip: commonTooltip, legend: { data: ['AI素养', '学业水平', '科学思维', '调控能力', '社会协同', '班级综合均值'], bottom: 0, textStyle: { color: textColor, fontSize: 15 }, icon: 'roundRect' }, grid: { top: 20, bottom: 65, left: 45, right: 20 }, xAxis: { type: 'category', boundaryGap: false, data: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11'], ...commonAxis }, yAxis: { type: 'value', min: 60, max: 100, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor, type: 'dashed' } } }, series: [ { name: 'AI素养', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#3B82F6' }, data: user.mainLine.ai }, { name: '学业水平', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#10B981' }, data: user.mainLine.edu }, { name: '科学思维', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#F59E0B' }, data: user.mainLine.sci }, { name: '调控能力', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#8B5CF6' }, data: [80, 82, 85, 85, 88, 90, 88, 92, 94, 95, 94] }, { name: '社会协同', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, itemStyle: { color: '#EC4899' }, data: [75, 78, 80, 82, 85, 88, 86, 90, 90, 92, 90] }, { name: '班级综合均值', type: 'line', smooth: true, symbol: 'none', lineStyle: { width: 2, type: 'dashed', color: '#94A3B8' }, data: [70, 72, 75, 76, 78, 80, 82, 84, 85, 86, 88] } ] });

  charts.rWide2.setOption({ tooltip: commonTooltip, legend: { data: ['个人发散度', '班级均值'], right: 0, top: 0, textStyle: { fontSize: 15, color: textColor } }, grid: { top: 40, bottom: 30, left: 45, right: 20 }, xAxis: { type: 'category', boundaryGap: false, data: ['W1', 'W3', 'W5', 'W7',  'W9',  'W11'], ...commonAxis }, yAxis: { type: 'value', max: 100, ...commonAxis, splitLine: { show: true, lineStyle: { color: splitColor } } }, series: [ { name: '个人发散度', type: 'line', smooth: true, areaStyle: { color: 'rgba(245, 158, 11, 0.2)' }, lineStyle: { width: 3, color: '#F59E0B' }, itemStyle: { color: '#F59E0B' }, data: user.rWide2 }, { name: '班级均值', type: 'line', smooth: true, lineStyle: { width: 2, type: 'dashed', color: '#94A3B8' }, symbol: 'none', data: [65, 68, 70, 72, 75, 78] } ] });

  charts.r3.setOption({ series: [{ type: 'liquidFill', data: [user.r3Val, user.r3Val - 0.05], radius: '75%', center: ['50%', '50%'], color: ['#10B981', 'rgba(16, 185, 129, 0.5)'], backgroundStyle: { color: 'rgba(16, 185, 129, 0.05)' }, outline: { borderDistance: 2, itemStyle: { borderWidth: 2, borderColor: '#10B981' } }, label: { fontSize: 20, color: textColor, fontWeight: 'bold', formatter: function() { return (user.r3Val * 100).toFixed(0) + '%'; } } }] });

  charts.r4.setOption({ tooltip: { textStyle: { fontSize: 18, color: textColor } }, title: { text: user.r4Val + '%', left: 'center', top: 'center', textStyle: { fontSize: 18, fontWeight: 'bold', color: textColor } }, series: [{ type: 'pie', radius: ['60%', '80%'], center: ['50%', '50%'], hoverAnimation: false, label: { show: false }, data: [ { value: user.r4Val, name: '攻坚成功', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{offset: 0, color: '#EF4444'}, {offset: 1, color: '#F59E0B'}]) } }, { value: 100 - user.r4Val, name: '待提升', itemStyle: { color: 'rgba(148, 163, 184, 0.3)' } } ] }] });
};

const handleResize = () => { Object.values(charts).forEach(c => c && c.resize()); };

onMounted(() => {
  // 从localStorage获取学生ID
  const studentId = localStorage.getItem('currentStudentId');
  if (studentId && mockDatabase[studentId]) {
    currentUser.value = mockDatabase[studentId];
  } else {
    // 如果没有找到对应学生，使用默认学生
    currentUser.value = mockDatabase["102"];
  }

  nextTick(() => { initCharts(); });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  Object.values(charts).forEach(c => c && c.dispose());
});
</script>

<style scoped>
/* 此处与之前提供的 StudentDigitalArchive CSS 完全一致，直接保留 */
.dashboard-wrapper {
  --main-color: #2563EB; --warn-color: #EF4444; --high-color: #F59E0B; --text-title: #000000; --text-norm: #000000; --text-sub: #000000; --mod-bg: rgba(255, 255, 255, 0.65); --mod-border: rgba(255, 255, 255, 0.7); --mod-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8); --mod-radius: 14px; --ai-bg: rgba(239, 246, 255, 0.65); --ai-border: rgba(255, 255, 255, 0.8);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif; font-size: 18px; width: 100%; height: calc(100vh - 60px); background-color: #F8FAFC; overflow: hidden; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, rgba(241, 245, 249, 0.35) 0%, rgba(226, 232, 240, 0.35) 100%), url('@/assets/background.png') center/cover no-repeat; color: #000000;
  box-sizing: border-box;
}
#app { width: 100%; height: 100%; padding: 8px; display: flex; flex-direction: row; justify-content: space-between; align-items: stretch; gap: 16px; position: relative; box-sizing: border-box; }
#app::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
.particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.particle { position: absolute; width: 2px; height: 2px; background: var(--main-color); border-radius: 50%; opacity: 0; box-shadow: 0 0 6px var(--main-color); animation: floatUp linear infinite; }
@keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.08; } 100% { transform: translateY(-100px); opacity: 0; } }
.panel { background: var(--mod-bg); backdrop-filter: blur(16px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 12px; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; z-index: 10; }
.panel:hover { background: rgba(255, 255, 255, 0.65); box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.9); transform: translateY(-1px); }
.panel-title { font-size: 21px; font-weight: bold; color: #000000; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; letter-spacing: 0.5px; z-index: 2; }
.panel-title::before { content: ''; width: 3px; height: 14px; background: linear-gradient(180deg, #60A5FA 0%, #2563EB 100%); border-radius: 2px; box-shadow: 0 1px 2px rgba(37, 99, 235, 0.3); }
.chart-box { flex: 1; width: 100%; min-height: 0; z-index: 2; }
.layout-left { width: 25%; display: flex; flex-direction: column; gap: 12px; z-index: 10; }
.left-top { flex: 1.4; width: 100%; }
.left-bottom-wrapper { flex: 1; width: 100%; display: flex; gap: 12px; }
.left-bottom-item { flex: 1; height: 100%; padding: 7px 9px; width: 100%; }
.layout-right { width: 25%; display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); gap: 12px; z-index: 10; }
.panel-r-wide { grid-column: span 2; width: 100%; height: 100%; padding: 7px 9px; }
.layout-center { width: 48%; display: flex; flex-direction: column; gap: 12px; z-index: 10; }
.profile-panel { flex: none; padding: 8px 10px; }
.profile-header { text-align: center; font-size: 26px; font-weight: bold; color: #000000; letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid rgba(0, 0, 0, 0.2); padding-bottom: 5px; }
.profile-content { display: flex; align-items: center; gap: 20px; }
.avatar-section { display: flex; flex-direction: column; align-items: center; gap: 6px; color: #000000; }
.avatar-circle { width: 56px; height: 56px; background: linear-gradient(135deg, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.05)); border-radius: 8px; display: flex; justify-content: center; align-items: center; color: #64748B; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.info-section { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.info-row { display: flex; width: 410px; align-items: center; flex-wrap: wrap; gap: 8px; }
.info-row .lbl { color: #000000; min-width: 40px; text-align: right; }
.info-row .val { font-weight: bold; color: #000000; margin-right: 6px; font-size: 19px;}
.info-row .name { font-size: 19px; color: #000000; font-weight: bold; }
.highlight-section { display: flex; gap: 12px; border-left: 1px solid rgba(0, 0, 0, 0.3); padding-left: 12px; align-self: stretch; align-items: center; }
.high-item { display: flex; flex-direction: column; align-items: center; }
.high-item .lbl { color: #000000; margin-bottom: 4px; font-size: 19px; }
.high-item .val { font-size: 20px; font-weight: bold; color: #000000; }
.high-item .s-rank { background: linear-gradient(135deg, #3B82F6, #1D4ED8); -webkit-background-clip: text; color: transparent; font-size: 32px; font-weight: 800; line-height: 1; text-shadow: 0 2px 10px rgba(37, 99, 235, 0.2); }
.center-main-panel { flex: 1; overflow: hidden; display: flex; flex-direction: column; padding-top: 12px; }
.human-watermark { position: absolute; left: 50%; top: 55%; transform: translate(-50%, -50%); width: 80%; height: 90%; background: url('@/assets/human.png') no-repeat center/contain; opacity: 0.15; z-index: 1; pointer-events: none; }
.center-ai { flex: none; background: var(--ai-bg); backdrop-filter: blur(16px); border: 1px solid var(--ai-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 7px 9px; min-height: 70px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 10; }
.ai-title { font-size: 20px; font-weight: 600; color: #D97706; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; letter-spacing: 0.5px; }
.ai-title::before { content: '✦'; font-size: 20px; }
.ai-text { font-size: 18px; color: #000000; line-height: 1.6; letter-spacing: 0.3px; }
:deep(.strength) { color: #10B981; font-weight: bold; background: rgba(16, 185, 129, 0.15); padding: 0 4px; border-radius: 4px; }
:deep(.weakness) { color: #EF4444; font-weight: bold; background: rgba(239, 68, 68, 0.15); padding: 0 4px; border-radius: 4px; }
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
</style>
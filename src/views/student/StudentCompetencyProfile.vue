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
        <div class="panel panel-full"><div class="panel-title">知识掌握演进</div><div ref="cL1" class="chart-box"></div></div>
        <div class="panel panel-full"><div class="panel-title">AI素养与题型攻坚评估</div><div ref="cL3" class="chart-box"></div></div>
      </aside>

      <main class="layout-center">
        <header class="center-header">
          <h1>学生能力画像</h1>
        </header>
        <section class="center-info">
          <div class="info-item"><span class="info-label">姓名</span><span class="info-val">{{ currentUser.name }}</span></div>
          <div class="info-item"><span class="info-label">学号</span><span class="info-val" style="font-size:18px; color:#334155; font-weight:700;">{{ currentUser.sno }}</span></div>
          <div class="info-item"><span class="info-label">综合评级</span><span class="info-val s-rank">{{ currentUser.rank }}</span></div>
          <div class="info-item"><span class="info-label">系统活跃度</span><span class="info-val">{{ currentUser.activity }}</span></div>
        </section>
        
        <section class="center-radar-container">
          <div ref="mainRadar" id="main-radar"></div>
        </section>
        
        <section class="center-ai">
          <div class="ai-title">AI 综合洞察</div>
          <div class="ai-text" v-html="currentUser.insight"></div>
        </section>
      </main>

      <aside class="layout-side">
        <div class="panel panel-horizontal"><div class="panel-title">限时抗压效能趋势</div><div ref="cRTop1" class="chart-box"></div></div>
        <div class="panel panel-horizontal"><div class="panel-title">学科关键能力评估</div><div ref="cRTop2" class="chart-box"></div></div>
        
        <div class="panel panel-mini"><div class="panel-title">全局效能把控度</div><div ref="cR1" class="chart-box"></div></div>
        <div class="panel panel-mini"><div class="panel-title">AI拓展学习度</div><div ref="cR2" class="chart-box"></div></div>
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
      
      <div 
        id="l3-tooltip" :class="{ show: l3Tooltip.visible }"
        :style="{ left: l3Tooltip.left, top: l3Tooltip.top }"
      >
        <div id="l3-content">
          <div class="tooltip-title">{{ l3Tooltip.data.title }}</div>
          <div class="tooltip-row" v-for="row in l3Tooltip.data.rows" :key="row.n">
            <span class="row-label">{{ row.n }}</span><span class="row-value">{{ row.v }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import 'echarts-liquidfill';

const cL1 = ref(null); const cL3 = ref(null); const cRTop1 = ref(null); const cRTop2 = ref(null);
const cR1 = ref(null); const cR2 = ref(null); const mainRadar = ref(null);

let charts = {};
let l2ChartInstances = {};

const route = useRoute();

// ===== Mock 数据库 =====
const mockDatabase = {
  "101": { // 林浩轩
    name: '林浩轩', sno: 'EDU-2026-101', rank: 'S', activity: '98%',
    insight: '该生在<span class="strength">AI素养</span>与<span class="strength">知识掌握</span>方面表现极佳，各项指标均衡。近期在 <span class="strength">复杂问题攻坚</span> 方面进步显著，具备极强的逻辑重构能力。',
    l1Scores: [85, 95, 88, 82, 90, 92, 95], // 知识掌握演进
    radarData: {
      "AI素养": { value: 95, sub: { "课前探究": { value: 92, l3: [ { n: "AI工具预习", v: "90%" }, { n: "资料利用", v: "95%" } ] }, "课堂交互": { value: 98, l3: [ { n: "参与率", v: "100%" }, { n: "提问质量", v: "极高" } ] }, "课后拓展": { value: 95, l3: [ { n: "辅助使用", v: "92%" }, { n: "学习时长", v: "60分钟" } ] } } },
      "学业水平": { value: 92, sub: { "学科能力": { value: 90, l3: [ { n: "提取力", v: "92%" }, { n: "推理力", v: "88%" }, { n: "实践力", v: "90%" } ] }, "知识掌握": { value: 95, l3: [ { n: "内化率", v: "96%" }, { n: "巩固度", v: "94%" }, { n: "迁移度", v: "95%" } ] }, "题型攻坚": { value: 90, l3: [ { n: "概念解析", v: "95%" }, { n: "逻辑重构", v: "90%" }, { n: "复杂攻坚", v: "85%" } ] } } },
      "科学思维": { value: 88, sub: { "思维敏捷": { value: 90, l3: [ { n: "响应度", v: "极快" }, { n: "抗压效能", v: "92%" } ] }, "批判发散": { value: 85, l3: [ { n: "质疑探究", v: "强" }, { n: "思维发散", v: "良" } ] }, "自我认知": { value: 90, l3: [ { n: "认知校准", v: "92%" }, { n: "归因复盘", v: "88%" } ] } } },
      "调控能力": { value: 94, sub: { "学术自律": { value: 98, l3: [ { n: "规则遵从", v: "100%" }, { n: "原创自律", v: "96%" } ] }, "时间规划": { value: 92, l3: [ { n: "节奏适配", v: "95%" }, { n: "效能把控", v: "极优" } ] }, "测评应对": { value: 90, l3: [ { n: "规避调控", v: "88%" }, { n: "审慎校验", v: "92%" } ] }, "绩效抗压": { value: 95, l3: [ { n: "表现波动", v: "极低" }, { n: "操作严谨", v: "优" } ] } } },
      "社会协同": { value: 90, sub: { "个性潜能": { value: 88, l3: [ { n: "优势区", v: "全栈" }, { n: "待唤醒区", v: "无" } ] }, "发展增值": { value: 92, l3: [ { n: "超越增值", v: "25%" }, { n: "竞争位移", v: "前5%" } ] }, "团队协同": { value: 90, l3: [ { n: "协同贡献", v: "40%" }, { n: "朋辈辐射", v: "极高" } ] } } }
    }
  },
  "102": { // 李若曦 (使用原版的默认数据作为这名学生的数据)
    name: '李若曦', sno: 'EDU-2026-102', rank: 'A', activity: '94%',
    insight: '该生在<span class="strength">AI素养</span>与<span class="strength">知识掌握</span>方面表现优异。但近期在 <span class="weakness">复杂问题攻坚</span> 及 <span class="weakness">实践操作验证</span> 方面数据薄弱，建议加强高阶题型训练。',
    l1Scores: [75, 78, 85, 82, 88, 90, 92],
    radarData: {
      "AI素养": { value: 88, sub: { "课前探究": { value: 85, l3: [ { n: "预习率", v: "82%" }, { n: "资料率", v: "88%" } ] }, "课堂交互": { value: 92, l3: [ { n: "互动参与", v: "95%" }, { n: "提问质量", v: "高" } ] }, "课后拓展": { value: 87, l3: [ { n: "辅助使用", v: "85%" }, { n: "学习时长", v: "45分钟" } ] } } },
      "学业水平": { value: 85, sub: { "学科能力": { value: 82, l3: [ { n: "提取力", v: "85%" }, { n: "推理力", v: "78%" }, { n: "实践力", v: "65%" } ] }, "知识掌握": { value: 90, l3: [ { n: "内化率", v: "92%" }, { n: "巩固度", v: "88%" }, { n: "迁移度", v: "85%" } ] }, "题型攻坚": { value: 78, l3: [ { n: "概念解析", v: "90%" }, { n: "逻辑重构", v: "76%" }, { n: "复杂攻坚", v: "65%" } ] } } },
      "科学思维": { value: 80, sub: { "思维敏捷": { value: 84, l3: [ { n: "响应度", v: "较快" }, { n: "抗压效能", v: "88%" } ] }, "批判发散": { value: 75, l3: [ { n: "质疑探究", v: "中等" }, { n: "思维发散", v: "不足" } ] }, "自我认知": { value: 82, l3: [ { n: "认知校准", v: "85%" }, { n: "归因复盘", v: "78%" } ] } } },
      "调控能力": { value: 86, sub: { "学术自律": { value: 94, l3: [ { n: "规则遵从", v: "100%" }, { n: "原创自律", v: "92%" } ] }, "时间规划": { value: 85, l3: [ { n: "节奏适配", v: "88%" }, { n: "效能把控", v: "优" } ] }, "测评应对": { value: 82, l3: [ { n: "规避调控", v: "80%" }, { n: "审慎校验", v: "85%" } ] }, "绩效抗压": { value: 84, l3: [ { n: "表现波动", v: "低" }, { n: "操作严谨", v: "良" } ] } } },
      "社会协同": { value: 88, sub: { "个性潜能": { value: 85, l3: [ { n: "优势区", v: "系统逻辑" }, { n: "待唤醒区", v: "发散表达" } ] }, "发展增值": { value: 90, l3: [ { n: "超越增值", v: "22%" }, { n: "竞争位移", v: "前12%" } ] }, "团队协同": { value: 88, l3: [ { n: "协同贡献", v: "35%" }, { n: "朋辈辐射", v: "高" } ] } } }
    }
  }
};

const currentUser = ref(mockDatabase["102"]); // 默认初始值

// 粒子特效
const particles = Array.from({ length: 20 }).map(() => ({
  left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
  duration: (Math.random() * 4 + 2) + 's', delay: (Math.random() * 2) + 's'
}));

const activePopups = ref([]);
const l3Tooltip = ref({ visible: false, left: '0px', top: '0px', data: { title: '', rows: [] } });
let dragState = null;

const handleMouseMove = (e) => {
  if (dragState) {
    const target = activePopups.value.find(p => p.name === dragState.name);
    if(target) {
      target.left = (dragState.initialX + (e.clientX - dragState.startX)) + 'px';
      target.top = (dragState.initialY + (e.clientY - dragState.startY)) + 'px';
      l3Tooltip.value.visible = false;
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
  l3Tooltip.value.visible = false;
  if(l2ChartInstances[name]) { l2ChartInstances[name].dispose(); delete l2ChartInstances[name]; }
  updateMainRadarLabels();
};

const triggerPopup = (l1Name, originalEvent) => {
  if (!l1Name || !currentUser.value.radarData[l1Name] || activePopups.value.some(p => p.name === l1Name)) return;
  const colorPalette = [ { main: '#1D4ED8', bg: 'rgba(29, 78, 216, 0.95)', area: 'rgba(29, 78, 216, 0.35)', line: 'rgba(29, 78, 216, 0.5)' }, { main: '#047857', bg: 'rgba(4, 120, 87, 0.95)', area: 'rgba(4, 120, 87, 0.35)', line: 'rgba(4, 120, 87, 0.5)' }, { main: '#B45309', bg: 'rgba(180, 83, 9, 0.95)', area: 'rgba(180, 83, 9, 0.35)', line: 'rgba(180, 83, 9, 0.5)' }, { main: '#BE185D', bg: 'rgba(190, 24, 93, 0.95)', area: 'rgba(190, 24, 93, 0.35)', line: 'rgba(190, 24, 93, 0.5)' } ];
  const scheme = colorPalette[activePopups.value.length % colorPalette.length];
  let popX = originalEvent.clientX; let popY = originalEvent.clientY;
  activePopups.value.push({ name: l1Name, left: popX + 'px', top: popY + 'px', zIndex: 1005 });
  updateMainRadarLabels();
  nextTick(() => {
    const chartDom = document.getElementById(`l2-chart-${l1Name}`);
    if (chartDom) {
      const chartInstance = echarts.init(chartDom);
      l2ChartInstances[l1Name] = chartInstance;
      renderLevel2Chart(chartInstance, l1Name, scheme);
      bindL3Tooltip(chartInstance, l1Name, chartDom.parentElement);
    }
  });
};

const updateMainRadarLabels = () => {
  charts.mainRadar.setOption({ radar: { axisName: { formatter: (value) => activePopups.value.some(p => p.name === value) ? '{h|}' : '{n|' + value + '}' } } });
};

const renderLevel2Chart = (chartInstance, l1Name, colorScheme) => {
  const subData = currentUser.value.radarData[l1Name].sub;
  const l2Indicators = Object.keys(subData).map(k => ({ name: k, max: 100 }));
  const l2Values = Object.values(subData).map(v => v.value);
  chartInstance.setOption({
    title: { text: l1Name, left: 'center', top: 'center', textStyle: { color: colorScheme.main, fontSize: 22, fontWeight: '900', textShadowColor: 'rgba(255, 255, 255, 0.9)', textShadowBlur: 6 } },
    radar: { indicator: l2Indicators, triggerEvent: true, radius: '40%', center: ['50%', '50%'], nameGap: 14, axisName: { color: '#fff', backgroundColor: colorScheme.bg, borderRadius: 4, padding: [6, 8], fontSize: 20, fontWeight: '700', cursor: 'pointer', lineHeight: 18, formatter: (value) => value.length > 5 ? value.substring(0, 4) + '\n' + value.substring(4) : value }, splitArea: { show: true, areaStyle: { color: ['rgba(203, 213, 225, 0.4)', 'rgba(226, 232, 240, 0.4)'] } }, splitLine: { lineStyle: { color: colorScheme.line, width: 1.5 } }, axisLine: { lineStyle: { color: colorScheme.line, width: 1.5 } } },
    series: [{ type: 'radar', data: [{ value: l2Values, label: { show: true, formatter: (params) => (params.value / 100).toFixed(2), color: colorScheme.main, fontSize: 20, fontWeight: '900', distance: 5, padding: -10 } }], itemStyle: { color: colorScheme.main }, areaStyle: { color: colorScheme.area }, lineStyle: { width: 2 }, symbolSize: 6, symbol: 'circle' }]
  });
};

const bindL3Tooltip = (chartInstance, l1Name, containerEl) => {
  chartInstance.on('mouseover', (params) => { if (params.name && params.componentType === 'radar') showL3Tooltip(l1Name, params.name, params.event.event, containerEl); });
  chartInstance.on('mouseout', () => { l3Tooltip.value.visible = false; });
  chartInstance.on('mousemove', (params) => { if (params.name && params.componentType === 'radar') updateL3TooltipPos(params.event.event, containerEl); });
};
const showL3Tooltip = (l1Key, l2Name, e, containerEl) => {
  const l3DataArray = currentUser.value.radarData[l1Key].sub[l2Name]?.l3;
  if (!l3DataArray) return;
  l3Tooltip.value.data = { title: l2Name, rows: l3DataArray };
  updateL3TooltipPos(e, containerEl);
  l3Tooltip.value.visible = true;
};
const updateL3TooltipPos = (e, containerEl) => {
  if (!e) return;
  const rect = containerEl.getBoundingClientRect();
  const l2CenterX = rect.left + rect.width / 2; const l2CenterY = rect.top + rect.height / 2;
  let left = e.clientX > l2CenterX ? e.clientX + 8 : e.clientX - 180 - 8;
  let top = e.clientY > l2CenterY ? e.clientY + 8 : e.clientY - 100 - 8;
  l3Tooltip.value.left = Math.max(8, Math.min(left, window.innerWidth - 188)) + 'px';
  l3Tooltip.value.top = Math.max(8, Math.min(top, window.innerHeight - 108)) + 'px';
};

const initCharts = () => {
  const axisColor = 'rgba(71, 85, 105, 0.5)'; const splitColor = 'rgba(71, 85, 105, 0.2)'; const textColor = '#0F172A'; 
  const commonAxis = { axisLabel: { color: textColor, fontSize: 17, margin: 10, fontWeight: 600 }, axisLine: { lineStyle: { color: axisColor, width: 2 } }, splitLine: { show: false } };
  const user = currentUser.value;

  charts = { l1: echarts.init(cL1.value), l3: echarts.init(cL3.value), rTop1: echarts.init(cRTop1.value), rTop2: echarts.init(cRTop2.value), r1: echarts.init(cR1.value), r2: echarts.init(cR2.value), mainRadar: echarts.init(mainRadar.value) };

  charts.l1.setOption({ tooltip: { trigger: 'axis' }, legend: { data: ['知识内化率', '知识长效巩固度', '知识迁移应用度', '班级平均线'], textStyle: { color: textColor, fontSize: 17, fontWeight: 600 }, top: 0, right: 0, icon: 'circle', itemWidth: 8, itemGap: 10, width: 260 }, grid: { top: 50, bottom: 25, left: 45, right: 35 }, xAxis: { type: 'category', data: ['课次1', '课次2', '课次3', '课次4', '课次5', '课次6', '课次7'], ...commonAxis, nameTextStyle: {color: textColor, fontSize: 18, fontWeight: 700} }, yAxis: { type: 'value', name: '得分(%)', min: 60, max: 100, ...commonAxis, nameTextStyle: {color: textColor, fontSize: 18, fontWeight: 700}, splitLine: { show: true, lineStyle: { color: splitColor, width: 1 } } }, series: [ { name: '知识内化率', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3, color: '#2563EB' }, itemStyle: { color: '#2563EB' }, data: user.l1Scores }, { name: '知识长效巩固度', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3, color: '#059669' }, itemStyle: { color: '#059669' }, data: [70, 65, 70, 75, 72, 80, 85] }, { name: '知识迁移应用度', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3, color: '#D97706' }, itemStyle: { color: '#D97706' }, data: [65, 77, 62, 62, 68, 75, 78] }, { name: '班级平均线', type: 'line', smooth: true, symbol: 'none', lineStyle: { width: 3, color: '#64748B', type: 'dashed' }, itemStyle: { color: '#64748B' }, data: [68, 77, 75, 74, 78, 82, 88] } ] });
  charts.l3.setOption({ tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }, legend: { data: ['个人表现', '班级平均'], textStyle: { color: textColor, fontSize: 17, fontWeight: 600 }, top: 0, right: 0 }, grid: { top: 35, bottom: 45, left: 45, right: 20 }, xAxis: { type: 'category', data: ['AI预习', 'AI互动', 'AI作业', '概念解析', '逻辑重构', '复杂攻坚'], ...commonAxis, axisLabel: { margin: 10, color: textColor, fontSize: 17, fontWeight: 700, interval: 0, width: 45, overflow: 'break' } }, yAxis: { type: 'value', name: '比率(%)', min:50, max: 100, ...commonAxis, nameTextStyle: {color: textColor, fontSize: 18, fontWeight: 700}, splitLine: { show: true, lineStyle: { color: splitColor, width: 1 } } }, series: [ { name: '个人表现', type: 'bar', barWidth: 16, itemStyle: { borderRadius: [6, 6, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#7C3AED'}, {offset: 1, color: '#DB2777'}]) }, label: { show: true, position: 'top', formatter: '{c}%', fontSize: 16, fontWeight: 700, color: textColor }, data: [88, 95, 85, 90, 76, 65] }, { name: '班级平均', type: 'line', symbol: 'none', lineStyle: { color: '#94A3B8', width: 2, type: 'dashed' }, data: [70, 75, 68, 82, 70, 58] } ] });
  charts.rTop1.setOption({ tooltip: { trigger: 'axis' }, legend: { data: ['个人效能', '班级平均'], textStyle: { color: textColor, fontSize: 17, fontWeight: 600 }, top: 0, right: 0 }, grid: { top: 35, bottom: 30, left: 35, right: 15 }, xAxis: { type: 'category', data: ['测验1', '测验2', '测验3', '测验4', '测验5', '测验6'], ...commonAxis, axisLabel: { margin: 10, color: textColor, fontSize: 18, fontWeight: 600 } }, yAxis: { type: 'value', min: 0.5, max: 1.0, ...commonAxis, axisLabel: { margin: 10, color: textColor, fontSize: 17, fontWeight: 600 }, splitLine: { show: true, lineStyle: { color: splitColor, width: 1 } } }, series: [ { name: '个人效能', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3, color: '#059669' }, itemStyle: { color: '#059669' }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(5, 150, 105, 0.4)'}, {offset: 1, color: 'transparent'}]) }, data: [0.65, 0.72, 0.68, 0.75, 0.82, 0.88], label: { show: true, position: 'top', formatter: '{c}', fontSize: 18, color: '#059669', fontWeight: 800 } }, { name: '班级平均', type: 'line', smooth: true, symbol: 'none', lineStyle: { width: 2, color: '#94A3B8', type: 'dashed' }, data: [0.60, 0.65, 0.63, 0.68, 0.70, 0.75] } ] });
  charts.rTop2.setOption({ tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }, legend: { data: ['个人得分', '班级平均'], textStyle: { color: textColor, fontSize: 17, fontWeight: 600 }, top: 0, right: 0 }, grid: { top: 35, bottom: 30, left: 40, right: 15 }, xAxis: { type: 'category', data: ['多模态提取', '科学推理', '实践操作'], ...commonAxis, axisLabel: { margin: 10, color: textColor, fontSize: 17, fontWeight: 700, interval: 0 } }, yAxis: { type: 'value', max: 100, ...commonAxis, axisLabel: { margin: 10, color: textColor, fontSize: 17, fontWeight: 600 }, splitLine: { show: true, lineStyle: { color: splitColor, width: 1 } } }, series: [ { name: '个人得分', type: 'bar', barWidth: 20, itemStyle: { borderRadius: [4, 4, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#D97706'}, {offset: 1, color: '#FBBF24'}]) }, label: { show: true, position: 'top', formatter: '{c}', fontSize: 17, color: '#D97706', fontWeight: 800 }, data: [85, 78, 65] }, { name: '班级平均', type: 'bar', barWidth: 20, itemStyle: { borderRadius: [4, 4, 0, 0], color: '#CBD5E1' }, label: { show: true, position: 'top', formatter: '{c}', fontSize: 16, color: '#64748B', fontWeight: 700 }, data: [70, 65, 55] } ] });
  charts.r1.setOption({ title: { left: 'center', bottom: '0', textStyle: { fontSize: 18, color: '#64748B', fontWeight: 600 } }, series: [{ type: 'liquidFill', data: [0.88, 0.85], radius: '70%', center: ['50%', '42%'], color: ['#2563EB', 'rgba(37, 99, 235, 0.6)'], backgroundStyle: { color: 'rgba(37, 99, 235, 0.1)' }, outline: { borderDistance: 3, itemStyle: { borderWidth: 3, borderColor: '#2563EB' } }, label: { fontSize: 34, color: '#020617', fontWeight: 900, formatter: function() { return '88%'; } } }] });
  charts.r2.setOption({ title: [ { text: '85%', left: 'center', top: '32%', textStyle: { fontSize: 30, fontWeight: 900, color: '#7C3AED' } }, { left: 'center', bottom: '0', textStyle: { fontSize: 18, color: '#64748B', fontWeight: 600 } } ], series: [{ type: 'pie', radius: ['55%', '70%'], center: ['50%', '42%'], hoverAnimation: false, label: { show: false }, data: [ { value: 85, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{offset: 0, color: '#2563EB'}, {offset: 1, color: '#7C3AED'}]) } }, { value: 15, itemStyle: { color: 'rgba(100, 116, 139, 0.2)' } } ] }] });

  const l1Indicators = Object.keys(user.radarData).map(k => ({ name: k, max: 100 }));
  const l1Values = Object.values(user.radarData).map(v => v.value);
  charts.mainRadar.setOption({
    radar: { indicator: l1Indicators, startAngle: 90, clockwise: false, radius: '40%', center: ['50%', '50%'], splitNumber: 3, nameGap: 16, axisName: { formatter: (value) => '{n|' + value + '}', rich: { n: { color: '#ffffff', backgroundColor: 'rgba(29, 78, 216, 0.95)', borderRadius: 6, fontSize: 22, fontWeight: '700', padding: [6, 10], lineHeight: 20, textShadowBlur: 4, textShadowColor: 'rgba(0,0,0,0.4)', align: 'center', cursor: 'pointer' }, h: { color: 'transparent', backgroundColor: 'transparent', padding: 0, fontSize: 10, lineHeight: 0 } } }, splitLine: { lineStyle: { color: 'rgba(51, 65, 85, 0.4)', width: 1.5 } }, splitArea: { show: true, areaStyle: { color: ['rgba(203, 213, 225, 0.6)', 'rgba(226, 232, 240, 0.6)'] } }, axisLine: { lineStyle: { color: 'rgba(51, 65, 85, 0.4)', width: 1.5 } } },
    series: [{ type: 'radar', data: [{ value: l1Values, name: '当前学生', label: { show: true, formatter: (params) => (params.value / 100).toFixed(2), color: '#1D4ED8', fontSize: 20, fontWeight: '900', distance: 6, padding: -12 } }], itemStyle: { color: '#1D4ED8' }, areaStyle: { color: 'rgba(29, 78, 216, 0.3)' }, lineStyle: { color: '#1D4ED8', width: 2 }, symbol: 'circle', symbolSize: 8, emphasis: { itemStyle: { shadowBlur: 8, shadowColor: '#1D4ED8' }, lineStyle: { width: 3 } } }]
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
  // 从localStorage获取学生ID
  const studentId = localStorage.getItem('currentStudentId');
  if (studentId && mockDatabase[studentId]) {
    currentUser.value = mockDatabase[studentId];
  } else {
    // 如果没有找到对应学生，使用默认学生
    currentUser.value = mockDatabase["102"];
  }

  nextTick(() => { initCharts(); });
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('resize', handleResizeWindow);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp);
  window.removeEventListener('resize', handleResizeWindow);
  Object.values(charts).forEach(c => c && c.dispose()); Object.values(l2ChartInstances).forEach(c => c && c.dispose());
});
</script>

<style scoped>
/* 此处与之前提供的 StudentCompetencyProfile CSS 完全一致，直接保留 */
.dashboard-wrapper {
  --main-color: #1D4ED8; --warn-color: #B91C1C; --high-color: #B45309; --text-title: #020617; --text-norm: #0F172A; --text-sub: #334155; --mod-bg: rgba(255, 255, 255, 0.85); --mod-border: rgba(203, 213, 225, 0.8); --mod-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9); --mod-radius: 14px; --ai-bg: rgba(219, 234, 254, 0.85); --ai-border: rgba(191, 219, 254, 0.9);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif; font-size: 18px; width: 100%; height: calc(100vh - 60px); background-color: #F1F5F9; overflow: hidden; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, rgba(226, 232, 240, 0.5) 0%, rgba(203, 213, 225, 0.5) 100%), url('@/assets/background.png') center/cover no-repeat;
  box-sizing: border-box;
}
#app { width: 100%; height: 100%; padding: 12px; display: flex; justify-content: space-between; align-items: stretch; gap: 16px; position: relative; box-sizing: border-box; }
#app::before { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
.human-watermark { position: absolute; left: 50%; top: 65%; transform: translate(-50%, -50%); width: 550px; height: 700px; background: url('@/assets/human.png') no-repeat center/contain; opacity: 0.7; z-index: 1; pointer-events: none; }
.particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.particle { position: absolute; width: 2px; height: 2px; background: var(--main-color); border-radius: 50%; opacity: 0; box-shadow: 0 0 6px var(--main-color); animation: floatUp linear infinite; }
@keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.15; } 100% { transform: translateY(-100px); opacity: 0; } }
.layout-side { width: 28%; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 12px; z-index: 10; }
.layout-center { width: 42%; display: flex; flex-direction: column; gap: 12px; z-index: 10; }
.panel { background: var(--mod-bg); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 10px; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.panel:hover { background: rgba(255, 255, 255, 0.95); box-shadow: 0 12px 40px 0 rgba(15, 23, 42, 0.1), inset 0 1px 1px rgba(255, 255, 255, 1); transform: translateY(-1px); }
.panel-half { width: calc((100% - 12px) / 2); height: calc((100% - 12px) / 2); }
.panel-full { width: 100%; height: calc((100% - 12px) / 2); }
.panel-horizontal { width: 100%; height: calc((100% - 24px) / 3); padding: 5px 6px; }
.panel-mini { width: calc((100% - 12px) / 2); height: calc((100% - 24px) / 3); padding: 5px 6px; }
.panel-title { font-size: 19px; font-weight: 700; color: var(--text-title); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px; }
.panel-mini .panel-title, .panel-horizontal .panel-title { font-size: 18px; margin-bottom: 2px; font-weight: 700; }
.panel-title::before { content: ''; width: 4px; height: 16px; background: linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%); border-radius: 2px; box-shadow: 0 1px 3px rgba(29, 78, 216, 0.4); }
.chart-box { flex: 1; width: 100%; min-height: 0; position: relative; }
.center-header { display: flex; justify-content: center; align-items: center; text-align: center; padding: 6px 0; background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(241,245,249,0.5) 100%); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); height: 58px; }
.center-header h1 { font-size: 30px; color: var(--text-title); font-weight: 800; letter-spacing: 5px; text-shadow: 0 2px 4px rgba(255, 255, 255, 1); }
.center-info { background: var(--mod-bg); backdrop-filter: blur(20px); border: 1px solid var(--mod-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 5px 4px; display: flex; justify-content: space-around; align-items: center; height: 72px; }
.info-item { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 60px; }
.info-label { font-size: 16px; font-weight: 600; color: var(--text-sub); letter-spacing: 0.5px; }
.info-val { font-size: 24px; font-weight: 800; color: var(--text-title); white-space: nowrap; }
.info-val.s-rank { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, #1D4ED8, #1E3A8A); -webkit-background-clip: text; color: transparent; line-height: 1; text-shadow: 0 4px 12px rgba(29, 78, 216, 0.3); }
.center-radar-container { flex: 1; position: relative; width: 100%; min-height: 0; cursor: pointer; }
#main-radar { position: absolute; inset: 0; width: 100%; height: 100%; }
.center-ai { flex: none; background: var(--ai-bg); backdrop-filter: blur(16px); border: 1px solid var(--ai-border); border-radius: var(--mod-radius); box-shadow: var(--mod-shadow); padding: 4px 6px; min-height: 70px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 10; }
.ai-title { font-size: 20px; font-weight: 600; color: #D97706; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; letter-spacing: 0.5px; }
.ai-title::before { content: '✦'; font-size: 20px; }
.ai-text { font-size: 18px; color: #000000; line-height: 1.6; letter-spacing: 0.3px; }
:deep(.strength) { color: #10B981; font-weight: bold; background: rgba(16, 185, 129, 0.15); padding: 0 4px; border-radius: 4px; }
:deep(.weakness) { color: #EF4444; font-weight: bold; background: rgba(239, 68, 68, 0.15); padding: 0 4px; border-radius: 4px; }
.l2-floating-container { position: fixed; width: 480px; height: 480px; background: transparent; cursor: grab; opacity: 0; transform: translate(-50%, -50%) scale(0.2); transition: opacity 0.3s ease, transform 0.3s ease; }
.l2-floating-container:active { cursor: grabbing; }
@keyframes elasticPop { 0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; } 40% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; } 65% { transform: translate(-50%, -50%) scale(0.92); opacity: 1; } 85% { transform: translate(-50%, -50%) scale(1.03); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
.l2-floating-container.active { opacity: 1; transform: translate(-50%, -50%) scale(1); animation: elasticPop 0.65s cubic-bezier(0.28, 0.84, 0.42, 1) forwards; pointer-events: auto; }
.l2-chart-floating { width: 100%; height: 100%; }
.l2-close-btn { position: absolute; top: 32px; right: 32px; width: 32px; height: 32px; background: rgba(15, 23, 42, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #334155; font-size: 22px; font-weight: bold; cursor: pointer; z-index: 10; transition: all 0.2s; }
.l2-close-btn:hover { background: rgba(220, 38, 38, 0.2); color: #B91C1C; transform: scale(1.1); }
#l3-tooltip { position: fixed; z-index: 1010; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border: 2px solid var(--mod-border); box-shadow: var(--mod-shadow); border-radius: var(--mod-radius); color: var(--text-norm); padding: 7px 10px; font-size: 16px; pointer-events: none; opacity: 0; transform: scale(0.9); transition: opacity 0.2s ease, transform 0.2s ease; white-space: nowrap; }
#l3-tooltip.show { opacity: 1; transform: scale(1); }
.tooltip-title { font-size: 18px; font-weight: 800; color: var(--text-title); border-bottom: 2px solid var(--mod-border); padding-bottom: 6px; margin-bottom: 8px; letter-spacing: 0.5px; }
.tooltip-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; line-height: 1.4; gap: 20px; }
.row-label { color: var(--text-sub); font-weight: 600; }
.row-value { color: var(--main-color); font-weight: 800; font-family: 'Inter', monospace; font-size: 16px; }
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
</style>
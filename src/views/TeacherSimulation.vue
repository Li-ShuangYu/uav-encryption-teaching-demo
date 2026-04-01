<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-accentGreen rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">无人机通信加密 - 仿真性能综合对比</h1>
      </div>
      <button class="bg-accentGreen hover:bg-accentGreenDark text-white px-5 py-2 rounded shadow transition-colors flex items-center gap-2 text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        进入课程收尾
      </button>
    </header>

    <main class="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4 overflow-hidden bg-darkBg">
      <div 
        v-for="group in groupConfigs" 
        :key="group.id"
        class="bg-panelBg border rounded-lg flex flex-col overflow-hidden relative"
        :style="{
          borderColor: group.themeColor,
          boxShadow: `0 0 15px ${group.themeColor}33`
        }"
      >
        <div 
          class="px-4 py-3 border-b flex justify-between items-center"
          :style="{
            borderBottomColor: group.themeColor,
            backgroundColor: `${group.themeColor}1A`
          }"
        >
          <h2 class="font-bold flex items-center gap-2" :style="{ color: group.themeColor }">
            <span 
              class="text-xs px-2 py-0.5 rounded"
              :style="{ backgroundColor: `${group.themeColor}33`, color: group.themeColor }"
            >
              {{ group.name }}
            </span>
            {{ group.title }}
          </h2>
          <span 
            class="text-xs flex items-center gap-1 font-medium"
            :style="{ color: group.themeColor }"
          >
            <span 
              class="w-2 h-2 rounded-full animate-pulse"
              :style="{ backgroundColor: group.themeColor }"
            ></span>
            {{ group.statusText }}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-2 p-4 pb-2">
          <div 
            v-for="metric in group.metrics" 
            :key="metric.label"
            class="bg-darkBg rounded p-2 text-center border"
            :style="{ borderColor: `${group.themeColor}80` }"
          >
            <div class="text-xs text-textMuted mb-1">{{ metric.label }}</div>
            <div class="text-lg font-bold" :class="metric.class || 'text-white'">
              {{ metric.value }} <span class="text-xs text-textMuted font-normal">{{ metric.unit }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 w-full px-4 pb-4 relative">
          <div class="absolute top-2 left-4 text-xs text-textMuted z-10">实时加密吞吐量波形</div>
          <div :id="`chart-${group.id}`" class="w-full h-full"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive } from 'vue';
import * as echarts from 'echarts';

// 1. 数据配置
const groupConfigs = reactive([
  {
    id: 'group1',
    name: '第一组',
    title: '低功耗优化方案',
    themeColor: '#3b82f6',
    statusText: '运行中',
    isAlert: false,
    // 基准值和波动范围
    baseMetrics: { latency: 45, power: 8.5, successRate: 99.99 },
    metrics: [
      { label: '端到端时延', value: '45', unit: 'ms' },
      { label: '系统功耗', value: '8.5', unit: 'W', class: 'text-barGreen' },
      { label: '加密成功率', value: '99.99%', unit: '', class: 'text-barGreen' }
    ],
    // 增加随机振幅，模拟密文波形的急剧跳变
    dataGenerator: () => 80 + (Math.random() * 40 - 20),
    // 指标波动生成器
    metricGenerator: function() {
      const waveValue = this.dataGenerator();
      const factor = waveValue / 80; // 基于波形值计算波动因子
      return {
        latency: Math.round(this.baseMetrics.latency * factor),
        power: (this.baseMetrics.power * factor).toFixed(1),
        successRate: Math.min(99.99, (this.baseMetrics.successRate - Math.random() * 0.5)).toFixed(2)
      };
    }
  },
  {
    id: 'group2',
    name: '第二组',
    title: '侧信道防护方案',
    themeColor: '#ef4444',
    statusText: '运行中',
    isAlert: false,
    baseMetrics: { latency: 12, power: 8.2, successRate: 98.50 },
    metrics: [
      { label: '端到端时延', value: '12', unit: 'ms', class: 'text-barGreen' },
      { label: '系统功耗', value: '8.2', unit: 'W' },
      { label: '加密成功率', value: '98.50%', unit: '', class: 'text-barOrange' }
    ],
    dataGenerator: () => 120 + (Math.random() * 60 - 30),
    metricGenerator: function() {
      const waveValue = this.dataGenerator();
      const factor = waveValue / 120;
      return {
        latency: Math.round(this.baseMetrics.latency * factor),
        power: (this.baseMetrics.power * factor).toFixed(1),
        successRate: Math.min(99.99, (this.baseMetrics.successRate - Math.random() * 1.5)).toFixed(2)
      };
    }
  },
  {
    id: 'group3',
    name: '第三组',
    title: '抗重放攻击方案',
    themeColor: '#f59e0b',
    statusText: '运行中',
    isAlert: false,
    baseMetrics: { latency: 85, power: 15.6, successRate: 99.90 },
    metrics: [
      { label: '端到端时延', value: '85', unit: 'ms', class: 'text-barOrange' },
      { label: '系统功耗', value: '15.6', unit: 'W' },
      { label: '加密成功率', value: '99.90%', unit: '', class: 'text-barGreen' }
    ],
    counter: 0,
    dataGenerator: function() {
      this.counter++;
      // 加快正弦波周期并注入更多高频噪声
      return 60 + Math.sin(this.counter / 2) * 20 + (Math.random() * 30 - 15);
    },
    metricGenerator: function() {
      const waveValue = this.dataGenerator();
      const factor = waveValue / 60;
      return {
        latency: Math.round(this.baseMetrics.latency * factor),
        power: (this.baseMetrics.power * factor).toFixed(1),
        successRate: Math.min(99.99, (this.baseMetrics.successRate - Math.random() * 0.3)).toFixed(2)
      };
    }
  },
  {
    id: 'group4',
    name: '第四组',
    title: '后量子算法适配方案',
    themeColor: '#8b5cf6',
    statusText: '运行中',
    isAlert: false,
    baseMetrics: { latency: 150, power: 20.4, successRate: 95.50 },
    metrics: [
      { label: '端到端时延', value: '150', unit: 'ms', class: 'text-barOrange' },
      { label: '系统功耗', value: '20.4', unit: 'W' },
      { label: '加密成功率', value: '95.50%', unit: '', class: 'text-barOrange' }
    ],
    dataGenerator: () => {
      let val = 30 + Math.random() * 50;
      if (Math.random() > 0.85) val = Math.random() * 10; // 模拟突发卡顿或深谷
      return val;
    },
    metricGenerator: function() {
      const waveValue = this.dataGenerator();
      const factor = waveValue / 30;
      return {
        latency: Math.round(this.baseMetrics.latency * factor),
        power: (this.baseMetrics.power * factor).toFixed(1),
        successRate: Math.min(99.99, (this.baseMetrics.successRate - Math.random() * 4)).toFixed(2)
      };
    }
  }
]);

let chartInstances = [];
let timers = [];

// 2. 初始化 ECharts
const initCharts = () => {
  groupConfigs.forEach((config) => {
    const chartDom = document.getElementById(`chart-${config.id}`);
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    
    // 初始化 200 个数据点（原本50），使波形图更密集
    let data = Array.from({ length: 200 }, (_, i) => config.dataGenerator(i));

    const option = {
      animation: false,
      grid: { top: 30, bottom: 5, left: 0, right: 0 },
      xAxis: { type: 'category', show: false, boundaryGap: false },
      yAxis: { type: 'value', show: false, min: 'dataMin', max: 'dataMax' },
      series: [{
        type: 'line',
        data: data,
        smooth: 0.1, // 降低平滑度，保留密码学波形的毛刺和锐利感
        symbol: 'none',
        lineStyle: { color: config.themeColor, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: config.themeColor + '66' },
            { offset: 1, color: config.themeColor + '00' }
          ])
        }
      }]
    };

    myChart.setOption(option);
    chartInstances.push(myChart);

    // 将定时器时间从 100ms 缩短到 30ms，拉高帧率
    const timer = setInterval(() => {
      data.shift();
      data.push(config.dataGenerator());
      myChart.setOption({ series: [{ data }] });
    }, 30);
    
    timers.push(timer);
  });
};

// 3. 更新指标数据（每秒更新一次）
const updateMetrics = () => {
  groupConfigs.forEach((config) => {
    const newMetrics = config.metricGenerator();
    config.metrics[0].value = newMetrics.latency;
    config.metrics[1].value = newMetrics.power;
    config.metrics[2].value = newMetrics.successRate + '%';
  });
};

let metricTimer = null;

// 4. 生命周期管理
onMounted(() => {
  setTimeout(initCharts, 100);
  // 每秒更新一次指标数据
  metricTimer = setInterval(updateMetrics, 1000);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  timers.forEach(clearInterval);
  if (metricTimer) clearInterval(metricTimer);
  chartInstances.forEach(instance => instance.dispose());
});

const handleResize = () => {
  chartInstances.forEach(instance => instance.resize());
};
</script>

<style scoped>
/* 继承你的配色方案 */
.bg-darkBg { background-color: #121417; }
.bg-panelBg { background-color: #1c2126; }
.bg-cardInnerBg { background-color: #232930; }
.border-borderColor { border-color: #2d353e; }
.bg-accentGreen { background-color: #23b586; }
.bg-accentGreenDark { background-color: #1a8a66; }
.text-textMain { color: #d1d5db; }
.text-textMuted { color: #9ca3af; }

/* 警报配色 (不再强依赖，保留备用) */
.bg-alertRedBg { background-color: #2f181a; }
.border-alertRedBorder { border-color: #ef4444; }
.text-alertRedText { color: #ef4444; }

/* 状态色 */
.text-barGreen { color: #10b981; }
.text-barOrange { color: #f59e0b; }
.text-barRed { color: #ef4444; }
.bg-barGreen { background-color: #10b981; }
.bg-barRed { background-color: #ef4444; }
.text-accentCyan { color: #06b6d4; }
.text-barPurple { color: #8b5cf6; }

/* 滚动条隐藏 */
::-webkit-scrollbar { width: 0px; }
</style>
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
        class="bg-panelBg border rounded-lg flex flex-col shadow-lg overflow-hidden relative"
        :class="group.isAlert ? 'border-alertRedBorder shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-borderColor'"
      >
        <div 
          class="px-4 py-3 border-b flex justify-between items-center"
          :class="group.isAlert ? 'border-alertRedBorder bg-alertRedBg' : 'border-borderColor bg-cardInnerBg'"
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
            :class="group.isAlert ? 'text-alertRedText' : 'text-barGreen'"
          >
            <span 
              class="w-2 h-2 rounded-full animate-pulse"
              :class="group.isAlert ? 'bg-barRed' : 'bg-barGreen'"
            ></span>
            {{ group.statusText }}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-2 p-4 pb-2">
          <div 
            v-for="metric in group.metrics" 
            :key="metric.label"
            class="bg-darkBg rounded p-2 text-center border"
            :class="group.isAlert ? 'border-alertRedBorder/50' : 'border-borderColor'"
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
    title: 'SM4+SM3 国密组合方案',
    themeColor: '#06b6d4',
    statusText: '运行中',
    isAlert: false,
    metrics: [
      { label: '端到端时延', value: '45', unit: 'ms' },
      { label: '系统功耗', value: '12.5', unit: 'W' },
      { label: '加密成功率', value: '99.99%', unit: '', class: 'text-barGreen' }
    ],
    dataGenerator: () => 80 + Math.random() * 10
  },
  {
    id: 'group2',
    name: '第二组',
    title: '侧信道防护方案',
    themeColor: '#ef4444',
    statusText: '运行中',
    isAlert: false,
    metrics: [
      { label: '端到端时延', value: '12', unit: 'ms', class: 'text-barGreen' },
      { label: '系统功耗', value: '8.2', unit: 'W' },
      { label: '加密成功率', value: '98.50%', unit: '', class: 'text-barOrange' }
    ],
    dataGenerator: () => 120 + Math.random() * 30
  },
  {
    id: 'group3',
    name: '第三组',
    title: '轻量级流密码方案',
    themeColor: '#f59e0b',
    statusText: '运行中',
    isAlert: false,
    metrics: [
      { label: '端到端时延', value: '85', unit: 'ms', class: 'text-barOrange' },
      { label: '系统功耗', value: '18.6', unit: 'W' },
      { label: '加密成功率', value: '99.90%', unit: '', class: 'text-barGreen' }
    ],
    // 模拟区块链打包的周期性波动
    counter: 0,
    dataGenerator: function() {
      this.counter++;
      return 60 + Math.sin(this.counter / 5) * 20 + Math.random() * 5;
    }
  },
  {
    id: 'group4',
    name: '第四组',
    title: '区块链分布式防护方案',
    themeColor: '#8b5cf6',
    statusText: '高负载警告',
    isAlert: true,
    metrics: [
      { label: '端到端时延', value: '320', unit: 'ms', class: 'text-barRed' },
      { label: '系统功耗', value: '28.4', unit: 'W', class: 'text-barRed' },
      { label: '加密成功率', value: '92.50%', unit: '', class: 'text-barOrange' }
    ],
    dataGenerator: () => {
      let val = 30 + Math.random() * 15;
      if (Math.random() > 0.95) val = 5; // 模拟突发卡顿
      return val;
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
    
    // 初始化 50 个数据点
    let data = Array.from({ length: 50 }, (_, i) => config.dataGenerator(i));

    const option = {
      animation: false,
      grid: { top: 30, bottom: 5, left: 0, right: 0 },
      xAxis: { type: 'category', show: false, boundaryGap: false },
      yAxis: { type: 'value', show: false, min: 'dataMin', max: 'dataMax' },
      series: [{
        type: 'line',
        data: data,
        smooth: true,
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

    // 实时更新定时器
    const timer = setInterval(() => {
      data.shift();
      data.push(config.dataGenerator());
      myChart.setOption({ series: [{ data }] });
    }, 100);
    
    timers.push(timer);
  });
};

// 3. 生命周期管理
onMounted(() => {
  // 稍微延迟确保 DOM 完全渲染
  setTimeout(initCharts, 100);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  timers.forEach(clearInterval);
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

/* 警报配色 */
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
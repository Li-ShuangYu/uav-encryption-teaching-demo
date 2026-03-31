<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-accentGreen rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">无人机通信加密 - 方案 AI 评估</h1>
      </div>
      <button 
        @click="$emit('back')"
        class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-textMain px-4 py-2 rounded shadow transition-colors flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        返回方案分屏
      </button>
    </header>

    <main class="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4 bg-darkBg overflow-hidden">
      <div 
        v-for="(group, index) in groups" 
        :key="group.id"
        class="bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg"
      >
        <div class="px-4 py-2 border-b border-borderColor bg-cardInnerBg flex justify-between items-center z-10">
          <h2 class="font-bold flex items-center gap-2" :style="{ color: group.color }">
            <span 
              class="text-xs px-2 py-0.5 rounded"
              :style="{ backgroundColor: `${group.color}33`, color: group.color }"
            >
              {{ group.name }}
            </span> 
            架构解析
          </h2>
        </div>
        
        <transition name="fade-overlay">
          <div v-if="group.isLoading" class="absolute inset-0 top-[41px] bg-panelBg z-20 flex flex-col items-center justify-center">
            <div class="scan-line" :style="{ background: `linear-gradient(to right, transparent, ${group.color}, transparent)` }"></div>
            <div class="mb-3 text-sm font-bold tracking-widest animate-pulse" :style="{ color: group.color }">
              AI 深度推演中...
            </div>
            <div class="w-2/3 h-1.5 bg-darkBg rounded-full overflow-hidden border border-borderColor">
              <div 
                class="h-full transition-all ease-linear" 
                :style="{ 
                  width: group.progress + '%', 
                  backgroundColor: group.color,
                  boxShadow: `0 0 8px ${group.color}`,
                  transitionDuration: '1.5s'
                }"
              ></div>
            </div>
          </div>
        </transition>

        <transition name="fade-content">
          <div v-show="!group.isLoading" class="flex-1 flex flex-col p-4">
            <div class="flex-1 flex items-center min-h-0">
              <div :id="`chart-${group.id}`" class="w-2/3 h-full"></div>
              
              <div class="w-1/3 flex flex-col items-center justify-center border-l border-borderColor/50 pl-4">
                <div class="text-textMuted text-xs mb-1">AI 综合评分</div>
                <div 
                  class="text-5xl font-black" 
                  :style="{ color: group.color, textShadow: `0 0 15px ${group.color}66` }"
                >
                  {{ group.score }}
                </div>
              </div>
            </div>

            <div class="mt-2 p-3 bg-darkBg border border-borderColor rounded text-sm text-textMain leading-relaxed shrink-0">
              <span class="font-bold" :style="{ color: group.color }">评估结论：</span>
              {{ group.conclusion }}
              <span class="text-textMuted text-xs block mt-1">优化建议：{{ group.suggestion }}</span>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive } from 'vue';
import * as echarts from 'echarts';

// 1. 定义组别数据
const groups = reactive([
  { 
    id: 1, name: '第一组', color: '#3b82f6', score: 92, progress: 0, isLoading: true, delay: 800,
    values: [95, 90, 85, 80, 90],
    conclusion: '采用国密 SM4+SM3，保密性与完整性表现极佳，整体架构成熟稳健。',
    suggestion: '可引入硬件加速模块，进一步降低加密带来的性能损耗。'
  },
  { 
    id: 2, name: '第二组', color: '#ef4444', score: 78, progress: 0, isLoading: true, delay: 1600,
    values: [85, 80, 40, 95, 60],
    conclusion: '纯非对称加密（RSA）方案，安全性理论值高，但性能消耗过大。',
    suggestion: '必须改为混合加密体制（RSA+AES/SM4），避免性能瓶颈。'
  },
  { 
    id: 3, name: '第三组', color: '#f59e0b', score: 85, progress: 0, isLoading: true, delay: 2400,
    values: [80, 85, 95, 75, 85],
    conclusion: '采用轻量级流密码，系统吞吐量极高，时延低。',
    suggestion: '需增强密钥分发机制的安全防护等级，加入动态轮转。'
  },
  { 
    id: 4, name: '第四组', color: '#8b5cf6', score: 88, progress: 0, isLoading: true, delay: 3200,
    values: [88, 95, 80, 70, 95],
    conclusion: '引入区块链技术保障数据防篡改，完整性极高。',
    suggestion: '考虑优化共识算法，减少无人机节点的计算负荷。'
  }
]);

const chartInstances = [];
const indicators = [
  { name: '保密性', max: 100 },
  { name: '完整性', max: 100 },
  { name: '可用性', max: 100 },
  { name: '成本控制', max: 100 },
  { name: '创新性', max: 100 }
];

// 2. 初始化图表函数
const initChart = (group) => {
  const chartDom = document.getElementById(`chart-${group.id}`);
  if (!chartDom) return;
  
  const myChart = echarts.init(chartDom);
  const option = {
    radar: {
      indicator: indicators,
      radius: '65%',
      splitNumber: 4,
      axisName: { color: '#9ca3af', fontSize: 10 },
      splitLine: { lineStyle: { color: ['#2d353e'] } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#2d353e' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: group.values,
        itemStyle: { color: group.color },
        areaStyle: { 
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { color: group.color, offset: 0, opacity: 0.1 },
            { color: group.color, offset: 1, opacity: 0.4 }
          ])
        },
        lineStyle: { width: 2, color: group.color },
        symbolSize: 4
      }]
    }]
  };
  myChart.setOption(option);
  chartInstances.push(myChart);
};

// 3. 模拟加载逻辑
const startLoadingSimulation = () => {
  groups.forEach((group, index) => {
    setTimeout(() => {
      group.progress = 100; // 触发进度条动画
      
      setTimeout(() => {
        group.isLoading = false; // 切换显示内容
        // 在 DOM 更新后初始化或 resize 图表
        setTimeout(() => {
          initChart(group);
        }, 50);
      }, 1500); // 对应进度条涨满的时间
    }, group.delay);
  });
};

onMounted(() => {
  startLoadingSimulation();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  chartInstances.forEach(instance => instance.dispose());
});

const handleResize = () => {
  chartInstances.forEach(instance => instance.resize());
};
</script>

<style scoped>
.scan-line {
  width: 100%;
  height: 2px;
  position: absolute;
  animation: scan 2s linear infinite;
  opacity: 0.5;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Loading 遮罩层淡出 */
.fade-overlay-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-overlay-leave-to {
  opacity: 0;
}

/* 内容层淡入 */
.fade-content-enter-active {
  transition: opacity 1s ease-in-out;
}
.fade-content-enter-from {
  opacity: 0;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
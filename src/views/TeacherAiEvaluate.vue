<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-accentGreen rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">无人机通信加密 - 方案 AI 评估</h1>
      </div>
      <button 
        @click="backToSchemeSplit"
        class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-textMain px-4 py-2 rounded shadow transition-colors flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        返回到方案设计
      </button>
    </header>

    <main class="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4 bg-darkBg overflow-hidden">
      <div 
        v-for="(group, index) in groups" 
        :key="group.id"
        class="bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg"
      >
        
        <transition name="fade-overlay">
          <div v-if="group.isLoading" class="absolute inset-0 bg-panelBg z-30 flex flex-col items-center justify-center">
            <div class="scan-line" :style="{ background: `linear-gradient(to right, transparent, ${group.color}, transparent)` }"></div>
            <div class="mb-3 text-sm font-bold tracking-widest animate-pulse" :style="{ color: group.color }">
              AI 专家系统推演中...
            </div>
            <div class="w-2/3 h-1.5 bg-darkBg rounded-full overflow-hidden border border-borderColor">
              <div 
                class="h-full transition-all ease-linear" 
                :style="{ 
                  width: group.progress + '%', 
                  backgroundColor: group.color,
                  boxShadow: `0 0 8px ${group.color}`,
                  transitionDuration: '1.2s'
                }"
              ></div>
            </div>
          </div>
        </transition>

        <transition name="fade-content">
          <div v-show="!group.isLoading" class="w-full h-full flex">
            
            <div class="w-1/2 h-full flex flex-col p-4 border-r border-borderColor/30 justify-between">
              
              <div class="shrink-0 flex items-center gap-2 mb-2">
                <span 
                  class="text-xs px-2 py-1 rounded font-bold"
                  :style="{ backgroundColor: group.color + '30', color: group.color }"
                >
                  {{ group.name }}
                </span> 
                <span class="text-sm font-bold text-white tracking-wide">深度评估报告</span>
              </div>

              <div class="shrink-0 mb-2 pl-1 flex items-baseline gap-3">
                <span class="text-textMuted text-sm font-bold">AI 综合评分</span>
                <div class="flex items-baseline gap-1">
                  <span 
                    class="text-4xl font-black tracking-tighter" 
                    :style="{ color: group.color, textShadow: `0 0 15px ${group.color}44` }"
                  >
                    {{ group.score }}
                  </span>
                  <span class="text-textMuted text-sm font-medium">/ 100</span>
                </div>
              </div>

              <div class="flex flex-col gap-2 mt-auto">
                <div class="bg-cardInnerBg/40 border-l-2 p-2 rounded-r" :style="{ borderColor: group.color }">
                  <div class="text-xs font-bold mb-0.5" :style="{ color: group.color }">评估结论</div>
                  <p class="text-[13px] text-textMain leading-snug">
                    {{ group.conclusion }}
                  </p>
                </div>
                
                <div class="bg-cardInnerBg/20 border-l-2 border-textMuted p-2 rounded-r">
                  <div class="text-xs font-bold mb-0.5 text-textMuted">优化建议</div>
                  <p class="text-[13px] text-textMain leading-snug">
                    {{ group.suggestion }}
                  </p>
                </div>
              </div>
            </div>

            <div class="w-1/2 h-full relative p-2">
              <div :id="`chart-${group.id}`" class="w-full h-full"></div>
            </div>

          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();

const backToSchemeSplit = () => {
  router.push('/teacher/scheme-split');
};

const groups = reactive([
  { 
    id: 1, name: '第一组', color: '#3b82f6', score: 92, progress: 0, isLoading: true, delay: 300,
    values: [95, 90, 85, 80, 90],
    conclusion: '采用低功耗优化方案，结合 PRESENT 轻量级加密算法，功耗控制表现优异，适合无人机等嵌入式设备。',
    suggestion: '可引入硬件加速模块，进一步降低加密带来的性能损耗。'
  },
  { 
    id: 2, name: '第二组', color: '#ef4444', score: 78, progress: 0, isLoading: true, delay: 600,
    values: [85, 80, 40, 95, 60],
    conclusion: '采用侧信道防护方案，安全性理论值高，但非对称算法在终端性能消耗过大。',
    suggestion: '必须改为混合加密体制（RSA+AES/SM4），避免高频通信性能瓶颈。'
  },
  { 
    id: 3, name: '第三组', color: '#f59e0b', score: 85, progress: 0, isLoading: true, delay: 900,
    values: [80, 85, 95, 75, 85],
    conclusion: '采用抗重放攻击方案，基于动态随机数和序列号机制，防护效果显著，系统稳定性高。',
    suggestion: '需增强密钥分发机制的安全防护等级，建议加入动态轮转机制。'
  },
  { 
    id: 4, name: '第四组', color: '#8b5cf6', score: 88, progress: 0, isLoading: true, delay: 1200,
    values: [88, 95, 80, 70, 95],
    conclusion: '采用后量子算法适配方案，评估算法兼容性和算力消耗，为未来量子时代做好准备。',
    suggestion: '建议对后量子算法进行轻量化优化，确保在有限算力条件下的有效运行。'
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

const initChart = (group) => {
  const chartDom = document.getElementById(`chart-${group.id}`);
  if (!chartDom) return;
  
  const myChart = echarts.init(chartDom);
  
  const customIndicators = indicators.map((ind, idx) => ({
    name: `${ind.name}\n${group.values[idx]}%`,
    max: ind.max
  }));
  
  const option = {
    radar: {
      indicator: customIndicators,
      radius: '50%', 
      center: ['50%', '50%'],
      splitNumber: 4,
      axisName: { 
        color: '#d1d5db', 
        fontSize: 13, 
        fontWeight: 'bold',
        lineHeight: 16
      },
      splitLine: { lineStyle: { color: ['#2d353e'], width: 1 } },
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
            { color: group.color, offset: 1, opacity: 0.5 }
          ])
        },
        lineStyle: { width: 2, color: group.color },
        symbol: 'circle',
        symbolSize: 8
      }]
    }]
  };
  myChart.setOption(option);
  chartInstances.push(myChart);
};

const startLoadingSimulation = () => {
  groups.forEach((group) => {
    setTimeout(() => {
      group.progress = 100;
      setTimeout(() => {
        group.isLoading = false;
        setTimeout(() => {
          initChart(group);
        }, 50);
      }, 1200);
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
  animation: scan 2.5s linear infinite;
  opacity: 0.4;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

.fade-overlay-leave-active {
  transition: opacity 0.6s ease-out;
}
.fade-overlay-leave-to {
  opacity: 0;
}

.fade-content-enter-active {
  transition: opacity 0.8s ease-in;
}
.fade-content-enter-from {
  opacity: 0;
}

/* 全局隐藏外层主容器滚动条（确保无任何滚动条出现） */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
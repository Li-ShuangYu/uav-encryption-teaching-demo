<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-accentGreen rounded-full"></div>
        <h1 class="text-2xl font-bold text-white tracking-wide">无人机通信加密 - 综合方案评估</h1>
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

    <div v-if="!isReady" class="flex-1 flex flex-col items-center justify-center z-10 bg-darkBg">
      <div class="w-16 h-16 border-4 border-[#2d353e] rounded-full animate-spin mb-6" style="border-top-color: #23b586"></div>
      <h2 class="text-2xl font-bold text-white mb-6 tracking-wider">等待评分完成...</h2>
      <div class="space-y-3 w-80">
        <div class="flex items-center justify-between">
          <span class="text-[#6b7280]">正在等待 AI 批改</span>
          <span v-if="states.aiEvaluated" class="text-green-400 font-bold">✓</span>
          <span v-else class="text-gray-500">⏳</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[#6b7280]">正在等待 教师评分</span>
          <span v-if="states.teacherScored" class="text-green-400 font-bold">✓</span>
          <span v-else class="text-gray-500">⏳</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[#6b7280]">正在等待 组间互评</span>
          <span v-if="states.studentScored" class="text-green-400 font-bold">✓</span>
          <span v-else class="text-gray-500">⏳</span>
        </div>
      </div>
    </div>

    <main v-else class="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4 bg-darkBg overflow-hidden">
      <div 
        v-for="(group, index) in groups" 
        :key="group.id"
        class="bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg"
      >
        
        <div 
          class="w-full h-full flex border-2"
          :style="{ 
            borderColor: group.color,
            transition: 'all 0.3s ease',
            borderRadius: '8px'
          }"
        >
          
          <div 
            class="w-1/2 h-full flex flex-col p-4 border-r border-borderColor/30 justify-between"
            :style="{ 
              borderRightColor: 'rgba(45, 53, 62, 0.3)',
              transition: 'all 0.3s ease'
            }"
          >
            
            <div class="shrink-0 flex items-center gap-2 mb-2">
              <span 
                class="text-sm px-2 py-1 rounded font-bold"
                :style="{ backgroundColor: group.color + '30', color: group.color }"
              >
                {{ group.name }}
              </span> 
              <span class="text-base font-bold text-white tracking-wide">综合评估报告</span>
            </div>

            <div class="shrink-0 mb-2 pl-1 flex items-baseline gap-3">
              <span class="text-gray-300 text-base font-bold">综合总评分</span>
              <div class="flex items-baseline gap-1">
                <span 
                  class="text-5xl font-black tracking-tighter score-glow" 
                  :style="{ color: group.color, '--glow-color': group.color }"
                >
                  {{ group.totalScore }}
                </span>
                <span class="text-gray-400 text-base font-medium">/ 100</span>
              </div>
            </div>

            <div class="flex flex-col gap-2 mt-auto">
              <div class="flex items-center justify-between bg-cardInnerBg/40 border-l-2 p-2 px-3 rounded-r" :style="{ borderColor: group.color }">
                <div class="text-sm font-bold text-gray-300">AI 智能评分 <span class="text-xs font-normal opacity-70 ml-1">(33.3%)</span></div>
                <div class="text-base font-bold" :style="{ color: group.color }">{{ group.scores[0] }} 分</div>
              </div>

              <div class="flex items-center justify-between bg-cardInnerBg/30 border-l-2 border-textMuted p-2 px-3 rounded-r">
                <div class="text-sm font-bold text-gray-300">教师专家评分 <span class="text-xs font-normal opacity-70 ml-1">(33.3%)</span></div>
                <div class="text-base font-bold text-textMain">{{ group.scores[1] }} 分</div>
              </div>

              <div class="flex items-center justify-between bg-cardInnerBg/20 border-l-2 border-textMuted p-2 px-3 rounded-r">
                <div class="text-sm font-bold text-gray-300">组间互评得分 <span class="text-xs font-normal opacity-70 ml-1">(33.3%)</span></div>
                <div class="text-base font-bold text-textMain">{{ group.scores[2] }} 分</div>
              </div>
            </div>
          </div>

          <div 
            class="w-1/2 h-full relative p-2"
            :style="{ 
              borderLeftColor: 'rgba(45, 53, 62, 0.3)',
              transition: 'all 0.3s ease'
            }"
          >
            <div 
              :id="`chart-${group.id}`" 
              class="w-full h-full chart-breathe"
              :style="{ '--chart-color': group.color }"
            ></div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();

// 阻塞等待状态
const isReady = ref(false);
const states = reactive({
  aiEvaluated: false,
  teacherScored: false,
  studentScored: false
});
let pollingTimer = null;

const backToSchemeSplit = () => {
  router.push('/teacher/scheme-split');
};

// 分数顺序: [AI评分, 教师评分, 组间互评]
const groups = reactive([
  { 
    id: 1, name: '第一组', color: '#3b82f6', totalScore: 90,
    scores: [92, 88, 90]
  },
  { 
    id: 2, name: '第二组', color: '#ef4444', totalScore: 82,
    scores: [78, 85, 83]
  },
  { 
    id: 3, name: '第三组', color: '#f59e0b', totalScore: 86,
    scores: [85, 88, 85]
  },
  { 
    id: 4, name: '第四组', color: '#8b5cf6', totalScore: 91,
    scores: [88, 93, 92]
  }
]);

const chartInstances = [];
const indicators = [
  { name: 'AI 评分', max: 120 },
  { name: '教师评分', max: 120 },
  { name: '组间互评', max: 120 }
];

const initChart = (group) => {
  const chartDom = document.getElementById(`chart-${group.id}`);
  if (!chartDom) return;
  
  const myChart = echarts.init(chartDom);
  
  const customIndicators = indicators.map((ind, idx) => ({
    name: `${ind.name}\n${group.scores[idx]}分`,
    max: ind.max
  }));
  
  const option = {
    radar: {
      indicator: customIndicators,
      radius: '55%', 
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
        value: group.scores,
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

const handleResize = () => {
  chartInstances.forEach(instance => instance.resize());
};

// 轮询后端状态
const fetchState = async () => {
  try {
    const res = await fetch('/api/state');
    const state = await res.json();
    
    // 更新状态
    states.aiEvaluated = state.ai_evaluated === 1;
    states.teacherScored = state.teacher_scored_group === 1;
    states.studentScored = state.student_scored_group === 1;
    
    // 检查是否所有评分都完成
    if (states.aiEvaluated && states.teacherScored && states.studentScored) {
      isReady.value = true;
      if (pollingTimer) {
        clearInterval(pollingTimer);
      }
      // 评分完成后初始化图表
      nextTick(() => {
        groups.forEach(group => {
          initChart(group);
        });
      });
    }
  } catch (error) {
    // 静默处理，避免影响页面
  }
};

onMounted(() => {
  // 开始轮询
  fetchState(); // 立即执行一次
  pollingTimer = setInterval(fetchState, 1000); // 每秒轮询一次
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  chartInstances.forEach(instance => instance.dispose());
  if (pollingTimer) {
    clearInterval(pollingTimer);
  }
});
</script>

<style scoped>
/* 全局隐藏外层主容器滚动条（确保无任何滚动条出现） */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* 总分发光动画 - 改小改淡 */
.score-glow {
  animation: scoreGlow 2.5s ease-in-out infinite;
}

@keyframes scoreGlow {
  0%, 100% {
    text-shadow: 0 0 8px var(--glow-color);
    opacity: 1;
  }
  50% {
    text-shadow: 0 0 15px var(--glow-color), 0 0 25px var(--glow-color);
    opacity: 0.95;
  }
}

/* 雷达图呼吸发光效果 - 从中间往外发散 */
.chart-breathe {
  animation: chartBreathe 3s ease-in-out infinite;
  position: relative;
}

/* 从中间往外发散的光圈 */
.chart-breathe::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: radarGlow 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes chartBreathe {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
}

@keyframes radarGlow {
  0% {
    width: 0;
    height: 0;
    box-shadow: 0 0 0 transparent;
    opacity: 1;
  }
  50% {
    width: 60%;
    height: 60%;
    box-shadow: 
      0 0 40px color-mix(in srgb, var(--chart-color) 50%, transparent),
      0 0 80px color-mix(in srgb, var(--chart-color) 30%, transparent),
      inset 0 0 30px color-mix(in srgb, var(--chart-color) 25%, transparent);
    opacity: 0.5;
  }
  100% {
    width: 100%;
    height: 100%;
    box-shadow: 
      0 0 60px color-mix(in srgb, var(--chart-color) 20%, transparent),
      0 0 100px color-mix(in srgb, var(--chart-color) 10%, transparent);
    opacity: 0;
  }
}
</style>

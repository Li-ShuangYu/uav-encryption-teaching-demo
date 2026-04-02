<template>
  <div class="h-screen flex flex-col bg-darkBg text-white font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 rounded-full transition-colors duration-500 shadow-[0_0_8px_rgba(255,255,255,0.5)]" :style="{ backgroundColor: currentGroup.themeColor }"></div>
        <div class="flex items-center">
          <span class="text-3xl font-black text-white tracking-wide mr-2">本组方案成绩：</span>
          <span class="text-3xl font-black transition-all" :style="{ color: currentGroup.themeColor }">
            {{ currentGroup.name }} - {{ currentGroup.title }}
          </span>
        </div>
      </div>
    </header>
<div v-if="!isEvaluated" class="flex-1 flex flex-col items-center justify-center z-10 bg-darkBg">
      <div class="w-16 h-16 border-4 border-[#2d353e] rounded-full animate-spin mb-6" :style="{ borderTopColor: currentGroup.themeColor }"></div>
      <h2 class="text-2xl font-bold text-white mb-3 tracking-wider">等待教师AI评估中...</h2>
      <p class="text-[#6b7280]">正在同步教师端下发的详细评审报告与数据架构</p>
    </div>

    <main v-else class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden">
    <!-- <main class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden"> -->
      
      <div class="col-span-3 flex flex-col gap-3">
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          
          <div class="flex justify-between items-center mb-3 relative z-10">
            <span class="text-sm px-3 py-1 rounded font-black transition-colors duration-500 text-white" :style="{ backgroundColor: currentGroup.themeColor + '66', border: '1px solid ' + currentGroup.themeColor }">
              方案代号
            </span>
            <span class="text-white text-sm font-black font-mono">{{ currentGroup.codeId }}</span>
          </div>
          
          <h2 class="text-3xl font-black text-white relative z-10 mb-6">{{ currentGroup.subtitle }}</h2>
          
          <div class="mt-auto grid grid-cols-2 gap-3 relative z-10">
            <div class="bg-darkBg border border-white/20 rounded-lg p-3 flex flex-col items-center justify-center shadow-inner">
              <span class="text-xs font-black text-white/80 mb-1">AI打分</span>
              <span class="text-2xl font-black" :style="{ color: currentGroup.themeColor }">{{ currentGroup.scores.ai }}</span>
            </div>
            <div class="bg-darkBg border border-white/20 rounded-lg p-3 flex flex-col items-center justify-center shadow-inner">
              <span class="text-xs font-black text-white/80 mb-1">教师评分</span>
              <span class="text-2xl font-black text-white">{{ currentGroup.scores.teacher }}</span>
            </div>
            <div class="bg-darkBg border border-white/20 rounded-lg p-3 flex flex-col items-center justify-center shadow-inner">
              <span class="text-xs font-black text-white/80 mb-1">小组互评</span>
              <span class="text-2xl font-black text-white">{{ currentGroup.scores.peer }}</span>
            </div>
            <div class="bg-[#2d3748] border border-white/30 rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
              <div class="absolute inset-0 opacity-20" :style="{ backgroundColor: currentGroup.themeColor }"></div>
              <span class="text-xs font-black text-white mb-1 z-10">综合得分</span>
              <span class="text-3xl font-black z-10" :style="{ color: currentGroup.themeColor }">{{ currentGroup.scores.total }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up shadow-lg" style="animation-delay: 0.2s;" :style="{ borderTopColor: currentGroup.themeColor }">
          <div class="text-base font-black mb-4 flex items-center gap-2 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            方案评估结论
          </div>
          <div class="flex-1 flex flex-col justify-between gap-3">
            <div class="bg-darkBg p-3.5 rounded-lg border border-white/10 border-l-4 transition-all duration-500 flex flex-col flex-1 shadow-inner" :style="{ borderLeftColor: currentGroup.themeColor }">
              <div class="text-xs font-black text-white/90 mb-2">方案综合评价</div>
              <div class="text-base text-white leading-relaxed font-bold text-justify">{{ currentGroup.evaluation }}</div>
            </div>
            <div class="bg-darkBg p-3.5 rounded-lg border border-white/10 border-l-4 transition-all duration-500 flex flex-col flex-1 shadow-inner" :style="{ borderLeftColor: currentGroup.themeColor + '80' }">
              <div class="text-xs font-black text-white/90 mb-2">未来优化方向</div>
              <div class="text-base text-white leading-relaxed font-bold text-justify">{{ currentGroup.optimization }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-5 bg-panelBg border border-borderColor rounded-lg p-5 flex flex-col shadow-lg animate-fade-in-up" style="animation-delay: 0.25s;">
        <div class="text-xl font-black text-white mb-2 flex items-center gap-2 shrink-0">
          <div class="w-3 h-3 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          系统架构指标雷达图
        </div>
        
        <div class="flex-1 w-full relative min-h-0 mt-2">
           <div ref="radarChartRef" class="absolute inset-0"></div>
        </div>
        
        <div class="shrink-0 mt-3 bg-white/5 border border-white/20 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
          <div class="absolute inset-y-0 left-0 w-2" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          <span class="text-white text-lg font-black tracking-wider ml-2">最终综合得分</span>
          <span class="text-5xl font-black italic tracking-tighter" :style="{ color: currentGroup.themeColor }">
            {{ currentGroup.scores.total }}
          </span>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.3s; border-top-width: 4px;" :style="{ borderTopColor: currentGroup.themeColor }">
          
          <div class="px-5 pt-6 shrink-0 relative z-20 flex justify-between items-start">
            <div>
              <div class="text-base font-black mb-1 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                项目专属队歌
              </div>
              <div class="text-2xl text-white font-black tracking-widest">{{ getAudioFileName(currentGroup.music.audio) }}</div>
            </div>
            
            <div class="text-right max-w-[55%]">
              <div class="text-xs font-black transition-colors duration-500 mb-1" :style="{ color: currentGroup.themeColor }">STYLE / 风格解码</div>
              <div class="font-black text-white text-base leading-tight truncate">{{ currentGroup.music.tags }}</div>
              <div class="text-xs mt-1 text-white/80 font-bold truncate">{{ currentGroup.music.type }}</div>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-hidden z-10 flex items-center justify-center">
            <div class="absolute top-1/4 w-[85%] pointer-events-none transition-transform duration-500 ease-in-out"
                 :style="{ transform: `translateY(calc(-${(currentLyricIndex - 1) * 3 + 1.5}rem))` }">
              <div 
                    v-for="(lyric, index) in currentLyrics" 
                    :key="index"
                    class="h-12 flex items-center justify-center text-center transition-all duration-500 ease-out truncate"
                    :class="[
                      index < (currentLyricIndex - 1) - 2 ? 'opacity-0 scale-90' : '', 
                      index === (currentLyricIndex - 1) - 2 ? 'text-sm font-bold text-white/30 scale-95' : '', 
                      index === (currentLyricIndex - 1) - 1 ? 'text-base font-bold text-white/70 scale-100' : '', 
                      index === currentLyricIndex - 1 ? 'font-black text-2xl scale-110 opacity-100' : '', 
                      index === (currentLyricIndex - 1) + 1 ? 'text-base font-bold text-white/70 scale-100' : '', 
                      index === (currentLyricIndex - 1) + 2 ? 'text-sm font-bold text-white/30 scale-95' : '', 
                      index > (currentLyricIndex - 1) + 2 ? 'opacity-0 scale-90' : '' 
                    ]"
                    :style="{ color: index === currentLyricIndex - 1 ? '#ffffff' : '' }"
                  >
                    {{ lyric.text }}
                  </div>
            </div>
          </div>

          <div 
            class="absolute z-30 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] drop-shadow-2xl hover:scale-105"
            :style="{
              left: 'calc(50% - 210px)',
              bottom: '220px',
              transform: `scaleX(-1) ${isPlaying ? 'rotate(34deg)' : 'rotate(10deg)'}`,
              transformOrigin: '16px 16px'
            }"
            @click="togglePlay"
            title="点击播放/暂停"
          >
            <div class="relative w-8 h-8">
              <div class="absolute inset-0 bg-black/40 rounded-full scale-125 blur-[3px] translate-y-1"></div>
              <div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border border-gray-300 shadow-md"></div>
              <div class="absolute inset-[5px] bg-gradient-to-tr from-gray-700 to-gray-900 rounded-full shadow-inner flex items-center justify-center border border-gray-600">
                <div class="w-1.5 h-1.5 bg-gradient-to-br from-white to-gray-400 rounded-full shadow-sm"></div>
              </div>
            </div>
            <div class="absolute top-[16px] left-[12px] w-2 h-[95px] bg-gradient-to-r from-gray-300 via-white to-gray-300 shadow-sm border-x border-gray-200/50"></div>
            <div class="absolute top-[110px] left-[12px] w-2 origin-top -rotate-[30deg]">
              <div class="absolute -top-[4px] left-0 w-2 h-2 bg-gradient-to-br from-white to-gray-300 rounded-full shadow-sm"></div>
              <div class="w-full h-[75px] bg-gradient-to-r from-gray-300 via-white to-gray-300 shadow-sm border-x border-gray-200/50"></div>
              <div class="absolute top-[71px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div class="w-3.5 h-2.5 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-sm shadow-inner"></div>
                <div class="w-8 h-[42px] bg-gradient-to-b from-gray-50 to-gray-200 rounded-[4px] shadow-lg flex justify-center gap-1.5 pt-3 pb-2 border-t border-b-2 border-x border-gray-100 border-b-gray-400">
                  <div class="w-[2.5px] h-full bg-gray-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] rounded-full"></div>
                  <div class="w-[2.5px] h-full bg-gray-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <audio ref="audioElement" class="hidden" preload="metadata"></audio>

          <div 
            class="absolute w-[400px] h-[400px] rounded-full shadow-[0_-10px_40px_rgba(0,0,0,0.8)] border-[8px] border-gray-900 flex items-center justify-center vinyl-spin z-0" 
            :class="{ 'vinyl-playing': isPlaying }"
            style="left: calc(50% - 200px); bottom: -180px;"
          >
            <div class="absolute inset-0 rounded-full" style="background: repeating-radial-gradient(#1f2937 0, #1f2937 5px, #111827 6px, #111827 8px);"></div>
            <div class="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-transparent pointer-events-none"></div>
            <div class="relative w-20 h-20 rounded-full shadow-inner flex items-center justify-center transition-colors duration-500 z-10" :style="{ backgroundColor: currentGroup.themeColor }">
              <div class="w-4 h-4 rounded-full bg-darkBg border border-black/50 shadow-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as echarts from 'echarts';

import audioLight from '../assets/audio/轻量级.mp3';
import audioSideChannel from '../assets/audio/侧信道.mp3';
import audioAntiReplay from '../assets/audio/抗重放.mp3';
import audioPostQuantum from '../assets/audio/后量子算法.mp3';

const getAudioFileName = (audio) => {
  if (typeof audio === 'string') {
    const fileName = audio.split('/').pop().replace(/\.mp3$/, '');
    return decodeURIComponent(fileName);
  } else if (audio && typeof audio === 'object') {
    const url = audio.default || audio;
    if (typeof url === 'string') {
      const fileName = url.split('/').pop().replace(/\.mp3$/, '');
      return decodeURIComponent(fileName);
    }
  }
  if (audio === audioLight) return '轻量级';
  if (audio === audioSideChannel) return '侧信道';
  if (audio === audioAntiReplay) return '抗重放';
  if (audio === audioPostQuantum) return '后量子算法';
  return '';
};

const router = useRouter();
const route = useRoute();

// 严控字数：代号≤10字，内容严格≤18字，内容更丰富
const groups = [
  {
    id: 1,
    name: '第一组',
    title: '通信安全 + 低功耗专用版',
    subtitle: '轻量级无人机加密', 
    codeId: 'SEC-LOWPOWER-01',
    themeColor: '#3b82f6', 
    hardware: 'STM32L432',
    scores: { ai: 92, teacher: 90, peer: 88, total: 91 },
    evaluation: '8ms极低时延，完美适配轻量级硬件。', // 17字
    optimization: '拟引入时间戳与硬件加速，强化防线。', // 17字
    radarData: [92, 90, 88], 
    music: { tags: '清脆活泼、电子拨弦、快节奏', type: '映射轻量级、低时延特征', audio: audioLight, lyrics: [
      { text: " ", duration: 0 },  
      { text: "轻量级", duration: 9500 },
      { text: "我漫步在月光之下", duration: 5000 },
      { text: "微风轻抚着我的脸颊", duration: 4500 },
      { text: "宁静在心中慢慢流淌", duration: 5000 },
      { text: "时光仿佛停止了步伐", duration: 4000 }
    ] }
  },
  {
    id: 2,
    name: '第二组',
    title: '通信安全 + 侧信道防护版',
    subtitle: '抗物理攻击高安全', 
    codeId: 'SEC-SIDECHNL-02',
    themeColor: '#ef4444', 
    hardware: 'STM32L432',
    scores: { ai: 95, teacher: 94, peer: 90, total: 94 },
    evaluation: '掩码机制有效掩盖物理层密钥泄露。', // 16字
    optimization: '拟优化随机数，进一步引入乱序执行。', // 17字
    radarData: [95, 94, 90],
    music: { tags: '多层叠加、沉稳厚重、低频轰鸣', type: '映射掩码防护、高运算冗余特征', audio: audioSideChannel, lyrics: [
      { text: " ", duration: 0 },  
      { text: "侧信道", duration: 1200 },
      { text: "挣脱了羁绊", duration: 3000 },
      { text: "我在网络中跳跃", duration: 3300 },
      { text: "你听那轻微的高频正在掩埋", duration: 3700 }
    ] }
  },
  {
    id: 3,
    name: '第三组',
    title: '通信安全 + 抗重放攻击',
    subtitle: '强时效指令防劫持', 
    codeId: 'SEC-NOREPLAY-03',
    themeColor: '#f59e0b', 
    hardware: 'STM32L432',
    scores: { ai: 89, teacher: 88, peer: 92, total: 89 },
    evaluation: '滑动窗口完美阻断一切旧包重放攻击。', // 17字
    optimization: '拟平滑优化轮换逻辑，升级布隆过滤。', // 17字
    radarData: [89, 88, 92],
    music: { tags: '节奏恒定、机械感强、精准节拍', type: '映射时间戳严格对齐、序列号递增特征', audio: audioAntiReplay, lyrics: [
      { text: "", duration: 0 },
      { text: "抗重放", duration: 8200 },
      { text: "单行道上 时针在倒转", duration: 3950 },
      { text: "指针划破 沉默的河岸", duration: 3650 }
    ] }
  },
  {
    id: 4,
    name: '第四组',
    title: '通信安全 + 后量子算法',
    subtitle: '抗量子暴力破解', 
    codeId: 'SEC-PQUANTUM-04',
    themeColor: '#8b5cf6', 
    hardware: 'STM32L432',
    scores: { ai: 96, teacher: 98, peer: 95, total: 97 },
    evaluation: '成功移植Kyber，强效抵御量子破解。', // 17字
    optimization: '拟实施就地计算，引入NTT硬件加速。', // 17字
    radarData: [96, 98, 95],
    music: { tags: '未来感、复杂合成器、广阔空间', type: '映射庞大矩阵运算、大公钥体积特征', audio: audioPostQuantum, lyrics: [
      { text: "纯音乐。。。", duration: 30000 },
    ] }
  }
];

const currentGroupId = ref(1);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));

const isEvaluated = ref(false);
const radarChartRef = ref(null);
let chartInstance = null;

const initRadarChart = () => {
  if (!radarChartRef.value) return;
  if (chartInstance) chartInstance.dispose();
  
  chartInstance = echarts.init(radarChartRef.value);
  const color = currentGroup.value.themeColor;
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: color, textStyle: { color: '#fff', fontSize: 16 } },
    radar: {
      indicator: [
        { name: 'AI打分', max: 100 },
        { name: '教师评分', max: 100 },
        { name: '小组互评', max: 100 }
      ],
      radius: '60%', 
      center: ['50%', '50%'],
      // 字体大、白、亮，去除了发光阴影以符合要求
      axisName: { 
        color: '#ffffff', 
        fontSize: 18, 
        fontWeight: '900',
        padding: [3, 8]
      },
      splitLine: { lineStyle: { color: ['rgba(255, 255, 255, 0.2)'] } },
      splitArea: { areaStyle: { color: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.01)'] } },
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.4)' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: currentGroup.value.radarData,
        itemStyle: { color: '#ffffff' }, 
        areaStyle: { color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{ offset: 0, color: color + '55' }, { offset: 1, color: color + 'AA' }]) },
        // 图形边缘的发光保留，以维持图表质感，仅去除了文字的发光
        lineStyle: { width: 4, color: color, shadowBlur: 15, shadowColor: color },
        label: {
            show: true,
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
            formatter: '{c}分'
        }
      }]
    }]
  };
  chartInstance.setOption(option);
};

const handleResize = () => { if (chartInstance) chartInstance.resize(); };

watch(currentGroupId, () => {
  nextTick(() => initRadarChart());
});

onMounted(() => {
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    const groupInfo = JSON.parse(storedInfo);
    if (groupInfo.groupId) {
      currentGroupId.value = groupInfo.groupId;
    }
  }
  
  currentLyricIndex.value = 1; 
  loadCurrentGroupAudio(); 
  
  if (audioElement.value) {
    audioElement.value.addEventListener('ended', handleAudioEnded);
  }

  window.addEventListener('resize', handleResize);

  nextTick(() => {
    initRadarChart();
  });
});

const currentLyrics = computed(() => currentGroup.value?.music?.lyrics || []);
const currentLyricIndex = ref(0);
let lyricTimer = null;
const isPlaying = ref(false);
const audioElement = ref(null);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startLyricTimer();
    playAudio();
  } else {
    stopLyricTimer();
    pauseAudio();
  }
};

const playAudio = () => {
  if (audioElement.value) {
    audioElement.value.play().catch(error => console.error('音频播放失败:', error));
  }
};

const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause();
  }
};

const loadAudio = (audioUrl) => {
  if (audioElement.value) {
    audioElement.value.src = audioUrl;
  }
};

const loadCurrentGroupAudio = () => {
  if (currentGroup.value && currentGroup.value.music && currentGroup.value.music.audio) {
    loadAudio(currentGroup.value.music.audio);
  }
};

const startLyricTimer = () => {
  if (!lyricTimer) {
    const playNextLyric = () => {
      const currentDuration = currentLyrics.value[currentLyricIndex.value].duration;
      currentLyricIndex.value += 1;
      if (currentLyricIndex.value >= currentLyrics.value.length) {
        currentLyricIndex.value = 0;
      }
      lyricTimer = setTimeout(playNextLyric, currentDuration);
    };
    lyricTimer = setTimeout(playNextLyric, 0); 
  }
};

const stopLyricTimer = () => {
  if (lyricTimer) {
    clearTimeout(lyricTimer);
    lyricTimer = null;
  }
};

const handleAudioEnded = () => {
  isPlaying.value = false;
  currentLyricIndex.value = 1; 
  stopLyricTimer(); 
};

onUnmounted(() => {
  if (lyricTimer) clearTimeout(lyricTimer);
  if (audioElement.value) {
    audioElement.value.removeEventListener('ended', handleAudioEnded);
  }
  if (chartInstance) chartInstance.dispose();
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

@keyframes spin-record {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
.vinyl-spin {
  animation: spin-record 5s linear infinite; 
  animation-play-state: paused;
}
.vinyl-playing {
  animation-play-state: running;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
</style>
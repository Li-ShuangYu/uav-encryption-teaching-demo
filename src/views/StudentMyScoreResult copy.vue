<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
        <div class="flex items-center">
          <span class="text-2xl font-black text-white tracking-wide mr-2">我的架构蓝图：</span>
          <span class="text-2xl font-black transition-all" :style="{ color: currentGroup.themeColor }">
            {{ currentGroup.name }} - {{ currentGroup.title }}
          </span>
        </div>
      </div>
      <button 
        @click="backToWorkspace"
        class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        返回我的工作台
      </button>
    </header>

    <!-- <div v-if="!isEvaluated" class="flex-1 flex flex-col items-center justify-center z-10 bg-darkBg">
      <div class="w-16 h-16 border-4 border-[#2d353e] rounded-full animate-spin mb-6" :style="{ borderTopColor: currentGroup.themeColor }"></div>
      <h2 class="text-2xl font-bold text-white mb-3 tracking-wider">等待教师AI评估中...</h2>
      <p class="text-[#6b7280]">正在同步教师端下发的详细评审报告与数据架构</p>
    </div> -->

    <main class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden">
    <!-- <main v-else class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden"> -->
      <div class="col-span-3 flex flex-col gap-3">
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          
          <div class="flex justify-between items-center mb-2 relative z-10">
            <span class="text-xs px-2 py-0.5 rounded font-black transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor + '33', color: currentGroup.themeColor, border: '1px solid ' + currentGroup.themeColor + '66' }">
              方案代号
            </span>
            <span class="text-textMuted text-xs font-bold font-mono">{{ currentGroup.codeId }}</span>
          </div>
          <h2 class="text-2xl font-black text-white relative z-10 mb-5">{{ currentGroup.subtitle }}</h2>
          
          <div class="grid grid-cols-2 gap-3 relative z-10 mb-2">
            <div class="bg-darkBg border border-borderColor rounded-lg p-3 flex flex-col items-center justify-center">
              <span class="text-[11px] font-bold text-textMuted mb-1">AI打分</span>
              <span class="text-2xl font-black" :style="{ color: currentGroup.themeColor }">{{ currentGroup.scores.ai }}</span>
            </div>
            <div class="bg-darkBg border border-borderColor rounded-lg p-3 flex flex-col items-center justify-center">
              <span class="text-[11px] font-bold text-textMuted mb-1">教师评分</span>
              <span class="text-2xl font-black text-white">{{ currentGroup.scores.teacher }}</span>
            </div>
            <div class="bg-darkBg border border-borderColor rounded-lg p-3 flex flex-col items-center justify-center">
              <span class="text-[11px] font-bold text-textMuted mb-1">小组互评</span>
              <span class="text-2xl font-black text-white">{{ currentGroup.scores.peer }}</span>
            </div>
            <div class="bg-darkBg border border-borderColor rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 opacity-10" :style="{ backgroundColor: currentGroup.themeColor }"></div>
              <span class="text-[11px] font-bold text-white z-10 mb-1">综合得分</span>
              <span class="text-3xl font-black z-10" :style="{ color: currentGroup.themeColor, textShadow: '0 0 10px ' + currentGroup.themeColor + '40' }">{{ currentGroup.scores.total }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up shadow-lg" style="animation-delay: 0.2s;" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          <div class="text-sm font-black mb-4 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            方案评估结论
          </div>
          
          <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4 relative z-10">
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor border-l-4 transition-all duration-500" :style="{ borderLeftColor: currentGroup.themeColor }">
              <div class="text-xs font-bold text-white mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-textMuted" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
                方案综合评价
              </div>
              <p class="text-[12px] text-textMuted leading-relaxed text-justify">{{ currentGroup.evaluation }}</p>
            </div>
            
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor border-l-4 transition-all duration-500" :style="{ borderLeftColor: currentGroup.themeColor + '80' }">
              <div class="text-xs font-bold text-white mb-2 flex items-center gap-1">
                <svg class="w-3 h-3 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                未来优化方向
              </div>
              <p class="text-[12px] text-textMuted leading-relaxed text-justify">{{ currentGroup.optimization }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-5 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg animate-fade-in-up" style="animation-delay: 0.25s;">
        <div class="text-base font-black text-white mb-2 flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          系统架构指标雷达图
        </div>
        <div class="text-xs text-textMuted mb-4 ml-4">密盾智学平台多维安全效能评估体系</div>
        
        <div class="flex-1 w-full relative min-h-0" ref="radarChartRef"></div>
      </div>

      <div class="col-span-4 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.3s; border-top-width: 4px;" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          
          <div class="px-5 pt-5 shrink-0 relative z-20 flex justify-between items-start">
            <div>
              <div class="text-sm font-black mb-1 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                项目专属队歌
              </div>
              <div class="text-lg text-white font-black tracking-widest">{{ getAudioFileName(currentGroup.music.audio) }}</div>
            </div>
            
            <div class="text-right max-w-[55%]">
              <div class="text-[11px] font-black transition-colors duration-500 mb-0.5" :style="{ color: currentGroup.themeColor }">STYLE / 风格解码</div>
              <div class="font-bold text-white text-sm leading-tight truncate">{{ currentGroup.music.tags }}</div>
              <div class="text-[10px] mt-1 text-textMuted truncate">{{ currentGroup.music.type }}</div>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-hidden z-10 flex items-center justify-center">
            <div class="absolute top-1/4 w-[85%] pointer-events-none transition-transform duration-500 ease-in-out"
                 :style="{ transform: `translateY(calc(-${(currentLyricIndex - 1) * 2.5 + 1.25}rem))` }">
              <div 
                    v-for="(lyric, index) in currentLyrics" 
                    :key="index"
                    class="h-10 flex items-center justify-center text-center transition-all duration-500 ease-out truncate"
                    :class="[
                      index < (currentLyricIndex - 1) - 2 ? 'opacity-0 scale-90' : '', 
                      index === (currentLyricIndex - 1) - 2 ? 'text-xs font-medium text-textMuted opacity-20 scale-95' : '', 
                      index === (currentLyricIndex - 1) - 1 ? 'text-sm font-medium text-textMuted opacity-60 scale-100' : '', 
                      index === currentLyricIndex - 1 ? 'font-black text-lg scale-110 opacity-100' : '', 
                      index === (currentLyricIndex - 1) + 1 ? 'text-sm font-medium text-textMuted opacity-60 scale-100' : '', 
                      index === (currentLyricIndex - 1) + 2 ? 'text-xs font-medium text-textMuted opacity-20 scale-95' : '', 
                      index > (currentLyricIndex - 1) + 2 ? 'opacity-0 scale-90' : '' 
                    ]"
                    :style="{ color: index === currentLyricIndex - 1 ? currentGroup.themeColor : '' }"
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

          <audio ref="audioElement" class="hidden" preload="auto"></audio>

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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as echarts from 'echarts'; // 引入 echarts

// 导入音频文件
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

const backToWorkspace = () => {
  router.back();
};

const groups = [
  {
    id: 1,
    name: '第一组',
    title: '通信安全 + 低功耗专用版',
    subtitle: '轻量级无人机加密体制',
    codeId: 'SEC-LOWPOWER-01',
    themeColor: '#3b82f6', 
    scores: { ai: 92, teacher: 90, peer: 88, total: 91 },
    evaluation: '8ms时延45mW功耗，适配硬件。',
    optimization: '引入时间戳，硬件加速，自恢复。',
    
    radarData: [85, 95, 75, 98, 90], // 安全性, 轻量化, 抗攻击, 低功耗, 时效性
    music: { tags: '清脆活泼、电子拨弦、快节奏', type: '映射轻量级、低时延特征', audio: audioLight, lyrics: [
      { text: " ", duration: 0 },  
      { text: "轻量级", duration: 9500 },
      { text: "我漫步在月光之下", duration: 5000 },
      { text: "微风轻抚着我的脸颊", duration: 4500 }
    ] }
  },
  {
    id: 2,
    name: '第二组',
    title: '通信安全 + 侧信道防护版',
    subtitle: '高安全抗物理攻击体制',
    codeId: 'SEC-SIDECHNL-02',
    themeColor: '#ef4444', 
    scores: { ai: 95, teacher: 94, peer: 90, total: 94 },
    evaluation: '通过DPA测试，掩码掩盖密钥泄露。',
    optimization: '优化随机数生成，引入乱序执行。',
    radarData: [98, 70, 95, 60, 65],
    music: { tags: '多层叠加、沉稳厚重、低频轰鸣', type: '映射掩码防护、高运算冗余特征', audio: audioSideChannel, lyrics: [
      { text: " ", duration: 0 },  
      { text: "侧信道", duration: 1200 },
      { text: "挣脱了羁绊", duration: 3000 },
      { text: "我在网络中跳跃", duration: 3300 }
    ] }
  },
  {
    id: 3,
    name: '第三组',
    title: '通信安全 + 抗重放攻击',
    subtitle: '强时效性指令防劫持体制',
    codeId: 'SEC-NOREPLAY-03',
    themeColor: '#f59e0b', 
    scores: { ai: 89, teacher: 88, peer: 92, total: 89 },
    evaluation: '滑动窗口阻断100%重放攻击。',
    optimization: '优化密钥轮换，升级布隆过滤器。',
    radarData: [88, 85, 92, 80, 85],
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
    subtitle: '面向未来算力威胁前瞻体制',
    codeId: 'SEC-PQUANTUM-04',
    themeColor: '#8b5cf6', 
    scores: { ai: 96, teacher: 98, peer: 95, total: 97 },
    evaluation: '移植Kyber算法，抗Shor破解。',
    optimization: '就地计算降内存，NTT加速验证。',
    radarData: [100, 60, 95, 55, 60],
    music: { tags: '未来感、复杂合成器、广阔空间', type: '映射庞大矩阵运算、大公钥体积特征', audio: audioPostQuantum, lyrics: [
      { text: "纯音乐。。。", duration: 30000 },
    ] }
  }
];

const currentGroupId = ref(1);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));

// === 阻塞等待与轮询逻辑 ===
const isEvaluated = ref(false);
let pollingTimer = null;

const fetchState = async () => {
  try {
    const res = await fetch('/api/state');
    const state = await res.json();
    if (state.ai_evaluated === 1) {
      isEvaluated.value = true;
      if (pollingTimer) clearInterval(pollingTimer);
      // 评估完成后初始化雷达图
      nextTick(() => { initRadarChart(); });
    }
  } catch (error) {
    // 模拟接口直接通过
    isEvaluated.value = true;
    if (pollingTimer) clearInterval(pollingTimer);
    nextTick(() => { initRadarChart(); });
  }
};

// === 雷达图初始化与实例管理 ===
const radarChartRef = ref(null);
let chartInstance = null;

const initRadarChart = () => {
  if (!radarChartRef.value) return;
  
  if (chartInstance) {
    chartInstance.dispose();
  }
  
  chartInstance = echarts.init(radarChartRef.value);
  const color = currentGroup.value.themeColor;
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: color,
      textStyle: { color: '#fff', fontSize: 12 }
    },
    radar: {
      indicator: [
        { name: '安全性\nSecurity', max: 100 },
        { name: '轻量化\nLightweight', max: 100 },
        { name: '抗攻击\nAnti-Attack', max: 100 },
        { name: '低功耗\nLow Power', max: 100 },
        { name: '时效性\nLatency', max: 100 }
      ],
      radius: '55%',
      shape: 'polygon',
      center: ['50%', '50%'],
      splitNumber: 4,
      axisName: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 18,
        textShadowColor: '#000',
        textShadowBlur: 5,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1
      },
      splitLine: {
        lineStyle: {
          color: ['#374151', '#374151', '#374151', '#374151'].map(c => c + '80')
        }
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(31, 41, 55, 0.3)', 'rgba(31, 41, 55, 0.1)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#4b5563'
        }
      }
    },
    series: [
      {
        name: '架构综合评估',
        type: 'radar',
        data: [
          {
            value: currentGroup.value.radarData,
            name: currentGroup.value.codeId,
            itemStyle: {
              color: color,
              borderColor: '#fff',
              borderWidth: 1
            },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: color + '33' },
                { offset: 1, color: color + '80' }
              ])
            },
            lineStyle: {
              width: 2,
              color: color
            },
            label: {
              show: true,
              formatter: function(params) {
                return params.value + '%';
              },
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 'bold',
              position: 'right',
              textShadowColor: '#000',
              textShadowBlur: 5,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            }
          }
        ]
      }
    ]
  };
  
  chartInstance.setOption(option);
};

// 监听组变化时重绘雷达图
watch(currentGroupId, () => {
  nextTick(() => {
    initRadarChart();
  });
});

// 监听窗口缩放
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

onMounted(() => {
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    const groupInfo = JSON.parse(storedInfo);
    if (groupInfo.groupId) {
      currentGroupId.value = groupInfo.groupId;
    }
  }
  
  currentLyricIndex.value = 1; 
  
  if (audioElement.value) {
    audioElement.value.addEventListener('ended', handleAudioEnded);
  }

  fetchState();
  pollingTimer = setInterval(fetchState, 1000);
  
  window.addEventListener('resize', handleResize);
  
  // 等待DOM更新后再加载音频
  nextTick(() => {
    loadCurrentGroupAudio();
  });
});

// === 音乐与歌词逻辑 ===
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
    console.log('音频已加载:', audioUrl);
  }
};

const loadCurrentGroupAudio = () => {
  if (currentGroup.value && currentGroup.value.music && currentGroup.value.music.audio) {
    loadAudio(currentGroup.value.music.audio);
  } else {
    console.log('无法加载音频:', currentGroup.value);
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
  if (pollingTimer) clearInterval(pollingTimer);
  if (chartInstance) chartInstance.dispose();
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* 针对评价区域的细滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #374151;
  border-radius: 4px;
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
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
</style>
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
          <span class="ml-4 px-2 py-0.5 border border-gray-600 rounded bg-gray-800 text-xs text-gray-400 font-mono tracking-widest">
            [ 开发者模式 ]
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

    <div v-if="!isEvaluated" class="flex-1 flex flex-col items-center justify-center z-10 bg-darkBg">
      <div class="w-16 h-16 border-4 border-[#2d353e] rounded-full animate-spin mb-6" :style="{ borderTopColor: currentGroup.themeColor }"></div>
      <h2 class="text-2xl font-bold text-white mb-3 tracking-wider">等待教师AI评估中...</h2>
      <p class="text-[#6b7280]">正在同步教师端下发的详细评审报告与数据架构</p>
    </div>

    <main v-else class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden">
      
      <div class="col-span-3 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up shadow-lg" style="animation-delay: 0.2s;" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          <div class="text-xs font-black mb-3 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            评分详情
          </div>
          <div class="flex-1 flex flex-col justify-between gap-4">
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor flex flex-col">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-textMuted">AI评分</span>
                <span class="text-xl font-black text-accentGreen">{{ currentGroup.scores.ai }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-accentGreen h-1.5 rounded-full transition-all duration-1000 ease-out" :style="{ width: currentGroup.scores.ai + '%' }"></div>
              </div>
            </div>
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor flex flex-col">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-textMuted">教师评分</span>
                <span class="text-xl font-black text-blue-500">{{ currentGroup.scores.teacher }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out" :style="{ width: currentGroup.scores.teacher + '%' }"></div>
              </div>
            </div>
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor flex flex-col">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-textMuted">小组互评</span>
                <span class="text-xl font-black text-purple-500">{{ currentGroup.scores.group }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-purple-500 h-1.5 rounded-full transition-all duration-1000 ease-out" :style="{ width: currentGroup.scores.group + '%' }"></div>
              </div>
            </div>
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor flex flex-col">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-textMuted">综合得分</span>
                <span class="text-xl font-black" :style="{ color: currentGroup.themeColor }">{{ currentGroup.scores.total }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="h-1.5 rounded-full transition-all duration-1000 ease-out" :style="{ width: currentGroup.scores.total + '%', backgroundColor: currentGroup.themeColor }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-5 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg animate-fade-in-up" style="animation-delay: 0.25s;">
        <div class="text-base font-black text-white mb-4 flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          小组评分雷达图
        </div>
        <div class="flex-1 flex items-center justify-center">
          <div id="radar-chart" class="w-full h-full"></div>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.3s; border-top-width: 4px;" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          <div class="text-xs font-black mb-3 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            综合评价与优化建议
          </div>
          <div class="flex-1 flex flex-col gap-4">
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor">
              <div class="text-xs font-bold text-textMuted mb-2">三方综合评价</div>
              <div class="text-sm text-textMain leading-tight font-medium">{{ currentGroup.evaluation.summary }}</div>
            </div>
            <div class="bg-darkBg p-3 rounded-lg border border-borderColor">
              <div class="text-xs font-bold text-textMuted mb-2">未来优化建议</div>
              <div class="text-sm text-textMain leading-tight font-medium">{{ currentGroup.evaluation.suggestions }}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as echarts from 'echarts';

// 导入音频文件 (请确保路径正确)
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

// 修改：返回学生工作台
const backToWorkspace = () => {
  // router.push('/student/task-split');
  router.back();
};

let chartInstance = null;

const initRadarChart = () => {
  const chartDom = document.getElementById('radar-chart');
  if (!chartDom) return;
  
  if (chartInstance) {
    chartInstance.dispose();
  }
  
  chartInstance = echarts.init(chartDom);
  
  const group = currentGroup.value;
  
  const option = {
    radar: {
      indicator: [
        { name: '安全性', max: 100 },
        { name: '性能', max: 100 },
        { name: '可靠性', max: 100 },
        { name: '创新性', max: 100 },
        { name: '工程可行性', max: 100 }
      ],
      radius: '70%',
      splitNumber: 4,
      axisName: { color: '#d1d5db', fontSize: 12 },
      splitLine: { lineStyle: { color: ['#2d353e'] } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#2d353e' } }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [85, 90, 88, 92, 86],
            name: 'AI评分',
            itemStyle: { color: '#23b586' },
            areaStyle: { 
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { color: '#23b586', offset: 0, opacity: 0.1 },
                { color: '#23b586', offset: 1, opacity: 0.4 }
              ])
            },
            lineStyle: { width: 3, color: '#23b586' },
            symbolSize: 6
          },
          {
            value: [88, 85, 90, 88, 92],
            name: '教师评分',
            itemStyle: { color: '#3b82f6' },
            areaStyle: { 
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { color: '#3b82f6', offset: 0, opacity: 0.1 },
                { color: '#3b82f6', offset: 1, opacity: 0.4 }
              ])
            },
            lineStyle: { width: 3, color: '#3b82f6' },
            symbolSize: 6
          },
          {
            value: [82, 88, 85, 90, 82],
            name: '小组评分',
            itemStyle: { color: '#a855f7' },
            areaStyle: { 
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { color: '#a855f7', offset: 0, opacity: 0.1 },
                { color: '#a855f7', offset: 1, opacity: 0.4 }
              ])
            },
            lineStyle: { width: 3, color: '#a855f7' },
            symbolSize: 6
          }
        ]
      }
    ],
    legend: {
      data: ['AI评分', '教师评分', '小组评分'],
      textStyle: { color: '#d1d5db' },
      top: 10
    }
  };
  
  chartInstance.setOption(option);
};

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

const groups = [
  {
    id: 1,
    name: '第一组',
    title: '通信安全 + 低功耗专用版',
    subtitle: '轻量级无人机加密体制',
    codeId: 'SEC-LOWPOWER-01',
    themeColor: '#3b82f6', 
    desc: '专注民用小型无人机通信安全，采用 PRESENT 与 ECC 组合，实现数据加密传输与双向认证，满足加解密时延≤10ms与功耗≤50mW的极致轻量需求。',
    hardware: 'STM32L432',
    scores: {
      ai: 85,
      teacher: 88,
      group: 82,
      total: 85
    },
    evaluation: {
      summary: '该方案在轻量级设计方面表现突出，成功平衡了安全性与功耗需求。AI评估认为方案创新性强，教师评价认可其工程可行性，小组互评也给出了较高分数。综合来看，这是一个非常成熟的轻量级加密方案。',
      suggestions: '建议进一步优化密钥管理流程，可考虑引入轻量级密钥更新机制，同时在硬件选型上探索更低功耗的芯片方案，以进一步提升系统性能。'
    },
    music: { tags: '清脆活泼、电子拨弦、快节奏', type: '映射轻量级、低时延特征', audio: audioLight, lyrics: [
      { text: " ", duration: 0 },  
      { text: "轻量级", duration: 9500 },
      { text: "我漫步在月光之下", duration: 5000 },
      { text: "微风轻抚着我的脸颊", duration: 4500 },
      { text: "宁静在心中慢慢流淌", duration: 5000 },
      { text: "时光仿佛停止了步伐", duration: 4000 },
      { text: "这宁静让我心醉", duration: 4600 },
      { text: "让我忘记所有疲惫", duration: 7100 },
      { text: "这宁静让我沉醉", duration: 5500 },
      { text: "让我在这夜色中静美", duration: 12000 },
      { text: "我沉醉在这夜色中心", duration: 9000 },
      { text: "微风轻抚着我的脸颊", duration: 10000 },
      { text: "宁静在心中缓缓流淌", duration: 9800 },
      { text: "时光仿佛凝固了年华", duration: 6300 },
      { text: "这宁静让我心醉", duration: 5000 },
      { text: "让我忘记所有疲惫", duration: 5500 },
      { text: "这宁静让我沉醉", duration: 4500 },
      { text: "让我在这夜色中静美", duration: 5500 },
      { text: "end~", duration: 15000 }
    ] },
    archLayers: [
      { name: '应用层', desc: '飞行控制指令、航拍/定位数据输入输出', highlight: false },
      { name: '安全层', desc: '身份认证、数据加解密、密钥协商', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发', highlight: false },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、电源模块', highlight: true }
    ],
    flow: ['双向身份认证', '协商一次性会话密钥', '数据加解密与校验', '销毁密钥与系统休眠'],
    algorithms: [
      { label: '轻量级数据加密', name: 'PRESENT 算法', desc: '64bit分组/80bit密钥，SPN结构31轮迭代。控制指令采用 ECB，影像数据采用 CBC 模式。' },
      { label: '双向身份认证', name: 'ECC (secp256r1)', desc: '无人机与终端基于 ECC 验证双方合法性，认证通过后动态协商生成一次一密的会话密钥。' }
    ]
  },
  {
    id: 2,
    name: '第二组',
    title: '通信安全 + 侧信道防护版',
    subtitle: '高安全抗物理攻击体制',
    codeId: 'SEC-SIDECHNL-02',
    themeColor: '#ef4444', 
    desc: '聚焦通信安全与侧信道防护，引入一阶掩码与恒定时间代码实现，阻断功耗、时序等物理信息泄露，抵御差分功耗分析（DPA）攻击。',
    hardware: 'STM32L432',
    scores: {
      ai: 90,
      teacher: 92,
      group: 88,
      total: 90
    },
    evaluation: {
      summary: '该方案在侧信道防护方面表现卓越，通过一阶掩码和恒定时间代码实现，有效抵御了物理攻击。AI和教师评价都给予了高度认可，小组互评也反映了方案的技术深度。',
      suggestions: '建议在保持安全性的同时，优化算法实现以减少性能开销，可考虑针对不同硬件平台进行专门优化，以提升方案的通用性。'
    },
    music: { tags: '多层叠加、沉稳厚重、低频轰鸣', type: '映射掩码防护、高运算冗余特征', audio: audioSideChannel, lyrics: [
      { text: " ", duration: 0 },  
      { text: "侧信道", duration: 1200 },
      { text: "挣脱了羁绊", duration: 3000 },
      { text: "我在网络中跳跃", duration: 3300 },
      { text: "你听那轻微的高频正在掩埋", duration: 3700 },
      { text: "动荡的节拍在流淌", duration: 3300 },
      { text: "我在虚拟世界探索远方", duration: 3500 },
      { text: "那瞬间光芒在闪掉", duration: 3500 },
      { text: "你是我在网络中的心跳", duration: 3500 },
      { text: "穿越比特间起伏的信号", duration: 3500 },
      { text: "感受这轻微的拥抱", duration: 3500 }
    ] },
    archLayers: [
      { name: '安全核心层', desc: '通信加密、身份认证、侧信道防护（掩码+恒定时间）', highlight: true },
      { name: '通信接口层', desc: 'WiFi / 蓝牙数据收发、帧封装', highlight: false },
      { name: '硬件支撑层', desc: 'STM32L432 低功耗单片机、电源、无线模组', highlight: true }
    ],
    flow: ['初始化防护单元', '双向认证与密钥协商', '掩码异或与恒定时间加密', '结束销毁与休眠'],
    algorithms: [
      { label: '侧信道防护加密', name: 'PRESENT + 掩码机制', desc: '将敏感数据与随机掩码异或以切断密钥关联，算法无分支跳转并随机插入空操作打乱功耗特征。' },
      { label: '身份认证体系', name: 'ECC 双向认证', desc: '执行设备校验并完成会话密钥协商，保障密钥分发的安全性与合法性。' }
    ]
  },
  {
    id: 3,
    name: '第三组',
    title: '通信安全 + 抗重放攻击',
    subtitle: '强时效性指令防劫持体制',
    codeId: 'SEC-NOREPLAY-03',
    themeColor: '#f59e0b', 
    desc: '有效阻止攻击者截取、重复发送旧数据包干扰正常通信。引入滑动窗口计数器机制，收发双方维护严格同步计数，确保指令唯一有效。',
    hardware: 'STM32L432',
    music: { tags: '节奏恒定、机械感强、精准节拍', type: '映射时间戳严格对齐、序列号递增特征', audio: audioAntiReplay, lyrics: [
      { text: "", duration: 0 },
      { text: "抗重放", duration: 8200 },
      { text: "单行道上 时针在倒转", duration: 3950 },
      { text: "指针划破 沉默的河岸", duration: 3650 },
      { text: "数字在闪烁 倒数着遗憾", duration: 3900 },
      { text: "却停不下 前进的船", duration: 3200 },
      { text: "重复的风景 在倒退", duration: 3400 },
      { text: "心跳却加速 如潮水", duration: 3950 },
      { text: "把昨天装进 漂流瓶", duration: 3800 },
      { text: "让未来在 掌心沸腾", duration: 20000 },
      { text: "单行道上 黎明在追赶", duration: 3800 },
      { text: "路灯把影子 切成两半", duration: 3800 },
      { text: "呼吸在发烫 脉搏在震颤", duration: 3900 },
      { text: "脚步丈量着 地平线", duration: 3800 },
      { text: "年轮在胸口 刻下疤", duration: 3800 },
      { text: "时光却催促着 发芽", duration: 3900 },
      { text: "把叹息折成 纸飞机", duration: 3900 },
      { text: "让远方在 云端呼吸", duration: 8300 },
      { text: "end", duration: 29700 }
    ] },
    archLayers: [
      { name: '安全层', desc: '数据加解密、身份校验、抗重放计数管理', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙数据收发、数据包封装', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、无线通信模块', highlight: false }
    ],
    flow: ['初始化同步计数器', '身份与同步校验', '附加计数器并加密传输', '接收解密校验过期丢弃'],
    algorithms: [
      { label: '通信安全加密', name: 'PRESENT 算法', desc: '硬件实现简单、资源占用低，对控制指令、航拍与定位数据进行全程加密传输。' },
      { label: '抗重放防护机制', name: '滑动窗口计数器', desc: '每发送一帧计数器自增并随数据加密发送；接收端校验大于本地记录才处理，并自动丢弃过期旧包。' }
    ]
  },
  {
    id: 4,
    name: '第四组',
    title: '通信安全 + 后量子算法',
    subtitle: '面向未来算力威胁前瞻体制',
    codeId: 'SEC-PQUANTUM-04',
    themeColor: '#8b5cf6', 
    desc: '面向未来量子计算环境，采用抗量子破解的轻量级后量子密码机制，摒弃传统易被攻破的方案，抵御未来的量子暴力破解威胁。',
    hardware: 'STM32L432',
    music: { tags: '未来感、复杂合成器、广阔空间', type: '映射庞大矩阵运算、大公钥体积特征', audio: audioPostQuantum, lyrics: [
      { text: "纯音乐。。。", duration: 30000 },
    ] },
    archLayers: [
      { name: '安全层', desc: '后量子密钥协商、数据加解密、通信安全封装', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发、帧格式处理', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗嵌入式平台、无线模块', highlight: false }
    ],
    flow: ['加载后量子参数', 'Kyber 安全密钥协商', '共享密钥加密通信', '接收解密与密钥清除'],
    algorithms: [
      { label: '密钥交换算法', name: 'CRYSTALS-Kyber', desc: '基于格基(Lattice)难题的轻量级后量子加密算法，不依赖传统ECC/RSA，抗量子攻击且运算速度快。' },
      { label: '实时通信加密', name: '对称加密体制', desc: '使用 Kyber 算法安全协商生成的会话密钥对通信数据进行实时加解密，保障协议兼容性与高机密性。' }
    ]
  }
];

// 从 localStorage 读取组信息
const currentGroupId = ref(1);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));

// === 核心修改：阻塞等待与轮询逻辑 ===
const isEvaluated = ref(false);
let pollingTimer = null;

const fetchState = async () => {
  try {
    const res = await fetch('/api/state');
    const state = await res.json();
    if (state.ai_evaluated === 1) {
      isEvaluated.value = true;
      if (pollingTimer) clearInterval(pollingTimer);
    }
  } catch (error) {
    // 静默处理，避免影响页面
  }
};

onMounted(() => {
  // 从 localStorage 读取组信息
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

  // 开启状态机轮询
  fetchState();
  pollingTimer = setInterval(fetchState, 1000);
  
  // 初始化雷达图
  if (isEvaluated.value) {
    setTimeout(() => {
      initRadarChart();
    }, 500);
  }
  
  // 添加窗口 resize 事件监听
  window.addEventListener('resize', handleResize);
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
  if (pollingTimer) clearInterval(pollingTimer);
  // 清理雷达图实例
  if (chartInstance) {
    chartInstance.dispose();
  }
  // 移除窗口 resize 事件监听
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
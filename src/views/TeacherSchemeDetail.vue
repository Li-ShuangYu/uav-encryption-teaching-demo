<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
        <div class="flex items-center">
          <span class="text-xl font-black text-white tracking-wide mr-1">方案详情：</span>
          <select 
            v-model="currentGroupId" 
            @change="handleGroupChange"
            class="appearance-none bg-transparent outline-none border-b-2 border-transparent hover:border-borderColor text-xl font-black py-1 px-1 transition-all cursor-pointer"
            :style="{ color: currentGroup.themeColor }"
          >
            <option v-for="g in groups" :key="g.id" :value="g.id" class="bg-darkBg text-textMain">
              {{ g.name }} - {{ g.title }}
            </option>
          </select>
        </div>
      </div>
      <button 
        @click="backToEvaluation"
        class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        返回评估总览
      </button>
    </header>

    <main class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden">
      
      <div class="col-span-3 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg relative overflow-hidden transition-all duration-500">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          <div class="flex justify-between items-center mb-2 relative z-10">
            <span class="text-xs px-2 py-0.5 rounded font-black transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor + '33', color: currentGroup.themeColor, border: '1px solid ' + currentGroup.themeColor + '66' }">
              {{ currentGroup.name }}
            </span>
            <span class="text-textMuted text-xs font-bold font-mono">{{ currentGroup.codeId }}</span>
          </div>
          <h2 class="text-xl font-black text-white relative z-10 mb-2">{{ currentGroup.subtitle }}</h2>
          <p class="text-sm font-medium text-textMuted leading-tight overflow-hidden relative z-10">{{ currentGroup.desc }}</p>
          <div class="mt-auto pt-2 border-t border-borderColor/50 flex justify-between items-end relative z-10">
            <div class="text-xs font-bold text-textMuted">AI 硬件适配评级</div>
            <div class="text-2xl font-black italic transition-colors duration-500" :style="{ color: currentGroup.themeColor }">{{ currentGroup.hardware }}</div>
          </div>
        </div>

        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden transition-all duration-500 shadow-lg" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          <div class="text-xs font-black mb-3 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            核心密码学选型
          </div>
          <div class="flex-1 flex flex-col justify-between gap-2">
            <div v-for="(algo, index) in currentGroup.algorithms" :key="index" class="bg-darkBg p-2.5 rounded-lg border border-borderColor border-l-4 transition-all duration-500 flex flex-col justify-center h-full" :style="{ borderLeftColor: index === 0 ? currentGroup.themeColor : (currentGroup.themeColor + '80') }">
              <div class="flex justify-between items-end mb-1">
                <span class="text-[10px] font-bold text-textMuted">{{ algo.label }}</span>
                <span class="text-sm font-black transition-colors duration-500" :style="{ color: index === 0 ? currentGroup.themeColor : '#e5e7eb' }">{{ algo.name }}</span>
              </div>
              <div class="text-[11px] text-textMain leading-tight font-medium">{{ algo.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-5 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg">
        <div class="text-base font-black text-white mb-4 flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          系统架构与安全流程
        </div>
        <div class="flex-1 flex flex-col justify-between mb-4 relative py-1">
          <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-borderColor -translate-x-1/2 z-0 rounded-full"></div>
          <div v-for="(layer, index) in currentGroup.archLayers" :key="index" class="relative z-10 w-[85%] mx-auto bg-cardInnerBg border rounded-lg py-2.5 px-4 flex items-center justify-between transition-all duration-500" :style="{ borderColor: layer.highlight ? currentGroup.themeColor : '#374151', backgroundColor: layer.highlight ? '#1f2937' : '' }">
            <div class="text-xs font-black transition-colors duration-500" :style="{ color: layer.highlight ? currentGroup.themeColor : '#9ca3af' }">{{ layer.name }}</div>
            <div class="text-xs font-bold text-textMain text-right w-2/3 leading-snug">{{ layer.desc }}</div>
          </div>
        </div>
        <div class="shrink-0 bg-darkBg/80 rounded-lg p-3 border border-borderColor">
          <div class="text-[11px] font-black text-textMuted mb-2 uppercase tracking-widest">Security Flow / 流转图</div>
          <div class="flex items-center justify-between text-xs font-black font-mono transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <template v-for="(step, index) in currentGroup.flow" :key="index">
              <span>{{ step }}</span>
              <span v-if="index < currentGroup.flow.length - 1" class="text-textMuted opacity-50">➔</span>
            </template>
          </div>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-500" :style="{ borderTopColor: currentGroup.themeColor + '66', borderTopWidth: '4px' }">
          
          <div class="px-5 pt-5 shrink-0 relative z-20 flex justify-between items-start">
            <div>
              <div class="text-sm font-black mb-1 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                AI 跨模态感知
              </div>
              <div class="text-lg text-white font-black tracking-widest">特征声学映射</div>
            </div>
            
            <div class="text-right max-w-[55%]">
              <div class="text-[11px] font-black transition-colors duration-500 mb-0.5" :style="{ color: currentGroup.themeColor }">STYLE / 风格解码</div>
              <div class="font-bold text-white text-sm leading-tight truncate">{{ currentGroup.music.tags }}</div>
              <div class="text-[10px] mt-1 text-textMuted truncate">{{ currentGroup.music.type }}</div>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-hidden z-10 flex items-center justify-center">
            
            <div class="absolute top-1/4 w-[85%] pointer-events-none transition-transform duration-500 ease-in-out"
                 :style="{ transform: `translateY(calc(-${currentLyricIndex * 2.5 + 1.25}rem))` }">
              <div 
                v-for="(lyric, index) in mockLyrics" 
                :key="index"
                class="h-10 flex items-center justify-center text-center transition-all duration-500 ease-out truncate"
                :class="[
                  index < currentLyricIndex - 2 ? 'opacity-0 scale-90' : '', // 上方多余的隐藏
                  index === currentLyricIndex - 2 ? 'text-xs font-medium text-textMuted opacity-20 scale-95' : '', // 已播：倒数第2句
                  index === currentLyricIndex - 1 ? 'text-sm font-medium text-textMuted opacity-60 scale-100' : '', // 已播：上1句
                  index === currentLyricIndex ? 'font-black text-lg scale-110 opacity-100' : '', // 播放中：精准居中、放大
                  index === currentLyricIndex + 1 ? 'text-sm font-medium text-textMuted opacity-60 scale-100' : '', // 未播：下1句
                  index === currentLyricIndex + 2 ? 'text-xs font-medium text-textMuted opacity-20 scale-95' : '', // 未播：下2句
                  index > currentLyricIndex + 2 ? 'opacity-0 scale-90' : '' // 下方多余的隐藏
                ]"
                :style="{ color: index === currentLyricIndex ? currentGroup.themeColor : '' }"
              >
                {{ lyric }}
              </div>
            </div>
            
          </div>

          <!-- 唱针 -->
         <div 
            class="absolute z-30 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] drop-shadow-2xl"
            :style="{
              left: 'calc(50% - 210px)',
              bottom: '220px',
              /* 保持了你的 scaleX(-1) 镜像反转设置 */
              transform: `scaleX(-1) ${isPlaying ? 'rotate(34deg)' : 'rotate(10deg)'}`,
              transformOrigin: '16px 16px' /* 旋转轴心依然是底座中心 */
            }"
            @click="togglePlay"
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

          <!-- 音频元素 -->
          <audio ref="audioElement" class="hidden" preload="metadata">
            <!-- 这里可以添加音频文件 --><source src="../assets/audio/枫-周杰伦-118987.mp3" type="audio/mpeg">
          </audio>

          <!-- 唱片 -->
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const backToEvaluation = () => {
  router.push('/teacher/scheme-evaluation');
};

const groups = [
  {
    id: 1,
    name: '第一组',
    title: '通信安全 + 低功耗专用版',
    subtitle: '轻量级无人机加密体制',
    codeId: 'SEC-LOWPOWER-01',
    themeColor: '#3b82f6', // Blue
    desc: '专注民用小型无人机通信安全，采用 PRESENT 与 ECC 组合 [cite: 33, 34]，实现数据加密传输与双向认证 [cite: 6]，满足加解密时延≤10ms与功耗≤50mW的极致轻量需求 [cite: 7, 11]。',
    hardware: 'STM32L432', // [cite: 8]
    music: { tags: '清脆活泼、电子拨弦、快节奏', type: '映射轻量级、低时延特征' },
    archLayers: [
      { name: '应用层', desc: '飞行控制指令、航拍/定位数据输入输出 [cite: 28]', highlight: false },
      { name: '安全层', desc: '身份认证、数据加解密、密钥协商 [cite: 29]', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发 [cite: 30]', highlight: false },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、电源模块 [cite: 31]', highlight: true }
    ],
    flow: ['双向身份认证', '协商一次性会话密钥', '数据加解密与校验', '销毁密钥与系统休眠'], // [cite: 54, 55, 56, 57]
    algorithms: [
      { label: '轻量级数据加密', name: 'PRESENT 算法', desc: '64bit分组/80bit密钥，SPN结构31轮迭代 [cite: 33, 43]。控制指令采用 ECB，影像数据采用 CBC 模式 [cite: 44, 45]。' },
      { label: '双向身份认证', name: 'ECC (secp256r1)', desc: '无人机与终端基于 ECC 验证双方合法性，认证通过后动态协商生成一次一密的会话密钥 [cite: 40, 41]。' }
    ]
  },
  {
    id: 2,
    name: '第二组',
    title: '通信安全 + 侧信道防护版',
    subtitle: '高安全抗物理攻击体制',
    codeId: 'SEC-SIDECHNL-02',
    themeColor: '#ef4444', // Red
    desc: '聚焦通信安全与侧信道防护，引入一阶掩码与恒定时间代码实现 [cite: 81, 110]，阻断功耗、时序等物理信息泄露，抵御差分功耗分析（DPA）攻击 [cite: 84]。',
    hardware: 'STM32L432', // [cite: 91]
    music: { tags: '多层叠加、沉稳厚重、低频轰鸣', type: '映射掩码防护、高运算冗余特征' },
    archLayers: [
      { name: '安全核心层', desc: '通信加密、身份认证、侧信道防护（掩码+恒定时间） [cite: 89]', highlight: true },
      { name: '通信接口层', desc: 'WiFi / 蓝牙数据收发、帧封装 [cite: 90]', highlight: false },
      { name: '硬件支撑层', desc: 'STM32L432 低功耗单片机、电源、无线模组 [cite: 91]', highlight: true }
    ],
    flow: ['初始化防护单元', '双向认证与密钥协商', '掩码异或与恒定时间加密', '结束销毁与休眠'], // [cite: 94, 96, 101, 103]
    algorithms: [
      { label: '侧信道防护加密', name: 'PRESENT + 掩码机制', desc: '将敏感数据与随机掩码异或以切断密钥关联，算法无分支跳转并随机插入空操作打乱功耗特征 [cite: 112, 113, 114]。' },
      { label: '身份认证体系', name: 'ECC 双向认证', desc: '执行设备校验并完成会话密钥协商，保障密钥分发的安全性与合法性 [cite: 107]。' }
    ]
  },
  {
    id: 3,
    name: '第三组',
    title: '通信安全 + 抗重放攻击',
    subtitle: '强时效性指令防劫持体制',
    codeId: 'SEC-NOREPLAY-03',
    themeColor: '#f59e0b', // Amber
    desc: '有效阻止攻击者截取、重复发送旧数据包干扰正常通信 [cite: 131]。引入滑动窗口计数器机制，收发双方维护严格同步计数，确保指令唯一有效 [cite: 151, 156]。',
    hardware: 'STM32L432', // [cite: 138]
    music: { tags: '节奏恒定、机械感强、精准节拍', type: '映射时间戳严格对齐、序列号递增特征' },
    archLayers: [
      { name: '安全层', desc: '数据加解密、身份校验、抗重放计数管理 [cite: 136]', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙数据收发、数据包封装 [cite: 137]', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、无线通信模块 [cite: 138]', highlight: false }
    ],
    flow: ['初始化同步计数器', '身份与同步校验', '附加计数器并加密传输', '接收解密校验过期丢弃'], // [cite: 140, 141, 142, 143]
    algorithms: [
      { label: '通信安全加密', name: 'PRESENT 算法', desc: '硬件实现简单、资源占用低，对控制指令、航拍与定位数据进行全程加密传输 [cite: 147, 148]。' },
      { label: '抗重放防护机制', name: '滑动窗口计数器', desc: '每发送一帧计数器自增并随数据加密发送；接收端校验大于本地记录才处理，并自动丢弃过期旧包 [cite: 153, 154, 155]。' }
    ]
  },
  {
    id: 4,
    name: '第四组',
    title: '通信安全 + 后量子算法',
    subtitle: '面向未来算力威胁前瞻体制',
    codeId: 'SEC-PQUANTUM-04',
    themeColor: '#8b5cf6', // Purple
    desc: '面向未来量子计算环境，采用抗量子破解的轻量级后量子密码机制 [cite: 169]，摒弃传统易被攻破的方案，抵御未来的量子暴力破解威胁 [cite: 172]。',
    hardware: 'STM32L432', // [cite: 179]
    music: { tags: '未来感、复杂合成器、广阔空间', type: '映射庞大矩阵运算、大公钥体积特征' },
    archLayers: [
      { name: '安全层', desc: '后量子密钥协商、数据加解密、通信安全封装 [cite: 177]', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发、帧格式处理 [cite: 178]', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗嵌入式平台、无线模块 [cite: 179]', highlight: false }
    ],
    flow: ['加载后量子参数', 'Kyber 安全密钥协商', '共享密钥加密通信', '接收解密与密钥清除'], // [cite: 181, 182, 183, 184]
    algorithms: [
      { label: '密钥交换算法', name: 'CRYSTALS-Kyber', desc: '基于格基(Lattice)难题的轻量级后量子加密算法，不依赖传统ECC/RSA，抗量子攻击且运算速度快 [cite: 192, 193, 194]。' },
      { label: '实时通信加密', name: '对称加密体制', desc: '使用 Kyber 算法安全协商生成的会话密钥对通信数据进行实时加解密，保障协议兼容性与高机密性 [cite: 189, 190]。' }
    ]
  }
];

const currentGroupId = ref(1);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));

const mockLyrics = [
  "Initializing acoustics...",
  "Parsing security architecture...",
  "Mapping cryptographic features...",
  "Generating auditory feedback...",
  "Applying quantum resistance...",
  "Syncing side-channel data...",
  "Playback sync established.",
  "Monitoring payload datastream..."
];

const currentLyricIndex = ref(0);
let lyricTimer = null;
const isPlaying = ref(true);
const audioElement = ref(null);

// 切换播放/暂停状态
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

// 播放音频
const playAudio = () => {
  if (audioElement.value) {
    audioElement.value.play().catch(error => {
      console.error('音频播放失败:', error);
    });
  }
};

// 暂停音频
const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause();
  }
};

// 加载音频
const loadAudio = (audioUrl) => {
  if (audioElement.value) {
    audioElement.value.src = audioUrl;
    if (isPlaying.value) {
      playAudio();
    }
  }
};

// 开始歌词计时器
const startLyricTimer = () => {
  if (!lyricTimer) {
    lyricTimer = setInterval(() => {
      if (currentLyricIndex.value < mockLyrics.length - 1) {
        currentLyricIndex.value += 1;
      } else {
        currentLyricIndex.value = 0; 
      }
    }, 2200); // 稍微放慢歌词滚动速度，增加沉浸感
  }
};

// 停止歌词计时器
const stopLyricTimer = () => {
  if (lyricTimer) {
    clearInterval(lyricTimer);
    lyricTimer = null;
  }
};

// 组件加载完成后直接自动播放
onMounted(() => {
  startLyricTimer();
});

const handleGroupChange = () => {
  currentLyricIndex.value = 0; // 切换组时重置歌词进度
};

onUnmounted(() => {
  if (lyricTimer) clearInterval(lyricTimer);
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
select::-ms-expand {
  display: none;
}

@keyframes spin-record {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
.vinyl-spin {
  animation: spin-record 5s linear infinite; /* 稍微放慢黑胶旋转速度 */
  animation-play-state: paused;
}
.vinyl-playing {
  animation-play-state: running;
}
</style>
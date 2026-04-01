<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-blue-500 rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">方案详情：通信安全 + 低功耗专用版</h1>
      </div>
      <button 
        @click="backToEvaluation"
        class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-textMain px-4 py-2 rounded shadow transition-colors flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        返回评估总览
      </button>
    </header>

    <main class="flex-1 p-4 grid grid-cols-12 gap-4 bg-darkBg min-h-0 overflow-hidden">
      
      <div class="col-span-3 flex flex-col gap-4">
        <div class="bg-panelBg border border-borderColor rounded-lg p-5 flex flex-col gap-4 shadow-lg h-1/2">
          <div class="flex justify-between items-start">
            <span class="text-xs px-2 py-1 rounded font-bold bg-blue-500/20 text-blue-500 border border-blue-500/50">第一组</span>
            <span class="text-textMuted text-xs font-mono">ID: SEC-LOWPOWER-01</span>
          </div>
          <h2 class="text-lg font-bold text-white">轻量级无人机加密体制</h2>
          <p class="text-sm text-textMuted leading-relaxed overflow-hidden text-ellipsis">
            专注民用小型无人机通信安全，采用 PRESENT 与 ECC 组合，实现数据加密与双向认证，极致降低算力与功耗开销。
          </p>
          <div class="mt-auto pt-3 border-t border-borderColor/30 flex justify-between items-end">
            <div class="text-xs text-textMuted">AI 硬件评级</div>
            <div class="text-2xl font-black text-blue-500 italic">STM32L432</div>
          </div>
        </div>

        <div class="bg-panelBg border border-blue-500/30 rounded-lg p-5 flex flex-col shadow-[0_0_15px_rgba(59,130,246,0.15)] h-1/2 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div class="text-xs font-bold text-blue-500 mb-1 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            AI 跨模态方案感知
          </div>
          <div class="text-sm text-white font-bold mb-4">方案特征频域映射</div>
          
          <div class="flex-1 flex items-center justify-center gap-1.5 mb-4">
            <div v-for="i in 12" :key="i" class="w-2 bg-blue-500/40 rounded-t-sm transition-all duration-300" :style="{ height: isPlaying ? Math.random() * 100 + '%' : '10%' }"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-[11px] text-textMuted w-2/3">
              <span class="text-blue-400">风格解码：</span>清脆活泼、电子拨弦、快节奏 (映射轻量级、低时延特征)
            </div>
            <button 
              @click="togglePlay" 
              class="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"
            >
              <svg v-if="!isPlaying" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-5 bg-panelBg border border-borderColor rounded-lg p-5 flex flex-col shadow-lg">
        <div class="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-blue-500"></div>
          系统架构与安全流程
        </div>
        
        <div class="flex-1 flex flex-col justify-between mb-6 relative">
          <div class="absolute left-1/2 top-0 bottom-0 w-px bg-borderColor -translate-x-1/2 z-0"></div>
          
          <div v-for="(layer, index) in archLayers" :key="index" class="relative z-10 w-4/5 mx-auto bg-cardInnerBg border border-blue-500/30 rounded py-2.5 px-4 flex items-center justify-between group hover:border-blue-500 transition-colors">
            <div class="text-xs font-bold" :class="layer.highlight ? 'text-blue-400' : 'text-textMuted'">{{ layer.name }}</div>
            <div class="text-[11px] text-textMain text-right w-2/3">{{ layer.desc }}</div>
          </div>
        </div>

        <div class="shrink-0 bg-darkBg/50 rounded-lg p-3 border border-borderColor">
          <div class="text-[10px] text-textMuted mb-2 uppercase tracking-widest">Security Flow / 交互流程</div>
          <div class="flex items-center justify-between text-xs text-blue-400 font-mono">
            <span>双向认证</span>
            <span>➔</span>
            <span>会话密钥协商</span>
            <span>➔</span>
            <span>数据分模加密</span>
            <span>➔</span>
            <span>会话销毁</span>
          </div>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-4">
        
        <div class="bg-panelBg border border-borderColor rounded-lg p-5 shadow-lg h-1/2 flex flex-col">
          <div class="text-sm font-bold text-white mb-4">核心密码学选型</div>
          <div class="flex-1 flex flex-col justify-center gap-3">
            <div class="bg-darkBg p-3 rounded border border-borderColor border-l-2 border-l-blue-500">
              <div class="flex justify-between items-end mb-1">
                <span class="text-xs text-textMuted">轻量级数据加密</span>
                <span class="text-sm font-bold text-blue-400">PRESENT 算法</span>
              </div>
              <div class="text-[11px] text-textMain leading-snug">64bit 分组 / 80bit 密钥。采用 SPN 结构，31轮迭代，空闲休眠。指令使用 ECB 模式，影像使用 CBC 模式。</div>
            </div>
            
            <div class="bg-darkBg p-3 rounded border border-borderColor border-l-2 border-l-accentGreen">
              <div class="flex justify-between items-end mb-1">
                <span class="text-xs text-textMuted">身份认证体系</span>
                <span class="text-sm font-bold text-accentGreen">ECC (secp256r1)</span>
              </div>
              <div class="text-[11px] text-textMain leading-snug">无人机与地面终端实现双向数字签名认证，并基于此动态协商一次一密的通信会话密钥。</div>
            </div>
          </div>
        </div>

        <div class="bg-panelBg border border-borderColor rounded-lg p-5 shadow-lg h-1/2 flex flex-col">
          <div class="text-sm font-bold text-white mb-4">仿真验证指标</div>
          <div class="flex-1 grid grid-cols-2 gap-3">
            <div v-for="metric in metrics" :key="metric.label" class="bg-cardInnerBg flex flex-col justify-center items-center rounded border border-borderColor">
              <div class="text-[10px] text-textMuted mb-1">{{ metric.label }}</div>
              <div class="flex items-baseline gap-1">
                <span class="text-xl font-black" :class="metric.color">{{ metric.value }}</span>
                <span class="text-xs text-textMuted">{{ metric.unit }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const backToEvaluation = () => {
  router.push('/teacher/ai-evaluate');
};

// 播放器状态控制
const isPlaying = ref(false);
let visualizerInterval = null;

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    // 这里可以接入真实的 Audio 对象播放音乐
    visualizerInterval = setInterval(() => {
      // 触发 Vue 响应式更新，实现频谱跳动
      isPlaying.value = isPlaying.value; 
    }, 150);
  } else {
    clearInterval(visualizerInterval);
  }
};

// 四层架构数据源 (完美对应文档 3.1)
const archLayers = [
  { name: '应用层', desc: '飞行控制指令、航拍/定位数据输入输出', highlight: false },
  { name: '安全层', desc: 'ECC身份认证、PRESENT加解密、密钥协商', highlight: true },
  { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发', highlight: false },
  { name: '硬件层', desc: 'STM32L432 低功耗单片机、电源模块', highlight: true }
];

// 核心性能指标数据源 (完美对应文档 5.2 & 6.1)
const metrics = [
  { label: '系统运行功耗', value: '≤ 38', unit: 'mW', color: 'text-green-400' },
  { label: '加密时延', value: '< 4.5', unit: 'ms', color: 'text-blue-400' },
  { label: '通信带宽开销', value: '≤ 8', unit: '%', color: 'text-purple-400' },
  { label: '系统总成本', value: '≤ 120', unit: '元', color: 'text-yellow-400' }
];

onMounted(() => {
  // 组件加载逻辑
});
</script>

<style scoped>
/* 保持外层绝对干净，不出现任何滚动条 */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
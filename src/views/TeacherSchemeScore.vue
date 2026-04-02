<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
        <div class="flex items-center">
          <span class="text-2xl font-black text-white tracking-wide mr-4">方案架构蓝图：</span>
          
          <div class="flex items-center bg-gray-800/60 rounded-lg px-2 border border-gray-700 shadow-inner">
            <button 
              @click="prevGroup" 
              class="p-1.5 hover:text-white text-gray-400 transition-all duration-300 rounded hover:bg-gray-700" 
              :disabled="currentGroupId === 1" 
              :class="{'opacity-30 cursor-not-allowed': currentGroupId === 1}"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span class="text-xl font-black transition-colors duration-500 mx-4 min-w-[280px] text-center" :style="{ color: currentGroup.themeColor }">
              {{ currentGroup.name }} - {{ currentGroup.title }}
            </span>
            <button 
              @click="nextGroup" 
              class="p-1.5 hover:text-white text-gray-400 transition-all duration-300 rounded hover:bg-gray-700" 
              :disabled="currentGroupId === 4" 
              :class="{'opacity-30 cursor-not-allowed': currentGroupId === 4}"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

        </div>
      </div>
      <button 
        @click="backToWorkspace"
        class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        返回方案AI评估页
      </button>
    </header>

    <main class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden">
      
      <div class="col-span-3 flex flex-col gap-3">
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          <div class="flex justify-between items-center mb-2 relative z-10">
            <span class="text-xs px-2 py-0.5 rounded font-black transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor + '33', color: currentGroup.themeColor, border: '1px solid ' + currentGroup.themeColor + '66' }">
              方案代号
            </span>
            <span class="text-textMuted text-xs font-bold font-mono">{{ currentGroup.codeId }}</span>
          </div>
          <h2 class="text-2xl font-black text-white relative z-10 mb-2">{{ currentGroup.subtitle }}</h2>
          <p class="text-sm font-medium text-textMuted leading-tight overflow-hidden relative z-10 mb-4">{{ currentGroup.desc }}</p>
          
          <div class="pt-2 border-t border-borderColor/50 flex justify-between items-end relative z-10 mb-4">
            <div class="text-xs font-bold text-textMuted">目标适配硬件</div>
            <div class="text-xl font-black italic transition-colors duration-500" :style="{ color: currentGroup.themeColor }">{{ currentGroup.hardware }}</div>
          </div>

          <div class="mt-auto grid grid-cols-2 gap-2 relative z-10">
            <button class="py-1.5 bg-[#1f2937] hover:bg-[#374151] border border-gray-600 rounded text-xs text-gray-300 font-bold transition-colors flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              API接口文档
            </button>
            <button class="py-1.5 bg-[#1f2937] hover:bg-[#374151] border border-gray-600 rounded text-xs text-gray-300 font-bold transition-colors flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              下载基础工程
            </button>
          </div>
        </div>

        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up shadow-lg" style="animation-delay: 0.2s;" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          <div class="text-xs font-black mb-3 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            开发需实现的核心算法
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

      <div class="col-span-5 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg animate-fade-in-up" style="animation-delay: 0.25s;">
        <div class="text-base font-black text-white mb-4 flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          系统架构与数据流转参考
        </div>
        <div class="flex-1 flex flex-col justify-between mb-4 relative py-1">
          <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-borderColor -translate-x-1/2 z-0 rounded-full"></div>
          <div v-for="(layer, index) in currentGroup.archLayers" :key="index" class="relative z-10 w-[85%] mx-auto bg-cardInnerBg border rounded-lg py-2.5 px-4 flex items-center justify-between transition-all duration-500 hover:scale-[1.02]" :style="{ borderColor: layer.highlight ? currentGroup.themeColor : '#374151', backgroundColor: layer.highlight ? '#1f2937' : '' }">
            <div class="text-xs font-black transition-colors duration-500" :style="{ color: layer.highlight ? currentGroup.themeColor : '#9ca3af' }">{{ layer.name }}</div>
            <div class="text-xs font-bold text-textMain text-right w-2/3 leading-snug">{{ layer.desc }}</div>
          </div>
        </div>
        <div class="shrink-0 bg-darkBg/80 rounded-lg p-3 border border-borderColor">
          <div class="text-[11px] font-black text-textMuted mb-2 uppercase tracking-widest flex justify-between items-center">
            <span>Security Flow / 时序图节点</span>
            <span class="text-[#3b82f6] hover:underline cursor-pointer">查看详细UML图</span>
          </div>
          <div class="flex items-center justify-between text-xs font-black font-mono transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <template v-for="(step, index) in currentGroup.flow" :key="index">
              <span>{{ step }}</span>
              <span v-if="index < currentGroup.flow.length - 1" class="text-textMuted opacity-50">➔</span>
            </template>
          </div>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.3s; border-top-width: 4px;" :style="{ borderTopColor: currentGroup.themeColor }">
          
          <div class="px-5 pt-4 pb-3 shrink-0 relative z-20 flex justify-between items-center border-b border-borderColor bg-cardInnerBg">
            <div class="text-base font-black flex items-center gap-2 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              教师综合打分与评价
            </div>
            <div>
              <span v-if="currentGroup.review.isSubmitted" class="text-xs px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-800/50">已完成评估</span>
              <span v-else class="text-xs px-2 py-1 rounded bg-yellow-900/30 text-yellow-400 border border-yellow-800/50">待评估打分</span>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col p-5 gap-5">
            
            <div class="bg-darkBg rounded-lg border border-borderColor p-4 space-y-4">
              <div v-for="dim in dimensions" :key="dim.key" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-300 w-20">{{ dim.label }}</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  v-model.number="currentGroup.review.scores[dim.key]" 
                  class="flex-1 mx-4 custom-range" 
                  :style="{ '--range-color': currentGroup.themeColor }"
                  :disabled="currentGroup.review.isSubmitted"
                >
                <span class="text-base font-mono font-bold w-8 text-right" :style="{ color: currentGroup.themeColor }">
                  {{ currentGroup.review.scores[dim.key] }}
                </span>
              </div>
            </div>

            <div class="flex justify-between items-end pb-3 border-b border-gray-700/50">
              <span class="text-sm font-medium text-textMuted">系统计算综合得分</span>
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-black transition-colors duration-500" :style="{ color: currentGroup.themeColor, textShadow: `0 0 20px ${currentGroup.themeColor}60` }">
                  {{ calculateTotalScore(currentGroup) }}
                </span>
                <span class="text-lg text-gray-500 font-bold">/100</span>
              </div>
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-sm font-bold text-gray-300 flex justify-between">
                <span>评审指导意见</span>
                <span class="text-xs font-normal text-gray-500">支持 Markdown 简写</span>
              </label>
              <textarea 
                v-model="currentGroup.review.comment" 
                :disabled="currentGroup.review.isSubmitted"
                class="w-full flex-1 min-h-[100px] bg-[#1a1d24] border border-gray-700 rounded-lg p-3 text-sm text-gray-200 focus:outline-none transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed" 
                :style="{ focusBorderColor: currentGroup.themeColor }"
                placeholder="请输入对该方案架构的优缺点评价、后续迭代建议等内容..."
              ></textarea>
            </div>

            <button 
              @click="submitReview" 
              :disabled="currentGroup.review.isSubmitted"
              class="w-full py-3 rounded-lg text-white font-bold text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mt-auto shrink-0"
              :class="currentGroup.review.isSubmitted ? 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none border border-gray-700' : 'hover:brightness-110 active:scale-[0.98]'"
              :style="{ backgroundColor: currentGroup.review.isSubmitted ? '' : currentGroup.themeColor }"
            >
              <svg v-if="!currentGroup.review.isSubmitted" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
              <svg v-else class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
              {{ currentGroup.review.isSubmitted ? '已成功录入系统' : '确认提交综合评估' }}
            </button>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 返回方案AI评估页
const backToWorkspace = () => {
  router.push('/teacher/ai-evaluate');
};

// 预设打分维度
const dimensions = [
  { key: 'security', label: '安全保密性' },
  { key: 'integrity', label: '数据完整性' },
  { key: 'usability', label: '系统可用性' },
  { key: 'cost', label: '硬件成本控制' },
  { key: 'innovation', label: '方案创新性' }
];

// 初始化带有 review 数据的 groups
const groups = reactive([
  {
    id: 1,
    name: '第一组',
    title: '通信安全 + 低功耗专用版',
    subtitle: '轻量级无人机加密体制',
    codeId: 'SEC-LOWPOWER-01',
    themeColor: '#3b82f6', 
    desc: '专注民用小型无人机通信安全，采用 PRESENT 与 ECC 组合，实现数据加密传输与双向认证，满足加解密时延≤10ms与功耗≤50mW的极致轻量需求。',
    hardware: 'STM32L432',
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
    ],
    // 教师评审数据
    review: {
      scores: { security: 85, integrity: 80, usability: 90, cost: 95, innovation: 75 },
      comment: '方案在低功耗限制下做出了很好的权衡。PRESENT算法的硬件实现资源极小，非常符合要求。建议后续关注硬件随机数生成器的实现细节。',
      isSubmitted: false
    }
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
    archLayers: [
      { name: '安全核心层', desc: '通信加密、身份认证、侧信道防护（掩码+恒定时间）', highlight: true },
      { name: '通信接口层', desc: 'WiFi / 蓝牙数据收发、帧封装', highlight: false },
      { name: '硬件支撑层', desc: 'STM32L432 低功耗单片机、电源、无线模组', highlight: true }
    ],
    flow: ['初始化防护单元', '双向认证与密钥协商', '掩码异或与恒定时间加密', '结束销毁与休眠'],
    algorithms: [
      { label: '侧信道防护加密', name: 'PRESENT + 掩码机制', desc: '将敏感数据与随机掩码异或以切断密钥关联，算法无分支跳转并随机插入空操作打乱功耗特征。' },
      { label: '身份认证体系', name: 'ECC 双向认证', desc: '执行设备校验并完成会话密钥协商，保障密钥分发的安全性与合法性。' }
    ],
    review: {
      scores: { security: 95, integrity: 90, usability: 75, cost: 70, innovation: 85 },
      comment: '',
      isSubmitted: false
    }
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
    archLayers: [
      { name: '安全层', desc: '数据加解密、身份校验、抗重放计数管理', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙数据收发、数据包封装', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、无线通信模块', highlight: false }
    ],
    flow: ['初始化同步计数器', '身份与同步校验', '附加计数器并加密传输', '接收解密校验过期丢弃'],
    algorithms: [
      { label: '通信安全加密', name: 'PRESENT 算法', desc: '硬件实现简单、资源占用低，对控制指令、航拍与定位数据进行全程加密传输。' },
      { label: '抗重放防护机制', name: '滑动窗口计数器', desc: '每发送一帧计数器自增并随数据加密发送；接收端校验大于本地记录才处理，并自动丢弃过期旧包。' }
    ],
    review: {
      scores: { security: 85, integrity: 95, usability: 85, cost: 80, innovation: 75 },
      comment: '',
      isSubmitted: false
    }
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
    archLayers: [
      { name: '安全层', desc: '后量子密钥协商、数据加解密、通信安全封装', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发、帧格式处理', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗嵌入式平台、无线模块', highlight: false }
    ],
    flow: ['加载后量子参数', 'Kyber 安全密钥协商', '共享密钥加密通信', '接收解密与密钥清除'],
    algorithms: [
      { label: '密钥交换算法', name: 'CRYSTALS-Kyber', desc: '基于格基(Lattice)难题的轻量级后量子加密算法，不依赖传统ECC/RSA，抗量子攻击且运算速度快。' },
      { label: '实时通信加密', name: '对称加密体制', desc: '使用 Kyber 算法安全协商生成的会话密钥对通信数据进行实时加解密，保障协议兼容性与高机密性。' }
    ],
    review: {
      scores: { security: 98, integrity: 90, usability: 60, cost: 50, innovation: 95 },
      comment: '',
      isSubmitted: false
    }
  }
]);

// 状态管理
const currentGroupId = ref(1);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));

// 分组切换逻辑
const prevGroup = () => {
  if (currentGroupId.value > 1) currentGroupId.value--;
};
const nextGroup = () => {
  if (currentGroupId.value < 4) currentGroupId.value++;
};

// 计算综合得分
const calculateTotalScore = (group) => {
  if (!group || !group.review) return 0;
  const s = group.review.scores;
  return Math.round((s.security + s.integrity + s.usability + s.cost + s.innovation) / 5);
};

// 提交评审
const submitReview = () => {
  if (currentGroup.value.review.isSubmitted) return;
  // 模拟提交网络请求
  setTimeout(() => {
    currentGroup.value.review.isSubmitted = true;
    alert(`已成功录入 ${currentGroup.value.name} 的综合评审结果！`);
  }, 300);
};

onMounted(() => {
  // 从路由参数读取初始组信息
  if (route.query.groupId) {
    const id = parseInt(route.query.groupId);
    if (id >= 1 && id <= 4) currentGroupId.value = id;
  }
});
</script>

<style scoped>
/* 继承并微调颜色 */
.bg-darkBg { background-color: #121417; }
.bg-panelBg { background-color: #1c2126; }
.bg-cardInnerBg { background-color: #232930; }
.border-borderColor { border-color: #2d353e; }
.text-textMain { color: #d1d5db; }
.text-textMuted { color: #6b7280; }

/* 入场动画 */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

/* 自定义 Range 滑块样式，使其带有科技感 */
.custom-range {
  -webkit-appearance: none;
  height: 6px;
  background: #2d353e;
  border-radius: 4px;
  outline: none;
}
.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--range-color);
  cursor: pointer;
  box-shadow: 0 0 10px var(--range-color);
  transition: transform 0.1s;
}
.custom-range::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
.custom-range:disabled::-webkit-slider-thumb {
  background: #6b7280;
  box-shadow: none;
  cursor: not-allowed;
}
</style>
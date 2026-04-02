<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <div v-if="showToast" class="fixed top-24 left-1/2 transform -translate-x-1/2 z-[80] bg-[#1f2937] border border-accentGreen text-accentGreen px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-3 transition-all duration-300">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span class="font-bold text-lg">{{ toastMsg }}</span>
    </div>

    <div v-if="isLoading" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div class="bg-panelBg border border-borderColor rounded-lg p-6 flex flex-col items-center gap-4 shadow-lg">
        <div class="w-12 h-12 border-4 border-accentGreen border-t-transparent rounded-full animate-spin"></div>
        <div class="text-center">
          <div class="text-lg font-bold text-white mb-2">评分完成√</div>
          <div class="text-sm text-textMuted">正在进入总结页面...</div>
        </div>
      </div>
    </div>
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

          <button @click="generateReview" :disabled="isGenerating" class="text-accentCyan hover:text-white transition-all transform hover:rotate-180 duration-500 disabled:opacity-50 disabled:cursor-not-allowed ml-4" title="一键自动评估">
            <svg class="w-5 h-5 drop-shadow-[0_0_5px_rgba(0,240,255,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="backToWorkspace"
          class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          返回方案AI评估页
        </button>
        <button 
          @click="completeEvaluation"
          class="bg-accentGreen border border-accentGreen hover:bg-accentGreen/80 text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
        >
          完成评估
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>

    <main class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden" v-if="showContent">
      
      <div class="col-span-3 flex flex-col gap-3" :class="{ 'opacity-0 transform scale-95': showAnimation }" :style="{ transition: 'all 0.3s ease' }">
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

      <div class="col-span-5 flex flex-col gap-3" :class="{ 'opacity-0 transform scale-95': showAnimation }" :style="{ transition: 'all 0.3s ease' }">
        <div class="bg-panelBg border border-borderColor rounded-lg p-5 flex flex-col shadow-lg animate-fade-in-up h-full" :style="{ animationDelay: '0.25s' }">
          <div class="text-base font-black text-white mb-5 flex items-center gap-2 shrink-0">
            <div class="w-2.5 h-2.5 rounded-full transition-colors duration-500 shadow-sm" :style="{ backgroundColor: currentGroup.themeColor, boxShadow: `0 0 8px ${currentGroup.themeColor}80` }"></div>
            系统架构与数据流转参考
          </div>

          <div class="flex-1 flex flex-col justify-between mb-6 px-1 relative min-h-[240px]">
            
            <div class="absolute top-6 bottom-6 left-[56px] w-px bg-gray-600 z-0 opacity-50"></div>

            <div v-for="(layer, index) in currentGroup.archLayers" :key="index" 
                 class="relative group rounded-xl p-3 flex items-center gap-4 transition-all duration-300 border"
                 :class="layer.highlight ? 'bg-[#1f2937] shadow-md z-10 scale-[1.02]' : 'bg-cardInnerBg/40 hover:bg-cardInnerBg z-0'" 
                 :style="{ borderColor: layer.highlight ? currentGroup.themeColor : '#374151' }">
              
              <div class="shrink-0 w-20 py-1.5 flex justify-center items-center rounded bg-darkBg border transition-colors duration-500 relative z-10"
                   :style="{ borderColor: layer.highlight ? currentGroup.themeColor + '80' : '#2d353e' }">
                <span class="text-xs font-black transition-colors duration-500" :style="{ color: layer.highlight ? currentGroup.themeColor : '#9ca3af' }">
                  {{ layer.name }}
                </span>
              </div>

              <div class="flex-1 text-xs font-medium leading-relaxed transition-colors duration-500 relative z-10"
                   :class="layer.highlight ? 'text-gray-200' : 'text-textMuted'">
                {{ layer.desc }}
              </div>

              <div v-if="layer.highlight" class="absolute right-0 top-0 bottom-0 w-1.5 rounded-r-xl opacity-80 z-10" 
                   :style="{ backgroundColor: currentGroup.themeColor }"></div>
            </div>
          </div>

          <div class="shrink-0 bg-darkBg rounded-xl p-4 border border-borderColor relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 blur-3xl opacity-10 transition-colors duration-500" 
                 :style="{ backgroundColor: currentGroup.themeColor }"></div>

            <div class="text-[11px] font-black text-textMuted mb-3 uppercase tracking-widest flex justify-between items-center relative z-10">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Security Flow / 时序节点
              </span>
              <span class="text-[#3b82f6] hover:text-blue-400 hover:underline cursor-pointer transition-colors flex items-center gap-1">
                查看详细UML图
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-y-2.5 relative z-10">
              <template v-for="(step, index) in currentGroup.flow" :key="index">
                <div class="text-xs font-bold font-mono transition-colors duration-500 bg-cardInnerBg px-2 py-1 rounded border border-gray-700/50 shadow-sm" 
                     :style="{ color: currentGroup.themeColor }">
                  {{ step }}
                </div>
                <svg v-if="index < currentGroup.flow.length - 1" class="w-4 h-4 mx-1.5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-3" :class="{ 'opacity-0 transform scale-95': showAnimation }" :style="{ transition: 'all 0.3s ease' }">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" :style="{ animationDelay: '0.3s', borderTopWidth: '4px', borderTopColor: currentGroup.themeColor }">
          
          <div class="px-4 pt-3 pb-3 shrink-0 relative z-20 flex justify-between items-center border-b border-borderColor bg-cardInnerBg">
            <div class="text-base font-black flex items-center gap-2 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              教师综合打分与评价
            </div>
            <div>
              <span v-if="currentGroup.review.isSubmitted" class="text-xs px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-800/50">已完成评估</span>
              <span v-else class="text-xs px-2 py-1 rounded bg-yellow-900/30 text-yellow-400 border border-yellow-800/50">待评估打分</span>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col p-4 gap-4">
            
            <div class="flex justify-between items-end pb-3 border-b border-gray-700/50">
              <span class="text-sm font-medium text-textMuted">系统计算综合得分</span>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black transition-colors duration-500" :style="{ color: currentGroup.themeColor, textShadow: `0 0 15px ${currentGroup.themeColor}60` }">
                  {{ calculateTotalScore(currentGroup) }}
                </span>
                <span class="text-lg text-gray-500 font-bold">/100</span>
              </div>
            </div>

            <div class="bg-darkBg rounded-lg border border-borderColor p-3 space-y-3">
              <div v-for="dim in dimensions" :key="dim.key" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-300 w-18">{{ dim.label }}</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  v-model.number="currentGroup.review.scores[dim.key]" 
                  class="flex-1 mx-3 custom-range" 
                  :style="{ '--range-color': currentGroup.themeColor }"
                  :disabled="currentGroup.review.isSubmitted"
                >
                <span class="text-base font-mono font-bold w-8 text-right" :style="{ color: currentGroup.themeColor }">
                  {{ currentGroup.review.scores[dim.key] }}
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-sm font-bold text-gray-300 flex justify-between">
                <span>评审指导意见</span>
                <span class="text-xs font-normal text-gray-500">支持 Markdown</span>
              </label>
              <textarea 
                v-model="currentGroup.review.comment" 
                :disabled="currentGroup.review.isSubmitted"
                class="w-full flex-1 min-h-[90px] bg-[#1a1d24] border border-gray-700 rounded-lg p-3 text-sm text-gray-200 focus:outline-none transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed" 
                :style="{ focusBorderColor: currentGroup.themeColor }"
                placeholder="请输入对该方案架构的优缺点评价、后续迭代建议等内容..."
              ></textarea>
            </div>

            <button 
              @click="submitReview" 
              :disabled="currentGroup.review.isSubmitted"
              class="w-full py-2.5 rounded-lg text-white font-bold text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mt-auto shrink-0"
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
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 提示弹窗控制
const toastMsg = ref('');
const showToast = ref(false);

const showToastMessage = (msg, duration = 1500) => {
  toastMsg.value = msg;
  showToast.value = true;
  return new Promise(resolve => {
    setTimeout(() => {
      showToast.value = false;
      resolve();
    }, duration);
  });
};

// 返回方案AI评估页
const backToWorkspace = () => {
  router.push('/teacher/ai-evaluate');
};

// 修复：仅保留 4 个打分维度，彻底移除 cost
const dimensions = [
  { key: 'security', label: '安全保密性' },
  { key: 'integrity', label: '数据完整性' },
  { key: 'usability', label: '系统可用性' },
  { key: 'innovation', label: '方案创新性' }
];

// 初始化带有 review 数据的 groups (彻底移除了内部所有的 cost 初始值)
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
    review: {
      scores: { security: 0, integrity: 0, usability: 0, innovation: 0 },
      comment: '',
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
      scores: { security: 0, integrity: 0, usability: 0, innovation: 0 },
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
      scores: { security: 0, integrity: 0, usability: 0, innovation: 0 },
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
      scores: { security: 0, integrity: 0, innovation: 0 },
      comment: '',
      isSubmitted: false
    }
  }
]);

// 状态管理
const currentGroupId = ref(1);
const isGenerating = ref(false);
const showContent = ref(false);
const showAnimation = ref(false);
const isLoading = ref(false);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));

// 检查是否所有组都已完成评估
const allReviewsSubmitted = computed(() => {
  return groups.every(group => group.review.isSubmitted);
});

// 分组切换逻辑
const prevGroup = () => {
  showAnimation.value = true;
  setTimeout(() => {
    currentGroupId.value = currentGroupId.value > 1 ? currentGroupId.value - 1 : 4;
    showAnimation.value = false;
  }, 300);
};
const nextGroup = () => {
  showAnimation.value = true;
  setTimeout(() => {
    currentGroupId.value = currentGroupId.value < 4 ? currentGroupId.value + 1 : 1;
    showAnimation.value = false;
  }, 300);
};

// 修复：计算综合得分分母修改为 4
const calculateTotalScore = (group) => {
  if (!group || !group.review) return 0;
  const s = group.review.scores;
  return Math.round((s.security + s.integrity + s.usability + s.innovation) / 4);
};

// 缓动函数
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// 重构：自动一键执行全体打分
const generateReview = async () => {
  if (isGenerating.value) return;
  isGenerating.value = true;

  const allGroups = [1, 2, 3, 4];

  for (let targetId of allGroups) {
    const group = groups.find(g => g.id === targetId);

    // 切换到目标组
    if (currentGroupId.value !== targetId) {
      showAnimation.value = true;
      await new Promise(r => setTimeout(r, 300));
      currentGroupId.value = targetId;
      showAnimation.value = false;
      await new Promise(r => setTimeout(r, 500)); // 等待UI就绪
    }

    if (!group.review.isSubmitted) {
      // 1. 初始化分数为0 (彻底去除cost)
      group.review.scores = { security: 0, integrity: 0, usability: 0, innovation: 0 };

      // 2. 预设目标分
      const targetScores = {
        1: { security: 90, integrity: 85, usability: 80, innovation: 85 },
        2: { security: 85, integrity: 90, usability: 75, innovation: 90 },
        3: { security: 80, integrity: 75, usability: 90, innovation: 80 },
        4: { security: 95, integrity: 90, usability: 70, innovation: 95 }
      }[targetId] || { security: 80, integrity: 80, usability: 80, innovation: 80 };

      // 3. 执行拉条动画
      await new Promise((resolve) => {
        const duration = 800; // 单个拉条拖动时间
        const delayBetween = 200; // 拉条间延迟
        const keys = ['security', 'integrity', 'usability', 'innovation'];
        const initialScores = { ...group.review.scores };
        let currentIndex = 0;

        const animateNext = () => {
          if (currentIndex >= keys.length) {
            resolve();
            return;
          }

          const key = keys[currentIndex];
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutQuad(progress);

            group.review.scores[key] = Math.round(initialScores[key] + (targetScores[key] - initialScores[key]) * easedProgress);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              currentIndex++;
              setTimeout(animateNext, delayBetween);
            }
          };

          animate();
        };

        animateNext();
      });

      // 4. 逐字生成评语
      const reviewComments = {
        1: '该方案在低功耗限制下做出了很好的权衡。PRESENT算法的硬件实现资源极小，非常符合要求。建议后续关注硬件随机数生成器的实现细节，以提高系统安全性。',
        2: '侧信道防护措施设计全面，掩码机制和恒定时间实现能够有效抵御DPA攻击。防护措施可能会增加系统复杂度和功耗，需要在安全性和性能之间找到平衡。',
        3: '抗重放攻击机制设计合理，滑动窗口计数器能够有效防止指令劫持。需要确保计数器同步机制的可靠性，避免因同步失败导致的通信问题。',
        4: '采用后量子算法，具有前瞻性，能够抵御未来量子计算的威胁。后量子算法的计算复杂度较高，可能会对系统性能产生影响，建议在硬件平台上进行优化以提升性能。'
      };

      const comment = reviewComments[targetId] || '该方案整体设计合理，建议在实际部署中进一步验证安全性。';
      group.review.comment = '';

      await new Promise((resolve) => {
        let index = 0;
        const typingInterval = setInterval(() => {
          if (index < comment.length) {
            group.review.comment += comment.charAt(index);
            index++;
          } else {
            clearInterval(typingInterval);
            resolve();
          }
        }, 30);
      });

      // 5. 提交并弹窗提示
      group.review.isSubmitted = true;
      const finalScore = calculateTotalScore(group);
      await showToastMessage(`给第${targetId}组评${finalScore}分成功`, 1500);
    }
  }

  // 所有循环结束，推送后端状态更新
  try {
    console.log('教师全部评估结束，发送状态至后端');
    await fetch('/api/state/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "teacher_scored_group": 1 })
    });
  } catch (error) {
    console.error('推送状态至后端失败:', error);
  }

  isGenerating.value = false;
};

// 手动单次提交评审
const submitReview = async () => {
  if (currentGroup.value.review.isSubmitted) return;
  currentGroup.value.review.isSubmitted = true;

  const finalScore = calculateTotalScore(currentGroup.value);
  await showToastMessage(`给第${currentGroupId.value}组评${finalScore}分成功`, 1500);
  
  // 检查是否全部评估完成，是则推送状态，否则自动切下一组
  if (allReviewsSubmitted.value) {
    try {
      await fetch('/api/state/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "teacher_scored_group": 1 })
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    // 自动跳转到下一个未评价的组
    const nextUnsubmitted = groups.find(g => !g.review.isSubmitted);
    if (nextUnsubmitted) {
      showAnimation.value = true;
      setTimeout(() => {
        currentGroupId.value = nextUnsubmitted.id;
        showAnimation.value = false;
      }, 500);
    }
  }
};

// 完成所有评估并跳转
const completeEvaluation = () => {
  if (!allReviewsSubmitted.value) return; // 需要防误触拦截
  isLoading.value = true;
  
  setTimeout(() => {
    router.push('/teacher/group-score-overview');
  }, 1500);
};

onMounted(() => {
  if (route.query.groupId) {
    const id = parseInt(route.query.groupId);
    if (id >= 1 && id <= 4) currentGroupId.value = id;
  }
  
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});

onBeforeUnmount(() => {
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
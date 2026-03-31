<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <transition name="toast">
      <div 
        v-if="showToast" 
        class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-accentGreen text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2 pointer-events-none"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-bold">需求确认完毕！已成功提交至教师端进行下一步推演。</span>
      </div>
    </transition>

    <header class="shrink-0 h-16 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-group1 rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">学习工作台 - 任务接收与需求提交</h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 bg-group1/10 border border-group1/30 px-4 py-1.5 rounded-full">
          <svg class="w-4 h-4 text-group1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="text-group1 font-bold text-sm">{{ groupInfo.name }}</span>
        </div>
        
        <span 
          :class="[
            'text-xs px-3 py-1.5 rounded border font-bold flex items-center gap-1.5 transition-all duration-500',
            isSubmitted ? 'bg-accentGreen/20 text-accentGreen border-accentGreen/50' : 'bg-warningYellow/20 text-warningYellow border-warningYellow/50'
          ]"
        >
          <span v-if="!isSubmitted" class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-warningYellow opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-warningYellow"></span>
          </span>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ isSubmitted ? '已提交完成' : '等待需求确认' }}
        </span>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-darkBg">
      <section class="bg-panelBg border border-borderColor rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div class="px-5 py-3 border-b border-borderColor bg-cardInnerBg flex justify-between items-center">
          <h2 class="font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            教师下发任务指令
          </h2>
          <span class="text-xs text-textMuted">接收时间：刚刚</span>
        </div>
        <div class="p-5 flex flex-col gap-4">
          <div class="bg-darkBg border border-borderColor p-4 rounded-lg flex items-center justify-between border-l-4 border-l-group1">
            <div>
              <div class="text-xs text-textMuted mb-1">本次演练主线任务</div>
              <div class="text-xl font-bold text-white tracking-wide">{{ taskInfo.title }}</div>
            </div>
            <div class="bg-group1/10 text-group1 px-3 py-1 rounded text-sm font-bold border border-group1/30">
              密级要求：{{ taskInfo.securityLevel }}
            </div>
          </div>
          
          <div class="grid grid-cols-4 gap-4">
            <div v-for="metric in taskInfo.metrics" :key="metric.title" class="bg-cardInnerBg p-3 rounded border border-borderColor flex flex-col gap-2 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-8 h-8 bg-accentGreen/10 rounded-bl-full"></div>
              <div class="text-accentGreen font-bold text-sm flex items-center gap-1">
                <component :is="metric.icon" class="w-4 h-4" /> {{ metric.title }}
              </div>
              <div class="text-xs text-textMuted">{{ metric.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <div class="flex-1 grid grid-cols-3 gap-6">
        <section class="col-span-2 bg-panelBg border border-borderColor rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div class="px-5 py-3 border-b border-borderColor bg-cardInnerBg">
            <h2 class="font-bold text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-group1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              本组需求响应单填写
            </h2>
          </div>
          <div class="p-5 flex flex-col gap-5 flex-1">
            <div>
              <label class="block text-sm font-bold text-textMain mb-2">主线方案设计方向 <span class="text-xs text-textMuted font-normal ml-2">(系统已锁定)</span></label>
              <div class="fake-textarea w-full rounded-md p-3 text-sm flex items-start gap-2 bg-darkBg opacity-80 cursor-not-allowed">
                <svg class="w-4 h-4 text-gray-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                {{ taskInfo.mainDirection }}
              </div>
            </div>

            <div class="flex-1 flex flex-col">
              <label class="block text-sm font-bold text-textMain mb-2">支线需求与侧重指标响应 <span class="text-xs text-textMuted font-normal ml-2">(请录入本组的性能侧重设计)</span></label>
              <textarea 
                v-model="submitData.branchContent"
                class="fake-textarea w-full flex-1 rounded-md p-3 text-sm resize-none leading-relaxed focus:ring-2 focus:ring-group1/20"
                :readonly="isSubmitted"
              ></textarea>
            </div>
          </div>
        </section>

        <section class="col-span-1 bg-panelBg border border-borderColor rounded-lg shadow-lg flex flex-col overflow-hidden relative">
          <div class="px-5 py-3 border-b border-borderColor bg-cardInnerBg">
            <h2 class="font-bold text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              提交流程
            </h2>
          </div>
          
          <div class="p-5 flex flex-col justify-between flex-1">
            <div class="bg-darkBg border border-borderColor rounded-lg p-4 mb-6">
              <h3 class="text-sm font-bold text-textMain mb-3 border-b border-borderColor/50 pb-2">本组提交清单校验</h3>
              <ul class="space-y-3 text-sm text-textMuted">
                <li v-for="check in checklist" :key="check.label" class="flex items-center gap-2" :class="check.valid ? 'text-accentGreen' : 'text-textMuted'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="check.valid" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span>{{ check.label }}</span>
                </li>
              </ul>
            </div>

            <div class="flex flex-col gap-4 mt-auto">
              <div 
                :class="[
                  'text-center text-sm font-bold transition-all',
                  isLoading ? 'text-group1 animate-pulse' : (isSubmitted ? 'text-accentGreen' : 'text-warningYellow')
                ]"
              >
                {{ statusText }}
              </div>
              
              <button 
                @click="handleSubmit" 
                :disabled="isSubmitted || isLoading"
                class="w-full bg-group1 hover:bg-blue-600 disabled:bg-gray-600 text-white font-bold text-lg py-4 rounded-lg shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <template v-if="isLoading">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  加密传输中...
                </template>
                <span v-else>{{ isSubmitted ? '需求已送达' : '确认提交需求' }}</span>
              </button>
            </div>
          </div>
          
          <transition name="fade">
            <div v-if="isSubmitted" class="absolute inset-0 top-[49px] bg-panelBg/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div class="w-20 h-20 bg-accentGreen/20 rounded-full flex items-center justify-center mb-4 border-4 border-accentGreen">
                <svg class="w-10 h-10 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div class="text-2xl font-bold text-accentGreen mb-2">提交成功</div>
              <div class="text-sm text-textMuted text-center px-6">
                本组的需求确认单已同步至教师端。<br>请等待教师开启“方案设计”阶段...
              </div>
            </div>
          </transition>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineComponent } from 'vue';

// 图标组件（在实际项目中建议使用 Lucide 或 Heroicons）
const LockIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>' };
const ShieldIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' };
const BoltIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' };
const ChipIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>' };

// 状态管理
const isLoading = ref(false);
const isSubmitted = ref(false);
const showToast = ref(false);

const groupInfo = reactive({
  name: '第一组 (系统架构师)',
  id: 'G1'
});

const taskInfo = reactive({
  title: '无人机集群通信加密架构设计',
  securityLevel: '高',
  mainDirection: '基于国密标准（SM2/SM3/SM4）的无人机集群通信安全防护架构，实现端到端的指令加密与身份认证。',
  metrics: [
    { title: '高保密性', desc: '要求架构具备极强的抗窃听能力，推荐对称/非对称结合。', icon: LockIcon },
    { title: '高完整性', desc: '确保指令在传输过程中防篡改，需加入哈希或签名机制。', icon: ShieldIcon },
    { title: '高可用性', desc: '无人机高速移动，加密握手时延需控制在毫秒级以内。', icon: BoltIcon },
    { title: '功耗与成本', desc: '受限于无人机电池容量，加密算法带来的额外功耗越低越好。', icon: ChipIcon },
  ]
});

const submitData = reactive({
  branchContent: `本组（第一组）针对教师下发的需求，确定以下设计支线：
1. 核心加密：采用 SM4 对称加密算法保障视频流与飞控指令的绝对保密性。
2. 完整性校验：利用 SM3 密码杂凑算法，防止攻击者篡改飞行坐标。
3. 性能折中考量：为解决国密算法可能带来的计算时延，计划在仿真验证阶段引入轻量级的轮转密钥分发机制，预期将端到端时延控制在 50ms 以内，加密成功率保障在 99% 以上。`
});

const checklist = computed(() => [
  { label: `小组归属：${groupInfo.name} (已校验)`, valid: true },
  { label: '主线任务：已确认接收', valid: true },
  { label: `支线指标：字数达标 (${submitData.branchContent.length}字)`, valid: submitData.branchContent.length > 50 },
]);

const statusText = computed(() => {
  if (isLoading.value) return '正在与教师控制台进行握手...';
  if (isSubmitted.value) return '需求已同步至教师端';
  return '请确认无误后提交至教师控制台';
});

// 提交逻辑
const handleSubmit = () => {
  isLoading.value = true;
  
  // 模拟 API 请求延迟
  setTimeout(() => {
    isLoading.value = false;
    isSubmitted.value = true;
    showToast.value = true;
    
    // 3秒后关闭 Toast
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }, 1200);
};
</script>

<style scoped>
/* 继承并微调你的 CSS 变量和动画 */
.darkBg { background-color: #121417; }
.panelBg { background-color: #1c2126; }
.cardInnerBg { background-color: #232930; }
.borderColor { border-color: #2d353e; }
.accentGreen { color: #23b586; }
.group1 { color: #3b82f6; }

/* 伪输入框样式 */
.fake-textarea {
  background-color: rgba(35, 41, 48, 0.5);
  border: 1px solid #2d353e;
  color: #d1d5db;
  transition: all 0.3s ease;
}
.fake-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  background-color: rgba(35, 41, 48, 0.8);
}

/* Vue 动画 */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.toast-leave-active {
  transition: all 0.3s ease-in;
}
.toast-enter-from {
  transform: translate(-50%, -20px);
  opacity: 0;
}
.toast-leave-to {
  transform: translate(-50%, -20px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 滚动条 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #2d353e; border-radius: 3px; }
</style>
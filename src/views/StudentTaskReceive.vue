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
        <span class="font-bold">需求确认完毕！已成功通过 AI需求分类工具 提交至教师端进行初评。</span>
      </div>
    </transition>

    <header class="shrink-0 h-16 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-group1 rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">学生工作台 - 需求提交</h1>
      </div>
      <div class="flex items-center gap-4">
        
        <div class="relative" @click.stop="toggleDropdown">
          <div class="flex items-center gap-2 bg-group1/10 border border-group1/30 px-4 py-1.5 rounded-full cursor-pointer hover:bg-group1/20 transition-colors">
            <svg class="w-4 h-4 text-group1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-group1 font-bold text-sm">{{ currentGroup.name }}</span>
            <svg class="w-4 h-4 text-group1 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <transition name="fade">
            <div v-if="showDropdown" class="absolute top-full right-0 mt-2 w-56 bg-cardInnerBg border border-borderColor rounded-md shadow-xl z-50 overflow-hidden">
              <div 
                v-for="(group, index) in groupsData" 
                :key="group.id"
                @click="switchGroup(index)"
                class="px-4 py-3 text-sm text-textMain hover:bg-group1/20 hover:text-white cursor-pointer transition-colors border-b border-borderColor/50 last:border-0 flex items-center justify-between"
                :class="{'bg-group1/10 text-white font-bold': currentGroupIndex === index}"
              >
                <span>{{ group.name }}</span>
                <svg v-if="currentGroupIndex === index" class="w-4 h-4 text-group1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </transition>
        </div>
        
        <span 
          :class="[
            'text-xs px-3 py-1.5 rounded border font-bold flex items-center gap-1.5 transition-all duration-500',
            currentGroup.isSubmitted ? 'bg-accentGreen/20 text-accentGreen border-accentGreen/50' : 'bg-warningYellow/20 text-warningYellow border-warningYellow/50'
          ]"
        >
          <span v-if="!currentGroup.isSubmitted" class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-warningYellow opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-warningYellow"></span>
          </span>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ currentGroup.isSubmitted ? '需求已分类提交' : 'AI需求分类待确认' }}
        </span>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-darkBg" @click="showDropdown = false">
      <section class="bg-panelBg border border-borderColor rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div class="px-5 py-3 border-b border-borderColor bg-cardInnerBg flex justify-between items-center">
          <h2 class="font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            教师下发任务
          </h2>
          <span class="text-xs text-textMuted text-group1 bg-group1/10 px-2 py-1 rounded">来源：AI任务推送工具</span>
        </div>
        <div class="p-5 flex flex-col gap-4">
          <div class="bg-darkBg border border-borderColor p-4 rounded-lg flex items-center justify-between border-l-4 border-l-group1">
            <div>
              <div class="text-xs text-textMuted mb-1">演练主线任务（必做）</div>
              <div class="text-xl font-bold text-white tracking-wide">{{ taskInfo.title }}</div>
            </div>
            <div class="bg-group1/10 text-group1 px-3 py-1 rounded text-sm font-bold border border-group1/30">
              目标对象：无人机通信链路
            </div>
          </div>
          
          <div class="grid grid-cols-4 gap-4">
            <div v-for="metric in taskInfo.metrics" :key="metric.title" class="bg-cardInnerBg p-3 rounded border border-borderColor flex flex-col gap-2 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-8 h-8 bg-accentGreen/10 rounded-bl-full"></div>
              <div class="text-accentGreen font-bold text-sm flex items-center gap-1">
                <component :is="metric.icon" class="w-4 h-4" /> {{ metric.title }}
              </div>
              <div class="text-xs text-textMuted leading-relaxed">{{ metric.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <div class="flex-1 grid grid-cols-3 gap-6">
        <section class="col-span-2 bg-panelBg border border-borderColor rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div class="px-5 py-3 border-b border-borderColor bg-cardInnerBg flex justify-between items-center">
            <h2 class="font-bold text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-group1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              本组需求响应单填写
            </h2>
            <span class="text-xs text-textMuted">建议与AI多模态交互辅助完成</span>
          </div>
          <div class="p-5 flex flex-col gap-5 flex-1">
            <div>
              <label class="block text-sm font-bold text-textMain mb-2">主线方案设计方向 </label>
              <div class="fake-textarea w-full rounded-md p-3 text-sm flex items-start gap-2 bg-darkBg opacity-80 cursor-not-allowed">
                <svg class="w-4 h-4 text-gray-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                主线任务：基于无人机通信场景，完成密码系统的一般流程设计（需求分析→方案设计→工程实现→综合评价→优化完善）。
              </div>
            </div>

            <div class="flex-1 flex flex-col">
              <label class="block text-sm font-bold text-textMain mb-2">
                选定支线任务：<span class="text-accentGreen">{{ currentGroup.branchTitle }}</span>
                <span class="text-xs text-textMuted font-normal ml-2">(请录入本组的具体需求与初步选型)</span>
              </label>
              <textarea 
                v-model="currentGroup.branchContent"
                class="fake-textarea w-full flex-1 rounded-md p-3 text-sm resize-none leading-relaxed focus:ring-2 focus:ring-group1/20"
                :readonly="currentGroup.isSubmitted"
                placeholder="在此输入本组需求分析结果（理论型梳理要点，实践型补充细节）..."
              ></textarea>
            </div>
          </div>
        </section>

        <section class="col-span-1 bg-panelBg border border-borderColor rounded-lg shadow-lg flex flex-col overflow-hidden relative">
          <div class="px-5 py-3 border-b border-borderColor bg-cardInnerBg">
            <h2 class="font-bold text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              提交与 AI 分类处理
            </h2>
          </div>
          
          <div class="p-5 flex flex-col justify-between flex-1">
            <div class="bg-darkBg border border-borderColor rounded-lg p-4 mb-6">
              <h3 class="text-sm font-bold text-textMain mb-3 border-b border-borderColor/50 pb-2">提交前检查事项</h3>
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
                  currentGroup.isLoading ? 'text-group1 animate-pulse' : (currentGroup.isSubmitted ? 'text-accentGreen' : 'text-warningYellow')
                ]"
              >
                {{ statusText }}
              </div>
              
              <button 
                @click="handleSubmit" 
                :disabled="currentGroup.isSubmitted || currentGroup.isLoading"
                class="w-full bg-group1 hover:bg-blue-600 disabled:bg-gray-600 text-white font-bold py-4 rounded-lg shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <template v-if="currentGroup.isLoading">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  调用 AI 需求分类工具中...
                </template>
                <span v-else>{{ currentGroup.isSubmitted ? '需求分类已生成' : '呼叫 AI助教：提交并分类' }}</span>
              </button>
            </div>
          </div>
          
          <transition name="fade">
            <div v-if="currentGroup.isSubmitted" class="absolute inset-0 top-[49px] bg-panelBg/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div class="w-20 h-20 bg-accentGreen/20 rounded-full flex items-center justify-center mb-4 border-4 border-accentGreen">
                <svg class="w-10 h-10 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div class="text-xl font-bold text-accentGreen mb-2">AI分类图表已生成</div>
              <div class="text-sm text-textMuted text-center px-6 leading-relaxed">
                需求已通过 <strong>AI需求分类工具</strong> 备案，并同步至教师端。<br>
                资料已通过 <strong>AI资料推送工具</strong> 发送，<br>
                请准备进入“方案设计”阶段...
              </div>
            </div>
          </transition>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// 图标组件
const LockIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>' };
const ShieldIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' };
const BoltIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' };
const ChipIcon = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>' };

// 下拉菜单控制
const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const closeDropdown = () => { showDropdown.value = false; };
onMounted(() => { document.addEventListener('click', closeDropdown); });
onUnmounted(() => { document.removeEventListener('click', closeDropdown); });

// 状态管理
const showToast = ref(false);

// 核心指标数据 (适配录课脚本中 AI资料推送的约束)
const taskInfo = reactive({
  title: '无人机通信加密设计',
  metrics: [
    { title: '机密性与完整性', desc: '避免非法设备接入和数据篡改，支持多种数据类型指令加密。', icon: LockIcon },
    { title: '防重放防侧信道', desc: '规避无人机易遭受侧信道攻击、重放攻击的系统级隐患。', icon: ShieldIcon },
    { title: '时延敏感与可用性', desc: '无人机高速移动，通信加密时延需严格控制以防偏离航线。', icon: BoltIcon },
    { title: '算力与功耗限制', desc: '机载设备功耗有限，加密算法需兼顾算力消耗与低功耗需求。', icon: ChipIcon },
  ]
});

// 四组预设数据 (完全按照逐字录课脚本的剧情设计)
const groupsData = reactive([
  {
    id: 'G1',
    name: '组1 (主线 + 低功耗优化)',
    branchTitle: '低功耗优化',
    branchContent: '通过AI资料推送工具查阅，结合本组分析，需求与设计如下：\n1. 核心约束：密码系统需满足机密性、完整性、可用性；考虑到无人机算力有限且时延敏感，机载设备功耗不能太高是首要约束。\n2. 方案初设：对比多种轻量级算法，主线通信拟采用 PRESENT 算法，因其功耗低、算力需求小。\n3. 支线策略：在工程验证阶段，进一步简化密钥更新流程，重点满足“密钥更新低功耗需求”。',
    isLoading: false,
    isSubmitted: false
  },
  {
    id: 'G2',
    name: '组2 (主线 + 侧信道防护)',
    branchTitle: '侧信道防护',
    branchContent: '结合 AI 工具推送资料与本组讨论，需求与设计如下：\n1. 核心约束：无人机极易遭受侧信道攻击与重放攻击，且通信加密时延不能太长，以免影响飞控指令。\n2. 方案初设：主线采用安全性更高的 SM4 加密算法进行数据链路加密。\n3. 支线策略：配合主线加密，设计并引入轻量级掩码防护技术，以实现侧信道防护。后续我们将绘制对应掩码模块原理图确保工程可行。',
    isLoading: false,
    isSubmitted: false
  },
  {
    id: 'G3',
    name: '组3 (主线 + 抗重放攻击)',
    branchTitle: '抗重放攻击',
    branchContent: '依据 AI 资料检索与补充，本组梳理的需求与初步方案如下：\n1. 核心约束：重点强化身份认证，坚决避免非法设备接入；加密算法不能过于复杂，必须适配无人机算力基线。\n2. 方案初设：主线拟采用 SM4 加密保障指令机密性，兼顾安全性与实现复杂度。\n3. 支线策略：结合随机数生成器与序列号(Sequence Number)机制，建立抗重放攻击机制，后续需优化随机数安全性设计。',
    isLoading: false,
    isSubmitted: false
  },
  {
    id: 'G4',
    name: '组4 (主线 + 后量子算法适配)',
    branchTitle: '后量子算法适配',
    branchContent: '参考 AI 工具推送的后量子技术参数，本组确立如下需求清单与方向：\n1. 核心约束：系统必须能够支持指令和数据传输等多种数据类型的加密；全面梳理算法适配的算力及兼容性指标。\n2. 方案初设：前瞻性地将后量子加密算法用于主线通信加密的尝试，适配未来的算力演进。\n3. 支线策略：突破点在于通过简化后量子算法的适配流程来大幅降低当前无人机的算力消耗，以达时延标准。',
    isLoading: false,
    isSubmitted: false
  }
]);

const currentGroupIndex = ref(0);
const currentGroup = computed(() => groupsData[currentGroupIndex.value]);

// 切换小组
const switchGroup = (index) => {
  currentGroupIndex.value = index;
  showDropdown.value = false;
};

// 动态校验清单
const checklist = computed(() => [
  { label: `当前操作身份：组织型 (协助 ${currentGroup.value.name.split(' ')[0]} 整理)`, valid: true },
  { label: '主线任务：明确安全目标，防范劫持', valid: true },
  { label: `支线需求描述：已补充细化 (${currentGroup.value.branchContent.length} 字)`, valid: currentGroup.value.branchContent.length > 50 },
]);

const statusText = computed(() => {
  if (currentGroup.value.isLoading) return '正在呼叫 AI助教...生成需求分类可视化图表';
  if (currentGroup.value.isSubmitted) return '需求清单已提交给 AI需求分类工具备案';
  return '组织型同学请核对清单后向 AI助教 提交';
});

// 模拟提交给 AI 助手
const handleSubmit = () => {
  currentGroup.value.isLoading = true;
  
  // 模拟 API / AI 处理延迟
  setTimeout(() => {
    currentGroup.value.isLoading = false;
    currentGroup.value.isSubmitted = true;
    showToast.value = true;
    
    // 3秒后关闭 Toast
    setTimeout(() => {
      showToast.value = false;
    }, 3500);
  }, 1500);
};
</script>

<style scoped>
/* 继承并微调你的 CSS 变量和动画 */
.bg-darkBg { background-color: #121417; }
.bg-panelBg { background-color: #1c2126; }
.bg-cardInnerBg { background-color: #232930; }
.border-borderColor { border-color: #2d353e; }
.text-accentGreen { color: #23b586; }
.text-group1 { color: #3b82f6; }
.bg-group1 { background-color: #3b82f6; }

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
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 滚动条 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #2d353e; border-radius: 3px; }
</style>
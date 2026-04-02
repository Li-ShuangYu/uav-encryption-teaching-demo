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
        <span class="font-bold">任务已确认！即将进入方案设计阶段。</span>
      </div>
    </transition>

    <transition name="fade-in">
      <header v-if="showContent" class="shrink-0 h-16 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
        <div class="flex items-center gap-3">
          <div class="w-1 h-6 rounded-full" :class="selectedGroupId ? getColorClass('bg') : 'bg-gray-500'"></div>
          <h1 class="text-xl font-bold text-white tracking-wide">方案设计-任务接收与选择</h1>
        </div>
        <div class="flex items-center gap-4">
          <button 
            @click="confirmTask" 
            :disabled="!selectedGroupId || isReceiving"
            :class="[
              'text-sm px-4 py-2 rounded font-medium transition-colors flex items-center gap-2',
              (selectedGroupId && !isReceiving)
                ? 'bg-accentGreen hover:bg-accentGreenDark text-white cursor-pointer' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            ]"
          >
            <svg v-if="selectedGroupId" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ isReceiving ? '等待接收任务' : (selectedGroupId ? '确认选择' : '请先选择任务') }}
          </button>
        </div>
      </header>
    </transition>

    <main v-if="showContent" class="flex-1 overflow-hidden p-4 md:p-6 bg-darkBg relative">
      <transition name="fade">
        <div v-if="isReceiving" class="absolute inset-0 flex flex-col items-center justify-center z-10 bg-darkBg">
          <div class="w-16 h-16 border-4 border-gray-700 border-t-accentGreen rounded-full animate-spin mb-6"></div>
          <h2 class="text-2xl font-bold text-white mb-3 tracking-wider">等待教师下发任务...</h2>
          <p class="text-textMuted">系统正在同步主线与支线任务分配信息</p>
        </div>
      </transition>

      <transition name="fade-up">
        <div v-if="!isReceiving" class="flex flex-col h-full gap-4 max-w-7xl mx-auto w-full">
          
          <div class="bg-cardInnerBg border border-gray-700/80 rounded-lg p-2.5 shrink-0 flex items-center gap-3 relative shadow-md transition-all hover:border-gray-500 overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-accentGreen"></div>
            <div class="flex items-center pl-3 shrink-0">
              <span class="text-[15px] font-bold text-white tracking-wide">【主线任务汇总】</span>
            </div>
            <div class="bg-darkBg rounded-md px-4 py-2 border border-gray-700/50 flex-1 flex items-center min-h-[44px]">
              <p class="text-[13.5px] text-gray-300 leading-snug m-0">
                完成无人机通信加密系统全流程设计，覆盖需求分析、方案选型、仿真验证全环节，输出可落地的加密安全方案，满足上述 4 项需求点的全部要求。
              </p>
            </div>
          </div>

          <div class="flex-1 flex flex-col min-h-0 gap-3">
            <h2 class="text-[15px] font-bold text-white shrink-0 flex items-center gap-2">
              <div class="w-1 h-3.5 bg-blue-500 rounded-sm"></div>
              【支线任务分配】请选择您的主攻方向
            </h2>
            
            <div class="flex-1 grid grid-cols-2 gap-4 min-h-0">
              
              <div 
                class="bg-cardInnerBg rounded-xl border flex flex-col p-4 md:p-5 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
                :class="getCardClass(1)"
                @mouseenter="hoveredGroup = 1"
                @mouseleave="hoveredGroup = null"
                @click="selectGroup(1)"
              >
                <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-700/50 pb-2.5">
                  <div class="flex items-center space-x-3">
                    <h2 class="text-[16px] font-bold text-white">支线方向 1：低功耗优化</h2>
                  </div>
                  <div v-if="selectedGroupId === 1" class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :class="getColorClass('bg')">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                
                <div class="flex-1 flex flex-col justify-between min-h-0 gap-2">
                  <p class="text-[13.5px] text-gray-300 leading-relaxed overflow-y-auto custom-scrollbar shrink">
                    聚焦加密算法轻量化选型与密钥管理流程优化，在保障安全的前提下，最大限度降低加密机制带来的额外功耗。
                  </p>
                  <div class="shrink-0 mt-auto">
                    <div class="p-2.5 bg-darkBg border border-gray-700/50 rounded-lg">
                      <span class="font-bold text-[12.5px] flex items-center mb-1.5 transition-colors duration-300" :class="getTextClass(1)">
                        <svg class="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                        AI助教分析
                      </span>
                      <p class="text-textMuted text-[12px] leading-snug">推荐采用PRESENT轻量级加密算法，优化密钥更新流程，平衡安全性与功耗需求。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                class="bg-cardInnerBg rounded-xl border flex flex-col p-4 md:p-5 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
                :class="getCardClass(2)"
                @mouseenter="hoveredGroup = 2"
                @mouseleave="hoveredGroup = null"
                @click="selectGroup(2)"
              >
                <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-700/50 pb-2.5">
                  <div class="flex items-center space-x-3">
                    <h2 class="text-[16px] font-bold text-white">支线方向 2：侧信道防护</h2>
                  </div>
                  <div v-if="selectedGroupId === 2" class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :class="getColorClass('bg')">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                
                <div class="flex-1 flex flex-col justify-between min-h-0 gap-2">
                  <p class="text-[13.5px] text-gray-300 leading-relaxed overflow-y-auto custom-scrollbar shrink">
                    针对无人机嵌入式设备的物理泄露风险，设计轻量级掩码防护机制，抵御侧信道攻击，提升系统物理安全。
                  </p>
                  <div class="shrink-0 mt-auto">
                    <div class="p-2.5 bg-darkBg border border-gray-700/50 rounded-lg">
                      <span class="font-bold text-[12.5px] flex items-center mb-1.5 transition-colors duration-300" :class="getTextClass(2)">
                        <svg class="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                        AI助教分析
                      </span>
                      <p class="text-textMuted text-[12px] leading-snug">建议采用SM4国密算法结合轻量级掩码防护技术，增强侧信道攻击抵御能力。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                class="bg-cardInnerBg rounded-xl border flex flex-col p-4 md:p-5 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
                :class="getCardClass(3)"
                @mouseenter="hoveredGroup = 3"
                @mouseleave="hoveredGroup = null"
                @click="selectGroup(3)"
              >
                <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-700/50 pb-2.5">
                  <div class="flex items-center space-x-3">
                    <h2 class="text-[16px] font-bold text-white">支线方向 3：抗重放攻击</h2>
                  </div>
                  <div v-if="selectedGroupId === 3" class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :class="getColorClass('bg')">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                
                <div class="flex-1 flex flex-col justify-between min-h-0 gap-2">
                  <p class="text-[13.5px] text-gray-300 leading-relaxed overflow-y-auto custom-scrollbar shrink">
                    设计基于随机数 + 序列号的双向认证机制，杜绝非法重放攻击，保障无人机通信链路的接入安全与指令合法性。
                  </p>
                  <div class="shrink-0 mt-auto">
                    <div class="p-2.5 bg-darkBg border border-gray-700/50 rounded-lg">
                      <span class="font-bold text-[12.5px] flex items-center mb-1.5 transition-colors duration-300" :class="getTextClass(3)">
                        <svg class="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                        AI助教分析
                      </span>
                      <p class="text-textMuted text-[12px] leading-snug">推荐使用SM4加密算法配合动态随机数抗重放认证机制，确保指令唯一性。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                class="bg-cardInnerBg rounded-xl border flex flex-col p-4 md:p-5 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
                :class="getCardClass(4)"
                @mouseenter="hoveredGroup = 4"
                @mouseleave="hoveredGroup = null"
                @click="selectGroup(4)"
              >
                <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-700/50 pb-2.5">
                  <div class="flex items-center space-x-3">
                    <h2 class="text-[16px] font-bold text-white">支线方向 4：后量子算法适配</h2>
                  </div>
                  <div v-if="selectedGroupId === 4" class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :class="getColorClass('bg')">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                
                <div class="flex-1 flex flex-col justify-between min-h-0 gap-2">
                  <p class="text-[13.5px] text-gray-300 leading-relaxed overflow-y-auto custom-scrollbar shrink">
                    评估后量子加密算法在无人机场景的适配性，筛选轻量化格密码方案，保障系统在量子计算场景下的长期安全。
                  </p>
                  <div class="shrink-0 mt-auto">
                    <div class="p-2.5 bg-darkBg border border-gray-700/50 rounded-lg">
                      <span class="font-bold text-[12.5px] flex items-center mb-1.5 transition-colors duration-300" :class="getTextClass(4)">
                        <svg class="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                        AI助教分析
                      </span>
                      <p class="text-textMuted text-[12px] leading-snug">建议采用抗量子加密算法，优化适配流程，平衡安全性与算力消耗。</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </transition>
    </main>

    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-cardInnerBg rounded-2xl border border-borderColor p-8 max-w-md w-full text-center shadow-2xl animate-fade-up">
          <div class="w-20 h-20 bg-accentGreen/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accentGreen/50">
            <svg class="w-10 h-10 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">任务已确认</h3>
          <button @click="goToNextStage" class="w-full py-3 bg-accentGreen hover:bg-accentGreenDark text-white rounded-lg font-bold transition-colors shadow-lg shadow-accentGreen/20">
            进入详情页
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showContent = ref(false);
const isReceiving = ref(true); 
const showSuccessModal = ref(false);
const showToast = ref(false);
const hoveredGroup = ref(null);
const selectedGroupId = ref(null);

const savedColorTheme = ref(null);
let pollingTimer = null;

// 轮询获取后端教师任务发布状态
const fetchState = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/state');
    const state = await res.json();
    
    // 如果收到教师端发布的信号，且目前还在等待态，则解除等待
    if (state.task_published === 1 && isReceiving.value) {
      isReceiving.value = false;
    }
  } catch (error) {
    // 忽略网络错误，不影响页面崩溃
  }
};

onMounted(() => {
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    const groupInfo = JSON.parse(storedInfo);
    savedColorTheme.value = groupInfo.colorTheme;
  }
  
  setTimeout(() => {
    showContent.value = true;
  }, 100);

  // 开启轮询替代之前的死等 setTimeout
  fetchState();
  pollingTimer = setInterval(fetchState, 1000);
});

onUnmounted(() => {
  if (pollingTimer) {
    clearInterval(pollingTimer);
  }
});

const selectGroup = (groupId) => {
  if(isReceiving.value) return; 
  selectedGroupId.value = groupId;
};

const getColorFromStorage = (type) => {
  const defaultColors = {
    bg: 'bg-blue-600',
    border: 'border-blue-500',
    text: 'text-blue-400',
    accent: 'bg-blue-500'
  };
  
  if (!savedColorTheme.value) {
    return defaultColors[type] || 'bg-gray-600';
  }
  
  const theme = savedColorTheme.value;
  
  switch (type) {
    case 'bg':
      return theme.badgeBgClass || defaultColors.bg;
    case 'border':
      return theme.activeBorderClass || defaultColors.border;
    case 'text':
      return theme.textClass || defaultColors.text;
    case 'accent':
      return theme.tagClass || defaultColors.accent;
    default:
      return defaultColors.bg;
  }
};

const getColorClass = (type) => {
  if (!selectedGroupId.value) return type === 'bg' ? 'bg-gray-600' : 'border-gray-500';
  return getColorFromStorage(type);
};

const getCardClass = (groupId) => {
  const isSelected = selectedGroupId.value === groupId;
  const isHovered = hoveredGroup.value === groupId;
  
  if (isSelected || isHovered) {
    const activeBorder = getColorFromStorage('border');
    const shadowMap = {
      'border-blue-500': 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
      'border-red-500': 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
      'border-amber-500': 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      'border-purple-500': 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
      'border-green-500': 'shadow-[0_0_20px_rgba(34,197,94,0.15)]',
      'border-yellow-500': 'shadow-[0_0_20px_rgba(234,179,8,0.15)]',
      'border-cyan-500': 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      'border-orange-500': 'shadow-[0_0_20px_rgba(249,115,22,0.15)]'
    };
    const shadow = shadowMap[activeBorder] || '';
    const scale = isSelected ? 'scale-[1.01]' : '';
    return `${activeBorder} ${shadow} ${scale}`;
  }
  
  return 'border-gray-700 hover:border-gray-500';
};

const getTextClass = (groupId) => {
  const isSelected = selectedGroupId.value === groupId;
  const isHovered = hoveredGroup.value === groupId;
  
  if (isSelected || isHovered) {
    return getColorFromStorage('text');
  }
  return 'text-gray-400';
};

const goToNextStage = () => {
  showSuccessModal.value = false;
  router.push('/student/task-split');
};

const confirmTask = async () => {
  if (selectedGroupId.value && !isReceiving.value) {
    // 提交选择状态到后端
    try {
      const stateKey = `task_selected_g${selectedGroupId.value}`;
      await fetch('http://localhost:3000/api/state/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [stateKey]: 1 })
      });
    } catch (error) {
      console.error('发送状态失败:', error);
      // 报错也不影响前端自己的正常交互流
    }
    
    showSuccessModal.value = true;
  }
};
</script>

<style scoped>
/* 隐藏卡片内部万一因为极端挤压产生的滚动条，保持美观 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 10px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.5s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.animate-fade-up {
  animation: fadeUp 0.6s ease both;
}

@keyframes fadeUp {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
</style>
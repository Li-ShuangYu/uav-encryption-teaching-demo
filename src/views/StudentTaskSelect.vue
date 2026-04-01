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
          <h1 class="text-xl font-bold text-white tracking-wide">方案设计-任务选择</h1>
        </div>
        <div class="flex items-center gap-4">
          <button 
            @click="confirmTask" 
            :disabled="!selectedGroupId"
            :class="[
              'text-sm px-4 py-2 rounded font-medium transition-colors flex items-center gap-2',
              selectedGroupId 
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
            {{ selectedGroupId ? '确认选择' : '请先选择任务' }}
          </button>
        </div>
      </header>
    </transition>

    <transition name="fade-up">
      <main v-if="showContent" class="flex-1 overflow-y-auto p-6 bg-darkBg">
        <div class="grid grid-cols-2 gap-6 h-full">
          
          <!-- 组1 -->
          <div 
            class="bg-cardInnerBg rounded-xl border flex flex-col p-4 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
            :class="getCardClass(1)"
            @mouseenter="hoveredGroup = 1"
            @mouseleave="hoveredGroup = null"
            @click="selectGroup(1)"
          >
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">
                <h2 class="text-lg font-bold text-white">低功耗优化方向</h2>
              </div>
              <div v-if="selectedGroupId === 1" class="w-5 h-5 rounded-full flex items-center justify-center" :class="getColorClass('bg')">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            
            <div class="flex-1 flex flex-col gap-4 min-h-0">
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(1)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(1)"></span>
                  【主线任务：通信加密设计】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">实现数据加密传输与双向身份认证，需重点适应无人机算力有限与时延敏感特性。</p>
              </div>
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(1)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(1)"></span>
                  【支线任务：低功耗专项】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">机载设备功耗严格受限，需优化加密算法与密钥流程以降低整体算力开销。</p>
              </div>
              <div class="p-2.5 bg-darkBg border border-borderColor rounded-lg">
                <span class="font-bold text-[12px] flex items-center mb-1 transition-colors duration-300" :class="getTextClass(1)">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  AI助教分析
                </span>
                <p class="text-textMuted text-[11.5px] leading-snug">推荐采用PRESENT轻量级加密算法，优化密钥更新流程，平衡安全性与功耗需求。</p>
              </div>
            </div>
          </div>

          <!-- 组2 -->
          <div 
            class="bg-cardInnerBg rounded-xl border flex flex-col p-4 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
            :class="getCardClass(2)"
            @mouseenter="hoveredGroup = 2"
            @mouseleave="hoveredGroup = null"
            @click="selectGroup(2)"
          >
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">
    
                <h2 class="text-lg font-bold text-white">侧信道防护方向</h2>
              </div>
              <div v-if="selectedGroupId === 2" class="w-5 h-5 rounded-full flex items-center justify-center" :class="getColorClass('bg')">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            
            <div class="flex-1 flex flex-col gap-4 min-h-0">
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(2)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(2)"></span>
                  【主线任务：通信加密设计】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">保障无线通信数据机密性与完整性，加密时延需严格控制以确保飞行指令实时传输。</p>
              </div>
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(2)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(2)"></span>
                  【支线任务：侧信道防护专项】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">需阻断功耗、时序等物理信息泄露，抵御差分功耗分析等侧信道攻击风险。</p>
              </div>
              <div class="p-2.5 bg-darkBg border border-borderColor rounded-lg">
                <span class="font-bold text-[12px] flex items-center mb-1 transition-colors duration-300" :class="getTextClass(2)">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  AI助教分析
                </span>
                <p class="text-textMuted text-[11.5px] leading-snug">建议采用SM4国密算法结合轻量级掩码防护技术，增强侧信道攻击抵御能力。</p>
              </div>
            </div>
          </div>

          <!-- 组3 -->
          <div 
            class="bg-cardInnerBg rounded-xl border flex flex-col p-4 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
            :class="getCardClass(3)"
            @mouseenter="hoveredGroup = 3"
            @mouseleave="hoveredGroup = null"
            @click="selectGroup(3)"
          >
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">

                <h2 class="text-lg font-bold text-white">抗重放攻击方向</h2>
              </div>
              <div v-if="selectedGroupId === 3" class="w-5 h-5 rounded-full flex items-center justify-center" :class="getColorClass('bg')">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            
            <div class="flex-1 flex flex-col gap-4 min-h-0">
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(3)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(3)"></span>
                  【主线任务：通信加密设计】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">全程加密控制指令与飞行数据，强化身份认证，算法需高度适配机载算力限制。</p>
              </div>
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(3)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(3)"></span>
                  【支线任务：抗重放专项】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">需设置严格的滑动窗口与同步校验机制，阻止截取旧数据包干扰，确保指令唯一有效。</p>
              </div>
              <div class="p-2.5 bg-darkBg border border-borderColor rounded-lg">
                <span class="font-bold text-[12px] flex items-center mb-1 transition-colors duration-300" :class="getTextClass(3)">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  AI助教分析
                </span>
                <p class="text-textMuted text-[11.5px] leading-snug">推荐使用SM4加密算法配合动态随机数抗重放认证机制，确保指令唯一性。</p>
              </div>
            </div>
          </div>

          <!-- 组4 -->
          <div 
            class="bg-cardInnerBg rounded-xl border flex flex-col p-4 h-full relative overflow-hidden transition-all duration-300 cursor-pointer"
            :class="getCardClass(4)"
            @mouseenter="hoveredGroup = 4"
            @mouseleave="hoveredGroup = null"
            @click="selectGroup(4)"
          >
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">
      
                <h2 class="text-lg font-bold text-white">后量子算法适配方向</h2>
              </div>
              <div v-if="selectedGroupId === 4" class="w-5 h-5 rounded-full flex items-center justify-center" :class="getColorClass('bg')">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            
            <div class="flex-1 flex flex-col gap-4 min-h-0">
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(4)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(4)"></span>
                  【主线任务：通信加密设计】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">支持多种数据类型加密，底层通信算法需满足未来量子计算环境下的安全要求。</p>
              </div>
              <div>
                <p class="font-bold mb-1 flex items-center text-[13px] transition-colors duration-300" :class="getTextClass(4)">
                  <span class="w-1 h-2.5 mr-2 rounded-sm transition-colors duration-300" :class="getAccentClass(4)"></span>
                  【支线任务：后量子适配专项】
                </p>
                <p class="text-[12px] text-textMuted pl-3 leading-relaxed">采用抗量子破解的轻量机制，需评估算力消耗并简化适配流程，降低机载硬件负担。</p>
              </div>
              <div class="p-2.5 bg-darkBg border border-borderColor rounded-lg">
                <span class="font-bold text-[12px] flex items-center mb-1 transition-colors duration-300" :class="getTextClass(4)">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  AI助教分析
                </span>
                <p class="text-textMuted text-[11.5px] leading-snug">建议采用抗量子加密算法，优化适配流程，平衡安全性与算力消耗。</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </transition>

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showContent = ref(false);
const showSuccessModal = ref(false);
const showToast = ref(false);
const hoveredGroup = ref(null);
const selectedGroupId = ref(null);

// 从localStorage获取的颜色主题
const savedColorTheme = ref(null);

onMounted(() => {
  // 读取localStorage中的组信息
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    const groupInfo = JSON.parse(storedInfo);
    savedColorTheme.value = groupInfo.colorTheme;
    console.log('从localStorage读取的颜色主题:', savedColorTheme.value);
  }
  
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});

// 选择组别
const selectGroup = (groupId) => {
  selectedGroupId.value = groupId;
};

// 从localStorage获取颜色类
const getColorFromStorage = (type) => {
  // 默认颜色（如果localStorage没有数据）
  const defaultColors = {
    bg: 'bg-blue-600',
    border: 'border-blue-500',
    text: 'text-blue-400',
    accent: 'bg-blue-500'
  };
  
  if (!savedColorTheme.value) {
    return defaultColors[type] || 'bg-gray-600';
  }
  
  // 从colorTheme中提取颜色类
  const theme = savedColorTheme.value;
  
  // 根据类型返回对应的颜色类
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

// 获取颜色类（根据localStorage）
const getColorClass = (type) => {
  if (!selectedGroupId.value) return type === 'bg' ? 'bg-gray-600' : 'border-gray-500';
  return getColorFromStorage(type);
};

// 获取卡片样式类
const getCardClass = (groupId) => {
  const isSelected = selectedGroupId.value === groupId;
  const isHovered = hoveredGroup.value === groupId;
  
  // 只有当前悬停或选中的组才显示颜色（使用localStorage的颜色）
  if (isSelected || isHovered) {
    const activeBorder = getColorFromStorage('border');
    // 根据颜色生成对应的阴影
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
  
  return 'border-gray-700';
};

// 获取徽章样式类
const getBadgeClass = (groupId) => {
  const isSelected = selectedGroupId.value === groupId;
  const isHovered = hoveredGroup.value === groupId;
  
  if (isSelected || isHovered) {
    return getColorFromStorage('bg');
  }
  return 'bg-gray-700';
};

// 获取文字样式类
const getTextClass = (groupId) => {
  const isSelected = selectedGroupId.value === groupId;
  const isHovered = hoveredGroup.value === groupId;
  
  if (isSelected || isHovered) {
    return getColorFromStorage('text');
  }
  return 'text-gray-400';
};

// 获取强调色样式类
const getAccentClass = (groupId) => {
  const isSelected = selectedGroupId.value === groupId;
  const isHovered = hoveredGroup.value === groupId;
  
  if (isSelected || isHovered) {
    return getColorFromStorage('accent');
  }
  return 'bg-gray-600';
};

const goToNextStage = () => {
  showSuccessModal.value = false;
  router.push('/student/task-split');
};

const confirmTask = () => {
  if (selectedGroupId.value) {
    showSuccessModal.value = true;
  }
};
</script>

<style scoped>
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

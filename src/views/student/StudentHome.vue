<template>
  <div class="w-full min-h-screen bg-[#111318] flex flex-col font-sans text-gray-200 box-border p-4 overflow-hidden">
    
    <!-- 入场动画 -->
    <transition name="fade-in">
      <div v-if="showContent" class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white tracking-wide">请选择你的组</h1>
          <p class="text-gray-400 mt-1 text-sm">请选择一个密码学攻坚方向，开始你的密码任务。</p>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-purple-500 mt-2 rounded-full"></div>
        </div>
        <div class="flex items-center">
          <button 
            @click="confirmSelection"
            :disabled="selectedGroupId === null || isLoading"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center shadow-lg',
              selectedGroupId !== null && !isLoading 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            ]"
          >
            <template v-if="isLoading">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              处理中...
            </template>
            <template v-else>
              {{ selectedGroupId !== null ? '确认加入小队' : '请选择一个方向' }}
              <svg v-if="selectedGroupId !== null" class="w-4 h-4 ml-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path>
              </svg>
            </template>
          </button>
        </div>
      </div>
    </transition>
    
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
      
      <transition-group name="fade-up">
        <div 
          v-for="(group, index) in groups" 
          :key="index"
          v-if="showContent"
          @click="selectGroup(index)"
          :class="[
            'bg-[#181a20] rounded-lg border flex flex-col p-4 transition-all duration-300 cursor-pointer relative overflow-hidden group',
            selectedGroupId === index ? group.activeBorderClass + ' ' + group.shadowClass + ' scale-[1.01]' : group.borderClass + ' hover:border-gray-500 hover:shadow-xl hover:shadow-black/40'
          ]"
        >
          <div 
            v-if="selectedGroupId === index" 
            class="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-500"
            :class="group.bgHighlightClass"
          ></div>

          <div class="flex justify-between items-start mb-3 relative z-10">
            <div class="flex items-center space-x-2">
              <div :class="['w-8 h-8 rounded-lg text-white flex items-center justify-center text-sm font-bold shadow-md', group.badgeBgClass]">
                组{{ index + 1 }}
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">{{ group.title }}</h2>
                <p :class="['text-sm font-medium mt-0.5', group.textClass]">{{ group.algorithm }}</p>
              </div>
            </div>
            <div v-if="selectedGroupId === index" :class="['w-5 h-5 rounded-full flex items-center justify-center', group.badgeBgClass]">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
          </div>
          
          <div class="w-full h-px bg-gray-800/80 my-1"></div>
          
          <div class="flex-1 flex flex-col justify-between relative z-10 space-y-4 mt-1">
            
            <div>
              <div class="flex items-center mb-2">
                <svg class="w-4 h-4 text-gray-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                <span class="text-sm text-gray-300 font-bold">人物画像：{{ group.persona }}</span>
              </div>
              <div class="flex flex-wrap gap-1.5 mt-1.5">
                <span v-for="(trait, tIndex) in group.traits" :key="tIndex" :class="['px-2.5 py-1 rounded text-sm font-medium bg-opacity-10 border', group.tagClass]">
                  {{ trait }}
                </span>
              </div>
            </div>

            <div class="bg-[#13151a] p-2.5 rounded-lg border border-gray-800/60">
              <h3 class="text-sm text-gray-500 mb-1.5 font-bold">🎯 做事风格</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                {{ group.style }}
              </p>
            </div>

          </div>
        </div>
      </transition-group>

    </div>

    <!-- 加载动画遮罩 -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div class="bg-[#181a20] rounded-xl p-6 max-w-md w-full text-center">
        <div class="flex justify-center mb-4">
          <svg class="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">选组成功</h3>
        <p class="text-gray-400">正在进入需求提交页面...</p>
      </div>
    </div>
    
    <!-- 组队成功弹框 -->
    <div v-if="showTeamSuccessModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div class="bg-[#181a20] rounded-xl p-6 max-w-md w-full text-center border-2" :class="groups[selectedGroupId.value].activeBorderClass">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 rounded-full flex items-center justify-center" :class="groups[selectedGroupId.value].badgeBgClass">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">组队成功！</h3>
        <p class="text-gray-400 mb-6">你已成功加入 <span :class="groups[selectedGroupId.value].textClass">{{ groups[selectedGroupId.value].title }}</span> 小组</p>
        
        <!-- 小组成员名单 -->
        <transition name="fade-in">
          <div v-if="showTeamMembers" class="mb-6">
            <h4 class="text-lg font-bold text-white mb-3">小组成员</h4>
            <div class="space-y-3">
              <div v-for="(member, index) in teamMembers" :key="index" class="flex items-center justify-between p-3 rounded-lg bg-[#13151a] border border-gray-800">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="groups[selectedGroupId.value].badgeBgClass">
                    <span class="text-white text-sm font-bold">{{ member.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-3">
                    <div class="text-white font-medium">{{ member.name }}</div>
                    <div class="text-xs text-gray-400">{{ member.role }}</div>
                  </div>
                </div>
                <div class="text-xs text-gray-400">{{ member.specialty }}</div>
              </div>
            </div>
          </div>
        </transition>
        
        <button 
          @click="goToTaskSelect"
          class="w-full py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center"
          :class="groups[selectedGroupId.value].badgeBgClass + ' hover:opacity-90 text-white shadow-lg'"
        >
          进入接取任务界面
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 当前选中的组别索引
const selectedGroupId = ref(null);
// 加载状态
const isLoading = ref(false);
// 控制入场动画
const showContent = ref(false);

// 选择组别
const selectGroup = (index) => {
  selectedGroupId.value = index;
};

// 组队成功弹框状态
const showTeamSuccessModal = ref(false);
const showTeamMembers = ref(false);
const teamMembers = ref([]);

// 确认提交
const confirmSelection = () => {
  if (selectedGroupId.value !== null) {
    isLoading.value = true;
    
    // 2秒后显示组队成功弹框
    setTimeout(() => {
      isLoading.value = false;
      showTeamSuccessModal.value = true;
      
      // 模拟获取小组成员数据
      teamMembers.value = [
        { name: '张三', role: '组长', specialty: '密码学算法' },
        { name: '李四', role: '组员', specialty: '硬件实现' },
        { name: '王五', role: '组员', specialty: '安全分析' }
      ];
      
      // 再等待2秒后显示小组成员名单
      setTimeout(() => {
        showTeamMembers.value = true;
      }, 2000);
    }, 2000);
  }
};

// 进入接取任务界面
const goToTaskSelect = () => {
  showTeamSuccessModal.value = false;
  router.push('/student/task-select');
};

// 入场动画
onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});

// 四个组的数据配置（整合了MBTI特点与Tailwind颜色类名）
const groups = [
  {
    title: '低功耗优化方向',
    algorithm: 'PRESENT 轻量级密码算法',
    persona: '极致的“精算师”与“极简主义者”',
    traits: ['极其自律', '务实导向', '算力断舍离'],
    style: '目标导向极强，懂得Trade-off（取舍）。别人追求花哨，你追求“刚刚好”和“性价比”。遇到问题第一反应永远是：“能不能再砍掉些冗余？”',
    // 蓝色系主题
    borderClass: 'border-blue-900/40',
    activeBorderClass: 'border-blue-500',
    bgHighlightClass: 'bg-gradient-to-br from-blue-600 to-transparent',
    badgeBgClass: 'bg-blue-600',
    textClass: 'text-blue-400',
    tagClass: 'bg-blue-500 text-blue-300 border-blue-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]'
  },
  {
    title: '侧信道防护方向',
    algorithm: 'AES + 掩码与恒定时间防线',
    persona: '敏锐的“心理弈者”与“细节控”',
    traits: ['心思缜密', '极度敏锐', '防御型思维'],
    style: '习惯性保持防御姿态，做事滴水不漏。不仅关注正面逻辑，更关注“物理暗处”泄露的把柄。情绪稳定，深藏不露。',
    // 红色系主题
    borderClass: 'border-red-900/40',
    activeBorderClass: 'border-red-500',
    bgHighlightClass: 'bg-gradient-to-br from-red-600 to-transparent',
    badgeBgClass: 'bg-red-600',
    textClass: 'text-red-400',
    tagClass: 'bg-red-500 text-red-300 border-red-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]'
  },
  {
    title: '抗重放攻击方向',
    algorithm: 'AES + 动态随机数校验协议',
    persona: '严谨的“秩序守卫者”与“史官”',
    traits: ['精神洁癖', '原则性强', '活在当下'],
    style: '对“炒冷饭”和“旧账”深恶痛绝，极其看重时效性。做事一码归一码，有着严格的校验机制和底线，绝不轻易让人钻空子。',
    // 橙黄色系主题
    borderClass: 'border-amber-900/40',
    activeBorderClass: 'border-amber-500',
    bgHighlightClass: 'bg-gradient-to-br from-amber-600 to-transparent',
    badgeBgClass: 'bg-amber-500',
    textClass: 'text-amber-400',
    tagClass: 'bg-amber-500 text-amber-300 border-amber-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]'
  },
  {
    title: '后量子算法适配方向',
    algorithm: 'Kyber 密钥封装防降维打击',
    persona: '前卫的“未来先锋”与“破壁人”',
    traits: ['危机意识', '高瞻远瞩', '拥抱变化'],
    style: '绝对的长期主义者，对颠覆性新技术充满好奇。具有宏观战略眼光，敢于做第一个吃螃蟹的人，哪怕被认为“杞人忧天”。',
    // 紫色系主题
    borderClass: 'border-purple-900/40',
    activeBorderClass: 'border-purple-500',
    bgHighlightClass: 'bg-gradient-to-br from-purple-600 to-transparent',
    badgeBgClass: 'bg-purple-600',
    textClass: 'text-purple-400',
    tagClass: 'bg-purple-500 text-purple-300 border-purple-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]'
  }
];
</script>

<style scoped>
/* 可选：为平滑缩放添加自定义过渡 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 入场动画 - Vue transition 样式 */
.fade-in-enter-active, .fade-in-leave-active {
  transition: all 0.5s ease;
}

.fade-in-enter-from, .fade-in-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-up-enter-active, .fade-up-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from, .fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 为每个卡片添加不同的动画延迟 */
.fade-up-move {
  transition: transform 0.5s ease;
}
</style>
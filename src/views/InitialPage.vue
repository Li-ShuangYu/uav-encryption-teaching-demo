<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#121417] text-[#d1d5db] font-sans relative">
    <!-- AI智能助手入口 -->
    <button 
      @click="navigateToRobotDebug"
      class="absolute top-4 right-4 w-32 h-12 bg-purple-900/40 border border-purple-500/30 rounded-lg shadow-lg hover:border-purple-400 transition flex items-center justify-center gap-2 cursor-pointer group"
    >
      <svg class="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
      <span class="text-sm font-bold text-purple-300 group-hover:text-purple-200 transition">AI智能助手</span>
    </button>

    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-white mb-4">无人机密码系统设计实战</h1>
      <p class="text-gray-400 text-lg">请选择您的身份</p>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-6">
      <div class="flex flex-col items-center">
        <button 
          @click="selectStudentGroup" 
          :disabled="selectedGroupIndex === null"
          :class="[
            'w-96 h-64 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl transition flex flex-col items-center justify-center cursor-pointer group',
            selectedGroupIndex !== null ? 'hover:border-accentGreen' : 'opacity-70 cursor-not-allowed'
          ]"
        >
          <div class="w-24 h-24 rounded-full bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-900/50 transition">
            <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white group-hover:text-accentGreen transition">学生</h2>
          <p class="text-gray-400 text-base mt-3">进入学习工作台</p>
        </button>
        
        <!-- 组选择颜色点 -->
        <div class="flex gap-4 mt-6">
          <button 
            v-for="(group, index) in groups" 
            :key="index"
            @click="selectedGroupIndex = index"
            :class="[
              'w-8 h-8 rounded-full transition-all duration-300 cursor-pointer',
              selectedGroupIndex === index ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
            ]"
            :style="{
              backgroundColor: index === 0 ? '#3b82f6' : index === 1 ? '#ef4444' : index === 2 ? '#f59e0b' : '#a855f7',
              boxShadow: selectedGroupIndex === index ? '0 0 12px rgba(' + (index === 0 ? '59, 130, 246' : index === 1 ? '239, 68, 68' : index === 2 ? '245, 158, 11' : '168, 85, 247') + ', 0.5)' : 'none'
            }"
            :title="'组' + (index + 1)"
          ></button>
        </div>
      </div>
      
      <button 
        @click="navigateToTeacher" 
        class="w-96 h-64 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-24 h-24 rounded-full bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition">
          <svg class="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white group-hover:text-accentGreen transition">教授</h2>
        <p class="text-gray-400 text-base mt-3">进入教师控制台</p>
      </button>

      <button 
        @click="navigateToAdmin" 
        class="w-96 h-64 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-24 h-24 rounded-full bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-900/50 transition">
          <svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white group-hover:text-accentGreen transition">管理员</h2>
        <p class="text-gray-400 text-base mt-3">进入管理控制台</p>
      </button>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedGroupIndex = ref(null)

// 四个组的数据配置
const groups = [
  {
    title: '低功耗优化方向',
    algorithm: 'PRESENT 轻量级密码算法',
    persona: '极致的“精算师”与“极简主义者”',
    traits: ['极其自律', '务实导向', '算力断舍离'],
    style: '目标导向极强，懂得Trade-off（取舍）。别人追求花哨，你追求“刚刚好”和“性价比”。遇到问题第一反应永远是：“能不能再砍掉些冗余？”',
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
    borderClass: 'border-purple-900/40',
    activeBorderClass: 'border-purple-500',
    bgHighlightClass: 'bg-gradient-to-br from-purple-600 to-transparent',
    badgeBgClass: 'bg-purple-600',
    textClass: 'text-purple-400',
    tagClass: 'bg-purple-500 text-purple-300 border-purple-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]'
  }
];

// 选择学生组别并跳转
const selectStudentGroup = () => {
  if (selectedGroupIndex.value === null) return;
  
  // 获取选中的组信息
  const selectedGroup = groups[selectedGroupIndex.value];
  
  // 存储组别信息到localStorage
  const groupInfo = {
    groupId: selectedGroupIndex.value + 1, // 组别编号（1-4）
    groupName: selectedGroup.title, // 方向名称
    algorithm: selectedGroup.algorithm, // 算法名称
    persona: selectedGroup.persona, // 人物画像
    traits: selectedGroup.traits, // 特质标签
    style: selectedGroup.style, // 做事风格
    colorTheme: {
      borderClass: selectedGroup.borderClass,
      activeBorderClass: selectedGroup.activeBorderClass,
      bgHighlightClass: selectedGroup.bgHighlightClass,
      badgeBgClass: selectedGroup.badgeBgClass,
      textClass: selectedGroup.textClass,
      tagClass: selectedGroup.tagClass,
      shadowClass: selectedGroup.shadowClass
    },
    selectTime: new Date().toISOString() // 选择时间
  };
  
  // 使用localStorage存储
  localStorage.setItem('selectedGroupInfo', JSON.stringify(groupInfo));
  console.log('组别信息已保存到localStorage:', groupInfo);
  
  // 跳转到学生任务接收页面
  router.push('/student/task-receive');
};

const navigateToTeacher = () => {
  // 直接跳转，不存储localStorage
  router.push('/teacher/demand-summary');
};

const navigateToAdmin = () => {
  // 直接跳转，不存储localStorage
  router.push('/admin');
};

const navigateToRobotDebug = () => {
  // 跳转到AI智能助手页面
  router.push('/student/robot-debug');
};
</script>

<style scoped>
/* 页面样式 */
</style>
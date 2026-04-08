<template>
  <div class="min-h-screen p-4 flex justify-center items-start relative bg-[#121417] text-[#d1d5db]">
    <div class="w-full max-w-full bg-darkBg border border-borderColor rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
      <div class="flex justify-between items-center px-4 py-2 border-b border-borderColor head shrink-0">
        <div @click="navigateToHome" class="flex items-center space-x-2 text-accentGreen font-bold text-lg tracking-wider cursor-pointer hover:text-accentGreenDark transition">
<div class="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden border border-borderColor hover:border-accentGreen transition shrink-0">
  <img :src="logoUrl" alt="系统Logo" class="max-w-full max-h-full object-contain" />
</div>            <span>密盾智学<span class="text-textMuted text-sm font-normal ml-2">| {{ currentStage }}</span></span>
        </div>
        
        <div class="flex space-x-2">
          <div 
            v-for="(item, index) in navItems" 
            :key="index" 
            class="px-3 py-1.5 text-sm rounded cursor-pointer flex items-center transition-all duration-300 border border-transparent"
            :class="route.path === item.path ? 'bg-gray-800 text-accentGreen font-medium border-gray-700 shadow-sm' : 'text-gray-400 hover:text-accentGreen hover:bg-gray-800/60'"
            @click="handleNavClick(item)"
          >
            {{ item.name }}
            <svg v-if="item.dropdown" class="w-3.5 h-3.5 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <router-view />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoUrl from '../assets/image/blackmdzx.png'

const router = useRouter()
const route = useRoute()
const currentTime = ref('')
const selectedMenuItem = ref('')

// ================= 新增的导航数据 =================
const navItems = [
  { name: "我的课程", path: '/student/task-select', active: true },
  { name: "教学管理", path: '/teacher/task-publish', dropdown: true },
  { name: "课程资源", path: '/student/task-receive', dropdown: true },
  { name: "学员管理", path: '/admin', dropdown: true },
  { name: "AI智能体", path: '/student-debug/robot-debug', dropdown: false },
  { name: "个人中心", path: '/profile-dashboard', dropdown: true },
  { name: "使用手册", path: '/', dropdown: false },
]

// 导航点击处理
const handleNavClick = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}
// =================================================

// 路由与阶段映射
const routeStageMap = {
  '/student/task-receive': { stage: '需求分析阶段', order: 1 },
  '/student/task-select': { stage: '需求分析阶段', order: 2 },
  '/student/task-split': { stage: '需求分析阶段', order: 3 },
  '/student/scheme-upload': { stage: '方案设计阶段', order: 4 },
  '/student/scheme-detail': { stage: '方案设计阶段', order: 5 },
  '/student/my-score-result': { stage: '方案设计阶段', order: 6 },
  '/student-debug/robot-debug': { stage: '冰达机器人代码设计', order: 7 },
  '/student-debug/deploy': { stage: '冰达机器人代码设计', order: 8 },
  '/student-debug/debug': { stage: '冰达机器人代码设计', order: 9 }
}

// 所有菜单项
const allMenuItems = [
  { value: '/student/task-receive', label: '需求分析阶段：需求提交', order: 1 },
  { value: '/student/task-select', label: '需求分析阶段：任务分配与确认', order: 2 },
  { value: '/student/task-split', label: '需求分析阶段：团队协作与分工', order: 3 },
  { value: '/student/scheme-upload', label: '方案设计阶段：方案上传与评估结果', order: 4 },
  { value: '/student/scheme-detail', label: '方案设计阶段：方案详情与架构蓝图', order: 5 },
  { value: '/student/my-score-result', label: '方案设计阶段：评分结果与综合评价', order: 6 }
]

// 当前阶段
const currentStage = computed(() => {
  const currentRoute = route.path
  return routeStageMap[currentRoute]?.stage || '需求分析阶段'
})

// 动态菜单项（显示所有页面）
const menuItems = computed(() => {
  return allMenuItems
})

// 格式化时间函数
const formatDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 初始化时间并设置定时器
let timer = null
onMounted(() => {
  currentTime.value = formatDateTime()
  timer = setInterval(() => {
    currentTime.value = formatDateTime()
  }, 1000)
  
  // 初始化选中的菜单项
  updateSelectedMenuItem()
  
  // 监听路由变化
  router.afterEach(() => {
    updateSelectedMenuItem()
  })
})

// 更新选中的菜单项
const updateSelectedMenuItem = () => {
  selectedMenuItem.value = route.path
}

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

// 跳转到首页
const navigateToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.min-h-screen {
    height: 100vh;
    overflow: hidden;
    .w-full {
        height: 100%;
        .head {
            flex-shrink: 0;
        }
    }
}
</style>
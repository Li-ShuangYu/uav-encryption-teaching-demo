<template>
  <div class="min-h-screen p-4 flex justify-center items-start relative bg-[#121417] text-[#d1d5db]">
    <div class="w-full max-w-full bg-darkBg border border-borderColor rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
      <div class="flex justify-between items-center px-6 py-4 border-b border-borderColor head">
        <div @click="navigateToHome" class="flex items-center space-x-2 text-accentGreen font-bold text-lg tracking-wider cursor-pointer hover:text-accentGreenDark transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke-width="2"></circle></svg>
            <span>学生工作台 <span class="text-textMuted text-sm font-normal ml-2">| {{ currentStage }}</span></span>
        </div>
        
        <div class="flex items-center space-x-4 text-sm text-textMuted">
            <select v-model="selectedMenuItem" @change="handleNavigate" class="bg-cardInnerBg border border-borderColor text-textMain text-xs rounded px-3 py-1.5 outline-none appearance-none cursor-pointer hover:border-accentGreen transition">
                <option v-for="item in menuItems" :key="item.value" :value="item.value">
                    {{ item.label }}
                </option>
            </select>

            <div class="h-4 w-px bg-borderColor mx-2"></div>

            <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"></rect><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 2v4M8 2v4M3 10h18"></path></svg>
                <span>{{ currentTime }}</span>
            </div>
            <!-- <button class="bg-accentGreenDark/20 text-accentGreen border border-accentGreen px-3 py-1.5 rounded text-xs hover:bg-accentGreen/30 transition">
                刷新数据
            </button> -->
        </div>
      </div>

      <router-view />

    </div>
<!-- <transition name="toast">
      <div v-if="showRefreshToast" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div :class="[
          'px-6 py-3 rounded shadow-lg flex items-center gap-2',
          refreshToastSuccess ? 'bg-accentGreen text-white' : 'bg-red-600 text-white'
        ]">
          <svg v-if="refreshToastSuccess" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span class="font-bold">{{ refreshToastSuccess ? '刷新成功！' : '刷新失败！' }}</span>
        </div>
      </div>
    </transition> -->

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const currentTime = ref('')
const selectedMenuItem = ref('')

// 路由与阶段映射
const routeStageMap = {
  '/student/task-receive': { stage: '需求分析阶段', order: 1 },
  '/student/task-select': { stage: '需求分析阶段', order: 2 },
  '/student/task-split': { stage: '需求分析阶段', order: 3 },
  '/student/scheme-upload': { stage: '方案设计阶段', order: 4 },
  '/student/scheme-detail': { stage: '方案设计阶段', order: 5 },
  '/student/my-score-result': { stage: '方案设计阶段', order: 6 }
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

// 处理下拉框的路由切换
const handleNavigate = (event) => {
  const targetRoute = event.target.value
  if (targetRoute) {
    router.push(targetRoute)
  }
}

// 跳转到首页
const navigateToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.min-h-screen {
    height: 100%;
    overflow: hidden;
    .w-full {
        height: 100%;
        .head {
            flex-shrink: 0;
        }
    }
}

/* Toast 动画 */
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
</style>

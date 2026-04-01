<template>
  <div class="min-h-screen p-4 flex justify-center items-start relative bg-[#121417] text-[#d1d5db]">
    <div class="w-full max-w-full bg-darkBg border border-accentGreen rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
      <div class="flex justify-between items-center px-6 py-4 border-b border-borderColor head">
        <div @click="navigateToHome" class="flex items-center space-x-2 text-accentGreen font-bold text-lg tracking-wider cursor-pointer hover:text-accentGreenDark transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke-width="2"></circle></svg>
            <span>教师控制台 <span class="text-textMuted text-sm font-normal ml-2">| {{ currentStage }}</span></span>
        </div>
        
        <div class="flex items-center space-x-4 text-sm text-textMuted">
            
            <select @change="handleNavigate" class="bg-cardInnerBg border border-borderColor text-textMain text-xs rounded px-3 py-1.5 outline-none appearance-none cursor-pointer hover:border-accentGreen transition" :value="route.path">
                <option v-for="item in menuItems" :key="item.value" :value="item.value">
                    {{ item.label }}
                </option>
            </select>

            <!-- <button @click="isModalOpen = true" class="bg-accentGreen hover:bg-accentGreenDark text-white px-5 py-1.5 rounded text-sm font-bold shadow-[0_0_12px_rgba(35,181,134,0.4)] transition flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                <span>发布任务</span>
            </button> -->
            
            <div class="h-4 w-px bg-accentGreen/30 mx-2"></div>

            <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"></rect><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 2v4M8 2v4M3 10h18"></path></svg>
                <span>{{ currentTime }}</span>
            </div>
            <button @click="handleRefreshData" class="bg-accentGreenDark/20 text-accentGreen border border-accentGreen px-3 py-1.5 rounded text-xs hover:bg-accentGreen/30 transition">
                刷新数据
            </button>
        </div>
      </div>

      <router-view />

    </div>

    <transition name="toast">
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
    </transition>

    <div v-show="isModalOpen" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm transition-opacity">
        <div class="bg-panelBg border border-accentGreen rounded-xl w-[550px] shadow-2xl flex flex-col overflow-hidden">
            <div class="px-6 py-4 border-b border-borderColor flex justify-between items-center bg-cardInnerBg">
                <h3 class="text-lg font-bold text-white flex items-center">
                    <svg class="w-5 h-5 text-accentGreen mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    发布新实验任务
                </h3>
                <button @click="isModalOpen = false" class="text-textMuted hover:text-white transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div>
                    <label class="block text-sm text-gray-300 mb-1">主线任务 (必做)</label>
                    <input type="text" value="无人机通信加密设计" class="w-full bg-darkBg border border-borderColor text-white rounded px-3 py-2 text-sm outline-none focus:border-accentGreen transition" readonly>
                </div>
                <div>
                    <label class="block text-sm text-gray-300 mb-1">支线任务 (4选1)</label>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div class="bg-darkBg border border-borderColor rounded px-3 py-2 text-gray-400 flex items-center"><span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>低功耗优化</div>
                        <div class="bg-darkBg border border-borderColor rounded px-3 py-2 text-gray-400 flex items-center"><span class="w-2 h-2 rounded-full bg-red-500 mr-2"></span>侧信道防护</div>
                        <div class="bg-darkBg border border-borderColor rounded px-3 py-2 text-gray-400 flex items-center"><span class="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>抗重放攻击</div>
                        <div class="bg-darkBg border border-borderColor rounded px-3 py-2 text-gray-400 flex items-center"><span class="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>后量子算法适配</div>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <div class="flex-1">
                        <label class="block text-sm text-gray-300 mb-1">当前阶段</label>
                        <input type="text" :value="currentStage" class="w-full bg-darkBg border border-borderColor text-white rounded px-3 py-2 text-sm outline-none focus:border-accentGreen transition" readonly>
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm text-gray-300 mb-1">阶段时长</label>
                        <input type="text" value="5 分钟" class="w-full bg-darkBg border border-borderColor text-white rounded px-3 py-2 text-sm outline-none focus:border-accentGreen transition">
                    </div>
                </div>
                <div>
                    <label class="block text-sm text-gray-300 mb-1">AI 资料推送绑定</label>
                    <div class="w-full bg-darkBg border border-borderColor text-gray-400 rounded px-3 py-2 text-sm flex items-center">
                        <svg class="w-4 h-4 text-accentGreen mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        已自动关联多模态 AI 资料库与推送引擎
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 border-t border-borderColor flex justify-end space-x-3 bg-cardInnerBg">
                <button @click="isModalOpen = false" class="px-4 py-2 rounded text-sm text-textMain bg-darkBg border border-borderColor hover:bg-panelBg transition">取消</button>
                <button @click="isModalOpen = false" class="px-4 py-2 rounded text-sm text-white bg-accentGreen hover:bg-accentGreenDark font-bold shadow-lg transition">立即发布并推给学生</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isModalOpen = ref(false)
const currentTime = ref('')
const showRefreshToast = ref(false)
const refreshToastSuccess = ref(true)

// 路由与阶段映射
const routeStageMap = {
  '/teacher/task-publish': { stage: '需求分析阶段', order: 1 },
  '/teacher/demand-summary': { stage: '需求分析阶段', order: 2 },
  '/teacher/demand-split': { stage: '需求分析阶段', order: 3 },
  '/teacher/task-split': { stage: '需求分析阶段', order: 4 },
  '/teacher/scheme-split': { stage: '方案设计阶段', order: 5 },
  '/teacher/ai-evaluate': { stage: '方案设计阶段', order: 6 },
  '/teacher/scheme-detail': { stage: '方案设计阶段', order: 7 },
  '/teacher/simulation': { stage: '仿真推演阶段', order: 8 }
}

// 所有菜单项
const allMenuItems = [
  { value: '/teacher/task-publish', label: '需求分析阶段：教师任务发布页', order: 1 },
  { value: '/teacher/demand-summary', label: '需求分析阶段：教师需求汇总页', order: 2 },
  // { value: '/teacher/demand-split', label: '需求分析阶段：3. 4组需求分屏', order: 3 },
  { value: '/teacher/task-split', label: '需求分析阶段：4组任务分屏', order: 4 },
  { value: '/teacher/scheme-split', label: '方案设计阶段：4组方案分屏', order: 5 },
  { value: '/teacher/ai-evaluate', label: '方案设计阶段：AI评估', order: 6 },
  { value: '/teacher/scheme-detail', label: '方案设计阶段：方案详情', order: 7 },
  { value: '/teacher/simulation', label: '仿真推演阶段：仿真性能', order: 8 }
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
})

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

// 跳转到分组推荐页面
const navigateToGroupRecommendation = () => {
  router.push('/group-recommendation')
}

// 跳转到首页
const navigateToHome = () => {
  router.push('/')
}

// 刷新数据
const handleRefreshData = async () => {
  try {
    await fetch('http://localhost:3000/api/state/reset', {
      method: 'POST'
    });
    refreshToastSuccess.value = true;
    showRefreshToast.value = true;
    setTimeout(() => {
      showRefreshToast.value = false;
    }, 2000);
  } catch (error) {
    console.error('刷新失败', error);
    refreshToastSuccess.value = false;
    showRefreshToast.value = true;
    setTimeout(() => {
      showRefreshToast.value = false;
    }, 2000);
  }
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
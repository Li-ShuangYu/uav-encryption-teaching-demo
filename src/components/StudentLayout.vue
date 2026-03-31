<template>
  <div class="min-h-screen p-4 flex justify-center items-start relative bg-[#121417] text-[#d1d5db]">
    <div class="w-full max-w-full bg-darkBg border border-borderColor rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
      <div class="flex justify-between items-center px-6 py-4 border-b border-borderColor head">
        <div @click="navigateToHome" class="flex items-center space-x-2 text-accentGreen font-bold text-lg tracking-wider cursor-pointer hover:text-accentGreenDark transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke-width="2"></circle></svg>
            <span>学习工作台 <span class="text-textMuted text-sm font-normal ml-2">| 需求分析阶段</span></span>
        </div>
        
        <div class="flex items-center space-x-4 text-sm text-textMuted">
            <select @change="handleNavigate" class="bg-cardInnerBg border border-borderColor text-textMain text-xs rounded px-3 py-1.5 outline-none appearance-none cursor-pointer hover:border-accentGreen transition">
                <option value="/student/task-receive">需求分析阶段：1. 任务接收与需求提交</option>
                <option value="/student/scheme-upload">方案设计阶段：2. 方案上传与评估结果</option>
            </select>

            <div class="h-4 w-px bg-borderColor mx-2"></div>

            <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"></rect><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 2v4M8 2v4M3 10h18"></path></svg>
                <span>2026-03-30 10:30</span>
            </div>
            <button class="bg-accentGreenDark/20 text-accentGreen border border-accentGreen px-3 py-1.5 rounded text-xs hover:bg-accentGreen/30 transition">
                刷新数据
            </button>
        </div>
      </div>

      <router-view />

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
</style>
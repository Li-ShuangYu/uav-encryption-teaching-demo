<template>
  <div class="min-h-screen flex flex-col bg-[#121417] text-[#d1d5db] font-sans p-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">管理员控制台</h1>
      <p class="text-gray-400 text-lg">快速导航到所有页面</p>
    </div>
    
    <div class="max-w-7xl mx-auto w-full space-y-8">
      <div class="bg-cardInnerBg border border-borderColor rounded-xl p-6">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <svg class="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          教师端页面
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            v-for="page in teacherPages" 
            :key="page.path"
            @click="navigateTo(page.path)" 
            class="h-32 bg-panelBg border border-borderColor rounded-lg shadow-lg hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
          >
            <div class="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mb-3 group-hover:bg-green-900/50 transition">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="page.icon"></path>
              </svg>
            </div>
            <h3 class="text-base font-bold text-white group-hover:text-accentGreen transition text-center px-2">{{ page.name }}</h3>
          </button>
        </div>
      </div>

      <div class="bg-cardInnerBg border border-borderColor rounded-xl p-6">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <svg class="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          学生端页面
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            v-for="page in studentPages" 
            :key="page.path"
            @click="navigateTo(page.path)" 
            class="h-32 bg-panelBg border border-borderColor rounded-lg shadow-lg hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
          >
            <div class="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-3 group-hover:bg-blue-900/50 transition">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="page.icon"></path>
              </svg>
            </div>
            <h3 class="text-base font-bold text-white group-hover:text-accentGreen transition text-center px-2">{{ page.name }}</h3>
          </button>
        </div>
      </div>

      <div class="bg-cardInnerBg border border-borderColor rounded-xl p-6">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <svg class="w-6 h-6 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          其他页面
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            v-for="page in otherPages" 
            :key="page.path"
            @click="navigateTo(page.path)" 
            class="h-32 bg-panelBg border border-borderColor rounded-lg shadow-lg hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
          >
            <div class="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-3 group-hover:bg-purple-900/50 transition">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="page.icon"></path>
              </svg>
            </div>
            <h3 class="text-base font-bold text-white group-hover:text-accentGreen transition text-center px-2">{{ page.name }}</h3>
          </button>
        </div>
      </div>
    </div>

    <div class="text-center mt-8">
      <button 
        @click="goBack" 
        class="px-8 py-3 bg-panelBg border border-borderColor rounded-lg text-white font-bold hover:border-accentGreen transition"
      >
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const teacherPages = [
  { name: '任务发布', path: '/teacher/task-publish', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  { name: '需求汇总', path: '/teacher/demand-summary', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { name: '需求分屏', path: '/teacher/demand-split', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { name: '任务分屏', path: '/teacher/task-split', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  { name: '方案分屏', path: '/teacher/scheme-split', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { name: 'AI评估', path: '/teacher/ai-evaluate', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { name: '仿真推演', path: '/teacher/simulation', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: '方案详情', path: '/teacher/scheme-detail', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
]

const studentPages = [
  { name: '任务接收', path: '/student/task-receive', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
  { name: '任务选择', path: '/student/task-select', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { name: '方案上传', path: '/student/scheme-upload', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' }
]

const otherPages = [
  { name: '学生首页', path: '/student-home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: '分组推荐', path: '/group-recommendation', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
]

const navigateTo = (path) => {
  router.push(path)
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.bg-cardInnerBg { background-color: #232930; }
.bg-panelBg { background-color: #1c2126; }
.border-borderColor { border-color: #2d353e; }
.text-accentGreen { color: #23b586; }
</style>

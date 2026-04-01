<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#121417] text-[#d1d5db] font-sans p-4">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-white mb-4">无人机密码系统设计实战</h1>
      <p class="text-gray-400 text-lg">请选择您要访问的页面</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
      <!-- 教师端页面 -->
      <button 
        @click="navigateTo('/teacher/task-publish')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-900/50 transition">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">教师任务发布</h2>
        <p class="text-gray-400 text-sm mt-2">需求分析阶段</p>
      </button>
      
      <button 
        @click="navigateTo('/teacher/demand-summary')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-900/50 transition">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">需求汇总页</h2>
        <p class="text-gray-400 text-sm mt-2">需求分析阶段</p>
      </button>
      
      <button 
        @click="navigateTo('/teacher/task-split')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-900/50 transition">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">4组任务分屏</h2>
        <p class="text-gray-400 text-sm mt-2">需求分析阶段</p>
      </button>
      
      <button 
        @click="navigateTo('/teacher/scheme-split')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-900/50 transition">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">4组方案分屏</h2>
        <p class="text-gray-400 text-sm mt-2">方案设计阶段</p>
      </button>
      
      <button 
        @click="navigateTo('/teacher/ai-evaluate')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-900/50 transition">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">AI评估</h2>
        <p class="text-gray-400 text-sm mt-2">方案设计阶段</p>
      </button>
      
      <button 
        @click="navigateTo('/teacher/simulation')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-900/50 transition">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">仿真性能</h2>
        <p class="text-gray-400 text-sm mt-2">仿真推演阶段</p>
      </button>
      
      <!-- 学生端页面 -->
      <button 
        @click="navigateTo('/student/task-receive')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">任务接收与需求提交</h2>
        <p class="text-gray-400 text-sm mt-2">需求分析阶段</p>
      </button>
      
      <button 
        @click="navigateTo('/student/scheme-upload')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">方案上传与评估结果</h2>
        <p class="text-gray-400 text-sm mt-2">方案设计阶段</p>
      </button>
      
      <!-- 其他页面 -->
      <button 
        @click="navigateTo('/group-recommendation')" 
        class="w-full h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-900/50 transition">
          <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">分组推荐</h2>
        <p class="text-gray-400 text-sm mt-2">优势能力分层</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
/* 页面样式 */
</style>
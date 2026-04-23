<template>
  <div class="min-h-screen flex flex-col bg-[#0f1114] text-[#d1d5db] font-sans p-8 selection:bg-blue-500/30">
    <div class="flex justify-between items-center mb-10">
      <button 
        @click="goBack" 
        class="px-6 py-2.5 bg-transparent border border-[#2d353e] rounded-full text-white text-[14px] font-bold hover:bg-white/5 hover:border-white/40 transition-all duration-300"
      >
        返回系统首页
      </button>
      <div class="text-center">
        <h1 class="text-[42px] font-bold text-white mb-3 tracking-wide">无人机密码系统设计实战</h1>
        <p class="text-gray-400 text-[18px]">管理员控制台 · 模块化导航</p>
      </div>
      <div class="w-32"></div>
    </div>
    
    <div class="max-w-7xl mx-auto w-full flex flex-col items-center">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
        <div 
          @click="activeCategory = 'student'"
          class="group relative h-72 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden border"
          :class="activeCategory === 'student' ? 'bg-[#1a1f26] border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-[1.02]' : 'bg-[#161a1f] border-[#2d353e] hover:border-blue-500/50'"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="w-24 h-24 rounded-full mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
               :class="activeCategory === 'student' ? 'bg-blue-500/20' : 'bg-[#1c2127]'">
            <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <h2 class="text-[26px] font-bold text-white mb-2">学生端页面</h2>
          <div v-if="activeCategory === 'student'" class="absolute bottom-0 w-full h-1 bg-blue-500"></div>
        </div>

        <div 
          @click="activeCategory = 'teacher'"
          class="group relative h-72 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden border"
          :class="activeCategory === 'teacher' ? 'bg-[#1a1f26] border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)] scale-[1.02]' : 'bg-[#161a1f] border-[#2d353e] hover:border-green-500/50'"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="w-24 h-24 rounded-full mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
               :class="activeCategory === 'teacher' ? 'bg-green-500/20' : 'bg-[#1c2127]'">
            <svg class="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-[26px] font-bold text-white mb-2">教师端页面</h2>
          <div v-if="activeCategory === 'teacher'" class="absolute bottom-0 w-full h-1 bg-green-500"></div>
        </div>

        <div 
          @click="activeCategory = 'other'"
          class="group relative h-72 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden border"
          :class="activeCategory === 'other' ? 'bg-[#1a1f26] border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] scale-[1.02]' : 'bg-[#161a1f] border-[#2d353e] hover:border-purple-500/50'"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="w-24 h-24 rounded-full mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
               :class="activeCategory === 'other' ? 'bg-purple-500/20' : 'bg-[#1c2127]'">
            <svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h2 class="text-[26px] font-bold text-white mb-2">系统管理与其他</h2>
          <div v-if="activeCategory === 'other'" class="absolute bottom-0 w-full h-1 bg-purple-500"></div>
        </div>
      </div>

      <transition name="fade-slide" mode="out-in">
        <div :key="activeCategory" class="w-full bg-[#161a1f]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-10 min-h-[400px] shadow-2xl relative overflow-hidden">
          <div class="absolute -top-24 -right-24 w-64 h-64 blur-[120px] rounded-full opacity-20" :class="currentGlowColor"></div>
          
          <div class="flex items-end justify-between mb-8 border-b border-white/10 pb-6">
            <div>
              <h3 class="text-[24px] font-bold text-white flex items-center">
                <span class="w-2 h-8 mr-3 rounded-full" :class="currentThemeBg"></span>
                {{ categoryTitle }}
              </h3>
              <p class="text-gray-500 mt-1 text-[15px]">共找到 {{ activeCategory === 'other' ? flattenedOtherPages.length : currentPages.length }} 个相关页面</p>
            </div>
            <div class="hidden sm:block text-xs font-mono text-gray-600">SYSTEM_MODULE_V2.0</div>
          </div>

          <div v-if="activeCategory !== 'other'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <button 
              v-for="page in currentPages" 
              :key="page.path"
              @click="navigateTo(page.path)" 
              class="group/item flex items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 text-left"
              :class="{ 'highlight-btn': page.highlight }"
            >
              <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-[#0f1114] group-hover/item:scale-110 transition-transform">
                <svg class="w-5 h-5" :class="currentThemeText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="page.icon"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-[15px] font-semibold text-gray-200 group-hover/item:text-white truncate transition-colors">{{ page.name }}</h4>
                <span class="text-[11px] text-gray-600 uppercase tracking-tighter group-hover/item:text-gray-400">Navigate to</span>
              </div>
              <svg class="w-4 h-4 text-gray-700 group-hover/item:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <div v-else class="flex flex-col gap-10">
            <div v-for="(group, index) in groupedOtherPages" :key="index">
              <h4 class="text-[18px] font-bold text-gray-300 mb-4 flex items-center">
                <span class="w-1.5 h-5 bg-purple-500/80 mr-3 rounded-full"></span>
                {{ group.title }}
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <button 
                  v-for="page in group.pages" 
                  :key="page.path"
                  @click="navigateTo(page.path)" 
                  class="group/item flex items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 text-left"
                  :class="{ 'highlight-btn': page.highlight }"
                >
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-[#0f1114] group-hover/item:scale-110 transition-transform">
                    <svg class="w-5 h-5" :class="currentThemeText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="page.icon"></path>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-[15px] font-semibold text-gray-200 group-hover/item:text-white truncate transition-colors">{{ page.name }}</h4>
                    <span class="text-[11px] text-gray-600 uppercase tracking-tighter group-hover/item:text-gray-400">Navigate to</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-700 group-hover/item:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 当前激活的类别：'student' | 'teacher' | 'other'
const activeCategory = ref('student')

// 学生和老师页面保持不变
const teacherPages = [
  { name: '需求汇总页', path: '/teacher/demand-summary', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { name: '4组学生任务展示页', path: '/teacher/task-split', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  { name: '4组学生方案展示页', path: '/teacher/scheme-split', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { name: '4组学生方案AI评估展示页', path: '/teacher/ai-evaluate', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { name: '学生方案打分页', path: '/teacher/scheme-detail', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: '学生方案总分页', path: '/teacher/group-score-overview', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' }
]

const studentPages = [
  { name: '需求提交页', path: '/student/task-receive', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
  { name: '任务接收与任务选择页', path: '/student/task-select', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { name: '任务详情页', path: '/student/task-split', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  { name: '方案上传页', path: '/student/scheme-upload', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  { name: '组间方案评分页', path: '/student/scheme-detail', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: '方案总分页', path: '/student/my-score-result', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  { name: 'AI智能助手', path: '/student-debug/robot-debug', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { name: '代码部署', path: '/student-debug/deploy', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { name: '机器人调试', path: '/student-debug/debug', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
]

// 将其他页面按要求划分为三大类，并去除重复的路径项
const groupedOtherPages = [
  {
    title: '📊 学生/班级画像页面',
    pages: [
      { name: '学情诊断报告', path: '/student-diagnostic-report-demo', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', highlight: true },
      { name: '教师学情诊断', path: '/teacher-diagnostic-report', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', highlight: true },
      { name: '班级能力画像', path: '/student-archive/class-competency/class1', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { name: '学生能力画像', path: '/student-archive/competrncy/101', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { name: '分组推荐', path: '/group-recommendation', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { name: '学生课后情况', path: '/teacher/student-group', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
    ]
  },
  {
    title: '🤖 智能体类页面',
    pages: [
            { name: '3x3矩阵管理', path: '/matrix-3x3', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },

      { name: '课程知识图谱', path: '/showcase/course-knowledge-graph', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
      { name: '课程知识', path: '/showcase/course-knowledge', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      ]
  },
  {
    title: '🛠️ 测试页面 (含静态Demo与基础页面)',
    pages: [
      { name: '3x3矩阵html', path: '/10_3x3矩阵.html', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
      { name: '仿真推演', path: '/teacher/simulation', icon: 'M9.75 17L9 20l-1 1h8l-1 1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { name: '学情分析分组页', path: '/teacher/task-publish', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
      { name: '4x5矩阵', path: '/8_4x5矩阵.html', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
      { name: '图片播放', path: '/图片播放.html', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { name: '需求分屏', path: '/teacher/demand-split', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1 1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1 1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1 1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: '首页', path: '/initial', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
      { name: '学生画像第一版', path: '/学生画像第一版.html', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { name: '学生画像', path: '/profile-dashboard', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { name: '学生全息数字档案', path: '/学生全息数字档案.html', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { name: '学生数字档案', path: '/学生数字档案.html', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { name: '数字档案第一版', path: '/数字档案第一版.html', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { name: '暗黑科技风教育数据画像', path: '/暗黑科技风神秘教育数据画像.html', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
      { name: '学生首页', path: '/student-home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: '学生舱', path: '/student-cabin', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
      { name: '教师构建器', path: '/teacher-builder', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { name: '教师实时监控', path: '/teacher-live-monitor', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { name: '密码系统设计分层', path: '/密码系统设计分层.html', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
    ]
  }
]

// 为了在 header 中计算"其他"分类的总数量
const flattenedOtherPages = computed(() => groupedOtherPages.flatMap(group => group.pages))

// 逻辑处理
const currentPages = computed(() => {
  if (activeCategory.value === 'teacher') return teacherPages
  if (activeCategory.value === 'student') return studentPages
  // 如果当前是 other，模板会单独通过 groupedOtherPages 渲染，这里返回空数组或扁平化数组均可
  return [] 
})

const categoryTitle = computed(() => {
  const map = { student: '学生工作站', teacher: '教授控制台', other: '系统管理员' }
  return map[activeCategory.value]
})

// 动态样式计算
const currentThemeBg = computed(() => {
  const map = { student: 'bg-blue-500', teacher: 'bg-green-500', other: 'bg-purple-500' }
  return map[activeCategory.value]
})

const currentThemeText = computed(() => {
  const map = { student: 'text-blue-400', teacher: 'text-green-400', other: 'text-purple-400' }
  return map[activeCategory.value]
})

const currentGlowColor = computed(() => {
  const map = { student: 'bg-blue-600', teacher: 'bg-green-600', other: 'bg-purple-600' }
  return map[activeCategory.value]
})

const navigateTo = (path) => {
  if (path.endsWith('.html')) {
    // 在本地开发环境中直接使用相对路径
    const fullPath = path.startsWith('/') ? path : '/' + path
    window.open(fullPath, '_blank')
  } else {
    router.push(path)
  }
}

const goBack = () => router.push('/')
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

/* 高亮按钮呼吸动画 */
.highlight-btn {
  position: relative;
  border: 1px solid rgba(59, 130, 246, 0.5) !important;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15)) !important;
  animation: breathe-glow 2s ease-in-out infinite;
}

.highlight-btn::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 14px;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.3));
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
  z-index: -1;
  opacity: 0.6;
}

@keyframes breathe-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.3), 0 0 10px rgba(59, 130, 246, 0.1);
  }
  50% {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 25px rgba(59, 130, 246, 0.2);
  }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
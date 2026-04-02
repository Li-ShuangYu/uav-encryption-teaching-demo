<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#121417] text-[#d1d5db] font-sans">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-white mb-4">无人机密码系统设计实战</h1>
      <p class="text-gray-400 text-lg">请选择您的身份</p>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-6">
      <button 
        @click="navigateToStudent" 
        class="w-64 h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">学生</h2>
        <p class="text-gray-400 text-sm mt-2">进入学习工作台</p>
      </button>
      
      <button 
        @click="navigateToTeacher" 
        class="w-64 h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-900/50 transition">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">教授</h2>
        <p class="text-gray-400 text-sm mt-2">进入教师控制台</p>
      </button>

      <button 
        @click="navigateToAdmin" 
        class="w-64 h-40 bg-cardInnerBg border border-borderColor rounded-xl shadow-xl hover:border-accentGreen transition flex flex-col items-center justify-center cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-900/50 transition">
          <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white group-hover:text-accentGreen transition">管理员</h2>
        <p class="text-gray-400 text-sm mt-2">进入管理控制台</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToStudent = () => {
  localStorage.removeItem('selectedGroupInfo')
  router.push('/student/task-receive')
};

const navigateToTeacher = () => {
  // 上传教师身份信息到localStorage
  const teacherInfo = {
    role: 'teacher',
    name: '教师',
    selectTime: new Date().toISOString()
  }
  localStorage.setItem('selectedGroupInfo', JSON.stringify(teacherInfo))
  router.push('/group-recommendation')
}

const navigateToAdmin = () => {
  // 上传管理员身份信息到localStorage
  const adminInfo = {
    role: 'admin',
    name: '管理员',
    selectTime: new Date().toISOString()
  }
  localStorage.setItem('selectedGroupInfo', JSON.stringify(adminInfo))
  router.push('/admin')
}
</script>

<style scoped>
/* 页面样式 */
</style>
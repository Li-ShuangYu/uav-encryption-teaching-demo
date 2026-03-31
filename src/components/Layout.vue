<template>
  <div class="min-h-screen p-4 flex justify-center items-start relative bg-[#121417] text-[#d1d5db]">
    <div class="w-full max-w-full bg-darkBg border border-borderColor rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
      <div class="flex justify-between items-center px-6 py-4 border-b border-borderColor">
        <div class="flex items-center space-x-2 text-accentGreen font-bold text-lg tracking-wider">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke-width="2"></circle></svg>
            <span>教师控制台 <span class="text-textMuted text-sm font-normal ml-2">| 需求分析阶段</span></span>
        </div>
        
        <div class="flex items-center space-x-4 text-sm text-textMuted">
            <select @change="handleNavigate" class="bg-cardInnerBg border border-borderColor text-textMain text-xs rounded px-3 py-1.5 outline-none appearance-none cursor-pointer hover:border-accentGreen transition">
                <option value="/teacher/task-publish">实验阶段：1. 需求分析</option>
                <option value="/teacher/demand-summary">实验阶段：1. 需求汇总</option>
                <option value="/teacher/demand-split">实验阶段：1. 4组需求分屏</option>
                <option value="/student/task-receive">实验阶段：1. 学生工作台</option>
                <option value="/teacher/scheme-split">实验阶段：2. 4组方案分屏</option>
                <option value="/teacher/ai-evaluate">实验阶段：2. AI评估</option>
                <option value="/student/scheme-upload">实验阶段：2. 学生方案上传</option>
                <option value="/teacher/simulation">实验阶段：3. 仿真性能</option>
            </select>

            <!-- <button @click="isModalOpen = true" class="bg-accentGreen hover:bg-accentGreenDark text-white px-5 py-1.5 rounded text-sm font-bold shadow-[0_0_12px_rgba(35,181,134,0.4)] transition flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                <span>发布任务</span>
            </button> -->
            
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

    <div v-show="isModalOpen" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm transition-opacity">
        <div class="bg-panelBg border border-borderColor rounded-xl w-[550px] shadow-2xl flex flex-col overflow-hidden">
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
                        <input type="text" value="阶段1：需求分析" class="w-full bg-darkBg border border-borderColor text-white rounded px-3 py-2 text-sm outline-none focus:border-accentGreen transition" readonly>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isModalOpen = ref(false)

// 处理下拉框的路由切换
const handleNavigate = (event) => {
  const targetRoute = event.target.value
  if (targetRoute) {
    router.push(targetRoute)
  }
}
</script>
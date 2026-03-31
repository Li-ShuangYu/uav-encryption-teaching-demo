<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col p-4 gap-4 bg-darkBg text-textMain font-sans box-border">
    
    <div class="flex-none bg-cardInnerBg border border-borderColor rounded-xl p-3 shadow-md">
      <div class="grid grid-cols-3 lg:grid-cols-6 gap-y-2 gap-x-4 text-[13px] xl:text-[14px]">
        <div class="flex items-center"><span class="text-textMuted whitespace-nowrap mr-2 text-right">课程名称：</span><span class="text-white font-bold truncate">无人机密码系统设计实战</span></div>
        <div class="flex items-center"><span class="text-textMuted whitespace-nowrap mr-2 text-right">实现阶段：</span><span class="text-white font-bold truncate">第一阶段：需求分析</span></div>
        <div class="flex items-center"><span class="text-textMuted whitespace-nowrap mr-2 text-right">学生人数：</span><span class="text-white font-bold truncate">28 人</span></div>
        
        <div class="flex items-center"><span class="text-textMuted whitespace-nowrap mr-2 text-right">当前里程：</span><span class="text-white font-bold truncate">无人机通信加密设计</span></div>
        <div class="flex items-center"><span class="text-textMuted whitespace-nowrap mr-2 text-right">分组设置：</span><span class="text-white font-bold truncate">4 个实战小组</span></div>
        <div class="flex items-center"><span class="text-textMuted whitespace-nowrap mr-2 text-right">课时时长：</span><span class="text-white font-bold truncate">45 分钟</span></div>
      </div>
    </div>

    <div class="flex-1 flex gap-4 min-h-0">
      
      <div class="w-[32%] lg:w-[28%] bg-cardInnerBg border border-borderColor rounded-xl p-3 xl:p-4 flex flex-col gap-3 min-h-0 shadow-md">
        <div class="flex items-center mb-1 flex-none">
          <div class="w-1.5 h-4 bg-warningOrg mr-2 rounded-full"></div>
          <h2 class="text-[15px] xl:text-[16px] font-bold text-white tracking-wide">【系统需求点梳理】</h2>
        </div>
        
        <div class="flex-1 flex flex-col gap-3 min-h-0">
          <div class="flex-1 bg-panelBg border-l-4 border-warningOrg rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-warningOrg font-bold text-[14px] mb-1 flex-none">【需求点一】</div>
            <div class="text-gray-200 text-[12px] xl:text-[13px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              高保密性要求。无人机飞控指令与传输数据需具备极强的抗窃听能力，加密机制需杜绝非法第三方破解与信息窃取。
            </div>
          </div>

          <div class="flex-1 bg-panelBg border-l-4 border-infoBlue rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-infoBlue font-bold text-[14px] mb-1 flex-none">【需求点二】</div>
            <div class="text-gray-200 text-[12px] xl:text-[13px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              高完整性要求。需建立数据校验机制，防止飞行坐标、控制指令在传输过程中被恶意篡改，保障无人机飞行安全。
            </div>
          </div>

          <div class="flex-1 bg-panelBg border-l-4 border-accentGreen rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-accentGreen font-bold text-[14px] mb-1 flex-none">【需求点三】</div>
            <div class="text-gray-200 text-[12px] xl:text-[13px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              低时延高可用要求。无人机高速移动场景下，加密握手与加解密处理时延需控制在毫秒级，保障指令实时响应。
            </div>
          </div>

          <div class="flex-1 bg-panelBg border-l-4 border-dangerRed rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-dangerRed font-bold text-[14px] mb-1 flex-none">【需求点四】</div>
            <div class="text-gray-200 text-[12px] xl:text-[13px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              低功耗适配要求。受限于无人机机载电池容量，加密机制需严格控制额外功耗，适配嵌入式设备算力约束。
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 bg-cardInnerBg border border-borderColor rounded-xl p-3 xl:p-4 flex flex-col gap-4 min-h-0 shadow-md">
        
        <div class="flex-none flex flex-col gap-2">
          <div class="flex items-center flex-none">
            <div class="w-1.5 h-4 bg-accentGreen mr-2 rounded-full"></div>
            <h2 class="text-[15px] xl:text-[16px] font-bold text-white tracking-wide">【主线任务汇总】</h2>
          </div>
          <div class="w-full bg-[#121417] border border-[#00f0ff]/30 text-gray-200 text-[13px] xl:text-[14px] rounded-lg p-3 xl:p-4 font-medium leading-relaxed shadow-inner">
            完成无人机通信加密系统全流程设计，覆盖需求分析、方案选型、仿真验证全环节，输出可落地的加密安全方案，满足上述 4 项需求点的全部要求。
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-2 min-h-0">
          <div class="flex items-center flex-none mt-1">
            <div class="w-1.5 h-4 bg-infoBlue mr-2 rounded-full"></div>
            <h2 class="text-[15px] xl:text-[16px] font-bold text-white tracking-wide">【支线任务分配】</h2>
          </div>
          
          <div class="flex-1 grid grid-cols-2 gap-3 min-h-0">
            <div class="bg-panelBg border border-borderColor rounded-lg p-3 hover:border-accentGreen transition duration-300 flex flex-col min-h-0 group">
              <div class="text-white font-bold text-[14px] xl:text-[15px] mb-2 flex items-center flex-none">
                <span class="bg-gray-700 text-gray-200 px-1.5 py-0.5 rounded text-[12px] mr-2 group-hover:bg-accentGreen group-hover:text-black transition">组1</span>
                支线方向 1：低功耗优化
              </div>
              <div class="flex-1 bg-[#121417] border border-transparent group-hover:border-accentGreen/30 text-gray-300 text-[12px] xl:text-[13px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                聚焦加密算法轻量化选型与密钥管理流程优化，在保障安全的前提下，最大限度降低加密机制带来的额外功耗。
              </div>
            </div>

            <div class="bg-panelBg border border-borderColor rounded-lg p-3 hover:border-infoBlue transition duration-300 flex flex-col min-h-0 group">
              <div class="text-white font-bold text-[14px] xl:text-[15px] mb-2 flex items-center flex-none">
                <span class="bg-gray-700 text-gray-200 px-1.5 py-0.5 rounded text-[12px] mr-2 group-hover:bg-infoBlue group-hover:text-black transition">组2</span>
                支线方向 2：侧信道防护
              </div>
              <div class="flex-1 bg-[#121417] border border-transparent group-hover:border-infoBlue/30 text-gray-300 text-[12px] xl:text-[13px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                针对无人机嵌入式设备的物理泄露风险，设计轻量级掩码防护机制，抵御侧信道攻击，提升系统物理安全。
              </div>
            </div>

            <div class="bg-panelBg border border-borderColor rounded-lg p-3 hover:border-warningOrg transition duration-300 flex flex-col min-h-0 group">
              <div class="text-white font-bold text-[14px] xl:text-[15px] mb-2 flex items-center flex-none">
                <span class="bg-gray-700 text-gray-200 px-1.5 py-0.5 rounded text-[12px] mr-2 group-hover:bg-warningOrg group-hover:text-black transition">组3</span>
                支线方向 3：抗重放攻击
              </div>
              <div class="flex-1 bg-[#121417] border border-transparent group-hover:border-warningOrg/30 text-gray-300 text-[12px] xl:text-[13px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                设计基于随机数 + 序列号的双向认证机制，杜绝非法重放攻击，保障无人机通信链路的接入安全与指令合法性。
              </div>
            </div>

            <div class="bg-panelBg border border-borderColor rounded-lg p-3 hover:border-purpleIcon transition duration-300 flex flex-col min-h-0 group">
              <div class="text-white font-bold text-[14px] xl:text-[15px] mb-2 flex items-center flex-none">
                <span class="bg-gray-700 text-gray-200 px-1.5 py-0.5 rounded text-[12px] mr-2 group-hover:bg-purpleIcon group-hover:text-white transition">组4</span>
                支线方向 4：后量子算法适配
              </div>
              <div class="flex-1 bg-[#121417] border border-transparent group-hover:border-purpleIcon/30 text-gray-300 text-[12px] xl:text-[13px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                评估后量子加密算法在无人机场景的适配性，筛选轻量化格密码方案，保障系统在量子计算场景下的长期安全。
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <div class="flex-none flex justify-end items-center pt-1 px-2">
      <button 
        @click="handlePublish" 
        :disabled="isPublishing"
        :class="[
          'relative overflow-hidden bg-accentCyan text-black font-bold text-[15px] xl:text-[16px] px-8 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] tracking-widest transition transform border border-[#00f0ff] group',
          !isPublishing ? 'hover:scale-105 hover:bg-[#00d0dd]' : 'opacity-80 cursor-not-allowed'
        ]"
      >
        <div 
          class="absolute left-0 top-0 bottom-0 bg-white/40 transition-all ease-linear" 
          style="transition-duration: 2000ms;"
          :style="{ width: publishProgress + '%' }"
        ></div>
        <span class="relative z-10 flex items-center justify-center">
          <svg v-if="!isPublishing" class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          {{ isPublishing ? '任务发布中...' : '确认发布任务' }}
        </span>
      </button>
    </div>

    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
      <div class="bg-cardInnerBg border border-accentCyan rounded-xl p-8 w-full max-w-[500px] shadow-[0_0_30px_rgba(0,240,255,0.15)] relative transform scale-100 transition-transform">
        
        <button @click="closeModal" class="absolute top-4 right-4 text-textMuted hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 class="text-xl xl:text-2xl font-bold text-accentCyan mb-6 text-center tracking-widest">任务发布成功</h2>
        
        <div class="space-y-4 mb-8 pl-4">
          <div class="flex items-center text-gray-200 text-[15px] font-medium">
            <span class="text-accentGreen mr-3 text-xl">✅</span> 任务已同步至 4 个实战小组的学生端
          </div>
          <div class="flex items-center text-gray-200 text-[15px] font-medium">
            <span class="text-accentGreen mr-3 text-xl">✅</span> 需求点一～四已同步至学习工作台
          </div>
          <div class="flex items-center text-gray-200 text-[15px] font-medium">
            <span class="text-accentGreen mr-3 text-xl">✅</span> 主线任务与支线任务已下发完成
          </div>
        </div>

        <div class="flex justify-center">
          <button @click="confirmJump" class="bg-accentCyan text-black font-bold text-[15px] px-8 py-2.5 rounded-lg shadow-[0_0_10px_rgba(0,240,255,0.3)] tracking-wide transition transform hover:scale-105 hover:bg-[#00d0dd] border border-[#00f0ff]">
            确认并跳转至需求汇总页
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const isPublishing = ref(false)
const publishProgress = ref(0)
const showSuccessModal = ref(false)

const handlePublish = () => {
  if (isPublishing.value) return
  isPublishing.value = true
  
  setTimeout(() => {
    publishProgress.value = 100
  }, 50)

  setTimeout(() => {
    showSuccessModal.value = true
    setTimeout(() => {
      isPublishing.value = false
      publishProgress.value = 0
    }, 300)
  }, 2000)
}

const closeModal = () => {
  showSuccessModal.value = false
}

const confirmJump = () => {
  window.location.href = 'RequirementAnalysis.html'
}
</script>

<style scoped>
/* 隐藏滚动条，保留滑动功能 */
.scrollbar-hide::-webkit-scrollbar { 
  display: none; 
}
.scrollbar-hide { 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}
</style>
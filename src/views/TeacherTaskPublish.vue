<template>
  <div class="w-full h-screen overflow-hidden flex flex-col p-4 gap-4 bg-darkBg text-textMain font-sans box-border relative">
    
    <div v-if="isPublishing" class="absolute inset-0 z-[999] flex items-center justify-center bg-[#050b14]/70 backdrop-blur-sm">
      
      <div class="relative w-[500px] bg-[#0a111a]/95 border border-accentCyan/40 rounded-xl p-8 shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col items-center overflow-hidden">
        
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-accentCyan/10 to-transparent animate-[scan_2s_linear_infinite]"></div>
        
        <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accentCyan shadow-[-2px_-2px_10px_rgba(0,240,255,0.5)] rounded-tl-xl"></div>
        <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accentCyan shadow-[2px_-2px_10px_rgba(0,240,255,0.5)] rounded-tr-xl"></div>
        <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accentCyan shadow-[-2px_2px_10px_rgba(0,240,255,0.5)] rounded-bl-xl"></div>
        <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accentCyan shadow-[2px_2px_10px_rgba(0,240,255,0.5)] rounded-br-xl"></div>

        <div class="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div class="absolute inset-0 border-[3px] border-transparent border-t-accentCyan border-b-accentCyan rounded-full animate-[spin_3s_linear_infinite]"></div>
          <div class="absolute inset-3 border-[2px] border-transparent border-l-purpleIcon border-r-accentGreen rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <div class="absolute inset-6 bg-accentCyan/20 rounded-full animate-pulse blur-sm"></div>
          <svg class="w-8 h-8 text-white relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>

        <div class="relative z-10 w-full flex justify-between items-end mb-3 px-2">
          <div class="text-white text-lg font-bold tracking-[0.2em] flex items-center drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            <span class="text-accentCyan mr-2 font-mono">>_</span> 系统任务发布中
          </div>
          <div class="text-accentCyan font-mono text-3xl font-black drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
            {{ Math.round(publishProgress) }}<span class="text-lg">%</span>
          </div>
        </div>

        <div class="relative z-10 w-full h-4 bg-[#03060a] rounded-full border border-accentCyan/30 p-[2px] shadow-[0_0_10px_rgba(0,240,255,0.1)_inset]">
          <div 
            class="relative h-full rounded-full overflow-hidden bg-gradient-to-r from-purpleIcon via-accentCyan to-[#b3ffff] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(0,240,255,0.6)]" 
            :style="{ width: publishProgress + '%' }"
          >
            <div class="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent blur-[1px]"></div>
          </div>
        </div>

        <div class="relative z-10 mt-5 w-full bg-[#03060a] rounded border border-gray-800 p-2 text-[11px] text-accentCyan/60 font-mono text-left opacity-80 h-[48px] overflow-hidden">
          <div class="animate-pulse">
            <p>> ESTABLISHING_SECURE_CHANNEL ... <span class="text-accentGreen">OK</span></p>
            <p>> UPLOADING_TASKS_TO_NODES ... <span class="text-accentGreen">{{ Math.round(publishProgress) }}%</span></p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex-none bg-cardInnerBg rounded-xl p-4 shadow-md overflow-x-auto scrollbar-hide">
      <div class="flex items-center space-x-6 text-[14px] xl:text-[15px] min-w-max">
        <div class="flex items-center space-x-2">
          <span class="text-gray-300 whitespace-nowrap text-right text-[15px] xl:text-[16px]">课程名称：</span>
          <span class="text-white font-bold">无人机密码系统设计实战</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-300 whitespace-nowrap text-right text-[15px] xl:text-[16px]">实现阶段：</span>
          <span class="text-white font-bold">第一阶段：需求分析</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-300 whitespace-nowrap text-right text-[15px] xl:text-[16px]">学生人数：</span>
          <span class="text-white font-bold">28 人</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-300 whitespace-nowrap text-right text-[15px] xl:text-[16px]">当前里程：</span>
          <span class="text-white font-bold">无人机通信加密设计</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-300 whitespace-nowrap text-right text-[15px] xl:text-[16px]">分组设置：</span>
          <span class="text-white font-bold">4 个实战小组</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-300 whitespace-nowrap text-right text-[15px] xl:text-[16px]">课时时长：</span>
          <span class="text-white font-bold">45 分钟</span>
        </div>
      </div>
    </div>

    <div class="flex-1 flex gap-4 min-h-0">
      
      <div class="w-[32%] lg:w-[28%] rounded-xl p-3 xl:p-4 flex flex-col gap-3 min-h-0 shadow-md bg-cardInnerBg">
        <div class="flex items-center mb-1 flex-none">
          <div class="w-1.5 h-4 bg-warningOrg mr-2 rounded-full"></div>
          <h2 class="text-[16px] xl:text-[17px] font-bold text-white tracking-wide">【系统需求点梳理】</h2>
        </div>
        
        <div class="flex-1 flex flex-col gap-3 min-h-0">
          <div class="flex-1 bg-panelBg border-l-4 border-warningOrg rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-warningOrg font-bold text-[14px] mb-1 flex-none">【需求点一】</div>
            <div class="text-gray-200 text-[13px] xl:text-[14px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              高保密性要求。无人机飞控指令与传输数据需具备极强的抗窃听能力，加密机制需杜绝非法第三方破解与信息窃取。
            </div>
          </div>

          <div class="flex-1 bg-panelBg border-l-4 border-infoBlue rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-infoBlue font-bold text-[14px] mb-1 flex-none">【需求点二】</div>
            <div class="text-gray-200 text-[13px] xl:text-[14px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              高完整性要求。需建立数据校验机制，防止飞行坐标、控制指令在传输过程中被恶意篡改，保障无人机飞行安全。
            </div>
          </div>

          <div class="flex-1 bg-panelBg border-l-4 border-accentGreen rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-accentGreen font-bold text-[14px] mb-1 flex-none">【需求点三】</div>
            <div class="text-gray-200 text-[13px] xl:text-[14px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              低时延高可用要求。无人机高速移动场景下，加密握手与加解密处理时延需控制在毫秒级，保障指令实时响应。
            </div>
          </div>

          <div class="flex-1 bg-panelBg border-l-4 border-dangerRed rounded-r-lg p-3 flex flex-col min-h-0 shadow-sm transition hover:bg-opacity-80">
            <div class="text-dangerRed font-bold text-[14px] mb-1 flex-none">【需求点四】</div>
            <div class="text-gray-200 text-[13px] xl:text-[14px] leading-snug font-medium flex-1 overflow-y-auto scrollbar-hide">
              低功耗适配要求。受限于无人机机载电池容量，加密机制需严格控制额外功耗，适配嵌入式设备算力约束。
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 rounded-xl p-3 xl:p-4 flex flex-col gap-4 min-h-0 shadow-md bg-cardInnerBg">
        
        <div class="flex-none flex flex-col gap-2">
          <div class="flex items-center flex-none">
            <div class="w-1.5 h-4 bg-accentGreen mr-2 rounded-full"></div>
            <h2 class="text-[16px] xl:text-[17px] font-bold text-white tracking-wide">【主线任务汇总】</h2>
          </div>
          <div class="w-full bg-[#121417] border border-[#00f0ff]/30 text-gray-200 text-[14px] xl:text-[15px] rounded-lg p-3 xl:p-4 font-medium leading-relaxed shadow-inner">
            完成无人机通信加密系统全流程设计，覆盖需求分析、方案选型、仿真验证全环节，输出可落地的加密安全方案，满足上述 4 项需求点的全部要求。
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-2 min-h-0">
          <div class="flex items-center flex-none mt-1">
            <div class="w-1.5 h-4 bg-infoBlue mr-2 rounded-full"></div>
            <h2 class="text-[16px] xl:text-[17px] font-bold text-white tracking-wide">【支线任务分配】</h2>
          </div>
          
          <div class="flex-1 grid grid-cols-2 gap-3 min-h-0">
            <div class="bg-panelBg border border-accentGreen rounded-lg p-3 transition duration-300 flex flex-col min-h-0">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <span class="bg-accentGreen text-black px-1.5 py-0.5 rounded text-[13px] mr-2 transition">组1</span>
                支线方向 1：低功耗优化
              </div>
              <div class="flex-1 bg-[#121417] border border-accentGreen/30 text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                <textarea
                  v-model="task1Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div class="bg-panelBg border border-infoBlue rounded-lg p-3 transition duration-300 flex flex-col min-h-0">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <span class="bg-infoBlue text-black px-1.5 py-0.5 rounded text-[13px] mr-2 transition">组2</span>
                支线方向 2：侧信道防护
              </div>
              <div class="flex-1 bg-[#121417] border border-infoBlue/30 text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                <textarea
                  v-model="task2Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div class="bg-panelBg border border-warningOrg rounded-lg p-3 transition duration-300 flex flex-col min-h-0">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <span class="bg-warningOrg text-black px-1.5 py-0.5 rounded text-[13px] mr-2 transition">组3</span>
                支线方向 3：抗重放攻击
              </div>
              <div class="flex-1 bg-[#121417] border border-warningOrg/30 text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                <textarea
                  v-model="task3Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div class="bg-panelBg border border-purpleIcon rounded-lg p-3 transition duration-300 flex flex-col min-h-0">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <span class="bg-purpleIcon text-white px-1.5 py-0.5 rounded text-[13px] mr-2 transition">组4</span>
                支线方向 4：后量子算法适配
              </div>
              <div class="flex-1 bg-[#121417] border border-purpleIcon/30 text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition duration-300">
                <textarea
                  v-model="task4Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-none flex justify-center items-center mt-2">
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

      </div>
    </div>
    
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 z-50 flex flex-col items-center justify-center">
      <div class="bg-cardInnerBg/80 backdrop-blur-sm border border-accentCyan/60 rounded-xl p-4 w-full max-w-[500px] shadow-[0_0_30px_rgba(0,240,255,0.2)] relative transform scale-100 transition-transform">
        
        <button @click="closeModal" class="absolute top-3 right-3 text-textMuted hover:text-white transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 class="text-lg xl:text-xl font-bold text-accentCyan mb-4 text-center tracking-widest">任务发布成功</h2>
        
        <div class="space-y-4 mb-6">
          <div class="bg-[#121417]/60 border border-accentCyan/30 rounded-lg p-3">
            <div class="text-accentCyan font-bold text-[14px] mb-1">【主线任务】</div>
            <div class="text-gray-200 text-[13px] leading-relaxed line-clamp-2">
              完成无人机通信加密系统全流程设计，覆盖需求分析、方案选型、仿真验证全环节，输出可落地的加密安全方案，满足上述 4 项需求点的全部要求。
            </div>
          </div>
          
          <div>
            <div class="text-white font-bold text-[14px] mb-2">【支线任务分配】</div>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-[#121417]/60 border border-accentGreen/30 rounded-lg p-2">
                <div class="text-accentGreen font-bold text-[13px] mb-1">组1：低功耗优化</div>
                <div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">
                  {{ task1Content }}
                </div>
              </div>
              
              <div class="bg-[#121417]/60 border border-infoBlue/30 rounded-lg p-2">
                <div class="text-infoBlue font-bold text-[13px] mb-1">组2：侧信道防护</div>
                <div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">
                  {{ task2Content }}
                </div>
              </div>
              
              <div class="bg-[#121417]/60 border border-warningOrg/30 rounded-lg p-2">
                <div class="text-warningOrg font-bold text-[13px] mb-1">组3：抗重放攻击</div>
                <div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">
                  {{ task3Content }}
                </div>
              </div>
              
              <div class="bg-[#121417]/60 border border-purpleIcon/30 rounded-lg p-2">
                <div class="text-purpleIcon font-bold text-[13px] mb-1">组4：后量子算法适配</div>
                <div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">
                  {{ task4Content }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button @click="confirmJump" class="bg-accentCyan text-black font-bold text-[14px] px-6 py-2 rounded-lg shadow-[0_0_10px_rgba(0,240,255,0.3)] tracking-wide transition transform hover:scale-105 hover:bg-[#00d0dd] border border-[#00f0ff]">
            确认并跳转至需求汇总页
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isPublishing = ref(false)
const publishProgress = ref(0)
const showSuccessModal = ref(false)

// 支线任务内容（支持输入和删除）
const task1Content = ref('聚焦加密算法轻量化选型与密钥管理流程优化，在保障安全的前提下，最大限度降低加密机制带来的额外功耗。')
const task2Content = ref('针对无人机嵌入式设备的物理泄露风险，设计轻量级掩码防护机制，抵御侧信道攻击，提升系统物理安全。')
const task3Content = ref('设计基于随机数 + 序列号的双向认证机制，杜绝非法重放攻击，保障无人机通信链路的接入安全与指令合法性。')
const task4Content = ref('评估后量子加密算法在无人机场景的适配性，筛选轻量化格密码方案，保障系统在量子计算场景下的长期安全。')

const handlePublish = () => {
  if (isPublishing.value) return
  isPublishing.value = true
  publishProgress.value = 0
  
  // 3秒内完成进度条动画
  const duration = 3000
  const interval = 50
  const steps = duration / interval
  const increment = 100 / steps
  
  let currentStep = 0
  const progressInterval = setInterval(() => {
    currentStep++
    publishProgress.value = Math.min(100, currentStep * increment)
    
    if (currentStep >= steps) {
      clearInterval(progressInterval)
      setTimeout(() => {
        showSuccessModal.value = true
        setTimeout(() => {
          isPublishing.value = false
          publishProgress.value = 0
        }, 300)
      }, 200)
    }
  }, interval)
}

const closeModal = () => {
  showSuccessModal.value = false
}

const confirmJump = () => {
  router.push('/teacher/demand-summary')
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { 
  display: none; 
}
.scrollbar-hide { 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 扫描线动画 */
@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
</style>
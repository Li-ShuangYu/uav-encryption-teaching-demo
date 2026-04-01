<template>
  <div class="w-full h-screen overflow-hidden flex flex-col p-4 gap-4 bg-darkBg text-textMain font-sans box-border relative">
    
    <div class="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <transition-group name="toast">
        <div v-for="toast in toasts" :key="toast.id" 
             class="bg-[#0a111a]/95 border border-accentCyan/50 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.2)] p-3.5 text-white text-[14px] flex items-center backdrop-blur-md min-w-[280px]">
          <span class="w-2.5 h-2.5 rounded-full mr-3 shadow-sm" :class="toast.colorClass"></span>
          <span class="tracking-wide">{{ toast.msg }}</span>
        </div>
      </transition-group>
    </div>

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
          <div class="relative h-full rounded-full overflow-hidden bg-gradient-to-r from-purpleIcon via-accentCyan to-[#b3ffff] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(0,240,255,0.6)]" :style="{ width: publishProgress + '%' }">
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
          <div class="flex items-center gap-3">
            <span class="text-white font-bold">45 分钟</span>
            <button @click="handleRefresh" :disabled="isAnimating" class="text-accentCyan hover:text-white transition-all transform hover:rotate-180 duration-500 disabled:opacity-50 disabled:cursor-not-allowed" title="推进任务状态">
              <svg class="w-5 h-5 drop-shadow-[0_0_5px_rgba(0,240,255,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </button>
          </div>
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
          <div class="w-full bg-[#121417] border border-[#00f0ff]/30 text-gray-200 text-[14px] xl:text-[15px] rounded-lg p-3 xl:p-4 font-medium leading-relaxed shadow-inner min-h-[76px] xl:min-h-[82px]">
            {{ mainTaskContent }}<span v-if="isTypingMain" class="animate-pulse text-accentCyan font-bold ml-1">|</span>
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-2 min-h-0">
          <div class="flex items-center flex-none mt-1">
            <div class="w-1.5 h-4 bg-infoBlue mr-2 rounded-full"></div>
            <h2 class="text-[16px] xl:text-[17px] font-bold text-white tracking-wide">【支线任务分配】</h2>
          </div>
          
          <div class="flex-1 grid grid-cols-2 gap-3 min-h-0">
            <div class="bg-panelBg border rounded-lg p-3 transition-colors duration-500 flex flex-col min-h-0" :class="showGroup1 ? 'border-accentGreen shadow-[0_0_10px_rgba(0,255,170,0.15)]' : 'border-gray-700'">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <transition name="fade">
                  <span v-if="showGroup1" class="bg-accentGreen text-black px-1.5 py-0.5 rounded text-[13px] mr-2">组1</span>
                </transition>
                支线方向 1：低功耗优化
              </div>
              <div class="flex-1 bg-[#121417] border text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition-colors duration-500 relative" :class="showGroup1 ? 'border-accentGreen/30' : 'border-gray-700/30'">
                <textarea
                  v-model="task1Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
                <span v-if="task1Content.length > 0 && task1Content.length < originalT1.length" class="absolute right-3 bottom-3 text-accentCyan font-bold animate-pulse">█</span>
              </div>
            </div>

            <div class="bg-panelBg border rounded-lg p-3 transition-colors duration-500 flex flex-col min-h-0" :class="showGroup2 ? 'border-infoBlue shadow-[0_0_10px_rgba(0,163,255,0.15)]' : 'border-gray-700'">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <transition name="fade">
                  <span v-if="showGroup2" class="bg-infoBlue text-black px-1.5 py-0.5 rounded text-[13px] mr-2">组2</span>
                </transition>
                支线方向 2：侧信道防护
              </div>
              <div class="flex-1 bg-[#121417] border text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition-colors duration-500 relative" :class="showGroup2 ? 'border-infoBlue/30' : 'border-gray-700/30'">
                <textarea
                  v-model="task2Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
                <span v-if="task2Content.length > 0 && task2Content.length < originalT2.length" class="absolute right-3 bottom-3 text-accentCyan font-bold animate-pulse">█</span>
              </div>
            </div>

            <div class="bg-panelBg border rounded-lg p-3 transition-colors duration-500 flex flex-col min-h-0" :class="showGroup3 ? 'border-warningOrg shadow-[0_0_10px_rgba(255,153,0,0.15)]' : 'border-gray-700'">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <transition name="fade">
                  <span v-if="showGroup3" class="bg-warningOrg text-black px-1.5 py-0.5 rounded text-[13px] mr-2">组3</span>
                </transition>
                支线方向 3：抗重放攻击
              </div>
              <div class="flex-1 bg-[#121417] border text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition-colors duration-500 relative" :class="showGroup3 ? 'border-warningOrg/30' : 'border-gray-700/30'">
                <textarea
                  v-model="task3Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
                <span v-if="task3Content.length > 0 && task3Content.length < originalT3.length" class="absolute right-3 bottom-3 text-accentCyan font-bold animate-pulse">█</span>
              </div>
            </div>

            <div class="bg-panelBg border rounded-lg p-3 transition-colors duration-500 flex flex-col min-h-0" :class="showGroup4 ? 'border-purpleIcon shadow-[0_0_10px_rgba(187,134,252,0.15)]' : 'border-gray-700'">
              <div class="text-white font-bold text-[15px] xl:text-[16px] mb-2 flex items-center flex-none">
                <transition name="fade">
                  <span v-if="showGroup4" class="bg-purpleIcon text-white px-1.5 py-0.5 rounded text-[13px] mr-2">组4</span>
                </transition>
                支线方向 4：后量子算法适配
              </div>
              <div class="flex-1 bg-[#121417] border text-gray-300 text-[14px] xl:text-[15px] rounded-md p-2.5 overflow-y-auto scrollbar-hide leading-snug transition-colors duration-500 relative" :class="showGroup4 ? 'border-purpleIcon/30' : 'border-gray-700/30'">
                <textarea
                  v-model="task4Content"
                  class="w-full h-full bg-transparent text-gray-300 text-[14px] xl:text-[15px] leading-snug resize-none outline-none"
                  rows="4"
                ></textarea>
                <span v-if="task4Content.length > 0 && task4Content.length < originalT4.length" class="absolute right-3 bottom-3 text-accentCyan font-bold animate-pulse">█</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-none flex justify-center items-center mt-2">
          <button 
            @click="handlePublish" 
            :disabled="isPublishing || step < 2"
            :class="[
              'relative overflow-hidden bg-accentCyan text-black font-bold text-[15px] xl:text-[16px] px-8 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] tracking-widest transition transform border border-[#00f0ff] group',
              (!isPublishing && step >= 2) ? 'hover:scale-105 hover:bg-[#00d0dd]' : 'opacity-60 cursor-not-allowed'
            ]"
          >
            <div class="absolute left-0 top-0 bottom-0 bg-white/40 transition-all ease-linear" style="transition-duration: 2000ms;" :style="{ width: publishProgress + '%' }"></div>
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
              <div class="bg-[#121417]/60 border border-accentGreen/30 rounded-lg p-2"><div class="text-accentGreen font-bold text-[13px] mb-1">组1：低功耗优化</div><div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">{{ task1Content }}</div></div>
              <div class="bg-[#121417]/60 border border-infoBlue/30 rounded-lg p-2"><div class="text-infoBlue font-bold text-[13px] mb-1">组2：侧信道防护</div><div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">{{ task2Content }}</div></div>
              <div class="bg-[#121417]/60 border border-warningOrg/30 rounded-lg p-2"><div class="text-warningOrg font-bold text-[13px] mb-1">组3：抗重放攻击</div><div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">{{ task3Content }}</div></div>
              <div class="bg-[#121417]/60 border border-purpleIcon/30 rounded-lg p-2"><div class="text-purpleIcon font-bold text-[13px] mb-1">组4：后量子算法适配</div><div class="text-gray-300 text-[12px] leading-relaxed line-clamp-3">{{ task4Content }}</div></div>
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

// ===== 原始文本数据 =====
const originalMain = '完成无人机通信加密系统全流程设计，覆盖需求分析、方案选型、仿真验证全环节，输出可落地的加密安全方案，满足上述 4 项需求点的全部要求。'
const originalT1 = '聚焦加密算法轻量化选型与密钥管理流程优化，在保障安全的前提下，最大限度降低加密机制带来的额外功耗。'
const originalT2 = '针对无人机嵌入式设备的物理泄露风险，设计轻量级掩码防护机制，抵御侧信道攻击，提升系统物理安全。'
const originalT3 = '设计基于随机数 + 序列号的双向认证机制，杜绝非法重放攻击，保障无人机通信链路的接入安全与指令合法性。'
const originalT4 = '评估后量子加密算法在无人机场景的适配性，筛选轻量化格密码方案，保障系统在量子计算场景下的长期安全。'

// ===== 页面状态管理 =====
const step = ref(0) // 0: 初始空白, 1: 文本打字态, 2: 分组选中态
const isAnimating = ref(false)

// 初始均为空，满足第0点需求
const mainTaskContent = ref('')
const task1Content = ref('')
const task2Content = ref('')
const task3Content = ref('')
const task4Content = ref('')

const isTypingMain = ref(false)
const showGroupBadges = ref(false) // 控制组别徽章及颜色渐现
const showGroup1 = ref(false)
const showGroup2 = ref(false)
const showGroup3 = ref(false)
const showGroup4 = ref(false)

// ===== 打字机效果逻辑 =====
const typeText = (targetRef, fullText, isMain = false, onComplete = null) => {
  if (isMain) isTypingMain.value = true
  let i = 0
  const speed = 25 // 模拟键盘输入速度
  
  const timer = setInterval(() => {
    if (i <= fullText.length) {
      // 只设置文本，不添加光标，因为我们已经通过绝对定位添加了光标
      targetRef.value = fullText.substring(0, i)
      i++
    } else {
      clearInterval(timer)
      targetRef.value = fullText // 确保文本完整
      if (isMain) isTypingMain.value = false
      if (onComplete) onComplete()
    }
  }, speed)
}

const triggerTypingEffect = (callback) => {
  // 按顺序执行打字效果
  typeText(mainTaskContent, originalMain, true, () => {
    // 主线完成后，按顺序执行四个支线任务
    typeText(task1Content, originalT1, false, () => {
      typeText(task2Content, originalT2, false, () => {
        typeText(task3Content, originalT3, false, () => {
          typeText(task4Content, originalT4, false, callback)
        })
      })
    })
  })
}

// ===== Toast 提示框逻辑 =====
const toasts = ref([])
let toastId = 0

const addToast = (msg, colorClass) => {
  const id = toastId++
  toasts.value.push({ id, msg, colorClass })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 4500)
}

const triggerGroupSelection = (callback) => {
  // 按顺序显示各个组
  setTimeout(() => {
    showGroup1.value = true
    addToast('组1 成功接取任务：支线方向1 (低功耗优化)', 'bg-accentGreen')
  }, 200)
  
  setTimeout(() => {
    showGroup2.value = true
    addToast('组2 成功接取任务：支线方向2 (侧信道防护)', 'bg-infoBlue')
  }, 800)
  
  setTimeout(() => {
    showGroup3.value = true
    addToast('组3 成功接取任务：支线方向3 (抗重放攻击)', 'bg-warningOrg')
  }, 1400)
  
  setTimeout(() => {
    showGroup4.value = true
    addToast('组4 成功接取任务：支线方向4 (后量子算法适配)', 'bg-purpleIcon')
    if(callback) callback()
  }, 2000)
}

// ===== 刷新按钮点击处理 =====
const handleRefresh = () => {
  if (isAnimating.value) return
  
  if (step.value === 0) {
    // 第一次点击：开始打字显示内容
    step.value = 1
    isAnimating.value = true
    triggerTypingEffect(() => { isAnimating.value = false })
    
  } else if (step.value === 1) {
    // 第二次点击：显现分组标记与颜色
    step.value = 2
    isAnimating.value = true
    triggerGroupSelection(() => { isAnimating.value = false })
    
  } else if (step.value === 2) {
    // 第n次点击：重置演示（如果你需要无限重播，如果不需要可删除此段）
    step.value = 0
    mainTaskContent.value = ''
    task1Content.value = ''
    task2Content.value = ''
    task3Content.value = ''
    task4Content.value = ''
    showGroupBadges.value = false
    showGroup1.value = false
    showGroup2.value = false
    showGroup3.value = false
    showGroup4.value = false
    toasts.value = []
  }
}

// ===== 发布原有逻辑 =====
const isPublishing = ref(false)
const publishProgress = ref(0)
const showSuccessModal = ref(false)

const handlePublish = () => {
  if (isPublishing.value || step.value < 2) return
  isPublishing.value = true
  publishProgress.value = 0
  
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

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* 渐显动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateX(-10px);
}

/* Toast 右上角提示动画 */
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
<template>
  <div 
    class="flex h-screen w-full overflow-hidden transition-colors duration-1000 font-sans"
    :class="isState2 ? 'bg-[#1a0f0f]' : 'bg-[#0a0f16]'"
  >
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-10">
      <div class="scan-line-global w-full h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
    </div>

    <div class="w-[40%] flex flex-col z-10 border-r" :class="theme.border">
      <div class="px-6 py-4 border-b flex items-center justify-between" :class="theme.border">
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6 animate-pulse" :class="theme.text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span class="text-xl font-bold tracking-wider" :class="theme.text">部署中控台 (DE-OPS)</span>
        </div>
        <div class="text-xs px-2 py-1 border rounded" :class="theme.badge">
          STATE_ID: {{ demoState }}
        </div>
      </div>

      <div class="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
        
        <div class="flex flex-col rounded-lg border p-5 relative overflow-hidden group" :class="[theme.border, theme.bg]">
          <div class="absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 rounded-full" :class="theme.glow"></div>
          
          <h3 class="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Target Payload</h3>
          
          <div v-if="!isState2" class="flex flex-col gap-2">
            <div class="text-xl font-bold text-blue-400 flex items-center">
              待部署版本：V1.0.tar.gz
              <span class="ml-2 text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded">STABLE</span>
            </div>
            <p class="text-sm text-gray-400">基于最新 AI 推演生成的标准加密通信模块，已通过静态检查。</p>
          </div>

          <div v-else class="flex flex-col gap-2">
            <div class="text-xl font-bold text-red-500 flex items-center">
              待部署版本：V2.0_Fixed.tar.gz
              <span class="ml-2 text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded animate-pulse">HOTFIX</span>
            </div>
            <p class="text-sm text-gray-300">
              <span class="text-red-400 font-bold">[警告]</span> 包含 1 处高优先级的漏洞修复（侧信道泄露修补），请尽快下发覆盖受感染节点。
            </p>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500 border-t pt-3" :class="theme.border">
            <div>SIZE: <span class="text-gray-300">42.8 MB</span></div>
            <div>CHECKSUM: <span class="text-gray-300 font-mono">a8f9c2...11b</span></div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-gray-400 uppercase tracking-widest">Target Device</label>
          <div class="relative">
            <select disabled class="w-full bg-[#111827] border appearance-none text-gray-200 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8" :class="theme.border">
              <option selected>冰达机器人 NanoCar (IP: 192.168.1.100)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-1 flex items-center">
            <span class="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            SSH 端口已开启 (Port: 22)
          </p>
        </div>

        <div class="flex-1"></div> <button 
          @click="startDeploy"
          :disabled="isDeploying"
          class="w-full py-4 rounded-lg font-bold text-lg tracking-widest transition-all duration-300 relative overflow-hidden group border"
          :class="isDeploying ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed' : theme.button"
        >
          <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span class="relative flex items-center justify-center space-x-2">
            <svg v-if="!isDeploying" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            <svg v-else class="animate-spin w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isDeploying ? '系统接管中...' : '建立连接并下发部署' }}</span>
          </span>
        </button>

      </div>
    </div>

    <div class="flex-1 flex flex-col z-10 relative">
      <div class="absolute inset-0 z-0" style="background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px;"></div>
      
      <div class="h-24 border-b flex z-10" :class="theme.border">
        <div class="flex-1 border-r flex flex-col justify-center items-center" :class="theme.border">
          <span class="text-gray-500 text-xs mb-1">CPU 占用率</span>
          <span class="text-2xl font-mono text-gray-200">12<span class="text-sm">%</span></span>
        </div>
        <div class="flex-1 border-r flex flex-col justify-center items-center" :class="theme.border">
          <span class="text-gray-500 text-xs mb-1">内存 (RAM)</span>
          <span class="text-2xl font-mono text-gray-200">1.4<span class="text-sm">/4 GB</span></span>
        </div>
        <div class="flex-1 border-r flex flex-col justify-center items-center" :class="theme.border">
          <span class="text-gray-500 text-xs mb-1">主板温度</span>
          <span class="text-2xl font-mono" :class="isState2 ? 'text-orange-400' : 'text-green-400'">45<span class="text-sm">°C</span></span>
        </div>
        <div class="flex-1 flex flex-col justify-center items-center relative overflow-hidden">
          <span class="text-gray-500 text-xs mb-1">ROS Master</span>
          <span class="text-green-500 text-sm border border-green-500/50 bg-green-900/20 px-3 py-1 rounded-full font-bold">ONLINE</span>
        </div>
      </div>

      <div class="flex-1 flex items-center justify-center relative z-10 overflow-hidden">
        
        <div class="relative w-96 h-96 flex items-center justify-center">
          <div class="absolute inset-0 border border-dashed rounded-full animate-[spin_20s_linear_infinite]" :class="theme.border"></div>
          <div class="absolute inset-4 border border-solid rounded-full opacity-30" :class="theme.border"></div>
          <div class="absolute inset-16 border-2 border-solid rounded-full opacity-10" :class="theme.border"></div>
          
          <div class="absolute w-full h-[1px] opacity-20" :class="theme.bgBase"></div>
          <div class="absolute h-full w-[1px] opacity-20" :class="theme.bgBase"></div>

          <svg class="w-48 h-48 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="60" width="100" height="80" rx="10" :stroke="isState2 ? '#f97316' : '#3b82f6'" stroke-width="4" fill="#1f2937"/>
            <circle cx="80" cy="100" r="15" :fill="isState2 ? '#ef4444' : '#10b981'" class="animate-pulse"/>
            <circle cx="120" cy="100" r="15" :fill="isState2 ? '#ef4444' : '#10b981'" class="animate-pulse"/>
            <path d="M40 140 H160 V160 H40 Z" :fill="isState2 ? '#9a3412' : '#1e3a8a'"/>
            <path d="M70 40 V60 M130 40 V60" :stroke="isState2 ? '#f97316' : '#3b82f6'" stroke-width="4"/>
            <circle cx="70" cy="35" r="5" :fill="isState2 ? '#f97316' : '#3b82f6'"/>
            <circle cx="130" cy="35" r="5" :fill="isState2 ? '#f97316' : '#3b82f6'"/>
          </svg>

          <div class="absolute top-10 right-0 bg-[#0f172a]/80 border p-2 text-[10px] font-mono text-gray-400 rounded" :class="theme.border">
            <p>> V_BAT: 11.4V</p>
            <p>> IMU: OK</p>
            <p>> LIDAR: SCANNING</p>
          </div>
          <div class="absolute bottom-10 left-0 bg-[#0f172a]/80 border p-2 text-[10px] font-mono text-gray-400 rounded" :class="theme.border">
            <p>eth0: 192.168.1.100</p>
            <p>rx/tx: 1.2M/45K</p>
          </div>
        </div>

      </div>
    </div>

    <transition name="fade">
      <div v-if="isDeploying" class="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div class="w-[600px] border rounded-lg bg-[#0a0f16] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col" :class="theme.border">
          <div class="px-4 py-2 border-b flex justify-between items-center bg-black/50" :class="theme.border">
            <span class="text-xs font-mono font-bold tracking-widest text-gray-400">SECURE_SHELL_DEPLOYMENT</span>
            <span class="flex space-x-1">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </span>
          </div>
          
          <div class="h-64 p-4 font-mono text-sm overflow-y-hidden flex flex-col justify-end relative">
            <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none"></div>
            <div v-for="(log, index) in deployLogs" :key="index" class="text-green-400 mb-1 leading-tight animate-fade-in-up">
              <span class="text-gray-500">[{{ new Date().toISOString().substring(11, 19) }}]</span> 
              <span :class="log.includes('WARNING') || log.includes('ERROR') ? 'text-red-400' : 'text-green-400'">
                $ {{ log }}
              </span>
            </div>
          </div>

          <div class="p-4 border-t bg-[#0a0f16]" :class="theme.border">
            <div class="flex justify-between text-xs font-mono mb-2" :class="theme.text">
              <span>PROGRESS</span>
              <span>{{ deployProgress.toFixed(0) }}%</span>
            </div>
            <div class="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full transition-all duration-300 ease-linear shadow-[0_0_10px]" :class="[theme.bgBase, theme.shadow]" :style="{ width: deployProgress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态管理
const demoState = ref(1)
const isDeploying = ref(false)
const deployProgress = ref(0)
const deployLogs = ref([])

onMounted(() => {
  const state = localStorage.getItem('demo_state')
  demoState.value = state === '2' ? 2 : 1
})

const isState2 = computed(() => demoState.value === 2)

// 主题样式计算，基于不同状态返回对应颜色配置
const theme = computed(() => {
  if (isState2.value) {
    // State 2: 修复/警告感（橙红色调）
    return {
      text: 'text-red-500',
      border: 'border-red-900/50',
      bg: 'bg-red-900/10',
      bgBase: 'bg-red-500',
      glow: 'bg-red-600',
      shadow: 'shadow-red-500',
      badge: 'border-red-500/50 text-red-400 bg-red-900/20',
      button: 'bg-red-900/80 hover:bg-red-800 text-white border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
    }
  } else {
    // State 1: 正常（科技蓝/绿调）
    return {
      text: 'text-blue-400',
      border: 'border-blue-900/50',
      bg: 'bg-blue-900/10',
      bgBase: 'bg-blue-500',
      glow: 'bg-blue-600',
      shadow: 'shadow-blue-500',
      badge: 'border-blue-500/50 text-blue-400 bg-blue-900/20',
      button: 'bg-blue-900/80 hover:bg-blue-800 text-white border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    }
  }
})

// 模拟部署动作
const startDeploy = () => {
  isDeploying.value = true
  deployLogs.value = []
  deployProgress.value = 0

  // 定义时间轴和日志内容 (共2.5秒 = 2500ms)
  const sequence = [
    { time: 0, log: 'Initiating SSH connection to 192.168.1.100:22...' },
    { time: 300, log: 'Authentication successful. User: root. Target: NanoCar.' },
    { time: 600, log: 'Checking target environment dependencies...' },
    { time: 900, log: 'Preparing deployment directory: /opt/ros/workspace/src/' },
    { time: 1200, log: `Pushing payload ${isState2.value ? 'V2.0_Fixed.tar.gz' : 'V1.0.tar.gz'} [====>   ] 42.8MB...` },
    { time: 1600, log: 'Extracting files and resolving symlinks...' },
    { time: 1900, log: 'Applying execution permissions (+x)...' },
    { time: 2100, log: isState2.value ? 'WARNING: Patching previous vulnerable node...' : 'Configuring ROS launch files...' },
    { time: 2300, log: 'Restarting ROS Master & Cryptographic nodes...' },
    { time: 2500, log: 'Deployment completed successfully. Synchronizing state...' }
  ]

  sequence.forEach(step => {
    setTimeout(() => {
      deployLogs.value.push(step.log)
      deployProgress.value = (step.time / 2500) * 100
    }, step.time)
  })

  // 动画结束后跳转
  setTimeout(() => {
    router.push('/student/debug')
  }, 3000) // 延迟一点让用户看清 100%
}
</script>

<style scoped>
/* 全局扫描线，增添监控室氛围 */
.scan-line-global {
  animation: scanGlobal 8s linear infinite;
}

@keyframes scanGlobal {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

/* 日志逐行出现的动画 */
.animate-fade-in-up {
  animation: fadeInUp 0.2s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 遮罩层渐入渐出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
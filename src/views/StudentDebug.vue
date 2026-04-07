<template>
  <div class="h-screen w-full flex bg-[#0f172a] text-gray-200 overflow-hidden font-sans">
    <div class="flex-[3] flex flex-col m-3 mr-1 bg-[#1e293b] border border-gray-700 rounded-xl relative overflow-hidden shadow-2xl fade-in">
      
      <div class="h-10 border-b border-gray-700 bg-[#0f172a]/50 flex items-center px-4 justify-between shrink-0">
        <div class="flex items-center space-x-2">
          <div class="flex space-x-1.5">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span class="ml-4 text-xs font-mono text-gray-400">root@robot-edge-core:~ /ros2_ws</span>
        </div>
        <div class="text-xs text-gray-500 font-mono">
          <span>MEM: 42%</span> | <span>CPU: {{ cpuUsage }}%</span>
        </div>
      </div>

      <div 
        ref="terminalRef" 
        class="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 custom-scrollbar bg-[#090b10]"
      >
        <div v-for="log in logs" :key="log.id" :class="getLogClass(log.type)" class="leading-relaxed break-all">
          {{ log.text }}
        </div>
      </div>

      <div class="h-16 border-t border-gray-700 bg-[#1e293b] flex items-center justify-center shrink-0">
        <transition name="fade" mode="out-in">
          <div v-if="!isFatalTriggered && !isSuccessTriggered" class="text-gray-500 text-sm animate-pulse flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            系统启动中，等待模块连接...
          </div>
          
          <button 
            v-else-if="demoState === '1'" 
            @click="triggerAIFix"
            class="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all animate-pulse-fast flex items-center space-x-2 font-bold"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <span>捕获异常：携带日志请求 AI 介入优化</span>
          </button>
          
          <button 
            v-else-if="demoState === '2'" 
            @click="completeTask"
            class="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded shadow-[0_0_15px_rgba(22,163,74,0.5)] transition-all flex items-center space-x-2 font-bold"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>调试成功：完成寻迹闭环任务</span>
          </button>
        </transition>
      </div>
    </div>

    <div class="flex-[2] flex flex-col m-3 ml-2 space-y-3 relative fade-in" style="animation-delay: 0.2s;">
      
      <div class="flex-1 bg-[#1e293b] border border-gray-700 rounded-xl relative overflow-hidden shadow-lg flex flex-col">
        <div class="h-8 bg-[#0f172a]/80 border-b border-gray-700 px-3 flex items-center justify-between shrink-0 absolute w-full z-10">
          <span class="text-xs font-bold text-gray-300 flex items-center">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            前置广角图传 (PORT 8080)
          </span>
          <span :class="demoState === '2' && isSuccessTriggered ? 'text-green-500' : 'text-red-500'" class="text-[10px] flex items-center">
            <span class="w-2 h-2 rounded-full mr-1" :class="demoState === '2' && isSuccessTriggered ? 'bg-green-500' : 'bg-red-500'"></span>
            {{ demoState === '2' && isSuccessTriggered ? 'LIVE' : 'DISCONNECTED' }}
          </span>
        </div>

        <div class="flex-1 w-full relative bg-black flex items-center justify-center">
          <div v-if="demoState === '1' || !isSuccessTriggered" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
            <div class="tv-static opacity-20 absolute inset-0"></div>
            <div class="scan-line absolute inset-0"></div>
            <svg class="w-12 h-12 text-gray-600 mb-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path></svg>
            <span class="text-gray-500 text-sm tracking-widest font-mono relative z-10">NO SIGNAL</span>
          </div>

          <div v-else class="absolute inset-0 bg-[#0d151c] flex items-center justify-center overflow-hidden grid-bg">
             <div class="absolute inset-0 camera-vignette"></div>
             <div class="w-1/3 h-full border-x-2 border-dashed border-green-500/30 transform perspective-[800px] rotateX-[60deg] scale-150 origin-bottom track-move"></div>
             <div class="absolute w-24 h-24 border-2 border-green-400 bg-green-400/10 crosshair flex items-center justify-center">
                <div class="w-1 h-1 bg-green-400 rounded-full"></div>
             </div>
             <div class="absolute top-10 left-3 text-green-400 font-mono text-[10px] flex flex-col gap-1">
                 <span>REC [■]</span>
                 <span>FPS: {{ Math.floor(Math.random() * 5 + 28) }}</span>
                 <span>PITCH: -5.2°</span>
             </div>
          </div>
        </div>
      </div>

      <div class="flex-1 bg-[#1e293b] border border-gray-700 rounded-xl relative overflow-hidden shadow-lg flex flex-col">
        <div class="h-8 bg-[#0f172a]/80 border-b border-gray-700 px-3 flex items-center justify-between shrink-0 absolute w-full z-10">
          <span class="text-xs font-bold text-gray-300 flex items-center">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
            2D 激光雷达 (/scan)
          </span>
          <span :class="demoState === '2' && isSuccessTriggered ? 'text-green-500' : 'text-red-500'" class="text-[10px] flex items-center">
             <span class="w-2 h-2 rounded-full mr-1 animate-pulse" :class="demoState === '2' && isSuccessTriggered ? 'bg-green-500' : 'bg-red-500'"></span>
             {{ demoState === '2' && isSuccessTriggered ? 'SCANNING' : 'OFFLINE' }}
          </span>
        </div>

        <div class="flex-1 w-full relative bg-[#090b10] flex items-center justify-center p-6">
          <div v-if="demoState === '1' || !isSuccessTriggered" class="absolute inset-0 flex flex-col items-center justify-center">
             <div class="w-32 h-32 rounded-full border border-gray-800 flex items-center justify-center relative">
                <div class="w-16 h-16 rounded-full border border-gray-800 absolute"></div>
                <svg class="w-10 h-10 text-red-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
             </div>
          </div>

          <div v-else class="w-full h-full relative flex items-center justify-center">
             <div class="w-48 h-48 rounded-full border border-green-900/50 relative flex items-center justify-center">
                <div class="w-32 h-32 rounded-full border border-green-900/50 absolute"></div>
                <div class="w-16 h-16 rounded-full border border-green-900/50 absolute"></div>
                <div class="absolute w-full h-[1px] bg-green-900/30"></div>
                <div class="absolute h-full w-[1px] bg-green-900/30"></div>
                <div class="absolute inset-0 rounded-full radar-sweep"></div>
                <div class="absolute w-full h-full rounded-full point-clouds"></div>
             </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 状态读取：'1' 表示失败剧本，'2' 表示成功剧本。默认为 '1'
const demoState = ref(localStorage.getItem('demo_state') || '1')

const logs = ref([])
const terminalRef = ref(null)
const isFatalTriggered = ref(false)
const isSuccessTriggered = ref(false)
const cpuUsage = ref(12)

let logInterval = null
let cpuInterval = null

// 生成时间戳
const getTimestamp = () => {
    const now = new Date()
    return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}]`
}

// 自动滚动到底部
const scrollToBottom = async () => {
    await nextTick()
    if (terminalRef.value) {
        terminalRef.value.scrollTop = terminalRef.value.scrollHeight
    }
}

// 写入单条日志
const pushLog = (type, text) => {
    logs.value.push({
        id: Date.now() + Math.random(),
        type,
        text: `${getTimestamp()} ${text}`
    })
    // 限制日志条数，防止内存泄漏
    if (logs.value.length > 300) {
        logs.value.shift()
    }
    scrollToBottom()
}

// CPU波动模拟
const startCpuSim = () => {
    cpuInterval = setInterval(() => {
        cpuUsage.value = Math.floor(Math.random() * 15 + (demoState.value === '1' ? 80 : 15))
    }, 2000)
}

// 主启动逻辑
const startLogging = () => {
    // 共同的启动日志
    pushLog('info', '[SYSTEM] Booting Robot Operating System 2 (Humble)...')
    pushLog('info', '[SYSTEM] Loading kernel modules...')
    pushLog('info', '[SYSTEM] Initializing nodelet manager...')
    
    setTimeout(() => pushLog('info', '[ROS_CORE] Starting roscore and DDS discovery...'), 500)
    setTimeout(() => pushLog('info', '[SENSORS] Probing peripheral devices on I2C/UART/USB buses...'), 1200)
    setTimeout(() => pushLog('info', '[CAMERA] Attempting to open video device /dev/video0...'), 1800)
    setTimeout(() => pushLog('info', '[LIDAR] Attempting to connect to RPLidar on /dev/ttyUSB0...'), 2300)

    // 分支走向
    setTimeout(() => {
        if (demoState.value === '1') {
            triggerFailScenario()
        } else {
            triggerSuccessScenario()
        }
    }, 3500)
}

// 状态1：注定失败的剧本
const triggerFailScenario = () => {
    isFatalTriggered.value = true
    pushLog('fatal', '[FATAL] [ROS_CORE]: Cannot find topic /scan. rplidar_super failed to match.')
    pushLog('error', '[NODE] process has died [pid 1421, exit code 255, cmd /opt/ros/lidar_node].')
    pushLog('warn', '[CAMERA] /dev/video0 device busy or resource temporarily unavailable.')

    // 自动化无限输出失败日志
    logInterval = setInterval(() => {
        const failMsgs = [
            '[WARN] Retrying to connect to /scan...',
            '[ERROR] Nodelet manager stack trace: Failed to find valid parameters for frame base_link.',
            '[WARN] TF_OLD_DATA ignoring data from the past. Expected frame lidard_link.',
            '[ERROR] Lost sync with device on /dev/ttyUSB0, restarting serial communication...',
            '[WARN] Watchdog timeout: rplidar_super not responding (check baudrate?).',
            '[ERROR] Could not grab frame from camera. V4L2 error 11.',
            '[WARN] Control loop missed its desired rate of 20Hz... the loop actually took 0.0820 seconds.'
        ]
        const msg = failMsgs[Math.floor(Math.random() * failMsgs.length)]
        const type = msg.includes('[ERROR]') ? 'error' : 'warn'
        pushLog(type, msg)
    }, 700) // 高频报错增加压迫感
}

// 状态2：优化后的成功剧本
const triggerSuccessScenario = () => {
    isSuccessTriggered.value = true
    pushLog('success', '[SUCCESS] /rplidar_scan connected at 115200 baud. Map loading...')
    pushLog('info', '[INFO] Video stream port 8080 opened. Format: H.264.')
    pushLog('success', '[SYSTEM] Nodelet initialization complete. Sensor fusion active.')
    pushLog('success', '[SYSTEM] All core nodes running. Ready for autonomous navigation.')

    // 自动化无限输出正常心跳日志
    logInterval = setInterval(() => {
        const x = (Math.random() * 2 + 1).toFixed(3)
        const y = (Math.random() * 2).toFixed(3)
        const fps = Math.floor(Math.random() * 5 + 28)
        
        const successMsgs = [
            `[INFO] [Odometry] Pose updated: [x: ${x}, y: ${y}, theta: 0.12]`,
            `[INFO] [Camera] Frame processed, current rate ${fps} FPS.`,
            `[INFO] [Lidar] Scan rate 10.2Hz, 384 points received in current sector.`,
            `[DEBUG] Navigation stack: tracking local trajectory... error_margin=0.015m`,
            `[INFO] [Motor_Driver] Cmd_vel applied -> Left: 1.2rad/s, Right: 1.2rad/s`,
            `[DEBUG] TF Broadcaster: Published transform from odom to base_link.`
        ]
        const msg = successMsgs[Math.floor(Math.random() * successMsgs.length)]
        pushLog('info', msg)
    }, 800) // 稳定的刷新频率
}

// 样式类映射
const getLogClass = (type) => {
    switch(type) {
        case 'info': return 'text-gray-300'
        case 'warn': return 'text-yellow-400'
        case 'error': return 'text-red-400 font-bold'
        case 'fatal': return 'text-white font-bold bg-red-600/80 px-2 py-0.5 inline-block rounded-sm'
        case 'success': return 'text-green-400 font-bold'
        default: return 'text-gray-300'
    }
}

// 按钮点击逻辑：进入状态2
const triggerAIFix = () => {
    localStorage.setItem('demo_state', '2')
    router.push('/student/robot-debug')
}

// 按钮点击逻辑：进入终态3
const completeTask = () => {
    localStorage.setItem('demo_state', '3')
    router.push('/student/robot-debug')
}

onMounted(() => {
    startCpuSim()
    startLogging()
})

onUnmounted(() => {
    if (logInterval) clearInterval(logInterval)
    if (cpuInterval) clearInterval(cpuInterval)
})
</script>

<style scoped>
/* 入场动画 */
.fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 按钮切换过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 红色按钮闪烁 */
.animate-pulse-fast {
  animation: pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-fast {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; box-shadow: 0 0 25px rgba(220, 38, 38, 0.8); }
}

/* 终端滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #090b10;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* ---- 失败状态：摄像头的雪花和扫描线 ---- */
.tv-static {
  background-image: repeating-radial-gradient(circle at 17% 32%, #ffffff, #000000 0.00085px);
  animation: static-noise 0.2s linear infinite;
}
@keyframes static-noise {
  0% { background-position: 0 0; }
  100% { background-position: 10% 10%; }
}

.scan-line {
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
  background-size: 100% 4px;
  animation: scroll-scan 10s linear infinite;
  pointer-events: none;
}
@keyframes scroll-scan {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}

/* ---- 成功状态：摄像头的透视寻迹轨道与准星 ---- */
.grid-bg {
  background-image: linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
.camera-vignette {
  background: radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 100%);
  pointer-events: none;
  z-index: 5;
}
.track-move {
  animation: track-flow 1s linear infinite;
}
@keyframes track-flow {
  0% { transform: perspective(800px) rotateX(60deg) scale(1.5) translateY(0); }
  100% { transform: perspective(800px) rotateX(60deg) scale(1.5) translateY(40px); /* 一格的距离 */ }
}
.crosshair {
  animation: target-wobble 4s ease-in-out infinite;
}
@keyframes target-wobble {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(15px, -10px) scale(1.05); }
  50% { transform: translate(-5px, 15px) scale(0.95); }
  75% { transform: translate(-20px, -5px) scale(1.02); }
}

/* ---- 成功状态：激光雷达扫描动效 ---- */
.radar-sweep {
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 70%, rgba(34, 197, 94, 0.5) 100%);
  animation: radar-spin 2s linear infinite;
}
@keyframes radar-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 使用 box-shadow 模拟点云随机散布 */
.point-clouds {
  box-shadow: 
    30px 40px 0 -23px #22c55e,
    -20px 50px 0 -23px #22c55e,
    -40px -30px 0 -23px #22c55e,
    50px -20px 0 -23px #22c55e,
    15px -45px 0 -23px #22c55e,
    -10px 20px 0 -23px #4ade80,
    35px -10px 0 -23px #4ade80,
    -35px -15px 0 -23px #4ade80;
  animation: points-flicker 1.5s infinite alternate;
}
@keyframes points-flicker {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
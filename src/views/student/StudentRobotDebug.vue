<template>
  <div class="h-screen w-full bg-[#0d1115] flex flex-col font-sans text-gray-200 overflow-hidden selection:bg-cyan-900 selection:text-cyan-100">
    <header class="h-14 bg-[#151a21] border-b border-gray-800 flex items-center justify-between px-6 shrink-0 z-20 shadow-md">
      <div class="flex items-center space-x-3 text-lg">
        <svg class="w-6 h-6" :class="theme === 'cyan' ? 'text-cyan-400' : 'text-red-400'" style="transition: color 1s ease;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
        </svg>
        <span class="font-bold text-gray-100 tracking-wide">冰达 NanoCar 智能调试控制台</span>
        <span class="text-xs border px-2 py-0.5 rounded ml-2 transition-colors duration-1000"
              :class="theme === 'cyan' ? 'border-cyan-800 bg-cyan-900/30 text-cyan-400' : 'border-red-800 bg-red-900/30 text-red-400'">
          ROS1 Melodic
        </span>
      </div>
      <div class="flex space-x-6 text-sm items-center">
        <div class="flex items-center space-x-2">
          <span class="text-gray-400">设备连接状态:</span>
          <div class="flex items-center space-x-1">
            <span class="relative flex h-3 w-3">
              <span :class="['animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', hwActive ? 'bg-green-400' : 'bg-yellow-400']"></span>
              <span :class="['relative inline-flex rounded-full h-3 w-3', hwActive ? 'bg-green-500' : 'bg-yellow-500']"></span>
            </span>
            <span :class="hwActive ? 'text-green-400' : 'text-yellow-400'">{{ hwActive ? 'ONLINE (ACTIVE)' : 'WAITING' }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 flex overflow-hidden p-5 gap-6 relative">
      
      <aside class="w-[420px] flex flex-col gap-5 shrink-0 z-10">
        
        <div class="rounded-xl flex flex-col overflow-hidden transition-all duration-1000 border-2"
             :class="theme === 'cyan' ? 'bg-[#151a21] border-cyan-900/60 shadow-[0_0_20px_rgba(8,145,178,0.1)]' : 'bg-[#1e1516] border-red-900/80 shadow-[0_0_25px_rgba(220,38,38,0.2)]'">
          <div class="px-4 py-3 border-b flex justify-between items-center transition-colors duration-1000"
               :class="theme === 'cyan' ? 'border-cyan-900/50 bg-[#1a232b]' : 'border-red-900/50 bg-[#2d1b1e]'">
            <span class="text-sm font-bold flex items-center transition-colors duration-1000"
                  :class="theme === 'cyan' ? 'text-cyan-400' : 'text-red-400'">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              {{ theme === 'cyan' ? 'AI 任务下发控制台' : 'AI 异常捕获与重构中心' }}
            </span>
          </div>
          <div class="p-4 flex flex-col h-64">
            <textarea 
              v-model="activePrompt" 
              class="w-full flex-1 bg-[#0c0e12] text-gray-300 text-[13px] p-3 rounded-lg border focus:outline-none resize-none custom-scrollbar leading-relaxed transition-colors duration-1000"
              :class="theme === 'cyan' ? 'border-gray-800 focus:border-cyan-700' : 'border-red-900/30 focus:border-red-700'"
              readonly
            ></textarea>
            
            <button 
              v-if="!hasGeneratedV1"
              @click="generateV1Code" 
              class="mt-4 w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg flex items-center justify-center"
            >
              一键生成 ROS 巡线与图传代码
            </button>
            <div v-else class="mt-4 w-full py-2.5 text-sm font-bold rounded-lg flex items-center justify-center transition-colors duration-1000"
                 :class="theme === 'cyan' ? 'bg-cyan-900/30 text-cyan-500' : 'bg-red-900/30 text-red-500'">
              {{ theme === 'cyan' ? '当前状态：任务执行中' : '当前状态：代码深度重构中' }}
            </div>
          </div>
        </div>

        <div class="bg-[#151a21] border border-gray-800 rounded-xl flex-1 flex flex-col overflow-hidden">
          <div class="px-4 py-3 border-b border-gray-800 bg-[#1a2028]">
            <span class="text-sm font-bold text-gray-300">环境与硬件遥测</span>
          </div>
          <div class="p-5 flex flex-col gap-6 flex-1 justify-center">
            <div class="space-y-5">
              <div>
                <div class="flex justify-between text-xs mb-1.5 text-gray-400 font-mono"><span>Jetson Nano CPU</span><span>{{ mockCpu }}%</span></div>
                <div class="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full transition-all duration-300" :class="theme === 'cyan' ? 'bg-cyan-500' : 'bg-red-500'" :style="{ width: mockCpu + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1.5 text-gray-400 font-mono"><span>MEM Usage</span><span>{{ mockRam }} / 4GB</span></div>
                <div class="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full transition-all duration-300" :class="theme === 'cyan' ? 'bg-purple-500' : 'bg-orange-500'" :style="{ width: (mockRam / 4 * 100) + '%' }"></div>
                </div>
              </div>
            </div>
            <div class="flex-1 flex items-center justify-center relative mt-4">
              <div class="w-32 h-32 rounded-full border-2 border-gray-700/50 relative overflow-hidden bg-[#0a0d10] shadow-inner">
                <div class="absolute inset-0 border border-gray-700/50 rounded-full m-4"></div>
                <div class="absolute inset-0 border border-gray-700/50 rounded-full m-8"></div>
                <div :class="['absolute w-16 h-16 origin-bottom-right right-1/2 bottom-1/2', hwActive ? 'bg-gradient-to-tr from-transparent to-green-500/50 animate-spin-slow' : 'bg-gradient-to-tr from-transparent to-gray-600/30 animate-spin-slow']" style="animation-duration: 2.5s;"></div>
                <div v-if="hwActive" class="absolute w-2 h-2 bg-green-400 rounded-full top-8 right-10 animate-pulse shadow-[0_0_10px_#4ade80]"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section class="flex-1 flex flex-col gap-5 min-w-0 z-10">
        
        <div class="bg-[#1e1e1e] border border-gray-800 rounded-xl flex-1 flex flex-col overflow-hidden shadow-2xl relative">
          <div class="h-10 bg-[#252526] border-b border-gray-800 flex items-center px-4 justify-between select-none shrink-0">
            <div class="flex items-center space-x-3">
              <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="ml-4 text-sm text-gray-400 font-mono">line_follow_stream.py</span>
            </div>
            
            <button 
              v-if="canDeployV1"
              @click="deployV1"
              class="h-7 px-4 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded flex items-center shadow transition-colors"
            >
              <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              一键下载部署到机器人
            </button>
            <button 
              v-if="canDeployV2"
              @click="deployV2"
              class="h-7 px-4 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded flex items-center shadow transition-colors"
            >
              <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              重新部署 V2 修复代码
            </button>
          </div>
          
          <div class="flex-1 overflow-auto custom-scrollbar relative p-5 bg-[#1e1e1e]" ref="codeContainer">
            <div v-if="isCodeLoading" class="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]/80 backdrop-blur-sm z-10">
              <svg class="w-12 h-12 text-cyan-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
            
            <pre class="w-full text-[14px] font-mono leading-relaxed"><code class="text-gray-300 w-full block" v-html="highlightedCode"></code></pre>
          </div>
        </div>

        <div class="bg-[#0c0c0c] border border-gray-800 rounded-xl h-[35%] flex flex-col overflow-hidden shadow-2xl relative shrink-0">
          <div class="h-9 bg-[#151a21] border-b border-gray-800 flex items-center px-4 shrink-0">
            <span class="text-xs text-gray-500 font-mono">root@nanocar:~/catkin_ws$ bash</span>
          </div>
          
          <div class="flex-1 overflow-y-auto custom-scrollbar p-4 font-mono text-[14px] leading-[1.6] w-full" ref="terminalContainer">
            <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] z-10 mix-blend-overlay"></div>
            
            <div v-for="(log, idx) in terminalLogs" :key="idx" class="w-full break-words relative z-20" :class="{
                'text-green-400': log.type === 'success',
                'text-red-500 font-bold': log.type === 'error',
                'text-yellow-400': log.type === 'warning',
                'text-gray-300': log.type === 'info'
              }">
              {{ log.text }}
            </div>
          </div>
        </div>

      </section>

      <transition name="fade">
        <div v-if="isDetecting" class="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center rounded-xl">
          <div class="flex flex-col items-center">
            <div class="relative w-24 h-24 mb-6">
              <div class="absolute inset-0 rounded-full border-4 border-cyan-500/30"></div>
              <div class="absolute inset-0 rounded-full border-t-4 border-cyan-400 animate-spin" style="animation-duration: 1.5s;"></div>
              <svg class="absolute inset-0 m-auto w-10 h-10 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h2 class="text-2xl font-bold text-white tracking-widest animate-pulse">AI 正在深度诊断环境与日志...</h2>
          </div>
        </div>
      </transition>

      <transition name="fly-to-left">
        <div v-if="showErrorPopup" class="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div class="bg-[#1e1516] border border-red-500/50 rounded-xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(220,38,38,0.3)] pointer-events-auto transform transition-all duration-700">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4 shrink-0">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 class="text-xl font-bold text-red-400">检测到致命异常</h3>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed mb-6 bg-red-900/10 p-3 rounded border border-red-900/30">
              分析终端日志发现：雷达话题配置错误（应为 /rplidar_scan），且摄像头节点 astrapro_nodelet 因权限被拒绝导致加载失败。
            </p>
            <button @click="handleRewrite" class="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-600/20">
              AI 去优化并重写代码
            </button>
          </div>
        </div>
      </transition>

      <transition name="fly-to-left">
        <div v-if="showSuccessPopup" class="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div class="bg-[#15221b] border border-green-500/50 rounded-xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(34,197,94,0.3)] pointer-events-auto transform transition-all duration-700">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4 shrink-0">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 class="text-xl font-bold text-green-400">诊断通过，部署成功</h3>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed mb-6 bg-green-900/10 p-3 rounded border border-green-900/30">
              AI检测确认：所有硬件节点已正常启动，视频流推流正常，机器人准备就绪。
            </p>
            <button @click="handleFinish" class="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-600/20">
              继续任务 (监控机器人运行)
            </button>
          </div>
        </div>
      </transition>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'

// UI 状态控制
const theme = ref('cyan') // 'cyan' | 'red' 控制左栏和头部的丝滑变色
const activePrompt = ref('请重新给我一个冰达机器人如何按迹寻路，并实时回传镜头拍摄的图像。要有完整详细的步骤，包括机器人端，电脑端和手机端分别都有哪些具体操作。同时我需要将命令写入冰达机器人，让机器人按事先写好的路线走，并将拍摄的图像无线回传电脑，手机。冰达机器人型号是NanoCar（melodic，ROS1），雷达是rplidar_super，摄像头是astrapro，输出为代码。')

// 流程状态标志
const hasGeneratedV1 = ref(false)
const isCodeLoading = ref(false) // 仅用于输出前的纯动画 loading
const canDeployV1 = ref(false)
const canDeployV2 = ref(false)
const isDetecting = ref(false) // 终端输出后，AI扫描动画
const showErrorPopup = ref(false)
const showSuccessPopup = ref(false)
const hwActive = ref(false)

// 数据绑定
const rawCode = ref('')
const terminalLogs = ref([])
const codeContainer = ref(null)
const terminalContainer = ref(null)

// 模拟遥测
const mockCpu = ref(15)
const mockRam = ref(1.6)

// 完整详细的 V1 代码
const codeV1 = `#!/usr/bin/env python
# [Generated by AI] - NanoCar Line Follow & Video Stream (V1)
import rospy
import cv2
import numpy as np
from sensor_msgs.msg import Image, LaserScan
from geometry_msgs.msg import Twist
from cv_bridge import CvBridge, CvBridgeError

class NanoCarLineFollower:
    def __init__(self):
        rospy.init_node('line_follower_stream', anonymous=True)
        self.bridge = CvBridge()
        self.cmd_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
        
        # 订阅摄像头图像 (标准话题)
        rospy.loginfo("Subscribing to camera topic...")
        self.image_sub = rospy.Subscriber('/camera/rgb/image_raw', Image, self.image_cb)
        
        # 订阅雷达数据用于避障保护
        # BUG: 这里使用了默认的 /scan 话题，但冰达实际为 /rplidar_scan
        rospy.loginfo("Subscribing to lidar topic...")
        self.lidar_sub = rospy.Subscriber('/scan', LaserScan, self.lidar_cb)

        self.twist = Twist()
        self.safe_distance = 0.3 # 30cm安全距离

    def image_cb(self, msg):
        try:
            cv_image = self.bridge.imgmsg_to_cv2(msg, "bgr8")
            # 转换为HSV进行黄线识别
            hsv = cv2.cvtColor(cv_image, cv2.COLOR_BGR2HSV)
            lower_yellow = np.array([20, 100, 100])
            upper_yellow = np.array([30, 255, 255])
            mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
            
            # 计算质心并发布速度
            M = cv2.moments(mask)
            if M['m00'] > 0:
                cx = int(M['m10']/M['m00'])
                err = cx - cv_image.shape[1]/2
                self.twist.linear.x = 0.2
                self.twist.angular.z = -float(err) / 100
                self.cmd_pub.publish(self.twist)
                
            # 显示推流画面
            cv2.imshow("NanoCar Camera Stream", cv_image)
            cv2.waitKey(3)
        except CvBridgeError as e:
            rospy.logerr(e)
        
    def lidar_cb(self, msg):
        # 简单的雷达避障逻辑
        front_distances = msg.ranges[len(msg.ranges)//2 - 10 : len(msg.ranges)//2 + 10]
        if min(front_distances) < self.safe_distance:
            self.twist.linear.x = 0
            self.twist.angular.z = 0
            self.cmd_pub.publish(self.twist)
            rospy.logwarn("Obstacle detected! Stopping.")

if __name__ == '__main__':
    try:
        rospy.loginfo("Starting NanoCar Line Follower Node...")
        follower = NanoCarLineFollower()
        rospy.spin()
    except rospy.ROSInterruptException:
        pass`

// 修复后的 V2 代码
const codeV2 = `#!/usr/bin/env python
# [Generated by AI] - NanoCar Line Follow & Video Stream (V2 FIXED)
import rospy
import cv2
import numpy as np
import os
from sensor_msgs.msg import Image, LaserScan
from geometry_msgs.msg import Twist
from cv_bridge import CvBridge, CvBridgeError

class NanoCarLineFollower:
    def __init__(self):
        rospy.init_node('line_follower_stream', anonymous=True)
        self.bridge = CvBridge()
        self.cmd_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
        
        # [FIX]: 修复摄像头权限问题，确保 astrapro 节点能读取设备
        rospy.loginfo("Applying hardware permissions...")
        os.system("sudo chmod 777 /dev/video*")
        
        # [FIX]: 修改为正确的 astrapro 图像话题
        self.image_sub = rospy.Subscriber('/astrapro/camera/rgb/image_raw', Image, self.image_cb)
        
        # [FIX]: 修改为冰达 rplidar_super 的正确雷达话题
        rospy.loginfo("Subscribing to correct lidar topic...")
        self.lidar_sub = rospy.Subscriber('/rplidar_scan', LaserScan, self.lidar_cb)

        self.twist = Twist()
        self.safe_distance = 0.3 

    def image_cb(self, msg):
        try:
            cv_image = self.bridge.imgmsg_to_cv2(msg, "bgr8")
            hsv = cv2.cvtColor(cv_image, cv2.COLOR_BGR2HSV)
            lower_yellow = np.array([20, 100, 100])
            upper_yellow = np.array([30, 255, 255])
            mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
            
            M = cv2.moments(mask)
            if M['m00'] > 0:
                cx = int(M['m10']/M['m00'])
                err = cx - cv_image.shape[1]/2
                self.twist.linear.x = 0.2
                self.twist.angular.z = -float(err) / 100
                self.cmd_pub.publish(self.twist)
                
            # [FIX]: 降低分辨率进行无线推流优化
            stream_img = cv2.resize(cv_image, (320, 240))
            cv2.imshow("NanoCar Wireless Stream", stream_img)
            cv2.waitKey(3)
        except CvBridgeError as e:
            rospy.logerr(e)
        
    def lidar_cb(self, msg):
        # 防撞保护
        if not msg.ranges: return
        front_distances = msg.ranges[len(msg.ranges)//2 - 10 : len(msg.ranges)//2 + 10]
        if front_distances and min(front_distances) < self.safe_distance:
            self.twist.linear.x = 0
            self.twist.angular.z = 0
            self.cmd_pub.publish(self.twist)

if __name__ == '__main__':
    try:
        rospy.loginfo("Starting NanoCar Line Follower Node...")
        follower = NanoCarLineFollower()
        rospy.spin()
    except rospy.ROSInterruptException:
        pass`

// 极简高亮处理
const highlightedCode = computed(() => {
  if (!rawCode.value) return ''
  let html = rawCode.value
    .replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(#.*)/g, '<span class="text-green-500/80">$1</span>')
    .replace(/\b(import|from|class|def|if|try|except|pass|self|__init__|__name__|not|and|return)\b/g, '<span class="text-[#c678dd]">$1</span>')
    .replace(/(".*?"|'.*?')/g, '<span class="text-[#98c379]">$1</span>')
    .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="text-[#61afef]">$1</span>')
    .replace(/\b(rospy|cv2|np|os)\b/g, '<span class="text-[#e5c07b]">$1</span>')
  return html
})

// 无干扰的打字机输出逻辑
const typeWriter = (text) => {
  return new Promise((resolve) => {
    rawCode.value = ''
    let i = 0
    const chunkSize = 12 // 更快的批量输出
    
    const step = () => {
      rawCode.value += text.slice(i, i + chunkSize)
      i += chunkSize
      
      if (codeContainer.value) {
        codeContainer.value.scrollTop = codeContainer.value.scrollHeight
      }

      if (i < text.length) {
        requestAnimationFrame(step)
      } else {
        resolve()
      }
    }
    requestAnimationFrame(step)
  })
}

// 终端日志打印
const printTerminal = async (logs) => {
  terminalLogs.value = []
  for (const log of logs) {
    await new Promise(r => setTimeout(r, log.delay))
    terminalLogs.value.push({
      text: `[${new Date().toLocaleTimeString('en-US', {hour12:false, fractionalSecondDigits: 3})}] ${log.text}`,
      type: log.type
    })
    nextTick(() => {
      if (terminalContainer.value) {
        terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
      }
    })
  }
}

// ================== 核心交互流程 ==================

// 1. 生成 V1
const generateV1Code = async () => {
  hasGeneratedV1.value = true
  isCodeLoading.value = true
  // 模拟 AI 思考动画时间
  await new Promise(r => setTimeout(r, 1500))
  isCodeLoading.value = false
  // 纯净输出过程
  await typeWriter(codeV1)
  canDeployV1.value = true
}

// 2. 部署 V1，并引出报错
const deployV1 = async () => {
  canDeployV1.value = false
  
  const v1Logs = [
    { text: 'Connecting to root@192.168.3.114 via SSH...', type: 'info', delay: 300 },
    { text: 'Authentication successful.', type: 'success', delay: 400 },
    { text: 'Writing line_follow_stream.py to workspace...', type: 'info', delay: 500 },
    { text: 'Executing catkin_make --pkg nanocar_core...', type: 'info', delay: 800 },
    { text: '[100%] Built target line_follower_stream', type: 'success', delay: 600 },
    { text: 'Sourcing /opt/ros/melodic/setup.bash...', type: 'info', delay: 200 },
    { text: 'Launching roslaunch nanocar_core core.launch...', type: 'info', delay: 500 },
    { text: 'Node [/line_follower_stream] started.', type: 'info', delay: 400 },
    { text: '[FATAL] [16234234.123]: Cannot find /scan topic for rplidar_super! Check hardware connection.', type: 'error', delay: 1000 },
    { text: '[FATAL] [16234234.145]: astrapro camera nodelet load failed.', type: 'error', delay: 200 },
    { text: 'Exception thrown: Permission denied on /dev/video0.', type: 'error', delay: 100 },
    { text: 'Process [/line_follower_stream] died [pid 14521, exit code 255].', type: 'warning', delay: 300 }
  ]
  
  await printTerminal(v1Logs)
  
  // 终端输出完后，慢速播放 AI 诊断动画
  isDetecting.value = true
  await new Promise(r => setTimeout(r, 2500))
  isDetecting.value = false
  
  // 弹出异常捕获
  showErrorPopup.value = true
}

// 3. 点击弹窗重写 (丝滑收起与变色)
const handleRewrite = async () => {
  showErrorPopup.value = false // 触发 css fly-to-left 动画消失
  theme.value = 'red' // 触发左侧框丝滑变红
  activePrompt.value = "发现报错：雷达话题和摄像头权限问题。请修改雷达话题为 /rplidar_scan 并在脚本中确保摄像头节点 astrapro_nodelet 被正确加载赋予权限。"
  
  // 等待UI颜色渐变完成一小会
  await new Promise(r => setTimeout(r, 1200))
  
  isCodeLoading.value = true
  await new Promise(r => setTimeout(r, 1500))
  isCodeLoading.value = false
  
  await typeWriter(codeV2)
  canDeployV2.value = true
}

// 4. 部署 V2，成功流程
const deployV2 = async () => {
  canDeployV2.value = false
  
  const v2Logs = [
    { text: 'Re-connecting to workspace...', type: 'info', delay: 300 },
    { text: 'Overwriting line_follow_stream.py with AI patch V2...', type: 'info', delay: 500 },
    { text: 'Recompiling workspace...', type: 'info', delay: 800 },
    { text: 'Executing sudo chmod 777 /dev/video*...', type: 'info', delay: 500 },
    { text: 'Permissions granted.', type: 'success', delay: 300 },
    { text: 'Launching roslaunch nanocar_core core.launch...', type: 'info', delay: 500 },
    { text: '[SUCCESS]: /rplidar_scan topic is active and publishing (10Hz).', type: 'success', delay: 1000 },
    { text: '[SUCCESS]: astrapro camera loaded successfully at /dev/video0.', type: 'success', delay: 400 },
    { text: '[SUCCESS]: Video stream broadcasting on port 8080.', type: 'success', delay: 300 },
    { text: 'Robot path following routine active. Hardware OK.', type: 'success', delay: 200 }
  ]
  
  await printTerminal(v2Logs)
  
  // 终端输出完，再次播放 AI 检测
  isDetecting.value = true
  await new Promise(r => setTimeout(r, 2500))
  isDetecting.value = false
  
  showSuccessPopup.value = true
}

// 5. 继续任务 (丝滑收回并变回蓝)
const handleFinish = async () => {
  showSuccessPopup.value = false
  theme.value = 'cyan' // 丝滑变回蓝色
  activePrompt.value = "系统运行状态极佳。当前执行任务：自动巡线及实时图传反馈。"
  
  // 激活硬件状态指示器
  await new Promise(r => setTimeout(r, 800))
  hwActive.value = true
}

// 模拟动态波动
onMounted(() => {
  setInterval(() => {
    // 基础负载，成功后变高
    const baseCpu = hwActive.value ? 65 : 15;
    const baseRam = hwActive.value ? 2.8 : 1.6;
    
    mockCpu.value = Math.max(5, Math.min(100, baseCpu + Math.floor(Math.random() * 15 - 7)))
    mockRam.value = Number((baseRam + Math.random() * 0.2).toFixed(1))
  }, 1500)
})
</script>

<style scoped>
/* 隐藏原生滚动条并美化 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

/* AI 诊断遮罩层的淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 弹窗飞入左侧栏动画 */
.fly-to-left-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹出的回弹效果 */
}
.fly-to-left-leave-active {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); /* 收起时丝滑加速 */
}
.fly-to-left-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(30px);
}
.fly-to-left-leave-to {
  opacity: 0;
  /* 模拟吸收到左上角的位置 */
  transform: scale(0.3) translate(-80vw, -40vh); 
}

/* 雷达慢速旋转 */
.animate-spin-slow {
  animation: spin linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
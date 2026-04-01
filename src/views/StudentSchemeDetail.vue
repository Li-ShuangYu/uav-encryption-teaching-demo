<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
        <div class="flex items-center">
          <span class="text-2xl font-black text-white tracking-wide mr-2">我的架构蓝图：</span>
          <span class="text-2xl font-black transition-all" :style="{ color: currentGroup.themeColor }">
            {{ currentGroup.name }} - {{ currentGroup.title }}
          </span>
          <span class="ml-4 px-2 py-0.5 border border-gray-600 rounded bg-gray-800 text-xs text-gray-400 font-mono tracking-widest">
            [ 开发者模式 ]
          </span>
        </div>
      </div>
      <button 
        @click="backToWorkspace"
        class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        返回我的工作台
      </button>
    </header>

    <div v-if="!isEvaluated" class="flex-1 flex flex-col items-center justify-center z-10 bg-darkBg">
      <div class="w-16 h-16 border-4 border-[#2d353e] rounded-full animate-spin mb-6" :style="{ borderTopColor: currentGroup.themeColor }"></div>
      <h2 class="text-2xl font-bold text-white mb-3 tracking-wider">等待教师AI评估中...</h2>
      <p class="text-[#6b7280]">正在同步教师端下发的详细评审报告与数据架构</p>
    </div>

    <main v-else class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden">
      
      <div class="col-span-3 flex flex-col gap-3">
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          <div class="flex justify-between items-center mb-2 relative z-10">
            <span class="text-xs px-2 py-0.5 rounded font-black transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor + '33', color: currentGroup.themeColor, border: '1px solid ' + currentGroup.themeColor + '66' }">
              方案代号
            </span>
            <span class="text-textMuted text-xs font-bold font-mono">{{ currentGroup.codeId }}</span>
          </div>
          <h2 class="text-2xl font-black text-white relative z-10 mb-2">{{ currentGroup.subtitle }}</h2>
          <p class="text-sm font-medium text-textMuted leading-tight overflow-hidden relative z-10 mb-4">{{ currentGroup.desc }}</p>
          
          <div class="pt-2 border-t border-borderColor/50 flex justify-between items-end relative z-10 mb-4">
            <div class="text-xs font-bold text-textMuted">目标适配硬件</div>
            <div class="text-xl font-black italic transition-colors duration-500" :style="{ color: currentGroup.themeColor }">{{ currentGroup.hardware }}</div>
          </div>

          <div class="mt-auto grid grid-cols-2 gap-2 relative z-10">
            <button class="py-1.5 bg-[#1f2937] hover:bg-[#374151] border border-gray-600 rounded text-xs text-gray-300 font-bold transition-colors flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              API接口文档
            </button>
            <button class="py-1.5 bg-[#1f2937] hover:bg-[#374151] border border-gray-600 rounded text-xs text-gray-300 font-bold transition-colors flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              下载基础工程
            </button>
          </div>
        </div>

        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up shadow-lg" style="animation-delay: 0.2s;" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          <div class="text-xs font-black mb-3 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            开发需实现的核心算法
          </div>
          <div class="flex-1 flex flex-col justify-between gap-2">
            <div v-for="(algo, index) in currentGroup.algorithms" :key="index" class="bg-darkBg p-2.5 rounded-lg border border-borderColor border-l-4 transition-all duration-500 flex flex-col justify-center h-full" :style="{ borderLeftColor: index === 0 ? currentGroup.themeColor : (currentGroup.themeColor + '80') }">
              <div class="flex justify-between items-end mb-1">
                <span class="text-[10px] font-bold text-textMuted">{{ algo.label }}</span>
                <span class="text-sm font-black transition-colors duration-500" :style="{ color: index === 0 ? currentGroup.themeColor : '#e5e7eb' }">{{ algo.name }}</span>
              </div>
              <div class="text-[11px] text-textMain leading-tight font-medium">{{ algo.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-5 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg animate-fade-in-up" style="animation-delay: 0.25s;">
        <div class="text-base font-black text-white mb-4 flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          系统架构与数据流转参考
        </div>
        <div class="flex-1 flex flex-col justify-between mb-4 relative py-1">
          <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-borderColor -translate-x-1/2 z-0 rounded-full"></div>
          <div v-for="(layer, index) in currentGroup.archLayers" :key="index" class="relative z-10 w-[85%] mx-auto bg-cardInnerBg border rounded-lg py-2.5 px-4 flex items-center justify-between transition-all duration-500 hover:scale-[1.02]" :style="{ borderColor: layer.highlight ? currentGroup.themeColor : '#374151', backgroundColor: layer.highlight ? '#1f2937' : '' }">
            <div class="text-xs font-black transition-colors duration-500" :style="{ color: layer.highlight ? currentGroup.themeColor : '#9ca3af' }">{{ layer.name }}</div>
            <div class="text-xs font-bold text-textMain text-right w-2/3 leading-snug">{{ layer.desc }}</div>
          </div>
        </div>
        <div class="shrink-0 bg-darkBg/80 rounded-lg p-3 border border-borderColor">
          <div class="text-[11px] font-black text-textMuted mb-2 uppercase tracking-widest flex justify-between items-center">
            <span>Security Flow / 时序图节点</span>
            <span class="text-[#3b82f6] hover:underline cursor-pointer">查看详细UML图</span>
          </div>
          <div class="flex items-center justify-between text-xs font-black font-mono transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <template v-for="(step, index) in currentGroup.flow" :key="index">
              <span>{{ step }}</span>
              <span v-if="index < currentGroup.flow.length - 1" class="text-textMuted opacity-50">➔</span>
            </template>
          </div>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-3">
        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.3s; border-top-width: 4px;" :style="{ borderTopColor: currentGroup.themeColor + '66' }">
          
          <div class="px-5 pt-5 shrink-0 relative z-20 flex justify-between items-start">
            <div>
              <div class="text-sm font-black mb-1 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                项目专属队歌
              </div>
              <div class="text-lg text-white font-black tracking-widest">{{ getAudioFileName(currentGroup.music.audio) }}</div>
            </div>
            
            <div class="text-right max-w-[55%]">
              <div class="text-[11px] font-black transition-colors duration-500 mb-0.5" :style="{ color: currentGroup.themeColor }">STYLE / 风格解码</div>
              <div class="font-bold text-white text-sm leading-tight truncate">{{ currentGroup.music.tags }}</div>
              <div class="text-[10px] mt-1 text-textMuted truncate">{{ currentGroup.music.type }}</div>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-hidden z-10 flex items-center justify-center">
            <div class="absolute top-1/4 w-[85%] pointer-events-none transition-transform duration-500 ease-in-out"
                 :style="{ transform: `translateY(calc(-${(currentLyricIndex - 1) * 2.5 + 1.25}rem))` }">
              <div 
                    v-for="(lyric, index) in currentLyrics" 
                    :key="index"
                    class="h-10 flex items-center justify-center text-center transition-all duration-500 ease-out truncate"
                    :class="[
                      index < (currentLyricIndex - 1) - 2 ? 'opacity-0 scale-90' : '', 
                      index === (currentLyricIndex - 1) - 2 ? 'text-xs font-medium text-textMuted opacity-20 scale-95' : '', 
                      index === (currentLyricIndex - 1) - 1 ? 'text-sm font-medium text-textMuted opacity-60 scale-100' : '', 
                      index === currentLyricIndex - 1 ? 'font-black text-lg scale-110 opacity-100' : '', 
                      index === (currentLyricIndex - 1) + 1 ? 'text-sm font-medium text-textMuted opacity-60 scale-100' : '', 
                      index === (currentLyricIndex - 1) + 2 ? 'text-xs font-medium text-textMuted opacity-20 scale-95' : '', 
                      index > (currentLyricIndex - 1) + 2 ? 'opacity-0 scale-90' : '' 
                    ]"
                    :style="{ color: index === currentLyricIndex - 1 ? currentGroup.themeColor : '' }"
                  >
                    {{ lyric.text }}
                  </div>
            </div>
          </div>

          <div 
            class="absolute z-30 cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] drop-shadow-2xl hover:scale-105"
            :style="{
              left: 'calc(50% - 210px)',
              bottom: '220px',
              transform: `scaleX(-1) ${isPlaying ? 'rotate(34deg)' : 'rotate(10deg)'}`,
              transformOrigin: '16px 16px'
            }"
            @click="togglePlay"
            title="点击播放/暂停"
          >
            <div class="relative w-8 h-8">
              <div class="absolute inset-0 bg-black/40 rounded-full scale-125 blur-[3px] translate-y-1"></div>
              <div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border border-gray-300 shadow-md"></div>
              <div class="absolute inset-[5px] bg-gradient-to-tr from-gray-700 to-gray-900 rounded-full shadow-inner flex items-center justify-center border border-gray-600">
                <div class="w-1.5 h-1.5 bg-gradient-to-br from-white to-gray-400 rounded-full shadow-sm"></div>
              </div>
            </div>
            <div class="absolute top-[16px] left-[12px] w-2 h-[95px] bg-gradient-to-r from-gray-300 via-white to-gray-300 shadow-sm border-x border-gray-200/50"></div>
            <div class="absolute top-[110px] left-[12px] w-2 origin-top -rotate-[30deg]">
              <div class="absolute -top-[4px] left-0 w-2 h-2 bg-gradient-to-br from-white to-gray-300 rounded-full shadow-sm"></div>
              <div class="w-full h-[75px] bg-gradient-to-r from-gray-300 via-white to-gray-300 shadow-sm border-x border-gray-200/50"></div>
              <div class="absolute top-[71px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div class="w-3.5 h-2.5 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-sm shadow-inner"></div>
                <div class="w-8 h-[42px] bg-gradient-to-b from-gray-50 to-gray-200 rounded-[4px] shadow-lg flex justify-center gap-1.5 pt-3 pb-2 border-t border-b-2 border-x border-gray-100 border-b-gray-400">
                  <div class="w-[2.5px] h-full bg-gray-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] rounded-full"></div>
                  <div class="w-[2.5px] h-full bg-gray-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <audio ref="audioElement" class="hidden" preload="metadata"></audio>

          <div 
            class="absolute w-[400px] h-[400px] rounded-full shadow-[0_-10px_40px_rgba(0,0,0,0.8)] border-[8px] border-gray-900 flex items-center justify-center vinyl-spin z-0" 
            :class="{ 'vinyl-playing': isPlaying }"
            style="left: calc(50% - 200px); bottom: -180px;"
          >
            <div class="absolute inset-0 rounded-full" style="background: repeating-radial-gradient(#1f2937 0, #1f2937 5px, #111827 6px, #111827 8px);"></div>
            <div class="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-transparent pointer-events-none"></div>
            <div class="relative w-20 h-20 rounded-full shadow-inner flex items-center justify-center transition-colors duration-500 z-10" :style="{ backgroundColor: currentGroup.themeColor }">
              <div class="w-4 h-4 rounded-full bg-darkBg border border-black/50 shadow-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// 导入音频文件 (请确保路径正确)
import audioLight from '../assets/audio/轻量级.mp3';
import audioSideChannel from '../assets/audio/侧信道.mp3';
import audioAntiReplay from '../assets/audio/抗重放.mp3';
import audioPostQuantum from '../assets/audio/后量子算法.mp3';

const getAudioFileName = (audio) => {
  if (typeof audio === 'string') {
    const fileName = audio.split('/').pop().replace(/\.mp3$/, '');
    return decodeURIComponent(fileName);
  } else if (audio && typeof audio === 'object') {
    const url = audio.default || audio;
    if (typeof url === 'string') {
      const fileName = url.split('/').pop().replace(/\.mp3$/, '');
      return decodeURIComponent(fileName);
    }
  }
  if (audio === audioLight) return '轻量级';
  if (audio === audioSideChannel) return '侧信道';
  if (audio === audioAntiReplay) return '抗重放';
  if (audio === audioPostQuantum) return '后量子算法';
  return '';
};

const router = useRouter();
const route = useRoute();

// 修改：返回学生工作台
const backToWorkspace = () => {
  // router.push('/student/task-split');
  router.back();
};

const groups = [
  {
    id: 1,
    name: '第一组',
    title: '通信安全 + 低功耗专用版',
    subtitle: '轻量级无人机加密体制',
    codeId: 'SEC-LOWPOWER-01',
    themeColor: '#3b82f6', 
    desc: '专注民用小型无人机通信安全，采用 PRESENT 与 ECC 组合，实现数据加密传输与双向认证，满足加解密时延≤10ms与功耗≤50mW的极致轻量需求。',
    hardware: 'STM32L432',
    music: { tags: '清脆活泼、电子拨弦、快节奏', type: '映射轻量级、低时延特征', audio: audioLight, lyrics: [
      { text: " ", duration: 0 },  
      { text: "轻量级", duration: 9500 },
      { text: "我漫步在月光之下", duration: 5000 },
      { text: "微风轻抚着我的脸颊", duration: 4500 },
      { text: "宁静在心中慢慢流淌", duration: 5000 },
      { text: "时光仿佛停止了步伐", duration: 4000 },
      { text: "这宁静让我心醉", duration: 4600 },
      { text: "让我忘记所有疲惫", duration: 7100 },
      { text: "这宁静让我沉醉", duration: 5500 },
      { text: "让我在这夜色中静美", duration: 12000 },
      { text: "我沉醉在这夜色中心", duration: 9000 },
      { text: "微风轻抚着我的脸颊", duration: 10000 },
      { text: "宁静在心中缓缓流淌", duration: 9800 },
      { text: "时光仿佛凝固了年华", duration: 6300 },
      { text: "这宁静让我心醉", duration: 5000 },
      { text: "让我忘记所有疲惫", duration: 5500 },
      { text: "这宁静让我沉醉", duration: 4500 },
      { text: "让我在这夜色中静美", duration: 5500 },
      { text: "end~", duration: 15000 }
    ] },
    archLayers: [
      { name: '应用层', desc: '飞行控制指令、航拍/定位数据输入输出', highlight: false },
      { name: '安全层', desc: '身份认证、数据加解密、密钥协商', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发', highlight: false },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、电源模块', highlight: true }
    ],
    flow: ['双向身份认证', '协商一次性会话密钥', '数据加解密与校验', '销毁密钥与系统休眠'],
    algorithms: [
      { label: '轻量级数据加密', name: 'PRESENT 算法', desc: '64bit分组/80bit密钥，SPN结构31轮迭代。控制指令采用 ECB，影像数据采用 CBC 模式。' },
      { label: '双向身份认证', name: 'ECC (secp256r1)', desc: '无人机与终端基于 ECC 验证双方合法性，认证通过后动态协商生成一次一密的会话密钥。' }
    ]
  },
  {
    id: 2,
    name: '第二组',
    title: '通信安全 + 侧信道防护版',
    subtitle: '高安全抗物理攻击体制',
    codeId: 'SEC-SIDECHNL-02',
    themeColor: '#ef4444', 
    desc: '聚焦通信安全与侧信道防护，引入一阶掩码与恒定时间代码实现，阻断功耗、时序等物理信息泄露，抵御差分功耗分析（DPA）攻击。',
    hardware: 'STM32L432',
    music: { tags: '多层叠加、沉稳厚重、低频轰鸣', type: '映射掩码防护、高运算冗余特征', audio: audioSideChannel, lyrics: [
      { text: " ", duration: 0 },  
      { text: "侧信道", duration: 1200 },
      { text: "挣脱了羁绊", duration: 3000 },
      { text: "我在网络中跳跃", duration: 3300 },
      { text: "你听那轻微的高频正在掩埋", duration: 3700 },
      { text: "动荡的节拍在流淌", duration: 3300 },
      { text: "我在虚拟世界探索远方", duration: 3500 },
      { text: "那瞬间光芒在闪掉", duration: 3500 },
      { text: "你是我在网络中的心跳", duration: 3500 },
      { text: "穿越比特间起伏的信号", duration: 3500 },
      { text: "感受这轻微的拥抱", duration: 3500 }
    ] },
    archLayers: [
      { name: '安全核心层', desc: '通信加密、身份认证、侧信道防护（掩码+恒定时间）', highlight: true },
      { name: '通信接口层', desc: 'WiFi / 蓝牙数据收发、帧封装', highlight: false },
      { name: '硬件支撑层', desc: 'STM32L432 低功耗单片机、电源、无线模组', highlight: true }
    ],
    flow: ['初始化防护单元', '双向认证与密钥协商', '掩码异或与恒定时间加密', '结束销毁与休眠'],
    algorithms: [
      { label: '侧信道防护加密', name: 'PRESENT + 掩码机制', desc: '将敏感数据与随机掩码异或以切断密钥关联，算法无分支跳转并随机插入空操作打乱功耗特征。' },
      { label: '身份认证体系', name: 'ECC 双向认证', desc: '执行设备校验并完成会话密钥协商，保障密钥分发的安全性与合法性。' }
    ]
  },
  {
    id: 3,
    name: '第三组',
    title: '通信安全 + 抗重放攻击',
    subtitle: '强时效性指令防劫持体制',
    codeId: 'SEC-NOREPLAY-03',
    themeColor: '#f59e0b', 
    desc: '有效阻止攻击者截取、重复发送旧数据包干扰正常通信。引入滑动窗口计数器机制，收发双方维护严格同步计数，确保指令唯一有效。',
    hardware: 'STM32L432',
    music: { tags: '节奏恒定、机械感强、精准节拍', type: '映射时间戳严格对齐、序列号递增特征', audio: audioAntiReplay, lyrics: [
      { text: "", duration: 0 },
      { text: "抗重放", duration: 8200 },
      { text: "单行道上 时针在倒转", duration: 3950 },
      { text: "指针划破 沉默的河岸", duration: 3650 },
      { text: "数字在闪烁 倒数着遗憾", duration: 3900 },
      { text: "却停不下 前进的船", duration: 3200 },
      { text: "重复的风景 在倒退", duration: 3400 },
      { text: "心跳却加速 如潮水", duration: 3950 },
      { text: "把昨天装进 漂流瓶", duration: 3800 },
      { text: "让未来在 掌心沸腾", duration: 20000 },
      { text: "单行道上 黎明在追赶", duration: 3800 },
      { text: "路灯把影子 切成两半", duration: 3800 },
      { text: "呼吸在发烫 脉搏在震颤", duration: 3900 },
      { text: "脚步丈量着 地平线", duration: 3800 },
      { text: "年轮在胸口 刻下疤", duration: 3800 },
      { text: "时光却催促着 发芽", duration: 3900 },
      { text: "把叹息折成 纸飞机", duration: 3900 },
      { text: "让远方在 云端呼吸", duration: 8300 },
      { text: "end", duration: 29700 }
    ] },
    archLayers: [
      { name: '安全层', desc: '数据加解密、身份校验、抗重放计数管理', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙数据收发、数据包封装', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、无线通信模块', highlight: false }
    ],
    flow: ['初始化同步计数器', '身份与同步校验', '附加计数器并加密传输', '接收解密校验过期丢弃'],
    algorithms: [
      { label: '通信安全加密', name: 'PRESENT 算法', desc: '硬件实现简单、资源占用低，对控制指令、航拍与定位数据进行全程加密传输。' },
      { label: '抗重放防护机制', name: '滑动窗口计数器', desc: '每发送一帧计数器自增并随数据加密发送；接收端校验大于本地记录才处理，并自动丢弃过期旧包。' }
    ]
  },
  {
    id: 4,
    name: '第四组',
    title: '通信安全 + 后量子算法',
    subtitle: '面向未来算力威胁前瞻体制',
    codeId: 'SEC-PQUANTUM-04',
    themeColor: '#8b5cf6', 
    desc: '面向未来量子计算环境，采用抗量子破解的轻量级后量子密码机制，摒弃传统易被攻破的方案，抵御未来的量子暴力破解威胁。',
    hardware: 'STM32L432',
    music: { tags: '未来感、复杂合成器、广阔空间', type: '映射庞大矩阵运算、大公钥体积特征', audio: audioPostQuantum, lyrics: [
      { text: "纯音乐。。。", duration: 30000 },
    ] },
    archLayers: [
      { name: '安全层', desc: '后量子密钥协商、数据加解密、通信安全封装', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发、帧格式处理', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗嵌入式平台、无线模块', highlight: false }
    ],
    flow: ['加载后量子参数', 'Kyber 安全密钥协商', '共享密钥加密通信', '接收解密与密钥清除'],
    algorithms: [
      { label: '密钥交换算法', name: 'CRYSTALS-Kyber', desc: '基于格基(Lattice)难题的轻量级后量子加密算法，不依赖传统ECC/RSA，抗量子攻击且运算速度快。' },
      { label: '实时通信加密', name: '对称加密体制', desc: '使用 Kyber 算法安全协商生成的会话密钥对通信数据进行实时加解密，保障协议兼容性与高机密性。' }
    ]
  }
];

// 从 localStorage 读取组信息
const currentGroupId = ref(1);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));

// === 核心修改：阻塞等待与轮询逻辑 ===
const isEvaluated = ref(false);
let pollingTimer = null;

const fetchState = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/state');
    const state = await res.json();
    if (state.ai_evaluated === 1) {
      isEvaluated.value = true;
      if (pollingTimer) clearInterval(pollingTimer);
    }
  } catch (error) {
    // 静默处理，避免影响页面
  }
};

onMounted(() => {
  // 从 localStorage 读取组信息
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    const groupInfo = JSON.parse(storedInfo);
    if (groupInfo.groupId) {
      currentGroupId.value = groupInfo.groupId;
    }
  }
  
  currentLyricIndex.value = 1; 
  loadCurrentGroupAudio(); 
  
  if (audioElement.value) {
    audioElement.value.addEventListener('ended', handleAudioEnded);
  }

  // 开启状态机轮询
  fetchState();
  pollingTimer = setInterval(fetchState, 1000);
});

const currentLyrics = computed(() => currentGroup.value?.music?.lyrics || []);
const currentLyricIndex = ref(0);
let lyricTimer = null;
const isPlaying = ref(false);
const audioElement = ref(null);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startLyricTimer();
    playAudio();
  } else {
    stopLyricTimer();
    pauseAudio();
  }
};

const playAudio = () => {
  if (audioElement.value) {
    audioElement.value.play().catch(error => console.error('音频播放失败:', error));
  }
};

const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause();
  }
};

const loadAudio = (audioUrl) => {
  if (audioElement.value) {
    audioElement.value.src = audioUrl;
  }
};

const loadCurrentGroupAudio = () => {
  if (currentGroup.value && currentGroup.value.music && currentGroup.value.music.audio) {
    loadAudio(currentGroup.value.music.audio);
  }
};

const startLyricTimer = () => {
  if (!lyricTimer) {
    const playNextLyric = () => {
      const currentDuration = currentLyrics.value[currentLyricIndex.value].duration;
      currentLyricIndex.value += 1;
      if (currentLyricIndex.value >= currentLyrics.value.length) {
        currentLyricIndex.value = 0;
      }
      lyricTimer = setTimeout(playNextLyric, currentDuration);
    };
    lyricTimer = setTimeout(playNextLyric, 0); 
  }
};

const stopLyricTimer = () => {
  if (lyricTimer) {
    clearTimeout(lyricTimer);
    lyricTimer = null;
  }
};

const handleAudioEnded = () => {
  isPlaying.value = false;
  currentLyricIndex.value = 1; 
  stopLyricTimer(); 
};

onUnmounted(() => {
  if (lyricTimer) clearTimeout(lyricTimer);
  if (audioElement.value) {
    audioElement.value.removeEventListener('ended', handleAudioEnded);
  }
  if (pollingTimer) clearInterval(pollingTimer);
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

@keyframes spin-record {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
.vinyl-spin {
  animation: spin-record 5s linear infinite; 
  animation-play-state: paused;
}
.vinyl-playing {
  animation-play-state: running;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
</style>
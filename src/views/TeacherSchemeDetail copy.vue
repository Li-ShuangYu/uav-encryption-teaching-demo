<template>
  <div class="flex flex-col flex-1 overflow-hidden h-full min-h-0">
    <div class="flex flex-1 overflow-hidden min-h-0">
        <div class="w-[45%] border-r border-borderColor flex flex-col bg-darkBg min-h-0 fade-in">
            <div class="px-4 py-3 flex justify-between items-center border-b border-borderColor fade-in" style="animation-delay: 0.1s;">
                <div class="flex items-center space-x-3 text-lg">
                    <svg class="w-5 h-5 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    <span class="font-bold text-gray-200">学生需求提交列表</span>
                    <span class="text-accentGreenDark text-sm ml-2">主线/支线任务归档</span>
                </div>
                <div class="flex space-x-1 text-sm">
                    <button disabled class="bg-panelBg text-white px-3 py-1 rounded border border-borderColor shadow-inner transition disabled:opacity-80 flex items-center space-x-1">
                        <svg v-if="isSimulating" class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div v-else-if="!hasFinished" class="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                        <span>{{ isSimulating ? `接收第 ${currentPlayingGroup} 组...` : (hasFinished ? '全部接收完毕' : '自动监听中') }}</span>
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-2 p-3 border-b border-borderColor fade-in" style="animation-delay: 0.2s;">
                <div class="bg-panelBg border border-borderColor rounded-lg p-2 flex flex-col justify-between h-20 relative transition-colors fade-in" :class="{'shadow-[0_0_15px_rgba(59,130,246,0.3)]': isSimulating}" style="animation-delay: 0.3s;">
                    <div class="text-sm text-textMuted">学生任务接收完成率</div>
                    <div class="text-3xl text-white mt-1">{{ stats.completionRate }}%</div>
                </div>
                <div class="bg-panelBg border border-borderColor rounded-lg p-2 flex flex-col justify-between h-20 relative transition-colors fade-in" :class="{'shadow-[0_0_15px_rgba(59,130,246,0.3)]': isSimulating}" style="animation-delay: 0.4s;">
                    <div class="text-sm text-textMuted">学生提交需求总条数</div>
                    <div class="text-3xl text-white mt-1">{{ stats.totalDemands }}<span class="text-sm text-textMuted ml-1">条</span></div>
                </div>
                <div class="bg-panelBg border border-borderColor rounded-lg p-2 flex flex-col justify-between h-20 relative transition-colors fade-in" :class="{'shadow-[0_0_15px_rgba(59,130,246,0.3)]': isSimulating}" style="animation-delay: 0.5s;">
                    <div class="text-sm text-textMuted">参与提交的学生数</div>
                    <div class="text-3xl text-white mt-1">{{ stats.studentCount }}<span class="text-sm text-textMuted ml-1">人</span></div>
                </div>
            </div>

            <div class="flex-1 overflow-y-hidden relative bg-darkBg fade-in" style="animation-delay: 0.6s;">
                <div v-if="visibleDemands.length === 0" class="absolute inset-0 flex items-center justify-center text-textMuted text-base">
                    等待学生提交需求...
                </div>
                <transition-group name="list" tag="div" class="flex flex-col h-full relative">
                    <div v-for="(demand, index) in visibleDemands" :key="demand.id" class="list-item absolute w-full px-4 py-3 border-b border-borderColor bg-darkBg hover:bg-panelBg transition group" :style="{ top: `${index * 96}px`, height: '96px' }">
                        <div class="absolute top-3 right-4 text-sm text-textMuted">
                            <span>{{ demand.timeText }}</span>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img :src="`https://ui-avatars.com/api/?name=${demand.name}&background=${demand.avatarBg}&color=fff`" class="w-10 h-10 rounded-full flex-shrink-0" alt="avatar">
                            <div class="flex-col w-full pr-14">
                                <div class="text-base text-gray-200 leading-snug truncate-2-lines" :title="demand.content">{{ demand.content }}</div>
                                <div class="flex items-center mt-1.5 space-x-2">
                                    <span class="text-sm text-textMuted">{{ demand.name }}（{{ demand.role }}）</span>
                                    <span :class="`bg-${demand.color}-900/40 text-${demand.color}-400 border-${demand.color}-800/50`" class="text-xs px-1.5 py-0.5 rounded border">{{ demand.tag }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>

            <div class="px-4 py-2.5 flex justify-center border-t border-borderColor text-sm space-x-3 bg-darkBg text-textMuted min-h-[40px] fade-in" style="animation-delay: 0.7s;">
                <span class="text-accentGreen font-bold" v-if="stats.totalDemands > 0">1</span>
                <span class="hover:text-white cursor-pointer" v-if="stats.totalDemands > 5">2</span>
                <span class="hover:text-white cursor-pointer" v-if="stats.totalDemands > 10">3</span>
            </div>
        </div>

        <div class="flex-1 flex flex-col bg-darkBg min-h-0 fade-in" style="animation-delay: 0.8s;">
            <div class="p-4 flex-1 flex flex-col border-b border-borderColor min-h-0 fade-in" style="animation-delay: 0.9s;">
                <div class="text-base font-bold text-accentGreen mb-2 flex items-center fade-in" style="animation-delay: 1s;">
                    <svg class="w-5 h-5 text-accentGreen mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    需求词云分析 <span class="text-textMuted font-normal">（当前任务：无人机通信加密设计）</span>
                </div>
                
                <div class="bg-panelBg flex-1 rounded-lg border border-borderColor p-4 relative word-cloud-container min-h-0 overflow-hidden fade-in" style="animation-delay: 1.1s;">
                    <div v-if="visibleWords.length === 0" class="absolute inset-0 flex items-center justify-center text-textMuted text-base">
                        等待数据源生成词云...
                    </div>
                    <transition-group name="fade">
                        <div v-for="word in visibleWords" :key="word.text" class="wc-item absolute" :class="[word.colorClass, word.sizeClass]" :style="{ top: word.top, left: word.left }">
                            {{ word.text }}
                        </div>
                    </transition-group>
                </div>
            </div>

            <div class="p-4 flex-1 flex flex-col min-h-0 fade-in" style="animation-delay: 1.2s;">
                <div class="text-sm font-bold text-accentGreen mb-2 flex items-center justify-between fade-in" style="animation-delay: 1.3s;">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-accentGreen mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                        需求汇总梳理
                    </div>
                    <div class="flex space-x-2">
                        <button @click="triggerAIReview" :disabled="stats.totalDemands === 0 || aiReviewState !== 0" class="bg-accentGreen hover:bg-accentGreenDark text-white text-xs px-3 py-1 rounded transition disabled:opacity-50 disabled:cursor-not-allowed">
                            AI评审各组需求
                        </button>
                        <button @click="navigateToTaskPublish" class="bg-accentCyan hover:bg-[#00d0dd] text-black text-xs px-3 py-1 rounded transition flex items-center space-x-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            <span>跳转至任务发布页</span>
                        </button>
                    </div>
                </div>
                
                <div v-if="aiReviewState === 0" class="flex-1 flex items-center justify-center border border-dashed border-borderColor rounded-lg bg-cardInnerBg text-textMuted text-sm fade-in" style="animation-delay: 1.4s;">
                    暂无汇总数据，请先提取学生需求并进行AI评审
                </div>

                <div v-else-if="aiReviewState === 1" class="grid grid-cols-2 gap-3 flex-1 min-h-0">
                    <div 
                        v-for="(group, index) in groups" 
                        :key="group.id"
                        class="bg-cardInnerBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden fade-in"
                        :style="{ animationDelay: (1.5 + index * 0.1) + 's' }"
                    >
                        <transition name="fade-overlay">
                            <div v-if="group.isLoading" class="absolute inset-0 bg-cardInnerBg z-30 flex flex-col items-center justify-center">
                                <div class="scan-line" :style="{ background: `linear-gradient(to right, transparent, ${group.color}, transparent)` }"></div>
                                <div class="mb-3 text-sm font-bold tracking-widest animate-pulse" :style="{ color: group.color }">
                                    AI 需求深度推演中...
                                </div>
                                <div class="w-2/3 h-1.5 bg-darkBg rounded-full overflow-hidden border border-borderColor">
                                    <div 
                                        class="h-full transition-all ease-linear" 
                                        :style="{ 
                                            width: group.progress + '%', 
                                            backgroundColor: group.color,
                                            boxShadow: `0 0 8px ${group.color}`,
                                            transitionDuration: '1.2s'
                                        }"
                                    ></div>
                                </div>
                            </div>
                        </transition>
                        
                        <transition name="fade-content">
                            <div v-show="!group.isLoading" class="p-3 flex flex-col justify-between">
                                <div class="flex items-start space-x-2">
                                    <div :style="{ backgroundColor: group.color + '20', color: group.color }" class="p-1 rounded mt-0.5 shrink-0">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <div>
                                        <div :style="{ color: group.color }" class="font-bold text-sm mb-1">{{ group.title }}</div>
                                        <p class="text-sm text-gray-200 leading-snug">{{ group.description }}</p>
                                    </div>
                                </div>
                                <div class="mt-2 flex items-center space-x-3 text-xs">
                                    <span :style="{ color: group.color }">{{ group.tag }}</span>
                                    <span class="text-textMuted">优先级：{{ group.priority }}</span>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>

                <div v-else class="grid grid-cols-2 gap-3 flex-1 min-h-0">
                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-blue-500 transition overflow-y-auto scrollbar-hide fade-in-up" style="animation-delay: 0.1s;">
                        <div class="flex items-start space-x-2">
                            <div class="bg-blue-500/20 text-blue-400 p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <div class="text-blue-400 font-bold text-sm mb-1">【需求点一】</div>
                                <p class="text-sm text-gray-200 leading-snug">高保密性要求。无人机飞控指令与传输数据需具备极强的抗窃听能力，加密机制需杜绝非法第三方破解与信息窃取。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-blue-400">安全加密</span>
                            <span class="text-textMuted">优先级：高</span>
                        </div>
                    </div>

                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-red-500 transition overflow-y-auto scrollbar-hide fade-in-up" style="animation-delay: 0.2s;">
                        <div class="flex items-start space-x-2">
                            <div class="bg-red-500/20 text-red-400 p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <div>
                                <div class="text-red-400 font-bold text-sm mb-1">【需求点二】</div>
                                <p class="text-sm text-gray-200 leading-snug">高完整性要求。需建立数据校验机制，防止飞行坐标、控制指令在传输过程中被恶意篡改，保障无人机飞行安全。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-red-400">数据校验</span>
                            <span class="text-textMuted">优先级：高</span>
                        </div>
                    </div>

                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-yellow-500 transition overflow-y-auto scrollbar-hide fade-in-up" style="animation-delay: 0.3s;">
                        <div class="flex items-start space-x-2">
                            <div class="bg-yellow-500/20 text-yellow-400 p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <div class="text-yellow-400 font-bold text-sm mb-1">【需求点三】</div>
                                <p class="text-sm text-gray-200 leading-snug">低时延高可用要求。无人机高速移动场景下，加密握手与加解密处理时延需控制在毫秒级，保障指令实时响应。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-yellow-400">实时响应</span>
                            <span class="text-textMuted">优先级：中</span>
                        </div>
                    </div>

                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-purple-500 transition overflow-y-auto scrollbar-hide fade-in-up" style="animation-delay: 0.4s;">
                        <div class="flex items-start space-x-2">
                            <div class="bg-purple-500/20 text-purple-400 p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            </div>
                            <div>
                                <div class="text-purple-400 font-bold text-sm mb-1">【需求点四】</div>
                                <p class="text-sm text-gray-200 leading-snug">低功耗适配要求。受限于无人机机载电池容量，加密算法与安全机制需严格控制额外功耗，适配嵌入式设备算力约束。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-purple-400">低耗适配</span>
                            <span class="text-textMuted">优先级：中</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- 状态与统计数据初始为空 ---
const isSimulating = ref(false)
const hasFinished = ref(false)
const stats = reactive({
    completionRate: 0,
    totalDemands: 0,
    studentCount: 0
})
const visibleDemands = ref([])
const visibleWords = ref([])

// 用于界面显示的当前正在播放的组
const currentPlayingGroup = ref(0) 

// --- 核心：队列与已播放记录（防止重复和混乱） ---
const animationQueue = reactive([]) // 存放等待播放动画的组号 [1, 2, 3, 4]
const playedGroups = new Set()      // 记录已经播放过的组号
let pollingTimer = null

// --- AI评审状态 (0: 未开始, 1: 动画中, 2: 完成) ---
const aiReviewState = ref(0)
const progressBars = reactive([
    { label: '解析提取安全加密核心特征...', progress: 0, textColor: 'text-blue-400', bgColor: 'bg-blue-500' },
    { label: '验证侧信道与数据校验模型...', progress: 0, textColor: 'text-red-400', bgColor: 'bg-red-500' },
    { label: '正在评估时延毫秒级响应标准...', progress: 0, textColor: 'text-yellow-400', bgColor: 'bg-yellow-500' },
    { label: '计算后量子算法硬件功耗适配率...', progress: 0, textColor: 'text-purple-400', bgColor: 'bg-purple-500' }
])

// --- 组数据 (原有布局数据完全不变) --- 
const groups = reactive([
  { id: 1, name: '第一组', color: '#3b82f6', progress: 0, isLoading: true, delay: 300, title: '【需求点一】', description: '高保密性要求。无人机飞控指令与传输数据需具备极强的抗窃听能力，加密机制需杜绝非法第三方破解与信息窃取。', tag: '安全加密', priority: '高' },
  { id: 2, name: '第二组', color: '#ef4444', progress: 0, isLoading: true, delay: 600, title: '【需求点二】', description: '高完整性要求。需建立数据校验机制，防止飞行坐标、控制指令在传输过程中被恶意篡改，保障无人机飞行安全。', tag: '数据校验', priority: '高' },
  { id: 3, name: '第三组', color: '#f59e0b', progress: 0, isLoading: true, delay: 900, title: '【需求点三】', description: '低时延高可用要求。无人机高速移动场景下，加密握手与加解密处理时延需控制在毫秒级，保障指令实时响应。', tag: '实时响应', priority: '中' },
  { id: 4, name: '第四组', color: '#8b5cf6', progress: 0, isLoading: true, delay: 1200, title: '【需求点四】', description: '低功耗适配要求。受限于无人机机载电池容量，加密算法与安全机制需严格控制额外功耗，适配嵌入式设备算力约束。', tag: '低耗适配', priority: '中' }
]);

// --- 预设的28条学生需求数据 (绝对不改变你的数据) ---
const allDemands = [
    { id: 1, name: '李论', role: '理论型', avatarBg: '3b82f6', color: 'blue', tag: '主线需求', content: '通过AI资料推送工具查到，密码系统需满足机密性、完整性、可用性。' },
    { id: 2, name: '李论', role: '理论型', avatarBg: '3b82f6', color: 'blue', tag: '核心约束', content: '结合无人机场景特性，必须将算力有限、时延敏感作为核心约束。' },
    { id: 3, name: '张实', role: '实践型', avatarBg: '3b82f6', color: 'blue', tag: '支线低功耗', content: '我之前做过仿真，无人机机载设备功耗不能太高，这也是重要需求。' },
    { id: 4, name: '赵组', role: '组织型', avatarBg: '3b82f6', color: 'blue', tag: 'AI工具交互', content: 'AI助教，我们组梳理了初始需求，麻烦用AI需求分类工具帮我们分类。' },
    { id: 5, name: '赵组', role: '组织型', avatarBg: '3b82f6', color: 'blue', tag: 'AI工具交互', content: '请重点标注通信加密相关的核心需求（语音输入同步记录）。' },
    { id: 6, name: '王论', role: '理论型', avatarBg: 'ef4444', color: 'red', tag: '支线侧信道', content: 'AI资料推送工具显示，无人机易受侧信道攻击与重放攻击。' },
    { id: 7, name: '王论', role: '理论型', avatarBg: 'ef4444', color: 'red', tag: '通信协议', content: '通信协议设计必须包含严格的侧信道防护与抗重放机制。' },
    { id: 8, name: '刘实', role: '实践型', avatarBg: 'ef4444', color: 'red', tag: '时延约束', content: '通信加密的时延不能太长，否则严重影响无人机指令传输。' },
    { id: 9, name: '陈组', role: '组织型', avatarBg: 'ef4444', color: 'red', tag: 'AI同步', content: 'AI助教，我们需求已提交，请用分类工具处理，并推送防护资料。' },
    { id: 10, name: '孙论', role: '理论型', avatarBg: 'f59e0b', color: 'yellow', tag: '主线需求', content: 'AI工具推送资料显示，避免非法设备接入链路是核心，必须身份认证。' },
    { id: 11, name: '孙论', role: '理论型', avatarBg: 'f59e0b', color: 'yellow', tag: '身份认证', content: '必须实现双向身份认证，且认证握手时延需控制在毫秒级以内。' },
    { id: 12, name: '周实', role: '实践型', avatarBg: 'f59e0b', color: 'yellow', tag: '硬件适配', content: '加密算法要适配无人机算力，不能太复杂，否则现实中无法落地。' },
    { id: 13, name: '吴组', role: '组织型', avatarBg: 'f59e0b', color: 'yellow', tag: 'AI校验', content: 'AI助教，用需求分类工具帮我们检查是否有遗漏，补充典型安全需求。' },
    { id: 14, name: '郑论', role: '理论型', avatarBg: '8b5cf6', color: 'purple', tag: '支线后量子', content: '后量子算法适配是支线，通过AI资料推送工具获取了算力兼容要求。' },
    { id: 15, name: '郑论', role: '理论型', avatarBg: '8b5cf6', color: 'purple', tag: '兼容性', content: '除基础安全性外，需重点评估算法复杂度对现有嵌入式芯片算力的兼容性。' },
    { id: 16, name: '王实', role: '实践型', avatarBg: '8b5cf6', color: 'purple', tag: '数据安全', content: '通信数据加密需要支持多种数据类型，确保指令、传输数据都安全。' },
    { id: 17, name: '李组', role: '组织型', avatarBg: '8b5cf6', color: 'purple', tag: '可视化图表', content: 'AI助教，请分类整理并标注主线与支线相关需求，生成可视化分类图表。' },
    { id: 18, name: '赵组', role: '组织型', avatarBg: '3b82f6', color: 'blue', tag: '确认接收', content: '组1核心需求5条分类完成，已收到AI推送的低功耗相关参考资料。' },
    { id: 19, name: '陈组', role: '组织型', avatarBg: 'ef4444', color: 'red', tag: '确认接收', content: '组2补充的侧信道防护细节已通过AI需求分类工具录入系统。' },
    { id: 20, name: '吴组', role: '组织型', avatarBg: 'f59e0b', color: 'yellow', tag: '确认接收', content: '组3需求无遗漏，身份认证时延控制的细节已补充并同步完成。' },
    { id: 21, name: '李论', role: '理论型', avatarBg: '3b82f6', color: 'blue', tag: '支线低功耗', content: '结合AI资料补充：机载电池容量有限，加密算法执行时功耗需最低水平。' },
    { id: 22, name: '张实', role: '实践型', avatarBg: '3b82f6', color: 'blue', tag: '方案设计', content: '没问题，增加的1条密钥更新低功耗需求在后续方案我会重点考虑。' },
    { id: 23, name: '赵组', role: '组织型', avatarBg: '3b82f6', color: 'blue', tag: 'AI备案', content: '同步更新最终需求清单，提交给AI需求分类工具完成备案。' },
    { id: 24, name: '王论', role: '理论型', avatarBg: 'ef4444', color: 'red', tag: '支线侧信道', content: 'AI提示我们在物理层面的硬件侧信道防护考量还不够，需要补充。' },
    { id: 25, name: '刘实', role: '实践型', avatarBg: 'ef4444', color: 'red', tag: '方案设计', content: '确实，我把硬件侧信道防护也加进补充需求里了。' },
    { id: 26, name: '李组', role: '组织型', avatarBg: '8b5cf6', color: 'purple', tag: '确认接收', content: '后量子算法适配相关技术参数已通过AI资料推送工具全部同步。' },
    { id: 27, name: '孙论', role: '理论型', avatarBg: 'f59e0b', color: 'yellow', tag: '主线需求', content: 'AI生成的图表很清晰，主线认证机制的毫秒级时延是设计的硬指标。' },
    { id: 28, name: '吴组', role: '组织型', avatarBg: 'f59e0b', color: 'yellow', tag: '最终提交', content: '各组讨论完毕，确认无误，最终需求大纲准备提交系统进行统一审批。' }
]

// --- 预设的15个词云词汇库 (绝对不改变你的数据) ---
const wordCloudPool = [
    { text: '通信加密', top: '45%', left: '45%', colorClass: 'text-green-500', sizeClass: 'text-4xl font-bold' },
    { text: '低功耗优化', top: '25%', left: '32%', colorClass: 'text-[#3b82f6]', sizeClass: 'text-3xl' },
    { text: '侧信道防护', top: '70%', left: '60%', colorClass: 'text-[#ef4444]', sizeClass: 'text-2xl' },
    { text: '抗重放攻击', top: '30%', left: '65%', colorClass: 'text-[#f59e0b]', sizeClass: 'text-xl' },
    { text: '后量子算法', top: '65%', left: '28%', colorClass: 'text-[#8b5cf6]', sizeClass: 'text-xl' },
    { text: '机密性', top: '45%', left: '22%', colorClass: 'text-[#3b82f6]', sizeClass: 'text-lg' },
    { text: '完整性', top: '45%', left: '75%', colorClass: 'text-[#ef4444]', sizeClass: 'text-lg' },
    { text: '可用性', top: '18%', left: '50%', colorClass: 'text-[#f59e0b]', sizeClass: 'text-base' },
    { text: '时延敏感', top: '78%', left: '50%', colorClass: 'text-[#8b5cf6]', sizeClass: 'text-base' },
    { text: '算力有限', top: '22%', left: '18%', colorClass: 'text-[#3b82f6]', sizeClass: 'text-sm' },
    { text: '身份认证', top: '78%', left: '78%', colorClass: 'text-[#ef4444]', sizeClass: 'text-sm' },
    { text: '密钥更新', top: '78%', left: '22%', colorClass: 'text-[#f59e0b]', sizeClass: 'text-sm' },
    { text: '兼容性', top: '22%', left: '78%', colorClass: 'text-[#8b5cf6]', sizeClass: 'text-sm' },
    { text: '低时延', top: '12%', left: '68%', colorClass: 'text-[#3b82f6]', sizeClass: 'text-sm' },
    { text: '低功耗', top: '82%', left: '32%', colorClass: 'text-[#ef4444]', sizeClass: 'text-sm' }
]

let timeUpdateInterval = null

// --- 第0步：重置后端状态 ---
const resetBackendState = async () => {
    try {
        await fetch('/api/state/reset', {
            method: 'POST'
        });
        console.log('后端状态已重置为默认值');
    } catch (error) {
        console.error('重置后端状态失败:', error);
        // 即使重置失败，也继续执行后续逻辑
    }
}

// --- 第1步：轮询后端获取状态 ---
const fetchState = async () => {
    try {
        const res = await fetch('/api/state');
        const state = await res.json();
        
        // 检查四组的状态，如果变成1，且没播过，且不在队列中，则加入播放队列
        [1, 2, 3, 4].forEach(groupId => {
            const fieldName = `demand_g${groupId}_submitted`;
            if (state[fieldName] === 1 && !playedGroups.has(groupId) && !animationQueue.includes(groupId)) {
                animationQueue.push(groupId);
            }
        });
        
        // 尝试触发队列消费
        processQueue();
    } catch (error) {
        // 忽略网络错误，不影响页面崩溃
    }
}

// --- 第2步：队列处理器（防止多组同时提交导致页面混乱） ---
const processQueue = () => {
    // 如果当前正在播放动画，或者队列为空，则不动作
    if (isSimulating.value || animationQueue.length === 0) return;
    
    // 取出队列里的第一个组开始播放
    const nextGroup = animationQueue.shift();
    playGroupAnimation(nextGroup);
}

// --- 第3步：按组分段模拟动画数据写入 ---
const playGroupAnimation = (groupId) => {
    isSimulating.value = true;
    currentPlayingGroup.value = groupId;
    playedGroups.add(groupId);

    // 均分 28 条需求 (每组 7 条)
    const demandStart = (groupId - 1) * 7;
    const demandEnd = groupId * 7;
    const groupDemands = allDemands.slice(demandStart, demandEnd);

    // 均分 15 个词云 (前三组4个，第四组3个)
    const wordStart = (groupId - 1) * 4;
    const wordEnd = groupId === 4 ? 15 : groupId * 4;
    const groupWords = wordCloudPool.slice(wordStart, wordEnd);

    let currentTick = 0;
    const totalTicks = groupDemands.length; // 7步
    const intervalMs = 600; // 每条需求间隔 0.6 秒

    const groupSimInterval = setInterval(() => {
        if (currentTick >= totalTicks) {
            // 本组播放完毕
            clearInterval(groupSimInterval);
            isSimulating.value = false;
            
            // 检查是否4组全部播完
            if (playedGroups.size === 4) {
                hasFinished.value = true;
            }
            
            // 立即看队列里还有没有下一组需要播
            processQueue(); 
            return;
        }

        // 1. 插入当前组的需求条目
        const newItem = { ...groupDemands[currentTick], timestamp: Date.now(), timeText: '刚刚' };
        visibleDemands.value.unshift(newItem);
        if (visibleDemands.value.length > 5) {
            visibleDemands.value.pop();
        }

        // 2. 累加更新总统计面板
        stats.totalDemands++;
        stats.completionRate = Math.min(100, Math.floor((stats.totalDemands / 28) * 100));
        stats.studentCount = Math.min(12, Math.ceil((stats.totalDemands / 28) * 12));

        // 3. 均匀插入词云 (每两步插一个词)
        if (currentTick % 2 === 0 && (currentTick / 2) < groupWords.length) {
             visibleWords.value.push(groupWords[currentTick / 2]);
        }

        currentTick++;
    }, intervalMs);
}

// --- 时间流逝更新 (原有逻辑保留) ---
const startTimeUpdater = () => {
    if(timeUpdateInterval) clearInterval(timeUpdateInterval);
    timeUpdateInterval = setInterval(() => {
        visibleDemands.value.forEach(d => {
            const diff = Math.floor((Date.now() - d.timestamp) / 1000);
            d.timeText = diff === 0 ? '刚刚' : `${diff}秒前`;
        })
    }, 1000)
}

// --- 挂载时启动 ---
onMounted(() => {
    // 第0步：重置后端状态
    resetBackendState();
    
    startTimeUpdater();
    // 先查一次
    fetchState();
    // 每秒轮询一次后端状态
    pollingTimer = setInterval(fetchState, 1000);
})

// --- 销毁时清理 ---
onUnmounted(() => {
    if (pollingTimer) clearInterval(pollingTimer);
    if (timeUpdateInterval) clearInterval(timeUpdateInterval);
})

// --- 原有：触发AI评审动画 (保留完全不变) ---
const triggerAIReview = () => {
    if(aiReviewState.value !== 0) return;
    aiReviewState.value = 1
    groups.forEach(group => {
        group.isLoading = true;
        group.progress = 0;
    });
    const startLoadingSimulation = () => {
        groups.forEach((group) => {
            setTimeout(() => {
                group.progress = 100;
                setTimeout(() => { group.isLoading = false; }, 1200);
            }, group.delay);
        });
    };
    startLoadingSimulation();
    setTimeout(() => { aiReviewState.value = 2; }, 4000);
}

// 跳转到任务发布页
const navigateToTaskPublish = () => {
  router.push('/teacher/task-publish')
}
</script>

<style scoped>
/* 针对列表项平滑插拔的过渡动画 */
.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
/* 必须将离开的元素设为绝对定位，才能使平移生效 (JS里通过行内style配合绝对定位实现了精确定轨) */

/* 词云渐变出现动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* 最终AI结果卡片上浮动画 */
.fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 截断文本保持两行 */
.truncate-2-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 扫描线动画 */
.scan-line {
  width: 100%;
  height: 2px;
  position: absolute;
  animation: scan 2.5s linear infinite;
  opacity: 0.4;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* 过渡动画 */
.fade-overlay-leave-active {
  transition: opacity 0.6s ease-out;
}
.fade-overlay-leave-to {
  opacity: 0;
}

.fade-content-enter-active {
  transition: opacity 0.8s ease-in;
}
.fade-content-enter-from {
  opacity: 0;
}

/* 入场动画 */
.fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
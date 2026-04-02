<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    
    <transition name="fade-in">
      <header v-if="showContent" class="shrink-0 h-16 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
        <div class="flex items-center gap-3">
          <div class="w-1 h-6 rounded-full" :class="groupInfo ? getColorClass('accent') : 'bg-gray-500'"></div>
          <div>
            <h1 class="text-xl font-bold text-white tracking-wide">任务详情</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            导出任务书
          </button>
          <button @click="goToSchemeUpload" :class="['px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors flex items-center gap-2', getButtonColorClass()]">
            方案提交
          </button>
        </div>
      </header>
    </transition>

    <transition name="fade-up">
      <main v-if="showContent" class="flex-1 overflow-y-auto p-6 bg-darkBg">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          
          <div class="xl:col-span-2 flex flex-col gap-5">
            
            <div class="bg-cardInnerBg rounded-xl border p-6 relative overflow-hidden transition-all duration-300" :class="groupInfo ? getColorClass('border') : 'border-gray-700'">
              <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-5" :class="groupInfo ? getColorClass('bg') : 'bg-gray-600'"></div>
              
              <div class="flex justify-between items-start mb-6 relative z-10">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl text-white flex items-center justify-center text-sm font-bold shadow-lg transition-colors duration-300" :class="groupInfo ? getColorClass('bg') : 'bg-gray-600'">
                    组 {{ groupInfo?.groupId || 1 }}
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-white">{{ groupInfo?.groupName || '低功耗优化方向' }}</h2>
                    <div class="flex items-center mt-1.5 gap-2">
                      <span class="text-xs font-medium px-2 py-0.5 rounded border flex items-center transition-colors duration-300" :class="groupInfo ? getColorClass('tag') : 'border-gray-600 bg-gray-800 text-gray-400'">
                        <span class="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" :class="groupInfo ? getColorClass('dot') : 'bg-gray-500'"></span>
                        任务已确认
                      </span>
                      <span class="text-xs text-textMuted">ID: {{ taskId }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4 relative z-10">
                <div class="bg-darkBg border border-borderColor rounded-lg p-4 hover:border-opacity-50 transition-colors" :class="groupInfo ? getColorClass('hoverBorder') : ''">
                  <h3 class="font-bold mb-2 flex items-center text-sm transition-colors duration-300" :class="groupInfo ? getColorClass('text') : 'text-gray-400'">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    【主线任务：通信加密设计】
                  </h3>
                  <p class="text-sm text-textMain leading-relaxed pl-6">
                    {{ currentTask.mainTask }}
                  </p>
                </div>
                
                <div class="bg-darkBg border border-borderColor rounded-lg p-4 hover:border-opacity-50 transition-colors" :class="groupInfo ? getColorClass('hoverBorder') : ''">
                  <h3 class="font-bold mb-2 flex items-center text-sm transition-colors duration-300" :class="groupInfo ? getColorClass('text') : 'text-gray-400'">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    【支线任务：{{ currentTask.subTaskTitle }}】
                  </h3>
                  <p class="text-sm text-textMain leading-relaxed pl-6">
                    {{ currentTask.subTask }}
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-cardInnerBg rounded-xl border border-borderColor p-6 shadow-lg">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 rounded-lg border flex items-center justify-center mr-3 transition-colors duration-300" :class="groupInfo ? getColorClass('iconBg') : 'border-gray-700 bg-gray-800'">
                  <svg class="w-4 h-4 transition-colors duration-300" :class="groupInfo ? getColorClass('icon') : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-white">团队协作与分工 (3人)</h3>
              </div>
              
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-darkBg border border-borderColor rounded-lg p-4 relative hover:border-opacity-50 transition-all duration-300 cursor-pointer" :class="groupInfo ? getColorClass('hoverBorder') : ''">
                  <div class="absolute right-3 top-3">
                    <span class="flex h-2.5 w-2.5 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="groupInfo ? getColorClass('ping') : 'bg-blue-400'"></span>
                      <span class="relative inline-flex rounded-full h-2.5 w-2.5" :class="groupInfo ? getColorClass('status') : 'bg-blue-500'"></span>
                    </span>
                  </div>
                  <h4 class="text-sm font-bold text-white mb-2">理论型</h4>
                  <p class="text-xs text-textMuted leading-relaxed">{{ currentTask.roles.theory }}</p>
                </div>

                <div class="bg-darkBg border border-borderColor rounded-lg p-4 relative hover:border-opacity-50 transition-all duration-300 cursor-pointer" :class="groupInfo ? getColorClass('hoverBorder') : ''">
                  <div class="absolute right-3 top-3">
                    <span class="flex h-2.5 w-2.5 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="groupInfo ? getColorClass('ping') : 'bg-blue-400'"></span>
                      <span class="relative inline-flex rounded-full h-2.5 w-2.5" :class="groupInfo ? getColorClass('status') : 'bg-blue-500'"></span>
                    </span>
                  </div>
                  <h4 class="text-sm font-bold text-white mb-2">实践型</h4>
                  <p class="text-xs text-textMuted leading-relaxed">{{ currentTask.roles.practice }}</p>
                </div>

                <div class="bg-darkBg border border-borderColor rounded-lg p-4 relative hover:border-opacity-50 transition-all duration-300 cursor-pointer" :class="groupInfo ? getColorClass('hoverBorder') : ''">
                  <div class="absolute right-3 top-3">
                    <span class="flex h-2.5 w-2.5 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="groupInfo ? getColorClass('ping') : 'bg-blue-400'"></span>
                      <span class="relative inline-flex rounded-full h-2.5 w-2.5" :class="groupInfo ? getColorClass('status') : 'bg-blue-500'"></span>
                    </span>
                  </div>
                  <h4 class="text-sm font-bold text-white mb-2">组织型</h4>
                  <p class="text-xs text-textMuted leading-relaxed">{{ currentTask.roles.organize }}</p>
                </div>
              </div>
            </div>

          </div>

          <div class="xl:col-span-1 bg-cardInnerBg rounded-xl border border-borderColor flex flex-col overflow-hidden h-full">
            
            <div class="p-5 border-b border-borderColor bg-panelBg shrink-0">
              <h3 class="text-lg font-bold text-white flex items-center">
                <svg class="w-5 h-5 mr-2 transition-colors duration-300" :class="groupInfo ? getColorClass('icon') : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                AI 任务辅助分析
              </h3>
            </div>

            <div class="p-5 flex-1 flex flex-col overflow-y-auto custom-scrollbar gap-4">
              
              <div class="bg-darkBg p-4 rounded-lg border border-borderColor space-y-4">
                
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">{{ currentTask.ai.insightTitle }}</span>
                  </div>
                  <p class="text-sm text-textMain leading-relaxed">{{ currentTask.ai.insightDesc }}</p>
                </div>

                <div class="space-y-2 pt-2 border-t border-gray-800">
                  <div v-for="(metric, idx) in currentTask.ai.metrics" :key="idx" class="flex items-center text-xs">
                    <span class="w-20 text-gray-400 font-medium">{{ metric.label }}</span>
                    <div class="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden mx-2">
                      <div class="h-full rounded-full transition-all duration-1000 ease-out" 
                           :class="groupInfo ? getColorClass('bg') : 'bg-gray-500'" 
                           :style="{ width: metric.value + '%' }"></div>
                    </div>
                    <span class="w-12 text-right font-mono text-gray-300">{{ metric.display }}</span>
                  </div>
                </div>

                <div class="pt-2">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="(tag, idx) in currentTask.ai.tags" :key="idx" 
                          class="px-2 py-1 text-[10px] rounded border border-gray-700 bg-gray-800 text-gray-300">
                      {{ tag }}
                    </span>
                  </div>
                </div>

              </div>
              

              <!-- 方案重点难点要点分析 -->
              <div class="rounded-lg p-4 border transition-colors duration-300 shrink-0" :class="groupInfo ? getColorClass('recommendBg') : 'bg-gray-800 border-gray-700'">
                <div class="w-1.5 h-10 rounded-full mr-4 transition-colors duration-300 float-left" :class="groupInfo ? getColorClass('accent') : 'bg-gray-600'"></div>
                <div class="ml-6">
                  <p class="text-xs mb-2 font-bold tracking-wider transition-colors duration-300" :class="groupInfo ? getColorClass('recommendText') : 'text-gray-400'">
                    方案重点难点分析
                  </p>
                  <div class="space-y-2">
                    <div v-for="(point, idx) in currentTask.analysisPoints" :key="idx" class="flex items-start">
                      <div class="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 transition-colors duration-300 flex-shrink-0" :class="groupInfo ? getColorClass('accent') : 'bg-gray-600'"></div>
                      <div>
                        <p class="text-xs font-medium text-white">{{ point.title }}</p>
                        <p class="text-xs text-textMuted mt-0.5">{{ point.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showContent = ref(false);
const groupInfo = ref(null);

// 更新后的结构化任务数据
const taskData = {
  1: {
    mainTask: '实现数据加密传输与双向身份认证，需重点适应无人机算力有限与时延敏感特性。',
    subTaskTitle: '低功耗专项',
    subTask: '机载设备功耗严格受限，需优化加密算法与密钥流程以降低整体算力开销。',
    ai: {
      insightTitle: '算法选型分析',
      insightDesc: 'PRESENT分组密码硬件实现仅需1570个门电路，极度契合资源受限的无人机环境。',
      metrics: [
        { label: '加密延迟', value: 90, display: '< 10ms' },
        { label: '功耗控制', value: 85, display: '< 50mW' },
        { label: '吞吐表现', value: 70, display: '≥ 100kb' }
      ],
      tags: ['硬件加速模块', 'S盒优化', '简化密钥更新']
    },
    recommendPlan: 'PRESENT轻量级加密 + 简化密钥更新流程',
    analysisPoints: [
      {
        title: '重点',
        description: 'PRESENT算法的硬件优化实现，S盒采用查找表减少计算开销，轮函数使用位运算提升效率。'
      },
      {
        title: '难点',
        description: '在保证安全性的前提下简化密钥更新流程，平衡安全性与功耗消耗，避免频繁密钥轮换带来的性能开销。'
      }
    ],
    algorithm: 'PRESENT',
    roles: {
      theory: '负责 PRESENT 算法的数学论证与密码学原理设计，输出理论框架。',
      practice: '负责将理论设计转化为 C/C++ 代码，并在目标硬件上进行功耗压测。',
      organize: '负责把控项目进度，撰写交互文档，并利用 AI 辅助系统校验流程。'
    }
  },
  2: {
    mainTask: '保障无线通信数据机密性与完整性，加密时延需严格控制以确保飞行指令实时传输。',
    subTaskTitle: '侧信道防护专项',
    subTask: '需阻断功耗、时序等物理信息泄露，抵御差分功耗分析等侧信道攻击风险。',
    ai: {
      insightTitle: '威胁模型分析',
      insightDesc: '面临功耗分析与时序攻击双重威胁。需在不显著增加算力负担的前提下，切断密钥物理关联。',
      metrics: [
        { label: '防护强度', value: 95, display: '高安全' },
        { label: '功耗增加', value: 30, display: '约 +30%' },
        { label: '时延控制', value: 80, display: '< 5ms' }
      ],
      tags: ['轻量级掩码', '恒定时间算法', '随机噪声注入']
    },
    recommendPlan: 'SM4国密算法 + 轻量级掩码防护技术',
    analysisPoints: [
      {
        title: '重点',
        description: 'SM4算法结合轻量级掩码技术，每轮操作添加随机掩码隐藏中间状态，防止功耗分析攻击。'
      },
      {
        title: '难点',
        description: '实现恒定时间算法消除时序差异，避免分支预测泄露密钥信息，同时控制额外的计算开销。'
      }
    ],
    algorithm: 'SM4',
    roles: {
      theory: '负责 SM4 算法的数学论证与密码学原理设计，输出理论框架。',
      practice: '负责将理论设计转化为 C/C++ 代码，并在目标硬件上进行功耗压测。',
      organize: '负责把控项目进度，撰写交互文档，并利用 AI 辅助系统校验流程。'
    }
  },
  3: {
    mainTask: '全程加密控制指令与飞行数据，强化身份认证，算法需高度适配机载算力限制。',
    subTaskTitle: '抗重放专项',
    subTask: '需设置严格的滑动窗口与同步校验机制，阻止截取旧数据包干扰，确保指令唯一有效。',
    ai: {
      insightTitle: '机制架构建议',
      insightDesc: '指令重放会导致无人机失控。核心在于建立收发双端的严密状态同步，自动丢弃过期数据。',
      metrics: [
        { label: '同步精度', value: 90, display: '±100ms' },
        { label: '验证延迟', value: 95, display: '< 2ms' },
        { label: '窗口深度', value: 75, display: '64帧' }
      ],
      tags: ['滑动窗口机制', '动态随机数', '时间戳防伪']
    },
    recommendPlan: 'SM4加密算法 + 动态随机数抗重放认证机制',
    analysisPoints: [
      {
        title: '重点',
        description: '滑动窗口维护最近64个序列号，动态随机数确保指令唯一性，双向时间戳验证防止重放攻击。'
      },
      {
        title: '难点',
        description: '建立收发双端的严密状态同步，处理网络中断后的快速恢复，避免认证失败导致的通信中断。'
      }
    ],
    algorithm: 'SM4',
    roles: {
      theory: '负责抗重放机制的数学论证与密码学原理设计，输出理论框架。',
      practice: '负责将理论设计转化为 C/C++ 代码，并在目标硬件上进行功能测试。',
      organize: '负责把控项目进度，撰写交互文档，并利用 AI 辅助系统校验流程。'
    }
  },
  4: {
    mainTask: '支持多种数据类型加密，底层通信算法需满足未来量子计算环境下的安全要求。',
    subTaskTitle: '后量子适配专项',
    subTask: '采用抗量子破解的轻量机制，需评估算力消耗并简化适配流程，降低机载硬件负担。',
    ai: {
      insightTitle: '算力演进分析',
      insightDesc: 'Shor算法对传统公钥体系构成致命威胁。采用基于格的密码学可有效抵御未来量子暴力破解。',
      metrics: [
        { label: '抗量强度', value: 100, display: 'Level 5' },
        { label: '内存占用', value: 60, display: '~10KB' },
        { label: '计算开销', value: 85, display: '0.5ms' }
      ],
      tags: ['Kyber密钥封装', 'Dilithium签名', '格密码学']
    },
    recommendPlan: '后量子加密算法 + 低算力消耗适配流程设计',
    analysisPoints: [
      {
        title: '重点',
        description: 'CRYSTALS-Kyber密钥封装结合Dilithium数字签名，构建完整的后量子密码体系，抵御Shor算法攻击。'
      },
      {
        title: '难点',
        description: '在资源受限的无人机平台上实现后量子算法，平衡安全性与性能，控制内存占用和计算开销。'
      }
    ],
    algorithm: 'Kyber',
    roles: {
      theory: '负责后量子算法的数学论证与密码学原理设计，输出理论框架。',
      practice: '负责将理论设计转化为 C/C++ 代码，并在目标硬件上进行性能测试。',
      organize: '负责把控项目进度，撰写交互文档，并利用 AI 辅助系统校验流程。'
    }
  }
};

// 颜色映射系统
const colorMap = {
  'border-blue-500': { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-400', accent: 'bg-blue-500', tag: 'border-blue-500/50 bg-blue-500/10 text-blue-400', dot: 'bg-blue-500', hoverBorder: 'hover:border-blue-500', icon: 'text-blue-400', iconBg: 'border-blue-700/50 bg-blue-900/40', recommendBg: 'bg-blue-900/20 border-blue-800/40', recommendText: 'text-blue-300/80', ping: 'bg-blue-400', status: 'bg-blue-500' },
  'border-red-500': { bg: 'bg-red-600', border: 'border-red-500', text: 'text-red-400', accent: 'bg-red-500', tag: 'border-red-500/50 bg-red-500/10 text-red-400', dot: 'bg-red-500', hoverBorder: 'hover:border-red-500', icon: 'text-red-400', iconBg: 'border-red-700/50 bg-red-900/40', recommendBg: 'bg-red-900/20 border-red-800/40', recommendText: 'text-red-300/80', ping: 'bg-red-400', status: 'bg-red-500' },
  'border-amber-500': { bg: 'bg-amber-600', border: 'border-amber-500', text: 'text-amber-400', accent: 'bg-amber-500', tag: 'border-amber-500/50 bg-amber-500/10 text-amber-400', dot: 'bg-amber-500', hoverBorder: 'hover:border-amber-500', icon: 'text-amber-400', iconBg: 'border-amber-700/50 bg-amber-900/40', recommendBg: 'bg-amber-900/20 border-amber-800/40', recommendText: 'text-amber-300/80', ping: 'bg-amber-400', status: 'bg-amber-500' },
  'border-purple-500': { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-400', accent: 'bg-purple-500', tag: 'border-purple-500/50 bg-purple-500/10 text-purple-400', dot: 'bg-purple-500', hoverBorder: 'hover:border-purple-500', icon: 'text-purple-400', iconBg: 'border-purple-700/50 bg-purple-900/40', recommendBg: 'bg-purple-900/20 border-purple-800/40', recommendText: 'text-purple-300/80', ping: 'bg-purple-400', status: 'bg-purple-500' },
  'border-green-500': { bg: 'bg-green-600', border: 'border-green-500', text: 'text-green-400', accent: 'bg-green-500', tag: 'border-green-500/50 bg-green-500/10 text-green-400', dot: 'bg-green-500', hoverBorder: 'hover:border-green-500', icon: 'text-green-400', iconBg: 'border-green-700/50 bg-green-900/40', recommendBg: 'bg-green-900/20 border-green-800/40', recommendText: 'text-green-300/80', ping: 'bg-green-400', status: 'bg-green-500' },
  'border-yellow-500': { bg: 'bg-yellow-600', border: 'border-yellow-500', text: 'text-yellow-400', accent: 'bg-yellow-500', tag: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400', dot: 'bg-yellow-500', hoverBorder: 'hover:border-yellow-500', icon: 'text-yellow-400', iconBg: 'border-yellow-700/50 bg-yellow-900/40', recommendBg: 'bg-yellow-900/20 border-yellow-800/40', recommendText: 'text-yellow-300/80', ping: 'bg-yellow-400', status: 'bg-yellow-500' },
  'border-cyan-500': { bg: 'bg-cyan-600', border: 'border-cyan-500', text: 'text-cyan-400', accent: 'bg-cyan-500', tag: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400', dot: 'bg-cyan-500', hoverBorder: 'hover:border-cyan-500', icon: 'text-cyan-400', iconBg: 'border-cyan-700/50 bg-cyan-900/40', recommendBg: 'bg-cyan-900/20 border-cyan-800/40', recommendText: 'text-cyan-300/80', ping: 'bg-cyan-400', status: 'bg-cyan-500' },
  'border-orange-500': { bg: 'bg-orange-600', border: 'border-orange-500', text: 'text-orange-400', accent: 'bg-orange-500', tag: 'border-orange-500/50 bg-orange-500/10 text-orange-400', dot: 'bg-orange-500', hoverBorder: 'hover:border-orange-500', icon: 'text-orange-400', iconBg: 'border-orange-700/50 bg-orange-900/40', recommendBg: 'bg-orange-900/20 border-orange-800/40', recommendText: 'text-orange-300/80', ping: 'bg-orange-400', status: 'bg-orange-500' }
};

onMounted(() => {
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    groupInfo.value = JSON.parse(storedInfo);
  }
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});

const currentTask = computed(() => {
  const groupId = groupInfo.value?.groupId || 1;
  return taskData[groupId] || taskData[1];
});

const taskId = computed(() => {
  const groupId = groupInfo.value?.groupId || 1;
  const prefixes = { 1: 'LWP', 2: 'SCP', 3: 'RPL', 4: 'PQC' };
  return `TSK-2026-${prefixes[groupId] || 'LWP'}`;
});

const getColorClass = (type) => {
  if (!groupInfo.value?.colorTheme?.activeBorderClass) return null;
  const borderClass = groupInfo.value.colorTheme.activeBorderClass;
  return colorMap[borderClass]?.[type] || null;
};

const getButtonColorClass = () => {
  if (!groupInfo.value?.colorTheme?.activeBorderClass) {
    return 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30';
  }
  const borderClass = groupInfo.value.colorTheme.activeBorderClass;
  const btnMap = {
    'border-blue-500': 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30',
    'border-red-500': 'bg-red-600 hover:bg-red-500 shadow-red-600/30',
    'border-amber-500': 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30',
    'border-purple-500': 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30',
    'border-green-500': 'bg-green-600 hover:bg-green-500 shadow-green-600/30',
    'border-yellow-500': 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-600/30',
    'border-cyan-500': 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30',
    'border-orange-500': 'bg-orange-600 hover:bg-orange-500 shadow-orange-600/30'
  };
  return btnMap[borderClass] || 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30';
};

const goToSchemeUpload = () => {
  router.push('/student/scheme-upload');
};
</script>

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.5s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* AI分析面板自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
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
</style>
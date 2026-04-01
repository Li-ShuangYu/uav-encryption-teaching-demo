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
          <button @click="() => { console.log('按钮被点击了!'); goToSchemeUpload(); }" :class="['px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors flex items-center gap-2 cursor-pointer', getButtonColorClass()]">
            方案提交
          </button>
        </div>
      </header>
    </transition>

    <transition name="fade-up">
      <main v-if="showContent" class="flex-1 overflow-y-auto p-6 bg-darkBg">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          
          <!-- 左侧：任务详情 -->
          <div class="xl:col-span-2 flex flex-col gap-5">
            
            <!-- 任务卡片 -->
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
                <!-- 主线任务 -->
                <div class="bg-darkBg border border-borderColor rounded-lg p-4 hover:border-opacity-50 transition-colors" :class="groupInfo ? getColorClass('hoverBorder') : ''">
                  <h3 class="font-bold mb-2 flex items-center text-sm transition-colors duration-300" :class="groupInfo ? getColorClass('text') : 'text-gray-400'">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    【主线任务：通信加密设计】
                  </h3>
                  <p class="text-sm text-textMain leading-relaxed pl-6">
                    {{ currentTask.mainTask }}
                  </p>
                </div>
                
                <!-- 支线任务 -->
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

            <!-- 团队分工卡片 -->
            <div class="bg-cardInnerBg rounded-xl border border-borderColor p-6 shadow-lg">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 rounded-lg border flex items-center justify-center mr-3 transition-colors duration-300" :class="groupInfo ? getColorClass('iconBg') : 'border-gray-700 bg-gray-800'">
                  <svg class="w-4 h-4 transition-colors duration-300" :class="groupInfo ? getColorClass('icon') : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-white">团队协作与分工 (3人)</h3>
              </div>
              
              <div class="grid grid-cols-3 gap-4">
                <!-- 理论型 -->
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

                <!-- 实践型 -->
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

                <!-- 组织型 -->
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

          <!-- 右侧：AI分析 -->
          <div class="xl:col-span-1 bg-cardInnerBg rounded-xl border border-borderColor flex flex-col overflow-hidden">
            
            <div class="p-5 border-b border-borderColor bg-panelBg">
              <h3 class="text-lg font-bold text-white flex items-center">
                <svg class="w-5 h-5 mr-2 transition-colors duration-300" :class="groupInfo ? getColorClass('icon') : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                AI 任务辅助分析
              </h3>
            </div>

            <div class="p-5 flex-1 flex flex-col overflow-y-auto">
              <pre class="text-sm text-textMain leading-relaxed mb-5 bg-darkBg p-4 rounded-lg border border-borderColor whitespace-pre-wrap font-sans">{{ currentTask.aiAnalysis }}</pre>
              
              <div class="rounded-lg p-4 flex items-center border transition-colors duration-300" :class="groupInfo ? getColorClass('recommendBg') : 'bg-gray-800 border-gray-700'">
                <div class="w-1.5 h-10 rounded-full mr-4 transition-colors duration-300" :class="groupInfo ? getColorClass('accent') : 'bg-gray-600'"></div>
                <div>
                  <p class="text-xs mb-1 font-bold tracking-wider transition-colors duration-300" :class="groupInfo ? getColorClass('recommendText') : 'text-gray-400'">推荐预选方案</p>
                  <p class="text-sm text-white font-medium">{{ currentTask.recommendPlan }}</p>
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

// 任务数据
const taskData = {
  1: {
    mainTask: '实现数据加密传输与双向身份认证，需重点适应无人机算力有限与时延敏感特性。',
    subTaskTitle: '低功耗专项',
    subTask: '机载设备功耗严格受限，需优化加密算法与密钥流程以降低整体算力开销。',
    aiAnalysis: `算法选型：PRESENT轻量级分组密码算法，硬件实现仅需1570个门电路，适合资源受限环境。

性能指标：加密延迟 < 10ms，功耗预算 < 50mW，吞吐量 ≥ 100kbps。

优化建议：简化密钥更新流程、采用硬件加速模块、优化S盒实现。`,
    recommendPlan: 'PRESENT轻量级加密 + 简化密钥更新流程',
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
    aiAnalysis: `攻击向量：功耗分析攻击、时序攻击、电磁辐射攻击，需全面防护。

防护策略：轻量级掩码技术隐藏中间状态、恒定时间算法消除时序差异、随机噪声干扰。

性能优化：硬件实现功耗降低约30%，加密延迟控制在5ms以内。`,
    recommendPlan: 'SM4国密算法 + 轻量级掩码防护技术',
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
    aiAnalysis: `攻击场景：指令重放、数据包重传、时间戳篡改，需确保指令唯一有效。

防护机制：滑动窗口维护最近64个序列号、动态随机数确保唯一性、时间戳验证。

实现参数：序列号长度32位，时钟同步误差±100ms，验证延迟< 2ms。`,
    recommendPlan: 'SM4加密算法 + 动态随机数抗重放认证机制',
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
    aiAnalysis: `量子威胁：Shor算法可破解RSA/ECC，Grover算法减半对称加密强度，需提前布局。

算法选型：Kyber密钥封装（NIST标准）、Dilithium数字签名、AES-256对称加密。

资源评估：密钥尺寸约1-2KB，计算开销0.3-0.5ms，内存需求约10KB RAM。`,
    recommendPlan: '后量子加密算法 + 低算力消耗适配流程设计',
    algorithm: 'Kyber',
    roles: {
      theory: '负责后量子算法的数学论证与密码学原理设计，输出理论框架。',
      practice: '负责将理论设计转化为 C/C++ 代码，并在目标硬件上进行性能测试。',
      organize: '负责把控项目进度，撰写交互文档，并利用 AI 辅助系统校验流程。'
    }
  }
};

// 颜色映射
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
  // 从localStorage读取组信息
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    groupInfo.value = JSON.parse(storedInfo);
    console.log('从localStorage读取的组信息:', groupInfo.value);
  }
  
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});

// 当前任务
const currentTask = computed(() => {
  const groupId = groupInfo.value?.groupId || 1;
  return taskData[groupId] || taskData[1];
});

// 任务ID
const taskId = computed(() => {
  const groupId = groupInfo.value?.groupId || 1;
  const prefixes = { 1: 'LWP', 2: 'SCP', 3: 'RPL', 4: 'PQC' };
  return `TSK-2026-${prefixes[groupId] || 'LWP'}`;
});

// 获取颜色类
const getColorClass = (type) => {
  if (!groupInfo.value?.colorTheme?.activeBorderClass) return null;
  const borderClass = groupInfo.value.colorTheme.activeBorderClass;
  return colorMap[borderClass]?.[type] || null;
};

// 获取按钮颜色类
const getButtonColorClass = () => {
  if (!groupInfo.value?.colorTheme?.activeBorderClass) {
    return 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30';
  }
  const borderClass = groupInfo.value.colorTheme.activeBorderClass;
  const colorMap = {
    'border-blue-500': 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30',
    'border-red-500': 'bg-red-600 hover:bg-red-500 shadow-red-600/30',
    'border-amber-500': 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30',
    'border-purple-500': 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30',
    'border-green-500': 'bg-green-600 hover:bg-green-500 shadow-green-600/30',
    'border-yellow-500': 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-600/30',
    'border-cyan-500': 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30',
    'border-orange-500': 'bg-orange-600 hover:bg-orange-500 shadow-orange-600/30'
  };
  return colorMap[borderClass] || 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30';
};

// 跳转到方案上传页面
const goToSchemeUpload = () => {
  console.log('点击方案提交按钮，准备跳转至方案上传页');
  console.log('目标路由名称:', 'StudentSchemeUpload');
  console.log('目标路由路径:', '/student/scheme-upload');
  
  router.push({ name: 'StudentSchemeUpload' }).catch(err => {
    console.error('路由跳转失败 (使用name):', err);
    console.log('尝试使用路径跳转...');
    router.push('/student/scheme-upload').catch(err2 => {
      console.error('路由跳转失败 (使用path):', err2);
    });
  });
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
</style>

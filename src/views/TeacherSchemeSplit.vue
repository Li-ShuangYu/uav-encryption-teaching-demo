<template>
  <div class="flex flex-col flex-1 h-screen overflow-hidden bg-[#121417] text-[#d1d5db] select-none font-sans">
    
    <header class="h-16 shrink-0 border-b border-[#2d353e] bg-[#1c2126] flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-[#23b586] rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">无人机通信加密 - 4 组方案分屏</h1>
      </div>
      <div class="flex gap-4 items-center">
        <button @click="goToAiEvaluate" class="btn-agent bg-[#1c2126] border border-[#00e5ff] text-[#00e5ff] px-5 py-2 rounded transition-colors flex items-center gap-2 font-bold hover:bg-[#00e5ff] hover:text-black">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          架构评审 Agent
        </button>
        <button 
          disabled
          class="bg-[#1c2126] text-white text-sm px-4 py-2 rounded border border-[#2d353e] transition disabled:opacity-80 flex items-center gap-2"
        >
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          方案自动监听中...
        </button>
        <button class="bg-[#23b586] hover:bg-[#1a8a66] text-white px-5 py-2 rounded shadow transition-colors flex items-center gap-2 font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          导出方案
        </button>
      </div>
    </header>

    <main class="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4 h-full overflow-hidden">
      
      <template v-for="(group, index) in allGroupData" :key="group.id">
        
        <div 
          v-if="!uploadedStates[index]"
          class="bg-[#1c2126] border border-[#2d353e] rounded-lg flex flex-col shadow-lg overflow-hidden items-center justify-center"
        >
          <div class="waiting-animation">
            <div class="spinner"></div>
            <div class="waiting-text">
              <span 
                v-for="(char, charIndex) in '等待学生提交方案。。。'" 
                :key="charIndex"
                class="waiting-char"
                :style="{ animationDelay: `${charIndex * 0.1 + (index + 1) * 0.2}s` }"
              >
                {{ char }}
              </span>
            </div>
            <div class="waiting-subtext">第 {{ index + 1 }} 组</div>
          </div>
        </div>

        <div 
          v-else
          class="bg-[#1c2126] border border-[#2d353e] rounded-lg flex flex-col shadow-lg overflow-hidden group-card slide-in"
        >
          <div class="px-4 py-3 border-b border-[#2d353e] bg-[#232930] flex justify-between items-center shrink-0">
            <h2 class="font-bold flex items-center gap-2 text-lg" :style="{ color: group.color }">
              <span class="text-xs px-2 py-0.5 rounded" :style="{ backgroundColor: `${group.color}33`, color: group.color }">
                {{ group.name }}
              </span> 
              {{ group.title }}
            </h2>
            <span class="bg-[#23b586]/20 text-[#23b586] text-xs px-2 py-1 rounded">已提交锁定</span>
          </div>

          <div class="flex-1 flex overflow-hidden p-4 gap-4">
            
            <div class="w-1/3 flex flex-col items-center justify-center bg-[#121417]/50 border border-[#2d353e] rounded-lg p-4 group cursor-pointer hover:bg-[#232930] transition">
              <div class="relative mb-3 shadow-lg">
                <svg class="w-14 h-14 text-[#2b579a]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 2.992C4 2.444 4.448 2 5.006 2h9.988a1 1 0 01.708.293l4 4a1 1 0 01.298.71V21.01C20 21.556 19.552 22 18.994 22H5.006A.996.996 0 014 21.008V2.992z"/>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg mt-2">W</div>
              </div>
              <span class="text-sm font-medium text-center text-gray-300 break-all group-hover:text-white transition">{{ group.fileName }}</span>
              <span class="text-xs text-[#6b7280] mt-1">.docx 文档</span>
            </div>

            <div class="w-2/3 overflow-y-auto space-y-3 custom-scrollbar pr-2">
              <div 
                v-for="(scheme, sIndex) in group.schemes" 
                :key="sIndex"
                class="bg-[#232930] rounded p-3 border border-[#2d353e] hover:border-[#4b5563] transition scheme-card fade-in-up"
                :style="{ animationDelay: `${sIndex * 0.15}s` }"
              >
                <div class="text-xs text-[#6b7280] mb-1">方案名称：<span class="text-gray-300 font-medium">{{ scheme.name }}</span></div>
                <div class="text-sm text-gray-200 mb-2 leading-relaxed">{{ scheme.content }}</div>
                <div class="flex items-center justify-between text-xs border-t border-[#2d353e] pt-2 mt-1">
                  <button class="text-[#23b586] hover:text-[#1a8a66] font-medium transition">查看详情</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </template>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 核心状态绑定：数组索引 0-3 分别对应 第1-4组的上传状态
const uploadedStates = ref([false, false, false, false]);
let pollingTimer = null;

// 原始数据 (一字未改)
const allGroupData = [
  {
    id: 1,
    name: '第一组',
    title: '低功耗优化方案',
    color: '#3b82f6',
    fileName: '第一组_低功耗优化方案.docx',
    schemes: [
      { 
        name: '低功耗优化方案', 
        content: '采用 PRESENT 轻量级加密算法，结合简化密钥更新流程，有效降低系统功耗，适合无人机等嵌入式设备。', 
      },
      { 
        name: '密钥管理优化方案', 
        content: '采用分层密钥管理策略，结合预共享密钥和会话密钥，减少密钥更新频率，降低功耗。', 
      }
    ]
  },
  {
    id: 2,
    name: '第二组',
    title: '侧信道防护方案',
    color: '#ef4444',
    fileName: '第二组_侧信道防护方案.docx',
    schemes: [
      { 
        name: '侧信道防护方案', 
        content: '采用掩码技术和随机化执行路径，有效防护功耗分析和时序攻击，保障密码运算的物理安全性。', 
      },
      { 
        name: '防重放攻击机制', 
        content: '基于时间戳和挑战-响应机制，实现高效的防重放攻击保护。', 
      }
    ]
  },
  {
    id: 3,
    name: '第三组',
    title: '抗重放攻击方案',
    color: '#f59e0b',
    fileName: '第三组_抗重放攻击方案.docx',
    schemes: [
      { 
        name: '抗重放攻击方案', 
        content: '基于动态随机数和序列号机制，确保抗重放攻击防护的准确性，防止恶意重放攻击。', 
      },
      { 
        name: '身份认证机制', 
        content: '强化身份认证流程，避免非法设备接入通信链路，提升系统整体安全性。', 
      }
    ]
  },
  {
    id: 4,
    name: '第四组',
    title: '后量子算法适配方案',
    color: '#8b5cf6',
    fileName: '第四组_后量子算法适配方案.docx',
    schemes: [
      { 
        name: '后量子算法适配方案', 
        content: '评估后量子加密算法的算力消耗与兼容性，简化算法适配流程，降低对无人机的算力负担。', 
      },
      { 
        name: '低算力优化', 
        content: '针对后量子算法进行轻量化优化，确保在有限算力条件下的有效运行。', 
      }
    ]
  }
];

const goToAiEvaluate = () => {
  router.push('/teacher/ai-evaluate');
};

// 重置后端状态
const resetBackendState = async () => {
  try {
    await fetch('http://localhost:3000/api/state/reset', {
      method: 'POST'
    });
    console.log('后端状态已重置为默认值');
  } catch (error) {
    console.error('重置后端状态失败:', error);
    // 即使重置失败，也继续执行后续逻辑
  }
};

// 轮询后端获取 4 组方案的上传状态
const fetchState = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/state');
    const state = await res.json();
    
    // 直接映射后端字段到前端的布尔值数组中
    uploadedStates.value[0] = state.scheme_uploaded_g1 === 1;
    uploadedStates.value[1] = state.scheme_uploaded_g2 === 1;
    uploadedStates.value[2] = state.scheme_uploaded_g3 === 1;
    uploadedStates.value[3] = state.scheme_uploaded_g4 === 1;
    
  } catch (error) {
    // 忽略网络错误，不影响页面崩溃
  }
};

onMounted(() => {
  // 先重置后端状态
  resetBackendState();
  
  fetchState(); // 先立刻查一次
  pollingTimer = setInterval(fetchState, 1000); // 每秒轮询一次
});

onUnmounted(() => {
  if (pollingTimer) {
    clearInterval(pollingTimer);
  }
});
</script>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #2d353e;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

/* Agent 按钮呼吸灯效果 */
.btn-agent {
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.3), inset 0 0 5px rgba(0, 229, 255, 0.2);
  animation: pulse-glow 2s infinite;
}
@keyframes pulse-glow {
  0% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.3), inset 0 0 5px rgba(0, 229, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.6), inset 0 0 10px rgba(0, 229, 255, 0.4); }
  100% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.3), inset 0 0 5px rgba(0, 229, 255, 0.2); }
}

/* 等待动画 */
.waiting-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px 20px;
  position: relative;
}

/* 发光背景 */
.waiting-animation::before {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(35, 181, 134, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.6; }
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #2d353e;
  border-top-color: #23b586;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(35, 181, 134, 0.3);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.waiting-text {
  font-size: 18px;
  color: #6b7280;
  font-weight: 600;
  display: flex;
  gap: 2px;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 10px rgba(35, 181, 134, 0.3);
  animation: textGlow 3s ease-in-out infinite;
}

@keyframes textGlow {
  0%, 100% { text-shadow: 0 0 10px rgba(35, 181, 134, 0.3); }
  50% { text-shadow: 0 0 20px rgba(35, 181, 134, 0.6), 0 0 30px rgba(35, 181, 134, 0.3); }
}

.waiting-char {
  display: inline-block;
  animation: charJump 2s ease-in-out infinite;
  position: relative;
}

@keyframes charJump {
  0%, 100% { 
    transform: translateY(0); 
    opacity: 0.6;
  }
  25% { 
    transform: translateY(-8px); 
    opacity: 1;
    color: #23b586;
    text-shadow: 0 0 15px rgba(35, 181, 134, 0.8);
  }
  50% { 
    transform: translateY(0); 
    opacity: 0.8;
  }
  75% { 
    transform: translateY(-4px); 
    opacity: 1;
    color: #10b981;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
  }
}

.waiting-subtext {
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
  position: relative;
  z-index: 1;
  animation: subtextFade 3s ease-in-out infinite;
}

@keyframes subtextFade {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; color: #6b7280; }
}

/* 入场动画 - 卡片滑入 */
.group-card {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.group-card.slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 方案卡片淡入上移动画 */
.scheme-card {
  opacity: 0;
  transform: translateY(20px);
}

.scheme-card.fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 刷新按钮旋转动画 */
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
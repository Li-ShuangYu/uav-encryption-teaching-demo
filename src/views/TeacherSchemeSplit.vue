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
        <button class="bg-[#1c2126] hover:bg-[#232930] text-white text-sm px-4 py-2 rounded border border-[#2d353e] transition">
          刷新数据
        </button>
        <button class="bg-[#23b586] hover:bg-[#1a8a66] text-white px-5 py-2 rounded shadow transition-colors flex items-center gap-2 font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          导出方案
        </button>
      </div>
    </header>

    <main class="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4 h-full overflow-hidden">
      
      <div 
        v-for="group in groupData" 
        :key="group.id" 
        class="bg-[#1c2126] border border-[#2d353e] rounded-lg flex flex-col shadow-lg overflow-hidden"
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
              v-for="(scheme, index) in group.schemes" 
              :key="index"
              class="bg-[#232930] rounded p-3 border border-[#2d353e] hover:border-[#4b5563] transition"
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

    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToAiEvaluate = () => {
  router.push('/teacher/ai-evaluate');
};

// 将页面数据提取为响应式对象，方便管理和渲染
const groupData = reactive([
  {
    id: 1,
    name: '第一组',
    title: 'SM4+SM3 国密组合方案',
    color: '#3b82f6', // 蓝
    fileName: '第一组_SM4+SM3国密组合方案.docx',
    schemes: [
      { 
        name: 'SM4+SM3 国密组合方案', 
        content: '采用 SM4 对称加密算法保障数据机密性，SM3 哈希算法保障数据完整性，符合国密标准，安全性高且性能稳定。', 
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
    color: '#ef4444', // 红
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
    title: '轻量级流密码方案',
    color: '#f59e0b', // 黄/橙
    fileName: '第三组_轻量级流密码方案.docx',
    schemes: [
      { 
        name: '轻量级流密码方案', 
        content: '采用轻量级流密码算法，有效降低系统功耗和计算开销，同时保证加密性能，适合无人机等嵌入式设备。', 
      },
      { 
        name: '动态密钥更新机制', 
        content: '引入动态密钥更新机制，增强流密码系统的长期安全性，防止密钥泄露风险。', 
      }
    ]
  },
  {
    id: 4,
    name: '第四组',
    title: '区块链分布式防护方案',
    color: '#8b5cf6', // 紫
    fileName: '第四组_区块链分布式防护方案.docx',
    schemes: [
      { 
        name: '区块链分布式防护方案', 
        content: '利用区块链技术实现分布式防护，通过共识机制保障数据防篡改，提高系统的安全性和可靠性。', 
      },
      { 
        name: '智能合约访问控制', 
        content: '基于智能合约实现细粒度访问控制，确保只有授权节点才能访问敏感数据和执行关键操作。', 
      }
    ]
  }
]);
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
</style>
<template>
  <div class="w-full min-h-screen bg-[#111318] flex flex-col font-sans text-gray-200 box-border p-6 overflow-hidden">
    
    <div class="flex justify-between items-center mb-6 animate-fade-in">
      <div class="flex items-center space-x-4">
        <button class="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-white tracking-wide">我的课题工作台</h1>
          <p class="text-gray-400 mt-1 text-sm">任务已锁定，请仔细阅读需求并确认团队分工。</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <button class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
          导出任务书
        </button>
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/30 transition-colors">
          进入开发环境
        </button>
      </div>
    </div>

    <div class="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-0">
      
      <div class="xl:col-span-2 flex flex-col space-y-5 animate-fade-up" style="animation-delay: 0.1s">
        
        <div class="bg-[#181a20] rounded-xl border border-blue-900/50 p-6 relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.05)]">
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-600/40">
                组 1
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-100">低功耗优化方向</h2>
                <div class="flex items-center mt-1.5 space-x-2">
                  <span class="text-xs font-medium px-2 py-0.5 rounded border border-blue-500/50 bg-blue-500/10 text-blue-400 flex items-center">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
                    任务已确认
                  </span>
                  <span class="text-xs text-gray-500">ID: TSK-2026-LWP</span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4 relative z-10">
            <div class="bg-[#13151a] border border-gray-800 rounded-lg p-4 hover:border-blue-900/50 transition-colors">
              <h3 class="text-blue-400 font-bold mb-2 flex items-center text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                【主线任务：通信加密设计】
              </h3>
              <p class="text-sm text-gray-300 leading-relaxed pl-6">
                实现数据加密传输与双向身份认证，需重点适应无人机算力有限与时延敏感特性。
              </p>
            </div>
            
            <div class="bg-[#13151a] border border-gray-800 rounded-lg p-4 hover:border-blue-900/50 transition-colors">
              <h3 class="text-blue-400 font-bold mb-2 flex items-center text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                【支线任务：低功耗专项】
              </h3>
              <p class="text-sm text-gray-300 leading-relaxed pl-6">
                机载设备功耗严格受限，需优化加密算法与密钥流程以降低整体算力开销。
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-[#181a20] to-[#141824] rounded-xl border border-blue-800/30 p-6 shadow-lg flex-1">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 rounded-lg bg-blue-900/40 border border-blue-700/50 flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
            </div>
            <h3 class="text-lg font-bold text-white">AI 任务辅助分析</h3>
          </div>
          
          <p class="text-[14px] text-gray-300 leading-relaxed mb-5 bg-[#111318]/50 p-4 rounded-lg border border-gray-800">
            已辅助明确低功耗与加密平衡指标，推送 <span class="text-blue-300 font-bold">PRESENT 算法架构</span> 与简化流程资料，为最终方案奠定基础。
          </p>
          
          <div class="bg-blue-900/20 border border-blue-800/40 rounded-lg p-4 flex items-center">
            <div class="w-1.5 h-10 bg-blue-500 rounded-full mr-4"></div>
            <div>
              <p class="text-xs text-blue-300/80 mb-1 font-bold tracking-wider">推荐预选方案</p>
              <p class="text-sm text-white font-medium">PRESENT轻量级加密 + 简化密钥更新流程</p>
            </div>
          </div>
        </div>

      </div>

      <div class="xl:col-span-1 bg-[#181a20] rounded-xl border border-gray-800 flex flex-col overflow-hidden animate-fade-up" style="animation-delay: 0.2s">
        
        <div class="p-5 border-b border-gray-800 bg-[#1c1f26]">
          <h3 class="text-lg font-bold text-white flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            团队协作与分工 (3人)
          </h3>
        </div>

        <div class="p-5 flex-1 flex flex-col space-y-4 overflow-y-auto">
          
          <div class="bg-[#13151a] border border-gray-700/60 rounded-lg p-4 relative group hover:border-blue-500/50 transition-colors cursor-pointer">
            <div class="absolute right-4 top-4">
              <span class="flex h-3 w-3 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <h4 class="text-sm font-bold text-gray-100 mb-1">理论型 (理论设计)</h4>
            <p class="text-xs text-gray-400 mb-3">负责 PRESENT 算法的数学论证与密码学原理设计，输出理论框架。</p>
            <div class="flex items-center text-xs text-gray-500">
              <div class="w-6 h-6 rounded-full bg-gray-700 mr-2 flex items-center justify-center text-white border-2 border-[#13151a]">我</div>
              已认领 (当前用户)
            </div>
          </div>

          <div class="bg-[#13151a] border border-gray-700/60 rounded-lg p-4 relative group hover:border-gray-500 transition-colors cursor-pointer">
            <div class="absolute right-4 top-4 w-2 h-2 rounded-full bg-gray-600"></div>
            <h4 class="text-sm font-bold text-gray-100 mb-1">实践型 (工程落地)</h4>
            <p class="text-xs text-gray-400 mb-3">负责将理论设计转化为 C/C++ 代码，并在目标硬件上进行功耗压测。</p>
            <div class="flex items-center text-xs text-blue-400 font-medium">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              待分配队友
            </div>
          </div>

          <div class="bg-[#13151a] border border-gray-700/60 rounded-lg p-4 relative group hover:border-gray-500 transition-colors cursor-pointer">
            <div class="absolute right-4 top-4 w-2 h-2 rounded-full bg-gray-600"></div>
            <h4 class="text-sm font-bold text-gray-100 mb-1">组织型 (AI交互)</h4>
            <p class="text-xs text-gray-400 mb-3">负责把控项目进度，撰写交互文档，并利用 AI 辅助系统校验流程。</p>
            <div class="flex items-center text-xs text-blue-400 font-medium">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              待分配队友
            </div>
          </div>

        </div>
        
        <div class="p-4 border-t border-gray-800 bg-[#16181d]">
          <button class="w-full py-2.5 rounded border border-gray-600 hover:bg-gray-700 text-sm font-medium text-gray-300 transition-colors flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
            发起组内讨论
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
// 组件逻辑保留为空，可根据实际业务接入数据
</script>

<style scoped>
/* 动画配置 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease both;
}

.animate-fade-up {
  animation: fadeUp 0.5s ease both;
}
</style>
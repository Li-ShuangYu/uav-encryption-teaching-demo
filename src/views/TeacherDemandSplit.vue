<template>
  <div class="w-full h-screen bg-[#111318] flex flex-col font-sans text-gray-200 overflow-hidden box-border">
    
    <!-- <div class="h-14 shrink-0 border-b border-gray-800 px-6 flex items-center justify-between bg-[#16181d]">
      <div class="flex items-center text-sm">
        <span class="text-emerald-400 mr-2">〇</span>
        <span class="text-emerald-400 font-bold mr-2">教师控制台</span>
        <span class="text-gray-500 mx-2">|</span>
        <span class="text-gray-400">4组需求分屏页</span>
      </div>
      
      <div class="flex items-center space-x-6 shrink-0">
        <div class="bg-gray-800/50 text-gray-300 px-4 py-1.5 rounded text-sm border border-gray-700 whitespace-nowrap">
          实现阶段: 1.需求分析 收尾
        </div>
       
       
        <div class="flex items-center text-gray-400 text-sm space-x-3 whitespace-nowrap">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            2026-03-30 10:30
          </span>
          <button class="border border-emerald-500/50 text-emerald-400 px-3 py-1 rounded text-xs hover:bg-emerald-900/30 transition">
            同步刷新
          </button>
        </div>
      </div>
    </div> -->

    <div class="flex-1 min-h-0 p-5 grid grid-cols-2 grid-rows-2 gap-5 bg-[#111318]">
      
      <div class="bg-[#181a20] rounded-xl border border-blue-900/50 flex flex-col p-5 hover:border-blue-700/60 transition-colors shadow-lg shadow-black/20">
        <div class="flex justify-between items-center mb-4 shrink-0 border-b border-gray-800 pb-3">
          <div class="flex items-center space-x-3">
            <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-900/50">组1</div>
            <h2 class="text-[17px] font-bold text-gray-100">低功耗优化方向</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2.5 py-1 rounded border border-green-800/50 font-medium">需求已提交</span>
        </div>
        
        <div class="flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar pr-1">
          <div class="text-[13.5px] text-gray-300 leading-relaxed">
            <p class="text-blue-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-blue-500 mr-2 rounded-sm"></span>【主线需求：无人机通信加密设计】</p>
            <p class="mb-3 pl-3">密码系统需满足机密性、完整性、可用性，结合无人机，还要考虑算力有限、时延敏感，这是核心约束。</p>
            <p class="text-blue-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-blue-500 mr-2 rounded-sm"></span>【支线需求：低功耗优化专项】</p>
            <p class="pl-3">无人机机载设备功耗不能太高，增加密钥更新低功耗需求。</p>
            
            <div class="mt-4 p-3 bg-blue-900/10 border border-blue-900/30 rounded-lg flex items-start space-x-2">
              <svg class="w-4 h-4 text-blue-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
              <div>
                <span class="text-blue-300 font-bold text-xs block mb-0.5">AI 需求分析提炼</span>
                <span class="text-gray-400 text-xs">梳理核心需求5条，已自动推送低功耗相关参考资料及算力约束建议。</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 shrink-0 bg-[#16181d] p-3 rounded-lg border border-gray-800">
            <p class="text-[13px] text-gray-300 font-medium"><span class="text-gray-500">预选核心方案：</span>PRESENT轻量级对称加密算法 + 简化密钥分发机制</p>
            <div class="flex items-center text-xs mt-2.5 pt-2.5 border-t border-gray-800/60 text-gray-400">
              <span class="bg-gray-800 px-2 py-0.5 rounded mr-2">小组分工</span>
              <span>理论型-李论 <span class="mx-1 text-gray-600">|</span> 实践型-张实 <span class="mx-1 text-gray-600">|</span> 组织型-赵组</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#181a20] rounded-xl border border-red-900/50 flex flex-col p-5 hover:border-red-700/60 transition-colors shadow-lg shadow-black/20">
        <div class="flex justify-between items-center mb-4 shrink-0 border-b border-gray-800 pb-3">
          <div class="flex items-center space-x-3">
            <div class="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-red-900/50">组2</div>
            <h2 class="text-[17px] font-bold text-gray-100">纯 RSA 非对称加密方案</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2.5 py-1 rounded border border-green-800/50 font-medium">需求已提交</span>
        </div>
        
        <div class="flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar pr-1">
          <div class="text-[13.5px] text-gray-300 leading-relaxed">
            <p class="text-red-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-red-500 mr-2 rounded-sm"></span>【主线需求：无人机通信加密设计】</p>
            <p class="mb-3 pl-3">通信加密的时延不能太长，否则影响无人机指令传输。</p>
            <p class="text-red-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-red-500 mr-2 rounded-sm"></span>【支线需求：侧信道防护专项】</p>
            <p class="pl-3">无人机容易遭受侧信道攻击、重放攻击，侧信道防护、抗重放是重要需求。</p>
            
            <div class="mt-4 p-3 bg-red-900/10 border border-red-900/30 rounded-lg flex items-start space-x-2">
              <svg class="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
              <div>
                <span class="text-red-300 font-bold text-xs block mb-0.5">AI 需求分析提炼</span>
                <span class="text-gray-400 text-xs">已额外补充2条侧信道防护关键指标需求，并同步下发掩码防护技术参考资料。</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 shrink-0 bg-[#16181d] p-3 rounded-lg border border-gray-800">
            <p class="text-[13px] text-gray-300 font-medium"><span class="text-gray-500">预选核心方案：</span>SM4国密加密算法 + 一阶掩码侧信道防护机制</p>
            <div class="flex items-center text-xs mt-2.5 pt-2.5 border-t border-gray-800/60 text-gray-400">
              <span class="bg-gray-800 px-2 py-0.5 rounded mr-2">小组分工</span>
              <span>理论型-王论 <span class="mx-1 text-gray-600">|</span> 实践型-刘实 <span class="mx-1 text-gray-600">|</span> 组织型-孙组</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#181a20] rounded-xl border border-amber-900/50 flex flex-col p-5 hover:border-amber-700/60 transition-colors shadow-lg shadow-black/20">
        <div class="flex justify-between items-center mb-4 shrink-0 border-b border-gray-800 pb-3">
          <div class="flex items-center space-x-3">
            <div class="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-amber-900/50">组3</div>
            <h2 class="text-[17px] font-bold text-gray-100">抗重放攻击方向</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2.5 py-1 rounded border border-green-800/50 font-medium">需求已提交</span>
        </div>
        
        <div class="flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar pr-1">
          <div class="text-[13.5px] text-gray-300 leading-relaxed">
            <p class="text-amber-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-amber-500 mr-2 rounded-sm"></span>【主线需求：无人机通信加密设计】</p>
            <p class="mb-3 pl-3">身份认证很重要，避免非法设备接入链路。加密算法要适配无人机算力，不能太复杂。</p>
            <p class="text-amber-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-amber-500 mr-2 rounded-sm"></span>【支线需求：抗重放攻击专项】</p>
            <p class="pl-3">模拟重放攻击测试有效性，需设置随机数和序列号参数确保触发准确。</p>
            
            <div class="mt-4 p-3 bg-amber-900/10 border border-amber-900/30 rounded-lg flex items-start space-x-2">
              <svg class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
              <div>
                <span class="text-amber-300 font-bold text-xs block mb-0.5">AI 需求分析提炼</span>
                <span class="text-gray-400 text-xs">逻辑校验无遗漏。已自动完善身份认证防非法接入细节，并限定随机数序列号安全范围。</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 shrink-0 bg-[#16181d] p-3 rounded-lg border border-gray-800">
            <p class="text-[13px] text-gray-300 font-medium"><span class="text-gray-500">预选核心方案：</span>SM4加密算法 + 动态随机数抗重放认证机制</p>
            <div class="flex items-center text-xs mt-2.5 pt-2.5 border-t border-gray-800/60 text-gray-400">
              <span class="bg-gray-800 px-2 py-0.5 rounded mr-2">小组分工</span>
              <span>理论型-陈论 <span class="mx-1 text-gray-600">|</span> 实践型-周实 <span class="mx-1 text-gray-600">|</span> 组织型-吴组</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#181a20] rounded-xl border border-purple-900/50 flex flex-col p-5 hover:border-purple-700/60 transition-colors shadow-lg shadow-black/20">
        <div class="flex justify-between items-center mb-4 shrink-0 border-b border-gray-800 pb-3">
          <div class="flex items-center space-x-3">
            <div class="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-purple-900/50">组4</div>
            <h2 class="text-[17px] font-bold text-gray-100">区块链分布式防护方案</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2.5 py-1 rounded border border-green-800/50 font-medium">需求已提交</span>
        </div>
        
        <div class="flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar pr-1">
          <div class="text-[13.5px] text-gray-300 leading-relaxed">
            <p class="text-purple-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-purple-500 mr-2 rounded-sm"></span>【主线需求：无人机通信加密设计】</p>
            <p class="mb-3 pl-3">通信数据加密需要支持多种数据类型，确保指令、数据传输都安全。</p>
            <p class="text-purple-400 font-bold mb-1 flex items-center"><span class="w-1 h-3 bg-purple-500 mr-2 rounded-sm"></span>【支线需求：区块链分布式防护专项】</p>
            <p class="pl-3">利用区块链技术实现分布式防护，提高系统的安全性和可靠性。</p>
            
            <div class="mt-4 p-3 bg-purple-900/10 border border-purple-900/30 rounded-lg flex items-start space-x-2">
              <svg class="w-4 h-4 text-purple-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
              <div>
                <span class="text-purple-300 font-bold text-xs block mb-0.5">AI 需求分析提炼</span>
                <span class="text-gray-400 text-xs">清单分类完成。已成功同步主辅线技术参数及区块链分布式防护所需具体指标。</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 shrink-0 bg-[#16181d] p-3 rounded-lg border border-gray-800">
            <p class="text-[13px] text-gray-300 font-medium"><span class="text-gray-500">预选核心方案：</span>采用后量子加密完成主线通信加密，适配无人机算力并简化流程。</p>
            <div class="flex items-center text-xs mt-2.5 pt-2.5 border-t border-gray-800/60 text-gray-400">
              <span class="bg-gray-800 px-2 py-0.5 rounded mr-2">小组分工</span>
              <span>理论型-郑论 <span class="mx-1 text-gray-600">|</span> 实践型-马实 <span class="mx-1 text-gray-600">|</span> 组织型-李组</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="h-20 shrink-0 border-t border-gray-800 flex justify-center items-center bg-[#16181d]">
       <!-- <button @click="backToSummary" class="bg-emerald-500 hover:bg-emerald-400 text-[#111318] px-4 py-1.5 rounded font-bold text-sm transition whitespace-nowrap">
          回到需求汇总
        </button> -->
      <button @click="enterSchemeDesign" class="bg-blue-600 hover:bg-blue-500 text-white text-[15px] font-bold py-2.5 px-10 rounded-lg shadow-lg shadow-blue-900/50 transition tracking-wide flex items-center">
        <span>进入方案设计阶段</span>
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 针对卡片内部内容过长时的自定义轻巧滚动条 */
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
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #4b5563;
}

/* 全局隐藏由于浏览器差异引发的系统级多余滚动条 */
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
*::-webkit-scrollbar {
  display: none;
}
</style>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const backToSummary = () => {
  router.push('/teacher/demand-summary')
}

const enterSchemeDesign = () => {
  router.push('/teacher/scheme-split')
}
</script>
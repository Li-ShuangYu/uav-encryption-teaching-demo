<template>
  <div class="w-full h-full bg-[#111318] flex flex-col font-sans text-gray-200 box-border p-5 overflow-hidden">
    
    <div class="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-5">
      
      <div class="bg-[#181a20] rounded-xl border border-blue-900/50 flex flex-col p-4 hover:border-blue-700/60 transition-colors shadow-lg shadow-black/20 h-full min-h-0 relative overflow-hidden">
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-900/50">组1</div>
            <h2 class="text-base font-bold text-gray-100">低功耗优化方向</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
        </div>
        
        <transition name="fade-overlay">
          <div v-if="groups[0].isLoading" class="absolute inset-0 top-[53px] bg-[#181a20] z-20 flex flex-col items-center justify-center">
            <div class="scan-line" style="background: linear-gradient(to right, transparent, #3b82f6, transparent)"></div>
            <div class="mb-3 text-sm font-bold tracking-widest animate-pulse text-blue-400">
              AI 任务辅助分析中...
            </div>
            <div class="w-2/3 h-1.5 bg-[#111318] rounded-full overflow-hidden border border-gray-800">
              <div 
                class="h-full transition-all ease-linear" 
                :style="{ 
                  width: groups[0].progress + '%', 
                  backgroundColor: '#3b82f6',
                  boxShadow: '0 0 8px #3b82f6',
                  transitionDuration: '1.5s'
                }"
              ></div>
            </div>
          </div>
        </transition>
        
        <transition name="fade-content">
          <div v-show="!groups[0].isLoading" class="flex-1 flex flex-row gap-5 min-h-0">
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div>
                <p class="text-blue-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-blue-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">实现数据加密传输与双向身份认证，需重点适应无人机算力有限与时延敏感特性。</p>
              </div>
              <div>
                <p class="text-blue-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-blue-500 mr-2 rounded-sm"></span>【支线任务：低功耗专项】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">机载设备功耗严格受限，需优化加密算法与密钥流程以降低整体算力开销。</p>
              </div>
            </div>
            <div class="w-px bg-gray-800/60 my-2"></div>
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div class="p-2.5 bg-blue-900/10 border border-blue-900/30 rounded-lg">
                <span class="text-blue-300 font-bold text-[12px] flex items-center mb-1">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  AI 任务辅助分析
                </span>
                <p class="text-gray-400 text-[11.5px] leading-snug">已辅助明确低功耗与加密平衡指标，推送PRESENT算法架构与简化流程资料，为最终方案奠定基础。</p>
              </div>
              <div class="bg-[#16181d] p-2.5 rounded-lg border border-gray-800">
                <p class="text-[12px] text-gray-300 font-medium mb-2"><span class="text-gray-500">预选方案：</span>PRESENT轻量级加密 + 简化密钥更新流程</p>
                <div class="flex items-center text-[11px] pt-2 border-t border-gray-800/60 text-gray-400">
                  <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                  <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="bg-[#181a20] rounded-xl border border-red-900/50 flex flex-col p-4 hover:border-red-700/60 transition-colors shadow-lg shadow-black/20 h-full min-h-0 relative overflow-hidden">
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-red-900/50">组2</div>
            <h2 class="text-base font-bold text-gray-100">侧信道防护方向</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
        </div>
        
        <transition name="fade-overlay">
          <div v-if="groups[1].isLoading" class="absolute inset-0 top-[53px] bg-[#181a20] z-20 flex flex-col items-center justify-center">
            <div class="scan-line" style="background: linear-gradient(to right, transparent, #ef4444, transparent)"></div>
            <div class="mb-3 text-sm font-bold tracking-widest animate-pulse text-red-400">
              AI 任务辅助分析中...
            </div>
            <div class="w-2/3 h-1.5 bg-[#111318] rounded-full overflow-hidden border border-gray-800">
              <div 
                class="h-full transition-all ease-linear" 
                :style="{ 
                  width: groups[1].progress + '%', 
                  backgroundColor: '#ef4444',
                  boxShadow: '0 0 8px #ef4444',
                  transitionDuration: '1.5s'
                }"
              ></div>
            </div>
          </div>
        </transition>
        
        <transition name="fade-content">
          <div v-show="!groups[1].isLoading" class="flex-1 flex flex-row gap-5 min-h-0">
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div>
                <p class="text-red-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-red-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">保障无线通信数据机密性与完整性，加密时延需严格控制以确保飞行指令实时传输。</p>
              </div>
              <div>
                <p class="text-red-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-red-500 mr-2 rounded-sm"></span>【支线任务：侧信道防护专项】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">需阻断功耗、时序等物理信息泄露，抵御差分功耗分析等侧信道攻击风险。</p>
              </div>
            </div>
            <div class="w-px bg-gray-800/60 my-2"></div>
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div class="p-2.5 bg-red-900/10 border border-red-900/30 rounded-lg">
                <span class="text-red-300 font-bold text-[12px] flex items-center mb-1">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  AI 任务辅助分析
                </span>
                <p class="text-gray-400 text-[11.5px] leading-snug">已辅助排查物理信息泄露风险点，推送轻量级掩码与恒定时间代码参考，成功引导加固选型。</p>
              </div>
              <div class="bg-[#16181d] p-2.5 rounded-lg border border-gray-800">
                <p class="text-[12px] text-gray-300 font-medium mb-2"><span class="text-gray-500">预选方案：</span>SM4国密算法 + 轻量级掩码防护技术</p>
                <div class="flex items-center text-[11px] pt-2 border-t border-gray-800/60 text-gray-400">
                  <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                  <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="bg-[#181a20] rounded-xl border border-amber-900/50 flex flex-col p-4 hover:border-amber-700/60 transition-colors shadow-lg shadow-black/20 h-full min-h-0 relative overflow-hidden">
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-amber-900/50">组3</div>
            <h2 class="text-base font-bold text-gray-100">抗重放攻击方向</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
        </div>
        
        <transition name="fade-overlay">
          <div v-if="groups[2].isLoading" class="absolute inset-0 top-[53px] bg-[#181a20] z-20 flex flex-col items-center justify-center">
            <div class="scan-line" style="background: linear-gradient(to right, transparent, #f59e0b, transparent)"></div>
            <div class="mb-3 text-sm font-bold tracking-widest animate-pulse text-amber-400">
              AI 任务辅助分析中...
            </div>
            <div class="w-2/3 h-1.5 bg-[#111318] rounded-full overflow-hidden border border-gray-800">
              <div 
                class="h-full transition-all ease-linear" 
                :style="{ 
                  width: groups[2].progress + '%', 
                  backgroundColor: '#f59e0b',
                  boxShadow: '0 0 8px #f59e0b',
                  transitionDuration: '1.5s'
                }"
              ></div>
            </div>
          </div>
        </transition>
        
        <transition name="fade-content">
          <div v-show="!groups[2].isLoading" class="flex-1 flex flex-row gap-5 min-h-0">
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div>
                <p class="text-amber-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-amber-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">全程加密控制指令与飞行数据，强化身份认证，算法需高度适配机载算力限制。</p>
              </div>
              <div>
                <p class="text-amber-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-amber-500 mr-2 rounded-sm"></span>【支线任务：抗重放专项】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">需设置严格的滑动窗口与同步校验机制，阻止截取旧数据包干扰，确保指令唯一有效。</p>
              </div>
            </div>
            <div class="w-px bg-gray-800/60 my-2"></div>
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div class="p-2.5 bg-amber-900/10 border border-amber-900/30 rounded-lg">
                <span class="text-amber-300 font-bold text-[12px] flex items-center mb-1">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 100-2h-2V7z"></path></svg>
                  AI 任务辅助分析
                </span>
                <p class="text-gray-400 text-[11.5px] leading-snug">已辅助梳理同步校验逻辑细节，下发滑动窗口计数器与动态机制参考，确保防护方案有效无误触。</p>
              </div>
              <div class="bg-[#16181d] p-2.5 rounded-lg border border-gray-800">
                <p class="text-[12px] text-gray-300 font-medium mb-2"><span class="text-gray-500">预选方案：</span>SM4加密算法 + 动态随机数抗重放认证机制</p>
                <div class="flex items-center text-[11px] pt-2 border-t border-gray-800/60 text-gray-400">
                  <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                  <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="bg-[#181a20] rounded-xl border border-purple-900/50 flex flex-col p-4 hover:border-purple-700/60 transition-colors shadow-lg shadow-black/20 h-full min-h-0 relative overflow-hidden">
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-purple-900/50">组4</div>
            <h2 class="text-base font-bold text-gray-100">后量子算法适配方向</h2>
          </div>
          <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
        </div>
        
        <transition name="fade-overlay">
          <div v-if="groups[3].isLoading" class="absolute inset-0 top-[53px] bg-[#181a20] z-20 flex flex-col items-center justify-center">
            <div class="scan-line" style="background: linear-gradient(to right, transparent, #8b5cf6, transparent)"></div>
            <div class="mb-3 text-sm font-bold tracking-widest animate-pulse text-purple-400">
              AI 任务辅助分析中...
            </div>
            <div class="w-2/3 h-1.5 bg-[#111318] rounded-full overflow-hidden border border-gray-800">
              <div 
                class="h-full transition-all ease-linear" 
                :style="{ 
                  width: groups[3].progress + '%', 
                  backgroundColor: '#8b5cf6',
                  boxShadow: '0 0 8px #8b5cf6',
                  transitionDuration: '1.5s'
                }"
              ></div>
            </div>
          </div>
        </transition>
        
        <transition name="fade-content">
          <div v-show="!groups[3].isLoading" class="flex-1 flex flex-row gap-5 min-h-0">
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div>
                <p class="text-purple-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-purple-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">支持多种数据类型加密，底层通信算法需满足未来量子计算环境下的安全要求。</p>
              </div>
              <div>
                <p class="text-purple-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-purple-500 mr-2 rounded-sm"></span>【支线任务：后量子适配专项】</p>
                <p class="text-[12px] text-gray-300 pl-3 leading-relaxed">采用抗量子破解的轻量机制，需评估算力消耗并简化适配流程，降低机载硬件负担。</p>
              </div>
            </div>
            <div class="w-px bg-gray-800/60 my-2"></div>
            <div class="flex-1 flex flex-col justify-center space-y-3">
              <div class="p-2.5 bg-purple-900/10 border border-purple-900/30 rounded-lg">
                <span class="text-purple-300 font-bold text-[12px] flex items-center mb-1">
                  <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                  AI 任务辅助分析
                </span>
                <p class="text-gray-400 text-[11.5px] leading-snug">已辅助生成算法适配算力评估指标，推送Kyber密钥封装机制与降耗优化指南，铺垫最终方案。</p>
              </div>
              <div class="bg-[#16181d] p-2.5 rounded-lg border border-gray-800">
                <p class="text-[12px] text-gray-300 font-medium mb-2"><span class="text-gray-500">预选方案：</span>后量子加密算法 + 低算力消耗适配流程设计</p>
                <div class="flex items-center text-[11px] pt-2 border-t border-gray-800/60 text-gray-400">
                  <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                  <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

const groups = reactive([
  { isLoading: true, progress: 0, delay: 800 },
  { isLoading: true, progress: 0, delay: 1600 },
  { isLoading: true, progress: 0, delay: 2400 },
  { isLoading: true, progress: 0, delay: 3200 }
]);

const startLoadingSimulation = () => {
  groups.forEach((group, index) => {
    setTimeout(() => {
      group.progress = 100;
      
      setTimeout(() => {
        group.isLoading = false;
      }, 1500);
    }, group.delay);
  });
};

onMounted(() => {
  startLoadingSimulation();
});
</script>

<style scoped>
.scan-line {
  width: 100%;
  height: 2px;
  position: absolute;
  animation: scan 2s linear infinite;
  opacity: 0.5;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

.fade-overlay-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-overlay-leave-to {
  opacity: 0;
}

.fade-content-enter-active {
  transition: opacity 1s ease-in-out;
}
.fade-content-enter-from {
  opacity: 0;
}
</style>
<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <transition name="toast">
      <div 
        v-if="showToast" 
        class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-accentGreen text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2 pointer-events-none"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-bold">任务已确认！即将进入方案设计阶段。</span>
      </div>
    </transition>

    <transition name="fade-in">
      <header v-if="showContent" class="shrink-0 h-16 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
        <div class="flex items-center gap-3">
          <div class="w-1 h-6 rounded-full bg-blue-500"></div>
          <h1 class="text-xl font-bold text-white tracking-wide">方案设计-任务分配</h1>
        </div>
        <div class="flex items-center gap-4">
          <span 
            class="text-xs px-3 py-1.5 rounded border font-bold flex items-center gap-1.5 bg-accentGreen/20 text-accentGreen border-accentGreen/50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            任务已确认
          </span>
        </div>
      </header>
    </transition>

    <transition name="fade-up">
      <main v-if="showContent" class="flex-1 overflow-y-auto p-6 bg-darkBg">
        <div class="grid grid-cols-2 gap-6 h-full">
          
          <div class="bg-cardInnerBg rounded-xl border border-blue-500 flex flex-col p-4 h-full relative overflow-hidden">
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-900/50">组1</div>
                <h2 class="text-lg font-bold text-white">低功耗优化方向</h2>
              </div>
              <span class="bg-gray-700/30 text-gray-400 text-xs px-2 py-1 rounded border border-gray-600/50 font-medium">任务已确认</span>
            </div>
            
            <div class="flex-1 flex flex-row gap-5 min-h-0">
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div>
                  <p class="text-blue-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-blue-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">实现数据加密传输与双向身份认证，需重点适应无人机算力有限与时延敏感特性。</p>
                </div>
                <div>
                  <p class="text-blue-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-blue-500 mr-2 rounded-sm"></span>【支线任务：低功耗专项】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">机载设备功耗严格受限，需优化加密算法与密钥流程以降低整体算力开销。</p>
                </div>
              </div>
              <div class="w-px bg-borderColor/60 my-2"></div>
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div class="p-2.5 bg-blue-900/10 border border-blue-900/30 rounded-lg">
                  <span class="text-blue-300 font-bold text-[12px] flex items-center mb-1">
                    <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                    AI 任务辅助分析
                  </span>
                  <p class="text-textMuted text-[11.5px] leading-snug">已辅助明确低功耗与加密平衡指标，推送PRESENT算法架构与简化流程资料，为最终方案奠定基础。</p>
                </div>
                <div class="bg-darkBg p-2.5 rounded-lg border border-borderColor">
                  <p class="text-[12px] text-textMain font-medium mb-2"><span class="text-textMuted">预选方案：</span>PRESENT轻量级加密 + 简化密钥更新流程</p>
                  <div class="flex items-center text-[11px] pt-2 border-t border-borderColor/60 text-textMuted">
                    <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                    <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-cardInnerBg rounded-xl border border-red-500 flex flex-col p-4 h-full relative overflow-hidden">
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-red-900/50">组2</div>
                <h2 class="text-lg font-bold text-white">侧信道防护方向</h2>
              </div>
              <span class="bg-gray-700/30 text-gray-400 text-xs px-2 py-1 rounded border border-gray-600/50 font-medium">任务已确认</span>
            </div>
            
            <div class="flex-1 flex flex-row gap-5 min-h-0">
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div>
                  <p class="text-red-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-red-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">保障无线通信数据机密性与完整性，加密时延需严格控制以确保飞行指令实时传输。</p>
                </div>
                <div>
                  <p class="text-red-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-red-500 mr-2 rounded-sm"></span>【支线任务：侧信道防护专项】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">需阻断功耗、时序等物理信息泄露，抵御差分功耗分析等侧信道攻击风险。</p>
                </div>
              </div>
              <div class="w-px bg-borderColor/60 my-2"></div>
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div class="p-2.5 bg-red-900/10 border border-red-900/30 rounded-lg">
                  <span class="text-red-300 font-bold text-[12px] flex items-center mb-1">
                    <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                    AI 任务辅助分析
                  </span>
                  <p class="text-textMuted text-[11.5px] leading-snug">已辅助排查物理信息泄露风险点，推送轻量级掩码与恒定时间代码参考，成功引导加固选型。</p>
                </div>
                <div class="bg-darkBg p-2.5 rounded-lg border border-borderColor">
                  <p class="text-[12px] text-textMain font-medium mb-2"><span class="text-textMuted">预选方案：</span>SM4国密算法 + 轻量级掩码防护技术</p>
                  <div class="flex items-center text-[11px] pt-2 border-t border-borderColor/60 text-textMuted">
                    <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                    <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-cardInnerBg rounded-xl border border-yellow-500 flex flex-col p-4 h-full relative overflow-hidden">
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 rounded-full bg-yellow-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-yellow-900/50">组3</div>
                <h2 class="text-lg font-bold text-white">抗重放攻击方向</h2>
              </div>
              <span class="bg-gray-700/30 text-gray-400 text-xs px-2 py-1 rounded border border-gray-600/50 font-medium">任务已确认</span>
            </div>
            
            <div class="flex-1 flex flex-row gap-5 min-h-0">
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div>
                  <p class="text-yellow-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-yellow-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">全程加密控制指令与飞行数据，强化身份认证，算法需高度适配机载算力限制。</p>
                </div>
                <div>
                  <p class="text-yellow-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-yellow-500 mr-2 rounded-sm"></span>【支线任务：抗重放专项】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">需设置严格的滑动窗口与同步校验机制，阻止截取旧数据包干扰，确保指令唯一有效。</p>
                </div>
              </div>
              <div class="w-px bg-borderColor/60 my-2"></div>
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div class="p-2.5 bg-yellow-900/10 border border-yellow-900/30 rounded-lg">
                  <span class="text-yellow-300 font-bold text-[12px] flex items-center mb-1">
                    <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                    AI 任务辅助分析
                  </span>
                  <p class="text-textMuted text-[11.5px] leading-snug">已辅助梳理同步校验逻辑细节，下发滑动窗口计数器与动态机制参考，确保防护方案有效无误触。</p>
                </div>
                <div class="bg-darkBg p-2.5 rounded-lg border border-borderColor">
                  <p class="text-[12px] text-textMain font-medium mb-2"><span class="text-textMuted">预选方案：</span>SM4加密算法 + 动态随机数抗重放认证机制</p>
                  <div class="flex items-center text-[11px] pt-2 border-t border-borderColor/60 text-textMuted">
                    <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                    <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-cardInnerBg rounded-xl border border-purple-500 flex flex-col p-4 h-full relative overflow-hidden">
            <div class="flex justify-between items-center mb-3 shrink-0 border-b border-borderColor pb-2">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-purple-900/50">组4</div>
                <h2 class="text-lg font-bold text-white">后量子算法适配方向</h2>
              </div>
              <span class="bg-gray-700/30 text-gray-400 text-xs px-2 py-1 rounded border border-gray-600/50 font-medium">任务已确认</span>
            </div>
            
            <div class="flex-1 flex flex-row gap-5 min-h-0">
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div>
                  <p class="text-purple-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-purple-500 mr-2 rounded-sm"></span>【主线任务：通信加密设计】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">支持多种数据类型加密，底层通信算法需满足未来量子计算环境下的安全要求。</p>
                </div>
                <div>
                  <p class="text-purple-400 font-bold mb-1 flex items-center text-[13px]"><span class="w-1 h-2.5 bg-purple-500 mr-2 rounded-sm"></span>【支线任务：后量子适配专项】</p>
                  <p class="text-[12px] text-textMuted pl-3 leading-relaxed">采用抗量子破解的轻量机制，需评估算力消耗并简化适配流程，降低机载硬件负担。</p>
                </div>
              </div>
              <div class="w-px bg-borderColor/60 my-2"></div>
              <div class="flex-1 flex flex-col justify-center space-y-3">
                <div class="p-2.5 bg-purple-900/10 border border-purple-900/30 rounded-lg">
                  <span class="text-purple-300 font-bold text-[12px] flex items-center mb-1">
                    <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                    AI 任务辅助分析
                  </span>
                  <p class="text-textMuted text-[11.5px] leading-snug">已辅助生成算法适配算力评估指标，推送Kyber密钥封装机制与降耗优化指南，铺垫最终方案。</p>
                </div>
                <div class="bg-darkBg p-2.5 rounded-lg border border-borderColor">
                  <p class="text-[12px] text-textMain font-medium mb-2"><span class="text-textMuted">预选方案：</span>后量子加密算法 + 低算力消耗适配流程设计</p>
                  <div class="flex items-center text-[11px] pt-2 border-t border-borderColor/60 text-textMuted">
                    <span class="bg-gray-800 px-1.5 py-0.5 rounded mr-2 shrink-0">3人分工</span>
                    <span class="truncate">理论型(理论设计) | 实践型(工程落地) | 组织型(AI交互)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </transition>

    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-cardInnerBg rounded-2xl border border-borderColor p-8 max-w-md w-full text-center shadow-2xl animate-fade-up">
          <div class="w-20 h-20 bg-accentGreen/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accentGreen/50">
            <svg class="w-10 h-10 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">任务确认完成</h3>
          <p class="text-sm text-textMuted mb-6 leading-relaxed">各组任务已确认，AI辅助分析已完成。<br>请准备进入方案设计阶段。</p>
          <button @click="goToNextStage" class="w-full py-3 bg-accentGreen hover:bg-accentGreenDark text-white rounded-lg font-bold transition-colors shadow-lg shadow-accentGreen/20">
            进入方案设计阶段
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showContent = ref(false);
const showSuccessModal = ref(false);
const showToast = ref(false);

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});

const goToNextStage = () => {
  showSuccessModal.value = false;
  showToast.value = true;
  
  setTimeout(() => {
    router.push('/student/scheme-upload');
  }, 2000);
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.animate-fade-up {
  animation: fadeUp 0.6s ease both;
}

@keyframes fadeUp {
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
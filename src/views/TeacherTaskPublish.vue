<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col p-4 gap-3 relative bg-darkBg text-textMain font-sans">
    
   

    <div class="w-full h-[12vh] shrink-0 bg-cardInnerBg border border-borderColor rounded-xl p-4 md:p-6 flex flex-col justify-center shadow-2xl">
      <div class="grid grid-cols-3 gap-y-4 gap-x-10 text-[1.1rem]">
        <div class="flex items-center item-label"><span class="text-textMuted w-28 shrink-0">课程名称：</span><span class="text-white font-bold">无人机密码系统设计实战</span></div>
        <div class="flex items-center item-label"><span class="text-textMuted w-28 shrink-0">实现阶段：</span><span class="text-white font-bold">第一阶段：需求分析</span></div>
        <div class="flex items-center item-label"><span class="text-textMuted w-28 shrink-0">学生人数总计：</span><span class="text-white font-bold">28 人</span></div>
        
        <div class="flex items-center item-label"><span class="text-textMuted w-28 shrink-0">当前里程：</span><span class="text-white font-bold">无人机通信加密设计</span></div>
        <div class="flex items-center item-label"><span class="text-textMuted w-28 shrink-0">分组设置：</span><span class="text-white font-bold">4 个实战小组</span></div>
        <div class="flex items-center item-label"><span class="text-textMuted w-28 shrink-0">课时时长：</span><span class="text-white font-bold">45 分钟</span></div>
      </div>
    </div>

    <div class="w-full  shrink-0 grid grid-cols-4 gap-4">
      <div class="bg-panelBg border-t-4 border-warningOrg rounded-lg p-5 shadow-lg flex flex-col">
        <div class="flex items-center text-warningOrg font-bold text-[1.15rem] mb-3 tracking-wide">
          【需求点一】
        </div>
        <div class="text-gray-100 text-base leading-relaxed font-medium">
          高保密性要求。无人机飞控指令与传输数据需具备极强的抗窃听能力，加密机制需杜绝非法第三方破解与信息窃取。
        </div>
      </div>

      <div class="bg-panelBg border-t-4 border-infoBlue rounded-lg p-5 shadow-lg flex flex-col">
        <div class="flex items-center text-infoBlue font-bold text-[1.15rem] mb-3 tracking-wide">
          【需求点二】
        </div>
        <div class="text-gray-100 text-base leading-relaxed font-medium">
          高完整性要求。需建立数据校验机制，防止飞行坐标、控制指令在传输过程中被恶意篡改，保障无人机飞行安全。
        </div>
      </div>

      <div class="bg-panelBg border-t-4 border-accentGreen rounded-lg p-5 shadow-lg flex flex-col">
        <div class="flex items-center text-accentGreen font-bold text-[1.15rem] mb-3 tracking-wide">
          【需求点三】
        </div>
        <div class="text-gray-100 text-base leading-relaxed font-medium">
          低时延高可用要求。无人机高速移动场景下，加密握手与加解密处理时延需控制在毫秒级，保障指令实时响应。
        </div>
      </div>

      <div class="bg-panelBg border-t-4 border-dangerRed rounded-lg p-5 shadow-lg flex flex-col">
        <div class="flex items-center text-dangerRed font-bold text-[1.15rem] mb-3 tracking-wide">
          【需求点四】
        </div>
        <div class="text-gray-100 text-base leading-relaxed font-medium">
          低功耗适配要求。受限于无人机机载电池容量，加密算法与安全机制需严格控制额外功耗，适配嵌入式设备算力约束。
        </div>
      </div>
    </div>

    <div class="w-full shrink-0 bg-cardInnerBg border border-borderColor rounded-xl p-5 shadow-2xl flex flex-col">
      <div class="mb-4 bg-darkBg border border-borderColor p-4 rounded-lg flex-none">
        <div class="flex items-center mb-3">
          <div class="w-1.5 h-5 bg-accentGreen mr-3 rounded-full"></div>
          <h2 class="text-xl font-bold text-white tracking-wide">【主线任务汇总】</h2>
        </div>
        <div class="pl-4">
          <textarea readonly class="w-full bg-[#121417] border border-[#00f0ff]/40 text-gray-200 text-base rounded-md p-3 resize-none outline-none font-medium block h-16 scrollbar-hide">完成无人机通信加密系统全流程设计，覆盖需求分析、方案选型、仿真验证全环节，输出可落地的加密安全方案，满足上述 4 项需求点的全部要求。</textarea>
        </div>
      </div>

      <div class="flex-1 flex flex-col min-h-0">
        <div class="flex items-center mb-3 flex-none">
          <div class="w-1.5 h-5 bg-infoBlue mr-3 rounded-full"></div>
          <h2 class="text-xl font-bold text-white tracking-wide">【支线任务方向（预填写，不可编辑）】</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-4 pl-4 flex-1 min-h-0">
          <div class="bg-panelBg border border-borderColor rounded-lg p-4 hover:border-accentGreen transition duration-300 flex flex-col h-full">
            <div class="text-white font-bold text-lg mb-2 flex items-center flex-none">
              <span class="bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-xs mr-2">组1</span>
              支线方向 1：低功耗优化
            </div>
            <textarea readonly class="flex-1 w-full bg-[#121417] border border-[#00f0ff]/40 text-gray-300 text-[0.95rem] rounded-md p-3 resize-none outline-none block scrollbar-hide">聚焦加密算法轻量化选型与密钥管理流程优化，在保障安全的前提下，最大限度降低加密机制带来的额外功耗。</textarea>
          </div>

          <div class="bg-panelBg border border-borderColor rounded-lg p-4 hover:border-infoBlue transition duration-300 flex flex-col h-full">
            <div class="text-white font-bold text-lg mb-2 flex items-center flex-none">
              <span class="bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-xs mr-2">组2</span>
              支线方向 2：侧信道防护
            </div>
            <textarea readonly class="flex-1 w-full bg-[#121417] border border-[#00f0ff]/40 text-gray-300 text-[0.95rem] rounded-md p-3 resize-none outline-none block scrollbar-hide">针对无人机嵌入式设备的物理泄露风险，设计轻量级掩码防护机制，抵御侧信道攻击，提升系统物理安全。</textarea>
          </div>

          <div class="bg-panelBg border border-borderColor rounded-lg p-4 hover:border-warningOrg transition duration-300 flex flex-col h-full">
            <div class="text-white font-bold text-lg mb-2 flex items-center flex-none">
              <span class="bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-xs mr-2">组3</span>
              支线方向 3：抗重放攻击
            </div>
            <textarea readonly class="flex-1 w-full bg-[#121417] border border-[#00f0ff]/40 text-gray-300 text-[0.95rem] rounded-md p-3 resize-none outline-none block scrollbar-hide">设计基于随机数 + 序列号的双向认证机制，杜绝非法重放攻击，保障无人机通信链路的接入安全与指令合法性。</textarea>
          </div>

          <div class="bg-panelBg border border-borderColor rounded-lg p-4 hover:border-purpleIcon transition duration-300 flex flex-col h-full">
            <div class="text-white font-bold text-lg mb-2 flex items-center flex-none">
              <span class="bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-xs mr-2">组4</span>
              支线方向 4：后量子算法适配
            </div>
            <textarea readonly class="flex-1 w-full bg-[#121417] border border-[#00f0ff]/40 text-gray-300 text-[0.95rem] rounded-md p-3 resize-none outline-none block scrollbar-hide">评估后量子加密算法在无人机场景的适配性，筛选轻量化格密码方案，保障系统在量子计算场景下的长期安全。</textarea>
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-full h-[12vh] shrink-0 flex justify-center items-center confirm-button">
      <button 
        @click="handlePublish" 
        :disabled="isPublishing"
        :class="[
          'relative overflow-hidden bg-accentCyan text-black font-extrabold text-2xl px-16 py-4 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.5)] tracking-widest transition transform border-2 border-[#00f0ff] group',
          !isPublishing ? 'hover:scale-105 hover:bg-[#00d0dd]' : 'opacity-90 cursor-not-allowed'
        ]"
      >
        <div 
          class="absolute left-0 top-0 bottom-0 bg-white/40 transition-all ease-linear" 
          style="transition-duration: 2000ms;"
          :style="{ width: publishProgress + '%' }"
        ></div>
        <span class="relative z-10">{{ isPublishing ? '任务发布中...' : '【确认发布任务】' }}</span>
      </button>
    </div>

    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
      <div class="bg-cardInnerBg border-2 border-accentCyan rounded-xl p-8 w-full max-w-[600px] shadow-[0_0_40px_rgba(0,240,255,0.2)] relative transform scale-100 transition-transform">
        
        <button @click="closeModal" class="absolute top-4 right-4 text-textMuted hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 class="text-3xl font-extrabold text-accentCyan mb-8 text-center tracking-widest">任务发布成功</h2>
        
        <div class="space-y-4 mb-10 pl-4">
          <div class="flex items-center text-gray-200 text-lg font-medium">
            <span class="text-accentGreen mr-3 text-2xl">✅</span> 任务已同步至 4 个实战小组的学生端
          </div>
          <div class="flex items-center text-gray-200 text-lg font-medium">
            <span class="text-accentGreen mr-3 text-2xl">✅</span> 需求点一～四已同步至学习工作台
          </div>
          <div class="flex items-center text-gray-200 text-lg font-medium">
            <span class="text-accentGreen mr-3 text-2xl">✅</span> 主线任务与支线任务已下发完成
          </div>
        </div>

        <div class="flex justify-center">
          <button @click="confirmJump" class="bg-accentCyan text-black font-extrabold text-xl px-10 py-3 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] tracking-wide transition transform hover:scale-105 hover:bg-[#00d0dd] border-2 border-[#00f0ff]">
            【确认并跳转至需求汇总页】
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// 状态定义
const isPublishing = ref(false)
const publishProgress = ref(0)
const showSuccessModal = ref(false)

// 发布任务按钮点击逻辑
const handlePublish = () => {
  if (isPublishing.value) return
  
  // 1. 改变按钮状态
  isPublishing.value = true
  
  // 2. 触发进度条动画 (利用内联样式的宽度和 CSS 过渡)
  setTimeout(() => {
    publishProgress.value = 100
  }, 50)

  // 3. 2秒后（进度条跑完）显示成功弹窗
  setTimeout(() => {
    showSuccessModal.value = true
    
    // 静默重置按钮状态（以备关闭弹窗后状态正确）
    setTimeout(() => {
      isPublishing.value = false
      publishProgress.value = 0
    }, 300)
  }, 2000)
}

// 关闭弹窗
const closeModal = () => {
  showSuccessModal.value = false
}

// 确认跳转逻辑
const confirmJump = () => {
  // 如果你在用 Vue Router，这里可以改为： router.push('/requirement-analysis')
  window.location.href = 'RequirementAnalysis.html'
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { 
  display: none; 
}
.scrollbar-hide { 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}
</style>

<style lang="scss" scoped>
.w-screen {
    flex: 1;
    min-height: 0;
    height: auto;
    justify-content: space-between;
    overflow-y: auto;
}
.text-textMuted {
  text-align: right;
  width: 8rem;
}
</style>
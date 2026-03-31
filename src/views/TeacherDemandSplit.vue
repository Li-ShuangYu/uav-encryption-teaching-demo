<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <div class="p-4 border-b border-borderColor">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-white">4 组需求分屏</h2>
        <div class="flex space-x-2">
          <button class="bg-accentGreen hover:bg-accentGreenDark text-white text-sm px-3 py-1 rounded transition">
            导出需求
          </button>
          <button class="bg-panelBg hover:bg-cardInnerBg text-white text-sm px-3 py-1 rounded border border-borderColor transition">
            刷新数据
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-hidden p-4">
      <div class="grid grid-cols-2 grid-rows-2 gap-4 h-full">
        <!-- 第 1 组 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组1&background=3b82f6&color=fff" class="w-8 h-8 rounded-full" alt="Group 1">
              <h3 class="text-sm font-bold text-white">第 1 组</h3>
            </div>
            <span class="text-xs text-textMuted">5 条需求</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">李论 (理论型) - 2分钟前</div>
                <div class="text-sm text-gray-200 mb-2">密码系统需满足机密性、完整性、可用性，结合无人机特性，必须考虑算力有限、时延敏感作为核心约束。</div>
                <span class="bg-blue-900/40 text-blue-400 text-[10px] px-1.5 py-0.5 rounded border border-blue-800/50">主线需求</span>
              </div>
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">张实 (实践型) - 3分钟前</div>
                <div class="text-sm text-gray-200 mb-2">补充：密钥更新低功耗需求。无人机机载设备电池容量有限，加密算法执行时功耗不能太高。</div>
                <span class="bg-green-900/40 text-green-400 text-[10px] px-1.5 py-0.5 rounded border border-green-800/50">支线:低功耗</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 组 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组2&background=ef4444&color=fff" class="w-8 h-8 rounded-full" alt="Group 2">
              <h3 class="text-sm font-bold text-white">第 2 组</h3>
            </div>
            <span class="text-xs text-textMuted">4 条需求</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">王论 (理论型) - 5分钟前</div>
                <div class="text-sm text-gray-200 mb-2">无人机容易遭受侧信道攻击和重放攻击，通信协议设计必须包含严格的侧信道防护与防重放机制。</div>
                <span class="bg-red-900/40 text-red-400 text-[10px] px-1.5 py-0.5 rounded border border-red-800/50">支线:侧信道</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 组 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组3&background=f59e0b&color=fff" class="w-8 h-8 rounded-full" alt="Group 3">
              <h3 class="text-sm font-bold text-white">第 3 组</h3>
            </div>
            <span class="text-xs text-textMuted">3 条需求</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">赵组 (组织型) - 8分钟前</div>
                <div class="text-sm text-gray-200 mb-2">避免非法设备接入通信链路，必须进行双向身份认证，且认证时延需控制在毫秒级以内。</div>
                <span class="bg-blue-900/40 text-blue-400 text-[10px] px-1.5 py-0.5 rounded border border-blue-800/50">主线需求</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 第 4 组 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组4&background=8b5cf6&color=fff" class="w-8 h-8 rounded-full" alt="Group 4">
              <h3 class="text-sm font-bold text-white">第 4 组</h3>
            </div>
            <span class="text-xs text-textMuted">4 条需求</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">陈论 (理论型) - 12分钟前</div>
                <div class="text-sm text-gray-200 mb-2">后量子算法适配需求：除了安全性，要重点评估算法复杂度对现有嵌入式芯片算力的兼容性要求。</div>
                <span class="bg-purple-900/40 text-purple-400 text-[10px] px-1.5 py-0.5 rounded border border-purple-800/50">支线:后量子</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
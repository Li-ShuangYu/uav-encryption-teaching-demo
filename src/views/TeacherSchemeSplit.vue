<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <div class="p-4 border-b border-borderColor">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-white">4 组方案分屏</h2>
        <div class="flex space-x-2">
          <button class="bg-accentGreen hover:bg-accentGreenDark text-white text-sm px-3 py-1 rounded transition">
            导出方案
          </button>
          <button class="bg-panelBg hover:bg-cardInnerBg text-white text-sm px-3 py-1 rounded border border-borderColor transition">
            刷新数据
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-hidden p-4">
      <div class="grid grid-cols-2 grid-rows-2 gap-4 h-full">
        <!-- 第 1 组方案 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组1&background=3b82f6&color=fff" class="w-8 h-8 rounded-full" alt="Group 1">
              <h3 class="text-sm font-bold text-white">第 1 组方案</h3>
            </div>
            <span class="bg-accentGreen/20 text-accentGreen text-xs px-2 py-1 rounded">已提交</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">方案名称：轻量级加密通信方案</div>
                <div class="text-sm text-gray-200 mb-2">
                  基于 AES-128 算法，结合硬件加速模块，实现低功耗、高安全性的通信加密。
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-textMuted">提交时间：2026-04-01</span>
                  <button class="text-accentGreen hover:underline">查看详情</button>
                </div>
              </div>
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">方案名称：密钥管理优化方案</div>
                <div class="text-sm text-gray-200 mb-2">
                  采用分层密钥管理策略，结合预共享密钥和会话密钥，减少密钥更新频率，降低功耗。
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-textMuted">提交时间：2026-04-01</span>
                  <button class="text-accentGreen hover:underline">查看详情</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 组方案 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组2&background=ef4444&color=fff" class="w-8 h-8 rounded-full" alt="Group 2">
              <h3 class="text-sm font-bold text-white">第 2 组方案</h3>
            </div>
            <span class="bg-accentGreen/20 text-accentGreen text-xs px-2 py-1 rounded">已提交</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">方案名称：侧信道防护方案</div>
                <div class="text-sm text-gray-200 mb-2">
                  采用掩码技术和随机化执行路径，有效防护功耗分析和时序攻击。
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-textMuted">提交时间：2026-04-01</span>
                  <button class="text-accentGreen hover:underline">查看详情</button>
                </div>
              </div>
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">方案名称：防重放攻击机制</div>
                <div class="text-sm text-gray-200 mb-2">
                  基于时间戳和挑战-响应机制，实现高效的防重放攻击保护。
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-textMuted">提交时间：2026-04-01</span>
                  <button class="text-accentGreen hover:underline">查看详情</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第 3 组方案 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组3&background=f59e0b&color=fff" class="w-8 h-8 rounded-full" alt="Group 3">
              <h3 class="text-sm font-bold text-white">第 3 组方案</h3>
            </div>
            <span class="bg-accentGreen/20 text-accentGreen text-xs px-2 py-1 rounded">已提交</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">方案名称：双向身份认证方案</div>
                <div class="text-sm text-gray-200 mb-2">
                  基于 ECC 算法的轻量级双向身份认证，认证时延控制在 5ms 以内。
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-textMuted">提交时间：2026-04-01</span>
                  <button class="text-accentGreen hover:underline">查看详情</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第 4 组方案 -->
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=组4&background=8b5cf6&color=fff" class="w-8 h-8 rounded-full" alt="Group 4">
              <h3 class="text-sm font-bold text-white">第 4 组方案</h3>
            </div>
            <span class="bg-accentGreen/20 text-accentGreen text-xs px-2 py-1 rounded">已提交</span>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="space-y-3">
              <div class="bg-cardInnerBg rounded p-3 border border-borderColor">
                <div class="text-xs text-textMuted mb-1">方案名称：后量子加密适配方案</div>
                <div class="text-sm text-gray-200 mb-2">
                  基于 LWE 问题的后量子加密算法，针对嵌入式芯片进行优化，确保兼容性。
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-textMuted">提交时间：2026-04-01</span>
                  <button class="text-accentGreen hover:underline">查看详情</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <!-- Loading弹框 -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div class="bg-panelBg border border-borderColor rounded-lg p-6 flex flex-col items-center gap-4 shadow-lg">
        <div class="w-12 h-12 border-4 border-accentGreen border-t-transparent rounded-full animate-spin"></div>
        <div class="text-center">
          <div class="text-lg font-bold text-white mb-2">评分完成√</div>
          <div class="text-sm text-textMuted">正在进入总结页面...</div>
        </div>
      </div>
    </div>
    <header class="h-16 shrink-0 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 rounded-full transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
        <div class="flex items-center">
          <span class="text-2xl font-black text-white tracking-wide mr-4">方案架构蓝图：</span>
          
          <div class="flex items-center bg-gray-800/60 rounded-lg px-2 border border-gray-700 shadow-inner">
            <button 
              @click="prevGroup" 
              class="p-1.5 hover:text-white text-gray-400 transition-all duration-300 rounded hover:bg-gray-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span class="text-xl font-black transition-colors duration-500 mx-4 min-w-[280px] text-center" :style="{ color: currentGroup.themeColor }">
              {{ currentGroup.name }} - {{ currentGroup.title }}
            </span>
            <button 
              @click="nextGroup" 
              class="p-1.5 hover:text-white text-gray-400 transition-all duration-300 rounded hover:bg-gray-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

        </div>
        <button @click="generateReview" :disabled="isGenerating" class="text-accentCyan hover:text-white transition-all transform hover:rotate-180 duration-500 disabled:opacity-50 disabled:cursor-not-allowed ml-4" title="生成评审指导意见">
          <svg class="w-5 h-5 drop-shadow-[0_0_5px_rgba(0,240,255,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="backToWorkspace"
          class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          返回方案AI评估页
        </button>
        <button 
          @click="completeEvaluation"
          :disabled="!allReviewsSubmitted"
          class="bg-accentGreen border border-accentGreen hover:bg-accentGreen/80 text-white font-bold px-4 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          互评打分完成
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>

    <main class="flex-1 p-3 grid grid-cols-12 gap-3 bg-darkBg min-h-0 overflow-hidden" v-if="showContent">
      
      <div class="col-span-3 flex flex-col gap-3" :class="{ 'opacity-0 transform scale-95': showAnimation }" :style="{ transition: 'all 0.3s ease' }">
        <div class="bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col shadow-lg relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          <div class="flex justify-between items-center mb-2 relative z-10">
            <span class="text-xs px-2 py-0.5 rounded font-black transition-colors duration-500" :style="{ backgroundColor: currentGroup.themeColor + '33', color: currentGroup.themeColor, border: '1px solid ' + currentGroup.themeColor + '66' }">
              方案代号
            </span>
            <span class="text-textMuted text-xs font-bold font-mono">{{ currentGroup.codeId }}</span>
          </div>
          <h2 class="text-2xl font-black text-white relative z-10 mb-2">{{ currentGroup.subtitle }}</h2>
          <p class="text-sm font-medium text-textMuted leading-tight overflow-hidden relative z-10 mb-4">{{ currentGroup.desc }}</p>
          
          <div class="pt-2 border-t border-borderColor/50 flex justify-between items-end relative z-10 mb-4">
            <div class="text-xs font-bold text-textMuted">目标适配硬件</div>
            <div class="text-xl font-black italic transition-colors duration-500" :style="{ color: currentGroup.themeColor }">{{ currentGroup.hardware }}</div>
          </div>

          <div class="mt-auto grid grid-cols-2 gap-2 relative z-10">
            <button class="py-1.5 bg-[#1f2937] hover:bg-[#374151] border border-gray-600 rounded text-xs text-gray-300 font-bold transition-colors flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              API接口文档
            </button>
            <button class="py-1.5 bg-[#1f2937] hover:bg-[#374151] border border-gray-600 rounded text-xs text-gray-300 font-bold transition-colors flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              下载基础工程
            </button>
          </div>
        </div>

        <div class="flex-1 bg-panelBg border border-borderColor rounded-lg p-4 flex flex-col relative overflow-hidden transition-all duration-700 ease-out animate-fade-in-up shadow-lg" :style="{ animationDelay: '0.2s', borderTopColor: currentGroup.themeColor + '66' }">
          <div class="text-xs font-black mb-3 flex items-center gap-1.5 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            开发需实现的核心算法
          </div>
          <div class="flex-1 flex flex-col justify-between gap-2">
            <div v-for="(algo, index) in currentGroup.algorithms" :key="index" class="bg-darkBg p-2.5 rounded-lg border border-borderColor border-l-4 transition-all duration-500 flex flex-col justify-center h-full" :style="{ borderLeftColor: index === 0 ? currentGroup.themeColor : (currentGroup.themeColor + '80') }">
              <div class="flex justify-between items-end mb-1">
                <span class="text-[10px] font-bold text-textMuted">{{ algo.label }}</span>
                <span class="text-sm font-black transition-colors duration-500" :style="{ color: index === 0 ? currentGroup.themeColor : '#e5e7eb' }">{{ algo.name }}</span>
              </div>
              <div class="text-[11px] text-textMain leading-tight font-medium">{{ algo.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-5 flex flex-col gap-3" :class="{ 'opacity-0 transform scale-95': showAnimation }" :style="{ transition: 'all 0.3s ease' }">
        <div class="bg-panelBg border border-borderColor rounded-lg p-5 flex flex-col shadow-lg animate-fade-in-up h-full" :style="{ animationDelay: '0.25s' }">
          <div class="text-base font-black text-white mb-5 flex items-center gap-2 shrink-0">
            <div class="w-2.5 h-2.5 rounded-full transition-colors duration-500 shadow-sm" :style="{ backgroundColor: currentGroup.themeColor, boxShadow: `0 0 8px ${currentGroup.themeColor}80` }"></div>
            系统架构与数据流转参考
          </div>

          <div class="flex-1 flex flex-col justify-between mb-6 px-1 relative min-h-[240px]">
            
            <div class="absolute top-6 bottom-6 left-[56px] w-px bg-gray-600 z-0 opacity-50"></div>

            <div v-for="(layer, index) in currentGroup.archLayers" :key="index" 
                 class="relative group rounded-xl p-3 flex items-center gap-4 transition-all duration-300 border"
                 :class="layer.highlight ? 'bg-[#1f2937] shadow-md z-10 scale-[1.02]' : 'bg-cardInnerBg/40 hover:bg-cardInnerBg z-0'" 
                 :style="{ borderColor: layer.highlight ? currentGroup.themeColor : '#374151' }">
              
              <div class="shrink-0 w-20 py-1.5 flex justify-center items-center rounded bg-darkBg border transition-colors duration-500 relative z-10"
                   :style="{ borderColor: layer.highlight ? currentGroup.themeColor + '80' : '#2d353e' }">
                <span class="text-xs font-black transition-colors duration-500" :style="{ color: layer.highlight ? currentGroup.themeColor : '#9ca3af' }">
                  {{ layer.name }}
                </span>
              </div>

              <div class="flex-1 text-xs font-medium leading-relaxed transition-colors duration-500 relative z-10"
                   :class="layer.highlight ? 'text-gray-200' : 'text-textMuted'">
                {{ layer.desc }}
              </div>

              <div v-if="layer.highlight" class="absolute right-0 top-0 bottom-0 w-1.5 rounded-r-xl opacity-80 z-10" 
                   :style="{ backgroundColor: currentGroup.themeColor }"></div>
            </div>
          </div>

          <div class="shrink-0 bg-darkBg rounded-xl p-4 border border-borderColor relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 blur-3xl opacity-10 transition-colors duration-500" 
                 :style="{ backgroundColor: currentGroup.themeColor }"></div>

            <div class="text-[11px] font-black text-textMuted mb-3 uppercase tracking-widest flex justify-between items-center relative z-10">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Security Flow / 时序节点
              </span>
              <span class="text-[#3b82f6] hover:text-blue-400 hover:underline cursor-pointer transition-colors flex items-center gap-1">
                查看详细UML图
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-y-2.5 relative z-10">
              <template v-for="(step, index) in currentGroup.flow" :key="index">
                <div class="text-xs font-bold font-mono transition-colors duration-500 bg-cardInnerBg px-2 py-1 rounded border border-gray-700/50 shadow-sm" 
                     :style="{ color: currentGroup.themeColor }">
                  {{ step }}
                </div>
                <svg v-if="index < currentGroup.flow.length - 1" class="w-4 h-4 mx-1.5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-3" :class="{ 'opacity-0 transform scale-95': showAnimation }" :style="{ transition: 'all 0.3s ease' }">
        <!-- 学生查看自己小组时显示AI评价 -->
        <div v-if="isStudentOwnGroup" class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" :style="{ animationDelay: '0.3s', borderTopWidth: '4px', borderTopColor: currentGroup.themeColor }">
          
          <div class="px-4 pt-3 pb-3 shrink-0 relative z-20 flex justify-between items-center border-b border-borderColor bg-cardInnerBg">
            <div class="text-base font-black flex items-center gap-2 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              AI 智能评分与评价
            </div>
            <div>
              <span class="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-400 border border-blue-800/50">AI 分析完成</span>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col p-4 gap-4">
            
            <!-- 雷达图 -->
            <!-- <div class="bg-darkBg rounded-lg border border-borderColor p-4"> -->
              <div class="w-full h-[180px] flex items-center justify-center">
                <div id="radar-chart" class="w-full h-full"></div>
              </div>
            <!-- </div> -->

            <div class="flex justify-between items-end pb-3 border-b border-gray-700/50">
              <span class="text-sm font-medium text-textMuted">AI 计算综合得分</span>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black transition-colors duration-500" :style="{ color: currentGroup.themeColor, textShadow: `0 0 15px ${currentGroup.themeColor}60` }">
                  {{ calculateTotalScore(currentGroup) }}
                </span>
                <span class="text-lg text-gray-500 font-bold">/100</span>
              </div>
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-sm font-bold text-gray-300 flex justify-between">
                <span>AI 智能评价</span>
                <span class="text-xs font-normal text-gray-500">系统自动分析</span>
              </label>
              <div class="w-full flex-1 min-h-[80px] bg-[#1a1d24] border border-gray-700 rounded-lg p-3 text-sm text-gray-200 disabled:opacity-60">
                <div v-if="currentGroupId === 1">
                  <p class="mb-2"><span class="text-green-400 font-bold">✓ 优势：</span>方案在低功耗限制下做出了很好的权衡。PRESENT算法的硬件实现资源极小，非常符合要求。</p>
                  <p class="mb-2"><span class="text-yellow-400 font-bold">⚠ 改进空间：</span>建议关注硬件随机数生成器的实现细节，以提高系统安全性。</p>
                  <p><span class="text-blue-400 font-bold">📊 综合评价：</span>该方案针对STM32L432硬件平台进行了充分优化，在保证安全性能的同时，有效控制了功耗和资源占用，适合作为轻量级无人机加密解决方案。</p>
                </div>
                <div v-else-if="currentGroupId === 2">
                  <p class="mb-2"><span class="text-green-400 font-bold">✓ 优势：</span>侧信道防护措施设计全面，掩码机制和恒定时间实现能够有效抵御DPA攻击。</p>
                  <p class="mb-2"><span class="text-yellow-400 font-bold">⚠ 改进空间：</span>防护措施可能会增加系统复杂度和功耗，需要在安全性和性能之间找到平衡。</p>
                  <p><span class="text-blue-400 font-bold">📊 综合评价：</span>该方案在安全性方面表现突出，特别适合对安全要求较高的应用场景，建议在实际部署前进行充分的性能测试。</p>
                </div>
                <div v-else-if="currentGroupId === 3">
                  <p class="mb-2"><span class="text-green-400 font-bold">✓ 优势：</span>抗重放攻击机制设计合理，滑动窗口计数器能够有效防止指令劫持。</p>
                  <p class="mb-2"><span class="text-yellow-400 font-bold">⚠ 改进空间：</span>需要确保计数器同步机制的可靠性，避免因同步失败导致的通信问题。</p>
                  <p><span class="text-blue-400 font-bold">📊 综合评价：</span>该方案在时效性和安全性方面取得了良好平衡，能够有效防止恶意重放攻击，适合对实时性要求较高的无人机控制场景。</p>
                </div>
                <div v-else-if="currentGroupId === 4">
                  <p class="mb-2"><span class="text-green-400 font-bold">✓ 优势：</span>采用后量子算法，具有前瞻性，能够抵御未来量子计算的威胁。</p>
                  <p class="mb-2"><span class="text-yellow-400 font-bold">⚠ 改进空间：</span>后量子算法的计算复杂度较高，可能会对系统性能产生影响。</p>
                  <p><span class="text-blue-400 font-bold">📊 综合评价：</span>该方案具有长远的安全视野，适合对未来安全性有较高要求的场景，建议在硬件平台上进行优化以提升性能。</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <!-- 学生查看其他小组时显示教师评价和互评输入 -->
        <div v-else class="flex-1 bg-panelBg border border-borderColor rounded-lg flex flex-col relative overflow-hidden shadow-lg transition-all duration-700 ease-out animate-fade-in-up" style="animation-delay: 0.3s; border-top-width: 4px;" :style="{ borderTopColor: currentGroup.themeColor }">
          
          <div class="px-4 pt-3 pb-3 shrink-0 relative z-20 flex justify-between items-center border-b border-borderColor bg-cardInnerBg">
            <div class="text-base font-black flex items-center gap-2 transition-colors duration-500" :style="{ color: currentGroup.themeColor }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              小组互评
            </div>
            <div>
              <span v-if="currentGroup.review.isSubmitted" class="text-xs px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-800/50">已完成评估</span>
              <span v-else class="text-xs px-2 py-1 rounded bg-yellow-900/30 text-yellow-400 border border-yellow-800/50">待评估打分</span>
            </div>
          </div>
          
          <div class="relative w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col p-4 gap-4">
            
            <div class="bg-darkBg rounded-lg border border-borderColor p-3 space-y-3">
              <div v-for="dim in dimensions" :key="dim.key" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-300 w-18">{{ dim.label }}</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  v-model.number="currentGroup.review.scores[dim.key]" 
                  class="flex-1 mx-3 custom-range" 
                  :style="{ '--range-color': currentGroup.themeColor }"
                  :disabled="currentGroup.review.isSubmitted"
                >
                <span class="text-base font-mono font-bold w-8 text-right" :style="{ color: currentGroup.themeColor }">
                  {{ currentGroup.review.scores[dim.key] }}
                </span>
              </div>
            </div>

            <div class="flex justify-between items-end pb-3 border-b border-gray-700/50">
              <span class="text-sm font-medium text-textMuted">综合评分</span>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black transition-colors duration-500" :style="{ color: currentGroup.themeColor, textShadow: `0 0 15px ${currentGroup.themeColor}60` }">
                  {{ calculateTotalScore(currentGroup) }}
                </span>
                <span class="text-lg text-gray-500 font-bold">/100</span>
              </div>
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-sm font-bold text-gray-300 flex justify-between">
                <span>小组互评意见</span>
                <span class="text-xs font-normal text-gray-500">支持 Markdown</span>
              </label>
              <textarea 
                v-model="currentGroup.review.comment" 
                :disabled="currentGroup.review.isSubmitted"
                class="w-full flex-1 min-h-[90px] bg-[#1a1d24] border border-gray-700 rounded-lg p-3 text-sm text-gray-200 focus:outline-none transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed" 
                :style="{ focusBorderColor: currentGroup.themeColor }"
                placeholder="请输入对该方案架构的优缺点评价、后续迭代建议等内容..."
              ></textarea>
            </div>

            <button 
              @click="submitReview" 
              :disabled="currentGroup.review.isSubmitted"
              class="w-full py-2.5 rounded-lg text-white font-bold text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mt-auto shrink-0"
              :class="currentGroup.review.isSubmitted ? 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none border border-gray-700' : 'hover:brightness-110 active:scale-[0.98]'"
              :style="{ backgroundColor: currentGroup.review.isSubmitted ? '' : currentGroup.themeColor }"
            >
              <svg v-if="!currentGroup.review.isSubmitted" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
              <svg v-else class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
              {{ currentGroup.review.isSubmitted ? '已提交互评' : '提交小组互评' }}
            </button>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();
const route = useRoute();

// 返回学生方案上传页面
const backToWorkspace = () => {
  router.push('/student/scheme-upload');
};

// 预设打分维度
const dimensions = [
  { key: 'security', label: '安全保密性' },
  { key: 'integrity', label: '数据完整性' },
  { key: 'usability', label: '系统可用性' },
  // { key: 'cost', label: '硬件成本控制' },
  { key: 'innovation', label: '方案创新性' }
];

// 初始化带有 review 数据的 groups
const groups = reactive([
  {
    id: 1,
    name: '第一组',
    title: '通信安全 + 低功耗专用版',
    subtitle: '轻量级无人机加密体制',
    codeId: 'SEC-LOWPOWER-01',
    themeColor: '#3b82f6', 
    desc: '专注民用小型无人机通信安全，采用 PRESENT 与 ECC 组合，实现数据加密传输与双向认证，满足加解密时延≤10ms与功耗≤50mW的极致轻量需求。',
    hardware: 'STM32L432',
    archLayers: [
      { name: '应用层', desc: '飞行控制指令、航拍/定位数据输入输出', highlight: false },
      { name: '安全层', desc: '身份认证、数据加解密、密钥协商', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发', highlight: false },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、电源模块', highlight: true }
    ],
    flow: ['双向身份认证', '协商一次性会话密钥', '数据加解密与校验', '销毁密钥与系统休眠'],
    algorithms: [
      { label: '轻量级数据加密', name: 'PRESENT 算法', desc: '64bit分组/80bit密钥，SPN结构31轮迭代。控制指令采用 ECB，影像数据采用 CBC 模式。' },
      { label: '双向身份认证', name: 'ECC (secp256r1)', desc: '无人机与终端基于 ECC 验证双方合法性，认证通过后动态协商生成一次一密的会话密钥。' }
    ],
    // 教师评审数据
    review: {
      scores: { security: 0, integrity: 0, usability: 0, cost: 0, innovation: 0 },
      comment: '',
      isSubmitted: false
    }
  },
  {
    id: 2,
    name: '第二组',
    title: '通信安全 + 侧信道防护版',
    subtitle: '高安全抗物理攻击体制',
    codeId: 'SEC-SIDECHNL-02',
    themeColor: '#ef4444', 
    desc: '聚焦通信安全与侧信道防护，引入一阶掩码与恒定时间代码实现，阻断功耗、时序等物理信息泄露，抵御差分功耗分析（DPA）攻击。',
    hardware: 'STM32L432',
    archLayers: [
      { name: '安全核心层', desc: '通信加密、身份认证、侧信道防护（掩码+恒定时间）', highlight: true },
      { name: '通信接口层', desc: 'WiFi / 蓝牙数据收发、帧封装', highlight: false },
      { name: '硬件支撑层', desc: 'STM32L432 低功耗单片机、电源、无线模组', highlight: true }
    ],
    flow: ['初始化防护单元', '双向认证与密钥协商', '掩码异或与恒定时间加密', '结束销毁与休眠'],
    algorithms: [
      { label: '侧信道防护加密', name: 'PRESENT + 掩码机制', desc: '将敏感数据与随机掩码异或以切断密钥关联，算法无分支跳转并随机插入空操作打乱功耗特征。' },
      { label: '身份认证体系', name: 'ECC 双向认证', desc: '执行设备校验并完成会话密钥协商，保障密钥分发的安全性与合法性。' }
    ],
    review: {
      scores: { security: 0, integrity: 0, usability: 0, cost: 0, innovation: 0 },
      comment: '',
      isSubmitted: false
    }
  },
  {
    id: 3,
    name: '第三组',
    title: '通信安全 + 抗重放攻击',
    subtitle: '强时效性指令防劫持体制',
    codeId: 'SEC-NOREPLAY-03',
    themeColor: '#f59e0b', 
    desc: '有效阻止攻击者截取、重复发送旧数据包干扰正常通信。引入滑动窗口计数器机制，收发双方维护严格同步计数，确保指令唯一有效。',
    hardware: 'STM32L432',
    archLayers: [
      { name: '安全层', desc: '数据加解密、身份校验、抗重放计数管理', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙数据收发、数据包封装', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗单片机、无线通信模块', highlight: false }
    ],
    flow: ['初始化同步计数器', '身份与同步校验', '附加计数器并加密传输', '接收解密校验过期丢弃'],
    algorithms: [
      { label: '通信安全加密', name: 'PRESENT 算法', desc: '硬件实现简单、资源占用低，对控制指令、航拍与定位数据进行全程加密传输。' },
      { label: '抗重放防护机制', name: '滑动窗口计数器', desc: '每发送一帧计数器自增并随数据加密发送；接收端校验大于本地记录才处理，并自动丢弃过期旧包。' }
    ],
    review: {
      scores: { security: 0, integrity: 0, usability: 0, cost: 0, innovation: 0 },
      comment: '',
      isSubmitted: false
    }
  },
  {
    id: 4,
    name: '第四组',
    title: '通信安全 + 后量子算法',
    subtitle: '面向未来算力威胁前瞻体制',
    codeId: 'SEC-PQUANTUM-04',
    themeColor: '#8b5cf6', 
    desc: '面向未来量子计算环境，采用抗量子破解的轻量级后量子密码机制，摒弃传统易被攻破的方案，抵御未来的量子暴力破解威胁。',
    hardware: 'STM32L432',
    archLayers: [
      { name: '安全层', desc: '后量子密钥协商、数据加解密、通信安全封装', highlight: true },
      { name: '通信层', desc: 'WiFi / 蓝牙无线数据收发、帧格式处理', highlight: true },
      { name: '硬件层', desc: 'STM32L432 低功耗嵌入式平台、无线模块', highlight: false }
    ],
    flow: ['加载后量子参数', 'Kyber 安全密钥协商', '共享密钥加密通信', '接收解密与密钥清除'],
    algorithms: [
      { label: '密钥交换算法', name: 'CRYSTALS-Kyber', desc: '基于格基(Lattice)难题的轻量级后量子加密算法，不依赖传统ECC/RSA，抗量子攻击且运算速度快。' },
      { label: '实时通信加密', name: '对称加密体制', desc: '使用 Kyber 算法安全协商生成的会话密钥对通信数据进行实时加解密，保障协议兼容性与高机密性。' }
    ],
    review: {
      scores: { security: 0, integrity: 0, usability: 0, cost: 0, innovation: 0 },
      comment: '',
      isSubmitted: false
    }
  }
]);

// 状态管理
const currentGroupId = ref(1);
const studentGroupId = ref(null);
const isGenerating = ref(false);
const showContent = ref(false);
const showAnimation = ref(false);
const chartInstance = ref(null);
const isLoading = ref(false);
const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));
const isStudentOwnGroup = computed(() => {
  return studentGroupId.value && currentGroupId.value === studentGroupId.value;
});

// 雷达图指标
const indicators = [
  { name: '保密性', max: 100 },
  { name: '完整性', max: 100 },
  { name: '可用性', max: 100 },
  { name: '成本控制', max: 100 },
  { name: '创新性', max: 100 }
];

// 检查是否所有其他组的评审都已提交
const allReviewsSubmitted = computed(() => {
  return groups.every(group => {
    // 跳过学生自己的小组
    if (group.id === studentGroupId.value) {
      return true;
    }
    return group.review.isSubmitted;
  });
});

// 完成互评打分
const completeEvaluation = () => {
  if (!allReviewsSubmitted.value) return;
  
  // 显示loading弹框
  isLoading.value = true;
  
  // 模拟完成互评的逻辑
  setTimeout(() => {
    // 跳转到StudentMyScoreResult页面
    router.push('/student/my-score-result');
  }, 1500);
};

// 分组切换逻辑
const prevGroup = () => {
  // 触发切换动画
  showAnimation.value = true;
  setTimeout(() => {
    currentGroupId.value = currentGroupId.value > 1 ? currentGroupId.value - 1 : 4;
    showAnimation.value = false;
    // 更新雷达图
    setTimeout(() => {
      initChart();
    }, 100);
  }, 300);
};
const nextGroup = () => {
  // 触发切换动画
  showAnimation.value = true;
  setTimeout(() => {
    currentGroupId.value = currentGroupId.value < 4 ? currentGroupId.value + 1 : 1;
    showAnimation.value = false;
    // 更新雷达图
    setTimeout(() => {
      initChart();
    }, 100);
  }, 300);
};

// 计算综合得分
const calculateTotalScore = (group) => {
  if (!group || !group.review) return 0;
  const s = group.review.scores;
  return Math.round((s.security + s.integrity + s.usability + s.cost + s.innovation) / 5);
};

// 缓动函数
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// 自动评分函数（缓动效果）
const autoScore = (group, targetScores) => {
  const duration = 1500; // 动画持续时间
  const startTime = Date.now();
  const initialScores = { ...group.review.scores };
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    
    // 计算当前分数
    Object.keys(targetScores).forEach(key => {
      group.review.scores[key] = Math.round(initialScores[key] + (targetScores[key] - initialScores[key]) * easedProgress);
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 评分完成后更新雷达图
      initChart();
    }
  };
  
  animate();
};

// 提交评审
const submitReview = () => {
  if (currentGroup.value.review.isSubmitted) return;
  // 模拟提交网络请求
  setTimeout(() => {
    currentGroup.value.review.isSubmitted = true;
    
    // 检查是否所有其他组都已完成评估
    const allSubmitted = groups.every(group => {
      if (group.id === studentGroupId.value) {
        return true;
      }
      return group.review.isSubmitted;
    });
    
    if (allSubmitted) {
      // 所有组都已完成，停止操作，不自动跳转到评分结果页面
      return;
    } else {
      // 等待1.5秒后跳转到下一个组
      setTimeout(() => {
        // 跳转到下一个组，跳过学生自己的小组
        let nextId = currentGroupId.value < 4 ? currentGroupId.value + 1 : 1;
        
        // 如果下一个组是学生自己的小组，继续跳过
        if (nextId === studentGroupId.value) {
          nextId = nextId < 4 ? nextId + 1 : 1;
        }
        
        // 触发切换动画
        showAnimation.value = true;
        setTimeout(() => {
          currentGroupId.value = nextId;
          showAnimation.value = false;
          
          // 在下一组加载完成后，自动开始写评语
          setTimeout(() => {
            // 为下一组设置默认分数为0
            const nextGroup = groups.find(g => g.id === currentGroupId.value);
            if (nextGroup && !nextGroup.review.isSubmitted) {
              // 重置分数为0
              nextGroup.review.scores = { security: 0, integrity: 0, usability: 0, cost: 0, innovation: 0 };
              
              // 自动开始生成评语（包含评分动画）
              generateReview();
            }
          }, 500);
        }, 300);
      }, 1500);
    }
  }, 300);
};

// 生成评审指导意见
const generateReview = async () => {
  if (isGenerating.value) return;
  
  isGenerating.value = true;
  
  const currentGroup = groups.find(g => g.id === currentGroupId.value);
  if (currentGroup) {
    // 1. 自动评分（缓动效果）
    const targetScores = {
      1: { security: 90, integrity: 85, usability: 80, cost: 75, innovation: 85 },
      2: { security: 85, integrity: 90, usability: 75, cost: 80, innovation: 90 },
      3: { security: 80, integrity: 75, usability: 90, cost: 85, innovation: 80 },
      4: { security: 95, integrity: 90, usability: 70, cost: 75, innovation: 95 }
    }[currentGroupId.value] || { security: 80, integrity: 80, usability: 80, cost: 80, innovation: 80 };
    
    // 重置分数为0
    currentGroup.review.scores = { security: 0, integrity: 0, usability: 0, cost: 0, innovation: 0 };
    
    // 执行自动评分动画（逐条拉动）
    const scoreAnimationPromise = new Promise((resolve) => {
      const duration = 1000; // 单个拉条动画持续时间
      const delayBetween = 300; // 拉条之间的延迟
      const keys = ['security', 'integrity', 'usability', 'cost', 'innovation'];
      const initialScores = { ...currentGroup.review.scores };
      let currentIndex = 0;
      
      const animateNext = () => {
        if (currentIndex >= keys.length) {
          // 评分完成后更新雷达图
          initChart();
          resolve();
          return;
        }
        
        const key = keys[currentIndex];
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutQuad(progress);
          
          // 只更新当前拉条的分数
          currentGroup.review.scores[key] = Math.round(initialScores[key] + (targetScores[key] - initialScores[key]) * easedProgress);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // 当前拉条动画完成，开始下一个
            currentIndex++;
            setTimeout(animateNext, delayBetween);
          }
        };
        
        animate();
      };
      
      animateNext();
    });
    
    // 等待评分动画完成
    await scoreAnimationPromise;
    
    // 2. 生成评审指导意见
    const reviewComments = {
      1: '该方案在低功耗限制下做出了很好的权衡。PRESENT算法的硬件实现资源极小，非常符合要求。建议后续关注硬件随机数生成器的实现细节，以提高系统安全性。',
      2: '侧信道防护措施设计全面，掩码机制和恒定时间实现能够有效抵御DPA攻击。防护措施可能会增加系统复杂度和功耗，需要在安全性和性能之间找到平衡。',
      3: '抗重放攻击机制设计合理，滑动窗口计数器能够有效防止指令劫持。需要确保计数器同步机制的可靠性，避免因同步失败导致的通信问题。',
      4: '采用后量子算法，具有前瞻性，能够抵御未来量子计算的威胁。后量子算法的计算复杂度较高，可能会对系统性能产生影响，建议在硬件平台上进行优化以提升性能。'
    };
    
    const comment = reviewComments[currentGroup.id] || '该方案整体设计合理，建议在实际部署中进一步验证安全性。';
    currentGroup.review.comment = ''; // 清空原有内容
    
    // 逐字输入动画
    const typingPromise = new Promise((resolve) => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < comment.length) {
          currentGroup.review.comment += comment.charAt(index);
          index++;
        } else {
          clearInterval(typingInterval);
          resolve();
        }
      }, 50); // 每50毫秒输入一个字符
    });
    
    // 等待文字生成完成
    await typingPromise;
    
    // 3. 自动提交评审
    isGenerating.value = false;
    
    setTimeout(() => {
      submitReview();
    }, 1000);
  } else {
    isGenerating.value = false;
  }
};

// 初始化雷达图
const initChart = () => {
  if (!currentGroup.value) return;
  
  const chartDom = document.getElementById('radar-chart');
  if (!chartDom) return;
  
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  
  chartInstance.value = echarts.init(chartDom);
  
  const scores = currentGroup.value.review.scores;
  const values = [scores.security, scores.integrity, scores.usability, scores.cost, scores.innovation];
  
  const customIndicators = indicators.map((ind, idx) => ({
    name: `${ind.name}\n${values[idx]}%`,
    max: ind.max
  }));
  
  const option = {
    radar: {
      indicator: customIndicators,
      radius: '50%', 
      center: ['50%', '50%'],
      splitNumber: 4,
      axisName: { 
        color: '#d1d5db', 
        fontSize: 13, 
        fontWeight: 'bold',
        lineHeight: 16
      },
      splitLine: { lineStyle: { color: ['#2d353e'], width: 1 } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#2d353e' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: values,
        itemStyle: { color: currentGroup.value.themeColor },
        areaStyle: { 
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { color: currentGroup.value.themeColor, offset: 0, opacity: 0.1 },
            { color: currentGroup.value.themeColor, offset: 1, opacity: 0.5 }
          ])
        },
        lineStyle: { width: 2, color: currentGroup.value.themeColor },
        symbol: 'circle',
        symbolSize: 8
      }]
    }]
  };
  
  chartInstance.value.setOption(option);
};

// 处理窗口 resize
const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

onMounted(() => {
  // 从localStorage获取学生小组信息
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    const groupInfo = JSON.parse(storedInfo);
    if (groupInfo.groupId) {
      studentGroupId.value = parseInt(groupInfo.groupId);
      // 如果有小组信息，默认显示该小组
      currentGroupId.value = studentGroupId.value;
    }
  }
  
  // 从路由参数读取初始组信息
  if (route.query.groupId) {
    const id = parseInt(route.query.groupId);
    if (id >= 1 && id <= 4) currentGroupId.value = id;
  }
  
  // 入场动画
  setTimeout(() => {
    showContent.value = true;
    // 初始化雷达图
    setTimeout(() => {
      initChart();
    }, 100);
  }, 100);
  
  // 监听窗口 resize
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  // 清理事件监听器和图表实例
  window.removeEventListener('resize', handleResize);
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<style scoped>
/* 继承并微调颜色 */
.bg-darkBg { background-color: #121417; }
.bg-panelBg { background-color: #1c2126; }
.bg-cardInnerBg { background-color: #232930; }
.border-borderColor { border-color: #2d353e; }
.text-textMain { color: #d1d5db; }
.text-textMuted { color: #6b7280; }

/* 入场动画 */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

/* 自定义 Range 滑块样式，使其带有科技感 */
.custom-range {
  -webkit-appearance: none;
  height: 6px;
  background: #2d353e;
  border-radius: 4px;
  outline: none;
}
.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--range-color);
  cursor: pointer;
  box-shadow: 0 0 10px var(--range-color);
  transition: transform 0.1s;
}
.custom-range::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
.custom-range:disabled::-webkit-slider-thumb {
  background: #6b7280;
  box-shadow: none;
  cursor: not-allowed;
}
</style>
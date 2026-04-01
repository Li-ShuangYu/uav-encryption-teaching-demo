<template>
  <div class="w-full h-full bg-[#111318] flex flex-col font-sans text-gray-200 box-border p-5 overflow-hidden">
    
    <!-- 标题行 -->
    <div class="flex justify-between items-center mb-5">
      <div>
        <h1 class="text-2xl font-bold text-white">各组任务方向</h1>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
      </div>
      <div class="flex items-center space-x-3">
        <!-- 生成步骤 -->
        <div v-show="isGeneratingSongs" class="text-sm text-gray-300">
          {{ generationStep }}
        </div>
        
        <!-- 按钮 -->
        <div class="flex space-x-3">
          <button 
            @click="generateTeamSongs" 
            :disabled="isGeneratingSongs || allSongsGenerated"
            class="bg-accentGreen hover:bg-accentGreenDark text-white px-3 py-1.5 rounded text-sm font-bold shadow-[0_0_12px_rgba(35,181,134,0.4)] transition flex items-center space-x-2"
          >
           <span>{{ isGeneratingSongs ? '正在生成队歌' : allSongsGenerated ? '队歌生成完毕' : '生成各组队歌' }}</span>
            <!-- 加载图标 -->
            <div v-if="isGeneratingSongs" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <!-- 打勾图标 -->
            <svg v-else-if="allSongsGenerated" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>
            <!-- 音乐图标 -->
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></svg>
            
          </button>
          <button 
            @click="goToNextStage" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-bold shadow-[0_0_12px_rgba(59,130,246,0.4)] transition flex items-center space-x-1"
          >
            进入下一阶段
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5v14l7-7z"></path></svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-5">
      
      <div class="bg-[#181a20] rounded-xl border border-blue-900/50 flex flex-col p-4 hover:border-blue-700/60 transition-colors shadow-lg shadow-black/20 h-full min-h-0 relative overflow-hidden">
        <!-- 音乐跳动效果 -->
        <div v-if="isMusicPlaying && currentPlayingGroup === 0" class="absolute inset-0 left-0 right-0 bottom-0 flex items-end p-4 pointer-events-none z-0 animate-fade-up">
          <div 
            v-for="(bar, index) in bars" 
            :key="index"
            class="flex-1 mx-0.5 bg-gradient-to-t from-blue-700 to-blue-900 transition-all duration-100 ease-out"
            :style="{ height: (bar * 80) + '%', opacity: 0.2 + (bar * 0.2) }"
          ></div>
        </div>
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2 relative z-10">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-900/50">组1</div>
            <h2 class="text-lg font-bold text-gray-100">低功耗优化方向</h2>
          </div>
          <div class="flex items-center space-x-2">
            <!-- 播放按钮，默认隐藏，生成队歌后显示 -->
            <button 
              v-show="groups[0].isSongGenerated" 
              @click="playMusic(0)" 
              class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 transition"
            >
              <svg v-if="!groups[0].isPlaying" class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
              <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            </button>
            <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
          </div>
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
          <div v-show="!groups[0].isLoading" class="flex-1 flex flex-row gap-5 min-h-0 relative z-10">
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
        <!-- 音乐跳动效果 -->
        <div v-if="isMusicPlaying && currentPlayingGroup === 1" class="absolute inset-0 left-0 right-0 bottom-0 flex items-end p-4 pointer-events-none z-0 animate-fade-up">
          <div 
            v-for="(bar, index) in bars" 
            :key="index"
            class="flex-1 mx-0.5 bg-gradient-to-t from-red-700 to-red-900 transition-all duration-100 ease-out"
            :style="{ height: (bar * 80) + '%', opacity: 0.2 + (bar * 0.2) }"
          ></div>
        </div>
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2 relative z-10">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-red-900/50">组2</div>
            <h2 class="text-lg font-bold text-gray-100">侧信道防护方向</h2>
          </div>
          <div class="flex items-center space-x-2">
            <!-- 播放按钮，默认隐藏，生成队歌后显示 -->
            <button 
              v-show="groups[1].isSongGenerated" 
              @click="playMusic(1)" 
              class="w-6 h-6 flex items-center justify-center rounded-full bg-red-900/30 text-red-400 hover:bg-red-800/50 transition"
            >
              <svg v-if="!groups[1].isPlaying" class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
              <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            </button>
            <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
          </div>
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
          <div v-show="!groups[1].isLoading" class="flex-1 flex flex-row gap-5 min-h-0 relative z-10">
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
        <!-- 音乐跳动效果 -->
        <div v-if="isMusicPlaying && currentPlayingGroup === 2" class="absolute inset-0 left-0 right-0 bottom-0 flex items-end p-4 pointer-events-none z-0 animate-fade-up">
          <div 
            v-for="(bar, index) in bars" 
            :key="index"
            class="flex-1 mx-0.5 bg-gradient-to-t from-amber-700 to-amber-900 transition-all duration-100 ease-out"
            :style="{ height: (bar * 80) + '%', opacity: 0.2 + (bar * 0.2) }"
          ></div>
        </div>
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2 relative z-10">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-amber-900/50">组3</div>
            <h2 class="text-lg font-bold text-gray-100">抗重放攻击方向</h2>
          </div>
          <div class="flex items-center space-x-2">
            <!-- 播放按钮，默认隐藏，生成队歌后显示 -->
            <button 
              v-show="groups[2].isSongGenerated" 
              @click="playMusic(2)" 
              class="w-6 h-6 flex items-center justify-center rounded-full bg-amber-900/30 text-amber-400 hover:bg-amber-800/50 transition"
            >
              <svg v-if="!groups[2].isPlaying" class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
              <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            </button>
            <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
          </div>
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
          <div v-show="!groups[2].isLoading" class="flex-1 flex flex-row gap-5 min-h-0 relative z-10">
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
        <!-- 音乐跳动效果 -->
        <div v-if="isMusicPlaying && currentPlayingGroup === 3" class="absolute inset-0 left-0 right-0 bottom-0 flex items-end p-4 pointer-events-none z-0 animate-fade-up">
          <div 
            v-for="(bar, index) in bars" 
            :key="index"
            class="flex-1 mx-0.5 bg-gradient-to-t from-purple-700 to-purple-900 transition-all duration-100 ease-out"
            :style="{ height: (bar * 80) + '%', opacity: 0.2 + (bar * 0.2) }"
          ></div>
        </div>
        <div class="flex justify-between items-center mb-3 shrink-0 border-b border-gray-800 pb-2 relative z-10">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-purple-900/50">组4</div>
            <h2 class="text-lg font-bold text-gray-100">后量子算法适配方向</h2>
          </div>
          <div class="flex items-center space-x-2">
            <!-- 播放按钮，默认隐藏，生成队歌后显示 -->
            <button 
              v-show="groups[3].isSongGenerated" 
              @click="playMusic(3)" 
              class="w-6 h-6 flex items-center justify-center rounded-full bg-purple-900/30 text-purple-400 hover:bg-purple-800/50 transition"
            >
              <svg v-if="!groups[3].isPlaying" class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
              <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            </button>
            <span class="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800/50 font-medium">任务已确认</span>
          </div>
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
          <div v-show="!groups[3].isLoading" class="flex-1 flex flex-row gap-5 min-h-0 relative z-10">
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
  
  <!-- 音频元素 -->
  <audio ref="audioElement" class="hidden"></audio>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// 导入音频文件
import audioLight from '../assets/audio/轻量级.mp3';
import audioSideChannel from '../assets/audio/侧信道.mp3';
import audioAntiReplay from '../assets/audio/抗重放.mp3';
import audioPostQuantum from '../assets/audio/后量子算法.mp3';

// 音频文件路径
const audioFiles = {
  0: audioLight,
  1: audioSideChannel,
  2: audioAntiReplay,
  3: audioPostQuantum
};

const router = useRouter();

const goToNextStage = () => {
  router.push('/teacher/scheme-design');
};

// 生成队歌的状态
const isGeneratingSongs = ref(false);
const generationProgress = ref(0);
const generationStep = ref('');

// 计算是否所有队歌都已生成
const allSongsGenerated = computed(() => {
  return groups.every(group => group.isSongGenerated);
});

const generateTeamSongs = () => {
  // 开始生成队歌
  isGeneratingSongs.value = true;
  generationProgress.value = 0;
  
  // 生成步骤
  const steps = [
    '正在分析各组任务方向...',
    '正在生成歌词...',
    '正在调整时长...',
    '正在合成音乐...',
    '正在优化音效...'
  ];
  
  // 模拟生成过程，总共5秒
  let stepIndex = 0;
  const interval = setInterval(() => {
    // 更新步骤和进度
    generationStep.value = steps[stepIndex];
    generationProgress.value = (stepIndex + 1) * 20;
    
    stepIndex++;
    
    // 完成所有步骤
    if (stepIndex >= steps.length) {
      clearInterval(interval);
      
      // 模拟生成队歌完成，显示播放按钮
      setTimeout(() => {
        groups.forEach(group => {
          group.isSongGenerated = true;
        });
        
        // 重置状态
        isGeneratingSongs.value = false;
        generationProgress.value = 0;
        generationStep.value = '';
      }, 500);
    }
  }, 1000);
};

// 音频元素
const audioElement = ref(null);

// 音乐跳动状态
const isMusicPlaying = ref(false);
const currentPlayingGroup = ref(-1);
const audioContext = ref(null);
const analyser = ref(null);
const dataArray = ref(null);
const bars = ref([0, 0, 0, 0, 0, 0, 0, 0]);

// 初始化音频分析
const initAudioAnalysis = () => {
  if (audioElement.value) {
    try {
      audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.value.createMediaElementSource(audioElement.value);
      analyser.value = audioContext.value.createAnalyser();
      source.connect(analyser.value);
      analyser.value.connect(audioContext.value.destination);
      analyser.value.fftSize = 128;
      const bufferLength = analyser.value.frequencyBinCount;
      dataArray.value = new Uint8Array(bufferLength);
      updateBars();
    } catch (error) {
      console.error('音频分析初始化失败:', error);
    }
  }
};

// 更新柱状图
const updateBars = () => {
  if (analyser.value && dataArray.value && isMusicPlaying.value) {
    analyser.value.getByteFrequencyData(dataArray.value);
    bars.value = Array.from(dataArray.value.slice(0, 8)).map(value => value / 255);
    requestAnimationFrame(updateBars);
  }
};

// 播放音乐的函数
const playMusic = (index) => {
  const group = groups[index];
  
  // 暂停其他组的音乐
  groups.forEach((g, i) => {
    if (i !== index && g.isPlaying) {
      g.isPlaying = false;
    }
  });
  
  // 构建音频文件路径
  const audioPath = audioFiles[index];
  
  if (group.isPlaying) {
    // 暂停音乐
    if (audioElement.value) {
      audioElement.value.pause();
    }
    group.isPlaying = false;
    isMusicPlaying.value = false;
    currentPlayingGroup.value = -1;
  } else {
    // 播放音乐
    if (audioElement.value) {
      audioElement.value.src = audioPath;
      
      // 等待音频加载完成后再播放
      audioElement.value.addEventListener('canplaythrough', () => {
        audioElement.value.play().catch(error => {
          console.error('音频播放失败:', error);
        });
      }, { once: true });
    }
    group.isPlaying = true;
    isMusicPlaying.value = true;
    currentPlayingGroup.value = index;
    
    // 初始化音频分析
    if (!audioContext.value) {
      initAudioAnalysis();
    } else {
      updateBars();
    }
  }
};

// 定义小组数据
const groups = reactive([
  { isLoading: true, progress: 0, delay: 800, isSongGenerated: false, isPlaying: false }, // 低功耗优化方向 - 轻量级
  { isLoading: true, progress: 0, delay: 1600, isSongGenerated: false, isPlaying: false }, // 侧信道防护方向 - 侧信道
  { isLoading: true, progress: 0, delay: 2400, isSongGenerated: false, isPlaying: false }, // 抗重放攻击方向 - 抗重放
  { isLoading: true, progress: 0, delay: 3200, isSongGenerated: false, isPlaying: false }  // 后量子算法适配方向 - 后量子
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

// 组件挂载时设置音频元素
onMounted(() => {
  // 音频结束时重置所有播放状态
  if (audioElement.value) {
    audioElement.value.addEventListener('ended', () => {
      groups.forEach(group => {
        group.isPlaying = false;
      });
      isMusicPlaying.value = false;
      currentPlayingGroup.value = -1;
    });
  }
  
  startLoadingSimulation();
});

// 组件卸载时清理
onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause();
  }
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

.animate-fade-up {
  animation: fade-up 0.5s ease-out forwards;
}

@keyframes fade-up {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
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
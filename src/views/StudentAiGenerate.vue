<template>
  <div class="flex h-screen w-full bg-[#181818] text-[#cccccc] font-sans overflow-hidden select-none">
    
    <div class="w-[65%] flex flex-col border-r border-[#2b2b2b] h-full overflow-hidden relative">
      
      <div v-if="appState === 3" class="bg-[#1e4620]/80 border-b border-[#2ea043] p-1.5 flex items-center justify-center fade-in z-20 shadow-md">
        <span class="text-[#3fb950] font-bold text-xs flex items-center tracking-wide">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          🎉 闭环验证已完成，冰达机器人当前运行状态良好，按迹寻路与图传均无异常
        </span>
      </div>

      <div v-if="appState === 2 && !diffActionHandled" class="bg-[#3a1d1d] border-b border-[#f85149] p-1.5 flex items-center px-4 fade-in z-20">
        <svg class="w-3.5 h-3.5 text-[#f85149] mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span class="text-[#f85149] text-[11px] font-mono truncate">Run Error: [rospy.exceptions.ROSException] Failed to subscribe to topic '/scan'. Device permission denied for '/dev/video0'.</span>
      </div>

      <div class="flex-[7] flex flex-col min-h-0 bg-[#1e1e1e] relative">
        <div class="flex items-center justify-between bg-[#181818] border-b border-[#2b2b2b] text-[12px]">
          <div class="flex">
            <div class="px-4 py-2 bg-[#1e1e1e] border-t border-[#007acc] text-[#e3e3e3] flex items-center gap-2 cursor-pointer">
              <svg class="w-4 h-4 text-[#4B8BBE]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              nanocar_track.py
              <span class="ml-1.5 text-gray-500 hover:text-gray-300">×</span>
            </div>
          </div>
          <div class="flex items-center space-x-2.5 px-3 text-gray-400">
            <svg class="w-4 h-4 hover:text-gray-200 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
            <svg class="w-4 h-4 hover:text-gray-200 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            <svg class="w-4 h-4 hover:text-gray-200 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <svg class="w-4 h-4 hover:text-gray-200 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
            <span class="text-gray-600 font-bold">···</span>
          </div>
        </div>
        <div class="px-4 py-1 text-[11px] text-[#858585] border-b border-[#2b2b2b] flex items-center gap-1.5 font-mono">
          <span>src</span> <span class="text-gray-600">></span> <span>nanocar_ros</span> <span class="text-gray-600">></span> <span>scripts</span> <span class="text-gray-600">></span> <span class="text-[#cccccc]">nanocar_track.py</span> <span class="text-gray-600">></span> <span class="text-[#dcdcaa]">NanoCarTracker</span> <span class="text-gray-600">></span> <span class="text-[#dcdcaa]">__init__</span>
        </div>

        <div v-if="showDiffBar" class="absolute top-16 left-0 right-0 bg-[#1e4620]/90 backdrop-blur-sm border-y border-[#2ea043]/50 px-4 py-1.5 flex justify-between items-center z-30 fade-in shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
          <div class="flex items-center text-[#e3e3e3] text-[12px] gap-2">
            <svg class="w-4 h-4 text-[#3fb950]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            变更已完成，请确认是否采纳。
          </div>
          <div class="flex gap-2">
            <button @click="handleRejectDiff" class="px-2.5 py-1 text-[#cccccc] hover:text-white text-[11px] rounded flex items-center transition">
              <span class="mr-1.5 font-medium">撤销</span> <span class="text-[10px] text-gray-500 font-mono">Ctrl+Backspace</span>
            </button>
            <button @click="handleAcceptDiff" class="px-2.5 py-1 bg-[#e3e3e3] hover:bg-white text-black text-[11px] rounded flex items-center transition shadow-sm font-medium">
              <span class="mr-1.5">保留</span> <span class="text-[10px] text-gray-600 font-mono">Ctrl+Enter</span>
            </button>
            <div class="border-l border-[#2ea043]/50 pl-2 ml-1 text-gray-400 flex items-center space-x-1 cursor-pointer">
               <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
               <span class="text-[10px]">1/1</span>
               <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar font-mono text-[13px] leading-[22px] pt-2 pb-10 relative">
          <div v-if="codeLines.length === 0" class="absolute inset-0 flex items-center justify-center text-[#858585]">
            <div class="flex flex-col items-center gap-3 animate-pulse">
                <svg class="w-8 h-8 text-[#4B8BBE]/50" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                <span>等待 Builder 生成代码...</span>
            </div>
          </div>
          <div v-for="(line, idx) in codeLines" :key="idx" class="flex hover:bg-[#2a2d2e] transition-colors w-full group" :class="getLineBgColor(line)">
            <div class="w-14 text-right pr-4 text-[#858585] select-none shrink-0 text-[12px]" :class="getLineNumColor(line)">
              {{ line.diffType === 'added' ? '+' : line.diffType === 'removed' ? '-' : (idx + 1) }}
            </div>
            <div class="whitespace-pre pl-2 break-all" :class="getLineTextColor(line)" v-html="line.content"></div>
          </div>
        </div>
      </div>

      <div class="flex-[3] flex flex-col min-h-0 bg-[#1e1e1e] border-t border-[#2b2b2b]">
        <div class="flex items-center justify-between text-[11px] text-[#cccccc] pl-4 pt-1.5 pb-1 border-b border-[#2b2b2b] select-none">
          <div class="flex gap-4">
            <div class="hover:text-white cursor-pointer">问题</div>
            <div class="hover:text-white cursor-pointer">输出</div>
            <div class="hover:text-white cursor-pointer">调试控制台</div>
            <div class="text-[#e3e3e3] border-b border-[#007acc] pb-1 cursor-pointer font-medium">终端</div>
            <div class="hover:text-white cursor-pointer">SQL Preview</div>
            <div class="hover:text-white cursor-pointer">GitLens</div>
          </div>
          <div class="flex items-center space-x-2 pr-3 text-[#858585]">
            <svg class="w-3.5 h-3.5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <span class="text-xs">esbuild</span>
            <svg class="w-3.5 h-3.5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            <svg class="w-3.5 h-3.5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <span class="font-bold cursor-pointer hover:text-white px-1">···</span>
            <svg class="w-3.5 h-3.5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
            <svg class="w-3.5 h-3.5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto custom-scrollbar p-3 font-mono text-[12px] leading-[1.6]">
          <div v-for="(log, idx) in terminalLogs" :key="idx" :class="log.color">
            {{ log.text }}
          </div>
          <div v-if="isTerminalRunning" class="inline-block w-2 h-3.5 bg-[#cccccc] animate-pulse ml-1 align-middle"></div>
        </div>
      </div>
    </div>

    <div class="w-[35%] flex flex-col bg-[#1e1e1e] border-l border-[#2b2b2b] h-full shadow-[-5px_0_15px_rgba(0,0,0,0.2)] z-10 relative">
      <div class="px-4 py-3 flex justify-between items-center border-b border-[#2b2b2b]">
        <div class="font-bold text-[14px] tracking-wide text-[#e3e3e3]">TRAE</div>
        <div class="flex space-x-3 text-[#858585]">
          <svg class="w-4 h-4 hover:text-[#cccccc] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"></path></svg>
          <svg class="w-4 h-4 hover:text-[#cccccc] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <svg class="w-4 h-4 hover:text-[#cccccc] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          <svg class="w-4 h-4 hover:text-[#cccccc] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
      </div>

      <div class="px-4 py-3 flex items-center gap-2 text-[#e3e3e3]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        <span class="font-bold text-[13px]">Builder</span>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 space-y-6" ref="chatScrollRef">
        <div v-for="(block, idx) in chatBlocks" :key="idx" class="fade-in">
          
          <div v-if="block.role === 'user'" class="flex justify-end">
            <div class="bg-[#2d2d2d] text-[#e3e3e3] text-[13px] px-4 py-2.5 rounded-xl rounded-tr-sm max-w-[95%] leading-relaxed border border-[#3c3c3c]">
              {{ block.content }}
            </div>
          </div>

          <div v-else class="flex flex-col gap-2 w-full">
            
            <div v-if="block.type === 'thought'" class="flex items-center gap-2 text-[#858585] text-[12px] cursor-pointer hover:text-[#cccccc] transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              <span>思考过程</span>
              <span v-if="block.isTyping" class="inline-block w-1 h-3 bg-[#858585] ml-1 animate-pulse"></span>
            </div>

            <div v-if="block.type === 'thought_detail'" class="flex items-start gap-2 pl-5 text-[#858585] text-[12px]">
               <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
               <span class="font-mono break-all">{{ block.content }}</span>
            </div>

            <div v-if="block.type === 'agent'" class="pl-5 mt-2 mb-2">
                <div class="bg-[#252526] border border-[#3c3c3c] rounded-md overflow-hidden transition-all duration-300 w-full max-w-[95%]">
                    <div class="px-3 py-2 flex items-center justify-between">
                    <div class="flex items-center gap-2 text-[12px] flex-1 min-w-0">
                        <svg class="w-3.5 h-3.5 text-[#e3ce62] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        <span class="font-medium text-[#cccccc] truncate">{{ block.filename }}</span>
                        <span class="text-[#858585] font-mono truncate hidden lg:inline">{{ block.path }}</span>
                        <span v-if="block.status === 'success' && block.add > 0" class="text-[#3fb950] font-mono shrink-0">+{{ block.add }}</span>
                        <span v-if="block.status === 'success' && block.del > 0" class="text-[#f85149] font-mono shrink-0">-{{ block.del }}</span>
                    </div>
                    <div class="flex items-center gap-2 shrink-0 ml-3">
                        <svg v-if="block.status === 'loading'" class="animate-spin h-3.5 w-3.5 text-[#cccccc]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <button v-else-if="block.status === 'success'" class="text-[11px] text-[#cccccc] bg-[#333333] hover:bg-[#444444] px-2 py-0.5 rounded border border-[#444444] transition-colors">查看变更</button>
                    </div>
                    </div>
                </div>
            </div>

            <div v-if="block.type === 'text'" class="text-[13px] text-[#cccccc] leading-[1.7] mt-1 pl-1">
              <div v-html="block.content" class="rich-text-content"></div>
              <span v-if="block.isTyping" class="inline-block w-1.5 h-3.5 bg-[#cccccc] ml-1 animate-pulse align-middle"></span>
            </div>

          </div>
        </div>
      </div>

      <div class="p-4 bg-[#1e1e1e] relative">
        
        <div v-if="canDeploy" class="absolute -top-10 left-4 right-4 bg-[#252526] border border-[#3c3c3c] rounded-md px-3 py-1.5 flex items-center justify-between shadow-lg text-[12px] text-[#cccccc] fade-in">
          <div class="flex items-center gap-2">
            <svg class="w-3.5 h-3.5 text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
            <svg class="w-3.5 h-3.5 text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span class="text-[#3fb950] flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> 任务完成</span>
            <span>文件需要审查</span>
            <svg class="w-3.5 h-3.5 text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
          </div>
        </div>

        <div class="relative bg-[#252526] border border-[#3c3c3c] rounded-lg focus-within:border-[#555555] transition-colors flex flex-col">
          
          <div class="flex items-center gap-1.5 px-3 pt-2 text-[#858585] text-[12px] border-b border-transparent">
             <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
             <span>@Builder</span>
             <svg class="w-3.5 h-3.5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
          </div>

          <textarea 
            v-model="currentInput"
            :disabled="isGenerating"
            rows="3"
            class="w-full bg-transparent text-[13px] text-[#e3e3e3] px-3 py-2 outline-none resize-none custom-scrollbar placeholder-[#6e6e6e] disabled:opacity-50 min-h-[70px]"
            placeholder="您正在与 Builder 聊天"
          ></textarea>
          
          <div class="flex items-center justify-between px-2 pb-2">
            <div class="flex items-center gap-2 text-[#858585]">
              <span class="hover:text-[#cccccc] cursor-pointer font-mono text-[14px]">@</span>
              <span class="hover:text-[#cccccc] cursor-pointer font-mono text-[14px]">#</span>
              <svg class="w-4 h-4 hover:text-[#cccccc] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-[#858585] text-[12px] flex items-center gap-1 cursor-pointer hover:text-[#cccccc]">
                <span>Auto</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <svg class="w-4 h-4 text-[#858585] hover:text-[#cccccc] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              <svg class="w-4 h-4 text-[#858585] hover:text-[#cccccc] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              <button 
                @click="handleSend" 
                :disabled="isGenerating || !currentInput.trim()"
                class="p-1 rounded transition-colors"
                :class="(isGenerating || !currentInput.trim()) ? 'text-[#555555]' : 'bg-[#e3e3e3] text-black hover:bg-white'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              </button>
            </div>
          </div>
        </div>
        
        <button 
          @click="navigateToDeploy"
          :disabled="!canDeploy"
          class="w-full mt-3 py-2 rounded-md text-[13px] font-bold transition-all duration-300 flex justify-center items-center gap-2"
          :class="canDeploy ? 'bg-[#238636] hover:bg-[#2ea043] text-white shadow-[0_0_10px_rgba(46,160,67,0.3)]' : 'bg-[#21262d] text-[#8b949e] border border-[#30363d] cursor-not-allowed'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          打包代码至部署页
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ===== 核心状态 =====
const appState = ref(1)
const isGenerating = ref(false)
const canDeploy = ref(false)
const chatBlocks = ref([])
const currentInput = ref('')
const chatScrollRef = ref(null)

// ===== 左侧 UI 状态 =====
const codeLines = ref([])
const terminalLogs = ref([])
const isTerminalRunning = ref(false)
const showDiffBar = ref(false)
const diffActionHandled = ref(false)

// 辅助函数
const delay = (ms) => new Promise(res => setTimeout(res, ms))
const scrollToBottom = async () => {
  await nextTick()
  if (chatScrollRef.value) {
    chatScrollRef.value.scrollTop = chatScrollRef.value.scrollHeight
  }
}

// 模拟流式打字输出富文本
const streamRichText = async (htmlContent) => {
  const block = { role: 'ai', type: 'text', content: '', isTyping: true }
  chatBlocks.value.push(block)
  await scrollToBottom()
  
  // 简单模拟逐字，实际富文本逐字需要解析 DOM，这里为演示直接显示一部分或者快速跳跃
  // 为了真实感，我们切分字符串
  const chunkSize = 15
  for (let i = 0; i < htmlContent.length; i += chunkSize) {
    block.content += htmlContent.slice(i, i + chunkSize)
    await delay(10)
    if (i % 60 === 0) await scrollToBottom()
  }
  block.content = htmlContent // 确保标签完整闭合
  block.isTyping = false
  await scrollToBottom()
}

// 推入思考过程
const pushThought = async (text) => {
  const block = { role: 'ai', type: 'thought', isTyping: true }
  chatBlocks.value.push(block)
  await scrollToBottom()
  await delay(600)
  block.isTyping = false
  chatBlocks.value.push({ role: 'ai', type: 'thought_detail', content: text })
  await scrollToBottom()
  await delay(800)
}

// 推入 Agent 文件修改动作 (对标图3样式)
const pushFileAgent = async (filename, path, waitTime, addLines = 0, delLines = 0) => {
  const block = { role: 'ai', type: 'agent', filename, path, status: 'loading', add: addLines, del: delLines }
  chatBlocks.value.push(block)
  await scrollToBottom()
  await delay(waitTime)
  block.status = 'success'
  await scrollToBottom()
}

// 终端大量日志打印
const appendTerminal = async (logs, fast = false) => {
  isTerminalRunning.value = true
  for (const log of logs) {
    terminalLogs.value.push(log)
    await delay(fast ? 30 : 150)
  }
  isTerminalRunning.value = false
}

// 初始化状态
onMounted(() => {
  const savedState = localStorage.getItem('demo_state') || '1'
  appState.value = parseInt(savedState, 10)

  if (appState.value === 1) {
    currentInput.value = "请重新给我一个冰达机器人如何按迹寻路，并实时回传镜头拍摄的图像。要有完整详细的步骤，包括机器人端，电脑端和手机端分别都有哪些具体操作。同时我需要将命令写入冰达机器人，让机器人按事先写好的路线走，并将拍摄的图像无线回传电脑，手机。冰达机器人型号是NanoCar（melodic，ROS1），雷达是rplidar_super，摄像头是astrapro，输出为代码"
  } else if (appState.value === 2) {
    codeLines.value = getV1FullCode()
    terminalLogs.value = getV1TerminalError()
    currentInput.value = "根据报错，雷达话题应为 /rplidar_scan，请优化代码并赋予摄像头 /dev/video0 权限"
    chatBlocks.value = [
      { role: 'user', content: "生成冰达机器人寻迹与图传的完整代码..." },
      { role: 'ai', type: 'text', content: "<p>已生成 <code>nanocar_track.py</code>，包含完整的 PID 寻迹逻辑与 Web 图传推流。请运行查看。</p>" }
    ]
  } else if (appState.value === 3) {
    codeLines.value = getV2FullCode()
    terminalLogs.value = getV2TerminalSuccess()
    chatBlocks.value = [
      { role: 'user', content: "修复完成，确认采纳。" },
      { role: 'ai', type: 'text', content: "<p class='mb-2'><b>已完成！</b></p><p>雷达话题与摄像头权限已修正，编译通过。机器人目前正在按照既定路线寻迹前行，手机端与电脑端图传均已连通。</p>" }
    ]
    canDeploy.value = true
  }
})

// ===== 主发送逻辑 =====
const handleSend = async () => {
  if (isGenerating.value) return
  
  const query = currentInput.value
  currentInput.value = ''
  isGenerating.value = true
  canDeploy.value = false

  chatBlocks.value.push({ role: 'user', content: query })
  await scrollToBottom()

  if (appState.value === 1) {
    await runState1Sequence()
  } else if (appState.value === 2) {
    await runState2Sequence()
  }
}

// ===== 状态 1：大规模生成 =====
const runState1Sequence = async () => {
  await pushThought("用户需要为 NanoCar(melodic) 编写完整的寻迹与图传节点代码，包含雷达(rplidar_super)避障与摄像头(astrapro)推流。")
  await pushThought("开始构建 nanocar_track.py 的大纲：引入必要依赖，编写 PID 控制算法处理图像中线偏移，加入雷达安全订阅，整合 web_video_server 用于多端查看...")
  
  // 大量代码写入模拟
  await delay(500)
  await pushFileAgent("nanocar_track.py", "src/nanocar_ros/scripts", 3500, 142, 0)
  codeLines.value = getV1FullCode() // 加载完整的 140+ 行代码
  
  // 终端海量输出模拟
  await pushThought("正在执行工作空间编译与节点预检 (catkin_make)...")
  await appendTerminal(getTerminalBuildLogs(), true)

  const summaryHtml = `
    <h3 class="text-[14px] font-bold text-white mb-2 mt-1">已完成！</h3>
    <p class="mb-3">我已经生成了完整的 <code>nanocar_track.py</code> 寻迹节点。该代码集成了 PID 视觉寻迹控制与图像无线转发机制。</p>
    <h4 class="font-bold text-[#e3e3e3] mb-1">修改内容：</h4>
    <ul class="list-disc pl-5 space-y-1 mb-3 text-[#cccccc]">
        <li>创建并配置了 <code>NanoCarTracker</code> 核心控制类。</li>
        <li>利用 OpenCV 实现了路网轮廓识别与质心偏移计算。</li>
        <li>整合了雷达 <code>/scan</code> 话题的紧急避障防撞。</li>
        <li>实现了图像压缩发布用于手机端和电脑端图传。</li>
    </ul>
    <h4 class="font-bold text-[#e3e3e3] mb-1">操作步骤：</h4>
    <ol class="list-decimal pl-5 space-y-1">
        <li><b>机器人端：</b>赋予脚本执行权限：<br><code class="bg-[#2d2d2d] px-1 py-0.5 rounded text-[#e3e3e3]">chmod +x src/nanocar_ros/scripts/nanocar_track.py</code></li>
        <li><b>启动节点：</b><br><code class="bg-[#2d2d2d] px-1 py-0.5 rounded text-[#e3e3e3]">roslaunch nanocar_track start.launch</code></li>
        <li><b>多端查看：</b>手机/电脑浏览器访问 <code>http://&lt;机器人IP&gt;:8080/stream_viewer</code></li>
    </ol>
  `
  await streamRichText(summaryHtml)
  
  isGenerating.value = false
  canDeploy.value = true
}

// ===== 状态 2：Diff 修正 =====
const runState2Sequence = async () => {
  await pushThought("报错分析：rospy.exceptions.ROSException，由于雷达话题名为 /rplidar_scan 而非 /scan 导致。同时底层设备权限不足无法读取摄像头 /dev/video0。")
  
  await pushFileAgent("nanocar_track.py", "src/nanocar_ros/scripts", 2500, 3, 1)
  
  // 注入 Diff
  codeLines.value = getV2CodeDiff()
  showDiffBar.value = true
  
  const summaryHtml = `
    <h3 class="text-[14px] font-bold text-white mb-2 mt-1">修复已提交！</h3>
    <p class="mb-2">我已在 <code>src/nanocar_ros/scripts/nanocar_track.py</code> 中修改了路由配置：</p>
    <ul class="list-disc pl-5 space-y-1">
        <li>修改前：指向 <code>/scan</code></li>
        <li>修改后：指向 <code>/rplidar_scan</code> 并添加 <code>sudo chmod 777</code> 操作</li>
    </ul>
    <p class="mt-3 text-[#e3ce62]">请点击左侧代码区的 <b>[保留]</b> 按钮确认采纳更改，系统将自动重新执行部署。</p>
  `
  await streamRichText(summaryHtml)
  
  isGenerating.value = false
}

// ===== Diff 操作 =====
const handleAcceptDiff = async () => {
  showDiffBar.value = false
  diffActionHandled.value = true
  codeLines.value = getV2FullCode() // 应用完整干净的V2代码
  
  isGenerating.value = true
  await pushThought("用户确认变更，正在重载 ROS 节点...")
  await appendTerminal([
    { text: '$ source devel/setup.bash', color: 'text-[#cccccc]' },
    { text: '$ roslaunch nanocar_track start.launch', color: 'text-[#cccccc]' },
    { text: '[INFO] [1712481691.124]: Setting /dev/video0 permissions...', color: 'text-[#3fb950]' },
    { text: '[INFO] [1712481691.562]: Successfully subscribed to /rplidar_scan', color: 'text-[#3fb950]' },
    { text: '[INFO] [1712481692.015]: Video streaming started on port 8080.', color: 'text-[#3fb950]' },
    { text: '✅ [SYSTEM] All subsystems operational.', color: 'text-[#4B8BBE] font-bold' }
  ], false)
  
  await streamRichText("<p>变更已应用并验证通过。系统当前运行良好，可随时打包代码。</p>")
  isGenerating.value = false
  canDeploy.value = true
}

const handleRejectDiff = () => {
  showDiffBar.value = false
  codeLines.value = getV1FullCode()
  isGenerating.value = false
}

const navigateToDeploy = () => { alert('触发路由跳转：/deploy') }

// 代码高亮逻辑
const getLineBgColor = (line) => {
  if (line.diffType === 'added') return 'bg-[#1e4620]/40 border-l-[3px] border-[#2ea043]'
  if (line.diffType === 'removed') return 'bg-[#4b1818]/40 border-l-[3px] border-[#f85149] line-through opacity-70'
  return 'border-l-[3px] border-transparent'
}
const getLineNumColor = (line) => {
  if (line.diffType === 'added') return 'text-[#2ea043]'
  if (line.diffType === 'removed') return 'text-[#f85149]'
  return 'text-[#858585]'
}
const getLineTextColor = (line) => {
  if (line.diffType === 'added') return 'text-[#7ee787]'
  if (line.diffType === 'removed') return 'text-[#ff7b72]'
  return 'text-[#cccccc]'
}

// ===== 模拟长篇代码生成库 (100多行) =====
const getV1FullCode = () => {
  const code = [
    { content: '<span class="text-[#c586c0]">#!/usr/bin/env python</span>' },
    { content: '<span class="text-[#c586c0]"># -*- coding: utf-8 -*-</span>' },
    { content: '<span class="text-[#6a9955]">"""</span>' },
    { content: '<span class="text-[#6a9955]"> NanoCar ROS1 Track & Stream Node</span>' },
    { content: '<span class="text-[#6a9955]"> @Author: Builder AI</span>' },
    { content: '<span class="text-[#6a9955]"> @Description: Line tracking using AstraPro and obstacle avoidance via RPLidar</span>' },
    { content: '<span class="text-[#6a9955]">"""</span>' },
    { content: '' },
    { content: '<span class="text-[#c586c0]">import</span> rospy' },
    { content: '<span class="text-[#c586c0]">import</span> cv2' },
    { content: '<span class="text-[#c586c0]">import</span> numpy <span class="text-[#c586c0]">as</span> np' },
    { content: '<span class="text-[#c586c0]">import</span> os' },
    { content: '<span class="text-[#c586c0]">from</span> sensor_msgs.msg <span class="text-[#c586c0]">import</span> Image, LaserScan' },
    { content: '<span class="text-[#c586c0]">from</span> geometry_msgs.msg <span class="text-[#c586c0]">import</span> Twist' },
    { content: '<span class="text-[#c586c0]">from</span> cv_bridge <span class="text-[#c586c0]">import</span> CvBridge, CvBridgeError' },
    { content: '' },
    { content: '<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">NanoCarTracker</span>:' },
    { content: '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">__init__</span>(<span class="text-[#569cd6]">self</span>):' },
    { content: '        rospy.init_node(<span class="text-[#ce9178]>"nanocar_track_node"</span>, anonymous=<span class="text-[#569cd6]">True</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.bridge = CvBridge()' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># PID parameters for tracking</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.kp = <span class="text-[#b5cea8]">0.005</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.kd = <span class="text-[#b5cea8]">0.001</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.last_error = <span class="text-[#b5cea8]">0</span>' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># State variables</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.safe_distance = <span class="text-[#b5cea8]">0.3</span>  <span class="text-[#6a9955]"># meters</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.obstacle_detected = <span class="text-[#569cd6]">False</span>' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># Publishers & Subscribers</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.cmd_pub = rospy.Publisher(<span class="text-[#ce9178]>"cmd_vel"</span>, Twist, queue_size=<span class="text-[#b5cea8]">10</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.image_pub = rospy.Publisher(<span class="text-[#ce9178]>"camera/processed/image_raw"</span>, Image, queue_size=<span class="text-[#b5cea8]">2</span>)' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># 错误订阅点：使用了默认的 /scan</span>' },
    { content: '        rospy.Subscriber(<span class="text-[#ce9178]>"<span class="text-[#f85149] font-bold">/scan</span>"</span>, LaserScan, <span class="text-[#569cd6]">self</span>.lidar_callback)' },
    { content: '        rospy.Subscriber(<span class="text-[#ce9178]>"camera/rgb/image_raw"</span>, Image, <span class="text-[#569cd6]">self</span>.image_callback)' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># 初始化底层硬件</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.init_hardware()' },
    { content: '        ' },
    { content: '        rospy.loginfo(<span class="text-[#ce9178]>"NanoCar Tracker Initialized Successfully."</span>)' },
    { content: '' },
    { content: '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">init_hardware</span>(<span class="text-[#569cd6]">self</span>):' },
    { content: '        <span class="text-[#6a9955]"># 缺少权限授予代码</span>' },
    { content: '        rospy.loginfo(<span class="text-[#ce9178]>"Checking camera /dev/video0 access..."</span>)' },
    { content: '        <span class="text-[#c586c0]">if not</span> os.path.exists(<span class="text-[#ce9178]">"/dev/video0"</span>):' },
    { content: '            rospy.logwarn(<span class="text-[#ce9178]>"Warning: /dev/video0 not found!"</span>)' },
    { content: '' }
  ]
  // 填充一些凑行数的逼真逻辑
  const filler = [
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">lidar_callback</span>(<span class="text-[#569cd6]">self</span>, msg):',
    '        <span class="text-[#6a9955]"># Process Lidar data to find front obstacles</span>',
    '        front_ranges = msg.ranges[<span class="text-[#b5cea8]">340</span>:] + msg.ranges[:<span class="text-[#b5cea8]">20</span>]',
    '        valid_ranges = [r <span class="text-[#c586c0]">for</span> r <span class="text-[#c586c0]">in</span> front_ranges <span class="text-[#c586c0]">if</span> r > <span class="text-[#b5cea8]">0.01</span>]',
    '        <span class="text-[#c586c0]">if</span> valid_ranges <span class="text-[#c586c0]">and</span> min(valid_ranges) < <span class="text-[#569cd6]">self</span>.safe_distance:',
    '            <span class="text-[#569cd6]">self</span>.obstacle_detected = <span class="text-[#569cd6]">True</span>',
    '        <span class="text-[#c586c0]">else</span>:',
    '            <span class="text-[#569cd6]">self</span>.obstacle_detected = <span class="text-[#569cd6]">False</span>',
    '',
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">image_callback</span>(<span class="text-[#569cd6]">self</span>, data):',
    '        <span class="text-[#c586c0]">try</span>:',
    '            cv_image = <span class="text-[#569cd6]">self</span>.bridge.imgmsg_to_cv2(data, <span class="text-[#ce9178]>"bgr8"</span>)',
    '        <span class="text-[#c586c0]">except</span> CvBridgeError <span class="text-[#c586c0]">as</span> e:',
    '            <span class="text-[#c586c0]">print</span>(e)',
    '            <span class="text-[#c586c0]">return</span>',
    '',
    '        <span class="text-[#c586c0]">if</span> <span class="text-[#569cd6]">self</span>.obstacle_detected:',
    '            <span class="text-[#569cd6]">self</span>.stop_robot()',
    '            <span class="text-[#c586c0]">return</span>',
    '',
    '        <span class="text-[#6a9955]"># Image processing logic</span>',
    '        hsv = cv2.cvtColor(cv_image, cv2.COLOR_BGR2HSV)',
    '        lower_black = np.array([<span class="text-[#b5cea8]">0</span>, <span class="text-[#b5cea8]">0</span>, <span class="text-[#b5cea8]">0</span>])',
    '        upper_black = np.array([<span class="text-[#b5cea8]">180</span>, <span class="text-[#b5cea8]">255</span>, <span class="text-[#b5cea8]">50</span>])',
    '        mask = cv2.inRange(hsv, lower_black, upper_black)',
    '',
    '        h, w, d = cv_image.shape',
    '        search_top = <span class="text-[#c586c0]">int</span>(<span class="text-[#b5cea8]">3</span>*h/<span class="text-[#b5cea8]">4</span>)',
    '        mask[<span class="text-[#b5cea8]">0</span>:search_top, <span class="text-[#b5cea8]">0</span>:w] = <span class="text-[#b5cea8]">0</span>',
    '',
    '        M = cv2.moments(mask)',
    '        <span class="text-[#c586c0]">if</span> M[<span class="text-[#ce9178]>\'m00\'</span>] > <span class="text-[#b5cea8]">0</span>:',
    '            cx = <span class="text-[#c586c0]">int</span>(M[<span class="text-[#ce9178]>\'m10\'</span>]/M[<span class="text-[#ce9178]>\'m00\'</span>])',
    '            cy = <span class="text-[#c586c0]">int</span>(M[<span class="text-[#ce9178]>\'m01\'</span>]/M[<span class="text-[#ce9178]>\'m00\'</span>])',
    '            cv2.circle(cv_image, (cx, cy), <span class="text-[#b5cea8]">20</span>, (<span class="text-[#b5cea8]">0</span>,<span class="text-[#b5cea8]">0</span>,<span class="text-[#b5cea8]">255</span>), <span class="text-[#b5cea8]>-1</span>)',
    '            ',
    '            <span class="text-[#6a9955]"># PID calculation</span>',
    '            error = cx - w/<span class="text-[#b5cea8]">2</span>',
    '            angular_z = <span class="text-[#569cd6]">self</span>.kp * error + <span class="text-[#569cd6]">self</span>.kd * (error - <span class="text-[#569cd6]">self</span>.last_error)',
    '            <span class="text-[#569cd6]">self</span>.last_error = error',
    '            ',
    '            twist = Twist()',
    '            twist.linear.x = <span class="text-[#b5cea8]">0.2</span>',
    '            twist.angular.z = -<span class="text-[#c586c0]">float</span>(angular_z)',
    '            <span class="text-[#569cd6]">self</span>.cmd_pub.publish(twist)',
    '        <span class="text-[#c586c0]">else</span>:',
    '            <span class="text-[#569cd6]">self</span>.stop_robot()',
    '',
    '        <span class="text-[#6a9955]"># Compress and publish for Web Viewer</span>',
    '        <span class="text-[#c586c0]">try</span>:',
    '            <span class="text-[#569cd6]">self</span>.image_pub.publish(<span class="text-[#569cd6]">self</span>.bridge.cv2_to_imgmsg(cv_image, <span class="text-[#ce9178]>"bgr8"</span>))',
    '        <span class="text-[#c586c0]">except</span> CvBridgeError <span class="text-[#c586c0]">as</span> e:',
    '            <span class="text-[#c586c0]">print</span>(e)',
    '',
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">stop_robot</span>(<span class="text-[#569cd6]">self</span>):',
    '        twist = Twist()',
    '        twist.linear.x = <span class="text-[#b5cea8]">0</span>',
    '        twist.angular.z = <span class="text-[#b5cea8]">0</span>',
    '        <span class="text-[#569cd6]">self</span>.cmd_pub.publish(twist)',
    '',
    '<span class="text-[#c586c0]">if</span> __name__ == <span class="text-[#ce9178]>"__main__"</span>:',
    '    <span class="text-[#c586c0]">try</span>:',
    '        tracker = NanoCarTracker()',
    '        rospy.spin()',
    '    <span class="text-[#c586c0]">except</span> rospy.ROSInterruptException:',
    '        <span class="text-[#c586c0]">pass</span>'
  ];
  for(let line of filler) code.push({ content: line });
  return code;
}

const getV2CodeDiff = () => {
  const code = getV1FullCode();
  code.splice(35, 1, { content: '        <span class="text-[#6a9955]"># 修改：使用冰达 NanoCar 真实的雷达话题</span>' });
  code.splice(36, 1, 
      { content: '        rospy.Subscriber(<span class="text-[#ce9178]">"/scan"</span>, LaserScan, <span class="text-[#569cd6]">self</span>.lidar_callback)', diffType: 'removed' }
  );
  code.splice(37, 0, 
      { content: '        rospy.Subscriber(<span class="text-[#ce9178]">"/rplidar_scan"</span>, LaserScan, <span class="text-[#569cd6]">self</span>.lidar_callback)', diffType: 'added' }
  );
  
  code.splice(44, 0, 
      { content: '        <span class="text-[#6a9955]"># 增加：赋予设备节点最高权限，解决 Permission Denied</span>', diffType: 'added' },
      { content: '        os.system(<span class="text-[#ce9178]>"sudo chmod 777 /dev/video0"</span>)', diffType: 'added' }
  );
  return code;
}

const getV2FullCode = () => {
  const code = getV2CodeDiff().filter(c => c.diffType !== 'removed').map(c => {
    return { content: c.content } // strip diff styling
  })
  return code;
}

// 终端海量日志
const getTerminalBuildLogs = () => {
    let logs = [
        { text: '$ source /opt/ros/melodic/setup.bash', color: 'text-[#cccccc]' },
        { text: '$ catkin_make', color: 'text-[#cccccc]' },
        { text: 'Base path: /home/nanocar/nanocar_ws', color: 'text-[#858585]' },
        { text: 'Source space: /home/nanocar/nanocar_ws/src', color: 'text-[#858585]' },
        { text: 'Build space: /home/nanocar/nanocar_ws/build', color: 'text-[#858585]' },
        { text: 'Devel space: /home/nanocar/nanocar_ws/devel', color: 'text-[#858585]' },
        { text: 'Install space: /home/nanocar/nanocar_ws/install', color: 'text-[#858585]' },
        { text: '####', color: 'text-[#858585]' },
        { text: '#### Running command: "make cmake_check_build_system" in "/home/nanocar/nanocar_ws/build"', color: 'text-[#858585]' },
        { text: '####', color: 'text-[#858585]' }
    ];
    for(let i=1; i<=15; i++) {
        logs.push({ text: `[ ${Math.floor(i*6)}%] Built target subsystem_component_${i}`, color: 'text-[#3fb950]' });
    }
    logs.push({ text: '[ 98%] Built target nanocar_ros', color: 'text-[#3fb950]' });
    logs.push({ text: '[100%] Built target web_video_server', color: 'text-[#3fb950]' });
    logs.push({ text: '✓ 依赖树完整，预检通过。', color: 'text-[#4B8BBE] font-bold' });
    return logs;
}

const getV1TerminalError = () => {
    const logs = getTerminalBuildLogs();
    logs.push({ text: '$ roslaunch nanocar_track start.launch', color: 'text-white mt-4' });
    logs.push({ text: '... logging to /home/nanocar/.ros/log/...', color: 'text-[#858585]' });
    logs.push({ text: 'started roslaunch server http://nanocar:41951/', color: 'text-[#cccccc]' });
    logs.push({ text: 'SUMMARY\n========\n\nPARAMETERS\n * /rosdistro: melodic\n * /rosversion: 1.14.13', color: 'text-[#cccccc]' });
    logs.push({ text: 'NODES\n  /\n    nanocar_track_node (nanocar_ros/nanocar_track.py)', color: 'text-[#cccccc]' });
    logs.push({ text: '[ERROR] [1712481690.123456]: Cannot connect to Lidar topic /scan. Retrying...', color: 'text-[#f85149]' });
    logs.push({ text: '[ERROR] [1712481690.124888]: IOError: [Errno 13] Permission denied: \'/dev/video0\'', color: 'text-[#f85149]' });
    logs.push({ text: '[FATAL] [1712481690.125001]: Node crashed with rospy.exceptions.ROSException.', color: 'text-[#f85149] font-bold' });
    return logs;
}

const getV2TerminalSuccess = () => {
    return [
        { text: '$ source devel/setup.bash', color: 'text-[#cccccc]' },
        { text: '$ roslaunch nanocar_track start.launch', color: 'text-[#cccccc]' },
        { text: '... logging to /home/nanocar/.ros/log/...', color: 'text-[#858585]' },
        { text: '[INFO] [1712481691.124]: Setting /dev/video0 permissions... (sudo chmod 777)', color: 'text-[#cccccc]' },
        { text: '[INFO] [1712481691.562]: Successfully subscribed to /rplidar_scan', color: 'text-[#3fb950]' },
        { text: '[INFO] [1712481692.015]: Lidar obstacle avoidance running. Safe distance: 0.3m', color: 'text-[#3fb950]' },
        { text: '[INFO] [1712481692.100]: Video stream captured. Resolution 640x480.', color: 'text-[#3fb950]' },
        { text: '[INFO] [1712481692.500]: Web video server started on port 8080.', color: 'text-[#3fb950]' },
        { text: '✅ [SYSTEM] All subsystems operational. Tracking line...', color: 'text-[#4B8BBE] font-bold' }
    ]
}
</script>

<style scoped>
/* 深度复刻 IDE 的细长滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #424242;
  border: 3px solid #1e1e1e; /* 创造内边距感 */
  border-radius: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}

.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 富文本内容内部样式支持 */
.rich-text-content :deep(code) {
  background-color: #2d2d2d;
  padding: 0.15rem 0.3rem;
  border-radius: 3px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.9em;
  color: #e3e3e3;
}
</style>
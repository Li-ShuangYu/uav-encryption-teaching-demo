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
              <span class="mr-1.5 font-medium">拒绝</span> <span class="text-[10px] text-gray-500 font-mono">Ctrl+Backspace</span>
            </button>
            <button @click="handleAcceptDiff" class="px-2.5 py-1 bg-[#e3e3e3] hover:bg-white text-black text-[11px] rounded flex items-center transition shadow-sm font-medium">
              <span class="mr-1.5">保留变更 (Accept)</span> <span class="text-[10px] text-gray-600 font-mono">Ctrl+Enter</span>
            </button>
            <div class="border-l border-[#2ea043]/50 pl-2 ml-1 text-gray-400 flex items-center space-x-1 cursor-pointer">
               <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
               <span class="text-[10px]">1/1</span>
               <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar font-mono text-[13px] leading-[22px] pt-2 pb-10 relative" ref="codeScrollRef">
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
        <div class="flex-1 overflow-y-auto custom-scrollbar p-3 font-mono text-[12px] leading-[1.6]" ref="terminalScrollRef">
          <div v-for="(log, idx) in terminalLogs" :key="idx" :class="log.color">
            {{ log.text }}
          </div>
          <div v-if="isTerminalRunning" class="inline-block w-2 h-3.5 bg-[#cccccc] animate-pulse ml-1 align-middle"></div>
        </div>
      </div>
    </div>

    <div class="w-[35%] flex flex-col bg-[#1e1e1e] border-l border-[#2b2b2b] h-full shadow-[-5px_0_15px_rgba(0,0,0,0.2)] z-10 relative">
      <div class="px-4 py-3 flex justify-between items-center border-b border-[#2b2b2b]">
        <div class="font-bold text-[14px] tracking-wide text-[#e3e3e3]">CODE</div>
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
            
            <div v-if="block.type === 'agent'" class="pl-5 mt-2 mb-2">
                <div class="bg-[#252526] border border-[#3c3c3c] rounded-md overflow-hidden transition-all duration-300 w-full max-w-[95%]">
                    <div class="px-3 py-2 flex items-center justify-between">
                    <div class="flex items-center gap-2 text-[12px] flex-1 min-w-0">
                        <svg class="w-3.5 h-3.5 text-[#e3ce62] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        <span class="font-medium text-[#cccccc] truncate">{{ block.filename }}</span>
                        <span v-if="block.path" class="text-[#858585] font-mono truncate hidden lg:inline">{{ block.path }}</span>
                        <span v-if="block.status === 'success' && block.add > 0" class="text-[#3fb950] font-mono shrink-0">+{{ block.add }}</span>
                        <span v-if="block.status === 'success' && block.del > 0" class="text-[#f85149] font-mono shrink-0">-{{ block.del }}</span>
                    </div>
                    <div class="flex items-center gap-2 shrink-0 ml-3">
                        <svg v-if="block.status === 'loading'" class="animate-spin h-3.5 w-3.5 text-[#cccccc]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <button v-else-if="block.status === 'success' && block.path" class="text-[11px] text-[#cccccc] bg-[#333333] hover:bg-[#444444] px-2 py-0.5 rounded border border-[#444444] transition-colors">查看变更</button>
                        <svg v-else-if="block.status === 'success'" class="w-3.5 h-3.5 text-[#3fb950]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
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
const codeScrollRef = ref(null)
const terminalScrollRef = ref(null)

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

const scrollCodeToBottom = async () => {
  await nextTick()
  if (codeScrollRef.value) {
    codeScrollRef.value.scrollTop = codeScrollRef.value.scrollHeight
  }
}

const scrollToDiff = async () => {
  await nextTick()
  if (codeScrollRef.value) {
    const diffIndex = codeLines.value.findIndex(line => line.diffType === 'added' || line.diffType === 'removed')
    if (diffIndex !== -1) {
      // 每一行大约22px，减去150px让差异显示在偏上居中位置
      const topPos = diffIndex * 22 - 150
      codeScrollRef.value.scrollTo({
        top: Math.max(0, topPos),
        behavior: 'smooth'
      })
    }
  }
}

const scrollTerminalToBottom = async () => {
  await nextTick()
  if (terminalScrollRef.value) {
    terminalScrollRef.value.scrollTop = terminalScrollRef.value.scrollHeight
  }
}

// 模拟流式打字输出富文本
const streamRichText = async (htmlContent) => {
  const block = { role: 'ai', type: 'text', content: '', isTyping: true }
  chatBlocks.value.push(block)
  await scrollToBottom()
  
  const chunkSize = 15
  for (let i = 0; i < htmlContent.length; i += chunkSize) {
    block.content += htmlContent.slice(i, i + chunkSize)
    await delay(10)
    if (i % 60 === 0) await scrollToBottom()
  }
  block.content = htmlContent
  block.isTyping = false
  await scrollToBottom()
}

// 代码模拟打字流式推入
const streamCodeLines = async (linesToAppend, delayMs = 15) => {
  for (const line of linesToAppend) {
    codeLines.value.push(line)
    await delay(delayMs)
    if(codeLines.value.length % 5 === 0) await scrollCodeToBottom()
  }
  await scrollCodeToBottom()
}

// 终端逐行打印
const streamTerminal = async (logs, delayMs = 120) => {
  isTerminalRunning.value = true
  for (const log of logs) {
    terminalLogs.value.push(log)
    await delay(delayMs)
    await scrollTerminalToBottom()
  }
  isTerminalRunning.value = false
}

// 推入 Agent 节点
const pushAgent = async (filename, path, waitTime, addLines = 0, delLines = 0) => {
  const block = { role: 'ai', type: 'agent', filename, path, status: 'loading', add: addLines, del: delLines }
  chatBlocks.value.push(block)
  await scrollToBottom()
  await delay(waitTime)
  block.status = 'success'
  await scrollToBottom()
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

// ===== 状态 1：大规模生成，多Agent协同交互编排 =====
const runState1Sequence = async () => {
  // 阶段 1：规划
  await streamRichText("好的，我将为您梳理冰达机器人按迹寻路及图传的完整步骤，并开始生成代码...")
  await pushAgent("规划项目结构与环境", "", 1500)
  codeLines.value = [] // 准备流式写入
  await streamCodeLines(getV1FullCode().slice(0, 45), 15)

  // 阶段 2：底层寻迹
  await streamRichText("环境规划完毕，开始为您编写核心的ROS寻迹节点逻辑...")
  await pushAgent("编写 ROS 寻迹底层代码", "nanocar_track.py", 2500, 120, 0)
  await streamCodeLines(getV1FullCode().slice(45, 140), 10)

  // 阶段 3：图传与通信
  await streamRichText("寻迹节点完成，正在补充摄像头图传与通信模块...")
  await pushAgent("编写图传与多端无线通信代码", "nanocar_track.py", 2000, 80, 0)
  await streamCodeLines(getV1FullCode().slice(140), 10)

  // 阶段 4：代码预检 (终端同步输出)
  await streamRichText("所有代码生成完毕，正在进行系统自动预检...")
  const checkAgent = { role: 'ai', type: 'agent', filename: 'AI 代码预检', path: '', status: 'loading' }
  chatBlocks.value.push(checkAgent)
  await scrollToBottom()
  await streamTerminal(getTerminalBuildLogs(), 150) // 终端逐行慢速敲击输出
  checkAgent.status = 'success'

  // 总结输出
  const summaryHtml = `
    <h3 class="text-[14px] font-bold text-white mb-2 mt-1">已完成！</h3>
    <p class="mb-3">我已经生成了完整的 <code>nanocar_track.py</code> 寻迹节点。该代码集成了 PID 视觉寻迹控制与图像无线转发机制。</p>
    <h4 class="font-bold text-[#e3e3e3] mb-1">修改内容：</h4>
    <ul class="list-disc pl-5 space-y-1 mb-3 text-[#cccccc]">
        <li>创建并配置了 <code>NanoCarTracker</code> 核心控制类。</li>
        <li>利用 OpenCV 实现了路网轮廓识别与质心偏移计算。</li>
        <li>整合了雷达话题的紧急避障防撞。</li>
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

// ===== 状态 2：Diff 修正多步交互编排 =====
const runState2Sequence = async () => {
  // 阶段 1：召回报错
  await streamRichText("收到报错信息，正在回顾项目上下文并分析错误原因...")
  await pushAgent("召回上下文与报错分析", "", 1800)

  // 阶段 2：修复话题订阅 (应用第一次 Diff)
  await streamRichText("分析完毕，确认雷达话题名不匹配，正在为您修改相关代码...")
  await pushAgent("修改寻迹节点话题订阅", "nanocar_track.py", 2000, 3, 2)
  codeLines.value = getV2CodeDiff_Part1()
  await scrollToDiff()

  // 阶段 3：补充底层权限 (应用第二次 Diff)
  await streamRichText("雷达节点修复完毕，同步排查关联的权限配置...")
  await pushAgent("补充设备 udev 权限代码", "nanocar_track.py", 2000, 7, 1)
  codeLines.value = getV2CodeDiff_Full()
  await scrollToDiff()

  // 阶段 4：二次预检
  await streamRichText("代码修正已完成，正在执行二次预检...")
  const checkAgent = { role: 'ai', type: 'agent', filename: 'AI 二次预检', path: '', status: 'loading' }
  chatBlocks.value.push(checkAgent)
  await scrollToBottom()
  await streamTerminal(getV2TerminalPrecheck(), 120) // 终端逐行输出二次预检
  checkAgent.status = 'success'

  // 触发 Diff Bar 和总结
  showDiffBar.value = true
  await streamRichText("已修复雷达话题匹配问题，并增加摄像头权限...")
  await scrollToDiff()
  
  isGenerating.value = false
}

// ===== Diff 操作 =====
const handleAcceptDiff = async () => {
  showDiffBar.value = false
  diffActionHandled.value = true
  codeLines.value = getV2FullCode() 
  
  isGenerating.value = true
  await pushAgent("应用变更并重载 ROS 环境", "", 1500)
  await streamTerminal([
    { text: '$ source devel/setup.bash', color: 'text-[#cccccc]' },
    { text: '$ roslaunch nanocar_track start.launch', color: 'text-[#cccccc]' },
    { text: '[INFO] [1712481691.124]: Setting /dev/video0 permissions...', color: 'text-[#3fb950]' },
    { text: '[INFO] [1712481691.562]: Successfully subscribed to /rplidar_scan', color: 'text-[#3fb950]' },
    { text: '[INFO] [1712481692.015]: Video streaming started on port 8080.', color: 'text-[#3fb950]' },
    { text: '✅ [SYSTEM] All subsystems operational.', color: 'text-[#4B8BBE] font-bold' }
  ], 100)
  
  await streamRichText("<p>变更已应用并验证通过。系统当前运行良好，可随时打包代码。</p>")
  isGenerating.value = false
  canDeploy.value = true
}

const handleRejectDiff = () => {
  showDiffBar.value = false
  codeLines.value = getV1FullCode()
  isGenerating.value = false
}

const navigateToDeploy = () => { if (appState.value !== 3) { router.push('/student/deploy') } }

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

// ===== 模拟长篇代码生成库 (提升至近 200 行级别的标准 ROS 节点规格) =====
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
    { content: '<span class="text-[#c586c0]">import</span> sys' },
    { content: '<span class="text-[#c586c0]">import</span> threading' },
    { content: '<span class="text-[#c586c0]">import</span> math' },
    { content: '<span class="text-[#c586c0]">from</span> sensor_msgs.msg <span class="text-[#c586c0]">import</span> Image, LaserScan' },
    { content: '<span class="text-[#c586c0]">from</span> geometry_msgs.msg <span class="text-[#c586c0]">import</span> Twist, PoseStamped' },
    { content: '<span class="text-[#c586c0]">from</span> std_msgs.msg <span class="text-[#c586c0]">import</span> String, Int32, Float32' },
    { content: '<span class="text-[#c586c0]">from</span> nav_msgs.msg <span class="text-[#c586c0]">import</span> Odometry' },
    { content: '<span class="text-[#c586c0]">from</span> cv_bridge <span class="text-[#c586c0]">import</span> CvBridge, CvBridgeError' },
    { content: '<span class="text-[#c586c0]">from</span> dynamic_reconfigure.server <span class="text-[#c586c0]">import</span> Server' },
    { content: '' },
    { content: '<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">NanoCarTracker</span>:' },
    { content: '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">__init__</span>(<span class="text-[#569cd6]">self</span>):' },
    { content: '        rospy.init_node(<span class="text-[#ce9178]>"nanocar_track_node"</span>, anonymous=<span class="text-[#569cd6]">True</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.bridge = CvBridge()' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># ===============================</span>' },
    { content: '        <span class="text-[#6a9955]"># Parameter Initialization</span>' },
    { content: '        <span class="text-[#6a9955]"># ===============================</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.kp = rospy.get_param(<span class="text-[#ce9178]>"~kp"</span>, <span class="text-[#b5cea8]">0.005</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.ki = rospy.get_param(<span class="text-[#ce9178]>"~ki"</span>, <span class="text-[#b5cea8]">0.000</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.kd = rospy.get_param(<span class="text-[#ce9178]>"~kd"</span>, <span class="text-[#b5cea8]">0.001</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.last_error = <span class="text-[#b5cea8]">0</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.integral_error = <span class="text-[#b5cea8]">0</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.max_angular_z = <span class="text-[#b5cea8]">1.5</span>' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># State variables</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.safe_distance = <span class="text-[#b5cea8]">0.3</span>  <span class="text-[#6a9955]"># meters</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.obstacle_detected = <span class="text-[#569cd6]">False</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.current_linear_velocity = <span class="text-[#b5cea8]">0.2</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.is_active = <span class="text-[#569cd6]">True</span>' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># Publishers</span>' },
    { content: '        <span class="text-[#569cd6]">self</span>.cmd_pub = rospy.Publisher(<span class="text-[#ce9178]>"cmd_vel"</span>, Twist, queue_size=<span class="text-[#b5cea8]">10</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.image_pub = rospy.Publisher(<span class="text-[#ce9178]>"camera/processed/image_raw"</span>, Image, queue_size=<span class="text-[#b5cea8]">2</span>)' },
    { content: '        <span class="text-[#569cd6]">self</span>.diag_pub = rospy.Publisher(<span class="text-[#ce9178]>"diagnostics/tracker_status"</span>, String, queue_size=<span class="text-[#b5cea8]">1</span>)' },
    { content: '        ' },
    { content: '        <span class="text-[#6a9955]"># ===============================</span>' },
    { content: '        <span class="text-[#6a9955]"># Subscribers</span>' },
    { content: '        <span class="text-[#6a9955]"># ===============================</span>' },
    { content: '        <span class="text-[#6a9955]"># 错误订阅点：使用了默认的 /scan</span>' },
    { content: '        rospy.Subscriber(<span class="text-[#ce9178]>"<span class="text-[#f85149] font-bold">/scan</span>"</span>, LaserScan, <span class="text-[#569cd6]">self</span>.lidar_callback)' },
    { content: '        rospy.Subscriber(<span class="text-[#ce9178]>"camera/rgb/image_raw"</span>, Image, <span class="text-[#569cd6]">self</span>.image_callback)' },
    { content: '        rospy.Subscriber(<span class="text-[#ce9178]>"odom"</span>, Odometry, <span class="text-[#569cd6]">self</span>.odom_callback)' },
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
  
  const filler = [
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">odom_callback</span>(<span class="text-[#569cd6]">self</span>, msg):',
    '        <span class="text-[#6a9955]"># Store current odometry for potential dead reckoning fallback</span>',
    '        <span class="text-[#569cd6]">self</span>.current_pose = msg.pose.pose',
    '',
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">lidar_callback</span>(<span class="text-[#569cd6]">self</span>, msg):',
    '        <span class="text-[#6a9955]"># Process Lidar data to find front obstacles from rplidar_super</span>',
    '        ranges_len = <span class="text-[#c586c0]">len</span>(msg.ranges)',
    '        <span class="text-[#c586c0]">if</span> ranges_len == <span class="text-[#b5cea8]">0</span>: <span class="text-[#c586c0]">return</span>',
    '        ',
    '        <span class="text-[#6a9955]"># Front 40 degrees cone (-20 to +20 degrees)</span>',
    '        idx_offset = <span class="text-[#c586c0]">int</span>((<span class="text-[#b5cea8]">20</span> / <span class="text-[#b5cea8]">360.0</span>) * ranges_len)',
    '        front_ranges = msg.ranges[-idx_offset:] + msg.ranges[:idx_offset]',
    '        valid_ranges = [r <span class="text-[#c586c0]">for</span> r <span class="text-[#c586c0]">in</span> front_ranges <span class="text-[#c586c0]">if</span> r > <span class="text-[#b5cea8]">0.01</span> <span class="text-[#c586c0]">and</span> <span class="text-[#c586c0]">not</span> math.isinf(r)]',
    '        ',
    '        <span class="text-[#c586c0]">if</span> valid_ranges <span class="text-[#c586c0]">and</span> min(valid_ranges) < <span class="text-[#569cd6]">self</span>.safe_distance:',
    '            <span class="text-[#c586c0]">if not</span> <span class="text-[#569cd6]">self</span>.obstacle_detected:',
    '                rospy.logwarn(<span class="text-[#ce9178]>"Obstacle detected! Stopping..."</span>)',
    '            <span class="text-[#569cd6]">self</span>.obstacle_detected = <span class="text-[#569cd6]">True</span>',
    '            <span class="text-[#569cd6]">self</span>.diag_pub.publish(<span class="text-[#ce9178]>"STATUS: OBSTACLE_AVOIDANCE_ACTIVE"</span>)',
    '        <span class="text-[#c586c0]">else</span>:',
    '            <span class="text-[#c586c0]">if</span> <span class="text-[#569cd6]">self</span>.obstacle_detected:',
    '                rospy.loginfo(<span class="text-[#ce9178]>"Path clear. Resuming..."</span>)',
    '            <span class="text-[#569cd6]">self</span>.obstacle_detected = <span class="text-[#569cd6]">False</span>',
    '            <span class="text-[#569cd6]">self</span>.diag_pub.publish(<span class="text-[#ce9178]>"STATUS: TRACKING_NORMAL"</span>)',
    '',
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">image_callback</span>(<span class="text-[#569cd6]">self</span>, data):',
    '        <span class="text-[#c586c0]">if not</span> <span class="text-[#569cd6]">self</span>.is_active: <span class="text-[#c586c0]">return</span>',
    '        ',
    '        <span class="text-[#c586c0]">try</span>:',
    '            cv_image = <span class="text-[#569cd6]">self</span>.bridge.imgmsg_to_cv2(data, <span class="text-[#ce9178]>"bgr8"</span>)',
    '        <span class="text-[#c586c0]">except</span> CvBridgeError <span class="text-[#c586c0]">as</span> e:',
    '            rospy.logerr(<span class="text-[#ce9178]>"CV Bridge Error: %s"</span> % e)',
    '            <span class="text-[#c586c0]">return</span>',
    '',
    '        <span class="text-[#6a9955]"># Halt if obstacle is in front</span>',
    '        <span class="text-[#c586c0]">if</span> <span class="text-[#569cd6]">self</span>.obstacle_detected:',
    '            <span class="text-[#569cd6]">self</span>.stop_robot()',
    '            <span class="text-[#569cd6]">self</span>.publish_annotated_image(cv_image, text=<span class="text-[#ce9178]>"BLOCKED"</span>)',
    '            <span class="text-[#c586c0]">return</span>',
    '',
    '        <span class="text-[#6a9955]"># ===============================</span>',
    '        <span class="text-[#6a9955]"># Image Processing Core Logic</span>',
    '        <span class="text-[#6a9955]"># ===============================</span>',
    '        <span class="text-[#6a9955]"># 1. Gaussian Blur to reduce noise</span>',
    '        blurred = cv2.GaussianBlur(cv_image, (<span class="text-[#b5cea8]">5</span>, <span class="text-[#b5cea8]">5</span>), <span class="text-[#b5cea8]">0</span>)',
    '        ',
    '        <span class="text-[#6a9955]"># 2. Convert to HSV for robust color extraction</span>',
    '        hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)',
    '        ',
    '        <span class="text-[#6a9955]"># 3. Define line tracking color range (e.g., Black line)</span>',
    '        lower_black = np.array([<span class="text-[#b5cea8]">0</span>, <span class="text-[#b5cea8]">0</span>, <span class="text-[#b5cea8]">0</span>])',
    '        upper_black = np.array([<span class="text-[#b5cea8]">180</span>, <span class="text-[#b5cea8]">255</span>, <span class="text-[#b5cea8]">50</span>])',
    '        mask = cv2.inRange(hsv, lower_black, upper_black)',
    '',
    '        <span class="text-[#6a9955]"># 4. Region of Interest (ROI) extraction</span>',
    '        h, w, d = cv_image.shape',
    '        search_top = <span class="text-[#c586c0]">int</span>(<span class="text-[#b5cea8]">3</span>*h/<span class="text-[#b5cea8]">4</span>)',
    '        search_bot = <span class="text-[#c586c0]">int</span>(h)',
    '        mask[<span class="text-[#b5cea8]">0</span>:search_top, <span class="text-[#b5cea8]">0</span>:w] = <span class="text-[#b5cea8]">0</span>',
    '        mask[search_bot:h, <span class="text-[#b5cea8]">0</span>:w] = <span class="text-[#b5cea8]">0</span>',
    '',
    '        <span class="text-[#6a9955]"># 5. Centroid calculation via moments</span>',
    '        M = cv2.moments(mask)',
    '        <span class="text-[#c586c0]">if</span> M[<span class="text-[#ce9178]>\'m00\'</span>] > <span class="text-[#b5cea8]">0</span>:',
    '            cx = <span class="text-[#c586c0]">int</span>(M[<span class="text-[#ce9178]>\'m10\'</span>]/M[<span class="text-[#ce9178]>\'m00\'</span>])',
    '            cy = <span class="text-[#c586c0]">int</span>(M[<span class="text-[#ce9178]>\'m01\'</span>]/M[<span class="text-[#ce9178]>\'m00\'</span>])',
    '            cv2.circle(cv_image, (cx, cy), <span class="text-[#b5cea8]">20</span>, (<span class="text-[#b5cea8]">0</span>,<span class="text-[#b5cea8]">0</span>,<span class="text-[#b5cea8]">255</span>), <span class="text-[#b5cea8]>-1</span>)',
    '            ',
    '            <span class="text-[#6a9955]"># PID Controller Execution</span>',
    '            error = cx - w/<span class="text-[#b5cea8]">2</span>',
    '            <span class="text-[#569cd6]">self</span>.integral_error += error',
    '            ',
    '            <span class="text-[#6a9955]"># Anti-windup</span>',
    '            <span class="text-[#569cd6]">self</span>.integral_error = max(min(<span class="text-[#569cd6]">self</span>.integral_error, <span class="text-[#b5cea8]">1000</span>), -<span class="text-[#b5cea8]">1000</span>)',
    '            ',
    '            angular_z = (<span class="text-[#569cd6]">self</span>.kp * error) + (<span class="text-[#569cd6]">self</span>.ki * <span class="text-[#569cd6]">self</span>.integral_error) + (<span class="text-[#569cd6]">self</span>.kd * (error - <span class="text-[#569cd6]">self</span>.last_error))',
    '            <span class="text-[#569cd6]">self</span>.last_error = error',
    '            ',
    '            <span class="text-[#6a9955]"># Clamp angular velocity</span>',
    '            angular_z = max(min(angular_z, <span class="text-[#569cd6]">self</span>.max_angular_z), -<span class="text-[#569cd6]">self</span>.max_angular_z)',
    '            ',
    '            <span class="text-[#6a9955]"># Command dispatch</span>',
    '            twist = Twist()',
    '            twist.linear.x = <span class="text-[#569cd6]">self</span>.current_linear_velocity',
    '            twist.angular.z = -<span class="text-[#c586c0]">float</span>(angular_z)',
    '            <span class="text-[#569cd6]">self</span>.cmd_pub.publish(twist)',
    '            ',
    '            <span class="text-[#569cd6]">self</span>.publish_annotated_image(cv_image, text=<span class="text-[#ce9178]>"TRACKING"</span>)',
    '        <span class="text-[#c586c0]">else</span>:',
    '            <span class="text-[#6a9955]"># Lost line logic - spin to search</span>',
    '            <span class="text-[#569cd6]">self</span>.stop_robot()',
    '            <span class="text-[#569cd6]">self</span>.publish_annotated_image(cv_image, text=<span class="text-[#ce9178]>"LOST_LINE"</span>)',
    '',
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">publish_annotated_image</span>(<span class="text-[#569cd6]">self</span>, image, text=<span class="text-[#ce9178]>""</span>):',
    '        <span class="text-[#6a9955]"># Add HUD overlays for web visualizer</span>',
    '        font = cv2.FONT_HERSHEY_SIMPLEX',
    '        cv2.putText(image, text, (<span class="text-[#b5cea8]">10</span>, <span class="text-[#b5cea8]">30</span>), font, <span class="text-[#b5cea8]">1</span>, (<span class="text-[#b5cea8]">0</span>, <span class="text-[#b5cea8]">255</span>, <span class="text-[#b5cea8]">0</span>), <span class="text-[#b5cea8]">2</span>, cv2.LINE_AA)',
    '        cv2.putText(image, <span class="text-[#ce9178]>"NanoCar Stream"</span>, (<span class="text-[#b5cea8]">10</span>, <span class="text-[#b5cea8]">60</span>), font, <span class="text-[#b5cea8]">0.6</span>, (<span class="text-[#b5cea8]">255</span>, <span class="text-[#b5cea8]">255</span>, <span class="text-[#b5cea8]">0</span>), <span class="text-[#b5cea8]">1</span>)',
    '        ',
    '        <span class="text-[#6a9955]"># Compress and publish for Web Server compatibility</span>',
    '        <span class="text-[#c586c0]">try</span>:',
    '            msg = <span class="text-[#569cd6]">self</span>.bridge.cv2_to_imgmsg(image, <span class="text-[#ce9178]>"bgr8"</span>)',
    '            <span class="text-[#569cd6]">self</span>.image_pub.publish(msg)',
    '        <span class="text-[#c586c0]">except</span> CvBridgeError <span class="text-[#c586c0]">as</span> e:',
    '            rospy.logerr(e)',
    '',
    '    <span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">stop_robot</span>(<span class="text-[#569cd6]">self</span>):',
    '        <span class="text-[#6a9955]"># Emergency halt sequence</span>',
    '        twist = Twist()',
    '        twist.linear.x = <span class="text-[#b5cea8]">0</span>',
    '        twist.linear.y = <span class="text-[#b5cea8]">0</span>',
    '        twist.linear.z = <span class="text-[#b5cea8]">0</span>',
    '        twist.angular.x = <span class="text-[#b5cea8]">0</span>',
    '        twist.angular.y = <span class="text-[#b5cea8]">0</span>',
    '        twist.angular.z = <span class="text-[#b5cea8]">0</span>',
    '        <span class="text-[#569cd6]">self</span>.cmd_pub.publish(twist)',
    '',
    '<span class="text-[#569cd6]">def</span> <span class="text-[#dcdcaa]">main</span>():',
    '    <span class="text-[#c586c0]">try</span>:',
    '        tracker = NanoCarTracker()',
    '        ',
    '        <span class="text-[#6a9955]"># Setup background thread for diagnostics</span>',
    '        rate = rospy.Rate(<span class="text-[#b5cea8]">10</span>) <span class="text-[#6a9955]"># 10 Hz</span>',
    '        ',
    '        <span class="text-[#6a9955]"># Spin architecture</span>',
    '        rospy.spin()',
    '        ',
    '    <span class="text-[#c586c0]">except</span> rospy.ROSInterruptException:',
    '        rospy.logwarn(<span class="text-[#ce9178]>"Tracker node terminated."</span>)',
    '    <span class="text-[#c586c0]">finally</span>:',
    '        <span class="text-[#c586c0]">print</span>(<span class="text-[#ce9178]>"Shutting down vision tracker system."</span>)',
    '',
    '<span class="text-[#c586c0]">if</span> __name__ == <span class="text-[#ce9178]>"__main__"</span>:',
    '    main()'
  ]
  
  for(let line of filler) code.push({ content: line })
  return code
}

// Diff Part 1: 修改话题名 (提供更明显的视觉差异块)
const getV2CodeDiff_Part1 = () => {
  const code = getV1FullCode()
  code.splice(58, 2, 
    { content: '        <span class="text-[#6a9955]"># 错误订阅点：使用了默认的 /scan</span>', diffType: 'removed' },
    { content: '        rospy.Subscriber(<span class="text-[#ce9178]>"<span class="text-[#f85149] font-bold">/scan</span>"</span>, LaserScan, <span class="text-[#569cd6]">self</span>.lidar_callback)', diffType: 'removed' },
    { content: '        <span class="text-[#6a9955]"># 修改：使用冰达 NanoCar 真实的雷达话题，并增加队列保护</span>', diffType: 'added' },
    { content: '        rospy.Subscriber(<span class="text-[#ce9178]">"/rplidar_scan"</span>, LaserScan, <span class="text-[#569cd6]">self</span>.lidar_callback, queue_size=<span class="text-[#b5cea8]">10</span>)', diffType: 'added' },
    { content: '        rospy.loginfo(<span class="text-[#ce9178]>"[Fix] Successfully mapped to /rplidar_scan"</span>)', diffType: 'added' }
  )
  return code
}

// Diff Part 2: 完整包含 Diff 1 和 Diff 2，补充更多相关代码行以方便审阅
const getV2CodeDiff_Full = () => {
  const code = getV2CodeDiff_Part1()
  const initIdx = code.findIndex(c => c.content.includes('def init_hardware(self):'))
  if (initIdx !== -1) {
    code.splice(initIdx + 1, 1, 
      { content: '        <span class="text-[#6a9955]"># 缺少权限授予代码</span>', diffType: 'removed' },
      { content: '        <span class="text-[#6a9955]"># 增加：赋予设备节点最高权限，解决 Permission Denied 异常</span>', diffType: 'added' },
      { content: '        <span class="text-[#c586c0]">try</span>:', diffType: 'added' },
      { content: '            os.system(<span class="text-[#ce9178]>"echo nanocar | sudo -S chmod 777 /dev/video0"</span>)', diffType: 'added' },
      { content: '            os.system(<span class="text-[#ce9178]>"echo nanocar | sudo -S chmod 777 /dev/rplidar"</span>)', diffType: 'added' },
      { content: '            rospy.loginfo(<span class="text-[#ce9178]>"[Hardware] Device permissions granted via udev fallback."</span>)', diffType: 'added' },
      { content: '        <span class="text-[#c586c0]">except</span> Exception <span class="text-[#c586c0]">as</span> e:', diffType: 'added' },
      { content: '            rospy.logerr(<span class="text-[#ce9178]>"[Hardware] Failed to grant permissions: %s"</span> % e)', diffType: 'added' }
    )
  }
  return code
}

// 将 Diff 样式剥离生成终版代码
const getV2FullCode = () => {
  return getV2CodeDiff_Full().filter(c => c.diffType !== 'removed').map(c => {
    return { content: c.content } 
  })
}

// ===== 终端日志 =====
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
    ]
    for(let i=1; i<=15; i++) {
        logs.push({ text: `[ ${Math.floor(i*6)}%] Built target subsystem_component_${i}`, color: 'text-[#3fb950]' })
    }
    logs.push({ text: '[ 98%] Built target nanocar_ros', color: 'text-[#3fb950]' })
    logs.push({ text: '[100%] Built target web_video_server', color: 'text-[#3fb950]' })
    logs.push({ text: '✓ 依赖树完整，预检通过。', color: 'text-[#4B8BBE] font-bold' })
    return logs
}

const getTerminalPrecheckV2 = () => {
    return [
        { text: '$ python -m py_compile src/nanocar_ros/scripts/nanocar_track.py', color: 'text-[#cccccc]' },
        { text: 'Checking syntax and imports...', color: 'text-[#858585]' },
        { text: '[OK] Syntax check passed.', color: 'text-[#3fb950]' },
        { text: 'Verifying dependency references...', color: 'text-[#858585]' },
        { text: '... /rplidar_scan topic exists in message definitions.', color: 'text-[#3fb950]' },
        { text: '... os.system import verified.', color: 'text-[#3fb950]' },
        { text: '✓ 代码逻辑二次验证通过，等待用户确认采纳。', color: 'text-[#4B8BBE] font-bold' }
    ]
}

const getV1TerminalError = () => {
    const logs = getTerminalBuildLogs()
    logs.push({ text: '$ roslaunch nanocar_track start.launch', color: 'text-white mt-4' })
    logs.push({ text: '... logging to /home/nanocar/.ros/log/...', color: 'text-[#858585]' })
    logs.push({ text: 'started roslaunch server http://nanocar:41951/', color: 'text-[#cccccc]' })
    logs.push({ text: 'SUMMARY\n========\n\nPARAMETERS\n * /rosdistro: melodic\n * /rosversion: 1.14.13', color: 'text-[#cccccc]' })
    logs.push({ text: 'NODES\n  /\n    nanocar_track_node (nanocar_ros/nanocar_track.py)', color: 'text-[#cccccc]' })
    logs.push({ text: '[ERROR] [1712481690.123456]: Cannot connect to Lidar topic /scan. Retrying...', color: 'text-[#f85149]' })
    logs.push({ text: '[ERROR] [1712481690.124888]: IOError: [Errno 13] Permission denied: \'/dev/video0\'', color: 'text-[#f85149]' })
    logs.push({ text: '[FATAL] [1712481690.125001]: Node crashed with rospy.exceptions.ROSException.', color: 'text-[#f85149] font-bold' })
    return logs
}

const getV2TerminalPrecheck = () => {
    return [
        { text: '$ rosrun rospy_tutorials precheck.py nanocar_track.py', color: 'text-[#cccccc]' },
        { text: 'Validating topic subscriptions...', color: 'text-[#858585]' },
        { text: '↳ /rplidar_scan detected. OK.', color: 'text-[#3fb950]' },
        { text: 'Validating system level bindings...', color: 'text-[#858585]' },
        { text: '↳ udev rule fallback (sudo chmod 777) found. OK.', color: 'text-[#3fb950]' },
        { text: '✓ 预检完成，代码健康状态：良好', color: 'text-[#4B8BBE] font-bold' }
    ]
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
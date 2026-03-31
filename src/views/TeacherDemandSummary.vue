<template>
  <div class="flex flex-col flex-1 overflow-hidden h-full min-h-0">
    <div class="grid grid-cols-4 gap-3 p-3 border-b border-borderColor">
        <div class="bg-panelBg border border-borderColor rounded-lg p-3 flex flex-col justify-between h-20 relative">
            <div class="text-sm text-textMuted">学生任务接收完成率</div>
            <svg class="w-4 h-4 text-accentGreen absolute top-4 right-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div class="text-3xl text-white mt-1">100%</div>
        </div>
        <div class="bg-panelBg border border-borderColor rounded-lg p-3 flex flex-col justify-between h-20 relative">
            <div class="text-sm text-textMuted">学生提交需求总条数</div>
            <svg class="w-4 h-4 text-accentGreen absolute top-4 right-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
            <div class="text-3xl text-white mt-1">28<span class="text-sm text-textMuted ml-1">条</span></div>
        </div>
        <div class="bg-panelBg border border-borderColor rounded-lg p-3 flex flex-col justify-between h-20 relative">
            <div class="text-sm text-textMuted">参与提交的小组数</div>
            <svg class="w-4 h-4 text-accentGreen absolute top-4 right-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <div class="text-3xl text-white mt-1">4<span class="text-sm text-textMuted ml-1">组</span></div>
        </div>
        <div class="bg-panelBg border border-borderColor rounded-lg p-3 flex flex-col justify-between h-20 relative">
            <div class="text-sm text-textMuted">有效需求占比</div>
            <svg class="w-4 h-4 text-accentGreen absolute top-4 right-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <div class="text-3xl text-white mt-1">92.5%</div>
        </div>
    </div>

    <div class="flex flex-1 overflow-hidden min-h-0">
        <div class="w-[45%] border-r border-borderColor flex flex-col bg-darkBg min-h-0">
            <div class="px-4 py-3 flex justify-between items-center border-b border-borderColor">
                <div class="flex items-center space-x-3 text-sm">
                    <svg class="w-4 h-4 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    <span class="font-bold text-gray-200">学生需求提交列表</span>
                    <span class="text-accentGreenDark text-xs ml-2">主线/支线任务归档</span>
                </div>
                <div class="flex space-x-1 text-xs">
                    <button class="bg-cardInnerBg text-textMuted px-2 py-1 rounded-l border border-borderColor hover:text-white">按时间</button>
                    <button class="bg-panelBg text-white px-2 py-1 rounded-r border border-borderColor border-l-0 shadow-inner">按组别</button>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto scrollbar-hide">
                <div class="flex flex-col">
                    
                    <div class="px-4 py-3 border-b border-borderColor hover:bg-panelBg transition relative group">
                        <div class="absolute top-3 right-4 text-xxs text-textMuted flex items-center space-x-2">
                            <button class="text-yellow-500 hover:text-yellow-400 opacity-80 hover:opacity-100 transition" title="标记重点">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </button>
                            <span>2分钟前</span>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img src="https://ui-avatars.com/api/?name=组1&background=3b82f6&color=fff" class="w-8 h-8 rounded-full flex-shrink-0" alt="avatar">
                            <div class="flex-col w-full pr-14">
                                <div class="text-sm text-gray-200 leading-snug">密码系统需满足机密性、完整性、可用性，结合无人机场景特性，必须将算力有限、时延敏感作为核心约束。</div>
                                <div class="flex items-center mt-1.5 space-x-2">
                                    <span class="text-xs text-textMuted">第1组 - 李论（理论型）</span>
                                    <span class="bg-blue-900/40 text-blue-400 text-[10px] px-1.5 py-0.5 rounded border border-blue-800/50">主线需求</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-4 py-3 border-b border-borderColor hover:bg-panelBg transition relative group">
                        <div class="absolute top-3 right-4 text-xxs text-textMuted flex items-center space-x-2">
                            <button class="text-gray-500 hover:text-yellow-400 opacity-30 hover:opacity-100 transition" title="标记重点">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </button>
                            <span>3分钟前</span>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img src="https://ui-avatars.com/api/?name=组1&background=10b981&color=fff" class="w-8 h-8 rounded-full flex-shrink-0" alt="avatar">
                            <div class="flex-col w-full pr-14">
                                <div class="text-sm text-gray-200 leading-snug">补充：密钥更新低功耗需求，无人机机载设备电池容量有限，加密算法执行时额外功耗需控制在最低水平。</div>
                                <div class="flex items-center mt-1.5 space-x-2">
                                    <span class="text-xs text-textMuted">第1组 - 张实（实践型）</span>
                                    <span class="bg-green-900/40 text-green-400 text-[10px] px-1.5 py-0.5 rounded border border-green-800/50">支线低功耗</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-4 py-3 border-b border-borderColor hover:bg-panelBg transition relative group">
                        <div class="absolute top-3 right-4 text-xxs text-textMuted flex items-center space-x-2">
                            <button class="text-yellow-500 hover:text-yellow-400 opacity-80 hover:opacity-100 transition" title="标记重点">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </button>
                            <span>5分钟前</span>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img src="https://ui-avatars.com/api/?name=组2&background=ef4444&color=fff" class="w-8 h-8 rounded-full flex-shrink-0" alt="avatar">
                            <div class="flex-col w-full pr-14">
                                <div class="text-sm text-gray-200 leading-snug">无人机易遭受侧信道攻击与重放攻击，通信协议设计必须包含严格的侧信道防护与抗重放机制。</div>
                                <div class="flex items-center mt-1.5 space-x-2">
                                    <span class="text-xs text-textMuted">第2组 - 王论（理论型）</span>
                                    <span class="bg-red-900/40 text-red-400 text-[10px] px-1.5 py-0.5 rounded border border-red-800/50">支线侧信道</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-4 py-3 border-b border-borderColor hover:bg-panelBg transition relative group">
                        <div class="absolute top-3 right-4 text-xxs text-textMuted flex items-center space-x-2">
                            <button class="text-gray-500 hover:text-yellow-400 opacity-30 hover:opacity-100 transition" title="标记重点">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </button>
                            <span>8分钟前</span>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img src="https://ui-avatars.com/api/?name=组3&background=f59e0b&color=fff" class="w-8 h-8 rounded-full flex-shrink-0" alt="avatar">
                            <div class="flex-col w-full pr-14">
                                <div class="text-sm text-gray-200 leading-snug">避免非法设备接入通信链路，必须实现双向身份认证，且认证握手时延需控制在毫秒级以内。</div>
                                <div class="flex items-center mt-1.5 space-x-2">
                                    <span class="text-xs text-textMuted">第3组 - 赵组（组织型）</span>
                                    <span class="bg-blue-900/40 text-blue-400 text-[10px] px-1.5 py-0.5 rounded border border-blue-800/50">主线需求</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-4 py-3 border-b border-borderColor hover:bg-panelBg transition relative group">
                        <div class="absolute top-3 right-4 text-xxs text-textMuted flex items-center space-x-2">
                            <button class="text-yellow-500 hover:text-yellow-400 opacity-80 hover:opacity-100 transition" title="标记重点">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </button>
                            <span>12分钟前</span>
                        </div>
                        <div class="flex items-start space-x-3">
                            <img src="https://ui-avatars.com/api/?name=组4&background=8b5cf6&color=fff" class="w-8 h-8 rounded-full flex-shrink-0" alt="avatar">
                            <div class="flex-col w-full pr-14">
                                <div class="text-sm text-gray-200 leading-snug">后量子算法适配需求：除基础安全性外，需重点评估算法复杂度对现有嵌入式芯片算力的兼容性要求。</div>
                                <div class="flex items-center mt-1.5 space-x-2">
                                    <span class="text-xs text-textMuted">第4组 - 陈论（理论型）</span>
                                    <span class="bg-purple-900/40 text-purple-400 text-[10px] px-1.5 py-0.5 rounded border border-purple-800/50">支线后量子</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="px-4 py-2.5 flex justify-center border-t border-borderColor text-xs space-x-3 bg-darkBg text-textMuted min-h-[36px]">
                <span class="text-accentGreen font-bold">1</span>
                <span class="hover:text-white cursor-pointer">2</span>
                <span class="hover:text-white cursor-pointer">3</span>
            </div>
        </div>

        <div class="flex-1 flex flex-col bg-darkBg min-h-0">
            
            <div class="p-4 flex-1 flex flex-col border-b border-borderColor min-h-0">
                <div class="text-sm font-bold text-accentGreen mb-2">
                    # 需求词云分析 <span class="text-textMuted font-normal">（当前任务：无人机通信加密设计）</span>
                </div>
                
                <div class="bg-panelBg flex-1 rounded-lg border border-borderColor p-4 relative word-cloud-container min-h-0">
                    <div class="wc-item text-[#20c997] text-4xl" style="top: 50%; left: 50%;">通信加密</div>
                    <div class="wc-item text-[#3b82f6] text-3xl" style="top: 25%; left: 30%;">低功耗优化</div>
                    <div class="wc-item text-[#ef4444] text-2xl" style="top: 75%; left: 70%;">侧信道防护</div>
                    <div class="wc-item text-[#8b5cf6] text-xl" style="top: 30%; left: 75%;">抗重放攻击</div>
                    <div class="wc-item text-[#f59e0b] text-xl" style="top: 70%; left: 25%;">后量子算法</div>
                    <div class="wc-item text-[#10b981] text-lg" style="top: 50%; left: 20%;">机密性</div>
                    <div class="wc-item text-[#ec4899] text-lg" style="top: 50%; left: 80%;">完整性</div>
                    <div class="wc-item text-[#06b6d4] text-base" style="top: 15%; left: 50%;">可用性</div>
                    <div class="wc-item text-[#d97706] text-base" style="top: 85%; left: 50%;">时延敏感</div>
                    <div class="wc-item text-[#10b981] text-sm" style="top: 20%; left: 15%;">算力有限</div>
                    <div class="wc-item text-[#ef4444] text-sm" style="top: 80%; left: 85%;">身份认证</div>
                    <div class="wc-item text-[#3b82f6] text-sm" style="top: 80%; left: 15%;">密钥更新</div>
                    <div class="wc-item text-[#8b5cf6] text-sm" style="top: 20%; left: 85%;">兼容性</div>
                    <div class="wc-item text-[#f59e0b] text-sm" style="top: 10%; left: 70%;">低时延</div>
                    <div class="wc-item text-[#ec4899] text-sm" style="top: 90%; left: 30%;">低功耗</div>
                </div>
            </div>

            <div class="p-4 flex-1 flex flex-col min-h-0">
                <div class="text-sm font-bold text-accentGreen mb-2 flex items-center">
                    <span class="mr-1 text-base">?</span> 需求汇总梳理
                </div>
                
                <div class="grid grid-cols-2 gap-3 flex-1 min-h-0">
                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-accentGreenDark transition overflow-y-auto scrollbar-hide">
                        <div class="flex items-start space-x-2">
                            <div class="bg-accentGreen/20 text-accentGreen p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <div class="text-accentGreen font-bold text-sm mb-1">【需求点一】</div>
                                <p class="text-sm text-gray-200 leading-snug">高保密性要求。无人机飞控指令与传输数据需具备极强的抗窃听能力，加密机制需杜绝非法第三方破解与信息窃取。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-accentGreen">安全加密</span>
                            <span class="text-textMuted">优先级：高</span>
                        </div>
                    </div>

                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-accentGreenDark transition overflow-y-auto scrollbar-hide">
                        <div class="flex items-start space-x-2">
                            <div class="bg-blue-500/20 text-blue-400 p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <div class="text-blue-400 font-bold text-sm mb-1">【需求点二】</div>
                                <p class="text-sm text-gray-200 leading-snug">高完整性要求。需建立数据校验机制，防止飞行坐标、控制指令在传输过程中被恶意篡改，保障无人机飞行安全。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-blue-400">数据校验</span>
                            <span class="text-textMuted">优先级：高</span>
                        </div>
                    </div>

                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-accentGreenDark transition overflow-y-auto scrollbar-hide">
                        <div class="flex items-start space-x-2">
                            <div class="bg-red-500/20 text-red-400 p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <div>
                                <div class="text-red-400 font-bold text-sm mb-1">【需求点三】</div>
                                <p class="text-sm text-gray-200 leading-snug">低时延高可用要求。无人机高速移动场景下，加密握手与加解密处理时延需控制在毫秒级，保障指令实时响应。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-red-400">实时响应</span>
                            <span class="text-textMuted">优先级：中</span>
                        </div>
                    </div>

                    <div class="bg-cardInnerBg rounded-lg p-3 border border-borderColor flex flex-col justify-between hover:border-accentGreenDark transition overflow-y-auto scrollbar-hide">
                        <div class="flex items-start space-x-2">
                            <div class="bg-purple-500/20 text-purple-400 p-1 rounded mt-0.5 shrink-0">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            </div>
                            <div>
                                <div class="text-purple-400 font-bold text-sm mb-1">【需求点四】</div>
                                <p class="text-sm text-gray-200 leading-snug">低功耗适配要求。受限于无人机机载电池容量，加密算法与安全机制需严格控制额外功耗，适配嵌入式设备算力约束。</p>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center space-x-3 text-xs">
                            <span class="text-purple-400">低耗适配</span>
                            <span class="text-textMuted">优先级：中</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>
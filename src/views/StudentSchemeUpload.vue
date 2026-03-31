<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
    <transition name="toast">
      <div v-if="uiState.showToast" class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-accentGreen text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2 pointer-events-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-bold">方案提交成功！已同步至教师端。</span>
      </div>
    </transition>

    <header class="shrink-0 flex flex-col z-10">
      <div class="h-16 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-1 h-6 bg-group1 rounded-full"></div>
          <h1 class="text-xl font-bold text-white tracking-wide">学习工作台 - 方案设计与验证</h1>
        </div>
        <div class="flex items-center gap-2 bg-group1/10 border border-group1/30 px-4 py-1.5 rounded-full">
          <svg class="w-4 h-4 text-group1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="text-group1 font-bold text-sm">第一组 (操作终端)</span>
        </div>
      </div>
      <div class="bg-cardInnerBg border-b border-borderColor px-6 py-3 flex items-center gap-6">
        <div class="flex items-center gap-2">
          <span class="bg-gray-700 text-white text-xs px-2 py-0.5 rounded">当前任务</span>
          <span class="font-bold text-sm text-textMain">无人机集群通信加密架构设计</span>
        </div>
        <div class="h-4 w-px bg-borderColor"></div>
        <div class="flex gap-4 text-xs text-textMuted">
          <span v-for="tag in taskTags" :key="tag" class="flex items-center gap-1">
            <svg class="w-3 h-3 text-accentGreen" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            {{ tag }}
          </span>
        </div>
      </div>
    </header>

    <main class="flex-1 p-6 grid grid-cols-2 gap-6 bg-darkBg h-full overflow-hidden">
      <div class="bg-panelBg border border-borderColor rounded-lg flex flex-col shadow-lg overflow-hidden relative">
        <div class="px-5 py-4 border-b border-borderColor bg-cardInnerBg flex justify-between items-center">
          <h2 class="font-bold text-white text-lg flex items-center gap-2">
            <svg class="w-5 h-5 text-group1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            本组方案提报
          </h2>
          <span :class="['text-xs px-2 py-1 rounded border font-bold transition-all', submitStatusClass]">
            {{ uiState.submitLabel }}
          </span>
        </div>
        
        <div class="flex-1 p-6 flex flex-col justify-center gap-6">
          <div class="upload-box flex-1 border-2 border-dashed border-borderColor rounded-xl flex flex-col items-center justify-center cursor-pointer bg-darkBg/50 relative overflow-hidden group">
            <div class="flex flex-col items-center z-10">
              <svg class="w-16 h-16 text-group1 mb-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
              <span class="text-white font-medium text-lg">第一组_国密架构设计草案.pdf</span>
              <span class="text-textMuted text-sm mt-1">大小: 2.4 MB · 格式: PDF</span>
            </div>
            <div class="absolute bottom-4 text-xs text-group1/70 bg-group1/10 px-3 py-1 rounded-full">
              点击更换文件 (演示禁用)
            </div>
          </div>

          <button 
            @click="handleUpload" 
            :disabled="uiState.isUploading || uiState.isSubmitted"
            :class="['w-full font-bold text-lg py-4 rounded-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2', 
                    uiState.isSubmitted ? 'bg-accentGreen cursor-default' : 'bg-group1 hover:bg-blue-600']"
          >
            <template v-if="uiState.isUploading">
              <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              提交中...
            </template>
            <template v-else>
              {{ uiState.isSubmitted ? '方案已提交' : '确认提交方案' }}
            </template>
          </button>
        </div>
      </div>

      <div class="bg-panelBg border border-borderColor rounded-lg flex flex-col shadow-lg overflow-hidden relative">
        <div class="px-5 py-4 border-b border-borderColor bg-cardInnerBg flex justify-between items-center z-10">
          <h2 class="font-bold text-white text-lg flex items-center gap-2">
            <svg class="w-5 h-5 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            AI 架构评审反馈
          </h2>
          <button @click="startEvaluation" class="text-xs bg-gray-800 hover:bg-group1 text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-700 transition-colors">
            模拟接收评估 (录课用)
          </button>
        </div>

        <div v-if="evalState.status === 'waiting'" class="absolute inset-0 top-[61px] bg-darkBg z-20 flex flex-col items-center justify-center">
          <svg class="w-16 h-16 text-gray-600 mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <div class="text-textMuted text-lg tracking-wider">暂无反馈数据</div>
          <div class="text-gray-600 text-sm mt-2">请先在左侧提交方案，并等待教师端下发评审指令...</div>
        </div>

        <div v-if="evalState.status === 'loading'" class="absolute inset-0 top-[61px] bg-panelBg z-30 flex flex-col items-center justify-center">
          <div class="scan-line"></div>
          <div class="text-group1 mb-4 text-lg font-bold tracking-widest animate-pulse">接收教师端指令... AI 推演中...</div>
          <div class="w-2/3 h-2 bg-darkBg rounded-full overflow-hidden border border-borderColor">
            <div class="h-full bg-group1 shadow-[0_0_10px_#3b82f6] transition-all duration-[2000ms] ease-linear" :style="{ width: evalState.progress + '%' }"></div>
          </div>
        </div>

        <transition name="fade">
          <div v-if="evalState.status === 'finished'" class="flex-1 flex flex-col p-6 overflow-hidden">
            <div class="flex-1 flex items-center justify-center min-h-0">
              <div id="radar-chart" class="w-2/3 h-full min-h-[250px]"></div>
              <div class="w-1/3 flex flex-col items-center justify-center border-l border-borderColor pl-6 shrink-0">
                <div class="text-textMuted text-sm mb-2">综合安全评分</div>
                <div class="text-7xl font-black text-group1" style="text-shadow: 0 0 20px rgba(59,130,246,0.5);">92</div>
                <div class="mt-4 bg-group1/10 border border-group1/30 text-group1 px-3 py-1 rounded text-sm font-bold">
                  评级：优秀 (A+)
                </div>
              </div>
            </div>
            <div class="mt-4 p-4 bg-darkBg border border-borderColor rounded-lg text-base text-textMain leading-relaxed shadow-inner shrink-0">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="text-accentGreen font-bold">AI 详细评估结论</span>
              </div>
              本组采用 <span class="text-group1 font-bold">国密 SM4+SM3 组合加密方案</span>，保密性与完整性表现极佳，成本控制在合理范围内，整体架构十分成熟稳健。
              <div class="text-textMuted text-sm mt-2 pt-2 border-t border-borderColor/50">
                <span class="text-yellow-500">优化建议：</span>加密过程略微影响系统可用性能，可考虑引入硬件加速模块。
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import * as echarts from 'echarts';

// 任务标签
const taskTags = ['防窃听(高保密)', '防篡改(高完整)', '轻量化低功耗'];

// UI 状态
const uiState = reactive({
  isUploading: false,
  isSubmitted: false,
  showToast: false,
  submitLabel: '未提交'
});

// 评审状态
const evalState = reactive({
  status: 'waiting', // waiting | loading | finished
  progress: 0
});

// 提交按钮样式计算
const submitStatusClass = computed(() => {
  if (uiState.isSubmitted) return 'bg-accentGreen/20 text-accentGreen border-accentGreen/50';
  return 'bg-gray-800 text-gray-400 border-gray-700';
});

// 处理方案上传
const handleUpload = () => {
  uiState.isUploading = true;
  setTimeout(() => {
    uiState.isUploading = false;
    uiState.isSubmitted = true;
    uiState.submitLabel = '已提交，待评审';
    
    // 显示 Toast
    uiState.showToast = true;
    setTimeout(() => { uiState.showToast = false; }, 3000);
  }, 800);
};

// 模拟 AI 评估逻辑
let chartInstance = null;
const startEvaluation = () => {
  evalState.status = 'loading';
  
  // 触发进度条
  nextTick(() => {
    setTimeout(() => { evalState.progress = 100; }, 50);
  });

  // 2秒推演后展示结果
  setTimeout(() => {
    evalState.status = 'finished';
    nextTick(() => {
      initRadarChart();
    });
  }, 2050);
};

// 初始化雷达图
const initRadarChart = () => {
  const chartDom = document.getElementById('radar-chart');
  if (!chartDom) return;
  
  chartInstance = echarts.init(chartDom);
  const option = {
    radar: {
      indicator: [
        { name: '保密性', max: 100 },
        { name: '完整性', max: 100 },
        { name: '可用性', max: 100 },
        { name: '成本控制', max: 100 },
        { name: '创新性', max: 100 }
      ],
      radius: '70%',
      splitNumber: 4,
      axisName: { color: '#d1d5db', fontSize: 13, fontWeight: 'bold' },
      splitLine: { lineStyle: { color: ['#2d353e'] } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#2d353e' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: [95, 90, 85, 80, 90],
        name: '第一组方案',
        itemStyle: { color: '#3b82f6' },
        areaStyle: { 
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { color: '#3b82f6', offset: 0, opacity: 0.2 },
            { color: '#3b82f6', offset: 1, opacity: 0.5 }
          ])
        },
        lineStyle: { width: 3, color: '#3b82f6' },
        symbolSize: 6
      }]
    }]
  };
  chartInstance.setOption(option);
};

// 监听窗口缩放
const handleResize = () => {
  if (chartInstance) chartInstance.resize();
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance) chartInstance.dispose();
});
</script>

<style scoped>
/* 扫描线动画 */
.scan-line {
  width: 100%; height: 2px;
  background: linear-gradient(to right, transparent, #3b82f6, transparent);
  position: absolute; animation: scan 1.5s linear infinite; opacity: 0.6;
}
@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

/* 上传框悬浮 */
.upload-box { transition: all 0.3s ease; }
.upload-box:hover { border-color: #3b82f6; background-color: rgba(59, 130, 246, 0.05); }

/* Toast 动画 */
.toast-enter-active { transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-enter-from { transform: translate(-50%, -20px); opacity: 0; }
.toast-leave-to { transform: translate(-50%, -20px); opacity: 0; }

/* 内容淡入 */
.fade-enter-active { transition: opacity 0.5s ease-out; }
.fade-enter-from { opacity: 0; }
</style>
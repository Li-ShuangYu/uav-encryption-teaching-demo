<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden" @click="showDropdown = false">
    <transition name="toast">
      <div v-if="uiState.showToast" class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-accentGreen text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2 pointer-events-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-bold">{{ currentGroup.name }} 方案提交成功！已同步至教师端。</span>
      </div>
    </transition>

    <header class="shrink-0 flex flex-col z-20 relative">
      <div class="h-16 border-b border-borderColor bg-panelBg flex items-center justify-between px-6 shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-1 h-6 rounded-full" :style="{ backgroundColor: currentGroup.themeColor }"></div>
          <h1 class="text-xl font-bold text-white tracking-wide">方案设计-验证评估</h1>
        </div>
        
        <div class="relative">
          <div 
            @click.stop="showDropdown = !showDropdown"
            class="flex items-center gap-2 px-4 py-1.5 rounded-full border cursor-pointer hover:opacity-80 transition-opacity"
            :style="{ 
              backgroundColor: currentGroup.themeColor + '1A', 
              borderColor: currentGroup.themeColor + '4D', 
              color: currentGroup.themeColor 
            }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="font-bold text-sm">{{ currentGroup.name }} (操作终端)</span>
            <!-- ✅ 修改2：隐藏下拉箭头（直接删除这段svg） -->
          </div>
          
          <transition name="fade">
            <div v-if="showDropdown" class="absolute right-0 top-full mt-2 w-48 bg-panelBg border border-borderColor rounded-lg shadow-xl overflow-hidden">
              <div 
                v-for="g in groups" 
                :key="g.id" 
                @click.stop="switchGroup(g.id)"
                class="px-4 py-3 hover:bg-cardInnerBg cursor-pointer border-b border-borderColor/50 last:border-0 flex items-center gap-2 transition-colors"
                :class="currentGroupId === g.id ? 'bg-cardInnerBg' : ''"
              >
                <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: g.themeColor }"></div>
                <span class="text-sm font-medium" :style="{ color: currentGroupId === g.id ? g.themeColor : '#d1d5db' }">{{ g.name }}</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
      
      <div class="bg-cardInnerBg border-b border-borderColor px-6 py-3 flex items-center gap-6 transition-all">
        <div class="flex items-center gap-2">
          <span class="bg-gray-700 text-white text-xs px-2 py-0.5 rounded">主线任务</span>
          <span class="font-bold text-sm text-textMain">无人机集群通信加密架构设计</span>
        </div>
        <div class="h-4 w-px bg-borderColor"></div>
        <div class="flex gap-4 text-xs text-textMuted">
          <span v-for="tag in currentGroup.tags" :key="tag" class="flex items-center gap-1">
            <svg class="w-3 h-3 text-accentGreen" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            {{ tag }}
          </span>
        </div>
      </div>
    </header>

    <main class="flex-1 p-6 grid grid-cols-2 gap-6 bg-darkBg h-full overflow-hidden z-10">
      
      <div class="bg-panelBg border border-borderColor rounded-lg flex flex-col shadow-lg overflow-hidden relative transition-colors" :style="{ borderTopWidth: '4px', borderTopColor: currentGroup.themeColor }">
        <div class="px-5 py-4 border-b border-borderColor bg-cardInnerBg flex justify-between items-center">
          <h2 class="font-bold text-white text-lg flex items-center gap-2">
            <svg class="w-5 h-5" :style="{ color: currentGroup.themeColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            本组方案提报
          </h2>
          <span :class="['text-xs px-2 py-1 rounded border font-bold transition-all', currentGroup.state.isSubmitted ? 'bg-accentGreen/20 text-accentGreen border-accentGreen/50' : 'bg-gray-800 text-gray-400 border-gray-700']">
            {{ currentGroup.state.isSubmitted ? '已提交，待评审' : '未提交' }}
          </span>
        </div>
        
        <div class="flex-1 p-6 flex flex-col justify-center gap-6">
          <!-- ✅ 修改1：文件上传框 + 隐藏的文件选择input -->
          <input 
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".doc,.docx"
            @change="handleFileSelect"
          >
          <div 
            class="upload-box flex-1 border-2 border-dashed border-borderColor rounded-xl flex flex-col items-center justify-center cursor-pointer bg-darkBg/50 relative overflow-hidden group"
            @click="triggerFileUpload"
          >
            <!-- 未上传：显示上传提示 -->
            <div v-if="!currentGroup.state.hasFile" class="flex flex-col items-center z-10">
              <svg class="w-16 h-16 mb-3 group-hover:scale-110 transition-transform" :style="{ color: currentGroup.themeColor }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-white font-medium text-lg">点击上传方案文件</span>
              <span class="text-textMuted text-sm mt-1">支持 Word 格式 (.doc/.docx)</span>
            </div>

            <!-- 已上传：显示Word文件信息 -->
            <div v-else class="flex flex-col items-center z-10">
              <svg class="w-16 h-16 mb-3 group-hover:scale-110 transition-transform" :style="{ color: currentGroup.themeColor }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-white font-medium text-lg">{{ currentGroup.fileName }}</span>
              <span class="text-textMuted text-sm mt-1">大小: {{ currentGroup.fileSize }} · 格式: Word</span>
            </div>

            <div class="absolute bottom-4 text-xs px-3 py-1 rounded-full" :style="{ backgroundColor: currentGroup.themeColor + '1A', color: currentGroup.themeColor }">
              {{ currentGroup.state.hasFile ? '点击更换文件' : '点击选择文件' }}
            </div>
          </div>

          <button 
            @click="handleUpload" 
            :disabled="currentGroup.state.isUploading || currentGroup.state.isSubmitted || !currentGroup.state.hasFile"
            class="w-full text-white font-bold text-lg py-4 rounded-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            :style="{ 
              backgroundColor: currentGroup.state.isSubmitted ? '#23b586' : currentGroup.themeColor,
              opacity: currentGroup.state.isUploading ? 0.8 : 1,
              cursor: currentGroup.state.isSubmitted || !currentGroup.state.hasFile ? 'default' : 'pointer'
            }"
          >
            <template v-if="currentGroup.state.isUploading">
              <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              方案加密传输中...
            </template>
            <template v-else>
              {{ currentGroup.state.isSubmitted ? '方案已送达教师控制台' : '确认提交方案' }}
            </template>
          </button>
        </div>
      </div>

      <div class="bg-panelBg border border-borderColor rounded-lg flex flex-col shadow-lg overflow-hidden relative transition-colors" :style="{ borderTopWidth: '4px', borderTopColor: '#23b586' }">
        <div class="px-5 py-4 border-b border-borderColor bg-cardInnerBg flex justify-between items-center z-10">
          <h2 class="font-bold text-white text-lg flex items-center gap-2">
            <svg class="w-5 h-5 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            AI 架构评审反馈
          </h2>
          <button 
            @click="startEvaluation" 
            class="text-xs px-3 py-1.5 rounded border transition-colors font-medium"
            :class="currentGroup.state.isSubmitted ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-darkBg text-gray-600 border-gray-800 cursor-not-allowed'"
            :disabled="!currentGroup.state.isSubmitted"
          >
            接收评估
          </button>
        </div>

        <div v-if="currentGroup.state.evalStatus === 'waiting'" class="absolute inset-0 top-[61px] bg-darkBg z-20 flex flex-col items-center justify-center">
          <svg class="w-16 h-16 text-gray-700 mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <div class="text-textMuted text-lg tracking-wider">暂无反馈数据</div>
          <div class="text-gray-600 text-sm mt-2">
            {{ currentGroup.state.isSubmitted ? '等待教师端下发 AI 评审指令...' : '请先在左侧提交方案' }}
          </div>
        </div>

        <div v-if="currentGroup.state.evalStatus === 'loading'" class="absolute inset-0 top-[61px] bg-panelBg z-30 flex flex-col items-center justify-center">
          <div class="scan-line" :style="{ background: `linear-gradient(to right, transparent, ${currentGroup.themeColor}, transparent)` }"></div>
          <div class="mb-4 text-lg font-bold tracking-widest animate-pulse" :style="{ color: currentGroup.themeColor }">接收指令... AI 深度推演中...</div>
          <div class="w-2/3 h-2 bg-darkBg rounded-full overflow-hidden border border-borderColor">
            <div class="h-full transition-all duration-[2000ms] ease-linear" :style="{ width: currentGroup.state.evalProgress + '%', backgroundColor: currentGroup.themeColor, boxShadow: `0 0 10px ${currentGroup.themeColor}` }"></div>
          </div>
        </div>

        <transition name="fade">
          <div v-if="currentGroup.state.evalStatus === 'finished'" class="flex-1 flex flex-col p-6 overflow-hidden">
            <div class="flex-1 flex items-center justify-center min-h-0 relative">
              <div :id="`radar-chart-${currentGroupId}`" class="w-2/3 h-full min-h-[250px]"></div>
              <div class="w-1/3 flex flex-col items-center justify-center border-l border-borderColor pl-6 shrink-0">
                <div class="text-textMuted text-sm mb-2">综合安全评分</div>
                <div class="text-7xl font-black" :style="{ color: currentGroup.themeColor, textShadow: `0 0 20px ${currentGroup.themeColor}80` }">
                  {{ currentGroup.aiScore }}
                </div>
                <div class="mt-4 px-3 py-1 rounded text-sm font-bold border" :style="{ color: currentGroup.themeColor, backgroundColor: currentGroup.themeColor + '1A', borderColor: currentGroup.themeColor + '4D' }">
                  评级：{{ currentGroup.aiLevel }}
                </div>
              </div>
            </div>
            
            <div class="mt-4 p-4 bg-darkBg border border-borderColor rounded-lg text-base text-textMain leading-relaxed shadow-inner shrink-0 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-full" :style="{ backgroundColor: currentGroup.themeColor }"></div>
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="text-accentGreen font-bold">AI 详细评估结论</span>
              </div>
              <p v-html="currentGroup.aiConclusion"></p>
              <div class="text-textMuted text-sm mt-3 pt-3 border-t border-borderColor/50">
                <span class="text-warningYellow font-bold">优化建议：</span>{{ currentGroup.aiSuggestion }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

// ==== 状态管理与数据源 ====
const showDropdown = ref(false);
const currentGroupId = ref('g1');
const fileInput = ref(null); // 文件选择框引用
let chartInstance = null; // 图表实例

const uiState = reactive({
  showToast: false
});

// 严格按照脚本还原四个小组的核心数据配置
const groups = reactive([
  {
    id: 'g1',
    name: '第一组',
    themeColor: '#3b82f6', // 蓝
    tags: ['防窃听(高保密)', '防篡改(高完整)', '国密标准'],
    fileName: '第一组_SM4+SM3国密组合方案.docx',
    fileSize: '2.4 MB',
    aiScore: 86,
    aiLevel: '良好 (B+)',
    radarData: [85, 80, 95, 95, 80], // 保密、完整、可用、成本、创新
    aiConclusion: "本组采用 <span style='color:#3b82f6;font-weight:bold;'>SM4+SM3 国密组合方案</span>，符合国家密码标准，安全性高，性能稳定。重点解决了国密算法在无人机环境中的应用问题。",
    aiSuggestion: "建议进一步优化密钥管理流程，可在不增加系统复杂度的前提下提升动态安全性。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  },
  {
    id: 'g2',
    name: '第二组',
    themeColor: '#ef4444', // 红
    tags: ['防窃听(高保密)', '防篡改(高完整)', '非对称加密'],
    fileName: '第二组_纯RSA非对称加密方案.docx',
    fileSize: '3.1 MB',
    aiScore: 90,
    aiLevel: '优秀 (A)',
    radarData: [95, 90, 80, 80, 90],
    aiConclusion: "本组采用 <span style='color:#ef4444;font-weight:bold;'>纯 RSA 非对称加密方案</span>，在保障基础通信安全的同时，提供了更高的密钥安全性，工程可行性与安全性均表现优异。",
    aiSuggestion: "RSA 算法计算开销较大，建议在代码实现层进行优化以降低计算时延。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  },
  {
    id: 'g3',
    name: '第三组',
    themeColor: '#f59e0b', // 黄
    tags: ['防窃听(高保密)', '防篡改(高完整)', '低功耗'],
    fileName: '第三组_轻量级流密码方案.docx',
    fileSize: '2.8 MB',
    aiScore: 88,
    aiLevel: '良好 (A-)',
    radarData: [90, 95, 85, 85, 85],
    aiConclusion: "本组采用 <span style='color:#f59e0b;font-weight:bold;'>轻量级流密码方案</span>，有效降低了系统功耗，同时保证了加密性能。身份认证逻辑严密，完整性校验机制十分完善。",
    aiSuggestion: "流密码的密钥管理是关键，建议在仿真验证时引入更安全的密钥更新机制。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  },
  {
    id: 'g4',
    name: '第四组',
    themeColor: '#8b5cf6', // 紫
    tags: ['防窃听(高保密)', '防篡改(高完整)', '分布式防护'],
    fileName: '第四组_区块链分布式防护方案.docx',
    fileSize: '4.2 MB',
    aiScore: 93,
    aiLevel: '极优 (A+)',
    radarData: [95, 95, 75, 70, 98],
    aiConclusion: "本组突破性采用 <span style='color:#8b5cf6;font-weight:bold;'>区块链分布式防护方案</span>，利用区块链技术实现分布式防护，提高系统的安全性和可靠性。创新性尤为突出，方案体系十分完整。",
    aiSuggestion: "区块链技术带来了一定的系统复杂度，建议探索在关键节点中应用，以平衡安全性和性能。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  }
]);

const currentGroup = computed(() => groups.find(g => g.id === currentGroupId.value));


// ==== 核心交互逻辑 ====

// 切换小组
const switchGroup = (id) => {
  showDropdown.value = false;
  if (currentGroupId.value === id) return;
  
  currentGroupId.value = id;
  
  // 切换后，如果该组已经是完成评价状态，需要重新渲染 ECharts
  nextTick(() => {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
    if (currentGroup.value.state.evalStatus === 'finished') {
      initRadarChart();
    }
  });
};

// ✅ 修改1：触发文件上传弹窗
const triggerFileUpload = () => {
  if (currentGroup.value.state.isSubmitted) return;
  fileInput.value.click();
};

// ✅ 修改1：文件选择后处理（无论选什么，都显示预设Word内容）
const handleFileSelect = () => {
  currentGroup.value.state.hasFile = true;
};

// 上传方案文件
const handleUpload = () => {
  const group = currentGroup.value;
  group.state.isUploading = true;
  
  setTimeout(() => {
    group.state.isUploading = false;
    group.state.isSubmitted = true;
    
    // 显示全局 Toast
    uiState.showToast = true;
    setTimeout(() => { uiState.showToast = false; }, 3000);
  }, 800);
};

// 触发 AI 评估
const startEvaluation = () => {
  const group = currentGroup.value;
  if (!group.state.isSubmitted || group.state.evalStatus !== 'waiting') return;
  
  group.state.evalStatus = 'loading';
  
  // 触发进度条动画
  nextTick(() => {
    setTimeout(() => { group.state.evalProgress = 100; }, 50);
  });

  // 2秒后推演结束，展示雷达图
  setTimeout(() => {
    group.state.evalStatus = 'finished';
    nextTick(() => {
      initRadarChart();
    });
  }, 2050);
};

// ==== ECharts 图表渲染 ====
const initRadarChart = () => {
  const domId = `radar-chart-${currentGroupId.value}`;
  const chartDom = document.getElementById(domId);
  if (!chartDom) return;
  
  chartInstance = echarts.init(chartDom);
  const group = currentGroup.value;
  
  const option = {
    radar: {
      indicator: [
        { name: '保密性', max: 100 },
        { name: '完整性', max: 100 },
        { name: '可用性', max: 100 },
        { name: '成本控制', max: 100 },
        { name: '创新性', max: 100 }
      ],
      radius: '65%',
      splitNumber: 4,
      axisName: { color: '#d1d5db', fontSize: 12 },
      splitLine: { lineStyle: { color: ['#2d353e'] } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#2d353e' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: group.radarData,
        name: group.name,
        itemStyle: { color: group.themeColor },
        areaStyle: { 
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { color: group.themeColor, offset: 0, opacity: 0.1 },
            { color: group.themeColor, offset: 1, opacity: 0.4 }
          ])
        },
        lineStyle: { width: 3, color: group.themeColor },
        symbolSize: 6
      }]
    }]
  };
  chartInstance.setOption(option);
};

// 处理窗口缩放
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
/* 继承并微调颜色 */
.bg-darkBg { background-color: #121417; }
.bg-panelBg { background-color: #1c2126; }
.bg-cardInnerBg { background-color: #232930; }
.border-borderColor { border-color: #2d353e; }
.bg-accentGreen { background-color: #23b586; }
.text-accentGreen { color: #23b586; }
.text-warningYellow { color: #f59e0b; }
.text-textMain { color: #d1d5db; }
.text-textMuted { color: #6b7280; }

/* 扫描线动画 */
.scan-line {
  width: 100%; height: 2px;
  position: absolute; animation: scan 1.5s linear infinite; opacity: 0.6;
}
@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

/* 上传框悬浮 */
.upload-box { transition: all 0.3s ease; }
.upload-box:hover { border-color: #4b5563; background-color: rgba(255, 255, 255, 0.02); }

/* 下拉菜单淡入淡出 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* Toast 动画 */
.toast-enter-active { transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-enter-from { transform: translate(-50%, -20px); opacity: 0; }
.toast-leave-to { transform: translate(-50%, -20px); opacity: 0; }
</style>
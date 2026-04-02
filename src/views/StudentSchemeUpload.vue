<template>
  <div class="h-screen flex flex-col bg-darkBg text-textMain font-sans overflow-hidden">
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
        
        <div class="flex items-center gap-3">
          <div 
            class="flex items-center gap-2 px-4 py-1.5 rounded-full border"
            :style="{ 
              backgroundColor: currentGroup.themeColor + '1A', 
              borderColor: currentGroup.themeColor + '4D', 
              color: currentGroup.themeColor 
            }"
          >
            <span class="font-bold text-sm">{{ currentGroup.name }} - {{ currentGroupTitle }}</span>
          </div>
          <button 
            @click="goToTaskSplit"
            class="bg-cardInnerBg border border-borderColor hover:bg-borderColor text-white font-bold px-3 py-1.5 rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            返回任务详情
          </button>
          <button 
            @click="goToSchemeDetail"
            :disabled="!currentGroup.state.isSubmitted || currentGroup.state.evalStatus !== 'finished'"
            class="font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-2 text-sm transition-all"
            :class="{
              'bg-accentGreen border border-accentGreen hover:bg-accentGreen/80 text-white': currentGroup.state.isSubmitted && currentGroup.state.evalStatus === 'finished',
              'bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed': !currentGroup.state.isSubmitted || currentGroup.state.evalStatus !== 'finished'
            }"
          >
            进入评分环节
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
      
      <transition name="fade-in-up">
        <div v-if="showContent" class="bg-panelBg border border-borderColor rounded-lg flex flex-col shadow-lg overflow-hidden relative transition-colors" :style="{ borderTopWidth: '4px', borderTopColor: currentGroup.themeColor }">
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
            <div v-if="!currentGroup.state.hasFile" class="flex flex-col items-center z-10">
              <svg class="w-16 h-16 mb-3 group-hover:scale-110 transition-transform" :style="{ color: currentGroup.themeColor }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-white font-medium text-lg">点击上传方案文件</span>
              <span class="text-textMuted text-sm mt-1">支持 Word 格式 (.doc/.docx)</span>
            </div>

            <div v-else class="flex flex-col items-center z-10">
              <svg class="w-16 h-16 mb-3 group-hover:scale-110 transition-transform" :style="{ color: currentGroup.themeColor }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-white font-medium text-lg">{{ currentGroup.fileName || '已选择文件' }}</span>
              <span class="text-textMuted text-sm mt-1">大小: {{ currentGroup.fileSize || '未知' }} · 格式: Word</span>
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
      </transition>

      <transition name="fade-in-up">
        <div v-if="showContent" class="bg-panelBg border border-borderColor rounded-lg flex flex-col shadow-lg overflow-hidden relative transition-colors" style="animation-delay: 0.2s;" :style="{ borderTopWidth: '4px', borderTopColor: '#23b586' }">
        <div class="px-5 py-4 border-b border-borderColor bg-cardInnerBg flex justify-between items-center z-10">
          <h2 class="font-bold text-white text-lg flex items-center gap-2">
            <svg class="w-5 h-5 text-accentGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            AI 架构评审反馈
          </h2>
          <button 
            v-if="currentGroup.state.evalStatus === 'waiting'"
            @click="startEvaluation" 
            class="text-xs px-3 py-1.5 rounded border transition-colors font-medium"
            :class="currentGroup.state.isSubmitted ? 'bg-accentGreen border-accentGreen text-white hover:bg-accentGreen/80' : 'bg-darkBg text-gray-600 border-gray-800 cursor-not-allowed'"
            :disabled="!currentGroup.state.isSubmitted"
          >
            接收评估
          </button>
          <button 
            v-else-if="currentGroup.state.evalStatus === 'loading'"
            disabled
            class="text-xs px-3 py-1.5 rounded border transition-colors font-medium bg-darkBg text-gray-500 border-gray-700 cursor-not-allowed"
          >
            推演中...
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
      </transition>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();

const showContent = ref(false); 
const currentGroupId = ref('g1');
const fileInput = ref(null); 
let chartInstance = null; 

const uiState = reactive({
  showToast: false
});

const groups = reactive([
  {
    id: 'g1',
    name: '第一组',
    themeColor: '#3b82f6', 
    tags: ['防窃听(高保密)', '防篡改(高完整)', '国密标准'],
    fileName: '',
    fileSize: '',
    aiScore: 86,
    aiLevel: '良好 (B+)',
    radarData: [85, 80, 95, 95, 80], 
    aiConclusion: "本组采用 <span style='color:#3b82f6;font-weight:bold;'>present轻量级加密算法</span>，安全性高，性能稳定。重点解决了加密算法在无人机环境中的应用问题。",
    aiSuggestion: "建议进一步优化密钥管理流程，可在不增加系统复杂度的前提下提升动态安全性。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  },
  {
    id: 'g2',
    name: '第二组',
    themeColor: '#ef4444', 
    tags: ['防窃听(高保密)', '防篡改(高完整)', '非对称加密'],
    fileName: '',
    fileSize: '',
    aiScore: 90,
    aiLevel: '优秀 (A)',
    radarData: [95, 90, 80, 80, 90],
    aiConclusion: "本组采用 <span style='color:#ef4444;font-weight:bold;'>侧信道防护方案</span>，在保障基础通信安全的同时，提供了更高的密钥安全性，工程可行性与安全性均表现优异。",
    aiSuggestion: "RSA 算法计算开销较大，建议在代码实现层进行优化以降低计算时延。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  },
  {
    id: 'g3',
    name: '第三组',
    themeColor: '#f59e0b', 
    tags: ['防窃听(高保密)', '防篡改(高完整)', '低功耗'],
    fileName: '',
    fileSize: '',
    aiScore: 88,
    aiLevel: '良好 (A-)',
    radarData: [90, 95, 85, 85, 85],
    aiConclusion: "本组采用 <span style='color:#f59e0b;font-weight:bold;'>抗重放攻击方案</span>，有效降低了系统功耗，同时保证了加密性能。身份认证逻辑严密，完整性校验机制十分完善。",
    aiSuggestion: "流密码的密钥管理是关键，建议在仿真验证时引入更安全的密钥更新机制。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  },
  {
    id: 'g4',
    name: '第四组',
    themeColor: '#8b5cf6', 
    tags: ['防窃听(高保密)', '防篡改(高完整)', '分布式防护'],
    fileName: '',
    fileSize: '',
    aiScore: 93,
    aiLevel: '极优 (A+)',
    radarData: [95, 95, 75, 70, 98],
    aiConclusion: "本组突破性采用 <span style='color:#8b5cf6;font-weight:bold;'>后量子密码防护方案</span>，利用抗量子算法全面抵御未来算力威胁，确保系统长效安全。创新性尤为突出，方案体系十分完整。",
aiSuggestion: "后量子算法带来了较大的内存与计算开销，建议探索引入硬件加速机制，以平衡极高安全性与节点性能。",
    state: { isUploading: false, isSubmitted: false, evalStatus: 'waiting', evalProgress: 0, hasFile: false }
  }
]);

// 修复 1：增加计算属性的安全回退，避免白屏
const currentGroup = computed(() => {
  return groups.find(g => g.id === currentGroupId.value) || groups[0];
});

const currentGroupTitle = computed(() => {
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    try {
      const groupInfo = JSON.parse(storedInfo);
      return groupInfo.groupName || '';
    } catch (e) {}
  }
  return '';
});

onMounted(() => {
  const storedInfo = localStorage.getItem('selectedGroupInfo');
  if (storedInfo) {
    try {
      const groupInfo = JSON.parse(storedInfo);
      if (groupInfo.groupId) {
        // 修复 2：安全地拼接 groupId，防止出现 "gg1" 的情况
        let gId = String(groupInfo.groupId);
        if (!gId.startsWith('g')) {
          gId = 'g' + gId;
        }
        currentGroupId.value = gId;
      }
    } catch(e) {
      console.error('JSON Parse error', e);
    }
  }
  
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});

const triggerFileUpload = () => {
  if (currentGroup.value.state.isSubmitted) return;
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    currentGroup.value.state.hasFile = true;
    currentGroup.value.fileName = file.name;
    currentGroup.value.fileSize = formatFileSize(file.size);
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const handleUpload = async () => {
  const group = currentGroup.value;
  group.state.isUploading = true;
  
  try {
    // 修复 3：使用 Vue 的 ref 取代 querySelector，防止变量重复声明报错
    const file = fileInput.value?.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('groupId', currentGroupId.value);
      
      await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
    }
    
    const groupId = currentGroupId.value.replace('g', ''); 
    const stateKey = `scheme_uploaded_g${groupId}`;
    
    await fetch('/api/state/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [stateKey]: 1 })
    });
  } catch (error) {
    console.error('推送状态失败:', error);
  }
  
  setTimeout(() => {
    group.state.isUploading = false;
    group.state.isSubmitted = true;
    
    uiState.showToast = true;
    setTimeout(() => { uiState.showToast = false; }, 3000);
  }, 800);
};

const startEvaluation = () => {
  const group = currentGroup.value;
  if (!group.state.isSubmitted || group.state.evalStatus !== 'waiting') return;
  
  group.state.evalStatus = 'loading';
  
  nextTick(() => {
    setTimeout(() => { group.state.evalProgress = 100; }, 50);
  });

  setTimeout(() => {
    group.state.evalStatus = 'finished';
    nextTick(() => {
      initRadarChart();
    });
  }, 2050);
};

const goToSchemeDetail = () => {
  if (!currentGroup.value.state.isSubmitted || currentGroup.value.state.evalStatus !== 'finished') {
    return;
  }
  router.push('/student/scheme-detail');
};

const goToTaskSplit = () => {
  router.push('/student/task-split');
};

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
.bg-darkBg { background-color: #121417; }
.bg-panelBg { background-color: #1c2126; }
.bg-cardInnerBg { background-color: #232930; }
.border-borderColor { border-color: #2d353e; }
.bg-accentGreen { background-color: #23b586; }
.text-accentGreen { color: #23b586; }
.text-warningYellow { color: #f59e0b; }
.text-textMain { color: #d1d5db; }
.text-textMuted { color: #6b7280; }

.scan-line {
  width: 100%; height: 2px;
  position: absolute; animation: scan 1.5s linear infinite; opacity: 0.6;
}
@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

.upload-box { transition: all 0.3s ease; }
.upload-box:hover { border-color: #4b5563; background-color: rgba(255, 255, 255, 0.02); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }

.toast-enter-active { transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
.toast-leave-active { transition: all 0.3s ease-in; }
.toast-enter-from { transform: translate(-50%, -20px); opacity: 0; }
.toast-leave-to { transform: translate(-50%, -20px); opacity: 0; }

.fade-in-up-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-in-up-leave-active {
  transition: all 0.3s ease;
}
.fade-in-up-enter-from,
.fade-in-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
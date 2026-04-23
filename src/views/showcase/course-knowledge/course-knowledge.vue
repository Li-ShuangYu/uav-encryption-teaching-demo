<template>
  <div class="knowledge-graph-page">
    <header class="page-header">
      <div class="logo-area">
        <span class="logo-icon"></span>
        <h1>密码系统设计 - 学情分析与知识图谱</h1>
      </div>
      <div class="stats-area">
        <span class="stat-item">总节点数: <strong>363</strong></span>
        <span class="stat-item">资源总量: <strong>720+</strong></span>
      </div>
    </header>

    <div class="graph-container-wrapper">
      <div id="knowledge-graph" class="graph-container" ref="graphRef"></div>
    </div>

    <transition name="fade">
      <div 
        v-if="popup.visible" 
        class="resource-popup" 
        :style="{ left: popup.x + 'px', top: popup.y + 'px' }"
        @click.stop
      >
        <div class="popup-header">
          <h3>{{ popup.nodeData.name }} - 关联资源</h3>
          <button class="close-btn" @click="closePopup">&times;</button>
        </div>
        
        <div class="resource-list">
          <div 
            v-for="(res, index) in currentResources" 
            :key="index" 
            class="resource-item"
            @click="openPreview(res)"
          >
            <div class="res-info">
              <span class="res-icon" :class="res.type.class"></span>
              <span class="res-title">{{ res.title }}</span>
              <span class="res-type-tag">{{ res.type.label }}</span>
            </div>
            
            <div class="ai-sources">
              <span 
                v-for="(ai, aIndex) in res.sources" 
                :key="aIndex" 
                class="ai-tag"
                :title="ai.name"
              >
                <img v-if="ai.logo" :src="ai.logo" class="ai-logo" alt="logo"/>
                <span v-else class="ai-logo-text">{{ ai.name.charAt(0) }}</span>
                {{ ai.name }}
              </span>
            </div>
          </div>
          <div v-if="currentResources.length === 0" class="no-data">
            暂无关联资源
          </div>
        </div>
      </div>
    </transition>

    <transition name="scale">
      <div v-if="preview.visible" class="preview-modal-overlay" @click="closePreview">
        <div class="preview-modal" @click.stop>
          <div class="preview-header">
            <h4>正在预览: {{ preview.data?.title }}</h4>
            <div class="preview-actions">
              <span class="ai-badge" v-for="ai in preview.data?.sources" :key="ai.name">{{ ai.name }}</span>
              <button class="close-btn" @click="closePreview">&times;</button>
            </div>
          </div>
          
          <div class="preview-content">
            <video v-if="preview.data?.type.key === 'video'" controls autoplay class="preview-media">
              <source :src="preview.data.fileUrl" type="video/mp4">
              您的浏览器不支持视频播放。
            </video>
            <div v-else-if="preview.data?.type.key === 'audio'" class="audio-container">
              <div class="audio-waves"></div>
              <audio controls autoplay class="preview-media">
                <source :src="preview.data.fileUrl" type="audio/mpeg">
                您的浏览器不支持音频播放。
              </audio>
            </div>
            <iframe v-else-if="preview.data?.type.key === 'pdf'" :src="preview.data.fileUrl" class="preview-iframe" frameborder="0"></iframe>
            <div v-else-if="preview.data?.type.key === 'code'" class="code-container">
              <pre><code>{{ preview.data.codeContent || '// 加载代码失败或文件不存在\nfunction init() {\n  console.log("Crypto System Initialized");\n}' }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue';
import * as echarts from 'echarts';

const graphRef = ref(null);
const chartInstance = shallowRef(null);

const AI_SOURCES = {
  JIMENG: { name: '即梦AI', logo: '' },
  DEEPSEEK: { name: 'deepseek', logo: '' },
  DOUBAO: { name: '豆包', logo: '' },
  KIMI: { name: 'Kimi', logo: '' },
  WENXIN: { name: '文心一言', logo: '' },
  OPENMAIC: { name: 'OpenMAIC', logo: '' }
};

const RES_TYPES = {
  VIDEO: { key: 'video', label: '交互式视频', class: 'icon-video' },
  EBOOK: { key: 'pdf', label: '电子教材', class: 'icon-book' },
  SLIDES: { key: 'pdf', label: '讲义课件', class: 'icon-slides' },
  PAPER: { key: 'pdf', label: '学术论文', class: 'icon-paper' },
  POLITICS: { key: 'pdf', label: '思政案例', class: 'icon-politics' },
  SYSTEM: { key: 'pdf', label: '系统案例', class: 'icon-system' },
  DEMO: { key: 'code', label: 'Demo程序', class: 'icon-code' },
  AUDIO: { key: 'audio', label: '喜马拉雅音频', class: 'icon-audio' }
};

const popup = ref({ visible: false, x: 0, y: 0, nodeData: null });
const preview = ref({ visible: false, data: null });
const currentResources = ref([]);

// 核心重构 1: 基于 SVG 矢量生成 2.5D 轴测立方体与立体球节点 (Base64注入)
// 通过三面不同的面光颜色（顶面亮、左面暗、右面过渡）模拟立体光影
const generateCubeSVG = (topColor, leftColor, rightColor, strokeColor) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115">
    <polygon points="50,2 98,26 50,50 2,26" fill="${topColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="2,26 50,50 50,100 2,76" fill="${leftColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="50,50 98,26 98,76 50,100" fill="${rightColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
  </svg>`;
  return `image://data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const generateSphereSVG = (lightColor, darkColor, strokeColor) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="grad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="${lightColor}" />
        <stop offset="100%" stop-color="${darkColor}" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#grad)" stroke="${strokeColor}" stroke-width="2.5"/>
  </svg>`;
  return `image://data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// 定义参考图中的材质颜色映射
const THEME = {
  cubeBlue: generateCubeSVG('#E1F5FE', '#81D4FA', '#4FC3F7', '#29B6F6'),
  cubeGreen: generateCubeSVG('#E8F5E9', '#A5D6A7', '#81C784', '#66BB6A'),
  sphereBlue: generateSphereSVG('#E1F5FE', '#4FC3F7', '#29B6F6')
};

// 核心重构 2: 重新定义坐标(X,Y)，强制转为“自上而下”的正交立体堆叠布局
const graphNodes = [
  { id: '1', name: '第一章 密码工程基础理论', symbol: THEME.cubeBlue, symbolSize: [70, 80], x: 500, y: 100 },
  { id: '1.1', name: '1.1 密码学核心概念', symbol: THEME.sphereBlue, symbolSize: [55, 55], x: 500, y: 250 },
  { id: '1.1.1', name: '1.1.1 密码系统的基本组成', symbol: THEME.cubeGreen, symbolSize: [60, 69], x: 300, y: 400 },
  { id: '1.1.2', name: '1.1.2 密码系统的安全要求', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 700, y: 400 },
  // 叶子节点群
  { id: 'e1', name: '基本组成要素', symbol: THEME.cubeBlue, symbolSize: [50, 57], x: 300, y: 550 },
  { id: 'e2', name: '机密性', symbol: THEME.cubeGreen, symbolSize: [50, 57], x: 500, y: 550 },
  { id: 'e3', name: '完整性', symbol: THEME.cubeGreen, symbolSize: [50, 57], x: 633, y: 550 },
  { id: 'e4', name: '可用性', symbol: THEME.cubeGreen, symbolSize: [50, 57], x: 766, y: 550 },
  { id: 'e5', name: '不可否认性', symbol: THEME.cubeGreen, symbolSize: [50, 57], x: 900, y: 550 }
];

const graphLinks = [
  { source: '1', target: '1.1' },
  { source: '1.1', target: '1.1.1' },
  { source: '1.1', target: '1.1.2' },
  { source: '1.1.1', target: 'e1' },
  { source: '1.1.2', target: 'e2' },
  { source: '1.1.2', target: 'e3' },
  { source: '1.1.2', target: 'e4' },
  { source: '1.1.2', target: 'e5' }
];

const generateMockResources = (nodeName) => {
  const allTypes = Object.values(RES_TYPES);
  const allSources = Object.values(AI_SOURCES);
  const count = Math.floor(Math.random() * 4) + 2; 
  const resources = [];
  
  for (let i = 0; i < count; i++) {
    const type = allTypes[Math.floor(Math.random() * allTypes.length)];
    const sourceCount = Math.floor(Math.random() * 2) + 1;
    const sources = [];
    for (let j = 0; j < sourceCount; j++) {
      const src = allSources[Math.floor(Math.random() * allSources.length)];
      if (!sources.includes(src)) sources.push(src);
    }
    
    let fileUrl = '';
    let codeContent = '';
    if (type.key === 'video') fileUrl = './assets/video/sample.mp4';
    else if (type.key === 'pdf') fileUrl = './assets/pdf/sample.pdf';
    else if (type.key === 'audio') fileUrl = './assets/audio/sample.mp3';
    else if (type.key === 'code') {
      codeContent = `import hashlib\n\ndef hash_data(data):\n    # Node: ${nodeName}\n    return hashlib.sha256(data.encode()).hexdigest()\n\nprint(hash_data("Cryptography"))`;
    }

    resources.push({ title: `${nodeName} - 关联${type.label} ${i + 1}`, type, sources, fileUrl, codeContent });
  }
  return resources;
};

const initChart = () => {
  if (!graphRef.value) return;
  chartInstance.value = echarts.init(graphRef.value);

  const processedNodes = graphNodes.map(node => ({
    ...node,
    label: {
      show: true,
      position: 'bottom', // 立体节点下，文本必须外置于底部防止穿模感
      distance: 8,
      color: '#1A3B5C',
      fontWeight: '500',
      fontSize: 13,
      fontFamily: 'sans-serif',
      formatter: '{b}',
      textBorderColor: 'rgba(255,255,255,0.9)',
      textBorderWidth: 3 // 增加白色文字描边，保证线条穿插时的可读性
    }
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: { show: false }, 
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
    series: [
      {
        type: 'graph',
        layout: 'none', 
        roam: true, 
        draggable: true,
        data: processedNodes,
        links: graphLinks,
        // 核心重构 3: 将连线改为参考图中的“刚性管道”风格
        lineStyle: {
          color: '#81D4FA', // 与立体块颜色相呼应的淡蓝管脚
          width: 6,         // 粗线模拟管道
          curveness: 0,     // 0曲率，保持刚性的晶格直线感
          opacity: 0.9,
          join: 'round',
          cap: 'round'
        },
        edgeSymbol: ['none', 'none'], // 晶格空间不宜出现箭头破坏结构
        label: { show: true }
      }
    ]
  };

  chartInstance.value.setOption(option);

  chartInstance.value.on('click', (params) => {
    if (params.dataType === 'node') {
      const rect = graphRef.value.getBoundingClientRect();
      currentResources.value = generateMockResources(params.data.name);
      popup.value = {
        visible: true,
        x: params.event.event.clientX - rect.left + 20, 
        y: params.event.event.clientY - rect.top + 20,
        nodeData: params.data
      };
    }
  });

  chartInstance.value.getZr().on('click', (params) => {
    if (!params.target) closePopup();
  });
};

const closePopup = () => popup.value.visible = false;
const openPreview = (resource) => { preview.value = { visible: true, data: resource }; closePopup(); };
const closePreview = () => preview.value.visible = false;
const handleResize = () => chartInstance.value?.resize();

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance.value?.dispose();
});
</script>

<style scoped>
/* 保持简约淡蓝的学术底纹，符合客观且不干扰图表元素的设定 */
.knowledge-graph-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #F0F7FB 0%, #E3F2FD 100%);
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333;
}

.page-header {
  position: absolute;
  top: 0; left: 0; right: 0; height: 60px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 30px; border-bottom: 1px solid #DCE6F1; z-index: 10;
}

.logo-area h1 { font-size: 18px; color: #1A3B5C; margin: 0; font-weight: 600; }
.stats-area { display: flex; gap: 20px; }
.stat-item {
  font-size: 13px; color: #5C7B9E; background: #F4F8FB;
  padding: 4px 12px; border-radius: 4px; border: 1px solid #DCE6F1;
}
.stat-item strong { color: #2980B9; }

.graph-container-wrapper { width: 100%; height: 100%; padding-top: 60px; box-sizing: border-box; }
.graph-container { width: 100%; height: 100%; }

.resource-popup {
  position: absolute; width: 380px; max-height: 500px;
  background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
  border: 1px solid #DCE6F1; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 6px; z-index: 100; display: flex; flex-direction: column;
  overflow: hidden; transition: all 0.2s ease;
}

.popup-header {
  padding: 12px 16px; background: #F8FBFF; border-bottom: 1px solid #DCE6F1;
  display: flex; justify-content: space-between; align-items: center; color: #1A3B5C;
}
.popup-header h3 { margin: 0; font-size: 14px; font-weight: 600; }
.close-btn { background: none; border: none; color: #5C7B9E; font-size: 20px; cursor: pointer; opacity: 0.7; }
.close-btn:hover { opacity: 1; color: #1A3B5C; }

.resource-list { padding: 12px; overflow-y: auto; flex: 1; }
.resource-item {
  background: white; border-radius: 4px; padding: 12px; margin-bottom: 8px;
  border: 1px solid #E6EEF5; cursor: pointer; transition: all 0.2s;
}
.resource-item:hover { border-color: #AECBFA; background: #F8FAFD; }
.res-info { display: flex; align-items: center; margin-bottom: 8px; }
.res-icon { width: 10px; height: 10px; border-radius: 2px; margin-right: 8px; display: inline-block; }
.icon-video { background: #E57373; } .icon-book { background: #64B5F6; } .icon-slides { background: #FFB74D; }
.icon-paper { background: #AED581; } .icon-politics { background: #F06292; } .icon-system { background: #BA68C8; }
.icon-code { background: #90A4AE; } .icon-audio { background: #4DD0E1; }
.res-title { flex: 1; font-size: 13px; color: #333; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.res-type-tag { font-size: 11px; background: #F0F4F8; color: #5C7B9E; padding: 2px 6px; border-radius: 2px; margin-left: 8px; }

.ai-sources { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; padding-left: 18px; }
.ai-tag { display: flex; align-items: center; font-size: 11px; background: #F4F8FB; color: #2980B9; border: 1px solid #E1EDF7; padding: 2px 6px; border-radius: 2px; }
.ai-logo-text { background: #2980B9; color: white; width: 12px; height: 12px; border-radius: 2px; display: inline-flex; justify-content: center; align-items: center; font-size: 9px; margin-right: 4px; }
.no-data { text-align: center; color: #999; padding: 30px 0; font-size: 13px; }

.preview-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(26, 32, 44, 0.4); backdrop-filter: blur(2px);
  z-index: 1000; display: flex; justify-content: center; align-items: center;
}
.preview-modal { width: 70%; height: 80%; background: white; border-radius: 6px; display: flex; flex-direction: column; box-shadow: 0 12px 36px rgba(0,0,0,0.15); overflow: hidden; }
.preview-header { padding: 12px 20px; background: #FAFAFA; border-bottom: 1px solid #E2E8F0; color: #2D3748; display: flex; justify-content: space-between; align-items: center; }
.preview-header h4 { margin: 0; font-size: 15px; font-weight: 500; }
.preview-actions { display: flex; align-items: center; gap: 12px; }
.ai-badge { background: #EDF2F7; border: 1px solid #E2E8F0; color: #4A5568; padding: 2px 8px; border-radius: 2px; font-size: 12px; }
.preview-content { flex: 1; background: #EDF2F7; display: flex; justify-content: center; align-items: center; }
.preview-media { max-width: 100%; max-height: 100%; }
.preview-iframe { width: 100%; height: 100%; background: white; }
.code-container { width: 100%; height: 100%; background: #282C34; color: #ABB2BF; padding: 20px; box-sizing: border-box; overflow: auto; font-family: 'Consolas', monospace; font-size: 13px; line-height: 1.6; text-align: left; }
.audio-container { text-align: center; padding: 40px; background: white; border-radius: 6px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.scale-enter-active, .scale-leave-active { transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.95); }
</style>
<template>
  <div class="knowledge-graph-page">
    <header class="page-header">
      <div class="logo-area">
        <span class="logo-icon"></span>
        <h1>{{ rootNodeName }} - 知识图谱</h1>
      </div>
      <div class="stats-area">
        <span class="stat-item">总节点数: <strong>385</strong></span>
        <span class="stat-item">关联资源: <strong>850+</strong></span>
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
        <div class="popup-header" @mousedown="onDragStart">
          <h3>{{ popup.nodeData.name }} - 关联资源清单</h3>
          <button class="close-btn" @click="closePopup" @mousedown.stop>&times;</button>
        </div>
        <div class="resource-list">
          <div v-for="(res, index) in currentResources" :key="index" class="resource-item" @click="openPreview(res)">
            <div class="res-info">
              <span class="res-icon" :class="res.type.class"></span>
              <span class="res-title">{{ res.title }}</span>
            </div>
            <div class="ai-sources">
              <div v-for="(ai, aIndex) in res.sources" :key="aIndex" class="ai-source-tag">
                <div class="ai-logo-box">
                  <img :src="ai.path" :alt="ai.name" @error="handleImgError" class="ai-img" />
                </div>
                <span class="ai-name-text">{{ ai.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="scale">
      <div v-if="preview.visible" class="preview-overlay" @click="closePreview">
        <div v-if="preview.data?.type.key === 'video'" class="modal-video" @click.stop>
          <video controls autoplay class="fill-media">
            <source :src="preview.data.fileUrl" type="video/mp4">
          </video>
        </div>

        <div v-else-if="preview.data?.type.key === 'audio'" class="modal-audio" @click.stop>
          <div class="audio-info">{{ preview.data.title }}</div>
          <audio controls autoplay style="width: 100%">
            <source :src="preview.data.fileUrl" type="audio/mpeg">
          </audio>
        </div>

        <div v-else class="modal-standard" @click.stop>
          <div class="modal-head">
            <span>{{ preview.data.title }}</span>
            <button @click="closePreview">&times;</button>
          </div>
          <iframe :src="preview.data.fileUrl" class="pdf-viewer" frameborder="0"></iframe>
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
const rootNodeName = '密码系统设计';

const ASSETS_BASE = 'src/views/showcase/course-knowledge/assets';
const LOGO_BASE = `${ASSETS_BASE}/logo`;

const AI_SOURCES = {
  JIMENG: { name: '即梦AI', path: `${LOGO_BASE}/jimengai.png` },
  DEEPSEEK: { name: 'DeepSeek', path: `${LOGO_BASE}/deepseek.png` },
  DOUBAO: { name: '豆包', path: `${LOGO_BASE}/doubao.png` },
  KIMI: { name: 'Kimi', path: `${LOGO_BASE}/kimi.png` },
  WENXIN: { name: '文心一言', path: `${LOGO_BASE}/wenxinyiyan.png` },
  OPENMAIC: { name: 'OpenMAIC', path: `${LOGO_BASE}/openmaic.png` }
};

const RES_TYPES = {
  VIDEO: { key: 'video', label: '视频', class: 'v-icon' },
  PDF: { key: 'pdf', label: '文档', class: 'p-icon' },
  AUDIO: { key: 'audio', label: '音频', class: 'a-icon' }
};

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

const THEME = {
  cubeRed: generateCubeSVG('#FFEBEE', '#FFCDD2', '#EF9A9A', '#E53935'),
  cubeYellow: generateCubeSVG('#FFF8E1', '#FFE082', '#FFCC80', '#FFB74D'),
  spherePurple: generateSphereSVG('#F3E5F5', '#BA68C8', '#8E24AA'),
  cubeBlue: generateCubeSVG('#E1F5FE', '#81D4FA', '#4FC3F7', '#29B6F6')
};

const treeData = {
  name: rootNodeName,
  symbol: THEME.cubeRed,
  symbolSize: [110, 126],
  children: [
    {
      name: '第一章 密码工程基础理论',
      symbol: THEME.cubeYellow,
      symbolSize: [90, 104],
      children: [
        {
          name: '1.1.1 密码系统基本组成',
          symbol: THEME.spherePurple,
          symbolSize: [80, 80],
          children: [
            { name: '信源与信宿', symbol: THEME.cubeBlue, symbolSize: [80, 92] },
            { name: '加密算法空间', symbol: THEME.cubeBlue, symbolSize: [80, 92] },
            { name: '密钥分发链路', symbol: THEME.cubeBlue, symbolSize: [80, 92] }
          ]
        },
        {
          name: '1.1.2 密码系统安全要求',
          symbol: THEME.spherePurple,
          symbolSize: [80, 80],
          children: [
            { name: '机密性标准', symbol: THEME.cubeBlue, symbolSize: [80, 92] },
            { name: '完整性验证', symbol: THEME.cubeBlue, symbolSize: [80, 92] }
          ]
        }
      ]
    },
    {
      name: '第二章 对称加密技术',
      symbol: THEME.cubeYellow,
      symbolSize: [90, 104],
      children: [
        {
          name: '2.1.1 流密码原理',
          symbol: THEME.spherePurple,
          symbolSize: [80, 80],
          children: [
            { name: 'LFSR序列', symbol: THEME.cubeBlue, symbolSize: [80, 92] },
            { name: 'RC4算法实现', symbol: THEME.cubeBlue, symbolSize: [80, 92] }
          ]
        },
        {
          name: '2.1.2 分组密码(AES)',
          symbol: THEME.spherePurple,
          symbolSize: [80, 80],
          children: [
            { name: 'S盒变换', symbol: THEME.cubeBlue, symbolSize: [80, 92] },
            { name: '轮密钥加', symbol: THEME.cubeBlue, symbolSize: [80, 92] }
          ]
        }
      ]
    }
  ]
};

const popup = ref({ visible: false, x: 0, y: 0, nodeData: null });
const preview = ref({ visible: false, data: null });
const currentResources = ref([]);
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });

const onDragStart = (e) => {
  isDragging.value = true;
  dragOffset.value = { x: e.clientX - popup.value.x, y: e.clientY - popup.value.y };
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
};
const onDragMove = (e) => {
  if (!isDragging.value) return;
  popup.value.x = e.clientX - dragOffset.value.x;
  popup.value.y = e.clientY - dragOffset.value.y;
};
const onDragEnd = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
};

const generateMockData = (name) => {
  const types = Object.values(RES_TYPES);
  const ais = Object.values(AI_SOURCES);
  return Array.from({ length: 3 }).map((_, i) => ({
    title: `${name} - ${i === 0 ? '讲解视频' : i === 1 ? '核心课件' : '配套音频'}`,
    type: types[i % 3],
    sources: [ais[Math.floor(Math.random() * ais.length)], ais[Math.floor(Math.random() * ais.length)]],
    fileUrl: `${ASSETS_BASE}/sample.${types[i % 3].key === 'video' ? 'mp4' : types[i % 3].key === 'audio' ? 'mp3' : 'pdf'}`
  }));
};

const initChart = () => {
  if (!graphRef.value) return;
  chartInstance.value = echarts.init(graphRef.value);

  chartInstance.value.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [
      {
        type: 'tree',
        data: [treeData],
        // 把上下边距缩小到极致，给节点让出所有垂直空间
        top: '2%',
        bottom: '2%',
        left: '10%',
        right: '10%',
        roam: true,                 
        symbolKeepAspect: true,
        orient: 'LR',               
        edgeShape: 'curve',         
        initialTreeDepth: -1,       
        expandAndCollapse: false,   
        label: {
          position: 'bottom',
          verticalAlign: 'middle',
          align: 'center',
          distance: 12,             
          fontSize: 16,             
          fontWeight: '600',
          color: '#1A3B5C',
          textBorderColor: 'rgba(255,255,255,0.95)',
          textBorderWidth: 4
        },
        lineStyle: {
          color: '#81D4FA',
          width: 6,
          curveness: 0.5            
        },
        emphasis: {
          focus: 'descendant',
          lineStyle: { width: 10, color: '#03A9F4' }
        }
      }
    ]
  });

  chartInstance.value.on('click', (params) => {
    if (params.componentType === 'series') {
      const wrapper = document.querySelector('.graph-container-wrapper');
      const rect = graphRef.value.getBoundingClientRect();
      currentResources.value = generateMockData(params.data.name);
      
      popup.value = {
        visible: true,
        x: params.event.event.clientX - rect.left + wrapper.scrollLeft + 40,
        y: params.event.event.clientY - rect.top + wrapper.scrollTop + 40,
        nodeData: params.data
      };
    }
  });
};

const closePopup = () => popup.value.visible = false;
const openPreview = (res) => { preview.value = { visible: true, data: res }; };
const closePreview = () => preview.value.visible = false;
const handleImgError = (e) => { e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; };

onMounted(() => { 
  initChart(); 
  window.addEventListener('resize', () => chartInstance.value?.resize()); 
});

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
});
</script>

<style scoped>
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
  position: absolute; top: 0; width: 100%; height: 80px;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 40px; background: rgba(255,255,255,0.7); backdrop-filter: blur(10px);
  border-bottom: 1px solid #D1E3F5; z-index: 10; box-sizing: border-box;
}
.logo-area h1 { margin: 0; font-size: 24px; color: #1A3B5C; font-weight: bold; }
.stats-area { font-size: 16px; display: flex; gap: 20px; }
.stat-item strong { font-size: 18px; color: #1976D2; }

.graph-container-wrapper {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px); 
  overflow: auto; /* 重点：外部出滚动条 */
  box-sizing: border-box;
}

/* 核心！宽度锁死防拉长，高度拉爆防挤压 */
.graph-container {
  width: 1100px;
  height: 1800px; 
  margin: 0 auto; 
}

.resource-popup {
  position: absolute; width: 480px; background: white;
  border-radius: 12px; box-shadow: 0 12px 36px rgba(0,0,0,0.2);
  border: 1px solid #E3F2FD; z-index: 100; overflow: hidden;
}

.popup-header { 
  padding: 16px 20px; 
  background: #F8FBFF; 
  border-bottom: 1px solid #E3F2FD; 
  display: flex; justify-content: space-between; align-items: center; 
  cursor: grab;
  user-select: none;
}
.popup-header:active { cursor: grabbing; }
.popup-header h3 { margin: 0; font-size: 18px; font-weight: 600; color: #1A3B5C; pointer-events: none; }

.resource-list { padding: 16px; max-height: 450px; overflow-y: auto; }
.resource-item {
  padding: 16px; border: 1px solid #F0F4F8; border-radius: 8px; margin-bottom: 12px;
  cursor: pointer; transition: 0.2s;
}
.resource-item:hover { background: #F0F9FF; border-color: #A3D3FF; }

.res-info { display: flex; align-items: center; margin-bottom: 12px; }
.res-title { font-size: 16px; color: #333; font-weight: 600; }

.ai-sources { display: flex; flex-wrap: wrap; gap: 12px; }
.ai-source-tag {
  display: flex; align-items: center; background: #F4F8FB;
  padding: 4px 10px 4px 6px; border-radius: 6px; border: 1px solid #E1E9F0;
}
.ai-logo-box {
  width: 26px; height: 26px; margin-right: 8px;
  display: flex; justify-content: center; align-items: center;
}
.ai-img { max-width: 100%; max-height: 100%; object-fit: contain; }
.ai-name-text { font-size: 14px; color: #555; white-space: nowrap; font-weight: 500; }

.preview-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); z-index: 1000;
  display: flex; justify-content: center; align-items: center;
}

.modal-video { width: 65vw; aspect-ratio: 16/9; background: black; border-radius: 12px; overflow: hidden; }
.fill-media { width: 100%; height: 100%; }

.modal-audio { width: 360px; padding: 30px; background: white; border-radius: 16px; text-align: center; }
.audio-info { margin-bottom: 20px; font-weight: bold; font-size: 18px; color: #1A3B5C; }

.modal-standard { width: 85%; height: 85%; background: white; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; }
.modal-head { padding: 20px 25px; border-bottom: 1px solid #EEE; display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; }
.pdf-viewer { flex: 1; width: 100%; }

.close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #999; line-height: 1; }
.close-btn:hover { color: #F44336; }

.v-icon::before { content: '🎬'; margin-right: 8px; font-size: 18px; }
.p-icon::before { content: '📄'; margin-right: 8px; font-size: 18px; }
.a-icon::before { content: '🎧'; margin-right: 8px; font-size: 18px; }

.resource-list::-webkit-scrollbar { width: 6px; }
.resource-list::-webkit-scrollbar-thumb { background: #B3D4F0; border-radius: 10px; }
</style>
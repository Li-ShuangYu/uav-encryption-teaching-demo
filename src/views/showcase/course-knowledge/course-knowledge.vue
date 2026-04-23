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

// ======================
// 核心修改：立体节点 SVG 生成函数
// ======================
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

// ======================
// 核心修改：节点主题配色（根红、一级黄、二级紫、三级蓝）
// ======================
const THEME = {
  cubeRed: generateCubeSVG('#FFEBEE', '#FFCDD2', '#EF9A9A', '#E53935'), // 根节点红色
  cubeYellow: generateCubeSVG('#FFF8E1', '#FFE082', '#FFCC80', '#FFB74D'), // 一级节点黄色
  spherePurple: generateSphereSVG('#F3E5F5', '#BA68C8', '#8E24AA'), // 二级节点紫色
  cubeBlue: generateCubeSVG('#E1F5FE', '#81D4FA', '#4FC3F7', '#29B6F6') // 三级节点蓝色
};

// ======================
// 核心修改：节点数据（调整三级节点y坐标增大纵向间距，更新节点颜色）
// ======================
const graphNodes = [
  // 根节点：红色立方体
  { id: '0', name: rootNodeName, symbol: THEME.cubeRed, symbolSize: [70, 80], x: 100, y: 300 },
  
  // 一级节点：黄色立方体
  { id: '1', name: '第一章 密码工程基础理论', symbol: THEME.cubeYellow, symbolSize: [70, 80], x: 350, y: 150 },
  { id: '2', name: '第二章 对称加密技术', symbol: THEME.cubeYellow, symbolSize: [70, 80], x: 350, y: 450 },

  // 二级节点：紫色球体
  { id: '1.1.1', name: '1.1.1 密码系统基本组成', symbol: THEME.spherePurple, symbolSize: [55, 55], x: 600, y: 100 },
  { id: '1.1.2', name: '1.1.2 密码系统安全要求', symbol: THEME.spherePurple, symbolSize: [55, 55], x: 600, y: 200 },

  { id: '2.1.1', name: '2.1.1 流密码原理', symbol: THEME.spherePurple, symbolSize: [55, 55], x: 600, y: 400 },
  { id: '2.1.2', name: '2.1.2 分组密码(AES)', symbol: THEME.spherePurple, symbolSize: [55, 55], x: 600, y: 500 },

  // 三级节点：蓝色立方体（增大纵向间距）
  { id: 'e1-1', name: '信源与信宿', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 20 },
  { id: 'e1-2', name: '加密算法空间', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 90 },
  { id: 'e1-3', name: '密钥分发链路', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 160 },
  { id: 'e2-1', name: '机密性标准', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 230 },
  { id: 'e2-2', name: '完整性验证', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 300 },
  { id: 'e3-1', name: 'LFSR序列', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 370 },
  { id: 'e3-2', name: 'RC4算法实现', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 440 },
  { id: 'e4-1', name: 'S盒变换', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 510 },
  { id: 'e4-2', name: '轮密钥加', symbol: THEME.cubeBlue, symbolSize: [60, 69], x: 850, y: 580 }
];

const graphLinks = [
  { source: '0', target: '1' }, { source: '0', target: '2' },
  { source: '1', target: '1.1.1' }, { source: '1', target: '1.1.2' },
  { source: '2', target: '2.1.1' }, { source: '2', target: '2.1.2' },
  { source: '1.1.1', target: 'e1-1' }, { source: '1.1.1', target: 'e1-2' }, { source: '1.1.1', target: 'e1-3' },
  { source: '1.1.2', target: 'e2-1' }, { source: '1.1.2', target: 'e2-2' },
  { source: '2.1.1', target: 'e3-1' }, { source: '2.1.1', target: 'e3-2' },
  { source: '2.1.2', target: 'e4-1' }, { source: '2.1.2', target: 'e4-2' }
];

const popup = ref({ visible: false, x: 0, y: 0, nodeData: null });
const preview = ref({ visible: false, data: null });
const currentResources = ref([]);

// 弹窗拖拽逻辑（保留原有）
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });

const onDragStart = (e) => {
  isDragging.value = true;
  dragOffset.value = {
    x: e.clientX - popup.value.x,
    y: e.clientY - popup.value.y
  };
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
    backgroundColor: 'transparent', // 图谱背景透明
    animationDurationUpdate: 1000, // 动画时长
    animationEasingUpdate: 'cubicInOut', // 动画曲线
    series: [{
      type: 'graph',
      layout: 'none',
      roam: true,
      draggable: true, // 节点可拖动
      data: graphNodes,
      links: graphLinks,
      // 节点标签样式
      label: {
        show: true,
        position: 'bottom',    // 文字在节点底部
        distance: 8,           // 文字距离节点
        color: '#1A3B5C',      // 文字颜色
        fontWeight: '500',     // 文字粗细
        fontSize: 13,          // 文字大小
        fontFamily: 'sans-serif',
        textBorderColor: 'rgba(255,255,255,0.9)', // 文字白色描边
        textBorderWidth: 3     // 描边宽度
      },
      // 连线样式
      lineStyle: {
        color: '#81D4FA',    // 连线淡蓝色
        width: 6,            // 连线粗度（管道效果）
        curveness: 0,        // 直线（无弧度）
        opacity: 0.9,        // 透明度
        join: 'round',       // 连接点圆角
        cap: 'round'         // 端点圆角
      },
      edgeSymbol: ['none', 'none'], // 无箭头
      emphasis: { 
        focus: 'none', 
        itemStyle: { shadowBlur: 15, shadowColor: 'rgba(0,0,0,0.3)' },
        lineStyle: { width: 8, opacity: 1 }
      }
    }]
  });

  chartInstance.value.on('click', (params) => {
    if (params.dataType === 'node') {
      const rect = graphRef.value.getBoundingClientRect();
      currentResources.value = generateMockData(params.data.name);
      popup.value = {
        visible: true,
        x: params.event.event.clientX - rect.left + 20,
        y: params.event.event.clientY - rect.top + 20,
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
/* 核心修改：页面背景渐变方向+字体 */
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
  position: absolute; top: 0; width: 100%; height: 60px;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 40px; background: rgba(255,255,255,0.7); backdrop-filter: blur(10px);
  border-bottom: 1px solid #D1E3F5; z-index: 10; box-sizing: border-box;
}

/* 图谱容器样式（按要求保留） */
.graph-container-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
}

.graph-container {
  width: 100%;
  height: 100%;
}

.resource-popup {
  position: absolute; width: 340px; background: white;
  border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border: 1px solid #E3F2FD; z-index: 100; overflow: hidden;
}

.popup-header { 
  padding: 12px 16px; 
  background: #F8FBFF; 
  border-bottom: 1px solid #E3F2FD; 
  display: flex; justify-content: space-between; align-items: center; 
  cursor: grab;
  user-select: none;
}
.popup-header:active {
  cursor: grabbing;
}
.popup-header h3 { margin: 0; font-size: 14px; color: #1A3B5C; pointer-events: none; }

.resource-list { padding: 10px; max-height: 400px; overflow-y: auto; }
.resource-item {
  padding: 12px; border: 1px solid #F0F4F8; border-radius: 6px; margin-bottom: 8px;
  cursor: pointer; transition: 0.2s;
}
.resource-item:hover { background: #F0F9FF; border-color: #A3D3FF; }
.res-info { display: flex; align-items: center; margin-bottom: 10px; }
.res-title { font-size: 13px; color: #333; font-weight: 500; }

.ai-sources { display: flex; flex-wrap: wrap; gap: 8px; }
.ai-source-tag {
  display: flex; align-items: center; background: #F4F8FB;
  padding: 2px 8px 2px 4px; border-radius: 4px; border: 1px solid #E1E9F0;
}
.ai-logo-box {
  width: 20px; height: 20px; margin-right: 6px;
  display: flex; justify-content: center; align-items: center;
}
.ai-img { max-width: 100%; max-height: 100%; object-fit: contain; }
.ai-name-text { font-size: 11px; color: #666; white-space: nowrap; }

.preview-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); z-index: 1000;
  display: flex; justify-content: center; align-items: center;
}

.modal-video { width: 60vw; aspect-ratio: 16/9; background: black; border-radius: 8px; overflow: hidden; }
.fill-media { width: 100%; height: 100%; }

.modal-audio { width: 320px; padding: 25px; background: white; border-radius: 12px; text-align: center; }
.audio-info { margin-bottom: 15px; font-weight: bold; color: #1A3B5C; }

.modal-standard { width: 85%; height: 85%; background: white; border-radius: 8px; display: flex; flex-direction: column; }
.modal-head { padding: 15px 20px; border-bottom: 1px solid #EEE; display: flex; justify-content: space-between; font-weight: bold; }
.pdf-viewer { flex: 1; width: 100%; }

.close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: #999; line-height: 1; }
.close-btn:hover { color: #F44336; }

.v-icon::before { content: '🎬'; margin-right: 5px; }
.p-icon::before { content: '📄'; margin-right: 5px; }
.a-icon::before { content: '🎧'; margin-right: 5px; }

.resource-list::-webkit-scrollbar { width: 4px; }
.resource-list::-webkit-scrollbar-thumb { background: #D1E3F5; border-radius: 10px; }
</style>
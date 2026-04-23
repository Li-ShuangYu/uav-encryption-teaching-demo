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
            <video 
              v-if="preview.data?.type.key === 'video'" 
              controls 
              autoplay
              class="preview-media"
            >
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

            <iframe 
              v-else-if="preview.data?.type.key === 'pdf'" 
              :src="preview.data.fileUrl" 
              class="preview-iframe"
              frameborder="0"
            ></iframe>

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

// DOM 引用
const graphRef = ref(null);
const chartInstance = shallowRef(null);

// AI 模型来源定义
const AI_SOURCES = {
  JIMENG: { name: '即梦AI', logo: '' },
  DEEPSEEK: { name: 'deepseek', logo: '' },
  DOUBAO: { name: '豆包', logo: '' },
  KIMI: { name: 'Kimi', logo: '' },
  WENXIN: { name: '文心一言', logo: '' },
  OPENMAIC: { name: 'OpenMAIC', logo: '' }
};

// 资源类型定义
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

// 状态管理
const popup = ref({ visible: false, x: 0, y: 0, nodeData: null });
const preview = ref({ visible: false, data: null });
const currentResources = ref([]);

// 模拟图谱节点数据 (基于提供的架构图)
const graphNodes = [
  { id: '1', name: '第一章 密码工程基础理论', category: 0, symbolSize: [180, 50] },
  { id: '1.1', name: '1.1 密码学核心概念', category: 1, symbolSize: [150, 40] },
  { id: '1.1.1', name: '1.1.1 密码系统的基本组成', category: 2, symbolSize: [160, 40] },
  { id: '1.1.2', name: '1.1.2 密码系统的安全要求', category: 2, symbolSize: [160, 40] },
  { id: 'e1', name: '基本组成要素', category: 3, symbolSize: [120, 36] },
  { id: 'e2', name: '机密性', category: 3, symbolSize: [100, 36] },
  { id: 'e3', name: '完整性', category: 3, symbolSize: [100, 36] },
  { id: 'e4', name: '可用性', category: 3, symbolSize: [100, 36] },
  { id: 'e5', name: '不可否认性', category: 3, symbolSize: [120, 36] },
  // 扩展节点以丰富图谱
  { id: '2', name: '第二章 对称密码算法', category: 0, symbolSize: [160, 50] },
  { id: '2.1', name: 'DES与AES', category: 1, symbolSize: [130, 40] },
  { id: '3', name: '第三章 公钥密码体系', category: 0, symbolSize: [160, 50] },
  { id: '3.1', name: 'RSA算法原理', category: 1, symbolSize: [130, 40] }
];

const graphLinks = [
  { source: '1', target: '1.1' },
  { source: '1.1', target: '1.1.1' },
  { source: '1.1', target: '1.1.2' },
  { source: '1.1.1', target: 'e1' },
  { source: '1.1.2', target: 'e2' },
  { source: '1.1.2', target: 'e3' },
  { source: '1.1.2', target: 'e4' },
  { source: '1.1.2', target: 'e5' },
  { source: '2', target: '2.1' },
  { source: '1', target: '2' },
  { source: '2', target: '3' },
  { source: '3', target: '3.1' }
];

// 辅助函数：随机生成资源
const generateMockResources = (nodeName) => {
  const allTypes = Object.values(RES_TYPES);
  const allSources = Object.values(AI_SOURCES);
  const count = Math.floor(Math.random() * 4) + 2; // 2到5个资源
  const resources = [];
  
  for (let i = 0; i < count; i++) {
    const type = allTypes[Math.floor(Math.random() * allTypes.length)];
    // 随机1到2个AI来源
    const sourceCount = Math.floor(Math.random() * 2) + 1;
    const sources = [];
    for (let j = 0; j < sourceCount; j++) {
      const src = allSources[Math.floor(Math.random() * allSources.length)];
      if (!sources.includes(src)) sources.push(src);
    }
    
    // 设定对应的本地静态路径要求
    let fileUrl = '';
    let codeContent = '';
    if (type.key === 'video') fileUrl = './assets/video/sample.mp4';
    else if (type.key === 'pdf') fileUrl = './assets/pdf/sample.pdf';
    else if (type.key === 'audio') fileUrl = './assets/audio/sample.mp3';
    else if (type.key === 'code') {
      codeContent = `import hashlib\n\ndef hash_data(data):\n    # Node: ${nodeName}\n    return hashlib.sha256(data.encode()).hexdigest()\n\nprint(hash_data("Cryptography"))`;
    }

    resources.push({
      title: `${nodeName} - 关联${type.label} ${i + 1}`,
      type,
      sources,
      fileUrl,
      codeContent
    });
  }
  return resources;
};

// 初始化图谱
const initChart = () => {
  if (!graphRef.value) return;
  
  chartInstance.value = echarts.init(graphRef.value);
  
  // 定义节点样式：3D立体长方形
  const getSymbolStyle = (category) => {
    // 科技蓝青色系渐变
    const colors = [
      new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#A0D8EF' }, { offset: 1, color: '#5C98D3' }]), // 一级分类
      new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#B2EBF2' }, { offset: 1, color: '#4DD0E1' }]), // 二级分类
      new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#CFD8DC' }, { offset: 1, color: '#90A4AE' }]), // 三级分类
      new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#E1F5FE' }, { offset: 1, color: '#81D4FA' }])  // 叶子节点
    ];
    
    return {
      color: colors[category] || colors[0],
      borderColor: '#ffffff',
      borderWidth: 2,
      shadowBlur: 10,
      shadowColor: 'rgba(0, 50, 100, 0.3)',
      shadowOffsetX: 3,
      shadowOffsetY: 5
    };
  };

  const processedNodes = graphNodes.map(node => ({
    ...node,
    symbol: 'roundRect',
    itemStyle: getSymbolStyle(node.category),
    label: {
      show: true,
      position: 'inside',
      color: '#1A3B5C',
      fontWeight: 'bold',
      fontSize: 13,
      formatter: '{b}'
    }
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: { show: false }, // 使用自定义弹窗代替默认tooltip
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 800,
          edgeLength: [100, 200],
          layoutAnimation: true
        },
        roam: true, // 支持缩放和拖拽
        draggable: true,
        data: processedNodes,
        links: graphLinks,
        lineStyle: {
          color: '#80B3E6',
          width: 2,
          curveness: 0.2,
          opacity: 0.7
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [4, 10]
      }
    ]
  };

  chartInstance.value.setOption(option);

  // 监听点击事件触发弹窗
  chartInstance.value.on('click', (params) => {
    if (params.dataType === 'node') {
      // 获取图表容器相对于视口的位置
      const rect = graphRef.value.getBoundingClientRect();
      
      // 动态生成/获取关联资源
      currentResources.value = generateMockResources(params.data.name);
      
      popup.value = {
        visible: true,
        // 适当偏移防止遮挡鼠标
        x: params.event.event.clientX - rect.left + 20, 
        y: params.event.event.clientY - rect.top + 20,
        nodeData: params.data
      };
    }
  });

  // 点击空白区域关闭弹窗
  chartInstance.value.getZr().on('click', (params) => {
    if (!params.target) {
      closePopup();
    }
  });
};

const closePopup = () => {
  popup.value.visible = false;
};

const openPreview = (resource) => {
  preview.value = {
    visible: true,
    data: resource
  };
  closePopup();
};

const closePreview = () => {
  preview.value.visible = false;
  // 停止音视频播放可以在这里进行DOM操作或通过v-if自动销毁
};

// 窗口尺寸变化自适应
const handleResize = () => {
  chartInstance.value?.resize();
};

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
/* 全局变量与底色 */
.knowledge-graph-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #E6F0FA 0%, #CDE0F5 100%);
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  color: #333;
}

/* 头部样式 */
.page-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  z-index: 10;
}

.logo-area h1 {
  font-size: 20px;
  color: #1A3B5C;
  margin: 0;
  font-weight: 600;
  letter-spacing: 1px;
}

.stats-area {
  display: flex;
  gap: 20px;
}

.stat-item {
  font-size: 14px;
  color: #5C7B9E;
  background: rgba(255,255,255,0.6);
  padding: 6px 15px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.8);
}

.stat-item strong {
  color: #007BFF;
}

/* 图谱容器 */
.graph-container-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 60px; /* 留出头部空间 */
  box-sizing: border-box;
}

.graph-container {
  width: 100%;
  height: 100%;
}

/* 关联资源悬浮弹窗 */
.resource-popup {
  position: absolute;
  width: 380px;
  max-height: 500px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 30px rgba(0, 30, 80, 0.15);
  border-radius: 12px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

.popup-header {
  padding: 15px 20px;
  background: linear-gradient(90deg, #5C98D3, #4DD0E1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.popup-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  opacity: 0.8;
}
.close-btn:hover { opacity: 1; }

.resource-list {
  padding: 15px;
  overflow-y: auto;
  flex: 1;
}

.resource-item {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.resource-item:hover {
  border-color: #4DD0E1;
  box-shadow: 0 4px 12px rgba(77, 208, 225, 0.2);
  transform: translateY(-2px);
}

.res-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.res-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
}
.icon-video { background: #FF5252; }
.icon-book { background: #448AFF; }
.icon-slides { background: #FF9800; }
.icon-paper { background: #8BC34A; }
.icon-politics { background: #E91E63; }
.icon-system { background: #9C27B0; }
.icon-code { background: #607D8B; }
.icon-audio { background: #00BCD4; }

.res-title {
  flex: 1;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.res-type-tag {
  font-size: 11px;
  background: #F0F4F8;
  color: #5C7B9E;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
}

.ai-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
  padding-left: 22px;
}

.ai-tag {
  display: flex;
  align-items: center;
  font-size: 11px;
  background: #E8F0FE;
  color: #1967D2;
  padding: 2px 8px;
  border-radius: 12px;
}

.ai-logo-text {
  background: #1967D2;
  color: white;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  margin-right: 4px;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 30px 0;
  font-size: 14px;
}

/* 资源预览模态框 */
.preview-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 10, 30, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-modal {
  width: 70%;
  height: 80%;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  overflow: hidden;
}

.preview-header {
  padding: 15px 25px;
  background: #1A3B5C;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 400;
}

.preview-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.ai-badge {
  background: rgba(255,255,255,0.2);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.preview-content {
  flex: 1;
  background: #f5f7fa;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-media {
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.preview-iframe {
  width: 100%;
  height: 100%;
  background: white;
}

.code-container {
  width: 100%;
  height: 100%;
  background: #1E1E1E;
  color: #D4D4D4;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
}

.audio-container {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

/* 动画效果 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.9); }
</style>
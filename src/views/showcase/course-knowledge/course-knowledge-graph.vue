<template>
  <div class="min-h-screen bg-[#f8fafc] p-6 font-sans text-slate-800 flex flex-col">
    
    <section class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[800px]">
      
      <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-slate-200 flex flex-col relative overflow-hidden">
        <h2 class="text-xl font-bold text-slate-800 mb-2 flex items-center z-10">
          <span class="w-1.5 h-6 bg-emerald-500 rounded-sm mr-2 inline-block"></span>
          知识图谱演练区 (层级树状图)
        </h2>
        <p class="text-sm text-slate-500 mb-4 z-10">
          支持鼠标滚轮缩放与拖拽平移。点击任意节点方块触发右侧资源引擎读取操作。
        </p>
        
        <div ref="chartRef" class="flex-1 w-full h-full z-0"></div>
        
        <div class="absolute bottom-4 left-6 text-xs text-slate-400 bg-white/90 px-2 py-1 rounded shadow-sm">
          * 当前树状数据已与底层八大类资源数据100%完成关联
        </div>
      </div>

      <div class="bg-gradient-to-b from-[#fdfbfb] to-[#f5f7fa] rounded-xl shadow-md border border-slate-200 flex flex-col overflow-hidden">
        <div class="bg-blue-900 text-white p-4">
          <h3 class="font-bold text-lg">关联教学资源</h3>
          <p class="text-blue-200 text-sm mt-1">
            当前节点: <span v-if="selectedNode" class="font-semibold text-emerald-300">{{ selectedNode.name }}</span>
            <span v-else>未选择</span>
          </p>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto">
          <div v-if="!selectedNode" class="h-full flex flex-col items-center justify-center text-slate-400">
            <div class="text-4xl mb-2">🖱️</div>
            <p>请在左侧图谱中点击实体节点</p>
          </div>

          <div v-else-if="relatedResources.length === 0" class="h-full flex flex-col items-center justify-center text-slate-400">
            <p>该节点暂无挂载底层资源数据</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="res in relatedResources" :key="res.id" class="bg-white border border-slate-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div class="flex justify-between items-start mb-2">
                <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-100">
                  {{ res.type }}
                </span>
                <button class="text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                  ▶ 播放/预览
                </button>
              </div>
              <h4 class="text-sm font-bold text-slate-800 mb-3">{{ res.title }}</h4>
              
              <div class="flex items-center gap-2 border-t border-slate-50 pt-2">
                <span class="text-[10px] text-slate-400">驱动支撑:</span>
                <div class="flex gap-1.5 flex-wrap">
                  <div v-for="tool in res.tools" :key="tool" class="flex items-center text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5" :title="`底层调用工具: ${tool}`">
                    <span class="w-3 h-3 rounded-full flex items-center justify-center text-[8px] mr-1" :class="AI_TOOLS[tool].color">
                      {{ AI_TOOLS[tool].logo }}
                    </span>
                    {{ tool }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// ---------------- 预设数据与映射 ----------------

// AI工具Logo与颜色映射
const AI_TOOLS = {
  '即梦AI': { color: 'bg-blue-500 text-white', logo: '✨' },
  'deepseek': { color: 'bg-blue-800 text-white', logo: '🐳' },
  '豆包': { color: 'bg-indigo-400 text-white', logo: '👩' },
  'Kimi': { color: 'bg-gray-800 text-white', logo: 'K' },
  'OpenMAIC': { color: 'bg-purple-600 text-white', logo: 'M' },
  '文心一言': { color: 'bg-blue-600 text-white', logo: 'G' }
};

// 构建具有立体光影效果的样式生成器
const get3DStyle = (colorCenter, colorEdge) => ({
  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
    { offset: 0, color: colorCenter },
    { offset: 1, color: colorEdge }
  ]),
  shadowBlur: 10,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffsetX: 3,
  shadowOffsetY: 3
});

// 知识图谱节点结构转换为 Tree 格式，使用方块尺寸 [宽, 高]
const treeData = {
  id: '0',
  name: '第一章 密码工程基础理论',
  symbolSize: [190, 45],
  itemStyle: get3DStyle('#60a5fa', '#1e3a8a'), // 蓝
  children: [
    {
      id: '1',
      name: '1.1 密码学核心概念',
      symbolSize: [160, 40],
      itemStyle: get3DStyle('#34d399', '#064e3b'), // 绿
      children: [
        {
          id: '2',
          name: '1.1.1 密码系统基本组成',
          symbolSize: [160, 40],
          itemStyle: get3DStyle('#fbbf24', '#78350f'), // 黄
          children: [
            { id: '4', name: '基本组成要素', symbolSize: [120, 35], itemStyle: get3DStyle('#a78bfa', '#4c1d95') }
          ]
        },
        {
          id: '3',
          name: '1.1.2 密码系统安全要求',
          symbolSize: [160, 40],
          itemStyle: get3DStyle('#fbbf24', '#78350f'), // 黄
          children: [
            { id: '5', name: '机密性', symbolSize: [100, 35], itemStyle: get3DStyle('#f87171', '#7f1d1d') },
            { id: '6', name: '完整性', symbolSize: [100, 35], itemStyle: get3DStyle('#f87171', '#7f1d1d') },
            { id: '7', name: '可用性', symbolSize: [100, 35], itemStyle: get3DStyle('#f87171', '#7f1d1d') },
            { id: '8', name: '不可否认性', symbolSize: [100, 35], itemStyle: get3DStyle('#f87171', '#7f1d1d') }
          ]
        }
      ]
    }
  ]
};

// 资源数据字典
const resourceMockDB = {
  '0': [
    { id: 1, type: '导学视频', title: '《密码工程》第一章导读', tools: ['即梦AI', '文心一言'] },
    { id: 2, type: '大纲文件', title: '密码工程基础理论教学大纲 PDF', tools: ['deepseek'] }
  ],
  '1': [
    { id: 101, type: '交互式视频', title: '密码学核心概念3D原理解析', tools: ['即梦AI', '豆包'] },
    { id: 102, type: '讲义课件', title: '1.1 章节核心PPT讲义', tools: ['Kimi'] },
    { id: 103, type: '思政案例', title: '国家商用密码发展史与国家安全', tools: ['文心一言'] }
  ],
  '2': [
    { id: 201, type: 'Demo程序', title: '核心加密算法交互演示程序', tools: ['deepseek', 'OpenMAIC'] },
    { id: 202, type: '随堂测验', title: '基本组成原理测验题库 (15题)', tools: ['豆包'] }
  ],
  '3': [
    { id: 301, type: '学术论文', title: '现代密码系统安全要求分析与综述', tools: ['Kimi', 'deepseek'] },
    { id: 302, type: '喜马拉雅音频', title: '大咖说密码：安全要求的四大支柱', tools: ['OpenMAIC'] }
  ],
  '4': [
    { id: 401, type: '图解资料', title: '明文、密文、密钥关系图', tools: ['即梦AI'] }
  ],
  '5': [
    { id: 501, type: '系统案例', title: '某银行系统安全架构机密性设计分析', tools: ['文心一言', '即梦AI'] }
  ],
  '6': [
    { id: 601, type: '原理解析', title: '哈希函数与数字签名技术基础', tools: ['Kimi'] }
  ],
  '7': [
    { id: 701, type: '工程实践', title: '密码机高可用部署方案', tools: ['deepseek'] }
  ],
  '8': [
    { id: 801, type: '案例分析', title: '电子合同中的不可否认性司法取证', tools: ['文心一言', '豆包'] }
  ]
};

// ---------------- 状态定义 ----------------
const chartRef = ref(null);
const selectedNode = ref(null);
const relatedResources = ref([]);
let myChart = null;

// ---------------- 图表初始化逻辑 ----------------
const handleResize = () => {
  if (myChart) myChart.resize();
};

const initChart = () => {
  myChart = echarts.init(chartRef.value);
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1e293b' }
    },
    series: [
      {
        type: 'tree',
        data: [treeData],
        top: '10%',
        left: '10%',
        bottom: '10%',
        right: '10%',
        symbol: 'roundRect', // 修改为圆角矩形
        symbolSize: (value, params) => params.data.symbolSize,
        edgeShape: 'curve',
        initialTreeDepth: 3,
        expandAndCollapse: false, // 关闭点击收起功能，确保只触发资源展示
        roam: true, // 开启鼠标缩放与拖拽平移支持
        label: {
          position: 'inside', // 标签完全内置于方块中
          align: 'center',
          verticalAlign: 'middle',
          fontSize: 13,
          fontWeight: 'bold',
          color: '#ffffff', // 方块内部使用白色字体提升对比度
          width: 180,
          overflow: 'truncate'
        },
        animationDuration: 550,
        animationDurationUpdate: 750,
        lineStyle: {
          color: '#cbd5e1',
          width: 2,
          curveness: 0.5
        }
      }
    ]
  };

  myChart.setOption(option);

  // 绑定节点点击事件：由于关闭了 expandAndCollapse，点击仅用于交互数据的读取
  myChart.on('click', function (params) {
    if (params.dataType === 'node') {
      selectedNode.value = params.data;
      relatedResources.value = resourceMockDB[params.data.id] || [];
    }
  });

  window.addEventListener('resize', handleResize);
};

// ---------------- 生命周期 ----------------
onMounted(() => {
  initChart();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (myChart) myChart.dispose();
});
</script>
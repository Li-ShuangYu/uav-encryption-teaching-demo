<template>
  <div class="flex flex-col flex-1 h-screen overflow-hidden bg-[#121417] text-[#d1d5db] select-none">
    
    <header class="h-16 shrink-0 border-b border-[#2d353e] bg-[#1c2126] flex items-center justify-between px-6 shadow-md z-10">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-[#23b586] rounded-full"></div>
        <h1 class="text-xl font-bold text-white tracking-wide">无人机通信加密 - 4 组方案分屏</h1>
      </div>
      <div class="flex gap-4 items-center">
        <button class="btn-agent bg-[#1c2126] border border-[#00e5ff] text-[#00e5ff] px-5 py-2 rounded transition-colors flex items-center gap-2 font-bold hover:bg-[#00e5ff] hover:text-black">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          架构评审 Agent
        </button>
        <button class="bg-[#1c2126] hover:bg-[#232930] text-white text-sm px-4 py-2 rounded border border-[#2d353e] transition">
          刷新数据
        </button>
        <button class="bg-[#23b586] hover:bg-[#1a8a66] text-white px-5 py-2 rounded shadow transition-colors flex items-center gap-2 font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          导出方案
        </button>
      </div>
    </header>

    <main class="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4 h-full overflow-hidden">
      
      <div class="bg-[#1c2126] border border-[#2d353e] rounded-lg flex flex-col shadow-lg overflow-hidden">
        <div class="px-4 py-3 border-b border-[#2d353e] bg-[#232930] flex justify-between items-center z-10 shrink-0">
          <h2 class="font-bold text-[#3b82f6] flex items-center gap-2 text-lg">
            <span class="bg-[#3b82f6]/20 text-[#3b82f6] text-xs px-2 py-0.5 rounded">第一组</span> 
            SM4+SM3 国密组合方案
          </h2>
          <span class="bg-[#23b586]/20 text-[#23b586] text-xs px-2 py-1 rounded">已提交锁定</span>
        </div>
        <div class="flex-1 flex flex-col overflow-hidden">
          <div class="h-[55%] w-full bg-[#121417]/50 relative border-b border-[#2d353e]">
            <div class="absolute top-2 left-4 text-xs text-[#6b7280] z-10">方案架构拓扑预览</div>
            <div ref="chart1Ref" class="w-full h-full"></div>
          </div>
          <div class="h-[45%] overflow-y-auto p-3 space-y-3 custom-scrollbar">
            <div class="bg-[#232930] rounded p-3 border border-[#2d353e]">
              <div class="text-xs text-[#6b7280] mb-1">方案名称：轻量级加密通信方案</div>
              <div class="text-sm text-gray-200 mb-2">基于 AES-128 算法，结合硬件加速模块，实现低功耗、高安全性的通信加密。</div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#6b7280]">提交时间：2026-04-01</span>
                <button class="text-[#23b586] hover:underline">查看详情</button>
              </div>
            </div>
            <div class="bg-[#232930] rounded p-3 border border-[#2d353e]">
              <div class="text-xs text-[#6b7280] mb-1">方案名称：密钥管理优化方案</div>
              <div class="text-sm text-gray-200 mb-2">采用分层密钥管理策略，结合预共享密钥和会话密钥，减少密钥更新频率，降低功耗。</div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#6b7280]">提交时间：2026-04-01</span>
                <button class="text-[#23b586] hover:underline">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#1c2126] border border-[#2d353e] rounded-lg flex flex-col shadow-lg overflow-hidden">
        <div class="px-4 py-3 border-b border-[#2d353e] bg-[#232930] flex justify-between items-center z-10 shrink-0">
          <h2 class="font-bold text-[#ef4444] flex items-center gap-2 text-lg">
            <span class="bg-[#ef4444]/20 text-[#ef4444] text-xs px-2 py-0.5 rounded">第二组</span> 
            纯 RSA 非对称加密方案
          </h2>
          <span class="bg-[#23b586]/20 text-[#23b586] text-xs px-2 py-1 rounded">已提交锁定</span>
        </div>
        <div class="flex-1 flex flex-col overflow-hidden">
          <div class="h-[55%] w-full bg-[#121417]/50 relative border-b border-[#2d353e]">
            <div class="absolute top-2 left-4 text-xs text-[#6b7280] z-10">方案架构拓扑预览</div>
            <div ref="chart2Ref" class="w-full h-full"></div>
          </div>
          <div class="h-[45%] overflow-y-auto p-3 space-y-3 custom-scrollbar">
            <div class="bg-[#232930] rounded p-3 border border-[#2d353e]">
              <div class="text-xs text-[#6b7280] mb-1">方案名称：侧信道防护方案</div>
              <div class="text-sm text-gray-200 mb-2">采用掩码技术和随机化执行路径，有效防护功耗分析和时序攻击。</div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#6b7280]">提交时间：2026-04-01</span>
                <button class="text-[#23b586] hover:underline">查看详情</button>
              </div>
            </div>
            <div class="bg-[#232930] rounded p-3 border border-[#2d353e]">
              <div class="text-xs text-[#6b7280] mb-1">方案名称：防重放攻击机制</div>
              <div class="text-sm text-gray-200 mb-2">基于时间戳和挑战-响应机制，实现高效的防重放攻击保护。</div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#6b7280]">提交时间：2026-04-01</span>
                <button class="text-[#23b586] hover:underline">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#1c2126] border border-[#2d353e] rounded-lg flex flex-col shadow-lg overflow-hidden">
        <div class="px-4 py-3 border-b border-[#2d353e] bg-[#232930] flex justify-between items-center z-10 shrink-0">
          <h2 class="font-bold text-[#f59e0b] flex items-center gap-2 text-lg">
            <span class="bg-[#f59e0b]/20 text-[#f59e0b] text-xs px-2 py-0.5 rounded">第三组</span> 
            轻量级流密码方案
          </h2>
          <span class="bg-[#23b586]/20 text-[#23b586] text-xs px-2 py-1 rounded">已提交锁定</span>
        </div>
        <div class="flex-1 flex flex-col overflow-hidden">
          <div class="h-[55%] w-full bg-[#121417]/50 relative border-b border-[#2d353e]">
            <div class="absolute top-2 left-4 text-xs text-[#6b7280] z-10">方案架构拓扑预览</div>
            <div ref="chart3Ref" class="w-full h-full"></div>
          </div>
          <div class="h-[45%] overflow-y-auto p-3 space-y-3 custom-scrollbar">
            <div class="bg-[#232930] rounded p-3 border border-[#2d353e]">
              <div class="text-xs text-[#6b7280] mb-1">方案名称：双向身份认证方案</div>
              <div class="text-sm text-gray-200 mb-2">基于 ECC 算法的轻量级双向身份认证，认证时延控制在 5ms 以内。</div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#6b7280]">提交时间：2026-04-01</span>
                <button class="text-[#23b586] hover:underline">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#1c2126] border border-[#2d353e] rounded-lg flex flex-col shadow-lg overflow-hidden">
        <div class="px-4 py-3 border-b border-[#2d353e] bg-[#232930] flex justify-between items-center z-10 shrink-0">
          <h2 class="font-bold text-[#8b5cf6] flex items-center gap-2 text-lg">
            <span class="bg-[#8b5cf6]/20 text-[#8b5cf6] text-xs px-2 py-0.5 rounded">第四组</span> 
            区块链分布式防护方案
          </h2>
          <span class="bg-[#23b586]/20 text-[#23b586] text-xs px-2 py-1 rounded">已提交锁定</span>
        </div>
        <div class="flex-1 flex flex-col overflow-hidden">
          <div class="h-[55%] w-full bg-[#121417]/50 relative border-b border-[#2d353e]">
            <div class="absolute top-2 left-4 text-xs text-[#6b7280] z-10">方案架构拓扑预览</div>
            <div ref="chart4Ref" class="w-full h-full"></div>
          </div>
          <div class="h-[45%] overflow-y-auto p-3 space-y-3 custom-scrollbar">
            <div class="bg-[#232930] rounded p-3 border border-[#2d353e]">
              <div class="text-xs text-[#6b7280] mb-1">方案名称：后量子加密适配方案</div>
              <div class="text-sm text-gray-200 mb-2">基于 LWE 问题的后量子加密算法，针对嵌入式芯片进行优化，确保兼容性。</div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#6b7280]">提交时间：2026-04-01</span>
                <button class="text-[#23b586] hover:underline">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';

// 图表容器 Refs
const chart1Ref = ref(null);
const chart2Ref = ref(null);
const chart3Ref = ref(null);
const chart4Ref = ref(null);

let charts = [];

// 辅助函数：生成关系图配置
const createTopologyOption = (nodes, links, color) => {
  return {
    animation: false,
    tooltip: {},
    grid: { top: 30, bottom: 10, left: 10, right: 10 },
    series: [{
      type: 'graph',
      layout: 'none',
      symbolSize: 40,
      roam: false,
      label: { show: true, position: 'bottom', color: '#d1d5db', fontSize: 11 },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 8],
      edgeLabel: { fontSize: 10 },
      itemStyle: {
        color: color,
        shadowColor: color,
        shadowBlur: 10,
        borderColor: '#fff',
        borderWidth: 1
      },
      lineStyle: { color: '#6b7280', width: 2, curveness: 0.2 },
      data: nodes,
      links: links
    }]
  };
};

// 窗口调整大小时自动重绘图表
const handleResize = () => {
  charts.forEach(chart => chart.resize());
};

onMounted(() => {
  nextTick(() => {
    // 1. 第一组：国密组合方案
    const chart1 = echarts.init(chart1Ref.value);
    chart1.setOption(createTopologyOption(
      [
        { name: '无人机', x: 100, y: 300 },
        { name: 'SM4加密', x: 300, y: 300 },
        { name: 'SM3摘要', x: 500, y: 200 },
        { name: '地面站', x: 700, y: 300 }
      ],
      [
        { source: '无人机', target: 'SM4加密' },
        { source: 'SM4加密', target: 'SM3摘要', lineStyle: { curveness: -0.2 } },
        { source: 'SM4加密', target: '地面站' },
        { source: 'SM3摘要', target: '地面站', lineStyle: { curveness: -0.2 } }
      ],
      '#3b82f6' // 蓝色
    ));
    charts.push(chart1);

    // 2. 第二组：纯RSA非对称加密
    const chart2 = echarts.init(chart2Ref.value);
    chart2.setOption(createTopologyOption(
      [
        { name: '无人机集群', x: 200, y: 300, symbolSize: 50 },
        { name: 'RSA公钥库', x: 400, y: 150, symbol: 'rect', symbolSize: [60, 30] },
        { name: '高负荷解密中心', x: 600, y: 300, symbolSize: 60 }
      ],
      [
        { source: '无人机集群', target: 'RSA公钥库', lineStyle: { curveness: -0.2 } },
        { source: 'RSA公钥库', target: '高负荷解密中心', lineStyle: { curveness: -0.2 } },
        { source: '无人机集群', target: '高负荷解密中心', lineStyle: { type: 'dashed' } }
      ],
      '#ef4444' // 红色
    ));
    charts.push(chart2);

    // 3. 第三组：轻量级流密码
    const chart3 = echarts.init(chart3Ref.value);
    chart3.setOption(createTopologyOption(
      [
        { name: '终端A', x: 150, y: 200 },
        { name: '终端B', x: 150, y: 400 },
        { name: '流密码发生器', x: 400, y: 300, symbol: 'diamond', symbolSize: 50 },
        { name: '接收端', x: 650, y: 300 }
      ],
      [
        { source: '终端A', target: '流密码发生器' },
        { source: '终端B', target: '流密码发生器' },
        { source: '流密码发生器', target: '接收端', lineStyle: { width: 4 } }
      ],
      '#f59e0b' // 橙色
    ));
    charts.push(chart3);

    // 4. 第四组：区块链分布式
    const chart4 = echarts.init(chart4Ref.value);
    chart4.setOption(createTopologyOption(
      [
        { name: '节点1', x: 400, y: 150 },
        { name: '节点2', x: 600, y: 250 },
        { name: '节点3', x: 500, y: 450 },
        { name: '节点4', x: 300, y: 450 },
        { name: '节点5', x: 200, y: 250 }
      ],
      [
        { source: '节点1', target: '节点2' },
        { source: '节点2', target: '节点3' },
        { source: '节点3', target: '节点4' },
        { source: '节点4', target: '节点5' },
        { source: '节点5', target: '节点1' },
        { source: '节点1', target: '节点4', lineStyle: { type: 'dashed' } },
        { source: '节点2', target: '节点5', lineStyle: { type: 'dashed' } }
      ],
      '#8b5cf6' // 紫色
    ));
    charts.push(chart4);

    window.addEventListener('resize', handleResize);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  charts.forEach(chart => chart.dispose());
});
</script>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #2d353e;
  border-radius: 4px;
}

/* Agent 按钮呼吸灯效果 */
.btn-agent {
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.3), inset 0 0 5px rgba(0, 229, 255, 0.2);
  animation: pulse-glow 2s infinite;
}
@keyframes pulse-glow {
  0% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.3), inset 0 0 5px rgba(0, 229, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.6), inset 0 0 10px rgba(0, 229, 255, 0.4); }
  100% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.3), inset 0 0 5px rgba(0, 229, 255, 0.2); }
}
</style>
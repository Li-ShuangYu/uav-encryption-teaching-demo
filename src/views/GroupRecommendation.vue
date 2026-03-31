<template>
  <div class="h-screen flex flex-col items-center justify-center overflow-hidden relative bg-[#0F172A] text-gray-200 font-sans">
    
    <div class="absolute inset-0 z-0 pointer-events-none" style="background-image: linear-gradient(rgba(51, 65, 85, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 65, 85, 0.4) 1px, transparent 1px); background-size: 40px 40px;"></div>
    
    <div class="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <div 
        v-for="i in 30" 
        :key="i"
        class="absolute w-[3px] h-[3px] bg-[#38BDF8] rounded-full opacity-0"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animation: `floatUp ${Math.random() * 5 + 3}s linear infinite`,
          animationDelay: `${Math.random() * 2}s`
        }"
      ></div>
    </div>

    <div class="w-full h-full p-6 md:p-8 lg:p-10 flex flex-col gap-6 relative z-10 fade-in">
      
      <header class="flex justify-between items-center px-8 py-4 rounded-[16px] border border-slate-700 z-10" style="background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(20px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);">
        <h1 class="text-[28px] font-extrabold text-white tracking-[2px] m-0 flex items-center gap-3">
          <div class="w-2 h-8 bg-blue-500 rounded-full"></div>
          优势能力分层 —— 协作分组建议
        </h1>
        <div class="text-[16px] font-semibold text-slate-400">基于系统多维数据画像，为您推荐的三类角色储备池</div>
      </header>

      <main class="flex-1 flex gap-6 min-h-0 z-10">
        
        <div class="flex-1 flex flex-col rounded-[16px] border border-slate-700 overflow-hidden category-panel group relative" style="background: rgba(30, 41, 59, 0.65); backdrop-filter: blur(20px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);">
          <div class="px-6 py-5 border-b border-slate-700 relative overflow-hidden shrink-0">
            <div class="absolute bottom-0 left-0 h-[3px] w-full bg-[#3B82F6]"></div>
            <div class="text-[24px] font-extrabold text-[#3B82F6] flex items-center gap-[10px] mb-2">🧠 理论解析型</div>
            <div class="text-[14px] text-slate-400 leading-relaxed font-medium">擅长文献查阅、需求分析、逻辑重构与系统方案的理论推演。</div>
            <div class="absolute top-6 right-6 text-[14px] font-bold text-slate-300 bg-slate-800 border border-slate-600 px-3 py-1 rounded-full shadow-inner">储备 {{ theoryStudents.length }} 人</div>
          </div>
          <div class="w-full h-[220px] shrink-0 border-b border-slate-800/50 bg-slate-900/30">
            <div ref="theoryChartRef" class="w-full h-full"></div>
          </div>
          <div class="flex-1 p-6 overflow-y-auto flex content-start flex-wrap gap-[14px] custom-scrollbar">
            <div 
              v-for="(student, index) in theoryStudents" :key="index"
              class="flex items-center justify-between px-4 py-2 rounded-lg text-[16px] font-bold transition-colors w-[calc(50%-7px)] border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA] hover:bg-[#3B82F6]/20"
            >
              <span class="tracking-[1px]">{{ student.name }}</span>
              <span class="text-[13px] font-extrabold opacity-80 font-mono">{{ student.score }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col rounded-[16px] border border-slate-700 overflow-hidden category-panel group relative" style="background: rgba(30, 41, 59, 0.65); backdrop-filter: blur(20px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);">
          <div class="px-6 py-5 border-b border-slate-700 relative overflow-hidden shrink-0">
            <div class="absolute bottom-0 left-0 h-[3px] w-full bg-[#10B981]"></div>
            <div class="text-[24px] font-extrabold text-[#10B981] flex items-center gap-[10px] mb-2">🛠️ 实践攻坚型</div>
            <div class="text-[14px] text-slate-400 leading-relaxed font-medium">擅长平台仿真操作、代码逻辑编写、流程图绘制及漏洞排查。</div>
            <div class="absolute top-6 right-6 text-[14px] font-bold text-slate-300 bg-slate-800 border border-slate-600 px-3 py-1 rounded-full shadow-inner">储备 {{ practiceStudents.length }} 人</div>
          </div>
          <div class="w-full h-[220px] shrink-0 border-b border-slate-800/50 bg-slate-900/30">
            <div ref="practiceChartRef" class="w-full h-full"></div>
          </div>
          <div class="flex-1 p-6 overflow-y-auto flex content-start flex-wrap gap-[14px] custom-scrollbar">
            <div 
              v-for="(student, index) in practiceStudents" :key="index"
              class="flex items-center justify-between px-4 py-2 rounded-lg text-[16px] font-bold transition-colors w-[calc(50%-7px)] border border-[#10B981]/30 bg-[#10B981]/10 text-[#34D399] hover:bg-[#10B981]/20"
            >
              <span class="tracking-[1px]">{{ student.name }}</span>
              <span class="text-[13px] font-extrabold opacity-80 font-mono">{{ student.score }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col rounded-[16px] border border-slate-700 overflow-hidden category-panel group relative" style="background: rgba(30, 41, 59, 0.65); backdrop-filter: blur(20px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);">
          <div class="px-6 py-5 border-b border-slate-700 relative overflow-hidden shrink-0">
            <div class="absolute bottom-0 left-0 h-[3px] w-full bg-[#8B5CF6]"></div>
            <div class="text-[24px] font-extrabold text-[#8B5CF6] flex items-center gap-[10px] mb-2">🎯 组织统筹型</div>
            <div class="text-[14px] text-slate-400 leading-relaxed font-medium">擅长组内分工协调、进度把控、成果提报及与 AI 工具的高效交互。</div>
            <div class="absolute top-6 right-6 text-[14px] font-bold text-slate-300 bg-slate-800 border border-slate-600 px-3 py-1 rounded-full shadow-inner">储备 {{ orgStudents.length }} 人</div>
          </div>
          <div class="w-full h-[220px] shrink-0 border-b border-slate-800/50 bg-slate-900/30">
            <div ref="orgChartRef" class="w-full h-full"></div>
          </div>
          <div class="flex-1 p-6 overflow-y-auto flex content-start flex-wrap gap-[14px] custom-scrollbar">
            <div 
              v-for="(student, index) in orgStudents" :key="index"
              class="flex items-center justify-between px-4 py-2 rounded-lg text-[16px] font-bold transition-colors w-[calc(50%-7px)] border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#A78BFA] hover:bg-[#8B5CF6]/20"
            >
              <span class="tracking-[1px]">{{ student.name }}</span>
              <span class="text-[13px] font-extrabold opacity-80 font-mono">{{ student.score }}</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

// DOM Refs for ECharts
const theoryChartRef = ref(null);
const practiceChartRef = ref(null);
const orgChartRef = ref(null);

let charts = [];

// ================= 数据源 =================
const theoryStudents = ref([
  { name: '张晓明', score: '内化95' }, { name: '李华', score: '内化94' },
  { name: '王建国', score: '逻辑92' }, { name: '陈思远', score: '内化90' },
  { name: '赵梦琪', score: '解析89' }, { name: '刘星宇', score: '逻辑88' },
  { name: '孙佳琪', score: '内化88' }, { name: '周杰', score: '解析85' },
  { name: '吴浩然', score: '解析84' }, { name: '郑爽', score: '内化82' }
]);

const practiceStudents = ref([
  { name: '陈梓轩', score: '实践98' }, { name: '林俊宇', score: '实践95' },
  { name: '何宇航', score: '攻坚94' }, { name: '高明', score: '操作92' },
  { name: '马云飞', score: '实践90' }, { name: '罗文', score: '攻坚89' },
  { name: '宋建', score: '实践88' }, { name: '许诺', score: '操作87' },
  { name: '邓超', score: '攻坚86' }, { name: '萧炎', score: '实践85' },
  { name: '冯宝宝', score: '操作84' }, { name: '叶凡', score: '攻坚82' }
]);

const orgStudents = ref([
  { name: '张三丰', score: '统筹97' }, { name: '黄蓉', score: '协同96' },
  { name: '郭靖', score: '履约94' }, { name: '杨过', score: '统筹92' },
  { name: '小龙女', score: '协同90' }, { name: '楚留香', score: '规划89' },
  { name: '陆小凤', score: '协同88' }, { name: '花满楼', score: '统筹85' },
  { name: '李寻欢', score: '规划84' }, { name: '阿飞', score: '履约82' }
]);

// ================= ECharts 初始化 =================
const initCharts = () => {
  // 1. 理论型 - 雷达图
  const theoryChart = echarts.init(theoryChartRef.value);
  theoryChart.setOption({
    tooltip: {},
    radar: {
      indicator: [
        { name: '逻辑推演', max: 100 }, { name: '知识内化', max: 100 },
        { name: '文献剖析', max: 100 }, { name: '需求重构', max: 100 }, { name: '概念提取', max: 100 }
      ],
      radius: '65%', center: ['50%', '50%'],
      axisName: { color: '#94A3B8', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(59, 130, 246, 0.2)' } },
      splitArea: { show: true, areaStyle: { color: ['transparent'] } },
      axisLine: { lineStyle: { color: 'rgba(59, 130, 246, 0.3)' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: [92, 95, 88, 85, 90], name: '群体平均能力',
        itemStyle: { color: '#3B82F6' },
        areaStyle: { color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{ offset: 0, color: 'rgba(59, 130, 246, 0.1)' }, { offset: 1, color: 'rgba(59, 130, 246, 0.5)' }]) },
        lineStyle: { width: 2, color: '#3B82F6' },
        label: { show: true, color: '#60A5FA', fontSize: 12, fontWeight: 'bold', formatter: '{c}' }
      }]
    }]
  });

  // 2. 实践型 - 水平条形图
  const practiceChart = echarts.init(practiceChartRef.value);
  practiceChart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { top: 20, bottom: 20, left: 80, right: 30 },
    xAxis: { type: 'value', max: 100, splitLine: { show: true, lineStyle: { color: 'rgba(16, 185, 129, 0.1)' } }, axisLabel: { show: false } },
    yAxis: { 
      type: 'category', 
      data: ['故障排查', '平台仿真', '逻辑编码', '系统落地'],
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold' }
    },
    series: [{
      name: '群体平均分', type: 'bar', barWidth: '45%',
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: 'rgba(16, 185, 129, 0.2)' },
          { offset: 1, color: '#10B981' }
        ])
      },
      label: { show: true, position: 'right', color: '#34D399', fontWeight: 'bold', formatter: '{c}分' },
      data: [86, 95, 90, 88]
    }]
  });

  // 3. 组织型 - 极简科技环形图
  const orgChart = echarts.init(orgChartRef.value);
  orgChart.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: '#94A3B8', fontSize: 11 }, icon: 'circle', itemWidth: 8 },
    series: [{
      name: '核心特质分布', type: 'pie',
      radius: ['45%', '70%'], center: ['50%', '42%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 4, borderColor: 'rgba(30, 41, 59, 1)', borderWidth: 2 },
      label: { show: true, position: 'outside', color: '#A78BFA', fontSize: 11, fontWeight: 'bold', formatter: '{b}\n{c}%' },
      labelLine: { show: true, lineStyle: { color: 'rgba(139, 92, 246, 0.3)' } },
      data: [
        { value: 35, name: '进度统筹', itemStyle: { color: '#8B5CF6' } },
        { value: 25, name: 'AI人机交互', itemStyle: { color: '#C084FC' } },
        { value: 20, name: '冲突协调', itemStyle: { color: '#E879F9' } },
        { value: 20, name: '成果汇报', itemStyle: { color: '#6366F1' } }
      ]
    }]
  });

  charts = [theoryChart, practiceChart, orgChart];
};

const handleResize = () => charts.forEach(chart => chart.resize());

onMounted(() => {
  initCharts();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  charts.forEach(chart => chart.dispose());
});
</script>

<style scoped>
/* 悬浮粒子动画 */
@keyframes floatUp {
  0% { transform: translateY(0); opacity: 0; }
  50% { opacity: 0.2; }
  100% { transform: translateY(-120px); opacity: 0; }
}

/* 整体淡入动画 */
.fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 卡片悬浮特效 */
.category-panel {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.category-panel:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.4) !important;
}

/* 隐藏原生滚动条，美化自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.3); border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.6); }
</style>
<template>
  <div class="diagnostic-report-wrapper">
    <div class="top-bar">
      <span class="tb-label">学情诊断可视化报告 - 数据源：</span>
      
      <select v-model="selectedClass" @change="handleClassChange" class="tb-select" style="margin-right: 8px;">
        <option v-for="cls in availableClasses" :key="cls" :value="cls">{{ cls }}</option>
      </select>

      <select v-model="currentStudentId" @change="handleStudentChange" class="tb-select">
        <option value="CLASS_AVG">📊 【{{ selectedClass }} 班级平均画像】</option>
        <option v-for="stu in filteredStudents" :key="stu.学号" :value="stu.学号">
          {{ stu.姓名 }} ({{ stu.优势基因 }})
        </option>
      </select>

      <span class="tb-score">综合得分：<b>{{ currentStudentData?.综合得分 || 0 }}</b> 分</span>
    </div>

    <div class="screen-container">
      <div class="indicator-row" v-for="(l2Dict, l1Name) in l1ToL2Mapping" :key="l1Name">
        
        <div class="left-panel">
          <div class="level-1-title">{{ l1Name }}</div>
          <div class="charts-wrapper">
            
            <div class="chart-module" v-for="(l3Keys, l2Name) in l2Dict" :key="l2Name">
              <div class="level-2-title">{{ l2Name }}</div>
              <div class="chart-box" :ref="el => setChartRef(el, l1Name, l2Name)"></div>
            </div>

          </div>
        </div>

        <div class="right-panel">
          <div class="summary-content">
            <div class="summary-item">
              <span class="tag">优势特征</span>
              <p>
                <b>【{{ getExtremes(l1Name, 'max').name }}】</b>表现优异（{{ getExtremes(l1Name, 'max').score }}分）。
                <br/>系统记录：{{ getExtremes(l1Name, 'max').behavior }}
              </p>
            </div>
            <div class="summary-item">
              <span class="tag" style="color:#d9363e;">薄弱环节</span>
              <p>
                <b>【{{ getExtremes(l1Name, 'min').name }}】</b>亟待提升（{{ getExtremes(l1Name, 'min').score }}分）。
                <br/>干预提示：{{ getExtremes(l1Name, 'min').behavior }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import * as echarts from 'echarts';
import studentData from './student_profiles_data.json'; 
import classStats from './class_and_grade_stats.json'; 

// ================= 数据初始化与联动逻辑 =================
const allStudents = ref(studentData);

const availableClasses = Object.keys(classStats).filter(k => k !== '年级全体');
const selectedClass = ref(availableClasses[0] || '3DK22-1');

const filteredStudents = computed(() => {
  return allStudents.value.filter(s => s.班级 === selectedClass.value);
});

const currentStudentId = ref('CLASS_AVG');

const currentStudentData = computed(() => {
  if (currentStudentId.value === 'CLASS_AVG') {
    const clsData = classStats[selectedClass.value]?.['课次十'];
    if (!clsData) return null;

    let totalScore = 0, count = 0;
    const pseudoSession = {};
    
    for (const l1 in l1ToL2Mapping) {
      const l1Data = clsData[l1];
      let l3_details = {};
      if (l1Data && l1Data.l2) {
         for (const l2 in l1Data.l2) {
           Object.assign(l3_details, l1Data.l2[l2].l3_details);
         }
      }
      pseudoSession[l1] = {
        l1_avg: l1Data?.l1_avg || 0,
        l3_details: l3_details,
        l3_behaviors: {} 
      };
      totalScore += l1Data?.l1_avg || 0;
      count++;
    }

    return {
      学号: 'CLASS_AVG',
      姓名: `${selectedClass.value} 全班均值`,
      班级: selectedClass.value,
      优势基因: '班级综合特征',
      综合得分: count ? (totalScore / count).toFixed(1) : 0,
      sessions: { '课次十': pseudoSession }
    };
  }
  
  return allStudents.value.find(s => s.学号 === currentStudentId.value) || null;
});

const handleClassChange = () => {
  currentStudentId.value = 'CLASS_AVG';
  nextTick(() => { renderCharts(); });
};

const handleStudentChange = () => {
  nextTick(() => { renderCharts(); });
};

// ================= 指标结构与图表映射 =================
const l1ToL2Mapping = {
  'AI素养': { '课前探究': ['AI工具预习使用率', 'AI生成预习资料利用率'], '课堂交互': ['课堂AI互动工具参与率', 'AI内容提问质量'], '课后拓展': ['课后AI作业辅助使用率', 'AI推荐拓展内容学习时长'] },
  '学业水平': { '知识掌握': ['知识内化率', '知识长效巩固度', '知识迁移应用度'], '题型攻坚': ['基础概念解析率', '逻辑表达与重构率', '复杂问题攻坚率'], '学科能力': ['多模态信息提取力', '科学逻辑推理力', '实践操作验证力'] },
  '科学思维': { '思维敏捷': ['信息处理响应度', '限时抗压效能'], '批判发散': ['批判质疑探究度', '多向思维发散度'], '自我认知': ['自我认知校准度', '深度归因复盘率'] },
  '调控能力': { '时间规划': ['任务节奏适配度', '全局效能把控度'], '测评应对': ['风险规避调控率', '审慎核验校验率'], '绩效抗压': ['绩效表现波动率', '操作细节严谨度'] }, 
  '社会协同': { '个性潜能': ['个性化优势区', '待唤醒提升区'], '发展增值': ['自我超越增值度', '群体竞争位移度'], '团队协同': ['团队协同贡献比', '朋辈互助辐射度'] }
};

const chartConfigMap = {
  '课前探究': { type: 'line', color: '#1890ff' }, '课堂交互': { type: 'bar', color: '#1890ff' }, '课后拓展': { type: 'pie', color: '#1890ff' },
  '知识掌握': { type: 'radar', color: '#52c41a' }, '题型攻坚': { type: 'line', color: '#52c41a' }, '学科能力': { type: 'radar', color: '#52c41a' },
  '思维敏捷': { type: 'bar', color: '#faad14' }, '批判发散': { type: 'bar', color: '#722ed1' }, '自我认知': { type: 'bar', color: '#eb2f96' },
  '时间规划': { type: 'pie', color: '#1890ff' }, '测评应对': { type: 'line', color: '#13c2c2' }, '绩效抗压': { type: 'bar', color: '#faad14' },
  '个性潜能': { type: 'bar', color: '#1890ff' }, '发展增值': { type: 'bar', color: '#52c41a' }, '团队协同': { type: 'pie', color: '#faad14' }
};

const getExtremes = (l1Name, type) => {
  if (!currentStudentData.value) return { name: '-', score: 0, behavior: '-' };
  const session = currentStudentData.value.sessions['课次十'];
  if (!session || !session[l1Name]) return { name: '-', score: 0, behavior: '-' };

  const details = session[l1Name].l3_details;
  const behaviors = session[l1Name].l3_behaviors || {}; 
  
  let targetKey = Object.keys(details)[0];
  let targetScore = details[targetKey];

  for (const [k, v] of Object.entries(details)) {
    if (type === 'max' && v > targetScore) { targetScore = v; targetKey = k; }
    if (type === 'min' && v < targetScore) { targetScore = v; targetKey = k; }
  }

  // 修改点 1 (实现部分)：直接返回完整名称，废除 substr 截断逻辑
  const shortName = targetKey; 
  
  const fallbackBehavior = currentStudentId.value === 'CLASS_AVG' 
      ? (type === 'max' ? '班级整体在该项指标上表现出强劲的集体优势。' : '班级整体在该项指标上存在共性短板，需规划集体干预。')
      : (type === 'max' ? '该项能力表现出众，建议保持现有学习节奏。' : '该项为当前短板，需重点关注并加强训练。');

  return {
    name: shortName,
    score: targetScore,
    behavior: behaviors[targetKey] || fallbackBehavior
  };
};

// ================= ECharts 渲染逻辑 =================
const chartInstances = {};
const domRefs = {};

const setChartRef = (el, l1, l2) => {
  if (el) domRefs[`${l1}-${l2}`] = el;
};

const simpleGrid = { top: '25%', bottom: '15%', left: '2%', right: '2%', containLabel: true };

const renderCharts = () => {
  if (!currentStudentData.value) return;
  const sessionData = currentStudentData.value.sessions['课次十'];
  if (!sessionData) return;

  for (const l1 in l1ToL2Mapping) {
    for (const l2 in l1ToL2Mapping[l1]) {
      const dom = domRefs[`${l1}-${l2}`];
      if (!dom) continue;

      let chart = chartInstances[`${l1}-${l2}`];
      if (!chart) {
        chart = echarts.init(dom);
        chartInstances[`${l1}-${l2}`] = chart;
      }

      const l3Keys = l1ToL2Mapping[l1][l2];
      const l3Values = l3Keys.map(k => sessionData[l1]?.l3_details[k] || 0);
      const config = chartConfigMap[l2] || { type: 'bar', color: '#1890ff' };

      const formattedKeys = l3Keys.map(k => k.length > 5 ? k.substring(0,4) + '\n' + k.substring(4) : k);
      let option = {};

      if (config.type === 'bar' || config.type === 'line') {
        option = {
          animation: true, grid: simpleGrid, tooltip: { show: true, formatter: '{b}: {c}分' },
          xAxis: { type: 'category', data: formattedKeys, axisLabel: { fontSize: 10, fontWeight: 'bold', interval: 0, color: '#444' }, axisTick: { show: false }, axisLine: { lineStyle: { color: '#ccc' } } },
          yAxis: { type: 'value', min: 0, max: 100, splitLine: { lineStyle: { type: 'dashed', color: '#f0f0f0' } }, axisLabel: { show: false } },
          series: [{
            data: l3Values, type: config.type,
            barWidth: '40%', symbol: 'circle', symbolSize: 6,
            lineStyle: config.type === 'line' ? { color: config.color, width: 2 } : undefined,
            itemStyle: config.type === 'bar' ? { color: config.color, borderRadius: [2, 2, 0, 0] } : { color: config.color, borderColor: '#fff', borderWidth: 1 },
            label: { show: true, position: 'top', color: '#111', fontSize: 11, fontWeight: '900', formatter: '{c}分' }
          }]
        };
      } 
      else if (config.type === 'radar') {
        const indicators = l3Keys.map((k, idx) => ({ name: k + '\n' + l3Values[idx] + '分', max: 100 }));
        option = {
          animation: true, tooltip: { show: true },
          radar: { 
            indicator: indicators, 
            // 修改点 2：将雷达图 center 的 Y 轴坐标从 '55%' 下沉至 '62%'，并将半径微调至 '48%'
            center: ['50%', '62%'], 
            radius: '48%', 
            axisName: { color: '#111', fontSize: 10, fontWeight: '900', lineHeight: 12 }, 
            splitLine: { lineStyle: { color: '#e8e8e8' } }, splitArea: { show: false }, axisLine: { lineStyle: { color: '#e8e8e8' } }
          },
          series: [{
            type: 'radar', symbol: 'circle', symbolSize: 4,
            lineStyle: { color: config.color, width: 2 }, itemStyle: { color: config.color }, areaStyle: { color: `${config.color}33` }, 
            data: [{ value: l3Values, name: '各项得分' }], label: { show: false }
          }]
        };
      }
      else if (config.type === 'pie') {
        const pieData = l3Keys.map((k, idx) => ({ name: k, value: l3Values[idx] }));
        option = {
          animation: true, tooltip: { trigger: 'item', formatter: '{b}: {c}分' },
          series: [{
            type: 'pie', radius: ['40%', '65%'], center: ['50%', '55%'],
            itemStyle: { borderColor: '#fff', borderWidth: 1 },
            label: { show: true, position: 'outside', formatter: '{b}\n{c}分', fontSize: 10, fontWeight: 'bold', color: '#444', lineHeight: 12 },
            labelLine: { show: true, length: 5, length2: 3, lineStyle: { color: '#ccc' } },
            data: pieData
          }],
          color: [config.color, '#52c41a', '#faad14']
        };
      }

      chart.setOption(option, true);
    }
  }
};

const handleResize = () => {
  Object.values(chartInstances).forEach(chart => chart.resize());
};

onMounted(() => {
  nextTick(() => { renderCharts(); });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  Object.values(chartInstances).forEach(chart => chart.dispose());
});
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }
.diagnostic-report-wrapper {
  margin: 0; padding: 0; height: 100vh; width: 100vw; 
  overflow: hidden; 
  background-color: #f0f2f5; 
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #222; 
  display: flex; flex-direction: column;
}

.top-bar {
  height: 40px; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex; align-items: center; padding: 0 20px; z-index: 100; flex-shrink: 0;
}
.tb-label { font-size: 14px; font-weight: bold; color: #1890ff; margin-right: 10px; }
.tb-select { padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px; outline: none; cursor: pointer; color: #333; }
.tb-score { margin-left: auto; font-size: 14px; color: #555; }
.tb-score b { color: #eb2f96; font-size: 16px; }

.screen-container {
  display: flex; flex-direction: column;
  flex: 1; padding: 10px 15px; gap: 10px;
  overflow: hidden;
}

.indicator-row {
  flex: 1; min-height: 0; 
  display: flex; background: #ffffff; border-radius: 6px;
  box-shadow: 0 1px 4px rgba(24,144,255,0.08); overflow: hidden;
  border: 1px solid #e6ebf1;
}

.left-panel {
  flex: 5.8; 
  display: flex; 
}

.level-1-title {
  writing-mode: vertical-rl; text-align: center;
  background: #1890ff; color: #fff; 
  font-size: 16px; 
  font-weight: 900; 
  letter-spacing: 4px; padding: 0 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.charts-wrapper {
  flex: 1; display: flex; padding: 10px 5px; gap: 5px;
  border-right: 1px dashed #e8e8e8;
}

.chart-module {
  flex: 1; display: flex; align-items: center; min-width: 0;
}

.level-2-title {
  writing-mode: vertical-rl; text-align: center;
  color: #444; 
  font-size: 14px; 
  font-weight: 900; 
  border-left: 3px solid #1890ff; padding-left: 4px;
  margin-right: -2px; z-index: 10; height: fit-content;
}

.chart-box { flex: 1; height: 100%; min-width: 0; }

.right-panel {
  flex: 4.2; 
  padding: 10px 16px; display: flex; flex-direction: column;
  background: #fafcff;
}

.summary-content {
  flex: 1; display: flex; flex-direction: column; justify-content: space-around;
  color: #333; overflow: hidden;
}

.summary-item { 
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px; 
}

.tag {
  color: #1890ff; 
  font-weight: 900; 
  font-size: 14px; 
  margin-bottom: 0;
  display: flex; align-items: center; white-space: nowrap; flex-shrink: 0; line-height: 1.4;
}

.summary-item p { 
  margin: 0; text-align: justify; flex: 1; line-height: 1.4; letter-spacing: 0.5px;
  font-size: 13px; 
  font-weight: bold; 
}
</style>
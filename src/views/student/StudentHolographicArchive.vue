<template>
  <div class="holographic-wrapper">
    <div class="bg-grid"></div>

    <div id="app-container">
      <header class="global-header">
        <div class="profile-content">
          <div class="avatar-circle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div>
            <div class="info-row">
              <span class="lbl">姓名</span><span class="val name">{{ currentUser.name }}</span>
              <span class="lbl">学号</span><span class="val">{{ currentUser.sno }}</span>
              <span class="lbl">年级</span><span class="val">理论先锋班</span>
            </div>
            <div class="info-row">
              <span class="lbl">评级状态:</span>
              <span class="val" :style="{ color: currentUser.levelColor }">{{ currentUser.level }}</span>
            </div>
          </div>
        </div>

        <nav class="tab-nav">
          <div class="nav-arrow" @click="navChange(-1)">&#10094;</div>
          <div class="nav-title" :style="{ color: currentTab.color }">{{ currentTab.name }}</div>
          <div class="nav-arrow" @click="navChange(1)">&#10095;</div>
        </nav>

        <div class="score-block">
          <div class="val" :style="{ background: currentTab.gradient, WebkitBackgroundClip: 'text' }">
            {{ currentUser.totalScore }}
          </div>
          <div class="lbl">综合量化得分</div>
        </div>
      </header>

      <main class="content-area">
        
        <div id="view-theory" class="view-section" :class="{ active: currentTabIndex === 0 }">
          <div class="panel grid-ai" style="border-left: 6px solid #3B82F6;">
            <div class="ai-title" style="color: #3175e1;">✦ 理论素养综合洞察</div>
            <div class="ai-text" v-html="currentUser.theory.insight"></div>
          </div>
          
          <div class="panel grid-main">
            <div class="panel-title"><span style="color: #3B82F6; margin-right: 4px;">▍</span>一级指标：理论素养四维全景雷达</div>
            <div class="panel-subtitle">涵盖：自主学习、科学探究、团队协作、知识内化</div>
            <div ref="cThMain" class="chart-box"></div>
          </div>

          <div class="panel grid-sub1">
            <div class="panel-title"><span style="color: #3B82F6; margin-right: 4px;">▍</span>一级指标：自主学习与认知构建</div>
            <div class="panel-subtitle">量化标准：视频完播率、提问频次、档案完整度</div>
            <div ref="cThSub1" class="chart-box"></div>
          </div>

          <div class="panel grid-sub2">
            <div class="panel-title"><span style="color: #3B82F6; margin-right: 4px;">▍</span>一级指标：科学探究与系统思维</div>
            <div class="panel-subtitle">量化标准：核心词命中率、边界触发成功率</div>
            <div ref="cThSub2" class="chart-box"></div>
          </div>

          <div class="panel grid-sub3">
            <div class="panel-title"><span style="color: #3B82F6; margin-right: 4px;">▍</span>一级指标：团队协作 & 知识内化</div>
            <div class="panel-subtitle">含：汇报采纳率、推导逻辑正确率、困惑解决闭环率</div>
            <div ref="cThSub3" class="chart-box"></div>
          </div>
        </div>

        <div id="view-code" class="view-section" :class="{ active: currentTabIndex === 1 }">
          <div class="panel grid-ai" style="border-left: 6px solid #10B981;">
            <div class="ai-title" style="color: #047857;">✦ 编程实践综合洞察</div>
            <div class="ai-text" v-html="currentUser.code.insight"></div>
          </div>
          
          <div class="panel grid-main">
            <div class="panel-title"><span style="color: #10B981; margin-right: 4px;">▍</span>一级指标：编程实践生命周期效能</div>
            <div class="panel-subtitle">涵盖：架构构思 -> 编码调试 -> 规范合规 -> 工程交付</div>
            <div ref="cCdMain" class="chart-box"></div>
          </div>

          <div class="panel grid-sub1">
            <div class="panel-title"><span style="color: #10B981; margin-right: 4px;">▍</span>一级指标：实践编码与独立调试</div>
            <div class="panel-subtitle">X轴:耗时 Y轴:报错频次 气泡:代码提交行数</div>
            <div ref="cCdSub1" class="chart-box"></div>
          </div>

          <div class="panel grid-sub2">
            <div class="panel-title"><span style="color: #10B981; margin-right: 4px;">▍</span>一级指标：质量把控与规范合规</div>
            <div class="panel-subtitle">量化标准：测试用例一次通过率、代码路径覆盖率</div>
            <div ref="cCdSub2" class="chart-box"></div>
          </div>

          <div class="panel grid-sub3">
            <div class="panel-title"><span style="color: #10B981; margin-right: 4px;">▍</span>一级/二级：分析构思 & 工程交付</div>
            <div class="panel-subtitle">难点预判字数、相似度、漏洞归零、编译成功率</div>
            <div ref="cCdSub3" class="chart-box"></div>
          </div>
        </div>

        <div id="view-arch" class="view-section" :class="{ active: currentTabIndex === 2 }">
          <div class="panel grid-ai" style="border-left: 6px solid #8B5CF6;">
            <div class="ai-title" style="color: #6D28D9;">✦ 应用设计综合洞察</div>
            <div class="ai-text" v-html="currentUser.arch.insight"></div>
          </div>
          
          <div class="panel grid-main">
            <div class="panel-title"><span style="color: #8B5CF6; margin-right: 4px;">▍</span>核心维度：团队协作与综合答辩表现</div>
            <div class="panel-subtitle">量化标准：贡献评分、建议转化率、方案定级、答辩准确率</div>
            <div ref="cArMain" class="chart-box"></div>
          </div>

          <div class="panel grid-sub1">
            <div class="panel-title"><span style="color: #8B5CF6; margin-right: 4px;">▍</span>一级指标：需求分析与方案构思</div>
            <div class="panel-subtitle">量化标准：安全需求提取 -> 对齐率 -> 方案生成</div>
            <div ref="cArSub1" class="chart-box"></div>
          </div>

          <div class="panel grid-sub2">
            <div class="panel-title"><span style="color: #8B5CF6; margin-right: 4px;">▍</span>一级指标：架构设计与风险把控</div>
            <div class="panel-subtitle">量化标准：逻辑正确率 vs 重大缺陷反馈数</div>
            <div ref="cArSub2" class="chart-box"></div>
          </div>

          <div class="panel grid-sub3">
            <div class="panel-title"><span style="color: #8B5CF6; margin-right: 4px;">▍</span>一级指标：综合交付与成果归档</div>
            <div class="panel-subtitle">文档齐套率、自检合格项比例、答辩准确率</div>
            <div ref="cArSub3" class="chart-box"></div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';

// DOM Refs
const cThMain = ref(null); const cThSub1 = ref(null); const cThSub2 = ref(null); const cThSub3 = ref(null);
const cCdMain = ref(null); const cCdSub1 = ref(null); const cCdSub2 = ref(null); const cCdSub3 = ref(null);
const cArMain = ref(null); const cArSub1 = ref(null); const cArSub2 = ref(null); const cArSub3 = ref(null);

let charts = { theory: {}, code: {}, arch: {} };

const tabList = [
  { id: 'view-theory', name: '理论素养', color: '#3B82F6', gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)' },
  { id: 'view-code', name: '编程实践', color: '#10B981', gradient: 'linear-gradient(135deg, #059669, #34D399)' },
  { id: 'view-arch', name: '应用设计', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }
];

const currentTabIndex = ref(0);
const currentTab = computed(() => tabList[currentTabIndex.value]);

// 兜底默认数据
const defaultUser = {
  name: '加载中...', sno: 'EDU-000000', totalScore: 0, level: '未评级', levelColor: '#64748B',
  theory: { insight: '暂无数据', radar: [0,0,0,0], sub1: [0,0,0] },
  code: { insight: '暂无数据', mainBar: [[0,0,0,0],[0,0,0,0],[0,0,0,0]], sub3: [0,0,0] },
  arch: { insight: '暂无数据', mainPie: [], sub3: [] }
};
const currentUser = ref(defaultUser);

// ===== 核心：MOCK 数据库 =====
// 我们基于前一个页面的名单，建立 3 个典型学生的深度档案数据
const mockDatabase = {
  "101": { // 林浩轩
    name: '林浩轩', sno: 'EDU-2026-101', level: 'A+ (优秀)', levelColor: '#059669', totalScore: 95.5,
    theory: {
      insight: '该生在 <span class="hl-good">自主学习与认知构建</span> 上优势明显（完播率与档案完整度达98%）；知识内化形成了良好的闭环，是一名全面的六边形战士。',
      radar: [98, 92, 95, 96], sub1: [95, 88, 98] // 档案, 提问, 完播
    },
    code: {
      insight: '该生在 <span class="hl-good">质量把控与规范合规</span> 指标表现极佳，测试一次通过率高；最终 <span class="hl-good">工程交付</span> 编译成功率100%。',
      mainBar: [ [25, 28, 25, 30], [35, 45, 50, 55], [30, 25, 25, 15] ], // 构思, 编码, 交付
      sub3: [85, 98, 100] // 难点, 漏洞, 编译
    },
    arch: {
      insight: '在 <span class="hl-good">需求分析与方案构思</span> 阶段，场景覆盖完备度达标；团队协作与评审优化中采纳建议转化率极高。',
      mainPie: [ {value: 98, name: '贡献评分', itemStyle:{color:'#C4B5FD'}}, {value: 92, name: '建议转化', itemStyle:{color:'#A78BFA'}}, {value: 95, name: '方案定级', itemStyle:{color:'#7C3AED'}}, {value: 100, name: '答辩准确率', itemStyle:{color:'#4C1D95'}} ],
      sub3: [ {value: 100, name: '文件齐套率', itemStyle:{color:'#7C3AED'}}, {value: 98, name: '自检合格项', itemStyle:{color:'#C4B5FD'}}, {value: 2, name: '缺漏', itemStyle:{color:'rgba(148, 163, 184, 0.3)'}} ]
    }
  },
  "102": { // 李若曦
    name: '李若曦', sno: 'EDU-2026-102', level: 'A (良好)', levelColor: '#3B82F6', totalScore: 94.0,
    theory: {
      insight: '该生 <span class="hl-good">团队协作能力极强</span>，但在 <span class="hl-bad">科学探究</span> 的边界触发成功率上存在轻微短板，建议加强参数化思维。',
      radar: [85, 75, 98, 90], sub1: [85, 92, 88]
    },
    code: {
      insight: '实践编码环节表现稳健，但在 <span class="hl-bad">难点预判</span> 上略显不足，建议加强项目初期的架构推演。',
      mainBar: [ [15, 20, 25, 20], [40, 45, 40, 45], [20, 20, 25, 20] ],
      sub3: [70, 90, 95]
    },
    arch: {
      insight: '方案构思新颖，但自检环节存在疏漏，导致 <span class="hl-bad">交付件齐套率</span> 未达满分。',
      mainPie: [ {value: 88, name: '贡献评分', itemStyle:{color:'#C4B5FD'}}, {value: 85, name: '建议转化', itemStyle:{color:'#A78BFA'}}, {value: 90, name: '方案定级', itemStyle:{color:'#7C3AED'}}, {value: 92, name: '答辩准确率', itemStyle:{color:'#4C1D95'}} ],
      sub3: [ {value: 90, name: '文件齐套率', itemStyle:{color:'#7C3AED'}}, {value: 85, name: '自检合格项', itemStyle:{color:'#C4B5FD'}}, {value: 15, name: '缺漏', itemStyle:{color:'rgba(148, 163, 184, 0.3)'}} ]
    }
  },
  "104": { // 黄雨桐
    name: '黄雨桐', sno: 'EDU-2026-104', level: 'B+ (潜力)', levelColor: '#F59E0B', totalScore: 90.0,
    theory: {
      insight: '科学探究思维活跃，喜欢另辟蹊径；但 <span class="hl-bad">自主学习进度</span> 时有落后，需要加强时间管理自律度。',
      radar: [70, 95, 85, 88], sub1: [75, 80, 70]
    },
    code: {
      insight: '构思匹配度高，但在 <span class="hl-bad">规范合规</span> 环节频繁报错，代码路径覆盖率有待进一步提升。',
      mainBar: [ [28, 30, 25, 25], [20, 25, 30, 30], [15, 20, 15, 20] ],
      sub3: [90, 75, 80]
    },
    arch: {
      insight: '需求提取精准，但团队协作中 <span class="hl-bad">建议转化率偏低</span>，倾向于独立作战，后续需强化协同沟通能力。',
      mainPie: [ {value: 80, name: '贡献评分', itemStyle:{color:'#C4B5FD'}}, {value: 65, name: '建议转化', itemStyle:{color:'#A78BFA'}}, {value: 85, name: '方案定级', itemStyle:{color:'#7C3AED'}}, {value: 88, name: '答辩准确率', itemStyle:{color:'#4C1D95'}} ],
      sub3: [ {value: 95, name: '文件齐套率', itemStyle:{color:'#7C3AED'}}, {value: 90, name: '自检合格项', itemStyle:{color:'#C4B5FD'}}, {value: 10, name: '缺漏', itemStyle:{color:'rgba(148, 163, 184, 0.3)'}} ]
    }
  }
};


// 导航切换逻辑
const navChange = (direction) => {
  let next = currentTabIndex.value + direction;
  if (next < 0) next = tabList.length - 1;
  if (next >= tabList.length) next = 0;
  currentTabIndex.value = next;

  // 延时重绘激活面板下的图表以适配大小
  nextTick(() => {
    setTimeout(() => {
      const activeId = tabList[currentTabIndex.value].id;
      if(activeId === 'view-theory') Object.values(charts.theory).forEach(c => c && c.resize());
      if(activeId === 'view-code') Object.values(charts.code).forEach(c => c && c.resize());
      if(activeId === 'view-arch') Object.values(charts.arch).forEach(c => c && c.resize());
    }, 50);
  });
};

const handleResize = () => {
  const activeId = tabList[currentTabIndex.value].id;
  if(activeId === 'view-theory') Object.values(charts.theory).forEach(c => c && c.resize());
  if(activeId === 'view-code') Object.values(charts.code).forEach(c => c && c.resize());
  if(activeId === 'view-arch') Object.values(charts.arch).forEach(c => c && c.resize());
};

const initAllCharts = () => {
  const tc = '#000000', ac = 'rgba(148, 163, 184, 0.3)';
  const cAxis = { axisLabel: { color: tc, fontSize: 13 }, axisLine: { lineStyle: { color: ac } }, splitLine: { show: false }, axisTick: {show: false} };
  const cYAxis = { ...cAxis, splitLine: { show: true, lineStyle: { color: ac, type: 'dashed' } } };
  const user = currentUser.value;

  // === 理论素养 ===
  if (!charts.theory.main) charts.theory.main = echarts.init(cThMain.value);
  charts.theory.main.setOption({ tooltip: {}, radar: { radius: '65%', indicator: [ {name:'自主学习与认知构建',max:100}, {name:'科学探究与系统思维',max:100}, {name:'团队协作与沟通表达',max:100}, {name:'知识内化与迁移反思',max:100} ], axisName:{color:'#000000', fontSize: 15, fontWeight: 'bold'} }, series: [{ type: 'radar', data: [ {value: user.theory.radar, name: '个人量化表现', label: { show: true, formatter: '{c}', color: '#000', fontSize: 13 }, areaStyle: {color: 'rgba(59, 130, 246, 0.3)'}, lineStyle: {color: '#3B82F6', width: 2}, symbolSize: 6} ] }] });

  if (!charts.theory.sub1) charts.theory.sub1 = echarts.init(cThSub1.value);
  charts.theory.sub1.setOption({ tooltip: {trigger:'axis'}, grid: {top: 20, bottom: 30, left: 10, right: 35, containLabel: true}, xAxis: {type: 'value', max: 100, ...cYAxis}, yAxis: {type: 'category', data: ['档案完整度', '提问频次分', '视频完播率'], ...cAxis, axisLabel: {interval:0, fontSize:13, color:'#000'}}, series: [{ type: 'bar', barWidth: 20, data: user.theory.sub1, itemStyle: {color: '#3B82F6', borderRadius: [0,4,4,0]}, label:{show:true, position:'right', color:'#000', fontSize:13} }] });

  // (其它理论次要图表使用占位演示数据即可)
  if (!charts.theory.sub2) charts.theory.sub2 = echarts.init(cThSub2.value);
  charts.theory.sub2.setOption({ tooltip: {trigger:'axis'}, legend: {bottom: 0, textStyle: {fontSize: 13, color: '#000'}}, grid: {top: 30, bottom: 30, left: 10, right: 10, containLabel: true}, xAxis: {type: 'category', data: ['任务1', '任务2', '任务3'], ...cAxis}, yAxis: [{type: 'value', name:'命中率', max:100, ...cYAxis, nameTextStyle:{fontSize:13, color:'#000'}}, {type: 'value', name:'边界触发', max:100, ...cYAxis, splitLine:{show:false}, nameTextStyle:{fontSize:13, color:'#000'}}], series: [ { name: '核心词命中率', type: 'line', smooth: true, data: [75, 85, 90], itemStyle: {color: '#1D4ED8'}, lineStyle:{width:3}, label:{show:true, position:'top', color:'#000', fontSize:13} }, { name: '边界触发成功率', type: 'bar', yAxisIndex: 1, barWidth: 15, data: [50, 60, 65], itemStyle: {color: '#93C5FD', borderRadius: [2,2,0,0]}, label:{show:true, position:'top', color:'#000', fontSize:13} } ] });

  if (!charts.theory.sub3) charts.theory.sub3 = echarts.init(cThSub3.value);
  charts.theory.sub3.setOption({ tooltip: {trigger:'axis'}, legend: {bottom: 0, textStyle:{fontSize:13, color:'#000'}}, grid: {top: 20, bottom: 30, left: 10, right: 10, containLabel: true}, xAxis: {type: 'category', data: ['W1', 'W2', 'W3', 'W4'], ...cAxis}, yAxis: {type: 'value', max: 100, ...cYAxis}, series: [ { name: '推导正确率', type: 'line', data: [70, 80, 85, 92], itemStyle: {color: '#1E3A8A'}, lineStyle:{width:3}, label:{show:true, color:'#000', fontSize:13} }, { name: '困惑闭环率', type: 'line', data: [65, 75, 88, 95], itemStyle: {color: '#2563EB'}, lineStyle:{type:'dashed', width:2}, label:{show:true, color:'#000', fontSize:13} }, { name: '汇报采纳率', type: 'line', areaStyle:{opacity:0.1}, data: [60, 70, 75, 85], itemStyle: {color: '#93C5FD'}, label:{show:true, color:'#000', fontSize:13} } ] });

  // === 编程实践 ===
  if (!charts.code.main) charts.code.main = echarts.init(cCdMain.value);
  charts.code.main.setOption({ tooltip: {trigger:'axis'}, legend: {bottom: 0, textStyle:{fontSize:13, color:'#000'}}, grid: {top: 20, bottom: 40, left: 10, right: 10, containLabel: true}, xAxis: {type: 'category', data: ['项目A', '项目B', '项目C', '项目D'], ...cAxis}, yAxis: {type: 'value', max: 100, ...cYAxis}, series: [ { name: '构思匹配度', type: 'bar', stack: 'total', barWidth: 30, data: user.code.mainBar[0], itemStyle: {color: '#A7F3D0'}, label:{show:true, position:'inside', color:'#000', fontSize:13} }, { name: '编码覆盖率', type: 'bar', stack: 'total', data: user.code.mainBar[1], itemStyle: {color: '#34D399'}, label:{show:true, position:'inside', color:'#000', fontSize:13} }, { name: '交付编译率', type: 'bar', stack: 'total', data: user.code.mainBar[2], itemStyle: {color: '#047857', borderRadius: [4,4,0,0]}, label:{show:true, position:'inside', color:'#fff', fontSize:13} } ] });

  if (!charts.code.sub1) charts.code.sub1 = echarts.init(cCdSub1.value);
  charts.code.sub1.setOption({ tooltip: {formatter: function (p) { return '环境耗时: '+p.data[0]+'min<br/>报错频次: '+p.data[1]+'次<br/>提交行数: '+p.data[2]; }}, grid: {top: 30, bottom: 20, left: 10, right: 45, containLabel: true}, xAxis: {type: 'value', name: '耗时(min)', ...cAxis, nameTextStyle:{fontSize:13, color:'#000'}, splitLine:{show:true, lineStyle:{color:ac, type:'dashed'}}}, yAxis: {type: 'value', name: '报错(次)', ...cYAxis, nameTextStyle:{fontSize:13, color:'#000'}}, series: [{ type: 'scatter', symbolSize: function (data) { return data[2] / 10; }, data: [[15, 3, 200], [25, 6, 450], [10, 2, 150], [30, 8, 500]], itemStyle: {color: 'rgba(16, 185, 129, 0.7)'}, label:{show:true, position:'top', formatter:function(p){return p.data[1]+'次';}, color:'#000', fontSize:13} }] });

  if (!charts.code.sub2) charts.code.sub2 = echarts.init(cCdSub2.value);
  charts.code.sub2.setOption({ grid: { top: 20, bottom: 20, left: 10, right: 30, containLabel: true }, xAxis: { type: 'value', max: 100, show: false }, yAxis: { type: 'category', data: ['路径覆盖率', '一次通过率'], axisLine: {show: false}, axisTick: {show: false}, axisLabel: {color: '#000', fontSize: 13, fontWeight: 'bold'} }, series: [ { type: 'bar', barWidth: 20, data: [100, 100], itemStyle: { color: '#E2E8F0', borderRadius: 10 }, barGap: '-100%', animation: false, tooltip: {show: false} }, { type: 'bar', barWidth: 20, data: [ { value: 88, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#6EE7B7'}, {offset: 1, color: '#10B981'}])} }, { value: 92, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#34D399'}, {offset: 1, color: '#047857'}])} } ], itemStyle: { borderRadius: 10 }, label: { show: true, position: 'insideRight', formatter: '{c}%', color: '#fff', fontWeight: 'bold', fontSize: 13 } } ] });

  if (!charts.code.sub3) charts.code.sub3 = echarts.init(cCdSub3.value);
  charts.code.sub3.setOption({ tooltip: {trigger:'axis'}, grid: {top: 15, bottom: 20, left: 10, right: 30, containLabel: true}, xAxis: {type: 'value', max: 100, ...cYAxis}, yAxis: {type: 'category', data: ['难点预判', '漏洞归零', '编译成功'], ...cAxis, axisLabel: {fontSize:13}}, series: [{ type: 'bar', data: user.code.sub3, itemStyle: {color: '#10B981', borderRadius: [0,4,4,0]}, label:{show:true, position:'right', color:'#000', fontSize:13} }] });

  // === 应用设计 ===
  if (!charts.arch.main) charts.arch.main = echarts.init(cArMain.value);
  charts.arch.main.setOption({ tooltip: {}, legend: {bottom: 0, textStyle:{fontSize:13, color:'#000'}}, series: [{ name: '团队与答辩', type: 'pie', roseType: 'radius', radius: ['20%', '60%'], center: ['50%', '42%'], data: user.arch.mainPie, label: {fontSize: 13, color: '#000', formatter: '{b}\n{c}'} }] });

  if (!charts.arch.sub1) charts.arch.sub1 = echarts.init(cArSub1.value);
  charts.arch.sub1.setOption({ tooltip: {trigger: 'item'}, legend: {bottom: 0, textStyle: {fontSize: 13, color: '#000'}}, series: [{ type: 'funnel', left: '10%', top: 10, bottom: 35, width: '80%', minSize: '30%', maxSize: '100%', sort: 'descending', gap: 2, data: [ {value: 100, name: '场景覆盖'}, {value: 85, name: '需求对齐'}, {value: 60, name: '创新构想'} ], itemStyle: {borderColor: '#fff', borderWidth: 1, color: function(p){ return ['#C4B5FD', '#8B5CF6', '#5B21B6'][p.dataIndex]; }}, label: {show: true, fontSize: 13, color: '#000', position: 'inside', formatter: '{c}'} }] });

  if (!charts.arch.sub2) charts.arch.sub2 = echarts.init(cArSub2.value);
  charts.arch.sub2.setOption({ tooltip: {trigger:'axis'}, legend: {bottom: 0, textStyle:{fontSize:13, color:'#000'}}, grid: {top: 30, bottom: 30, left: 10, right: 10, containLabel: true}, xAxis: {type: 'category', data: ['版1', '版2', '版3', '定稿'], ...cAxis}, yAxis: [{type: 'value', name:'正确率', max:100, ...cYAxis, nameTextStyle:{fontSize:13, color:'#000'}}, {type: 'value', name:'缺陷数', max:5, ...cYAxis, splitLine:{show:false}, nameTextStyle:{fontSize:13, color:'#000'}}], series: [ { name: '逻辑正确率', type: 'line', data: [60, 75, 90, 98], itemStyle: {color: '#6D28D9'}, lineStyle:{width:3}, label:{show:true, position:'top', color:'#000', fontSize:13} }, { name: '重大缺陷反馈', type: 'line', yAxisIndex: 1, data: [2, 1, 0, 0], itemStyle: {color: '#C4B5FD'}, lineStyle:{width:2, type:'dashed'}, label:{show:true, position:'top', color:'#000', fontSize:13} } ] });

  if (!charts.arch.sub3) charts.arch.sub3 = echarts.init(cArSub3.value);
  charts.arch.sub3.setOption({ tooltip: {}, legend: {bottom: 0, textStyle:{fontSize:13, color:'#000'}}, series: [{ type: 'pie', radius: ['45%', '65%'], center: ['50%', '45%'], data: user.arch.sub3, label: {show: true, formatter: '{c}', color: '#000', fontSize: 13} }] });
};

onMounted(() => {
  // 从localStorage获取学生ID
  const studentId = localStorage.getItem('currentStudentId');
  
  // 2. 如果查找到对应 Mock 数据则赋值，否则使用默认保底数据
  if (studentId && mockDatabase[studentId]) {
    currentUser.value = mockDatabase[studentId];
  } else {
    // 兜底逻辑：如果没有找到对应学生，使用默认学生
    currentUser.value = mockDatabase["101"]; 
  }

  // 3. 拿到专属数据后，初始化所有图表
  nextTick(() => {
    initAllCharts();
  });

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  Object.values(charts.theory).forEach(c => c && c.dispose());
  Object.values(charts.code).forEach(c => c && c.dispose());
  Object.values(charts.arch).forEach(c => c && c.dispose());
});
</script>

<style scoped>
.holographic-wrapper {
  --bg-color: #F1F5F9;
  --main-color: #3B82F6;
  --text-title: #0F172A;
  --text-norm: #334155;
  --text-sub: #64748B;
  --glass-bg: #FFFFFF;
  --glass-border: #E2E8F0;
  --glass-shadow: 0 2px 8px rgba(0,0,0,0.06); 
  
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
  font-size: 14px;
  width: 100%; 
  height: calc(100vh - 60px);
  background: #F1F5F9; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden; 
  position: relative;
  box-sizing: border-box;
}

.bg-grid { position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px); background-size: 40px 40px; }
#app-container { position: relative; z-index: 10; width: 100%; height: 100%; padding: 16px 24px; display: flex; flex-direction: column; gap: 16px; }

.global-header { flex: none; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); padding: 12px 24px; display: flex; align-items: center; justify-content: center; }
.profile-content { display: flex; align-items: center; gap: 20px; margin-right: auto; }
.avatar-circle { width: 48px; height: 48px; border-radius: 4px; display: flex; justify-content: center; align-items: center; background: #F1F5F9; color: #64748B; border: 1px solid #E2E8F0; }
.info-row { display: flex; align-items: center; gap: 12px; margin-bottom: 4px;}
.info-row .lbl { color: var(--text-sub); font-size: 13px; }
.info-row .val { font-weight: 600; color: var(--text-title); font-size: 14px; }
.info-row .name { font-size: 20px; font-weight: 800; color: var(--main-color); }

.tab-nav { display: flex; align-items: center; justify-content: center; gap: 24px; margin-left: -335px; width: 300px; }
.nav-arrow { cursor: pointer; padding: 8px 16px; color: var(--text-sub); font-size: 20px; transition: color 0.3s; font-weight: bold; user-select: none; }
.nav-arrow:hover { color: var(--text-title); }
.nav-title { font-size: 40px; font-weight: 800; user-select: none; letter-spacing: 0.5px; transition: color 0.3s ease; }

.score-block { text-align: right; margin-left: auto; }
.score-block .val { font-size: 28px; font-weight: 900; line-height: 1; color: transparent;}
.score-block .lbl { font-size: 13px; color: var(--text-sub); margin-top: 4px; }

.content-area { flex: 1; position: relative; width: 100%; min-height: 0; }
.view-section { position: absolute; inset: 0; opacity: 0; pointer-events: none; visibility: hidden; display: grid; grid-template-columns: 28% 44% 28%; grid-template-rows: min-content 1fr 1fr; gap: 16px; transition: opacity 0.3s ease; }
.view-section.active { opacity: 1; pointer-events: auto; visibility: visible; }

.panel { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 6px; box-shadow: var(--glass-shadow); padding: 16px; display: flex; flex-direction: column; overflow: hidden; }
.panel-title { font-size: 15px; font-weight: 600; color: var(--text-title); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; flex: none; }
.panel-title::before { content: ''; width: 4px; height: 14px; border-radius: 2px; background: linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%); }
.panel-subtitle { font-size: 13px; color: var(--text-sub); margin-top: -6px; margin-bottom: 8px; margin-left: 10px; }
.chart-box { flex: 1; width: 100%; min-height: 0; }

:deep(.hl-good) { background-color: rgba(16, 185, 129, 0.15); color: #059669; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 13px; }
:deep(.hl-bad) { background-color: rgba(239, 68, 68, 0.15); color: #DC2626; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 13px; }

.grid-ai { grid-column: 1 / 4; grid-row: 1 / 2; padding: 12px 20px; background: #FFFFFF; flex-direction: row; align-items: center; gap: 16px; border-radius: 6px; }
.grid-ai .ai-title { font-size: 15px; font-weight: 700; color: #D97706; white-space: nowrap; border-right: 1px solid #E2E8F0; padding-right: 16px; }
.grid-ai .ai-text { font-size: 14px; color: var(--text-norm); line-height: 1.8; }
.grid-main { grid-column: 2 / 3; grid-row: 2 / 4; }
.grid-sub1 { grid-column: 1 / 2; grid-row: 2 / 3; }
.grid-sub2 { grid-column: 1 / 2; grid-row: 3 / 4; }
.grid-sub3 { grid-column: 3 / 4; grid-row: 2 / 4; }
</style>
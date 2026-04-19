<script lang="ts" setup>
import { ref, onMounted, nextTick, shallowRef } from "vue";
import { useRouter, useRoute } from 'vue-router';
import * as echarts from "echarts";
import { Document, UserFilled, Odometer, Medal, CaretTop, CaretBottom } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();

// ================= Mock 数据库 =================
const mockDatabase: Record<string, any> = {
  "101": { // 林浩轩
    name: '林浩轩', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 92, knowledgeScore: '4.8/5.0',
    beforeData: [55, 52, 58, 50, 54],
    afterData: [62, 58, 65, 57, 61],
    upSummary: '整体势头向好。<span class="hl-up">学习态度</span>与<span class="hl-up">应试策略</span>显著提升，<span class="hl-up">思维认知</span>及<span class="hl-up">综合素养</span>稳步强化。',
    downSummary: '核心短板在于<span class="hl-down">知识掌握</span>略有回落，建议针对薄弱知识点进行专项复盘与巩固。'
  },
  "102": { // 李若曦
    name: '李若曦', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 88, knowledgeScore: '4.5/5.0',
    beforeData: [48, 50, 52, 45, 51],
    afterData: [55, 49, 58, 52, 57],
    upSummary: '<span class="hl-up">思维认知</span>与<span class="hl-up">综合素养</span>进步明显，<span class="hl-up">应试策略</span>调整得当，整体表现稳步提升。',
    downSummary: '<span class="hl-down">知识掌握</span>存在波动，<span class="hl-down">学习态度</span>需进一步端正，建议加强课后复习。'
  },
  "103": { // 刘承宇
    name: '刘承宇', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 85, knowledgeScore: '4.3/5.0',
    beforeData: [50, 48, 55, 47, 52],
    afterData: [57, 54, 60, 54, 58],
    upSummary: '<span class="hl-up">学习态度</span>端正，<span class="hl-up">思维认知</span>能力提升显著，课堂参与度大幅提高。',
    downSummary: '<span class="hl-down">应试策略</span>有待优化，<span class="hl-down">知识掌握</span>深度不足，需加强实战训练。'
  },
  "104": { // 黄雨桐
    name: '黄雨桐', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 90, knowledgeScore: '4.6/5.0',
    beforeData: [52, 55, 54, 50, 56],
    afterData: [59, 62, 60, 57, 62],
    upSummary: '各方面均衡发展，<span class="hl-up">知识掌握</span>与<span class="hl-up">综合素养</span>同步提升，表现优异。',
    downSummary: '<span class="hl-down">学习态度</span>偶有松懈，需保持持续的学习热情和专注度。'
  },
  "105": { // 陈宇泽
    name: '陈宇泽', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 87, knowledgeScore: '4.4/5.0',
    beforeData: [49, 51, 53, 48, 50],
    afterData: [56, 58, 59, 55, 57],
    upSummary: '<span class="hl-up">应试策略</span>改善明显，<span class="hl-up">综合素养</span>全面提升，学习方法得当。',
    downSummary: '<span class="hl-down">思维认知</span>深度有待加强，<span class="hl-down">知识掌握</span>系统性需提升。'
  },
  "106": { // 许诗涵
    name: '许诗涵', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 91, knowledgeScore: '4.7/5.0',
    beforeData: [54, 56, 57, 52, 55],
    afterData: [61, 63, 63, 59, 62],
    upSummary: '<span class="hl-up">学习态度</span>积极，<span class="hl-up">知识掌握</span>扎实，各方面能力均衡发展，表现突出。',
    downSummary: '<span class="hl-down">应试策略</span>灵活性不足，需提升应对复杂题型的能力。'
  },
  "107": { // 赵景辰
    name: '赵景辰', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 86, knowledgeScore: '4.4/5.0',
    beforeData: [51, 49, 54, 49, 53],
    afterData: [58, 55, 60, 56, 59],
    upSummary: '<span class="hl-up">思维认知</span>能力提升迅速，<span class="hl-up">综合素养</span>稳步提高，学习潜力大。',
    downSummary: '<span class="hl-down">学习态度</span>需要更加端正，<span class="hl-down">知识掌握</span>基础需夯实。'
  },
  "108": { // 张语桐
    name: '张语桐', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 89, knowledgeScore: '4.6/5.0',
    beforeData: [53, 54, 56, 51, 54],
    afterData: [60, 61, 62, 58, 61],
    upSummary: '各方面表现均衡，<span class="hl-up">应试策略</span>与<span class="hl-up">思维认知</span>协同提升，学习效率高。',
    downSummary: '<span class="hl-down">知识掌握</span>存在薄弱环节，需针对性补强基础知识。'
  },
  "109": { // 王嘉树
    name: '王嘉树', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 84, knowledgeScore: '4.2/5.0',
    beforeData: [47, 50, 51, 46, 49],
    afterData: [54, 56, 57, 53, 56],
    upSummary: '<span class="hl-up">学习态度</span>转变明显，<span class="hl-up">综合素养</span>有所提升，进步空间大。',
    downSummary: '<span class="hl-down">思维认知</span>深度不足，<span class="hl-down">应试策略</span>需要系统优化。'
  },
  "110": { // 苏欣妍
    name: '苏欣妍', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 93, knowledgeScore: '4.9/5.0',
    beforeData: [56, 58, 59, 54, 57],
    afterData: [63, 65, 65, 61, 64],
    upSummary: '全面优秀，<span class="hl-up">知识掌握</span>与<span class="hl-up">学习态度</span>俱佳，<span class="hl-up">思维认知</span>能力突出，是班级标杆。',
    downSummary: '<span class="hl-down">应试策略</span>可进一步优化，挑战更高难度题目。'
  },
  "111": { // 周子恒
    name: '周子恒', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 88, knowledgeScore: '4.5/5.0',
    beforeData: [50, 52, 54, 49, 52],
    afterData: [57, 59, 60, 56, 59],
    upSummary: '<span class="hl-up">综合素养</span>提升明显，<span class="hl-up">学习态度</span>端正，学习方法逐步优化。',
    downSummary: '<span class="hl-down">知识掌握</span>系统性不足，<span class="hl-down">思维认知</span>深度有待加强。'
  },
  "112": { // 邓佳宁
    name: '邓佳宁', grade: '2024级', class: '一班', major: '密码学应用',
    learningIndex: 85, knowledgeScore: '4.3/5.0',
    beforeData: [49, 51, 53, 48, 51],
    afterData: [56, 57, 59, 55, 58],
    upSummary: '<span class="hl-up">思维认知</span>与<span class="hl-up">应试策略</span>同步提升，学习主动性增强。',
    downSummary: '<span class="hl-down">学习态度</span>需持续保持，<span class="hl-down">知识掌握</span>深度需进一步拓展。'
  }
};

// ================= 数据定义 =================
const studentInfo = ref({
  name: "张晓明",
  grade: "2024级",
  class: "一班",
  major: "密码学应用",
});

const learningIndex = ref(85);
const knowledgeScore = ref('4.2/5.0');
const upSummary = ref('');
const downSummary = ref('');

// ================= ECharts 图表实例 =================
const radarBeforeRef = ref<HTMLDivElement | null>(null);
const radarAfterRef = ref<HTMLDivElement | null>(null);

const radarBeforeChart = shallowRef<echarts.ECharts | null>(null);
const radarAfterChart = shallowRef<echarts.ECharts | null>(null);

// 通用雷达图配置模板
const getRadarOption = (title: string, data: number[], color: string, areaColor: string) => ({
  title: {
    text: title,
    left: "center",
    textStyle: { fontSize: 20, color: "#303133", fontWeight: "600" }
  },
  tooltip: { trigger: "item" },
  radar: {
    indicator: [
      { name: "学习态度", max: 100 },
      { name: "知识掌握", max: 100 },
      { name: "思维认知", max: 100 },
      { name: "应试策略", max: 100 },
      { name: "综合素养", max: 100 },
    ],
    radius: "60%",
    center: ["50%", "55%"],
    name: { 
      textStyle: { 
        color: "#606266", 
        fontSize: 18,
        fontWeight: 500
      } 
    },
    splitArea: {
      areaStyle: {
        color: ['rgba(240, 242, 245, 0.5)', 'rgba(240, 242, 245, 0.7)', 'rgba(230, 233, 240, 0.5)', 'rgba(230, 233, 240, 0.7)', 'rgba(220, 223, 230, 0.3)']
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(144, 147, 153, 0.3)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(144, 147, 153, 0.3)'
      }
    }
  },
  series: [
    {
      type: "radar",
      data: [
        {
          value: data,
          name: title,
          itemStyle: { color: color },
          areaStyle: { color: areaColor },
          // 开启节点数值显示
          label: {
            show: true,
            formatter: '{c}',
            color: '#303133',
            fontSize: 18,
            fontWeight: 600
          }
        },
      ],
    },
  ],
});

const initCharts = (beforeData: number[], afterData: number[]) => {
  // 左侧图表：课前初始画像
  if (radarBeforeRef.value) {
    radarBeforeChart.value = echarts.init(radarBeforeRef.value);
    radarBeforeChart.value.setOption(
      getRadarOption("课前初始画像", beforeData, "#909399", "rgba(144,147,153,0.2)")
    );
  }

  // 右侧图表：课后提升画像
  if (radarAfterRef.value) {
    radarAfterChart.value = echarts.init(radarAfterRef.value);
    radarAfterChart.value.setOption(
      getRadarOption("课后提升画像", afterData, "#409EFF", "rgba(64,158,255,0.2)")
    );
  }
};

onMounted(() => {
  // 从localStorage获取学生ID
  const studentId = localStorage.getItem('currentStudentId');
  if (studentId && mockDatabase[studentId]) {
    const user = mockDatabase[studentId];
    studentInfo.value = {
      name: user.name,
      grade: user.grade,
      class: user.class,
      major: user.major
    };
    learningIndex.value = user.learningIndex;
    knowledgeScore.value = user.knowledgeScore;
    upSummary.value = user.upSummary;
    downSummary.value = user.downSummary;
    
    nextTick(() => {
      initCharts(user.beforeData, user.afterData);
    });
  } else {
    // 使用默认数据
    const defaultUser = mockDatabase["102"];
    upSummary.value = defaultUser.upSummary;
    downSummary.value = defaultUser.downSummary;
    nextTick(() => {
      initCharts(defaultUser.beforeData, defaultUser.afterData);
    });
  }
});

window.addEventListener("resize", () => {
  radarBeforeChart.value?.resize();
  radarAfterChart.value?.resize();
});
</script>

<template>
  <div class="mdzx-layout">
    <!-- 页面内容 -->
    <main class="content">
      <div class="layout-wrapper">
        <div class="main-content">
          <div class="workspace">
            
            <div class="panel-left card-container">
              <div class="card-header">
                <el-icon color="#409EFF" class="mr-1"><Document /></el-icon>
                <span>学员能力画像对比</span>
              </div>
              <div class="card-body double-radar-body">
                <div class="radar-wrapper">
                  <div ref="radarBeforeRef" class="chart-full"></div>
                </div>
                <div class="divider"></div>
                <div class="radar-wrapper">
                  <div ref="radarAfterRef" class="chart-full"></div>
                </div>
              </div>
            </div>

            <div class="panel-right">
              
              <div class="card-container info-card">
                <div class="card-body">
                  <div class="compact-info-row">
                    <el-avatar shape="square" :size="32" style="background: #f0f2f5; color: #409EFF; border-radius: 4px; flex-shrink: 0;">
                      <el-icon :size="18"><UserFilled /></el-icon>
                    </el-avatar>
                    <span class="student-name">{{ studentInfo.name }}</span>
                    <span class="detail-item">{{ studentInfo.grade }}</span>
                    <span class="detail-item">{{ studentInfo.class }}</span>
                    <span class="detail-item">{{ studentInfo.major }}</span>
                  </div>
                </div>
              </div>

              <div class="card-container index-card">
                <div class="card-header">
                  <el-icon color="#409EFF" class="mr-1"><Odometer /></el-icon>
                  <span>综合指数</span>
                </div>
                <div class="card-body index-body">
                  <div class="index-box">
                    <div class="index-tab">学习力指数</div>
                    <div class="index-val">{{ learningIndex }}</div>
                  </div>
                  <div class="index-box">
                    <div class="index-tab">知识掌握度</div>
                    <div class="index-val">{{ knowledgeScore }}</div>
                  </div>
                </div>
              </div>

              <div class="card-container radar-card">
                <div class="card-header">
                  <el-icon color="#409EFF" class="mr-1"><Medal /></el-icon>
                  <span>AI学习分析总结</span>
                </div>
                <div class="card-body simple-metrics-body">
                  <div class="ai-summary">
                    
                    <div class="summary-paragraph up-block">
                      <el-icon class="icon-up"><CaretTop /></el-icon>
                      <div class="text-content" v-html="upSummary"></div>
                    </div>

                    <div class="summary-paragraph down-block">
                      <el-icon class="icon-down"><CaretBottom /></el-icon>
                      <div class="text-content" v-html="downSummary"></div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.mdzx-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 顶部导航条 */
.top-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .sys-title {
      font-size: 16px;
      font-weight: 600;
      color: #409EFF;
      letter-spacing: 1px;
      cursor: pointer;
      transition: color 0.3s ease;
      
      &:hover {
        color: #66b1ff;
      }
    }
  }

  .header-right {
    .nav-links {
      display: flex;
      gap: 10px;
      
      .nav-item {
        padding: 8px 16px;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 4px;
        transition: all 0.3s ease;
        
        &.active {
          background-color: #e6f1fc;
          color: #409EFF;
          font-weight: 500;
        }

        &:hover:not(.active) {
          color: #409EFF;
          background-color: #f5f7fa;
        }
      }
    }
  }
}

/* 内容区域 */
.content {
  flex: 1;
  overflow: hidden;
  background-color: #f5f7fa;
}

.layout-wrapper {
  height: 100%;
  background-color: #f0f2f5;
  overflow: hidden;
}

.mr-1 { margin-right: 6px; }

/* 主体容器 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
}

/* 工作区 */
.workspace {
  padding: 20px;
  display: flex;
  gap: 20px;
  height: 100%;
  overflow: hidden;
}

/* 通用卡片样式 */
.card-container {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

  .card-header {
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    background-color: #fafbfc;
    font-size: 15px;
    font-weight: 500;
    color: #303133;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .card-body {
    flex: 1;
    min-height: 0;
    position: relative;
  }
}
.logo { height: 4vh; width: auto; object-fit: contain; }
/* 左侧大面板 */
.panel-left {
  flex: 1;
  min-width: 0;
  
  .double-radar-body {
    display: flex;
    align-items: center;
    padding: 20px;

    .radar-wrapper {
      flex: 1;
      height: 100%;
    }

    .divider {
      width: 1px;
      height: 80%;
      background-color: #e4e7ed;
      margin: 0 20px;
    }

    .chart-full {
      width: 100%;
      height: 100%;
      min-height: 400px;
    }
  }
}

/* 右侧侧边面板 */
.panel-right {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 极简学员信息卡片 (完全同行排列) */
.info-card {
  height: 56px;
  flex-shrink: 0;
  justify-content: center;

  .compact-info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    height: 100%;
    white-space: nowrap;

    .student-name {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-left: 2px;
    }

    .detail-item {
      font-size: 12px;
      color: #606266;
      background: #f5f7fa;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #e4e7ed;
    }
  }
}

/* 综合指数卡片 */
.index-card {
  height: 200px;
  flex-shrink: 0;

  .index-body {
    display: flex;
    padding: 20px;
    gap: 15px;
    
    .index-box {
      flex: 1;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background: #fafbfc;

      .index-tab {
        position: absolute;
        top: -1px;
        left: -1px;
        background-color: #ecf5ff;
        color: #409EFF;
        font-size: 12px;
        padding: 4px 12px;
        border-radius: 4px 0 16px 0;
        font-weight: 500;
      }

      .index-val {
        font-size: 36px;
        font-weight: bold;
        color: #303133;
        margin-top: 15px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", sans-serif;
      }
    }
  }
}

/* AI 总结组件卡片 */
.radar-card {
  flex: 1;
  min-height: 0;

  .simple-metrics-body {
    padding: 20px;
    display: flex;
    flex-direction: column;

    .ai-summary {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* 段落总结容器 */
    .summary-paragraph {
      display: flex;
      gap: 10px;
      font-size: 14px;
      line-height: 1.6;
      color: #303133;
      background: #fafbfc;
      padding: 12px 14px;
      border-radius: 6px;
      border: 1px solid transparent;

      &.up-block {
        border-left: 4px solid #67C23A;
        background: linear-gradient(90deg, rgba(103, 194, 58, 0.05) 0%, #fafbfc 100%);
      }

      &.down-block {
        border-left: 4px solid #F56C6C;
        background: linear-gradient(90deg, rgba(245, 108, 108, 0.05) 0%, #fafbfc 100%);
      }

      .icon-up { color: #67C23A; font-size: 18px; margin-top: 2px; }
      .icon-down { color: #F56C6C; font-size: 18px; margin-top: 2px; }

      .text-content { flex: 1; }

      /* 关键词高亮 */
      :deep(.hl-up) {
        color: #67C23A;
        font-weight: 600;
        margin: 0 2px;
      }

      :deep(.hl-down) {
        color: #F56C6C;
        font-weight: 600;
        margin: 0 2px;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { ref, onMounted, nextTick, shallowRef } from "vue";
import * as echarts from "echarts";
import MdzxDebugLayout from "@/components/MdzxDebugLayout.vue";
import { Document, UserFilled, Odometer, Medal, CaretTop, CaretBottom } from '@element-plus/icons-vue';

// ================= 数据定义 =================
const studentInfo = ref({
  name: "张晓明",
  grade: "2024级",
  class: "一班",
  major: "密码学应用",
});

// 右下角简单组件的数据 (近期学习表现)
const learningMetrics = ref([
  { name: "课程任务完成率", value: 92, color: "#67C23A" },
  { name: "课后作业优秀率", value: 85, color: "#409EFF" },
  { name: "课堂互动参与度", value: 78, color: "#E6A23C" },
]);

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
    textStyle: { fontSize: 18, color: "#e0e0e0", fontWeight: "500" }
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
    name: { textStyle: { color: "#a0a8b0", fontSize: 18 } },
    splitArea: {
      areaStyle: {
        color: ['rgba(30, 39, 48, 0.1)', 'rgba(30, 39, 48, 0.2)', 'rgba(30, 39, 48, 0.4)', 'rgba(30, 39, 48, 0.6)', 'rgba(30, 39, 48, 0.8)']
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(160, 168, 176, 0.3)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(160, 168, 176, 0.3)'
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
            color: '#e0e0e0',
            fontSize: 18
          }
        },
      ],
    },
  ],
});

const initCharts = () => {
  // 左侧图表：课前初始画像
  if (radarBeforeRef.value) {
    radarBeforeChart.value = echarts.init(radarBeforeRef.value);
    radarBeforeChart.value.setOption(
      getRadarOption("课前初始画像", [50, 45, 60, 40, 55], "#909399", "rgba(144,147,153,0.2)")
    );
  }

  // 右侧图表：课后变化画像（调整数据，增长不超过7，且有一个-1的下降）
  if (radarAfterRef.value) {
    radarAfterChart.value = echarts.init(radarAfterRef.value);
    radarAfterChart.value.setOption(
      getRadarOption("课后提升画像", [57, 44, 65, 46, 60], "#23b586", "rgba(35,181,134,0.2)")
    );
  }
};

onMounted(() => {
  nextTick(() => {
    initCharts();
  });
});

window.addEventListener("resize", () => {
  radarBeforeChart.value?.resize();
  radarAfterChart.value?.resize();
});
</script>

<template>
  <div class="layout-wrapper">
    <div class="main-content">
      <MdzxDebugLayout>
        <div class="workspace">
          
          <div class="panel-left card-container">
            <div class="card-header">
              <el-icon color="#23b586" class="mr-1"><Document /></el-icon>
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
                  <el-avatar shape="square" :size="32" style="background: #1e2730; color: #23b586; border-radius: 4px; flex-shrink: 0;">
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
                <el-icon color="#23b586" class="mr-1"><Odometer /></el-icon>
                <span>综合指数</span>
              </div>
              <div class="card-body index-body">
                <div class="index-box">
                  <div class="index-tab">学习力指数</div>
                  <div class="index-val">85</div>
                </div>
                <div class="index-box">
                  <div class="index-tab">知识掌握度</div>
                  <div class="index-val">4.2/5.0</div>
                </div>
              </div>
            </div>

            <div class="card-container radar-card">
              <div class="card-header">
                <el-icon color="#23b586" class="mr-1"><Medal /></el-icon>
                <span>AI学习分析总结</span>
              </div>
              <div class="card-body simple-metrics-body">
                <div class="ai-summary">
                  
                  <div class="summary-paragraph up-block">
                    <el-icon class="icon-up"><CaretTop /></el-icon>
                    <div class="text-content">
                      整体势头向好。<span class="hl-up">学习态度</span>与<span class="hl-up">应试策略</span>显著提升，<span class="hl-up">思维认知</span>及<span class="hl-up">综合素养</span>稳步强化。
                    </div>
                  </div>

                  <div class="summary-paragraph down-block">
                    <el-icon class="icon-down"><CaretBottom /></el-icon>
                    <div class="text-content">
                      核心短板在于<span class="hl-down">知识掌握</span>略有回落，建议针对薄弱知识点进行专项复盘与巩固。
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </MdzxDebugLayout>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mr-1 { margin-right: 6px; }

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
  background: #141b24;
  border-radius: 4px;
  border: 1px solid #1e2730;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);

  .card-header {
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #1e2730;
    background-color: #1a2330;
    font-size: 15px;
    font-weight: 500;
    color: #e0e0e0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .card-body {
    flex: 1;
    min-height: 0;
    position: relative;
  }
}

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
      background-color: #1e2730;
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
  height: 56px; /* 极限压缩高度 */
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
      color: #e0e0e0;
      margin-left: 2px;
    }

    .detail-item {
      font-size: 12px;
      color: #a0a8b0;
      background: #1a2330;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #1e2730;
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
      border: 1px solid #1e2730;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background: #1a2330;

      .index-tab {
        position: absolute;
        top: -1px;
        left: -1px;
        background-color: #1e3a5f;
        color: #409EFF;
        font-size: 12px;
        padding: 4px 12px;
        border-radius: 4px 0 16px 0;
        font-weight: 500;
      }

      .index-val {
        font-size: 36px;
        font-weight: bold;
        color: #e0e0e0;
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
      color: #e0e0e0;
      background: #1a2330;
      padding: 12px 14px;
      border-radius: 6px;
      border: 1px solid transparent;

      &.up-block {
        border-left: 4px solid #23b586;
        background: linear-gradient(90deg, rgba(35, 181, 134, 0.05) 0%, #1a2330 100%);
      }

      &.down-block {
        border-left: 4px solid #ff4d4f;
        background: linear-gradient(90deg, rgba(255, 77, 79, 0.05) 0%, #1a2330 100%);
      }

      .icon-up { color: #23b586; font-size: 18px; margin-top: 2px; }
      .icon-down { color: #ff4d4f; font-size: 18px; margin-top: 2px; }

      .text-content { flex: 1; }

      /* 关键词高亮 */
      .hl-up {
        color: #23b586;
        font-weight: 600;
        margin: 0 2px;
      }

      .hl-down {
        color: #ff4d4f;
        font-weight: 600;
        margin: 0 2px;
      }
    }
  }
}
</style>
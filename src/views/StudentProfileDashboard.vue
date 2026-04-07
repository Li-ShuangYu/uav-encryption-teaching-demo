<script lang="ts" setup>
import { ref, onMounted, nextTick, shallowRef } from "vue";
import * as echarts from "echarts";

// ================= 数据模拟 (Mock) =================

// 头部与用户信息
const userInfo = ref({ userName: "张同学" });
const pageTitle = ref("密盾智学 / 学员画像");

// 学生信息
const studentInfo = ref({
  studentName: "张同学",
  studentSex: "男",
  studentGradeName: "2024级",
  studentClassName: "一班",
  studentMajor: "密码学应用",
});

const comprehensive = ref([
  { label: "学习力指数", value: 85 },
  { label: "知识掌握度", value: "4.2/5.0" },
]);

// 新增：右下角简单组件的数据 (近期学习表现)
const learningMetrics = ref([
  { name: "课程任务完成率", value: 92, color: "#38b99b" },
  { name: "课后作业优秀率", value: 85, color: "#409EFF" },
  { name: "课堂互动参与度", value: 78, color: "#E6A23C" },
  { name: "实践报告达标率", value: 88, color: "#909399" },
]);

// ================= ECharts 渲染逻辑 =================
const radarBeforeRef = ref<HTMLDivElement | null>(null);
const radarAfterRef = ref<HTMLDivElement | null>(null);

const radarBeforeChart = shallowRef<echarts.ECharts | null>(null);
const radarAfterChart = shallowRef<echarts.ECharts | null>(null);

// 通用雷达图配置模板
const getRadarOption = (title: string, data: number[], color: string, areaColor: string) => ({
  title: {
    text: title,
    left: "center",
    textStyle: { fontSize: 14, color: "#484f6d", fontWeight: "normal" }
  },
  tooltip: { trigger: "item" },
  radar: {
    // 指标名称纯净，不带 (0-100)
    indicator: [
      { name: "学习态度", max: 100 },
      { name: "知识掌握", max: 100 },
      { name: "思维认知", max: 100 },
      { name: "应试策略", max: 100 },
      { name: "综合素养", max: 100 },
    ],
    radius: "60%",
    center: ["50%", "55%"],
    splitArea: { show: true },
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
          // 开启雷达图节点上的数值显示
          label: {
            show: true,
            formatter: '{c}',
            color: '#666',
            fontSize: 12
          }
        },
      ],
    },
  ],
});

const initCharts = () => {
  // 1. 左侧：课前初始画像
  if (radarBeforeRef.value) {
    radarBeforeChart.value = echarts.init(radarBeforeRef.value);
    radarBeforeChart.value.setOption(
      getRadarOption("课前初始水平", [50, 45, 60, 40, 55], "#909399", "rgba(144,147,153,0.3)")
    );
  }

  // 2. 左侧：课后变化画像
  if (radarAfterRef.value) {
    radarAfterChart.value = echarts.init(radarAfterRef.value);
    radarAfterChart.value.setOption(
      getRadarOption("课后提升水平", [85, 88, 82, 75, 80], "#409EFF", "rgba(64,158,255,0.3)")
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
    <aside class="full-aside">
      <div class="aside-logo">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="logo" class="logo-img" />
      </div>

      <div class="full-aside__buttons-wrapper">
        <div class="full-aside__buttons">
          <div class="full-aside__button active">
            <el-icon :size="24"><DataLine /></el-icon>
          </div>
          <div class="full-aside__button">
            <el-icon :size="24"><Reading /></el-icon>
          </div>
          <div class="full-aside__button">
            <el-icon :size="24"><Setting /></el-icon>
          </div>
        </div>
      </div>
    </aside>

    <div class="main-container">
      <header class="full-header">
        <div class="full-header-bar">
          <div class="full-header-title">
            <div class="full-header-title-icon">
              <el-icon><Monitor /></el-icon>
            </div>
            <div class="full-header-title-name">{{ pageTitle }}</div>
          </div>
          
          <div style="display: flex; gap: 20px; align-items: center;">
            <div class="full-header-user">
              <div class="full-header-user-name">
                <span>{{ userInfo.userName }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="content-body">
        <div class="container">
          <div class="vessel">
            
            <div class="container-left container-border">
              <div class="head-title">
                <el-icon :size="18" class="mr-2"><Histogram /></el-icon>
                <div class="title-name">能力画像演变 (课前 vs 课后)</div>
              </div>
              
              <div class="fill-up compare-radar-box">
                <div class="radar-item">
                  <div ref="radarBeforeRef" class="radar-chart-instance"></div>
                </div>
                <div class="divider"></div>
                <div class="radar-item">
                  <div ref="radarAfterRef" class="radar-chart-instance"></div>
                </div>
              </div>
            </div>

            <div class="container-right">
              <div class="student-info container-border">
                <div class="expert-item">
                  <div class="name head-title">
                    <el-icon :size="18" class="mr-2"><UserFilled /></el-icon>
                    <div class="name-text ellipsis">{{ studentInfo.studentName }}</div>
                  </div>
                  <div class="upper">
                    <el-avatar shape="square" :size="80" style="background: #f0f2f5; color: #a8abb2; border-radius: 8px;">
                      <el-icon :size="40"><UserFilled /></el-icon>
                    </el-avatar>
                    <div class="upper-right">
                      <span class="ellipsis">性别：{{ studentInfo.studentSex }}</span>
                      <span class="ellipsis">年级：{{ studentInfo.studentGradeName }}</span>
                      <span class="ellipsis">班级：{{ studentInfo.studentClassName }}</span>
                      <span class="ellipsis">专业：{{ studentInfo.studentMajor }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="composite-index container-border">
                <div class="head-title">
                  <el-icon :size="18" class="mr-2"><Odometer /></el-icon>
                  <div class="title-name">综合指数</div>
                </div>
                <div class="composite-box">
                  <div class="box-item container-border" v-for="(item, index) in comprehensive" :key="index">
                    <div class="value-label">{{ item.label }}</div>
                    <div class="value">{{ item.value }}</div>
                  </div>
                </div>
              </div>

              <div class="core-dimension container-border">
                <div class="head-title">
                  <el-icon :size="18" class="mr-2"><Medal /></el-icon>
                  <div class="title-name">近期学习表现</div>
                </div>
                <div class="simple-metrics-wrapper">
                  <div class="metric-item" v-for="(item, index) in learningMetrics" :key="index">
                    <div class="metric-header">
                      <span class="metric-name">{{ item.name }}</span>
                      <span class="metric-value">{{ item.value }}%</span>
                    </div>
                    <el-progress 
                      :percentage="item.value" 
                      :color="item.color" 
                      :show-text="false" 
                      :stroke-width="8" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ================= 全局布局 ================= */
.layout-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f7f9fc;
  font-family: PingFangSC-Regular, sans-serif;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.content-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.mr-2 {
  margin-right: 8px;
}

/* ================= 侧边栏样式 ================= */
.full-aside {
  width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e7ecf5;
  background: #ffffff;
  flex-shrink: 0;

  /* Logo 容器样式 */
  .aside-logo {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e7ecf5;

    .logo-img {
      width: 40px; /* 根据你的图片大小调整 */
      height: 40px;
      object-fit: contain;
      border-radius: 4px; /* 如果需要圆角可以取消注释 */
    }
  }

  &__buttons-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__button {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 8px;
    color: #a3baed;
    transition: all 0.3s;

    &.active {
      background-color: var(--el-color-primary-light-9, #ecf5ff);
      color: var(--el-color-primary, #409EFF);
    }

    &:hover {
      color: var(--el-color-primary, #409EFF);
      background-color: #f5f7fa;
    }
  }
}

/* ================= 顶部导航栏样式 ================= */
.full-header {
  height: 70px;
  background: #ffffff;
  flex-shrink: 0;
  border-bottom: 1px solid #e7ecf5;

  &-bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  &-title {
    display: flex;
    align-items: center;
    
    &-icon {
      width: 28px;
      height: 28px;
      background: var(--el-color-primary, #409EFF);
      border-radius: 4px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-name {
      font-weight: 700;
      font-size: 20px;
      padding-left: 10px;
      color: #0d1634;
    }
  }

  &-user {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    
    &-name {
      font-size: 14px;
      color: #1d2c43;
    }
  }
}

/* ================= 核心内容区样式 ================= */
.container {
  height: 100%;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .vessel {
    flex: 1;
    min-height: 0;
    gap: 20px;
    display: flex;
    
    .container-border {
      border: 1px solid #e7ecf5;
      border-radius: 4px;
      background: #ffffff;
    }

    /* 左侧图表区 */
    .container-left {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      
      .compare-radar-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 20px;
        
        .radar-item {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          
          .radar-chart-instance {
            width: 100%;
            height: 100%;
            min-height: 400px;
          }
        }

        .divider {
          width: 1px;
          height: 80%;
          background-color: #e7ecf5;
          margin: 0 20px;
        }
      }
    }

    /* 右侧信息面板 */
    .container-right {
      width: 400px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .student-info {
        height: 160px;
        flex-shrink: 0;
        
        .expert-item {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          
          .upper {
            display: flex;
            gap: 16px;
            padding: 20px;
            
            .upper-right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              flex: 1;
              overflow: hidden;
              font-size: 14px;
              color: #606266;
            }
          }
        }
      }

      .composite-index {
        display: flex;
        flex-direction: column;
        height: 180px;
        flex-shrink: 0;
        
        .composite-box {
          display: flex;
          gap: 20px;
          padding: 20px;
          height: 100%;
          box-sizing: border-box;
          
          .box-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--el-color-primary-light-9, #ecf5ff);
            border: none;
            border-radius: 8px;

            .value-label {
              font-size: 14px;
              color: #909399;
            }
            
            .value {
              font-weight: 700;
              font-size: 32px;
              color: #0d1634;
              margin-top: 10px;
            }
          }
        }
      }

      /* 右下角进度条组件样式 */
      .core-dimension {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        
        .simple-metrics-wrapper {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
          
          .metric-item {
            margin-bottom: 16px;

            .metric-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 14px;
              
              .metric-name {
                color: #606266;
              }
              .metric-value {
                font-weight: bold;
                color: #303133;
              }
            }
          }
        }
      }
    }
  }

  .head-title {
    height: 50px;
    border-bottom: 1px solid #e7ecf5;
    padding: 0 20px;
    background-image: linear-gradient(180deg, var(--el-color-primary-light-9, #ecf5ff) 0%, #ffffff 100%);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    
    .title-name {
      font-weight: 500;
      font-size: 16px;
      color: #0d1634;
      flex: 1;
    }
  }
  
  .fill-up {
    flex: 1;
    min-height: 0;
  }
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
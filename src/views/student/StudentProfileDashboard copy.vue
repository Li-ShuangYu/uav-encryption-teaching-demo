<script lang="ts" setup>
import { ref, onMounted, nextTick, shallowRef } from "vue";
import * as echarts from "echarts";
import MdzxLayout from "@/components/MdzxLayout.vue";
import { Document, UserFilled, Odometer, Medal } from '@element-plus/icons-vue';

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
    textStyle: { fontSize: 15, color: "#303133", fontWeight: "500" }
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
    name: { textStyle: { color: "#606266" } }
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
            color: '#333',
            fontSize: 12
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

  // 右侧图表：课后变化画像
  if (radarAfterRef.value) {
    radarAfterChart.value = echarts.init(radarAfterRef.value);
    radarAfterChart.value.setOption(
      getRadarOption("课后提升画像", [85, 88, 82, 75, 80], "#409EFF", "rgba(64,158,255,0.2)")
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
    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="../../assets/image/mdzx.png" alt="logo" style="width: 28px; height: 28px; border-radius: 4px;" />
      </div>
      <div class="sidebar-menus top-menus">
        <div class="menu-item active" title="学员画像">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        
        <div class="menu-item" title="数据分析">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
        <div class="menu-item" title="教学资源">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
          </div>
        </div>
        <div class="menu-item" title="作业批改">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </div>
        </div>
        <div class="menu-item" title="消息通知">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
        </div>
        <div class="menu-item" title="系统提醒">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="sidebar-menus bottom-menus">
        <div class="menu-item" title="系统设置">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
        </div>
        <div class="menu-item" title="个人中心">
          <div class="menu-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
        </div>
      </div>
    </aside>

    <div class="main-content">
      <MdzxLayout />

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
            <div class="card-header">
              <el-icon color="#409EFF" class="mr-1"><UserFilled /></el-icon>
              <span>学员基本信息</span>
            </div>
            <div class="card-body info-body">
              <div class="upper">
                <el-avatar shape="square" :size="72" style="background: #f0f2f5; color: #a8abb2; border-radius: 4px; flex-shrink: 0;">
                  <el-icon :size="40"><UserFilled /></el-icon>
                </el-avatar>
                <div class="upper-right">
                  <div class="student-name">{{ studentInfo.name }}</div>
                  <!-- <span class="ellipsis">性别：{{ studentInfo.gender }}</span> -->
                  <span class="ellipsis">年级：{{ studentInfo.grade }}</span>
                  <span class="ellipsis">班级：{{ studentInfo.class }}</span>
                  <span class="ellipsis">专业：{{ studentInfo.major }}</span>
                </div>
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
              <el-icon color="#409EFF" class="mr-1"><Medal /></el-icon>
              <span>近期学习表现</span>
            </div>
            <div class="card-body simple-metrics-body">
              <div class="metric-item" v-for="(item, index) in learningMetrics" :key="index">
                <div class="metric-info">
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
  </div>
</template>

<style lang="scss" scoped>
/* 全局重置与变量 */
.layout-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

.mr-1 { margin-right: 6px; }

/* ================== 左侧边栏 ================== */
.sidebar {
  width: 54px;
  background-color: #f7f9fc;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  .sidebar-logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid #f0f2f5;
  }

  .sidebar-menus {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    &.top-menus { flex: 1; padding-top: 15px; gap: 15px; overflow-y: auto; overflow-x: hidden; }
    &.bottom-menus { padding-bottom: 15px; padding-top: 15px; gap: 15px; border-top: 1px solid #f0f2f5; }

    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }

    .menu-item {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399; /* 默认灰色，更符合侧边栏不活跃状态 */
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s;
      flex-shrink: 0;

      &.active {
        color: #409EFF;
        background-color: #e6f1fc;
        position: relative;
        
        &::before {
          content: "";
          position: absolute;
          left: -9px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background-color: #409EFF;
          border-radius: 0 4px 4px 0;
        }
      }
      
      &:hover:not(.active) { 
        color: #409EFF; 
        background-color: #f0f2f5;
      }
      
      .menu-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

/* ================== 右侧主体容器 ================== */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 工作区 */
.workspace {
  flex: 1;
  padding: 20px;
  display: flex;
  gap: 20px;
  overflow: hidden;
}

/* 通用卡片样式 */
.card-container {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.02);

  .card-header {
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f2f5;
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
      background-color: #ebeef5;
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

/* 学生信息卡片 */
.info-card {
  height: 180px;
  flex-shrink: 0;
  
  .info-body {
    .upper {
      display: flex;
      gap: 20px;
      padding: 20px;
      align-items: center;
      
      .upper-right {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
        overflow: hidden;
        font-size: 13px;
        color: #606266;

        .student-name {
          font-size: 18px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 4px;
        }

        .ellipsis {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
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
      border: 1px solid #ebeef5;
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
        background-color: #e6f1fc;
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

/* 进度条组件卡片 */
.radar-card {
  flex: 1;
  min-height: 0;

  .simple-metrics-body {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;

    .metric-item {
      .metric-info {
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
</style>
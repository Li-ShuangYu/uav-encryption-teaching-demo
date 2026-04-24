<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="header-left">
        <div class="logo">
          <div class="logo-img-placeholder">
            <img src="@/assets/image/mdzx.png" alt="Logo" onerror="this.style.display='none'" />
            <span class="img-fallback-text">LOGO</span>
          </div>
          <span class="brand-title">密盾智学 · 管理员控制台</span>
        </div>
      </div>

      <div class="header-right">
        <div class="nav-flat-group">
          <div class="nav-group-title">快捷导航:</div>
          <div class="nav-item" @click="goBack">返回系统首页</div>
        </div>
        <div class="divider"></div>
        <div class="user-actions-flat">
          <div class="user-profile">
            <div class="avatar-wrapper">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>" class="avatar" alt="avatar" />
            </div>
            <span class="user-name">System Admin</span>
          </div>
        </div>
      </div>
    </header>

    <section class="banner-premium">
      <div class="banner-bg-graphics"></div>
      <div class="banner-content">
        <div class="text-area">
          <h1 class="main-title">无人机密码系统设计<span class="dot">·</span>实战控制台</h1>
          <p class="sub-title">模块化导航大屏，全局掌控学生、教师与系统底层测试数据</p>
          <div class="data-badges">
            <span class="badge">全场景路由覆盖</span>
            <span class="badge">共 {{ totalPagesCount }} 个页面节点</span>
          </div>
        </div>
        
        <div class="graphic-area">
          <svg class="ai-illustration" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-grad-admin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#8ab4f8;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:0.2" />
              </linearGradient>
            </defs>
            <path d="M100 120 L200 60 L300 120 L200 180 Z" stroke="url(#line-grad-admin)" stroke-width="2" fill="none" />
            <circle cx="200" cy="120" r="40" stroke="#1a73e8" stroke-width="1" fill="rgba(26,115,232,0.1)" />
            <circle cx="100" cy="120" r="8" fill="#1a73e8" />
            <circle cx="300" cy="120" r="8" fill="#1a73e8" />
            <circle cx="200" cy="60" r="8" fill="#1a73e8" />
            <circle cx="200" cy="180" r="8" fill="#1a73e8" />
            <path d="M160 120 A40 40 0 1 1 240 120" stroke="#1a73e8" stroke-width="2" fill="none" stroke-dasharray="5 10">
              <animateTransform attributeName="transform" type="rotate" from="0 200 120" to="360 200 120" dur="10s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>
    </section>

    <div class="tabs-container">
      <div class="tabs-wrapper">
        <button 
          @click="activeCategory = 'student'"
          class="tab-btn" :class="{ 'active': activeCategory === 'student' }">
          🎓 学生端节点 ({{ studentPagesCount }})
        </button>
        <button 
          @click="activeCategory = 'teacher'"
          class="tab-btn teacher-tab" :class="{ 'active': activeCategory === 'teacher' }">
          👨‍🏫 教师端节点 ({{ teacherPagesCount }})
        </button>
        <button 
          @click="activeCategory = 'other'"
          class="tab-btn other-tab" :class="{ 'active': activeCategory === 'other' }">
          ⚙️ 系统数据与测试 ({{ otherPagesCount }})
        </button>
      </div>
    </div>

    <main class="main-content">
      <transition name="fade-slide" mode="out-in">
        <div :key="activeCategory" class="content-wrapper">
          
          <div v-for="(group, index) in currentDataGroups" :key="index" class="section-wrapper">
            <h2 class="group-header" :class="activeCategory">{{ group.groupName }}</h2>
            
            <div class="card-grid">
              <div 
                class="card" 
                v-for="page in group.pages" 
                :key="page.path"
                :class="{ 'card-highlight': page.highlight }"
                @click="navigateTo(page.path)"
                style="cursor: pointer;"
              >
                <div class="card-body">
                  <div class="card-icon" :class="'icon-' + activeCategory">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="page.icon || 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'"></path>
                    </svg>
                  </div>
                  <div class="card-info">
                    <h3>{{ page.name }}</h3>
                    <p>{{ page.desc }}</p>
                  </div>
                </div>
                <div class="card-footer">
                  <button 
                    class="btn btn-primary btn-always-blue"
                    @click.stop="navigateTo(page.path)">
                    进入页面 →
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeCategory = ref('student')

// --- 细化分组与数据增强 ---
// 我为每个页面补充了desc属性，并在大类下进行了二级分组(groupName)，让界面更具逻辑性

const studentDataGroups = [
  {
    groupName: '任务流转与协作',
    pages: [
      { name: '需求提交页', desc: '学生端发起系统设计需求与规划书的入口', path: '/student/task-receive', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
      { name: '任务接收与选择', desc: '浏览导师下发任务，完成内部认领与分工', path: '/student/task-select', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
      { name: '任务详情页', desc: '查看具体任务指标、要求与拆解步骤全景', path: '/student/task-split', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
      { name: '方案上传页', desc: '上传密码系统设计方案、报告及相关附件', path: '/student/scheme-upload', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
    ]
  },
  {
    groupName: '评分与AI辅助联调',
    pages: [
      { name: '组间方案评分页', desc: '参与小组间互评，对其他组方案进行多维打分', path: '/student/scheme-detail', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { name: '方案总分页', desc: '查看本组最终得分雷达图、教师评语与AI建议', path: '/student/my-score-result', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
      { name: 'AI智能助手', desc: '调用专属Agent辅导完成代码纠错与设计排障', path: '/student-debug/robot-debug', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
      { name: '代码部署', desc: '编译、打包并一键部署至无人机测试环境', path: '/student-debug/deploy', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
      { name: '机器人调试', desc: '硬件状态回传与底层机器人联调控制台', path: '/student-debug/debug', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
    ]
  }
]

const teacherDataGroups = [
  {
    groupName: '需求统筹与任务监控',
    pages: [
      { name: '需求汇总页', desc: '全局概览并审核所有学生团队提交的系统需求', path: '/teacher/demand-summary', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
      { name: '分组任务进度展示', path: '/teacher/task-split', desc: '实时追踪四大分组的任务拆解与执行状态大屏', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2' },
      { name: '分组方案全局展示', path: '/teacher/scheme-split', desc: '矩阵化展示所有小组提交的最终密码系统方案', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    ]
  },
  {
    groupName: 'AI评估与多维成绩打分',
    pages: [
      { name: '方案AI评估工作台', path: '/teacher/ai-evaluate', desc: '一键调用大模型生成评估报告与深度优化建议', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
      { name: '细颗粒度打分面板', path: '/teacher/scheme-detail', desc: '教师介入对安全性、性能等多个维度进行人工批阅', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { name: '班级成绩总览大屏', path: '/teacher/group-score-overview', desc: '汇总全班总评、生生互评、AI评分的最终数据报表', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2' }
    ]
  }
]

const otherDataGroups = [
  {
    groupName: '📊 学生/班级全息画像',
    pages: [
      { name: '学情诊断报告Demo', desc: '基于全量数据的班级学习状态多维诊断书', path: '/student-diagnostic-report-demo', highlight: true },
      { name: '教师版学情诊断', desc: '教师专用的深度学习短板与异常提醒监控', path: '/teacher-diagnostic-report', highlight: true },
      { name: '班级能力画像', desc: '一班级综合能力雷达图与趋势追踪展示', path: '/student-archive/class-competency/class1' },
      { name: '个体能力画像', desc: '针对单个学生的学习轨迹与知识点掌握追踪', path: '/student-archive/competrncy/101' },
      { name: '智能分组推荐', desc: '基于能力互补算法的AI自适应组队建议', path: '/group-recommendation' },
      { name: '学生课后活跃监控', desc: '统计课后作业完成度与平台交互情况', path: '/teacher/student-group' }
    ]
  },
  {
    groupName: '🤖 智能体与知识图谱',
    pages: [
      { name: '3x3 智能矩阵管理', desc: '管理底层的Agent状态机交互矩阵 (Vue版)', path: '/matrix-3x3' },
      { name: '课程全域知识图谱', desc: '3D可视化展现密码系统的知识节点依赖关系', path: '/showcase/course-knowledge-graph' },
      { name: '课程核心知识库', desc: 'RAG向量库引用的底层核心切片文件管理', path: '/showcase/course-knowledge' },
    ]
  },
  {
    groupName: '🛠️ 原型、测试与底层静态页',
    pages: [
      { name: '学情分析分组页', desc: '功能测试页：教师端发布任务的页面备份', path: '/teacher/task-publish' },
      { name: '需求分屏对比', desc: '功能测试页：分屏审阅需求代码', path: '/teacher/demand-split' },
      { name: '系统导航首页', desc: '原始框架的主路由导航入口', path: '/initial' },
      { name: '学生舱主控面板', desc: '学生端仪表盘组件测试环境', path: '/student-cabin' },
      { name: '教师教学构建器', desc: '用于编排课程流的沙盒编辑器', path: '/teacher-builder' },
      { name: '教学成果数字展厅', desc: '外部展示用的优秀案例聚合落地页', path: '/achievement-detail' },
      { name: '3x3矩阵 (HTML)', desc: '静态原型：底层的Agent状态机交互矩阵', path: '/10_3x3矩阵.html' },
      { name: '4x5矩阵 (HTML)', desc: '静态原型：扩展规模的状态流转图', path: '/8_4x5矩阵.html' },
      { name: '暗黑风画像 (HTML)', desc: '静态原型：科技风神秘教育数据画像面板', path: '/暗黑科技风神秘教育数据画像.html' },
      { name: '密码分层架构 (HTML)', desc: '静态演示：密码系统设计的业务分层剖析', path: '/密码系统设计分层.html' },
      { name: '数字档案首版 (HTML)', desc: '静态原型：全息数字档案V1迭代版本', path: '/数字档案第一版.html' },
      { name: '图片播放组件 (HTML)', desc: '独立媒体播放与轮播测试沙盒', path: '/图片播放.html' },
      { name: '教学成果展示', desc: '展示密码工程教学成果的详细内容', path: '/achievement-detail' }
    ]
  }
]

// --- 计数器计算 ---
const countPages = (groups) => groups.reduce((acc, curr) => acc + curr.pages.length, 0)
const studentPagesCount = computed(() => countPages(studentDataGroups))
const teacherPagesCount = computed(() => countPages(teacherDataGroups))
const otherPagesCount = computed(() => countPages(otherDataGroups))
const totalPagesCount = computed(() => studentPagesCount.value + teacherPagesCount.value + otherPagesCount.value)

// 动态获取当前选中的分组数据
const currentDataGroups = computed(() => {
  if (activeCategory.value === 'student') return studentDataGroups
  if (activeCategory.value === 'teacher') return teacherDataGroups
  return otherDataGroups
})

// --- 路由与操作 ---
const navigateTo = (path) => {
  if (path.endsWith('.html')) {
    // 静态 HTML 直接新窗口打开
    const fullPath = path.startsWith('/') ? path : '/' + path
    window.open(fullPath, '_blank')
  } else {
    router.push(path)
  }
}

const goBack = () => router.push('/')
</script>

<style scoped>
/* 继承的基础变量，为了区分板块，加入了一些衍生色彩 */
:root {
  --primary-blue: #1a73e8;
  --primary-hover: #1557b0;
  --teacher-green: #059669;
  --teacher-green-hover: #047857;
  --other-purple: #7c3aed;
  --other-purple-hover: #6d28d9;
  --bg-color: #f8fafc;
  --text-main: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f7fb;
  overflow: hidden;
}

/* --- Header 样式完全沿用 --- */
.header {
  height: 64px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 100;
  flex-shrink: 0;
}
.header-left, .header-right { display: flex; align-items: center; }
.logo { display: flex; align-items: center; gap: 12px; }
.logo-img-placeholder { width: 32px; height: 32px; background: linear-gradient(135deg, #1a73e8, #4fa3ff); border-radius: 6px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
.logo-img-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.img-fallback-text { font-size: 8px; color: white; font-weight: bold; position: absolute; }
.brand-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.header-right { gap: 24px; }
.nav-flat-group { display: flex; align-items: center; gap: 8px; background-color: #f8fafc; padding: 4px 6px; border-radius: 8px; border: 1px solid #e2e8f0; }
.nav-group-title { font-size: 13px; color: #94a3b8; margin: 0 4px 0 8px; font-weight: 500; }
.nav-item { font-size: 13px; color: #475569; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-weight: 600; }
.nav-item:hover { background-color: #e2e8f0; color: #0f172a; }
.divider { width: 1px; height: 24px; background-color: #e2e8f0; }
.user-actions-flat { display: flex; align-items: center; gap: 16px; }
.user-profile { display: flex; align-items: center; gap: 8px; }
.avatar-wrapper { width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; padding: 2px; border: 1px solid #cbd5e1; }
.avatar { width: 100%; height: 100%; border-radius: 50%; }
.user-name { font-size: 14px; font-weight: 600; color: #1e293b; }

/* --- Banner 区域调整 --- */
.banner-premium {
  height: 180px; /* 较首页稍微收窄高度 */
  background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f1f5f9 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
}
.banner-bg-graphics {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(26, 115, 232, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 115, 232, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
}
.banner-content {
  position: relative; z-index: 1; width: 100%; max-width: 1400px; padding: 0 40px; display: flex; align-items: center; justify-content: space-between;
}
.main-title { font-size: 36px; color: #0f172a; font-weight: 900; letter-spacing: 1px; margin: 0 0 10px 0; }
.main-title .dot { color: #1a73e8; margin: 0 8px; }
.sub-title { font-size: 15px; color: #475569; font-weight: 500; margin: 0 0 20px 0; }
.data-badges { display: flex; gap: 12px; }
.badge { background: #fff; color: #1a73e8; border: 1px solid #bfdbfe; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.02);}
.graphic-area { width: 300px; height: 180px; display: flex; align-items: center; justify-content: center; }

/* --- 顶级分类 Tabs 导航 --- */
.tabs-container {
  display: flex;
  justify-content: center;
  padding: 24px 0 0 0;
  background-color: transparent;
  flex-shrink: 0;
}
.tabs-wrapper {
  display: inline-flex;
  background: #ffffff;
  padding: 6px;
  border-radius: 40px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  gap: 8px;
}
.tab-btn {
  border: none;
  background: transparent;
  padding: 10px 24px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  text-align: center;
  line-height: 1.5;
  min-width: 120px;
}
.tab-btn:hover { background: #f1f5f9; color: #1e293b; }
.tab-btn.active { background: #1a73e8 !important; color: #ffffff !important; box-shadow: 0 4px 12px rgba(26,115,232,0.25); }
.tab-btn.teacher-tab.active { background: #059669 !important; color: #ffffff !important; box-shadow: 0 4px 12px rgba(5,150,105,0.25); }
.tab-btn.other-tab.active { background: #7c3aed !important; color: #ffffff !important; box-shadow: 0 4px 12px rgba(124,58,237,0.25); }

/* --- 主体区域与卡片布局 --- */
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 24px 40px 60px 40px;
  overflow-y: auto;
}
.content-wrapper {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.section-wrapper { width: 100%; }

.group-header {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.group-header::before {
  content: '';
  display: block;
  width: 5px;
  height: 18px;
  border-radius: 3px;
}
.group-header.student::before { background: var(--primary-blue); }
.group-header.teacher::before { background: var(--teacher-green); }
.group-header.other::before { background: var(--other-purple); }

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #eef2f6;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}

/* 高亮展示效果（沿用您原先设定的特别关注卡片） */
.card-highlight {
  background: linear-gradient(145deg, #fcfdff 0%, #ffffff 100%);
  border: 1px solid #bfdbfe;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}
.card-highlight:hover { border-color: #60a5fa; }

.card-body {
  display: flex;
  gap: 16px;
}
.card-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}
.icon-student { background-color: #eff6ff; color: var(--primary-blue); border: 1px solid #dbeafe; }
.icon-teacher { background-color: #ecfdf5; color: var(--teacher-green); border: 1px solid #d1fae5; }
.icon-other { background-color: #f5f3ff; color: var(--other-purple); border: 1px solid #ede9fe; }

.card-info h3 { margin: 0 0 6px 0; font-size: 15px; color: #1e293b; font-weight: 700; }
.card-info p { margin: 0; font-size: 12.5px; color: #64748b; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.card-footer { margin-top: 16px; display: flex; justify-content: flex-end; }
.btn { border: none; padding: 6px 16px; border-radius: 16px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; background: transparent;}

/* 根据类别设定按钮样式 */
.btn-student { color: var(--primary-blue); background: #eff6ff; }
.btn-student:hover { background: var(--primary-blue); color: #fff; }

.btn-teacher { color: var(--teacher-green); background: #ecfdf5; }
.btn-teacher:hover { background: var(--teacher-green); color: #fff; }

.btn-other { color: var(--other-purple); background: #f5f3ff; }
.btn-other:hover { background: var(--other-purple); color: #fff; }

.btn-always-blue { color: #ffffff !important; background: var(--primary-blue) !important; }
.btn-always-blue:hover { background: var(--primary-hover) !important; box-shadow: 0 4px 12px rgba(26,115,232,0.3); }

/* 动画过渡 */
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
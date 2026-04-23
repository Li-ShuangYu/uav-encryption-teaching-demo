import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import StudentLayout from '../components/StudentLayout.vue'
import MdzxDebugLayout from '../components/MdzxDebugLayout.vue'
import MdzxLayout from '../components/MdzxLayout.vue'

const routes = [
  // ================= 初始页面 =================
  {
    path: '/',
    redirect: '/initial'
  },
  {
    path: '/initial',
    name: 'InitialPage',
    component: () => import('../views/InitialPage.vue'),
    meta: { title: '初始页面' }
  },
  {
    path: '/detail',
    name: 'AchievementDetail',
    component: () => import('../views/showcase/AchievementDetail/AchievementDetail.vue'),
    meta: { title: '成果展示详情' }
  },
  // ================= 分组推荐页面 =================
  {
    path: '/group-recommendation',
    name: 'GroupRecommendation',
    component: () => import('../views/teacher/GroupRecommendation.vue'),
    meta: { title: '教师控制台' }
  },
  // ================= 教师端页面 =================
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/task-publish', // 默认重定向到教师发布页
    children: [
      {
        path: 'task-publish',
        name: 'TeacherTaskPublish',
        component: () => import('../views/teacher/TeacherTaskPublish.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'demand-summary',
        name: 'TeacherDemandSummary',
        component: () => import('../views/teacher/TeacherDemandSummary.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'demand-split',
        name: 'TeacherDemandSplit',
        component: () => import('../views/teacher/TeacherDemandSplit.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'task-split',
        name: 'TeacherTaskSplit',
        component: () => import('../views/teacher/TeacherTaskSplit.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'scheme-split',
        name: 'TeacherSchemeSplit',
        component: () => import('../views/teacher/TeacherSchemeSplit.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'ai-evaluate',
        name: 'TeacherAiEvaluate',
        component: () => import('../views/teacher/TeacherAiEvaluate.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'simulation',
        name: 'TeacherSimulation',
        component: () => import('../views/teacher/TeacherSimulation.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'scheme-detail',
        name: 'TeacherSchemeDetail',
        component: () => import('../views/teacher/TeacherSchemeDetail.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'group-score-overview',
        name: 'TeacherGroupScoreOverview',
        component: () => import('../views/teacher/TeacherGroupScoreOverview.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'student-group',
        name: 'TeacherStudentGroup',
        component: () => import('../views/teacher/TeacherStudentGroup.vue'),
        meta: { title: '教师控制台' }
      },
    ]
  },
  // ================= 学生端页面 =================
  {
    path: '/student',
    component: StudentLayout,
    redirect: '/student/task-receive', // 默认重定向到学生任务接收页
    children: [
      {
        path: 'task-receive',
        name: 'StudentTaskReceive',
        component: () => import('../views/student/StudentTaskReceive.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'task-select',
        name: 'StudentTaskSelect',
        component: () => import('../views/student/StudentTaskSelect.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'task-split',
        name: 'StudentTaskSplit',
        component: () => import('../views/student/StudentTaskSplit.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'scheme-upload',
        name: 'StudentSchemeUpload',
        component: () => import('../views/student/StudentSchemeUpload.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'scheme-detail',
        name: 'StudentSchemeDetail',
        component: () => import('../views/student/StudentSchemeDetail.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'my-score-result',
        name: 'StudentMyScoreResult',
        component: () => import('../views/student/StudentMyScoreResult.vue'),
        meta: { title: '学生工作台' }
      }
    ]
  },
  // ================= 学生端调试页面（使用 MdzxDebugLayout）=================
  {
    path: '/student-debug',
    component: MdzxDebugLayout,
    redirect: '/student-debug/robot-debug',
    children: [
      {
        path: 'robot-debug',
        name: 'StudentAiGenerate',
        component: () => import('../views/student/StudentAiGenerate.vue'),
        meta: { title: 'AI智能助手' }
      },
      {
        path: 'deploy',
        name: 'StudentDeploy',
        component: () => import('../views/student/StudentDeploy.vue'),
        meta: { title: '代码部署' }
      },
      {
        path: 'debug',
        name: 'StudentDebug',
        component: () => import('../views/student/StudentDebug.vue'),
        meta: { title: '机器人调试' }
      }
    ]
  },
  // ================= 学生档案页面（使用 MdzxLayout）=================
  {
    path: '/student-archive',
    component: MdzxLayout,
    children: [
      {
        path: 'competency/:studentId',
        name: 'StudentCompetencyProfile',
        component: () => import('../views/student/StudentCompetencyProfile.vue'),
        meta: { title: '学生能力画像' }
      },
      {
        path: 'digital/:studentId',
        name: 'StudentDigitalArchive',
        component: () => import('../views/student/StudentDigitalArchive.vue'),
        meta: { title: '学生数字档案' }
      },
      {
        path: 'holographic/:studentId',
        name: 'StudentHolographicArchive',
        component: () => import('../views/student/StudentHolographicArchive.vue'),
        meta: { title: '学生全息数字档案' }
      },
      {
        path: 'class-competency/:classId',
        name: 'ClassCompetencyProfile',
        component: () => import('../views/ClassCompetencyProfile.vue'),
        meta: { title: '班级能力画像' }
      },
      {
        path: 'competrncy/:studentId',
        name: 'StudentCompetrncyProfile',
        component: () => import('../views/StudentCompetrncyProfile.vue'),
        meta: { title: '学生能力画像' }
      },
      {
        path: 'profile-dashboard',
        name: 'ProfileDashboard',
        component: () => import('../views/student/StudentProfileDashboard.vue'),
        meta: { title: '学生对比画像' }
      }
    ]
  },
  // ================= 学生端主页 =================
  {
    path: '/student-home',
    name: 'StudentHome',
    component: () => import('../views/student/StudentHome.vue'),
    meta: { title: '学生端主页' }
  },
  // ================= 管理员页面 =================
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import('../views/AdminPage.vue'),
    meta: { title: '管理员控制台' }
  },
  {
    path: '/matrix-3x3',
    name: 'Matrix3x3',
    component: () => import('../views/Matrix3x3.vue'),
    meta: { title: '3x3矩阵管理' }
  },
  {
    path: '/agent-detail',
    name: 'AgentDetail',
    component: () => import('../views/AgentDetail.vue'),
    meta: { title: '智能体详情' }
  },
  {
    path: '/student-diagnostic-report-demo',
    name: 'StudentDiagnosticReport',
    component: () => import('../views/StudentDiagnosticReport.vue'),
    meta: { title: '学情诊断可视化报告demo' }
  },
  {
    path: '/teacher-diagnostic-report',
    name: 'TeacherDiagnosticReport',
    component: () => import('../views/TeacherDiagnosticReport.vue'),
    meta: { title: '教师学情诊断报告' }
  },
  {
    path: '/showcase/course-knowledge-graph',
    name: 'CourseKnowledgeGraph',
    component: () => import('../views/showcase/course-knowledge/course-knowledge-graph.vue'),
    meta: { title: '课程知识图谱' }
  },
  {
    path: '/showcase/course-knowledge',
    name: 'CourseKnowledge',
    component: () => import('../views/showcase/course-knowledge/course-knowledge.vue'),
    meta: { title: '密码系统设计 - 知识图谱' }
  },
  {
    path: '/teacher-diagnostic-report',
    name: 'TeacherDiagnosticReport',
    component: () => import('../views/TeacherDiagnosticReport.vue'),
    meta: { title: '教师诊断报告' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// ================= 新增：全局前置路由守卫 =================
router.beforeEach((to, from) => {
  // 检查前往的路由是否配置了 title
  if (to.meta && to.meta.title) {
    // 设置浏览器的标题
    document.title = to.meta.title;
  } else {
    // 如果没有配置，给一个默认的兜底标题
    document.title = '密盾智学平台';
  }
  // 直接返回，不需要调用 next()
  return true;
})

export default router
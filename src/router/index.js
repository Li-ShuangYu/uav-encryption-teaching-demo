import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import StudentLayout from '../components/StudentLayout.vue'

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
  // ================= 分组推荐页面 =================
  {
    path: '/group-recommendation',
    name: 'GroupRecommendation',
    component: () => import('../views/GroupRecommendation.vue'),
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
        component: () => import('../views/TeacherTaskPublish.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'demand-summary',
        name: 'TeacherDemandSummary',
        component: () => import('../views/TeacherDemandSummary.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'demand-split',
        name: 'TeacherDemandSplit',
        component: () => import('../views/TeacherDemandSplit.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'task-split',
        name: 'TeacherTaskSplit',
        component: () => import('../views/TeacherTaskSplit.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'scheme-split',
        name: 'TeacherSchemeSplit',
        component: () => import('../views/TeacherSchemeSplit.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'ai-evaluate',
        name: 'TeacherAiEvaluate',
        component: () => import('../views/TeacherAiEvaluate.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'simulation',
        name: 'TeacherSimulation',
        component: () => import('../views/TeacherSimulation.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'scheme-detail',
        name: 'TeacherSchemeDetail',
        component: () => import('../views/TeacherSchemeDetail.vue'),
        meta: { title: '教师控制台' }
      },
      {
        path: 'group-score-overview',
        name: 'TeacherGroupScoreOverview',
        component: () => import('../views/TeacherGroupScoreOverview.vue'),
        meta: { title: '教师控制台' }
      }
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
        component: () => import('../views/StudentTaskReceive.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'task-select',
        name: 'StudentTaskSelect',
        component: () => import('../views/StudentTaskSelect.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'task-split',
        name: 'StudentTaskSplit',
        component: () => import('../views/StudentTaskSplit.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'scheme-upload',
        name: 'StudentSchemeUpload',
        component: () => import('../views/StudentSchemeUpload.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'scheme-detail',
        name: 'StudentSchemeDetail',
        component: () => import('../views/StudentSchemeDetail.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'my-score-result',
        name: 'StudentMyScoreResult',
        component: () => import('../views/StudentMyScoreResult.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'robot-debug',
        name: 'StudentAiGenerate',
        component: () => import('../views/StudentAiGenerate.vue'),
        meta: { title: 'AI智能助手' }
      },
      {
        path: 'deploy',
        name: 'StudentDeploy',
        component: () => import('../views/StudentDeploy.vue'),
        meta: { title: '代码部署' }
      },
      {
        path: 'debug',
        name: 'StudentDebug',
        component: () => import('../views/StudentDebug.vue'),
        meta: { title: '机器人调试' }
      }
    ]
  },
  // ================= 学生端主页 =================
  {
    path: '/student-home',
    name: 'StudentHome',
    component: () => import('../views/StudentHome.vue'),
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
    path: '/profile-dashboard',
    name: 'StudentProfileDashboard',
    component: () => import('../views/StudentProfileDashboard.vue'),
    meta: { title: '个人中心' }
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
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import StudentLayout from '../components/StudentLayout.vue'

const routes = [
  // ================= 初始页面 =================
  {
    path: '/',
    name: 'InitialPage',
    component: () => import('../views/InitialPage.vue'),
    meta: { title: '初始页面' }
  },
  // ================= 学生首页 =================
  {
    path: '/student-home',
    name: 'StudentHome',
    component: () => import('../views/StudentHome.vue'),
    meta: { title: '学生工作台' }
  },
  // ================= 分组推荐页面 =================
  {
    path: '/group-recommendation',
    name: 'GroupRecommendation',
    component: () => import('../views/GroupRecommendation.vue'),
    meta: { title: '分组推荐' }
  },
  // ================= 教师端页面 =================
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/task-publish',
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
      }
    ]
  },
  // ================= 学生端页面 =================
  {
    path: '/student',
    component: StudentLayout,
    redirect: '/student/task-receive',
    children: [
      {
        path: 'task-receive',
        name: 'StudentTaskReceive',
        component: () => import('../views/StudentTaskReceive.vue'),
        meta: { title: '学生工作台' }
      },
      {
        path: 'scheme-upload',
        name: 'StudentSchemeUpload',
        component: () => import('../views/StudentSchemeUpload.vue'),
        meta: { title: '学生工作台' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫，设置页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
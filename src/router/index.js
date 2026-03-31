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
        meta: { title: '屏1：任务发布页' }
      },
      {
        path: 'demand-summary',
        name: 'TeacherDemandSummary',
        component: () => import('../views/TeacherDemandSummary.vue'),
        meta: { title: '屏 2：教学控制台 - 需求分析汇总页' }
      },
      {
        path: 'demand-split',
        name: 'TeacherDemandSplit',
        component: () => import('../views/TeacherDemandSplit.vue'),
        meta: { title: '屏 3：教学控制台 - 4 组需求分屏页' }
      },
      {
        path: 'scheme-split',
        name: 'TeacherSchemeSplit',
        component: () => import('../views/TeacherSchemeSplit.vue'),
        meta: { title: '屏 5：教学控制台 - 4 组方案分屏页' }
      },
      {
        path: 'ai-evaluate',
        name: 'TeacherAiEvaluate',
        component: () => import('../views/TeacherAiEvaluate.vue'),
        meta: { title: '屏 6：教学控制台 - 方案 AI 评估页' }
      },
      {
        path: 'simulation',
        name: 'TeacherSimulation',
        component: () => import('../views/TeacherSimulation.vue'),
        meta: { title: '屏 8：教学控制台 - 4 组仿真性能分屏页' }
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
        meta: { title: '屏 4：学习工作台 - 任务接收 + 需求提交页（合并 1 个页）' }
      },
      {
        path: 'scheme-upload',
        name: 'StudentSchemeUpload',
        component: () => import('../views/StudentSchemeUpload.vue'),
        meta: { title: '屏 7：学习工作台 - 方案上传 + 评估结果页（合并 1 个页）' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
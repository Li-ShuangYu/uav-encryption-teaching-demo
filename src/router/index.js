import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/teacher/task-publish', // 默认重定向到教师发布页
    children: [
      // ================= 教师端页面 =================
      {
        path: 'teacher/task-publish',
        name: 'TeacherTaskPublish',
        component: () => import('../views/TeacherTaskPublish.vue'),
        meta: { title: '屏1：任务发布页' }
      },
      {
        path: 'teacher/demand-summary',
        name: 'TeacherDemandSummary',
        component: () => import('../views/TeacherDemandSummary.vue'),
        meta: { title: '屏 2：教学控制台 - 需求分析汇总页' }
      },
      
      // ================= 学生端页面 =================
      {
        path: 'student/task-receive',
        name: 'StudentTaskReceive',
        component: () => import('../views/StudentTaskReceive.vue'),
        meta: { title: '屏 4：学习工作台 - 任务接收 + 需求提交页（合并 1 个页）' }
      },
      
      // ================= 教师端页面（续）=================
      {
        path: 'teacher/demand-split',
        name: 'TeacherDemandSplit',
        component: () => import('../views/TeacherDemandSplit.vue'),
        meta: { title: '屏 3：教学控制台 - 4 组需求分屏页' }
      },
      {
        path: 'teacher/scheme-split',
        name: 'TeacherSchemeSplit',
        component: () => import('../views/TeacherSchemeSplit.vue'),
        meta: { title: '屏 5：教学控制台 - 4 组方案分屏页' }
      },
      {
        path: 'teacher/ai-evaluate',
        name: 'TeacherAiEvaluate',
        component: () => import('../views/TeacherAiEvaluate.vue'),
        meta: { title: '屏 6：教学控制台 - 方案 AI 评估页' }
      },
      {
        path: 'teacher/simulation',
        name: 'TeacherSimulation',
        component: () => import('../views/TeacherSimulation.vue'),
        meta: { title: '屏 8：教学控制台 - 4 组仿真性能分屏页' }
      },
      
      // ================= 学生端页面（续）=================
      {
        path: 'student/scheme-upload',
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
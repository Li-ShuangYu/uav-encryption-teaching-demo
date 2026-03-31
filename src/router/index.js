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
      }
      
      // 剩下的 5 个页面，你可以直接复制上面的对象格式继续往下加
      // {
      //   path: '...',
      //   name: '...',
      //   component: () => import('../views/....vue'),
      //   meta: { title: '...' }
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
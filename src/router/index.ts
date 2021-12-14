import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  // {
  //   path: '/axios',
  //   name: 'Axios',
  //   component: () => import('@/views/Axios.vue') // 懒加载 Axios 组件
  // },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: Test
  // }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

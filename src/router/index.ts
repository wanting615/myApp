import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../pages/tabs/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/pages/home/Home.vue')
      },
      {
        path: 'find',
        component: () => import('@/pages/ucenter/ucenter.vue')
      },
      {
        path: 'order',
        component: () => import('@/pages/ucenter/ucenter.vue')
      },
      {
        path: 'ucenter',
        component: () => import('@/pages/ucenter/ucenter.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import("@/pages/public/login/login.vue")
  },
  {
    path: '/shop/:id',
    component: () => import("@/pages/public/shop/shop.vue")
  },
  {
    path: '/setting',
    component: () => import("@/pages/ucenter/setting/setting.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

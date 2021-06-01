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
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'order',
        component: () => import('@/views/Tab3.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

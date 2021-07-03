import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { AppRouteRecordRaw } from './types';
import Tabs from '../pages/tabs/Tabs.vue'

// import moudle router
const routetFiles = require.context("./modules", true, /\.ts$/)
let routerModule: Array<AppRouteRecordRaw> = [];
routetFiles.keys().forEach((key) => {
  routerModule = routerModule.concat(routetFiles(key).default)
})

const routes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: "Root",
    redirect: '/tabs/home',
  },
  {
    path: '/tabs/',
    component: Tabs,
    name: 'Tabs',
    children: [
      {
        path: '',
        name: "Default",
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        name: "Home",
        component: () => import('@/pages/home/Home.vue')
      },
      {
        path: 'find',
        name: "Find",
        component: () => import('@/pages/ucenter/ucenter.vue')
      },
      {
        path: 'order',
        name: "Order",
        component: () => import('@/pages/ucenter/ucenter.vue')
      },
      {
        path: 'ucenter',
        name: 'Ucenter',
        component: () => import('@/pages/ucenter/ucenter.vue')
      }
    ]
  },
  ...routerModule
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes as unknown as RouteRecordRaw[]
})

export default router

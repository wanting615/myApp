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

console.log(routerModule)

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
        name: "default",
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        name: "home",
        component: () => import('@/pages/home/Home.vue')
      },
      {
        path: 'find',
        name: "find",
        component: () => import('@/pages/find/find.vue')
      },
      {
        path: 'orderList',
        name: "orderList",
        component: () => import('@/pages/order/orderList/orderList.vue')
      },
      {
        path: 'ucenter',
        name: 'ucenter',
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

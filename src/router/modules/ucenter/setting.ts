import { AppRouteRecordRaw } from '@/router/types';
const setting: Array<AppRouteRecordRaw> = [
  {
    path: '/setting',
    name: 'setting',
    component: () => import("@/pages/ucenter/setting/setting.vue")
  },
  {
    path: "/account",
    name: 'account',
    meta: {
      needLogin: true
    },
    component: () => import("@/pages/ucenter/setting/account/account.vue")
  },
  {
    path: '/password',
    name: 'password',
    meta: {
      needLogin: true
    },
    component: () => import("@/pages/ucenter/setting/account/password/password.vue")
  },
  {
    path: '/general',
    name: 'general',
    component: () => import("@/pages/ucenter/setting/general/general.vue")
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import("@/pages/ucenter/setting/general/personal.vue")
  },
  {
    path: '/systemMsg',
    name: 'systemMsg',
    component: () => import("@/pages/ucenter/setting/systemMsg/systemMsg.vue")
  },
  {
    path: '/about',
    name: 'about',
    component: () => import("@/pages/ucenter/setting/about/about.vue")
  }
]

export default setting;
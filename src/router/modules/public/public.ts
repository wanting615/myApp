import { AppRouteRecordRaw } from '@/router/types';

const publicPage: Array<AppRouteRecordRaw> = [
  {
    path: '/login',
    name: "Login",
    component: () => import("@/pages/public/login/login.vue")
  },
  {
    path: '/shop/:id',
    name: "Shop",
    component: () => import("@/pages/public/shop/shop.vue")
  },
]

export default publicPage;
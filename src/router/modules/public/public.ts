import { AppRouteRecordRaw } from '@/router/types';

const publicPage: Array<AppRouteRecordRaw> = [
  {
    path: '/login',
    name: "Login",
    component: () => import("@/pages/public/login/login.vue")
  },
  {
    path: '/shop/:id',
    name: "shop",
    component: () => import("@/pages/public/shop/shop.vue")
  },
  {
    path: '/map',
    name: 'map',
    component: () => import("@/components/common/map/map.vue")
  }
]

export default publicPage;
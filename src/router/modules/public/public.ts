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
  {
    path: '/map',
    name: 'map',
    component: () => import("@/components/common/map/map.vue")
  },
  {
    path: '/comfirmOrder',
    name: 'comfirmOrder',
    component: () => import("@/pages/public/comfirmOrder/comfirmOrder.vue")
  }
]

export default publicPage;
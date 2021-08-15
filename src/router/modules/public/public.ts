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
    path: '/orderList',
    name: 'orderList',
    component: () => import("@/pages/public/order/orderList/orderList.vue")
  },
  {
    path: '/orderDetail/:orderId',
    name: 'orderDetail',
    component: () => import("@/pages/public/order/orderDetail/orderDetail.vue")
  },
  {
    path: '/comfirmOrder',
    name: 'comfirmOrder',
    component: () => import("@/pages/public/order/comfirmOrder/comfirmOrder.vue")
  },
  {
    path: '/remarks',
    name: 'remarks',
    component: () => import("@/pages/public/order/comfirmOrder/remarks.vue")
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import("@/pages/public/order/comfirmOrder/invoice.vue")
  }
]

export default publicPage;
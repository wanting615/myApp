import { AppRouteRecordRaw } from '@/router/types';

const orderPage: Array<AppRouteRecordRaw> = [
  {
    path: '/orderDetail/:orderId',
    name: 'orderDetail',
    component: () => import("@/pages/order/orderDetail/orderDetail.vue")
  },
  {
    path: '/comfirmOrder',
    name: 'comfirmOrder',
    component: () => import("@/pages/order/comfirmOrder/comfirmOrder.vue")
  },
  {
    path: '/remarks',
    name: 'remarks',
    component: () => import("@/pages/order/comfirmOrder/remarks.vue")
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import("@/pages/order/comfirmOrder/invoice.vue")
  }
]

export default orderPage;


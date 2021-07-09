import { AppRouteRecordRaw } from "@/router/types";

const address: Array<AppRouteRecordRaw> = [
  {
    path: '/address',
    name: 'address',
    component: () => import("@/pages/ucenter/address/address.vue"),
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import("@/pages/ucenter/address/addAddress.vue")
  }
]

export default address;
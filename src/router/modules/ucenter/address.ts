import { AppRouteRecordRaw } from "@/router/types";

const address: Array<AppRouteRecordRaw> = [
  {
    path: '/address',
    name: 'address',
    component: () => import("@/pages/ucenter/address/address.vue"),
  }
]

export default address;
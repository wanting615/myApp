import { AppRouteRecordRaw } from "@/router/types";

const hongbaos: AppRouteRecordRaw[] = [
  {
    path: '/hongbao',
    name: 'hongbao',
    component: () => import("@/pages/ucenter/hongbao/hongbao.vue")
  },
  {
    path: '/chooseHongbao',
    name: 'chooseHongbao',
    component: () => import("@/pages/ucenter/hongbao/chooseHongbao.vue")
  },
  {
    path: '/exchangeHongbao',
    name: 'exchangeHongbao',
    component: () => import("@/pages/ucenter/hongbao/exchangeHongbao.vue")
  }
]

export default hongbaos;
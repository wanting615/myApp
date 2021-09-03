import { AppRouteRecordRaw } from "@/router/types";

const homePage: Array<AppRouteRecordRaw> = [
  {
    path: '/ShopClassify/:type',
    name: 'ShopClassify',
    component: () => import('@/pages/home/shopClassify/shopClassify.vue')
  }
]

export default homePage;


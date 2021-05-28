/*
 * @Date: 2021-05-19 15:15:17
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-20 17:34:40
 * @FilePath: /elm-app/src/pages/home/homeInterface.ts
 */
export interface Possiton {//定位信息
  address: string; //详细地址
  city: string; //城市
  latitude: string; //纬度
  longitude: string; //经度
  msg: string;
  name: string; //地址名称
  state: boolean;
}

export interface ShopClassifyInfo {
  msg: string;
  status: boolean;
  data: ShopClassify[];
}

export interface ShopClassify {
  description: string; //描述
  icon_url: string;
  id: 20;
  image_url: string;
  is_in_serving: boolean;
  link: string;
  title: string;
  title_color: string;
}

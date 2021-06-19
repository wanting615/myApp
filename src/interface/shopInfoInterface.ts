/*
 * @Date: 2021-05-20 17:34:06
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-21 14:31:39
 * @FilePath: /elm-app/src/components/shop/shopInfoInterface.ts
 */
//商店属性
export interface ShopInfo {
  activities: Activity[]; //活动
  address: string; //地址信息
  category: string; //品种、类别
  delivery_mode: Delivery[]; //支持配送方式
  description: string; //商店宣传语
  distance: string; //距离
  float_delivery_fee: number; //配送费
  float_minimum_order_amount: number; //最低配送金额
  id: number;
  identification: {//身份
    company_name: string; //公司名称
    identificate_agency: string;
    identificate_date: Date;
    legal_person: string;
    licenses_date: string;
    licenses_number: string;
    licenses_scope: string;
    operation_period: string;
    registered_address: string;
    registered_number: string;
  };
  image_path: string; //头像地址
  is_new: boolean; //新店
  is_premium: boolean; //是否品牌
  latitude: string; //纬度
  longitude: string; //经度
  license: {
    business_license_image: string; //商业license图片
    catering_service_license_image: string;
  }[];
  location: number[]; //经纬度
  name: string; //商店名称
  opening_hours: string[]; //开门时间
  order_lead_time: string; //配送时间
  phone: string;  //手机号
  piecewise_agent_fee: { tips: string }[]; //配送费tips
  promotion_info: string; //描述
  rating: number; //评分
  rating_count: number; //评分人数
  recent_order_num: number; //订单数量
  status: number;
  supports: Support[]; //支持的商家属性
}

//商店活动
export interface Activity {
  description: string; //活动描述
  icon_color: string; //活动图标颜色
  icon_name: string;  //图标名称
  id: number;
  name: string; //活动名称
  _id: string;
}
//商店配送方式
export interface Delivery {
  color: string; //颜色
  id: number;
  is_solid: true; //有效的
  text: string; //配送名称
}

//商家支持的属性 如： 外卖保
export interface Support {
  description: string; //描述
  icon_color: string; //图提颜色
  icon_name: string;  //标提名称
  id: number;
  name: string; //名称
  _id: string;
}

//商店分类
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


export type ShopListType = ShopInfo[];
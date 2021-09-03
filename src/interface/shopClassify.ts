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

export interface FoodClassify {
  count: number;
  id: number;
  image_url: string;
  level: number;
  name: string;
  _id: string;
}
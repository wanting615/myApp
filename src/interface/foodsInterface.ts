export interface FoodsMenu {
  num: number;//购物车 食品数量
  icon_url: string;
  id: number;
  foods: Food[];
  is_selected: boolean;
  name: string;
  restaurant_id: number;
  type: number;
  __v: number;
  description: string;
}

export interface Food {
  num: number; //添加到购物车 食品数量
  activity: {
    image_text_color: string;
    icon_color: string;
    image_text: string;
  };
  attributes: Attribute[];
  attrs: [];
  category_id: number;
  description: string;
  display_times: [];
  image_path: string;
  is_essential: boolean;
  is_featured: boolean;
  item_id: number;
  month_sales: number;
  name: string;
  pinyin_name: string;
  rating: number;
  rating_count: number;
  restaurant_id: number;
  satisfy_count: number;
  satisfy_rate: number;
  server_utc: string;
  specfoods: Specfood[];
  specifications: Specification[];
  tips: string;
  __v: number;
}

interface Attribute {
  icon_color: string;
  icon_name: string;
}

interface Specfood {
  checkout_mode: number;
  food_id: number;
  is_essential: boolean;
  item_id: number;
  name: string;
  original_price: number;
  packing_fee: number;
  pinyin_name: string;
  price: number;
  promotion_stock: number;
  recent_popularity: number;
  recent_rating: number;
  restaurant_id: number;
  sku_id: number;
  sold_out: boolean;
  specs_name: string;
  stock: number;
  specs: { name: string; value: string }[];
}

interface Specification {
  name: string;
  values: string[];
}
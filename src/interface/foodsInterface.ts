export interface FoodsMenu {
  num: number;//购物车 食品数量
  icon_url: string;//图片icon
  id: number;
  foods: Food[];//食物
  is_selected: boolean;//是否选中
  name: string;//名称
  restaurant_id: number;//餐馆id
  type: number;//类型
  __v: number;
  description: string;
}

export interface Food {
  num: number; //添加到购物车 食品数量
  imagePath: string;//食物图片
  activity: { //食品活动
    image_text_color: string;
    icon_color: string;
    image_text: string;
  };
  attributes: Attribute[];//标识
  attrs: [];
  category_id: number;//餐馆id
  description: string;//食品说明
  display_times: [];
  image_path: string;//图片地址
  is_essential: boolean;
  is_featured: boolean;//无用
  item_id: number;//食品id
  month_sales: number;//月售
  name: string;//食品名称
  pinyin_name: string;//pinyin name
  rating: number;//评分
  rating_count: number;//评分人数
  restaurant_id: number;//餐馆id
  satisfy_count: number;//
  satisfy_rate: number;//
  server_utc: string;//
  specfoods: Specfood[];
  specifications: Specification[];//选规格
  tips: string;//tip
  __v: number;
}

interface Attribute {
  icon_color: string;//icon颜色
  icon_name: string;//icon名称
}

interface Specfood {//食品规格
  checkout_mode: number;//
  food_id: number;//foodid
  is_essential: boolean;//必点品
  item_id: number;//item id
  name: string;//食品名称
  original_price: number;//原价
  packing_fee: number;//打包价格
  pinyin_name: string;//pinyin 
  price: number;//现价
  promotion_stock: number;
  recent_popularity: number;//最近留下
  recent_rating: number;//最近评分
  restaurant_id: number;//餐馆id
  sku_id: number;//规格id
  sold_out: boolean;//已售罄
  specs_name: string;//规格名称
  stock: number;//库存数量
  specs: { name: string; value: string }[];//规格
}

interface Specification {
  name: string;
  values: string[];
}
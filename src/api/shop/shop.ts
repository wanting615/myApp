import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { Rating, RatingResult, RatingScore, RatingTag, ShopClassify, ShopInfo } from "../../interface/shopInfoInterface";
import { FoodsMenu } from "@/interface/foodsInterface";
import { RootObject } from "@/interface/rootInterface";

//获取商铺分类
export const getShopsClassify = (): Promise<RootObject<ShopClassify[]>> => {
  return HttpService.get<RootObject<ShopClassify[]>>(UrlService.getShopsClassify);
};

//获取商铺列表
export const getShopListAction = (params: {
  latitude: string; //纬度
  longitude: string; //经度
  page: number; //页数
  limit?: number; //条数
  categoryId?: number; //商店分裂
  orderBy?: string; //排序方式
  delivery_mode?: string[]; //配送方式
  support_ids?: number[]; //支持的商家属性
}): Promise<RootObject<ShopInfo[]>> => {
  return HttpService.get<RootObject<ShopInfo[]>>(UrlService.getShopList, params);
};
//获取商铺详情
export const getShopDetail = async (id: string): Promise<RootObject<ShopInfo>> => {
  return HttpService.get<RootObject<ShopInfo>>(UrlService.getShopDetail + id);
}

//获取商店商品清单
export const getShopMenu = async (id: string) => {
  return HttpService.get<RootObject<FoodsMenu[]>>(UrlService.getShopMenu + id);
}

//获取评价列表
const getRatings = (shopId: string) => {
  return HttpService.get<RootObject<Rating[]>>(UrlService.getRatings, { shopId });
}

//查询评价分数
const getScores = (shopId: string) => {
  return HttpService.get<RootObject<RatingScore>>(UrlService.getScores, { shopId });
}

//查询评价分类
const getTags = (shopId: string) => {
  return HttpService.get<RootObject<RatingTag[]>>(UrlService.getTags, { shopId });
}

//并发请求 获取评价列表 查询评价分数 查询评价分类
export const getRatingAll = (shopId: string) => {
  return HttpService.httpAll<RootObject<RatingResult>>([getRatings(shopId), getScores(shopId), getTags(shopId)]);
}

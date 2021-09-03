import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { Rating, RatingResult, RatingScore, RatingTag, ShopClassify, ShopInfo } from "../../interface/shopInfoInterface";
import { FoodsMenu } from "@/interface/foodsInterface";
import { RootObject } from "@/interface/rootInterface";
import { FoodClassify } from "@/interface/shopClassify";

//获取商铺分类
export const getShopsClassify = (): Promise<RootObject<ShopClassify[]>> => {
  return HttpService.get(UrlService.getShopsClassify);
};

//获取商铺列表
export const getShopListAction = (params: {
  latitude: number; //纬度
  longitude: number; //经度
  page: number; //页数
  limit?: number; //条数
  categoryId?: number; //商店分裂
  orderBy?: string; //排序方式
  delivery_mode?: string[]; //配送方式
  support_ids?: number[]; //支持的商家属性
}): Promise<RootObject<ShopInfo[]>> => {
  return HttpService.get(UrlService.getShopList, params);
};
//获取商铺详情
export const getShopDetail = async (id: string | number): Promise<RootObject<ShopInfo>> => {
  return HttpService.get(UrlService.getShopDetail + id);
}

//获取商店商品清单
export const getShopMenu = async (id: string): Promise<RootObject<FoodsMenu[]>> => {
  return HttpService.get(UrlService.getShopMenu + id);
}

//获取评价列表
const getRatings = (shopId: string): Promise<RootObject<Rating[]>> => {
  return HttpService.get(UrlService.getRatings, { shopId });
}

//查询评价分数
const getScores = (shopId: string): Promise<RootObject<RatingScore>> => {
  return HttpService.get(UrlService.getScores, { shopId });
}

//查询评价分类
const getTags = (shopId: string): Promise<RootObject<RatingTag[]>> => {
  return HttpService.get(UrlService.getTags, { shopId });
}

//并发请求 获取评价列表 查询评价分数 查询评价分类
export const getRatingAll = (shopId: string): Promise<RootObject<RatingResult>[]> => {
  return HttpService.httpAll<RootObject<RatingResult>>([getRatings(shopId), getScores(shopId), getTags(shopId)]);
}

//查看所有商品分类
export const getCateGoryList = (): Promise<RootObject<FoodClassify>> => {
  return HttpService.get(UrlService.getCateGoryList);
}

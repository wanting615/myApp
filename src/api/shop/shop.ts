import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { ShopClassify, ShopInfo } from "../../interface/shopInfoInterface";
import { FoodsMenu } from "@/interface/foodsInterface";
import { RootObject } from "@/interface/rootInterface";

//获取商铺分类
export const getShopsClassify = (): Promise<RootObject<ShopClassify[]>> => {
  return HttpService.get<RootObject<ShopClassify[]>>(UrlService.getShopsClassify);
};

//获取商铺列表
export const getShopList = (params: {
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
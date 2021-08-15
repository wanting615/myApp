import { CreateOrderInfo, OrderInfo } from '@/interface/order';
import { UrlService } from "../url.base";
import { HttpService } from "@/until/http.service";
import { RootObject } from "@/interface/rootInterface";

//创建订单
export function createOrder(orderInfo: CreateOrderInfo): Promise<RootObject<OrderInfo>> {
  return HttpService.post(UrlService.createOrder, orderInfo)
}

//获取订单详情
export function getOrderDetail(orderId: number): Promise<RootObject<OrderInfo>> {
  return HttpService.get(UrlService.getOrderDetail, { orderId });
}
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

//获取订单列表
export function getOrderList(page: number): Promise<RootObject<OrderInfo[]>> {
  return HttpService.get(UrlService.getOrderList, { page });
}

//支付订单
export function payOrder(orderId: string): Promise<RootObject<OrderInfo>> {
  return HttpService.get(UrlService.payOrder, { orderId });
}

//确认收货
export function comfirmReceipt(orderId: string): Promise<RootObject<OrderInfo>> {
  return HttpService.get(UrlService.comfirmReceipt, { orderId })
}

//取消订单
export function cancleOrder(orderId: string): Promise<RootObject<OrderInfo>> {
  return HttpService.get(UrlService.cancleOrder, { orderId })
}
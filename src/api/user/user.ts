import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { UserInfo } from "@/interface/user";
import { RootObject } from "@/interface/rootInterface";
import { DeliveryAddressInfo } from "@/interface/addressInterface";
import { Hongbao } from "@/interface/hongbaos";

//登陆
export const loginUser = (token: string): Promise<RootObject<UserInfo>> => {
  return HttpService.post<RootObject<UserInfo>>(UrlService.login, { token })
}

export const getUserInfo = (): Promise<RootObject<UserInfo>> => {
  return HttpService.get<RootObject<UserInfo>>(UrlService.getUserInfo)
}

export const delUser = (): Promise<RootObject<null>> => {
  return HttpService.get(UrlService.delUser)
}

//用户收货地址 增删改查
export const addUserAddress = (addressInfo: DeliveryAddressInfo): Promise<RootObject<null>> => {
  return HttpService.post(UrlService.addUserAddress, addressInfo)
}

//获取收货地址
export const getUserAddress = (): Promise<RootObject<DeliveryAddressInfo[]>> => {
  return HttpService.get(UrlService.getUserAddress);
}

/**
 * 获取收货地址和到收货地址所需时间
 * @param from "31.222,131.2222"
 * @returns 
 */
export const getUserAddressByTime = (from: string): Promise<RootObject<DeliveryAddressInfo[]>> => {
  return HttpService.get(UrlService.getUserAddressByTime, { from });
}

export const delUserAddress = (id: number): Promise<RootObject<DeliveryAddressInfo>> => {
  return HttpService.get(UrlService.delUserAddress, { id });
}


//获取红包list
export const getHongbaos = (status: number): Promise<RootObject<Hongbao[]>> => {
  return HttpService.get(UrlService.getHongbaos, { status })
}

//兑换红包
export const sendHongbaoKey = (): Promise<RootObject<null>> => {
  return HttpService.get(UrlService.sendHongbaoKey)
}
import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { UserInfo } from "@/interface/user";
import { RootObject } from "@/interface/rootInterface";
import { DeliveryAddressInfo } from "@/interface/addressInterface";

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

export const getUserAddress = (): Promise<RootObject<DeliveryAddressInfo[]>> => {
  return HttpService.get(UrlService.getUserAddress);
}

export const delUserAddress = (id: number): Promise<RootObject<DeliveryAddressInfo>> => {
  return HttpService.get(UrlService.delUserAddress, { id });
}

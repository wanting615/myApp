import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { UserInfo } from "@/interface/user";
import { RootObject } from "@/interface/rootInterface";
import { DeliveryAddressInfo } from "@/interface/addressInterface";

//登陆
export const loginUser = (token: string): Promise<RootObject<UserInfo>> => {
  return HttpService.post<RootObject<UserInfo>>(UrlService.login, { token })
}

export const getUserInfo = (token: string): Promise<RootObject<UserInfo>> => {
  return HttpService.get<RootObject<UserInfo>>(UrlService.getUserInfo, { token })
}

export const delUser = (token: string): Promise<RootObject<null>> => {
  return HttpService.get(UrlService.delUser, { token })
}

//用户收货地址 增删改查
export const addUserAddress = (addressInfo: DeliveryAddressInfo): Promise<RootObject<null>> => {
  return HttpService.post(UrlService.addUserAddress, addressInfo)
}

export const getUserAddress = (userId: string): Promise<RootObject<DeliveryAddressInfo>> => {
  return HttpService.get(UrlService.getUserAddress, { userId });
}

export const delUserAddress = (userId: string, id: number): Promise<RootObject<DeliveryAddressInfo>> => {
  return HttpService.get(UrlService.delUserAddress, { userId, id });
}

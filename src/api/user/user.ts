import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { UserInfo } from "@/interface/user";
import { RootObject } from "@/interface/rootInterface";

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
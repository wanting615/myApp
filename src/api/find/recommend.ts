import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";
import { RecommendItem, Reply } from "@/interface/recommend";
import { RootObject } from "@/interface/rootInterface";

/**
 * 获取发现列表
 * @param page 
 * @returns 
 */
export const getFindList = (page: number): Promise<RootObject<RecommendItem[]>> => {
  return HttpService.get(UrlService.getFindList, { page })
}

/**
 * 回复发现
 * @param id  
 * @param detail 回复内容 
 * @returns 
 */
export const replyFind = (id: number, detail: string): Promise<RootObject<Reply>> => {
  return HttpService.post(UrlService.replyFind, { id, detail })
}

/**
 * 点赞
 * @param id 
 * @returns 
 */
export const praiseFind = (id: number): Promise<RootObject<null>> => {
  return HttpService.get(UrlService.praiseFind, { id })
}

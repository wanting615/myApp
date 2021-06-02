/*
 * @Date: 2021-05-19 10:34:49
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-20 16:41:40
 * @FilePath: /elm-app/src/service/api.service.ts
 */
import { HttpService } from "./http.service";
import { UrlService } from "./url.service";


//根据ip获取定位
export const getPosstionByIp = (): Promise<any> => {
  return HttpService.get(UrlService.getPosstionByIp);
};

//获取定位-经纬度
export const getPosition = (
  latitude: string,
  longitude: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return HttpService.get(UrlService.getPosition, { latitude, longitude });
};

//获取商铺分类
export const getShopsClassify = (): Promise<any> => {
  return HttpService.get(UrlService.getShopsClassify);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> => {
  return HttpService.get(UrlService.getShopList, params);
};

export const loginUser = (username: string, password: string): Promise<any> => {
  const str = "username=" + username + "&password=" + password;
  const jiamiStr = HttpService.getEncrypt(str);
  console.log(jiamiStr)
  return HttpService.post(UrlService.login, { token: jiamiStr })
}

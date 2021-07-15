import { Possiton } from "@/interface/posstionInterface";
import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";

//根据ip获取定位
export const getPosstionByIp = (): Promise<any> => {
  return HttpService.get(UrlService.getPosstionByIp);
};

//获取定位-经纬度
export const getPosition = (
  latitude: number,
  longitude: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Possiton> => {
  return HttpService.get<Possiton>(UrlService.getPosition, { latitude, longitude });
};

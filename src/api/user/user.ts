import { HttpService } from "@/until/http.service";
import { UrlService } from "../url.base";

//登陆
export const loginUser = (username: string, password: string): Promise<any> => {
  const str = "username=" + username + "&password=" + password;
  const jiamiStr = HttpService.getEncrypt(str);
  console.log(jiamiStr)
  return HttpService.post(UrlService.login, { token: jiamiStr })
}
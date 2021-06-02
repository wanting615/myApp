/*
 * @Date: 2021-05-19 11:27:58
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-19 15:29:48
 * @FilePath: /elm-app/src/service/http.service.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import JSEncrypt from "jsencrypt";
import qs from "qs";

axios.defaults.withCredentials = true;//允许带cookie

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (localStorage.getItem("token")) {
      config.headers.ACCESS_TOKEN = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
},
  (error: unknown) => {
    Promise.reject(JSON.stringify(error));
  }
);

export class HttpService {
  static publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKtTCoqjzzwVqKwfDA92N4J1TIIz4eq4CpI0wHhS3RNew9e47ZdwJec4SmRTyxFkG/FlrJC7VwG0rP9gJPqUk4MCAwEAAQ==';

  public static get<R = AxiosResponse>(
    url: string,
    params?: unknown
  ): Promise<R> {
    return axios.request({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      timeout: 5000,
      withCredentials: true,
      params,
    });
  }

  public static post<R = AxiosResponse>(
    url: string,
    params: any
  ): Promise<R> {
    return axios.post(url, qs.stringify(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  public static getEncrypt(data: string) {
    const encrypt = new JSEncrypt({
      // eslint-disable-next-line @typescript-eslint/camelcase
      default_key_size: "512"
    });
    // 设置公钥
    encrypt.setPublicKey(this.publicKey);
    return encodeURIComponent(encrypt.encrypt(data));
  }
}

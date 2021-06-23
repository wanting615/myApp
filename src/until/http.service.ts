/*
 * @Date: 2021-05-19 11:27:58
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-19 15:29:48
 * @FilePath: /elm-app/src/service/http.service.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import JSEncrypt from "jsencrypt";
import qs from "qs";
import config from "@/config/config";

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

  /**
   * 
   * @param url 请求url
   * @param params 请求参数
   * @returns 返回Promise<R> R返回类型
   */
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

  /**
   * 
   * @param url 请求url
   * @param params 请求参数
   * @returns 返回Promise<R> R返回类型
   */
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

  /**
   * //并发请求
   * @param axiosArr 所并发的请求
   * @returns reasult[]
   */
  public static httpAll<T>(axiosArr: Promise<T>[]): Promise<T[]> {
    return new Promise((resovle) => {
      axios.all(axiosArr).then(axios.spread((...args: T[]) => {
        resovle(args)
      }))
    })
  }

  public static getEncrypt(data: string) {
    const encrypt = new JSEncrypt({
      // eslint-disable-next-line @typescript-eslint/camelcase
      default_key_size: "512"
    });
    // 设置公钥
    encrypt.setPublicKey(config.pulickKey);
    return encodeURIComponent(encrypt.encrypt(data));
  }

}
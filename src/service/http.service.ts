/*
 * @Date: 2021-05-19 11:27:58
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-19 15:29:48
 * @FilePath: /elm-app/src/service/http.service.ts
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
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
  public static axiosInstance: AxiosInstance;

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static post<R = AxiosResponse>(
    url: string,
    params: unknown
  ): Promise<R> {
    this.axiosInstance.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    return axios.post(url, params, { headers: "" });
  }
}

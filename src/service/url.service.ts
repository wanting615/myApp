/*
 * @Date: 2021-05-19 10:12:47
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-20 16:00:47
 * @FilePath: /elm-app/src/service/url.service.ts
 */

export class UrlService {
  // private static baseUrl = "localhost:3000/";
  private static baseUrl = "/api";

  public static getPosstionByIp = UrlService.baseUrl + "posstionByIp";//通过ip获取地址

  public static getPosition = UrlService.baseUrl + "posstion"; //获取用户位置信息

  public static getShopsClassify = UrlService.baseUrl + "shopsClassify"; //获取商品分类

  public static getShopList = UrlService.baseUrl + "shops/list"; //获取商店列表

  /**
   * 登陆模块
   */

  public static login = UrlService.baseUrl + "login"
}

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

  public static getShopDetail = UrlService.baseUrl + "shop/";//获取商铺详情

  public static getShopMenu = UrlService.baseUrl + "shopMenu/";//获取商店商品清单

  public static getRatings = UrlService.baseUrl + "/rating/";//获取评价列表

  public static getScores = UrlService.baseUrl + "/rating/scroes/"; //查询评价分数

  public static getTags = UrlService.baseUrl + "/rating/tags/";//查询评价分类

  /**
   * 登陆模块
   */

  public static login = UrlService.baseUrl + "login";//登陆

  public static getUserInfo = UrlService.baseUrl + "/userInfo";//获取用户信息

  public static delUser = UrlService.baseUrl + "/delUser";//注销用户
}

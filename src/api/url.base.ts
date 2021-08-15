/*
 * @Date: 2021-05-19 10:12:47
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-20 16:00:47
 * @FilePath: /elm-app/src/service/url.service.ts
 */

export class UrlService {
  // private static baseUrl = "localhost:3000/";
  private static baseUrl = "/api";
  //定位、地址相关接口
  public static getPosstionByIp = UrlService.baseUrl + "posstionByIp";//通过ip获取地址

  public static getPosition = UrlService.baseUrl + "posstion"; //获取用户位置信息

  public static getDistanceTime = UrlService.baseUrl + "getDistanceTime";//测量两点需要的时间


  //商店相关接口
  public static getShopsClassify = UrlService.baseUrl + "shopsClassify"; //获取商品分类

  public static getShopList = UrlService.baseUrl + "shops/list"; //获取商店列表

  public static getShopDetail = UrlService.baseUrl + "shop/";//获取商铺详情

  public static getShopMenu = UrlService.baseUrl + "shopMenu/";//获取商店商品清单

  public static getRatings = UrlService.baseUrl + "/rating/list";//获取评价列表

  public static getScores = UrlService.baseUrl + "/rating/scroes/"; //查询评价分数

  public static getTags = UrlService.baseUrl + "/rating/tags/";//查询评价分类


  //用户相关接口
  public static login = UrlService.baseUrl + "/user/login";//登陆

  public static getUserInfo = UrlService.baseUrl + "/user/userInfo";//获取用户信息

  public static delUser = UrlService.baseUrl + "/user/delUser";//注销用户

  public static addUserAddress = UrlService.baseUrl + "/user/addUserAddress";//添加/更新收获地址

  public static getUserAddress = UrlService.baseUrl + "/user/getUserAddress";//获取收货地址

  public static getUserAddressByTime = UrlService.baseUrl + "/user/getUserAddressByTime";//获取收货地址和到收货地址所需时间

  public static delUserAddress = UrlService.baseUrl + "/user/delUserAddress";//删除收货地址

  public static getHongbaos = UrlService.baseUrl + '/getHongbaos';//获取用户红包

  public static sendHongbaoKey = UrlService.baseUrl + "/sendHongbaoKey";//兑换红包

  //发现页
  //获取推荐列表
  public static getFindList = UrlService.baseUrl + "/getFind";//获取发现推荐列表

  public static replyFind = UrlService.baseUrl + "/replyFind";//回复发现推荐

  public static praiseFind = UrlService.baseUrl + "/findPraise";//点赞发现推荐

  //订单页
  public static createOrder = UrlService.baseUrl + "/createOrder";//创建订单

  public static getOrderDetail = UrlService.baseUrl + "/getOrderDetail";//查询订单详情
}
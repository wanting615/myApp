export interface Location {//用户当前位置
  lng: number;
  lat: number;
}

export interface DeliveryAddressInfo {//用户收货地址信息
  userId: number;
  username: string;//姓名
  sex?: string;//性别
  phone: string;//手机
  lng: number;//经度
  lat: number;//纬度
  city: string;//城市
  adname: string;//区域
  address: string;//地址
  addressDetail: string;//小区、楼号
  addressName: string;//地址名称
  tag?: string;//标签
}

export interface AddAddressInfo {//添加地址时存储变量
  addressName: string;
  lat: number;
  lng: number;
  city: string;
  adname: string;
  address: string;
}

//搜素地址返回结果类型===高德api
export interface SeachResultAddress {
  info: string;//返回状态
  poiList: PoiList;//搜索结果list
}

interface PoiList {
  count: number;//结果数量
  pageIndex: number;//当前页
  pageSize: number;//每页条数
  pois: Pois[];
}

export interface Pois {
  id: string;
  cityname: string;//城市
  adname: string;//区域
  address: string; //详细位置
  location: {//经纬度信息
    Q: number;
    R: number;
    lat: number;
    lng: number;
  };
  name: string;//对象名称
  shopinfo: string;//商店信息
  tel: string;//电话
  type: string; //对象类型
  distance: number;//距离中心点位置
}

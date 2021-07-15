import { onMounted, reactive } from "vue";
import "@amap/amap-jsapi-types";
import AMapLoader from '@amap/amap-jsapi-loader';
import { SeachResultAddress, Pois } from "@/interface/addressInterface";

export function useMap(loadMap = true) {
  const data = reactive<{
    city: string;//城市
    searchList: Pois[];//搜索列表
    modalList: Pois[];//关键字搜索列表
  }>({
    city: "上海市",
    searchList: [],
    modalList: []
  })

  let AMapObj: any;

  let center: [number, number] = [121.458145, 31.215616];
  const mapOptions: AMap.MapOptions = {
    center: center,
    zoom: 17,
  }

  //根据经纬度搜索附近的type地点
  function centerSearch() {
    //构造地点查询类
    const placeSearch = new AMapObj.PlaceSearch({
      type: '商务住宅|地名地址信息', // 类别
      pageSize: 30, // 单页显示结果条数
      pageIndex: 1, // 页码
      city: data.city, // 城市
      autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      extensions: 'all'
    });
    //根据地图中心点查附近地点
    placeSearch.searchNearBy('', center, 200, (status: string, result: SeachResultAddress) => {
      if (status == 'complete') {
        console.log(result)
        data.searchList = result.poiList.pois;
      }
    });
  }

  function keySearch(searchKey: string) {
    const placeSearch = new AMapObj.PlaceSearch({
      type: '汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息',
      pageSize: 30, // 单页显示结果条数
      pageIndex: 1, // 页码
      city: "全国", // 兴趣点城市
      citylimit: false, //是否强制限制在设置的城市内搜索
      autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    });
    placeSearch.search(searchKey, (status: string, result: SeachResultAddress) => {
      if (status === 'complete') {
        data.modalList = result.poiList.pois;
      }
    })
  }

  //创建固定点指示图标--当前位置
  function createMarker() {
    const marker = new AMapObj.Marker({
      // icon: '',
      position: center
    })
    return marker;
  }

  onMounted(() => {
    AMapLoader.load({
      key: '84bccf440912dfce84b6fa473eac7b5d',
      version: '2.0',
      plugins: ['AMap.PlaceSearch'],
      AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleMarker']
      },
      Loca: {
        version: '2.0'
      }
    }).then((AMap) => {
      AMapObj = AMap;
      if (loadMap) {
        const map = new AMap.Map('mapContainer', mapOptions);
        map.add(createMarker());
        map.on('moveend', () => {
          // 获取地图中心点
          const currentCenter = map.getCenter();
          center = [currentCenter.lng, currentCenter.lat]
          //根据地图中心点查附近地点
          centerSearch();
        });
      }
      centerSearch();
    }).catch((e) => { alert(e); })

  })

  return { data, keySearch };
}
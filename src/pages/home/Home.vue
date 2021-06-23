<template>
  <ion-page>
    <ion-content :scroll-events="true" @ionScroll="onScroll($event)">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header>
        <ion-toolbar color="danger">
          <ion-button>
            <ion-icon :icon="locationOutline"></ion-icon>
            {{ address }}
          </ion-button>
          <ion-title></ion-title>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon :icon="cartOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <div class="search-inner">
        <div class="search-area" ref="searchArea">
          <ion-icon :icon="scanOutline"></ion-icon>
          <input type="text" placeholder="德兴管 42减3" />
          <button>搜索</button>
          <div class="search-value">
            <span>奶茶</span>
            <span>一点点</span>
            <span>超市便利</span>
            <span>其它</span>
          </div>
        </div>
      </div>
      <NavComponnet />
      <ShopList :shopsList="shopsList" />
      <ion-infinite-scroll threshold="100px" @ionInfinite="loadMore($event)" id="infinite-scroll" :disabled="isDisabled">
        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中"> </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, unref } from "vue";
import ShopList from "@/components/shop-list/shoplist.componnent.vue";
import NavComponnet from "../../components/home/nav.component.vue";
import { ShopInfo } from "@/interface/shopInfoInterface";
import { getPosition, getPosstionByIp } from "@/api/posstion/posstion";
import { getShopListAction } from "@/api/shop/shop";
import { scanOutline, locationOutline, cartOutline } from "ionicons/icons";

export default defineComponent({
  name: "Home",
  components: {
    ShopList,
    NavComponnet,
  },
  setup() {
    const searchArea = ref<Nullable<ElRef>>(null);

    const homeData = reactive<{
      address: string;
      page: number;
      shopsList: ShopInfo[];
      latitude: string;
      longitude: string;
      scollY: number;
      isDisabled: boolean;
    }>({
      address: "定位中",
      page: 1,
      shopsList: [],
      latitude: "",
      longitude: "",
      scollY: 0,
      isDisabled: false,
    });

    //获取首页商店列表
    const getShopList = (e?: CustomEvent, loadMore?: boolean): void => {
      getShopListAction({
        page: homeData.page,
        latitude: homeData.latitude,
        longitude: homeData.longitude,
      }).then((res) => {
        if (!res.status) return;
        if (loadMore) {
          homeData.shopsList = homeData.shopsList.concat(res.data);
        } else {
          homeData.shopsList = res.data;
        }
        if (e) (e.target as any).complete();
      });
    };

    //通过经纬度获取位置信息
    const getPostion = (e?: CustomEvent): void => {
      getShopList(e);
      getPosition(homeData.latitude, homeData.longitude).then((res) => {
        if (res.state) {
          homeData.address = res.city + res.name;
        } else {
          homeData.address = "定位失败，请手动选择地址";
        }
      });
    };

    const doRefresh = (e: CustomEvent): void => {
      homeData.page = 1;
      getShopList(e);
    };
    const loadMore = (e: CustomEvent): void => {
      homeData.page += 1;
      getShopList(e, true);
    };
    const onScroll = (e: CustomEvent): void => {
      const wrapRef = unref(searchArea);
      if (!wrapRef) return;
      homeData.scollY = e.detail.scrollTop;
      if (homeData.scollY > 41) {
        wrapRef.style.position = "fixed";
      } else if (homeData.scollY < 41) {
        wrapRef.style.position = "absolute";
      }
    };
    onMounted(() => {
      getPosstionByIp().then((res) => {
        if (res.state) {
          homeData.latitude = res.data.latitude;
          homeData.longitude = res.data.longitude;
          getPostion();
        } else {
          if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
              // eslint-disable-next-line no-undef
              (res) => {
                homeData.latitude = res.coords.latitude.toString();
                homeData.longitude = res.coords.longitude.toString();
                getPostion();
              },
              () => {
                homeData.latitude = "31.23037";
                homeData.longitude = "121.473701";
                getPostion(); //默认值上海
              }
            );
          }
        }
      });
    });

    return {
      ...toRefs(homeData),
      scanOutline,
      locationOutline,
      cartOutline,
      doRefresh,
      loadMore,
      onScroll,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
@import "./Home.scss";
</style>
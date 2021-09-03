<template>
  <ion-page>
    <ion-content :scroll-events="true" @ionScroll="onScroll($event)">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header>
        <ion-toolbar color="danger">
          <ion-button @click="showModal">
            <ion-icon :icon="locationOutline"></ion-icon>
            {{ homeData.address }}
          </ion-button>
          <ion-title></ion-title>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon :icon="cartOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <div class="search-inner" ref="searchInner">
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
      <ShopList :shopsList="homeData.shopsList" v-if="!homeData.isLoading" />
      <HomeSkeleton v-if="homeData.isLoading"></HomeSkeleton>
      <ion-infinite-scroll
        threshold="100px"
        @ionInfinite="loadMore($event)"
        id="infinite-scroll"
        :disabled="homeData.isDisabled"
      >
        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中"></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
    <Modal :is-open="isOpenRef" height="100%">
      <HomeModal @closeModal="closeModal" />
    </Modal>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { reactive, ref, unref } from "@vue/reactivity"
import ShopList from "@/components/shop-list/shoplist.componnent.vue";
import HomeSkeleton from "@/components/home/homeSkeleton.vue";
import NavComponnet from "@/components/home/nav.component.vue";
import Modal from "@/components/common/modal/modal.vue";
import HomeModal from "@/components/home/homeModal.vue";
import { ShopInfo } from "@/interface/shopInfoInterface";
import { getPosition, getPosstionByIp } from "@/api/posstion/posstion";
import { getShopListAction } from "@/api/shop/shop";
import { scanOutline, locationOutline, cartOutline } from "ionicons/icons";
import { useStore } from "@/store";

const searchArea = ref<Nullable<ElRef>>(null);
const searchInner = ref<Nullable<ElRef>>(null);
const stroe = useStore();
const isOpenRef = ref(false); //控制搜索弹窗
const showModal = () => {
  isOpenRef.value = true;
  stroe.commit("changeShowTabs", false);
};

const homeData = reactive<{
  address: string;
  page: number;
  shopsList: ShopInfo[];
  lat: number;
  lng: number;
  isDisabled: boolean;
  isLoading: boolean;
}>({
  address: "定位中",
  page: 1,
  shopsList: [],
  lat: 0,
  lng: 0,
  isDisabled: false,
  isLoading: true,
});

//获取首页商店列表
const getShopList = async (e?: CustomEvent, loadMore?: boolean, order?: string): Promise<void> => {
  const result = await getShopListAction({
    page: homeData.page,
    latitude: homeData.lat,
    longitude: homeData.lng,
    orderBy: order || "7",
  });
  if (!result.status) return;
  if (loadMore) {
    homeData.shopsList = homeData.shopsList.concat(result.data);
  } else {
    homeData.shopsList = result.data;
    homeData.isLoading = false;
  }
  if (e) (e.target as any).complete();
};

//通过经纬度获取位置信息
const getPostion = async (e?: CustomEvent): Promise<void> => {
  getShopList(e);
  const result = await getPosition(homeData.lat, homeData.lng);
  if (result.state) {
    homeData.address = result.city + result.name;
  } else {
    homeData.address = "定位失败，请手动选择地址";
  }
};

const doRefresh = (e: CustomEvent): void => {
  homeData.page = 1;
  getShopList(e);
};
const loadMore = (e: CustomEvent): void => {
  homeData.page += 1;
  getShopList(e, true);
};

/**
 * 滚动事件
 */
let scrollFlag = true;
const onScroll = (e: CustomEvent): void => {
  const wrapRef = unref(searchArea);
  const innerRef = unref(searchInner);
  if (!wrapRef || !innerRef) return;
  if (e.detail.scrollTop > innerRef.offsetTop) {
    if (scrollFlag) return;
    scrollFlag = true;
    wrapRef.style.position = "fixed";
  } else if (e.detail.scrollTop < innerRef.offsetTop) {
    if (!scrollFlag) return;
    wrapRef.style.position = "absolute";
    scrollFlag = false;
  }
};

//关闭弹窗
const closeModal = (item: { lng: number; lat: number; addressName: string }) => {
  if (item) {
    homeData.address = item.addressName;
    homeData.lat = item.lat;
    homeData.lng = item.lng;
    getShopList(undefined, false, "2");
    stroe.commit("setLoaction", {
      lat: item.lat,
      lng: item.lng,
    });
  }
  isOpenRef.value = false;
  stroe.commit("changeShowTabs", true);
};

onMounted(async () => {
  const result = await getPosstionByIp();
  //app 获取地位再写
  if (result && result.state) {
    homeData.lat = result.data.lat;
    homeData.lng = result.data.lng;
    getPostion();
  }
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
@import "./Home.scss";
</style>
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
      <ShopList :shopsList="shopsList" />
      <ion-infinite-scroll threshold="100px" @ionInfinite="loadMore($event)" id="infinite-scroll" :disabled="isDisabled">
        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中"> </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
    <Modal :is-open="isOpenRef" height="100%">
      <HomeModal @didDismiss="closeModal()" />
    </Modal>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, unref } from "vue";
import ShopList from "@/components/shop-list/shoplist.componnent.vue";
import NavComponnet from "@/components/home/nav.component.vue";
import Modal from "@/components/common/modal/modal.vue";
import HomeModal from "@/components/home/homeModal.vue";
import { ShopInfo } from "@/interface/shopInfoInterface";
import { getPosition, getPosstionByIp } from "@/api/posstion/posstion";
import { getShopListAction } from "@/api/shop/shop";
import { scanOutline, locationOutline, cartOutline } from "ionicons/icons";
import { useStore } from "@/store";

export default defineComponent({
  name: "Home",
  components: {
    ShopList,
    NavComponnet,
    Modal,
    HomeModal,
  },
  setup() {
    const searchArea = ref<Nullable<ElRef>>(null);
    const searchInner = ref<Nullable<ElRef>>(null);
    const stroe = useStore();
    const isOpenRef = ref(false); //控制搜索弹窗
    const showModal = () => {
      isOpenRef.value = true;
      stroe.commit("changeShowTabs", false);
    };
    //关闭弹窗
    const closeModal = () => {
      isOpenRef.value = false;
      stroe.commit("changeShowTabs", true);
    };

    const homeData = reactive<{
      address: string;
      page: number;
      shopsList: ShopInfo[];
      lat: number;
      lng: number;
      isDisabled: boolean;
    }>({
      address: "定位中",
      page: 1,
      shopsList: [],
      lat: 0,
      lng: 0,
      isDisabled: false,
    });

    //获取首页商店列表
    const getShopList = async (e?: CustomEvent, loadMore?: boolean): Promise<void> => {
      const result = await getShopListAction({
        page: homeData.page,
        latitude: homeData.lat,
        longitude: homeData.lng,
        orderBy: "7",
      });
      if (!result.status) return;
      if (loadMore) {
        homeData.shopsList = homeData.shopsList.concat(result.data);
      } else {
        homeData.shopsList = result.data;
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
    const onScroll = (e: CustomEvent): void => {
      console.log(11);
      const wrapRef = unref(searchArea);
      const innerRef = unref(searchInner);
      if (!wrapRef || !innerRef) return;
      if (e.detail.scrollTop > innerRef.offsetTop) {
        wrapRef.style.position = "fixed";
      } else if (e.detail.scrollTop < innerRef.offsetTop) {
        wrapRef.style.position = "absolute";
      }
    };
    onMounted(async () => {
      const result = await getPosstionByIp();
      //app 获取地位再写
      if (result && result.state) {
        homeData.lat = result.data.lat;
        homeData.lng = result.data.lng;
        getPostion();
      } else {
        homeData.lat = 31.23037;
        homeData.lng = 121.473701;
        getPostion(); //默认值上海
      }
    });

    const chooseAddressModal = () => {
      //
    };
    return {
      isOpenRef,
      ...toRefs(homeData),
      scanOutline,
      locationOutline,
      cartOutline,
      doRefresh,
      loadMore,
      onScroll,
      chooseAddressModal,
      showModal,
      closeModal,
      searchArea,
      searchInner,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
@import "./Home.scss";
</style>
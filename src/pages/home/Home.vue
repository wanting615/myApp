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
      <ion-infinite-scroll
        threshold="100px"
        @ionInfinite="loadMore($event)"
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loadingSpinner="bubbles"
          loadingText="加载中"
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShopList from "@/components/shop-list/shoplist.componnent.vue";
import NavComponnet from "../../components/home/nav.component.vue";
import { ShopInfo } from "@/interface/shopInfoInterface";
import { getPosition, getPosstionByIp } from "@/api/posstion/posstion";
import { getShopList } from "@/api/shop/shop";
import { scanOutline, locationOutline, cartOutline } from "ionicons/icons";

export default defineComponent({
  name: "Home",
  components: {
    ShopList,
    NavComponnet,
  },
  setup() {
    return {
      scanOutline,
      locationOutline,
      cartOutline,
    };
  },
  data() {
    const shopsList: ShopInfo[] = [];
    return {
      address: "定位中",
      page: 1,
      shopsList: shopsList,
      searchArea: Element as any,
      latitude: "",
      longitude: "",
      scollY: 0,
      isDisabled: false,
    };
  },

  created(): void {
    getPosstionByIp().then((res) => {
      if (res.state) {
        this.latitude = res.data.latitude;
        this.longitude = res.data.longitude;
        this.getPostion();
      } else {
        if (window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
            // eslint-disable-next-line no-undef
            (res) => {
              this.latitude = res.coords.latitude.toString();
              this.longitude = res.coords.longitude.toString();
              this.getPostion();
            },
            () => {
              this.latitude = "31.23037";
              this.longitude = "121.473701";
              this.getPostion(); //默认值上海
            }
          );
        }
      }
    });
  },
  mounted(): void {
    this.searchArea = this.$refs.searchArea;
  },
  methods: {
    //通过经纬度获取位置信息
    getPostion(e?: CustomEvent): void {
      this.getShopList(e);
      getPosition(this.latitude, this.longitude).then((res) => {
        if (res.state) {
          this.address = res.city + res.name;
        } else {
          this.address = "定位失败，请手动选择地址";
        }
      });
    },

    //获取首页商店列表
    getShopList(e?: CustomEvent, loadMore?: boolean): void {
      getShopList({
        page: this.page,
        latitude: this.latitude,
        longitude: this.longitude,
      }).then((res) => {
        if (!res.status) return;
        if (loadMore) {
          this.shopsList = this.shopsList.concat(res.data);
        } else {
          this.shopsList = res.data;
        }
        if (e) (e.target as any).complete();
      });
    },
    doRefresh(e: CustomEvent): void {
      this.page = 1;
      this.getShopList(e);
    },
    loadMore(e: CustomEvent): void {
      this.page += 1;
      this.getShopList(e, true);
    },
    onScroll(e: CustomEvent): void {
      console.log(e);
      this.scollY = e.detail.scrollTop;
      if (this.scollY > 41) {
        this.searchArea.style.position = "fixed";
      } else if (this.scollY < 41) {
        this.searchArea.style.position = "absolute";
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
@import "./Home.scss";
</style>
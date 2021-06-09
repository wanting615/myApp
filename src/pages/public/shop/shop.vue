<template>
  <ion-page>
    <ion-header>
      <ion-toolbar ref="toolbarEl">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="searchOutline"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon :icon="heartOutline"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content @ionScroll="onScroll($event)" :scroll-events="true">
      <div class="shop-inner" v-if="shopInfo">
        <div class="header-img">
          <img :src="config.imagePath + shopInfo.image_path" />
        </div>
        <ShopInfoComp :shopInfo="shopInfo" />
        <div class="navs-slider" ref="navEl">
          <div class="navs-inner">
            <ul>
              <li class="fl">点餐</li>
              <li class="fl">评价</li>
              <li class="fl">商家</li>
            </ul>
            <div class="line"></div>
          </div>
        </div>
        <ion-slides centeredSlides="false" zoom="false" :options="slideOpts">
          <ion-slide class="slides-page">
            <div class="slide-item" v-if="shopMenu">
              <HotFood :hotFoods="hotFoods" />
              <FoodMenu :shopMenu="shopMenu" ref="foodMenuEl" />
            </div>
          </ion-slide>
          <ion-slide class="slides-page"> 2 </ion-slide>
          <ion-slide class="slides-page"> 3 </ion-slide>
        </ion-slides>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
  unref,
} from "vue";
import { IonSlides, IonSlide } from "@ionic/vue";
import { useRoute } from "vue-router";
import config from "@/config/config";
import ShopInfoComp from "@/components/shop/shopInfo/shopInfo.vue";
import FoodMenu from "@/components/shop/foodmenu/foodMenu.vue";
import HotFood from "@/components/shop/hotFood.vue";
import {
  searchOutline,
  heartOutline,
  ellipsisHorizontalOutline,
} from "ionicons/icons";
import { ShopInfo } from "@/interface/shopInfoInterface";
import { Food, FoodsMenu } from "@/interface/foodsInterface";
import { getShopDetail, getShopMenu } from "@/api/shop/shop";
import { useScoll, MenuRef, ToobarlRef } from "@/hooks/shopScroll";

export default defineComponent({
  components: {
    IonSlides,
    IonSlide,
    ShopInfoComp,
    FoodMenu,
    HotFood,
  },
  setup() {
    const shopId = useRoute().params.id as string;
    const foodMenuEl = ref<Nullable<MenuRef>>(null);
    const navEl = ref<Nullable<ElRef>>(null);
    const toolbarEl = ref<Nullable<ToobarlRef>>(null);
    const shopData = reactive({
      segmentValue: "order",
      shopInfo: null as unknown as ShopInfo,
      shopMenu: Array<FoodsMenu>(),
      hotFoods: Array<Food>(),
      slideOpts: {
        resistance: true,
        resistanceRatio: 0, //左右触底 不弹
      },
      async getData() {
        shopData.shopInfo = (await getShopDetail(shopId)).data;
        shopData.shopMenu = (await getShopMenu(shopId)).data;
        shopData.hotFoods = shopData.shopMenu[0].foods.filter(
          (item: Food, index: number) => index < 3
        );
      },
    });
    const onScroll = (event: CustomEvent) => {
      useScoll(event, unref(navEl), unref(foodMenuEl), unref(toolbarEl));
    };
    onBeforeMount(() => {
      shopData.getData();
    });
    return {
      config,
      ...toRefs(shopData),
      foodMenuEl,
      navEl,
      toolbarEl,
      searchOutline,
      heartOutline,
      ellipsisHorizontalOutline,
      onScroll,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./shop.scss";
</style>
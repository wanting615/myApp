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
    <ion-content @ionScroll="onScroll($event)" :scroll-events="true" ref="contentEl">
      <div class="shop-inner" v-if="shopData.shopInfo">
        <div class="header-img">
          <img :src="config.imagePath + shopData.shopInfo.image_path" />
        </div>
        <ShopInfoComp :shopInfo="shopData.shopInfo" />
        <div class="navs-slider" ref="navEl">
          <div class="navs-inner">
            <ul @click="changeSlide($event)">
              <li class="fl" data-target="0">点餐</li>
              <li class="fl" data-target="1">
                评价
                <span>{{ shopData.shopInfo.rating }}</span>
              </li>
              <li class="fl" data-target="2">
                商家
                <span>故事</span>
              </li>
            </ul>
            <div
              class="line"
              :class="{ rating: shopData.selectSlide === '1', stroy: shopData.selectSlide === '2' }"
            ></div>
          </div>
        </div>
        <ion-slides
          centeredSlides="false"
          zoom="false"
          :options="shopData.slideOpts"
          @ionSlideDidChange="ionSlideDidChange()"
          ref="slidesEl"
          v-if="shopData.shopMenu && shopData.shopMenu.length > 0"
        >
          <!-- 食品栏 -->
          <ion-slide class="slides-page" @scroll="useScrollFoodSlide($event)">
            <div class="slide-item" v-show="shopData.selectSlide === '0'">
              <HotFood :hotFoods="shopData.hotFoods" :menu="shopData.shopMenu[0]" />
              <FoodMenu :shopMenu="shopData.shopMenu" @contentScroll="scrollTo" ref="foodMenuEl" />
            </div>
          </ion-slide>
          <!-- 评价栏 -->
          <ion-slide class="slides-page">
            <Rating :shopId="shopId" v-if="shopData.selectSlide === '1'"></Rating>
          </ion-slide>
          <!-- 商家 -->
          <ion-slide class="slides-page">
            <ShopStory :shopInfo="shopData.shopInfo"></ShopStory>
          </ion-slide>
        </ion-slides>
      </div>
    </ion-content>
    <ion-footer class="buy-cart-footer">
      <BuyCart
        :deliveryPrice="shopData.shopInfo?.float_delivery_fee"
        :minimunOrder="shopData.shopInfo?.float_minimum_order_amount"
        :foodMemus="shopData.shopMenu"
        v-if="shopData.selectSlide === '0'"
      ></BuyCart>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, reactive, ref, unref, watchEffect } from "vue";
import { IonSlides, IonSlide, IonFooter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import config from "@/config/config";
import ShopInfoComp from "@/components/shop/shopInfo/shopInfo.vue";
import FoodMenu from "@/components/shop/foodmenu/foodMenu.vue";
import HotFood from "@/components/shop/hotFood.vue";
import BuyCart from "@/components/shop/buyCart/buyCart.vue";
import Rating from "@/components/shop/rating/rating.vue";
import ShopStory from "@/components/shop/shopStory/shopStory.vue";
import { searchOutline, heartOutline, ellipsisHorizontalOutline } from "ionicons/icons";
import { ShopInfo } from "@/interface/shopInfoInterface";
import { Food, FoodsMenu } from "@/interface/foodsInterface";
import { getShopDetail, getShopMenu } from "@/api/shop/shop";
import { setScrollEl, useScoll, useScrollTo, useScrollFoodSlide, MenuRef, ToobarlRef, useClearEl } from "@/hooks/shopScroll";

const shopId = useRoute().params.id as string;
const foodMenuEl = ref<Nullable<MenuRef>>(null); //菜单栏
// const ratingEL = ref<Nullable<DomRef>>(null); //评价栏
const navEl = ref<Nullable<ElRef>>(null); //点餐、评价tab栏
const toolbarEl = ref<Nullable<ToobarlRef>>(null); //顶部栏
const contentEl = ref<Nullable<ContentRef>>(null); //内容
const slidesEl = ref<Nullable<IonSlidesRef>>(null);

const store = useStore();
//初始化当前shop store
let foodStore: Food[] = [];
if (store.state.buyCart.shopId === shopId) {
  //存储shopID
  foodStore = store.state.buyCart.foods;
} else {
  store.commit("setShopId", shopId);
}

const shopData = reactive<{
  segmentValue: string;
  shopInfo: Nullable<ShopInfo>;
  shopMenu: FoodsMenu[];
  hotFoods: Food[];
  slideOpts: any;
  selectSlide: string;
}>({
  segmentValue: "order", //当前
  shopInfo: null, //商店信息
  shopMenu: [], //商店菜单
  hotFoods: [], //热门食品
  slideOpts: {
    resistance: true,
    resistanceRatio: 0, //左右触底 不弹
  },
  selectSlide: "0", //当前选中的slide
});

//获取商店信息和食品栏
const getData = async () => {
  shopData.shopInfo = (await getShopDetail(shopId)).data;
  shopData.shopMenu = (await getShopMenu(shopId)).data;
  //标记已选购的食品
  foodStore.forEach((item: Food) => {
    const foodId = item.item_id;
    shopData.shopMenu.forEach((menu: FoodsMenu) => {
      menu.foods.forEach((food: Food) => {
        if (food.item_id === foodId) {
          menu.num = food.num = item.num || 0; //菜单栏添加已选购数量//食品添加已选购数量
        }
      });
    });
  });
  if (shopData && shopData.shopMenu) {
    shopData.hotFoods = shopData.shopMenu[0]?.foods.filter((item: Food, index: number) => index < 3);
  }
};

watchEffect(() => {
  //存储页面元素的获取
  setScrollEl(unref(navEl), unref(foodMenuEl), unref(toolbarEl), unref(slidesEl));
  console.log(foodMenuEl.value)
}, {
  flush: 'post'
})


//切换slide
const changeSlide = (event: Event) => {
  const target = event.target as HTMLElement;
  shopData.selectSlide = target.dataset["target"] || "";
  unref(slidesEl)?.$el.slideTo(parseInt(shopData.selectSlide));
};

//改变slide
const ionSlideDidChange = () => {
  unref(slidesEl)
    ?.$el.getActiveIndex()
    .then((val: number) => {
      shopData.selectSlide = val.toString();
    });
};

//内容滚动事件
const onScroll = (event: CustomEvent) => {
  // setScrollEl(unref(navEl), unref(foodMenuEl), unref(toolbarEl), unref(slidesEl));
  useScoll(event);
};
//菜单栏滚动事件
const scrollTo = () => {
  useScrollTo(unref(contentEl));
};


onBeforeUnmount(() => {
  useClearEl();
});
getData();
</script>
<style lang="scss" scoped>
@import "./shop.scss";
</style>
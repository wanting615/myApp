<!--
 * @Date: 2021-07-15 11:36:18
 * @LastEditors: wanting
 * @LastEditTime: 2021-08-31 16:15:04
 * @FilePath: /myApp/src/pages/find/find.vue
-->
<template>
  <ion-page>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header>
        <ion-toolbar>
          <div class="navs-slider">
            <div :class="{ active: segmentValue == 'recommend' }" @click="changeSlide(0)">
              <span>推荐</span>
            </div>
            <div :class="{ active: segmentValue == 'follow' }" @click="changeSlide(1)">
              <span>关注</span>
            </div>
          </div>
        </ion-toolbar>
      </ion-header>
      <ion-slides
        centeredSlides="false"
        zoom="false"
        @ionSlideWillChange="onSlideChanged()"
        :options="slideOpts"
        ref="slidesRef"
      >
        <ion-slide class="slides-page">
          <Recommend></Recommend>
        </ion-slide>
        <ion-slide class="slides-page">2</ion-slide>
      </ion-slides>
      <!-- <ion-infinite-scroll threshold="100px" @ionInfinite="loadMore($event)" :disabled="isDisabled">
        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中"> </ion-infinite-scroll-content>
      </ion-infinite-scroll>-->
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, unref } from "@vue/reactivity";
import { IonSlides, IonSlide } from "@ionic/vue";
import Recommend from "@/components/find/recommend.vue";

const slideOpts = {
  resistance: true,
  resistanceRatio: 0, //左右触底 不弹
};

const slidesRef = ref<Nullable<IonSlidesRef>>(null);

const segmentValue = ref("recommend");
// const isDisabled = ref(false);
const onSlideChanged = async () => {
  const index = await unref(slidesRef)?.$el.getActiveIndex();
  index === 0 ? (segmentValue.value = "recommend") : (segmentValue.value = "follow");
};

const changeSlide = (index: number) => {
  index === 0 ? (segmentValue.value = "recommend") : (segmentValue.value = "follow");
  unref(slidesRef)?.$el.slideTo(index);
};

const doRefresh = (e: any) => {
  setTimeout(() => {
    e.target.complete();
  }, 500);
};
// const loadMore = () => {
//   //
// };
</script>
<style lang="scss" scoped>
@import "./find.scss";
</style>
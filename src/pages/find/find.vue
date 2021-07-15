<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="navs-slider">
          <div :class="{ active: segmentValue == 'recommend' }" @click="changeSlide(0)"><span>推荐</span></div>
          <div :class="{ active: segmentValue == 'near' }" @click="changeSlide(1)"><span>附近</span></div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-slides centeredSlides="false" zoom="false" @ionSlideWillChange="onSlideChanged()" :options="slideOpts" ref="slidesRef">
        <ion-slide class="slides-page">1 </ion-slide>
        <ion-slide class="slides-page">2 </ion-slide>
      </ion-slides>
      <ion-infinite-scroll threshold="100px" @ionInfinite="loadMore($event)" :disabled="isDisabled">
        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中"> </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from "vue";
import { IonSlides, IonSlide } from "@ionic/vue";
export default defineComponent({
  components: {
    IonSlides,
    IonSlide,
  },
  setup() {
    const slideOpts = {
      resistance: true,
      resistanceRatio: 0, //左右触底 不弹
    };

    const slidesRef = ref<Nullable<IonSlidesRef>>(null);

    const segmentValue = ref("recommend");
    const isDisabled = ref(false);
    const onSlideChanged = async () => {
      const index = await unref(slidesRef)?.$el.getActiveIndex();
      index === 0 ? (segmentValue.value = "recommend") : (segmentValue.value = "near");
    };

    const changeSlide = (index: number) => {
      index === 0 ? (segmentValue.value = "recommend") : (segmentValue.value = "near");
      unref(slidesRef)?.$el.slideTo(index);
    };

    const doRefresh = () => {
      //
    };
    const loadMore = () => {
      //
    };
    return {
      slideOpts,
      isDisabled,
      segmentValue,
      slidesRef,
      onSlideChanged,
      changeSlide,
      loadMore,
      doRefresh,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./find.scss";
</style>
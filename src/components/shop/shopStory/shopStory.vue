<template>
  <div class="story" v-if="shopInfo">
    <div class="img-card card">
      <img :src="config.imagePath + shopInfo.image_path" alt="" />
      <div class="card-info">
        <div>兰兰店铺小吃店好火哦saasss</div>
        <div class="grey">品牌故事说明咯</div>
      </div>
    </div>

    <div class="shop-base card">
      <div class="shop-address">
        <h6>{{ shopInfo.name }}</h6>
        <div class="grey">{{ shopInfo.address }}</div>
        <div class="shop-phone">
          <ion-icon :src="callOutline"></ion-icon>
        </div>
      </div>
      <div>
        <h6>商家信息</h6>
        <p class="grey">商家品类: {{ shopInfo.category }}</p>
        <p class="grey">营业时间: {{ shopInfo.opening_hours[0] }}</p>
      </div>
    </div>

    <div class="card">
      <h6>商家服务</h6>
      <p v-for="item in shopInfo.supports" :key="item.id">{{ item.name }} {{ item.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { callOutline } from "ionicons/icons";
import config from "@/config/config";
import { ShopInfo } from "@/interface/shopInfoInterface";

export default defineComponent({
  props: {
    shopInfo: {
      type: Object as PropType<ShopInfo>,
      default: null,
    },
  },
  setup() {
    return {
      config,
      callOutline,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./shopStory.scss";
</style>
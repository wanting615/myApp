<template>
  <div class="shop-header">
    <img :src="'https://elm.cangdu.org/img/' + shopInfo.image_path" />
    <div class="name">{{ shopInfo.name }}</div>
    <div class="tip">
      {{ shopInfo.delivery_mode.text }}约30分钟 <span></span>月售106
      <template v-for="(item, index) in shopInfo.supports" :key="item.id">
        <div v-if="index < 2"><span></span> {{ item.name }}</div>
      </template>
    </div>
    <div class="description ellipsis">公告: {{ shopInfo.description }}</div>
    <div class="shop-activities ellipsis">
      <span v-for="ac in shopInfo.activities" :key="ac.id">
        {{ ac.description }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ShopInfo } from "@/interface/shopInfoInterface";

export default defineComponent({
  props: {
    shopInfo: {
      type: Object as PropType<ShopInfo>,
      default: null,
    },
  },
});
</script>
<style lang="scss" scoped>
@import "./shopInfo.scss";
</style>
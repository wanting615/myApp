<template>
  <div class="hoot-title">商家推荐</div>
  <div class="hoot-foods">
    <div v-for="item in hotFoods" :key="item.id" class="hoot-item">
      <img :src="config.imagePath + item.image_path" alt="" />
      <div class="food-name ellipsis">{{ item.name }}</div>
      <div class="food-price">
        <span>￥{{ item.specfoods[0].price }}</span>
        <span class="add-icon fr">+</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import config from "@/config/config";
import { Food } from "@/interface/foodsInterface";

export default defineComponent({
  props: {
    hotFoods: Array as PropType<Food[]>,
  },
  setup() {
    return {
      config,
    };
  },
});
</script>

<style lang="scss" scoped>
.hoot-title {
  text-align: left;
  padding: 0 10px;
  font-weight: bold;
}
.hoot-foods {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  .hoot-item {
    width: 30%;
    margin-left: 5%;
    &:first-child {
      margin-left: 0;
    }
    img {
      border-radius: 10px;
    }
    .food-name {
      font-weight: bolder;
    }
    .food-price {
      text-align: left;
      margin-top: 5px;
      color: #eb5941;
      font-weight: bolder;
      .add-icon {
        width: 18px;
        height: 18px;
        background: #54b5f3;
        color: #fff;
        border-radius: 50%;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
      }
    }
  }
}
</style>
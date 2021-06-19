<template>
  <div class="hoot-title">商家推荐</div>
  <div class="hoot-foods">
    <div v-for="item in hotFoods" :key="item.id" class="hoot-item">
      <img :src="config.imagePath + item.image_path" alt="" />
      <div class="food-name ellipsis">{{ item.name }}</div>
      <div class="food-price">
        <span
          >￥{{ item.specfoods[0].price }}
          <i v-if="item.specfoods[0].original_price" class="delete"
            >￥{{ item.specfoods[0].original_price }}</i
          >
        </span>
        <span class="add-icon fr" @click="addCarts($event, item, menu)">+</span>
        <span class="add-num" v-if="item.num">{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import config from "@/config/config";
import { Food, FoodsMenu } from "@/interface/foodsInterface";
import { addCarts } from "@/hooks/addCarts";

export default defineComponent({
  props: {
    hotFoods: Array as PropType<Food[]>,
    menu: {
      type: Object as PropType<FoodsMenu>,
      default: null,
    },
  },
  setup() {
    return {
      config,
      addCarts,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../theme/theme.scss";
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
      position: relative;
      text-align: left;
      margin-top: 5px;
      color: $redColor;
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
      .add-num {
        position: absolute;
        right: -5px;
        top: -5px;
        width: 14px;
        height: 14px;
        background: $redColor;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        font-size: 12px;
        transform: scale(0.8);
      }
    }
  }
}
</style>
<template>
  <div class="buy-cart-container">
    <div class="buy-cart-img fl">
      <img src="assets/images/buy-cart.jpg" />
      <span>{{ buyCartInfo.foodNum }}</span>
    </div>
    <div class="cart-price fl">
      <div class="price">¥{{ buyCartInfo.totalprice }}</div>
      <div>另外需配送费¥5</div>
    </div>
    <div class="cart-button fr">¥20元起送</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { Food } from "@/interface/foodsInterface";

export default defineComponent({
  props: {
    price: Number,
  },
  setup() {
    const store = useStore();
    const foods = store.state.buyCart.foods;
    //计算购物车价格和数量
    const buyCartInfo = computed(() => {
      let price = 0;
      let num = 0;
      foods.forEach((item: Food) => {
        num = num + (item.num ? item.num : 1);
        price += item.specfoods[0].price * (item.num ? item.num : 1);
      });
      return {
        foodNum: num,
        totalprice: price,
      };
    });

    return {
      buyCartInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./buyCart.scss";
</style>
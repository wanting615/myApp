<template>
  <div class="buy-cart-container">
    <div class="buy-cart-img">
      <img src="assets/images/buy-cart.jpg" />
      <span></span>
    </div>
    <div class="cart-price">
      <span>22.99</span>
    </div>
    <div class="button"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    price: Number,
  },
});
</script>

<style lang="scss" scoped>
@import "./buyCart.scss";
</style>
<template>
  <div class="buy-cart-container">
    <div class="buy-cart-img fl" @click="showBuyCart(true)">
      <img src="assets/images/buy-cart.jpg" />
      <span>{{ buyCartInfo.foodNum }}</span>
    </div>
    <div class="cart-price fl">
      <div class="price">
        ¥{{ buyCartInfo.totalprice }}
        <i v-if="buyCartInfo.originalprice">{{ buyCartInfo.originalprice }}</i>
      </div>
      <div>另外需配送费¥{{ deliveryPrice }}</div>
    </div>
    <div class="cart-button fr">¥{{ minimunOrder }}元起送</div>
  </div>
  <Modal
    :isOpen="isOpenRef"
    css-class="buy-cart-modal"
    @didDismiss="showBuyCart(false)"
  >
    <div class="cart-foods">
      <ul>
        <li>
          <img src="https://elm.cangdu.org/img/1678178095423339.jpg" />
          <div class="card-foods-inner">
            <div>农家小炒肉</div>
            <div>¥35</div>
          </div>
        </li>
      </ul>
    </div>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import Modal from "@/components/common/modal/modal.vue";
import { Food } from "@/interface/foodsInterface";

export default defineComponent({
  components: { Modal },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0,
    },
    minimunOrder: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const store = useStore();
    const foods = store.state.buyCart.foods;
    //计算购物车价格和数量
    const buyCartInfo = computed(() => {
      let price = 0;
      let originalprice = 0;
      let num = 0;
      foods.forEach((item: Food) => {
        num = num + (item.num ? item.num : 1);
        price += item.specfoods[0].price * (item.num ? item.num : 1);
        originalprice +=
          item.specfoods[0].original_price * (item.num ? item.num : 1);
      });
      return {
        foodNum: num,
        totalprice: price,
        originalprice: originalprice,
      };
    });

    const isOpenRef = ref(false);
    // //显示购物车
    const showBuyCart = (state: boolean) => {
      isOpenRef.value = state;
    };
    return {
      buyCartInfo,
      showBuyCart,
      isOpenRef,
      foods,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./buyCart.scss";
</style>
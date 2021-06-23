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
    <div class="cart-button fr" v-if="buyCartInfo.totalprice > minimunOrder">
      去结算
    </div>
    <div class="cart-button fr" v-else>¥{{ minimunOrder }}元起送</div>
  </div>
  <Modal
    :isOpen="isOpenRef"
    css-class="buy-cart-modal"
    @didDismiss="showBuyCart(false)"
  >
    <div class="cart-foods">
      <div class="cart-title">
        <span>已选商品</span>
        <span>(包装费¥<span class="color">2.5</span>)</span>
        <span class="fr" @click="clearBuyCart"
          ><ion-icon :src="trashOutline"></ion-icon>清空</span
        >
      </div>
      <ul>
        <li v-for="item in foods" :key="item.item_id">
          <img :src="config.imagePath + item.image_path" />
          <div class="card-foods-inner">
            <div>{{ item.name }}</div>
            <div>
              ¥{{ item.specfoods[0].price }}
              <i v-if="item.specfoods[0].original_price" class="delete">
                ￥{{ item.specfoods[0].original_price }}
              </i>
            </div>
          </div>
          <div class="add-icon">
            <span v-if="item.num">
              <ion-icon
                :icon="removeCircleOutline"
                class="del-icon"
                @click="delBuyCarts(item)"
              ></ion-icon>
              <span class="food-num">{{ item.num }}</span>
            </span>
            <ion-icon
              :icon="addOutline"
              @click="addBuyCarts($event, item)"
            ></ion-icon>
          </div>
        </li>
      </ul>
    </div>
  </Modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
} from "vue";
import config from "@/config/config";
import { useStore } from "@/store";
import { addOutline, removeCircleOutline, trashOutline } from "ionicons/icons";
import Modal from "@/components/common/modal/modal.vue";
import { Food, FoodsMenu } from "@/interface/foodsInterface";
import { addCarts, delCarts } from "@/hooks/addCarts";

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
    foodMemus: Array as PropType<FoodsMenu[]>,
  },
  setup(props) {
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
    //显示购物车
    const showBuyCart = (state: boolean) => {
      if (store.state.buyCart.foods.length > 0) {
        isOpenRef.value = state;
      }
    };
    //清空购物车
    const clearBuyCart = () => {
      store.commit("clearFoods");
    };

    const methodReactive = reactive({
      //添加
      addBuyCarts: (event: MouseEvent, item: Food) => {
        const menu = props.foodMemus?.find(
          (menu: FoodsMenu) => item.category_id === menu.id
        );
        const food = menu?.foods.find(
          (food: Food) => item.item_id === food.item_id
        );
        if (menu && food) addCarts(event, food, menu);
      },
      //删除
      delBuyCarts: (item: Food) => {
        const menu = props.foodMemus?.find(
          (menu: FoodsMenu) => item.category_id === menu.id
        );
        const food = menu?.foods.find(
          (food: Food) => item.item_id === food.item_id
        );
        if (menu && food) delCarts(food, menu);
      },
    });

    return {
      addOutline,
      removeCircleOutline,
      trashOutline,
      buyCartInfo,
      showBuyCart,
      isOpenRef,
      foods,
      config,
      clearBuyCart,
      ...toRefs(methodReactive),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./buyCart.scss";
</style>
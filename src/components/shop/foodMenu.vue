<template>
  <div class="food-menu" v-if="shopMenu">
    <HotFood :hotFoods="hotFoods" />
    <div class="menu">
      <div class="menu-left">
        <ul>
          <li v-for="(item, index) in shopMenu" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="menu-right">
        <ul v-for="(menu, index) in shopMenu" :key="index">
          <li>
            <div class="menu-title">{{ menu.name }}</div>
            <ul>
              <li v-for="item in menu.foods" :key="item.id">
                <img :src="config.imagePath + item.image_path" />
                <div class="food-info">
                  <div class="ellipsis">{{ item.name }}</div>
                  <div>{{ item.description }}</div>
                  <div>
                    月售{{ item.month_sales }} 好评率{{ item.satisfy_rate }}
                  </div>
                  <div>¥{{ item.specfoods[0].price }}</div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import config from "@/config/config";
import { FoodsMenu, Food } from "@/interface/foodsInterface";
import HotFood from "./hotFood.vue";
export default defineComponent({
  props: {
    shopMenu: {
      type: Array as PropType<FoodsMenu[]>,
    },
  },
  components: {
    HotFood,
  },
  setup(props) {
    const shopMenu: FoodsMenu[] = props.shopMenu as FoodsMenu[];
    const hotFoods: Food[] = shopMenu[0].foods.filter(
      (item: Food, index: number) => index < 3
    );
    return {
      hotFoods,
      config,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./foodMenu.scss";
</style>
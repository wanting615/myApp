<template>
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
        <li v-if="menu.foods.length > 0">
          <div class="menu-title ellipsis">
            <span>{{ menu.name }}</span
            >{{ menu.description }}
          </div>
          <ul>
            <li v-for="item in menu.foods" :key="item.id">
              <img :src="config.imagePath + item.image_path" />
              <div class="food-info">
                <div class="food_name ellipsis">{{ item.name }}</div>
                <div class="food_des">
                  {{ item.description ? item.description : "无" }}
                </div>
                <div class="food_rate">
                  月售{{ item.month_sales }} 好评率{{ item.satisfy_rate }}%
                </div>
                <div class="food_price">¥{{ item.specfoods[0].price }}</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import config from "@/config/config";
import { FoodsMenu } from "@/interface/foodsInterface";

export default defineComponent({
  props: {
    shopMenu: {
      type: Array as PropType<FoodsMenu[]>,
    },
  },
  setup() {
    return {
      config,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./foodMenu.scss";
</style>
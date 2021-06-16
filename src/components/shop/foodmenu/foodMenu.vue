<template>
  <div class="menu" ref="menuEl">
    <div class="menu-left" ref="menuLeft">
      <ul>
        <li
          v-for="(item, index) in shopMenu"
          :key="index"
          :class="{ active: index === selecIndex }"
          @click="selectMenu(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- <div class="menu-title ellipsis">
      <span>{{ menuTitleInfo.name }}</span
      >{{ menuTitleInfo.description }}
    </div> -->
    <div class="menu-right" ref="menuRight" @scroll="scollEvent($event)">
      <ul v-for="(menu, index) in shopMenu" :key="index" class="food-list">
        <li>
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
              <div class="add-icon">
                <span v-if="item.num">
                  <ion-icon
                    :icon="removeCircleOutline"
                    class="del-icon"
                    @click="delCarts(item)"
                  ></ion-icon>
                  <span class="food-num">{{ item.num }}</span>
                </span>
                <span class="choose-btn" v-if="item.specifications.length"
                  >选规格</span
                >
                <ion-icon
                  v-else
                  :icon="addOutline"
                  @click="addCarts($event, item)"
                ></ion-icon>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onUpdated,
  PropType,
  ref,
  unref,
} from "vue";
import config from "@/config/config";
import { FoodsMenu } from "@/interface/foodsInterface";
import { addOutline, removeCircleOutline } from "ionicons/icons";
import { addCarts, delCarts } from "@/hooks/addCarts";

export default defineComponent({
  props: {
    shopMenu: {
      type: Array as PropType<FoodsMenu[]>,
    },
  },
  setup(props, context) {
    const menuEl = ref<Nullable<ElRef>>();
    const menuLeft = ref<Nullable<ElRef>>();
    const menuRight = ref<Nullable<ElRef>>();
    const selecIndex = ref(0);
    let foodList: Undefinedable<NodeListOf<Element>>;
    const foodListOffset: number[] = [];

    //默认取第一个menu标题信息
    const menuTitleInfo = computed(() => {
      const obj = {
        name: "",
        description: "",
      };
      if (props.shopMenu && props.shopMenu[0]) {
        obj.name = props.shopMenu[0].name;
        obj.description = props.shopMenu[0].description;
      }
      return obj;
    });

    onUpdated(() => {
      if (!foodList || foodList.length === 0) {
        foodList = unref(menuRight)?.querySelectorAll(".food-list");
        foodList?.forEach((item: Element) => {
          foodListOffset.push((item as HTMLElement).offsetTop);
        });
      }
    });

    //点击选菜单栏
    const selectMenu = (index: number) => {
      context.emit("contentScrool");
      selecIndex.value = index;
      if (foodList) {
        const foodItem = foodList[index] as HTMLElement;
        unref(menuRight)?.scrollTo({
          top: foodItem.offsetTop,
        });
      }
    };

    //食物列表滑动事件
    const scollEvent = (e: Event) => {
      const nowIndex =
        foodListOffset.findIndex((item: number) => {
          return (e.target as HTMLElement).scrollTop < item;
        }) || 1;
      selecIndex.value = nowIndex - 1;
    };

    return {
      addOutline,
      removeCircleOutline,
      menuEl,
      menuLeft,
      menuRight,
      config,
      menuTitleInfo,
      selectMenu,
      selecIndex,
      scollEvent,
      addCarts,
      delCarts,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./foodMenu.scss";
</style>
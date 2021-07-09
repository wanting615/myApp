<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button>
          <ion-icon src="assets/svg/home.svg" class="home-icon"></ion-icon>
        </ion-button>
        <ion-title
          ><router-link to="/login">{{ userInfo ? userInfo.username : "立即登陆" }}</router-link></ion-title
        >
        <ion-buttons slot="end">
          <ion-button class="right-icon">
            <router-link to="/setting"><ion-icon :icon="settingsOutline"></ion-icon></router-link>
            <ion-icon :icon="chatboxEllipsesOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="inner">
        <div class="item popular-func">
          <div class="item-label">常用功能</div>
          <div class="item-list">
            <div class="item-item" v-for="item in popularFun" :key="item.name">
              <ion-icon :src="item.icon"></ion-icon>
              {{ item.name }} {{ item.num ? item.num : "" }}
            </div>
          </div>
        </div>
        <div class="item popular-func">
          <div class="item-label">互动娱乐</div>
          <div class="item-list">
            <div class="item-item wallet-item" v-for="item in wallet" :key="item.name">
              <div class="item-tips">
                <div>{{ item.name }}</div>
                <div>{{ item.tip }}</div>
              </div>
              <img :src="item.image" alt="" />
            </div>
          </div>
        </div>
        <div class="item popular-func">
          <div class="item-label">更多推荐</div>
          <div class="item-list">
            <div class="item-item" v-for="item in moreFun" :key="item.name" @click="toPage(item)">
              <ion-icon :src="item.icon"></ion-icon>
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { settingsOutline, chatboxEllipsesOutline } from "ionicons/icons";
import { useStore } from "@/store";

export default defineComponent({
  name: "Ucenter",
  setup() {
    const store = useStore();
    const userInfo = computed(() => {
      return store.state.user.userInfo;
    });
    const data = reactive({
      popularFun: [
        { name: "红包卡劵", icon: "assets/colour-svg/red-envelop.svg", num: userInfo?.value?.gift_amount },
        { name: "店铺关注", icon: "assets/colour-svg/follow.svg" },
        { name: "购物车", icon: "assets/colour-svg/shop-cart.svg" },
        { name: "评价中心", icon: "assets/colour-svg/evaluate.svg" },
      ],
      wallet: [
        {
          name: "冲吧饿小宝",
          tip: "10分爱心餐待领",
          image: "assets/images/1.jpg",
        },
        {
          name: "赚吃货豆",
          tip: "可兑大红包",
          image: "assets/images/2.jpg",
        },
        {
          name: "签到领现金",
          tip: "满10元提现",
          image: "assets/images/3.jpg",
        },
        {
          name: "推荐有奖",
          tip: "满点外卖也能赚钱",
          image: "assets/images/4.jpg",
        },
      ],
      moreFun: [
        { name: "我的地址", icon: "assets/colour-svg/red-envelop.svg", routerUrl: "/address" },
        { name: "品牌会员", icon: "assets/colour-svg/follow.svg" },
        { name: "服务中心", icon: "assets/colour-svg/shop-cart.svg" },
        { name: "我的订单", icon: "assets/colour-svg/evaluate.svg" },
        { name: "我的优惠", icon: "assets/colour-svg/evaluate.svg" },
      ],
    });
    const router = useRouter();
    const toPage = (item: { name: string; icon: string; routerUrl: string }) => {
      router.push(item.routerUrl);
    };

    // data.popularFun[0].num = userInfo?.gift_amount || 0;
    return {
      userInfo,
      toPage,
      ...toRefs(data),
      settingsOutline,
      chatboxEllipsesOutline,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
@import "./ucenter.scss";
</style>
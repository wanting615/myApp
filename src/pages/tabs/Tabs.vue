<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar :style="{ display: hideTabs }">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon src="assets/svg/home.svg" />
          <ion-label>首页</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="find" href="/tabs/find">
          <ion-icon src="assets/svg/find.svg" />
          <ion-label>真香</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="orderList" href="/tabs/orderList">
          <ion-icon src="assets/svg/order.svg" />
          <ion-label>订单</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="ucenter" href="/tabs/ucenter">
          <ion-icon src="assets/svg/my.svg" />
          <ion-label>我的</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from "@ionic/vue";
import { useStore } from "@/store";

const store = useStore();
const hideTabs = computed(() => {
  return store.state.common.showTabs ? "" : "none";
});
</script>
<style lang="scss">
ion-tab-button {
  --color-selected: #54b5f3;
  ion-icon {
    font-size: 20px;
  }
}
</style>
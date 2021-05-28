<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon src="assets/svg/home.svg" />
          <ion-label>首页</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="find" href="/tabs/tab2">
          <ion-icon src="assets/svg/find.svg" />
          <ion-label>发现</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="order" href="/tabs/tab3">
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

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
};
</script>
<style lang="scss">
ion-tab-button {
  ion-icon {
    font-size: 20px;
  }
}
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>设置</ion-title>
        <ion-buttons slot="end">新增地址</ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item detail="true"><router-link to="/account">账号与安全</router-link></ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonItem, IonList } from "@ionic/vue";

export default defineComponent({
  components: {
    IonItem,
    IonList,
  },
});
</script>
<style lang="scss" scoped>
@import "../../../theme/theme.scss";
ion-content {
  --background: #f5f5f5;
  ion-list {
    margin-top: 10px;
    ion-item {
      font-size: 14px;
      color: #333;
      a {
        width: 100%;
        height: 100%;
        line-height: 44px;
      }
    }
  }
  .login-out {
    margin-top: 12px;
    font-size: 14px;
    text-align: center;
    color: $redColor;
    line-height: 44px;
    background-color: #fff;
  }
}
</style>
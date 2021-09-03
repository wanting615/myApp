<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>通用</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item lines="none">
          <ion-label>
            <span>个性化设置</span>
            <div>关闭按钮后，将无法根据您的兴趣爱好、日常购买习惯为您推荐店铺或商品</div>
          </ion-label>
          <ion-toggle checked color="success"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonLabel, IonItem, IonList, IonToggle } from "@ionic/vue";
</script>
<style lang="scss" scoped>
@import "../../../../theme/theme.scss";
ion-content {
  --background: #f5f5f5;
  ion-list {
    margin-top: 10px;
    ion-item {
      font-size: 14px;
      color: #333;
      ion-label {
        white-space: normal !important;
        span {
          font-weight: bold;
        }
        div {
          width: 90%;
          color: #999;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
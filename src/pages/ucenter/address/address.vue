<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>收获地址</ion-title>
        <ion-buttons slot="end"><router-link to="addAddress">新增地址</router-link></ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item lines="none">
          <div class="inner">
            <div class="address_detail">
              <span>家</span>
              <span>合欢公寓 50号301</span>
            </div>
            <div class="user-info">
              <span>万挺</span>
              <span>176****1500</span>
            </div>
          </div>
          <ion-button slot="end">
            <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonItem, IonList } from "@ionic/vue";
import { createOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    IonItem,
    IonList,
  },
  setup() {
    return {
      createOutline,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../../theme/theme.scss";
ion-content {
  --background: #f5f5f5;
  ion-list {
    ion-item {
      font-size: 14px;
      color: #333;
      .inner {
        width: 100%;
        padding: 10px 0;
        border-bottom: 0.5px solid #eee;
      }
      .address_detail {
        margin-bottom: 5px;
        color: #333;
        font-weight: bold;
        span:first-child {
          padding: 2px 8px;
          margin-right: 4px;
          font-size: 12px;
          font-weight: 400;
          color: $themeColor;
          background-color: #ebf6fd;
        }
      }
      .user-info {
        font-size: 13px;
        color: #999;
        span:first-child {
          margin-right: 10px;
        }
      }
      ion-icon {
        color: #bbb;
      }
    }
  }
}
</style>
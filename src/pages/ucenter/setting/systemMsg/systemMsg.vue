<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>系统通知</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <div class="list-title">饿了么未打开时</div>
        <ion-item detail="true" class="first" lines="none">
          系统消息通知
          <span class="theme-color" slot="end">去开启</span>
        </ion-item>
        <div class="list-title">通知类型</div>
        <ion-item>
          <ion-label>
            <span>订单通知</span>
            <div>订单交易状态和配送信息等</div>
          </ion-label>
          <ion-toggle color="secondary"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>
            <span>服务通知</span>
            <div>红包、会员、客服进度等相关服务</div>
          </ion-label>
          <ion-toggle color="secondary"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>
            <span>聊天信息</span>
            <div>与骑手、商家、药师等聊天内容</div>
          </ion-label>
          <ion-toggle color="secondary"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>
            <span>订阅消息</span>
            <div>你主动订阅的点餐、签到等提醒功能</div>
          </ion-label>
          <ion-toggle color="secondary"></ion-toggle>
        </ion-item>
        <ion-item lines="none">
          <ion-label>
            <span>活动优惠</span>
            <div>饿了么官方福利促销和商家优惠活动</div>
          </ion-label>
          <ion-toggle color="secondary"></ion-toggle>
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
    ion-item {
      font-size: 14px;
      color: #333;
      ion-label {
        white-space: normal !important;
        div {
          width: 90%;
          color: #999;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      .theme-color {
        color: $themeColor;
        font-size: 13px;
      }
    }
    .list-title {
      padding: 0 20px;
      font-size: 12px;
      line-height: 32px;
      color: #999;
      background-color: #f5f5f5;
    }
  }
}
</style>
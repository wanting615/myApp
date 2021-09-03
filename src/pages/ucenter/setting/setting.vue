<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item detail="true">
          <router-link to="/account">账号与安全</router-link>
        </ion-item>
        <ion-item detail="true">
          <router-link to="/general">通用</router-link>
        </ion-item>
        <ion-item detail="true">
          <router-link to="/systemMsg">消息通知</router-link>
        </ion-item>
        <ion-item detail="true" @click="scroeApp">欢迎评分</ion-item>
        <ion-item detail="true">
          <router-link to="/about">关于饿了么</router-link>
        </ion-item>
        <ion-item detail="true">隐私</ion-item>
        <ion-item detail="true" lines="none">意见反馈</ion-item>
      </ion-list>
      <div class="login-out" @click="loginOut" v-show="isLoginoOut">退出当前账号</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonItem, IonList } from "@ionic/vue";
import { useStore } from "@/store";
import alertService from "@/until/alert.service";

let isLoginoOut = true;
const store = useStore();
const scroeApp = () => {
  alertService.msgToast("暂无法跳转至appStore或应用商店进行评分");
};
const loginOut = () => {
  store.commit("delUserInfo");
  store.commit("delLoginToken");
  isLoginoOut = false;
};
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
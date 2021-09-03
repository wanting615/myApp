<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>账号与安全</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item detail="true" @click="changePassword">
          登陆密码
          <span slot="end">修改</span>
        </ion-item>
        <ion-item detail="true">
          支付密码
          <span slot="end">未设置</span>
        </ion-item>
        <ion-item detail="true" lines="none">
          注销账号
          <span slot="end" @click="delAccount">注销后账号将无法恢复，请谨慎操作</span>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonItem, IonList } from "@ionic/vue";
import { useStore } from "@/store";
import { useRouter, Router } from "vue-router";
import alertService from "@/until/alert.service";
import { delUser } from "@/api/user/user";

const router: Router = useRouter();
const store = useStore();
const changePassword = () => {
  router.push("/password");
};

const delAccount = () => {
  delUser().then((res) => {
    if (res.status) {
      store.commit("delUserInfo");
      store.commit("delLoginToken");
      alertService.msgToast(res.message);
    }
  });
};
</script>
<style lang="scss" scoped>
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
      span {
        margin-right: 0;
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
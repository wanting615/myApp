<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>兑换红包(随便输)</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-input type="number" placeholder="请输入兑换码" v-model="val" />
      <div class="btn" :class="{ active: val }" @click="exchangeHongbao">兑换</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonInput } from "@ionic/vue";
import { sendHongbaoKey } from "@/api/user/user";
import alertService from "@/until/alert.service";
import { useRouter } from "vue-router";

const val = "";
const router = useRouter();
const exchangeHongbao = () => {
  sendHongbaoKey().then((res) => {
    alertService.msgToast(res.message);
    if (res.status) router.back();
  });
};
</script>
<style lang="scss" scoped>
ion-content {
  --background: #f5f5f5;
  ion-input {
    margin-top: 16px;
    --padding-start: 10px;
    --padding-top: 15px;
    --padding-bottom: 15px;
    --background: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  div {
    width: 95%;
    line-height: 50px;
    margin: 16px auto;
    color: #fff;
    background-color: #ddd;
    text-align: center;
    border-radius: 5px;
    &.active {
      background-color: #61d36f;
    }
  }
}
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>修改密码</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form action="">
        <ion-input type="password" name="oldPassword" v-model="user.oldPassword" placeholder="请输入当前登陆密码" clearInput="true" @ionChange.passive="changeInput"></ion-input>
        <ion-input type="password" name="newPassword" v-model="user.newPassword" placeholder="确认新密码" clearInput="true" @ionChange.passive="changeInput"></ion-input>
        <ion-button :disabled="isDisabled" @click="changePwd">修改密码</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { IonInput } from "@ionic/vue";
import { useStore } from "@/store";
import { useRouter, Router } from "vue-router";
import alertService from "@/until/alert.service";

export default defineComponent({
  components: { IonInput },
  setup() {
    const user = reactive({
      oldPassword: "",
      newPassword: "",
    });
    const router: Router = useRouter();
    const isDisabled = ref(true);
    const store = useStore();

    const changePwd = () => {
      alertService.msgToast("修改成功");
      router.push("/password");
      store.commit("setLoginToken", "");
    };

    const changeInput = () => {
      if (user.oldPassword && user.newPassword) {
        isDisabled.value = false;
      } else {
        isDisabled.value = true;
      }
    };
    return {
      user,
      isDisabled,
      changePwd,
      changeInput,
    };
  },
});
</script>
<style lang="scss" scoped>
ion-content {
  --padding-start: 5%;
  --padding-end: 5%;
  --background: #f5f5f5;
  form {
    padding-top: 20px;
    ion-input {
      border-bottom: 1px solid #e5e5e5;
      line-height: 40px;
      font-size: 14px;
    }
    ion-button {
      width: 100%;
      margin-top: 50px;
      color: #fff;
      background: #54b5f3;
      border-radius: 20px;
      opacity: 1;
      &.button-disabled {
        color: #999;
        background: #e0e0e0;
      }
    }
  }
}
</style>
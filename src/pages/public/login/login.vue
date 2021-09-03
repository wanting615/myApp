<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :force-overscroll="true">
      <div class="login-title">账号登陆</div>
      <form action>
        <ion-input
          type="text"
          name="username"
          v-model.trim="user.username"
          placeholder="手机/用户名"
          clearInput="true"
          @ionChange="changeInput"
        ></ion-input>
        <ion-input
          type="password"
          name="password"
          v-model="user.password"
          placeholder="密码"
          clearInput="true"
          @ionChange="changeInput"
        ></ion-input>

        <ion-button :disabled="isDisabled" @click="login">登陆</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
interface User {
  username: string;
  password: string;
}
import { reactive, ref } from "@vue/reactivity";
import { IonInput } from "@ionic/vue";
import { loginUser } from "@/api/user/user";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import common from "@/until/common.service";

const router = useRouter();
const store = useStore();
const isDisabled = ref(true);
const user = reactive<User>({
  username: "",
  password: "",
});

const login = () => {
  const loginToken = common.getEncrypt<User>(user);
  loginUser(loginToken).then((res) => {
    if (res.status) {
      localStorage.setItem("loginToken", loginToken); //本地存储
      store.commit("setUserInfo", res.data); //存储store userInfo
      store.commit("setLoginToken", loginToken); //存储store token
      router.back();
    } else {
      alert(res.message);
    }
  });
};

const changeInput = () => {
  if (user.username && user.password) {
    isDisabled.value = false;
  } else {
    isDisabled.value = true;
  }
};
</script>
<style lang="scss" scoped>
@import "./login.scss";
</style>
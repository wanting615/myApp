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
      <form action="">
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

        <ion-button :disabled="isDisabled">登陆</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonInput } from "@ionic/vue";
interface User {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  components: {
    IonInput,
  },
  data() {
    console.log(1);
    return {
      user: ref<User>({
        username: "",
        password: "",
      }),
      isDisabled: true,
    };
  },
  methods: {
    changeInput(): void {
      if (this.user.username && this.user.password) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "./login.scss";
</style>
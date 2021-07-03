<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { useUserInfo } from "@/hooks/userInfo";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    useUserInfo();
  },
});
</script>
<style lang="scss">
ion-header {
  ion-back-button {
    --icon-font-size: 24px;
  }
  ion-title {
    font-weight: 400;
  }
}
</style>
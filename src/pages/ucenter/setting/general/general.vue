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
        <ion-item @click="clearCache"
          >清楚图片缓存 <span slot="end">{{ cacheNum }}MB<i>立即清除</i></span></ion-item
        >
        <ion-item detail="true" @click="picDefinition"
          >非WIFI下图片质量 <span slot="end">{{ picText }}</span></ion-item
        >
        <ion-item detail="true" lines="none" @click="goPersonal">个性化推荐设置</ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { actionSheetController, IonItem, IonList } from "@ionic/vue";
import { useRouter, Router } from "vue-router";
import alertService from "@/until/alert.service";

export default defineComponent({
  components: {
    IonItem,
    IonList,
  },
  setup() {
    const router: Router = useRouter();
    const picText = ref("普通");
    const cacheNum = ref(12.2);
    const clearCache = () => {
      cacheNum.value = 0;
      alertService.msgToast("清除成功");
    };
    const picDefinition = async () => {
      const actionSheet = await actionSheetController.create({
        header: "非WIFI下图片质量",
        buttons: [
          {
            text: "普通（节省流量）",
            handler: () => {
              picText.value = "普通";
            },
          },
          {
            text: "高清（最佳效果）",
            handler: () => {
              picText.value = "高清";
            },
          },
          {
            text: "取消",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ],
      });
      await actionSheet.present();
    };

    const goPersonal = () => {
      router.push("/personal");
    };
    return {
      cacheNum,
      clearCache,
      picText,
      picDefinition,
      goPersonal,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../../../theme/theme.scss";
ion-content {
  --background: #f5f5f5;
  ion-list {
    margin-top: 12px;
    ion-item {
      font-size: 14px;
      color: #333;
      span {
        margin-right: 0;
        color: #999;
        font-size: 12px;
        i {
          padding: 5px 0 5px 10px;
          margin-left: 10px;
          border-left: 0.5px solid #e5e5e5;
          color: $themeColor;
        }
      }
    }
  }
}
</style>
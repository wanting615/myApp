<!--
 * @Date: 2021-08-03 15:24:06
 * @LastEditors: wanting
 * @LastEditTime: 2021-08-30 18:02:10
 * @FilePath: /myApp/src/pages/order/comfirmOrder/remarks.vue
-->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>订单备注</ion-title>
        <ion-buttons slot="end" @click="saveRemark">完成</ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="text-area">
        <ion-textarea
          enterkeyhint="完成"
          maxlength="50"
          placeholder="无接触配送,辛苦将商品挂门把手上、放前台桌子上或者指定地点"
          autoGrow="true"
          v-model="tipsValue"
        ></ion-textarea>
        <span>{{ tipsValue.length }}/50</span>
      </div>
      <div class="tips-list">
        <span>快捷输入</span>
        <ul>
          <li v-for="(item, index) in tips" :key="index" @click="selectTips(item)">{{ item }}</li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, toRefs } from "vue";
import { IonTextarea } from "@ionic/vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const data = reactive<{ tipsValue: string; tips: string[] }>({
  tipsValue: "",
  tips: ["对骑士", "对商家", "不要辣", "不要辣不要辣", "请电话联系我", "放门口", "放前台", "挂门把手上", "要热的", "要冰的", "常温", "不要糖", "辣一点", "超级超级辣"],
});

const selectTips = (item: string) => {
  data.tipsValue = item;
};
const store = useStore();
const router = useRouter();
const saveRemark = () => {
  store.commit("setRemarks", data.tipsValue);
  router.back();
};
</script>
<style lang="scss" scoped>
ion-content {
  --padding-start: 16px;
  --padding-top: 16px;
  --padding-end: 16px;
  .text-area {
    position: relative;
    ion-textarea {
      min-height: 110px;
      --padding-start: 10px;
      font-size: 14px;
      background-color: #fafafa;
      border: 0.5px solid #eee;
      border-radius: 5px;
    }
    span {
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 12px;
      color: #999;
      z-index: 10;
    }
  }
  .tips-list {
    padding-top: 15px;
    line-height: 30px;
    font-size: 13px;
    color: #666;
    span {
      color: #999;
      font-size: 14px;
    }
    li {
      margin: 10px 10px 0 0;
      display: inline-block;
      padding: 0 15px;
      border: 1px solid #eee;
      border-radius: 3px;
    }
  }
}
</style>
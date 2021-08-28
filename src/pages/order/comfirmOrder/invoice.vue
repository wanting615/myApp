<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>开局发票</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="invoce-icon">
        <img src="assets/icon/page.jpg" alt="" />
        <div class="icon-info">
          <h6>纸质发票</h6>
          <div>发票与订单一起送达，请注意查收</div>
        </div>
      </div>
      <div class="form">
        <div class="title">发票信息</div>
        <ion-list>
          <ion-item>
            <ion-label>类型</ion-label>
            <div>单位</div>
            <div>个人</div>
          </ion-item>
          <ion-item>
            <ion-label>抬头</ion-label>
            <ion-input type="text" placeholder="请填写单位的抬头名称" v-model="invoice.header" @ionChange="changeInput"></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label>税号</ion-label>
            <ion-input type="number" placeholder="请填写“税号”或“社会信用代码”" v-model="invoice.taxesNum" @ionChange="changeInput"></ion-input>
          </ion-item>
        </ion-list>
      </div>
      <div class="comfirm-btn" :class="{ active: isActive }" @click="saveInvoice">保存并使用</div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, unref } from "vue";
import { IonList, IonItem, IonLabel, IonInput } from "@ionic/vue";
import { useStore } from "@/store";
import { Invoice } from "@/interface/order";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const invoice = reactive<Invoice>({
      invoiceType: 1,
      header: "",
      taxesNum: undefined,
    });

    const isActive = ref(false);
    const changeInput = () => {
      if (invoice.header && invoice.taxesNum) isActive.value = true;
    };

    const saveInvoice = () => {
      store.commit("setInvoice", unref(invoice));
      router.back();
    };
    return {
      invoice,
      isActive,
      changeInput,
      saveInvoice,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
ion-content {
  --background: #f8f8f8;
  .invoce-icon {
    display: flex;
    padding: 24px 15px;
    background-color: $themeColor;
    align-items: center;
    img {
      width: 38px;
      height: 44px;
    }
    .icon-info {
      padding-left: 15px;
      font-size: 14px;
      color: #d3effc;
      h6 {
        color: #fff;
        margin: 0 0 5px 0;
        font-weight: bolder;
      }
    }
  }
  .form {
    .title {
      padding: 16px 20px;
      color: #999;
      font-weight: 500;
    }
    ion-item {
      --inner-border-width: 0.5px;
      --border-color: #fafafa;
      --inner-padding-top: 6px;
      --inner-padding-bottom: 6px;
      font-size: 15px;
      ion-label {
        flex: inherit;
        margin-right: 15%;
      }
    }
  }
  .comfirm-btn {
    position: absolute;
    width: 96%;
    left: 2%;
    bottom: 20px;
    line-height: 50px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    background-color: #e0e0e0;
    border-radius: 25px;
    &.active {
      background-color: $themeColor;
    }
  }
}
</style>
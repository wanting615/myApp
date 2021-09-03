<!--
 * @Date: 2021-08-14 13:45:47
 * @LastEditors: wanting
 * @LastEditTime: 2021-08-31 16:09:37
 * @FilePath: /myApp/src/pages/order/orderDetail/orderDetail.vue
-->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-button @click="goBack">
            <ion-icon :icon="chevronBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <OrderSkeletonComponent v-if="!data.orderInfo" />
      <div v-if="data.orderInfo">
        <OrderStatusComponent
          :timer="timer"
          :status="data.orderInfo.status"
          :orderId="data.orderInfo.orderId"
          @changeOrder="changeOrder"
        />
        <OrderFoodsComponent :orderInfo="data.orderInfo" />
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref, } from "vue";
import { useRoute, useRouter } from "vue-router";
import { chevronBackOutline } from "ionicons/icons";
import OrderStatusComponent from "@/components/order/orderStatus.vue";
import OrderSkeletonComponent from "@/components/order/orderSkeleton.vue";
import OrderFoodsComponent from "@/components/order/orderFoods.vue";
import { OrderInfo } from "@/interface/order";
import { getOrderDetail } from "@/api/order/order";
import { useTimerFormat } from "@/hooks/format";

const router = useRouter();
const route = useRoute();
const orderId = useRoute().params.orderId as string;
const data = reactive<{ orderInfo: Nullable<OrderInfo> }>({
  orderInfo: null,
});
console.log(router);

const timer = ref("");

const goBack = () => {
  if (route.query.from === "comfrimOrder") {
    router.go(-3);
  } else {
    router.back();
  }
};

let interval: number;
onMounted(() => {
  //获取订单详情
  getOrderDetail(parseInt(orderId)).then((res) => {
    if (!res.status) return;
    data.orderInfo = res.data;
    if (data.orderInfo && data.orderInfo.status === 0) {
      //订单支付倒计时 15分钟倒计时
      let times = Math.floor((new Date(data.orderInfo.orderTime).getTime() + 900000 - new Date().getTime()) / 1000);
      console.log(times);
      interval = setInterval(() => {
        timer.value = useTimerFormat(times);
        times--;
        if (times === 0) {
          clearInterval(interval);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          data.orderInfo!.status = 4;
        }
      }, 1000);
    }
  });
});

onBeforeUnmount(() => {
  clearInterval(interval);
});

//修改订单状态
const changeOrder = (status: number) => {
  data.orderInfo && (data.orderInfo.status = status);
};
</script>
<style lang="scss" scoped>
@import "./orderDetail.scss";
</style>
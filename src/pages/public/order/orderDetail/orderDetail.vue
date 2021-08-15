<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
          <!-- <ion-button router-link="/tabs/home">
            <ion-icon :icon="chevronBackOutline" @click="goBack"></ion-icon>
          </ion-button> -->
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <OrderStatusComponent />
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { chevronBackOutline, chevronForwardOutline, volumeMediumOutline, shieldCheckmarkOutline } from "ionicons/icons";
import OrderStatusComponent from "@/components/order/orderStatus.vue";
import { OrderInfo } from "@/interface/order";
import { getOrderDetail } from "@/api/order/order";
import alertService from "@/until/alert.service";
import { useTimerFormat } from "@/hooks/format";

export default defineComponent({
  components: {
    OrderStatusComponent,
  },
  setup() {
    const router = useRouter();
    const orderId = useRoute().params.orderId as string;
    const data = reactive<{ orderInfo: Nullable<OrderInfo> }>({
      orderInfo: null,
    });
    console.log(router);

    const timer = ref("");

    const goBack = () => {
      //
    };

    let interval: number;
    onMounted(() => {
      //获取订单详情
      getOrderDetail(parseInt(orderId)).then((res) => {
        res.status ? (data.orderInfo = res.data) : alertService.errorToast(res.message);
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

    return {
      chevronBackOutline,
      chevronForwardOutline,
      volumeMediumOutline,
      shieldCheckmarkOutline,
      ...toRefs(data),
      timer,
      goBack,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./orderDetail.scss";
</style>
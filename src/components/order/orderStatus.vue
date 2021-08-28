<template>
  <div class="order-status">
    <div class="status-title">
      <span v-if="status === 0">待支付,剩余{{ timer }}分</span>
      <span v-if="status !== 0">{{ status === 1 ? "正在配送中" : status === 2 ? "订单已送达" : "订单已取消" }}</span>
      <ion-icon :icon="chevronForwardOutline"></ion-icon>
    </div>
    <div class="order-tips" v-if="status === 0">
      <ion-icon :icon="volumeMediumOutline"></ion-icon>
      <span class="vertical">15分钟内未支付,订单将自动取消</span>
    </div>
    <div class="order-complete">
      <div class="top">
        <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
        <span class="vertical">号码保护 · 食安险</span>
        <ion-icon :icon="chevronForwardOutline"></ion-icon>
      </div>
      <div class="center">
        <div v-if="status === 0">
          <h5>请尽快支付</h5>
          <span>蓝骑士专送</span>
        </div>
        <div v-else>
          <h5>{{ status === 1 ? "正在配送中" : status === 2 ? "感谢信任,期待再次光临" : "超过15分钟未支付,自动取消单" }}</h5>
        </div>
      </div>
      <ul class="bottom" v-if="status === 0 && status !== 4">
        <li v-for="(item, index) in arrData.pay" :key="index" :class="{ theme: item.isTheme }" @click="changeOrder(item)">
          <ion-icon :icon="item.icon"></ion-icon>
          <div>{{ item.text }}</div>
        </li>
      </ul>
      <ul class="bottom" v-if="status === 1 || status === 2">
        <li v-for="(item, index) in arrData.completed" :key="index" :class="{ theme: item.isTheme }">
          <ion-icon :icon="item.icon"></ion-icon>
          <div>{{ item.text }}</div>
        </li>
      </ul>
      <ul class="bottom" v-if="status === 4" style="justify-content: flex-start">
        <li style="flex: inherit"><ion-icon :icon="callOutline" style="vertical-align: middle"></ion-icon><span>电话商家</span></li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { folderOutline, chatboxEllipsesOutline, trashBinOutline, pricetagOutline, documentOutline, chevronForwardOutline, volumeMediumOutline, shieldCheckmarkOutline, callOutline } from "ionicons/icons";
import { cancleOrder, payOrder } from "@/api/order/order";
import alertService from "@/until/alert.service";

export default defineComponent({
  props: {
    status: {
      type: Number,
      defalut: 0,
    },
    timer: {
      type: String,
      defalut: 0,
    },
    orderId: {
      type: String,
      defalut: 0,
    },
  },
  setup(props, context) {
    const arrData = {
      pay: [
        { icon: folderOutline, text: "去支付", isTheme: true },
        { icon: pricetagOutline, text: "改订单信息", isTheme: true },
        { icon: trashBinOutline, text: "取消订单", isTheme: false },
      ],
      completed: [
        { icon: chatboxEllipsesOutline, text: "联系商家", isTheme: false },
        { icon: chatboxEllipsesOutline, text: "联系骑士", isTheme: false },
        { icon: documentOutline, text: "打赏骑士", isTheme: false },
      ],
    };

    const changeOrder = (item: any) => {
      //支付订单
      if (item.text === "去支付") {
        payOrder(props.orderId as string).then((res) => {
          if (res.status) {
            context.emit("changeOrder", res.data.status);
          }
          alertService.msgToast(res.message);
        });
      } else if (item.text === "取消订单") {
        cancleOrder(props.orderId as string).then((res) => {
          if (res.status) {
            context.emit("changeOrder", res.data.status);
          }
          alertService.msgToast(res.message);
        });
      }
    };

    return {
      arrData,
      chevronForwardOutline,
      volumeMediumOutline,
      shieldCheckmarkOutline,
      callOutline,
      changeOrder,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";

.order-status {
  padding: 0 10px;
  background: linear-gradient(to bottom, rgba(84, 181, 243, 1) 0%, rgba(84, 181, 243, 1) 50%, rgba(245, 245, 245, 1) 100%);
  .status-title {
    padding-top: 10px;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    ion-icon {
      margin-left: 10px;
      color: #9bd9f8;
      vertical-align: middle;
    }
  }
  .order-tips {
    margin-top: 10px;
    padding-left: 10px;
    font-size: 12px;
    line-height: 32px;
    color: #f09639;
    background-color: #fcf6e0;
    border-radius: 10px;
    ion-icon {
      margin-right: 5px;
      font-size: 16px;
      vertical-align: middle;
    }
  }

  .order-complete {
    margin-top: 10px;
    font-size: 13px;
    border-radius: 10px;
    overflow: hidden;
    .top {
      padding: 5px 10px;
      color: $themeColor;
      line-height: 28px;
      background-color: #f1fafe;
      ion-icon {
        vertical-align: middle;
        &:first-child {
          margin-right: 5px;
        }
        &:last-child {
          margin-left: 5px;
          color: #d1d2d3;
        }
      }
    }
    .center {
      padding: 10px;
      background: #ffff;
      div {
        padding-bottom: 20px;
        border-bottom: 0.5px solid #ebebeb;
        h6 {
          margin-bottom: 5px;
        }
        span {
          color: #9a9a9a;
        }
      }
    }
    .bottom {
      display: flex;
      padding: 0 5% 10px;
      font-size: 12px;
      justify-content: center;
      align-items: center;
      text-align: center;
      background-color: #fff;
      li {
        flex: 1;
        &.theme {
          color: $themeColor;
        }
        ion-icon {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
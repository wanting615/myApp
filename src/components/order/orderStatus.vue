<template>
  <div class="order-status">
    <div class="status-title">
      <span>待支付,剩余14:35分</span>
      <ion-icon :icon="chevronForwardOutline"></ion-icon>
    </div>
    <div class="order-tips">
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
        <div>
          <h5>请尽快支付</h5>
          <span>蓝骑士专送</span>
        </div>
      </div>
      <ul class="bottom">
        <li v-for="(item, index) in arrData.pay" :key="index" :class="{ theme: item.isTheme }">
          <ion-icon :icon="item.icon"></ion-icon>
          <div>{{ item.text }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { folderOutline, chatboxEllipsesOutline, trashBinOutline, pricetagOutline, documentOutline } from "ionicons/icons";

export default defineComponent({
  components: {},
  setup() {
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

    return {
      arrData,
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
    padding-top: 16px;
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
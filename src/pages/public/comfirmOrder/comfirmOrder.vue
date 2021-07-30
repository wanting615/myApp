<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>确认订单</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="user-info">
        <div class="tips"><ion-icon :icon="volumeMediumOutline" class="vertical"></ion-icon> <span class="vertical">温馨提示: 请适量点餐、避免浪费</span></div>
        <ul class="user-distribution">
          <li class="address">
            <span class="flex">上海市环贸iapm商场淮海中路999号1期19楼</span>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </li>
          <li class="username">万挺 17621841500</li>
          <li class="clear">
            <span class="flex">立即送出</span><span class="theme-color">大约18.23送到</span>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </li>
          <li class="clear">
            <span class="flex">支付方式</span><span class="theme-color">支付宝支付</span>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </li>
        </ul>
      </div>

      <div class="foods">
        <ul>
          <li class="gray-color">福荣烧腊(乌鲁木齐路)</li>
          <li class="food">
            <img src="https://elm.cangdu.org/img/1678178095423339.jpg" alt="" />
            <div class="flex">
              <div class="bold">叉烧拼油鸡饭</div>
              <span class="gray-color">x 1</span>
            </div>
            <span class="bold"><i>¥</i>36.8</span>
          </li>
          <li>
            <span class="flex">包装费</span><span class="bold"><i>¥</i>5</span>
          </li>
          <li>
            <span class="flex">配送费(蜂鸟快送)<i class="tip">?</i></span>
            <span class="bold"><i>¥</i>0</span>
          </li>
          <li class="reduction">
            <span class="flex">免配送费</span><span class="bold"><i>¥</i>3.2</span>
          </li>
          <li><span class="icon-font">减</span><span class="flex">店铺满65减21</span><span class="bold redColor">-<i>¥</i>21</span></li>
          <li><span class="icon-font">¥</span><span class="flex">红包抵用卷</span><span class="red-bag">未选红包 ></span></li>
          <li class="warn-tag"><span class="icon-font warn">!</span> 已为您选择满减,比折扣节省13</li>
          <li class="total-money">
            <span class="flex">优惠说明<i class="tip">?</i></span>
            <span>已优惠<span class="redColor">¥27.2</span></span>
            <span class="total">小计¥<span>55.6</span></span>
          </li>
        </ul>
      </div>

      <div class="settlement">
        <div class="shop-card"><span class="bold">本地代金劵 </span>可以叠加店铺满减、超级吃货红包等 <span class="tip">?</span></div>
        <div class="total-mount">
          <div class="mount">
            <span class="bold">合计: </span><span class="money"><i>¥</i>55.6</span>
            <div class="gray-color"><span class="redColor">已优惠¥27.2</span>,还差<span class="redColor">¥9.5</span>红包未选</div>
          </div>
          <div class="comfrim-btn">提交订单</div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { volumeMediumOutline, chevronForwardOutline } from "ionicons/icons";
import { useStore } from "@/store";
import { DeliveryAddressInfo } from "@/interface/addressInterface";

export default defineComponent({
  setup() {
    const data = reactive<{
      userAddress: Nullable<DeliveryAddressInfo>;
    }>({
      userAddress: null,
    });
    const store = useStore();
    data.userAddress = store.state.address.deliveryAddressInfo;
    console.log(data.userAddress);

    return {
      volumeMediumOutline,
      chevronForwardOutline,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./comfirmOrder.scss";
</style>
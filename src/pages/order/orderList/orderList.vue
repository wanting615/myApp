<template>
  <ion-page style="background: #f5f5f5">
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ul class="ul">
        <li class="active">全部</li>
        <li>待消费</li>
        <li>待评价</li>
        <li>退款</li>
      </ul>
      <ul class="order-list">
        <li class="order-item" v-for="item in data.orderList" :key="item.orderId">
          <router-link :to="'/shop/' + item.shopId">
            <div class="shop-info">
              <img :src="config.imagePath + item.imagePath" />
              <span class="title">
                {{ item.shopName }}
                <ion-icon :icon="chevronForwardOutline"></ion-icon>
              </span>
              <span
                class="status"
              >{{ item.status === 0 ? "待支付" : item.status === 1 ? "配送中" : item.status === 2 ? "已送达" : "已取消" }}</span>
            </div>
          </router-link>
          <div
            class="shop-active"
            v-if="item.activities && item.activities[0]"
          >{{ item.activities[0].description }}</div>
          <div class="food-info" @click="goOrderDetail(item.orderId)">
            <div class="food-list">
              <div class="food-item" v-for="food in item.foods" :key="food.item_id">
                <img :src="config.imagePath + food.imagePath" alt />
              </div>
            </div>
            <div class="food-name" v-if="item.foods.length === 1">{{ item.foods[0].name }}</div>
            <div class="food-price">
              <div>¥{{ item.payAmount }}</div>
              <span>共{{ foodsNumCom(item) }}件</span>
            </div>
          </div>
          <div class="buttons">
            <button v-if="item.status === 2">评价有礼</button>
            <button
              class="theme"
              @click="setOrder(item)"
            >{{ item.status === 0 ? "去支付" : item.status === 1 ? "确认收货" : "再来一单" }}</button>
          </div>
        </li>
      </ul>
      <ion-infinite-scroll threshold="100px" @ionInfinite="loadMore($event)" :disabled="isDisabled">
        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中"></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onIonViewWillEnter } from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import config from "@/config/config";
import alertService from "@/until/alert.service";
import { OrderInfo } from "@/interface/order";
import { reactive, ref } from "@vue/reactivity";
import { comfirmReceipt, getOrderList, payOrder } from "@/api/order/order";
import { onMounted } from "@vue/runtime-core";

const router = useRouter();

let page = 1;//当前页
const isDisabled = ref(false);//禁用下拉刷新
const data = reactive<{
  orderList: OrderInfo[];
}>({
  orderList: [],
});

//获取订单列表
const getOrders = (e?: CustomEvent, isLoadMore?: boolean) => {
  getOrderList(page).then((res) => {
    isLoadMore ? data.orderList.concat(res.data) : (data.orderList = res.data);
    e && (e.target as any).complete();
    if (page >= res.pages) {
      isDisabled.value = true;
    }
  });
};

onIonViewWillEnter(() => {
  getOrders();
});

onMounted(() => {
  getOrders();
})
//计算多少件食物
const foodsNumCom = (order: OrderInfo) => {
  return order.foods.reduce((sum, item) => sum + item.num, 0);
};
/**
 * 加载更多
 */
const loadMore = (e: CustomEvent) => {
  page++;
  getOrders(e, true);
};

/**
 * 订单详情
 */
const goOrderDetail = (orderId: string) => {
  router.push({
    path: `/orderDetail/${orderId}`,
  });
  return false;
};

/**
 * 支付or再来一单
 */
const setOrder = (item: OrderInfo) => {
  if (item.status === 0) {
    //支付订单
    payOrder(item.orderId).then((res) => {
      if (res.status) {
        item.status = res.data.status;
      }
      alertService.msgToast(res.message);
    });
  } else if (item.status === 1) {
    //确认收货
    comfirmReceipt(item.orderId).then((res) => {
      if (res.status) {
        item.status = res.data.status;
      }
      alertService.msgToast(res.message);
    });
  } else {
    router.push({
      path: `/shop/${item.shopId}`,
    });
  }
};
/**
 * 刷新
 */
const doRefresh = (e: CustomEvent) => {
  isDisabled.value = false;
  page = 1;
  getOrders(e);
};
</script>
<style lang="scss" scoped>
@import "./orderList.scss";
</style>
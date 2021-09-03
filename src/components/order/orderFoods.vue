<template>
  <div class="order-info" v-if="orderInfo">
    <div class="shop-info">
      1点点
      <ion-icon :icon="chevronForwardOutline"></ion-icon>
    </div>
    <ul class="food-list">
      <li v-for="item in orderInfo.foods" :key="item.item_id">
        <img :src="config.imagePath + item.image_path" />
        <div class="flex1">
          <div>{{ item.name }}</div>
          <span>x {{ item.num }}</span>
        </div>
        <span class="bold">¥{{ item.specfoods[0].price * item.num }}</span>
      </li>
      <li>
        <span>包装费</span>
        <span class="bold">¥{{ orderInfo.packingFee }}</span>
      </li>
      <li>
        <span class="icon-font">减</span>
        <span class="flex1">配送费(蜂鸟专送)</span>
        <div style="text-align: right">
          <div class="bold">¥{{ orderInfo.delivery.amount - orderInfo.delivery.discountAmount }}</div>
          <span class="delete">¥{{ orderInfo.delivery.amount }}</span>
        </div>
      </li>
      <li v-if="orderInfo.discountAmount">
        <span class="icon-font">减</span>
        <span class="flex1">店铺满减</span>
        <span class="bold red">-¥{{ orderInfo.discountAmount }}</span>
      </li>
      <li v-if="orderInfo.redBag.amount">
        <span class="icon-font">¥</span>
        <span class="flex1">红包/抵用卷</span>
        <span class="bold red">-¥{{ orderInfo.redBag.amount }}</span>
      </li>
      <li>
        <span></span>
        <span>
          总优惠
          <span class="red">¥{{ orderDiscount }}</span>
          <span class="bold">总计¥{{ orderInfo.payAmount }}</span>
        </span>
      </li>
    </ul>

    <ul class="info-orther">
      <li>
        <span>收货信息</span>
        <div style="text-align: right">
          <div>{{ orderInfo.addressName }}</div>
          <span>{{ orderInfo.userName }}{{ orderInfo.phone }}</span>
        </div>
      </li>
      <li>
        <span>备注</span>
        <span>{{ orderInfo.remarks ? orderInfo.remarks : "无" }}</span>
      </li>
      <li>
        <span>发票信息</span>
        <span v-if="orderInfo.invoice.header">{{ orderInfo.invoice.header }}</span>
        <span v-else>
          申请补开发票
          <ion-icon :icon="chevronForwardOutline"></ion-icon>
        </span>
      </li>
      <li>
        <span>订单号码</span>
        <span>
          {{ orderInfo.orderId }}
          <ion-icon :icon="copyOutline"></ion-icon>
        </span>
      </li>
      <li>
        <span>送达时间</span>
        <span>{{ orderInfo.delivery.timeType }}</span>
      </li>
      <li>
        <span>配送方式</span>
        <span>{{ orderInfo.delivery.name }}</span>
      </li>
      <li>
        <span>配送骑士</span>
        <span>{{ orderInfo.delivery.personName }}</span>
      </li>
      <li>
        <span>支付方式</span>
        <span>在线支付</span>
      </li>
      <li>
        <span>下单时间</span>
        <span>{{ useFormatTime("YYYY-mm-dd HH-MM", orderInfo.orderTime) }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { chevronForwardOutline, copyOutline } from "ionicons/icons";
import config from "@/config/config";
import { OrderInfo } from "@/interface/order";
import { useFormatTime } from "@/hooks/format";

const props = defineProps<{
  orderInfo: OrderInfo
}>();

//计算总优惠金额
const orderDiscount = computed(() => {
  // //总金额 = 食品总原价 + 打包费 + 配送费
  // const totalAMount = props.orderInfo.originalTotalAmount + props.orderInfo.packingFee + props.orderInfo.delivery.amount;
  //总优惠金额 = 满减 + 配送减免 + 红包 + 补贴
  const hongbao = props.orderInfo.redBag.amount || 0;
  const totalDisccount = props.orderInfo.discountAmount + props.orderInfo.delivery.discountAmount + hongbao + props.orderInfo.subsidyAmount;
  return totalDisccount;
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
.order-info {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  color: #191919;
  background-color: #fff;
  .shop-info {
    font-weight: 500;
    ion-icon {
      font-size: 20px;
    }
  }
  .food-list {
    padding: 10px 0;
    border-bottom: 0.5px solid $borderColor;
    li {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
      .flex1 {
        flex: 1;
        padding-left: 5px;
        span {
          font-size: 12px;
          color: #999;
        }
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      .icon-font {
        width: 16px;
        height: 16px;
        margin-top: 2px;
        font-size: 10px;
        line-height: 16px;
        color: #fff;
        text-align: center;
        background-color: $redColor;
        border-radius: 3px;
      }
    }
  }
  .info-orther {
    padding: 10px;
    li {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      font-size: 14px;
    }
  }
  ion-icon {
    vertical-align: middle;
    color: #ccc;
  }
}
</style>
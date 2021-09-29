<!--
 * @Date: 2021-05-20 15:47:44
 * @LastEditors: wanting
 * @LastEditTime: 2021-08-31 16:37:10
 * @FilePath: /myApp/src/components/shop-list/shoplist.componnent.vue
-->
<template>
  <div class="shop-list">
    <div v-for="item in shopsList" :key="item.id" class="shop-list-item" @click="goDetail(item.id)">
      <span class="is_premium" v-if="item.is_premium">品质</span>
      <img :src="config.imagePath + item.image_path" alt />
      <div class="shop-inner">
        <h6>
          <i class="ellipsis">{{ item.name }}</i>
          <span
            v-if="item.delivery_mode"
            :style="{
              color: '#' + item.delivery_mode.color,
              borderColor: '#' + item.delivery_mode.color,
            }"
          >{{ item.delivery_mode.text }}</span>
        </h6>
        <div class="shop-info">
          <span class="rating">{{ item.rating }}分</span>
          <span class="recent-order-num">月售{{ item.recent_order_num }}</span>
          <span class="distance">{{ item.distance }}</span>
          <span class="order-lead-time">{{ item.order_lead_time }}</span>
        </div>
        <div>{{ item.piecewise_agent_fee.tips }}</div>
        <div class="shop-tips">
          <span class="ellipsis">{{ item.promotion_info }}</span>
        </div>
        <div class="shop-activities ellipsis">
          <span v-for="ac in item.activities" :key="ac.id">{{ ac.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import config from "@/config/config";
import { ShopInfo } from "@/interface/shopInfoInterface";
import { useRouter } from "vue-router";
defineProps<{
  shopsList: ShopInfo[]
}>();
const router = useRouter();
const goDetail = (id: number) => {
  router.push({
    path: `/shop/${id}`,
  });
}
</script>
<style lang="scss" scoped>
@import "../../theme/theme.scss";
.shop-list {
  padding: 16px 16px 0 16px;
  background: $backgroundColor;
  .shop-list-item {
    position: relative;
    display: flex;
    padding: 10px;
    height: 125px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    .is_premium {
      position: absolute;
      top: 8px;
      left: 8px;
      font-size: 12px;
      background: #51b3f6;
      color: #fff;
      padding: 3px 7px;
      border-radius: 5px;
      z-index: 10;
    }
    img {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 95px;
      border-radius: 5px;
    }
    .shop-inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding-left: 105px;
      font-size: 12px;
      color: #828282;
      h6 {
        margin: 0;
        color: #333;
        font-size: 15px;
        font-weight: bolder;
        i {
          display: inline-block;
          width: 140px;
        }
        span {
          float: right;
          font-size: 12px;
          border-width: 1px;
          border-style: solid;
          padding: 0 5px;
          border-radius: 3px;
        }
      }
      .shop-info {
        span {
          float: left;
          margin-right: 5px;
          &:nth-child(3),
          &:nth-child(4) {
            float: right;
          }
        }
        .rating {
          color: #ec6d2d;
          font-weight: bolder;
          overflow: hidden;
        }
      }
      .shop-tips {
        height: 20px;
        span {
          width: 100%;
          display: inline-block;
          color: #ec792f;
          background-color: #fcefe2;
          padding: 0px 10px;
          border-radius: 3px;
        }
      }
      .shop-activities {
        line-height: 20px;
        span {
          color: #eb5941;
          border: 1px solid #f6cbc2;
          border-radius: 3px;
          padding: 0 5px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>

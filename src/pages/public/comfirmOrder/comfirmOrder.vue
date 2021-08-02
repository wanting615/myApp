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
            <span class="flex">{{ userAddress ? userAddress.addressName + userAddress.addressDetail : "请选择收货地址" }}</span>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </li>
          <li class="username" v-if="userAddress">{{ userAddress.name }} {{ userAddress.phone }}</li>
          <li class="clear">
            <span class="flex">立即送出</span><span class="theme-color" v-if="orderTime">大约{{ orderTime }}送到</span>
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
          <li class="food" v-for="item in foods" :key="item.item_id">
            <img src="https://elm.cangdu.org/img/1678178095423339.jpg" alt="" />
            <div class="flex">
              <div class="bold">{{ item.name }}</div>
              <span class="gray-color">x {{ item.num }}</span>
            </div>
            <span class="bold"><i>¥</i>{{ getFoodPrice(item) }}</span>
          </li>
          <li>
            <span class="flex">包装费</span><span class="bold"><i>¥</i>{{ packingFee }}</span>
          </li>
          <li>
            <span class="flex">配送费({{ deliveryInfo.type }})<i class="tip">?</i></span>
            <span class="bold"><i>¥</i>{{ deliveryInfo.price }}</span>
          </li>
          <li class="reduction">
            <span class="flex">免配送费</span><span class="bold"><i>¥</i>3.0</span>
          </li>
          <li v-if="activities">
            <span class="icon-font">减</span><span class="flex">店铺{{ activities.description }}</span
            ><span class="bold redColor">-¥{{ activities.reduceMoney }}</span>
          </li>
          <li><span class="icon-font">¥</span><span class="flex">红包抵用卷</span><span class="red-bag">未选红包 ></span></li>
          <li class="warn-tag"><span class="icon-font warn">!</span> 已为您选择满减,比折扣节省2</li>
          <li class="total-money">
            <span class="flex">优惠说明<i class="tip">?</i></span>
            <span
              >已优惠<span class="redColor">¥{{ getYouhui }}</span>
            </span>
            <span class="total"
              >小计¥<span>{{ realMoney }}</span></span
            >
          </li>
        </ul>
      </div>

      <div class="orther-info">
        <ul>
          <li>
            <span class="flex bold">备注</span>
            <span class="gray-color">点击可以选无接触配送</span>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </li>
          <li>
            <span class="flex bold">餐具份数</span>
            <span class="gray-color">必选</span>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </li>
          <li>
            <span class="flex bold">发票</span>
            <span class="gray-color">该店暂不支持线上发票,请电话联系商户</span>
          </li>
        </ul>
      </div>
    </ion-content>
    <ion-footer class="settlement">
      <!-- <div class="shop-card"><span class="bold">本地代金劵 </span>可以叠加店铺满减、超级吃货红包等 <span class="tip">?</span></div> -->
      <div class="total-mount">
        <div class="mount">
          <span class="bold">合计: </span><span class="money"><i>¥</i>{{ realMoney }}</span>
          <div class="gray-color">
            <span class="redColor">已优惠¥{{ getYouhui }}</span
            >,还差<span class="redColor">¥6</span>红包未选
          </div>
        </div>
        <div class="comfrim-btn">提交订单</div>
      </div>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { onIonViewDidEnter, IonFooter } from "@ionic/vue";
import { volumeMediumOutline, chevronForwardOutline } from "ionicons/icons";
import { useStore } from "@/store";
import { DeliveryAddressInfo } from "@/interface/addressInterface";
import { getUserAddressByTime } from "@/api/user/user";
import { useFormatTime } from "@/hooks/format";
import { Food } from "@/interface/foodsInterface";
import { getShopDetail } from "@/api/shop/shop";

export default defineComponent({
  components: {
    IonFooter,
  },
  setup() {
    const data = reactive<{
      shopLoaction: [number, number]; //商店位置 经纬度
      userAddress: Nullable<DeliveryAddressInfo>; //用户配送地址
      orderTime: string; //订单送货到达时间
      foods: Food[]; //食品清单
      foodsMoney: number; //食物总金额
      packingFee: number; //打包费用
      deliveryInfo: {
        //配送信息
        type: string; //配送方式
        price: number; //配送金额
      };
      activities: {
        description: string; //满减描述
        reduceMoney: number; //满减金额
      };
      redPacket: null; //红包
    }>({
      shopLoaction: [0, 0],
      userAddress: null,
      orderTime: "",
      foods: [],
      foodsMoney: 0,
      packingFee: 0,
      deliveryInfo: {
        type: "商家配送",
        price: 0,
      },
      activities: {
        description: "",
        reduceMoney: 0,
      },
      redPacket: null,
    });

    const store = useStore();
    data.foods = store.state.buyCart.foods;
    //计算食品价格和打包价格
    data.foods.forEach((food) => {
      data.foodsMoney += food.specfoods[0].price * food.num;
      data.packingFee += food.specfoods[0].packing_fee * food.num;
    });

    //查询是否有符合配送范围的配送地址
    const getUserDeviryAddress = (lat: number, lng: number) => {
      const from = lat + "," + lng;
      getUserAddressByTime(from).then((res) => {
        if (res.status) {
          res.data.forEach((item) => {
            console.log(item.orderLeadTime);
            if (item.orderLeadTime && parseInt(item.orderLeadTime) < 7200) {
              data.userAddress = item;
              const date = new Date();
              date.setSeconds(parseInt(item.orderLeadTime));
              data.orderTime = useFormatTime("HH.MM", date);
            }
          });
        }
      });
    };

    onIonViewDidEnter(() => {
      if (data.shopLoaction[0] && data.shopLoaction[1]) getUserDeviryAddress(data.shopLoaction[0], data.shopLoaction[1]);
    });

    onMounted(() => {
      getShopDetail(data.foods[0].restaurant_id).then((res) => {
        const activities = res.data.activities;
        if (activities && activities[0] && activities[0].name === "满减优惠") {
          data.activities.description = activities[0].description;
          data.activities.reduceMoney = data.foodsMoney >= 60 ? 8 : data.foodsMoney >= 30 ? 5 : 0;
        }
        data.deliveryInfo.price = res.data.float_delivery_fee;
        data.deliveryInfo.type = res.data.delivery_mode.text;

        data.shopLoaction = [res.data.location[1], res.data.location[0]];
        getUserDeviryAddress(data.shopLoaction[0], data.shopLoaction[1]);
      });
    });

    //获取食品列表金额
    const getFoodPrice = (item: Food) => {
      return item.specfoods[0].price * item.num;
    };

    //获取优惠金额
    const getYouhui = computed(() => {
      const packingFee = data.packingFee > 3 ? 3 : 0;
      return data.activities.reduceMoney + packingFee;
    });

    //获取优惠后总金额金额
    const realMoney = computed(() => {
      //食物总金额 + 打包金额 + 配送金额 -免配送金额(设置为3) -优惠金额 - 红包(暂未计算？？？？？？？)
      const packingFee = data.packingFee > 3 ? data.packingFee - 3 : 0; //默认优惠配送费3元
      return data.foodsMoney + packingFee + data.deliveryInfo.price - data.activities.reduceMoney;
    });

    return {
      volumeMediumOutline,
      chevronForwardOutline,
      ...toRefs(data),
      getFoodPrice,
      getYouhui,
      realMoney,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./comfirmOrder.scss";
</style>
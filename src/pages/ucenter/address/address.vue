<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ from === "comfirmOrder" ? "选择收货地址" : "收获地址" }}</ion-title>
        <ion-buttons slot="end" @click="goAddAddress">新增地址</ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item-sliding v-for="item in userAddresses" :key="item.id" class="sliding">
          <ion-item lines="none" @click="saveDeliveryAddress(item)">
            <div class="inner">
              <div class="address_detail">
                <span v-if="item.tag" class="tag">{{ item.tag }}</span>
                <span>{{ item.addressName }} {{ item.addressDetail }}</span>
              </div>
              <div class="user-info">
                <span>{{ item.name }}</span>
                <span>{{ item.phone }}</span>
              </div>
            </div>
            <ion-button slot="end" @click="updateAddress(item)">
              <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
            </ion-button>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option @click="delAddress(item)">删除</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <ion-list v-if="from === 'comfirmOrder'">
        <div class="title">以下地址超出配送范围</div>
        <ion-item-sliding v-for="item in unavailableAddress" :key="item.id" disabled="true">
          <ion-item lines="none" disabled="true">
            <div class="inner">
              <div class="address_detail">
                <span v-if="item.tag" class="tag">{{ item.tag }}</span>
                <span>{{ item.addressName }} {{ item.addressDetail }}</span>
              </div>
              <div class="user-info">
                <span>{{ item.name }}</span>
                <span>{{ item.phone }}</span>
              </div>
            </div>
            <ion-button slot="end" @click="updateAddress(item)">
              <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
            </ion-button>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option @click="delAddress(item)">删除</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonItem, IonList, IonItemSliding, IonItemOptions, IonItemOption, onIonViewWillEnter } from "@ionic/vue";
import { createOutline } from "ionicons/icons";
import { getUserAddress, getUserAddressByTime } from "@/api/user/user";
import { DeliveryAddressInfo } from "@/interface/addressInterface";
import { useRoute, useRouter } from "vue-router";
import { userDelAddress } from "@/hooks/address";
import { useStore } from "@/store";
import { onMounted } from "@vue/runtime-core";

const router = useRouter();
const route = useRoute();
const store = useStore();

const from = route.query.from; //从何页面过来

let userAddresses: Required<DeliveryAddressInfo>[] = [];//用户地址
const unavailableAddress: Required<DeliveryAddressInfo>[] = []; //超出配送距离的地址

//修改地址
const updateAddress = (item: Required<DeliveryAddressInfo>) => {
  store.commit("setAddAddressInfo", {
    addressName: item.addressName,
    lat: item.lat,
    lng: item.lng,
    city: item.city,
    adname: item.adname,
    address: item.address,
  });
  router.push({
    name: "/addAddress",
    params: {
      id: item.id,
      name: item.name,
      sex: item.sex,
      phone: item.phone,
      addressDetail: item.addressDetail,
      tag: item.tag,
    },
  });
};

const goAddAddress = () => {
  router.push({
    path: "/addAddress",
    query: route.query,
  });
};
//删除地址
const delAddress = async (item: Required<DeliveryAddressInfo>) => {
  const status = await userDelAddress(item.id);
  if (!status) return;
  userAddresses.splice(
    userAddresses.findIndex((i) => i.id === item.id),
    1
  );
};

//选择收货地址
const saveDeliveryAddress = (item: DeliveryAddressInfo) => {
  if (from === "comfirmOrder") {
    store.commit("setDeliveryAddressInfo", item);
    router.back();
  }
};

onMounted(async () => {
  if (from === "comfirmOrder") {
    const from = route.query.lat + "," + route.query.lng;
    const addresses = (await getUserAddressByTime(from)).data as unknown as Required<DeliveryAddressInfo>[]; //带所需到达时间
    addresses.forEach((item) => {
      item.orderLeadTime && (parseInt(item.orderLeadTime) > 7200 ? unavailableAddress.push(item) : userAddresses.push(item));
    });
  } else {
    userAddresses = (await getUserAddress()).data as unknown as Required<DeliveryAddressInfo>[];
  }
})

onIonViewWillEnter(async () => {
  if (from === "comfirmOrder") {
    const from = route.query.lat + "," + route.query.lng;
    const addresses = (await getUserAddressByTime(from)).data as unknown as Required<DeliveryAddressInfo>[]; //带所需到达时间
    addresses.forEach((item) => {
      item.orderLeadTime && (parseInt(item.orderLeadTime) > 7200 ? unavailableAddress.push(item) : userAddresses.push(item));
    });
  } else {
    userAddresses = (await getUserAddress()).data as unknown as Required<DeliveryAddressInfo>[];
  }
});
</script>
<style lang="scss" scoped>
@import "../../../theme/theme.scss";
ion-content {
  --background: #f5f5f5;
  ion-list {
    margin-bottom: 10px;
    ion-item {
      font-size: 14px;
      color: #333;
      .inner {
        width: 100%;
        padding: 10px 0;
        border-bottom: 0.5px solid #eee;
      }
      .address_detail {
        margin-bottom: 5px;
        color: #333;
        font-weight: bold;
        .tag {
          padding: 2px 8px;
          margin-right: 4px;
          font-size: 12px;
          font-weight: 400;
          color: $themeColor;
          background-color: #ebf6fd;
        }
      }
      .user-info {
        font-size: 13px;
        color: #999;
        span:first-child {
          margin-right: 10px;
        }
      }
      ion-icon {
        color: #bbb;
      }
    }
    ion-item-sliding.sliding {
      background: red;
      ion-item-option {
        width: 55px;
        font-size: 14px;
        background: red;
      }
    }
    .title {
      padding: 10px 16px;
      color: #333;
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
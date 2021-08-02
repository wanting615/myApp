<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>收获地址</ion-title>
        <ion-buttons slot="end"><router-link to="/addAddress">新增地址</router-link></ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item-sliding v-for="item in userAddresses" :key="item.id">
          <ion-item lines="none">
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

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { IonItem, IonList, IonItemSliding, IonItemOptions, IonItemOption, onIonViewWillEnter } from "@ionic/vue";
import { createOutline } from "ionicons/icons";
import { getUserAddress } from "@/api/user/user";
import { DeliveryAddressInfo } from "@/interface/addressInterface";
import { useRouter } from "vue-router";
import { userDelAddress } from "@/hooks/address";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  },
  setup() {
    const data = reactive<{
      userAddresses: DeliveryAddressInfo[];
    }>({
      userAddresses: [],
    });

    //修改地址
    const router = useRouter();
    const store = useStore();
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
        name: "addAddress",
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

    //删除地址
    const delAddress = async (item: Required<DeliveryAddressInfo>) => {
      const status = await userDelAddress(item.id);
      if (!status) return;
      data.userAddresses.splice(
        data.userAddresses.findIndex((i) => i.id === item.id),
        1
      );
    };

    onIonViewWillEnter(async () => {
      data.userAddresses = (await getUserAddress()).data;
    });
    return {
      ...toRefs(data),
      createOutline,
      delAddress,
      updateAddress,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../../theme/theme.scss";
ion-content {
  --background: #f5f5f5;
  ion-list {
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
    ion-item-sliding {
      background: red;
      ion-item-option {
        width: 55px;
        font-size: 14px;
        background: red;
      }
    }
  }
}
</style>
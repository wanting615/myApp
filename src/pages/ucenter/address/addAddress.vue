<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>新增地址</ion-title>
        <ion-buttons slot="end" class="trash" @click="delAddress">
          <ion-icon :icon="trashOutline"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item lines="none">
          <ion-label>联系人</ion-label>
          <ion-input type="text" placeholder="姓名" v-model="userAddress.name" clearInput></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label></ion-label>
          <div class="choose-sex" @click="selectSex($event)">
            <span data-sex="先生" :class="{ active: userAddress.sex === '先生' }">先生</span>
            <span data-sex="女士" :class="{ active: userAddress.sex === '女士' }">女士</span>
          </div>
        </ion-item>
        <ion-item lines="none">
          <ion-label>电话</ion-label>
          <ion-input
            type="tel"
            placeholder="手机号码"
            v-model="userAddress.phone"
            clearInput
            maxlength="11"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>地址</ion-label>
          <ion-input type="text" placeholder="选择收获地址" v-model="addressName" @click="goMap" readonly></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>门牌号</ion-label>
          <ion-input
            type="text"
            placeholder="例: 5号楼203室"
            v-model="userAddress.addressDetail"
            clearInput
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>标签</ion-label>
          <div class="choose-tag" @click="selectTag($event)">
            <span data-tag="家" :class="{ active: userAddress.tag === '家' }">家</span>
            <span data-tag="公司" :class="{ active: userAddress.tag === '公司' }">公司</span>
            <span data-tag="学校" :class="{ active: userAddress.tag === '学校' }">学校</span>
          </div>
        </ion-item>
      </ion-list>
      <div class="comfirm-btn" @click="commitAddress">确定</div>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from "vue";
import { IonItem, IonList, IonLabel, IonInput } from "@ionic/vue";
import { trashOutline } from "ionicons/icons";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import validatorService from "@/until/validator.servie";
import { AddAddressInfo, DeliveryAddressInfo } from "@/interface/addressInterface";
import { addUserAddress } from "@/api/user/user";
import alertService from "@/until/alert.service";
import { userDelAddress } from "@/hooks/address";

let addressInfo: Nullable<AddAddressInfo> = null; //地址信息
const router = useRouter();
const store = useStore();
const route = useRoute();

const userAddress: Omit<DeliveryAddressInfo, keyof AddAddressInfo> = {
  name: "",
  sex: "",
  phone: "",
  addressDetail: "",
  tag: "",
};
//选择地址
const addressName = computed(() => {
  addressInfo = store.state.address.addAddressInfo;
  return store.state.address.addAddressInfo?.addressName;
});
//选择性别
const selectSex = (event: Event) => {
  const target = event.target as HTMLElement;
  userAddress.sex = target.dataset["sex"];
};
//选择标签
const selectTag = (event: Event) => {
  const target = event.target as HTMLElement;
  userAddress.tag = target.dataset["tag"];
};
//提交
const commitAddress = () => {
  if (!validatorService.checkNotEmpty(userAddress.name, "请输入姓名")) return;
  if (!validatorService.checkUserPhone(userAddress.phone)) return;
  if (!validatorService.checkNotEmpty<Nullable<AddAddressInfo>>(addressInfo, "请选择地址")) return;
  if (!validatorService.checkNotEmpty<string>(userAddress.addressDetail, "请输入门牌号")) return;
  const userAddressInfo = Object.assign(userAddress, addressInfo);
  addUserAddress(userAddressInfo).then((res) => {
    alertService.msgToast(res.message);
    if (res.status) {
      router.back();
    }
  });
};
//跳转新增收货地址
const goMap = () => {
  const location = route.query.lat ? route.query : store.state.address.location;
  router.push({
    path: "/map",
    query: {
      lat: location.lat,
      lng: location.lng,
    },
  });
};

//删除地址
const delAddress = async () => {
  if (!userAddress.id) return;
  const status = await userDelAddress(userAddress.id);
  if (status) router.back();
};
onMounted(() => {
  const params = route.params as unknown as DeliveryAddressInfo;
  if (params.id) {
    userAddress.id = params.id;
    userAddress.name = params.name;
    userAddress.sex = params.sex;
    userAddress.phone = params.phone;
    userAddress.addressDetail = params.addressDetail;
    userAddress.tag = params.tag;
  }
});

onUnmounted(() => {
  store.commit("setAddAddressInfo", null);
});
</script>
<style lang="scss" scoped>
@import "../../../theme/theme.scss";
ion-toolbar {
  .trash {
    padding: 0 10px;
  }
}
ion-content {
  --background: #f5f5f5;
  ion-list {
    padding-left: 16px;
    ion-item {
      font-size: 14px;
      --padding-start: 0;
      border-bottom: 0.5px solid $borderColor;
      &:first-child {
        border: none;
        ion-input {
          border-bottom: 0.5px solid $borderColor;
        }
      }
      ion-label {
        width: 50px;
        font-weight: bolder;
        flex: inherit;
      }
      .choose-sex,
      .choose-tag {
        flex: 1;
        span {
          padding: 4px 10px;
          margin-right: 10px;
          font-size: 12px;
          border: 1px solid #d9d9d9;
          border-radius: 3px;
          &.active {
            color: #54b5f3;
            background-color: #ebf6fd;
            border-color: #54b5f3;
          }
        }
      }
    }
  }
  .comfirm-btn {
    width: 90%;
    margin: 20px auto;
    line-height: 50px;
    font-weight: bold;
    color: #fff;
    background-color: $themeColor;
    text-align: center;
    border-radius: 5px;
  }
}
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons @click="didDismiss(null)">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-buttons>
        <ion-title>选择收货地址</ion-title>
        <ion-buttons slot="end" router-link="/addAddress">新增地址</ion-buttons>
      </ion-toolbar>
      <div class="search-area">
        <div class="search-input">
          <span>上海市</span>
          <ion-icon :icon="chevronDownOutline"></ion-icon>
          <ion-icon :icon="searchOutline" class="search-icon"></ion-icon>
          <ion-input type="text" placeholder="请输入您的收货地址" @click="showSeachModal" readonly></ion-input>
        </div>
      </div>
    </ion-header>
    <ion-content fullscreen="true">
      <div class="scroll-content">
        <div class="location">
          <div class="title">当前定位</div>
          <div class="location-name ellipsis">
            <ion-icon :icon="locationOutline"></ion-icon>
            <span>上海市徐家汇上海市徐汇区人民政府(漕溪北路西)</span>
            <span class="refresn">重新定位</span>
          </div>
        </div>
        <div class="address-list list" v-if="userAddressData.userAddresses.length > 0">
          <div class="title">
            收货地址
            <span class="fr">
              <router-link to="/address">管理</router-link>
            </span>
          </div>
          <ion-list>
            <ion-item
              lines="none"
              v-for="item in userAddressData.userAddresses"
              :key="item.id"
              @click="didDismiss(item)"
            >
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
            </ion-item>
          </ion-list>
        </div>
        <div class="search-list list">
          <div class="title">附近地址</div>
          <ion-list>
            <ion-item
              lines="none"
              v-for="item in data.searchList"
              :key="item.id"
              @click="didDismiss(item)"
            >
              <div class="inner">
                <div class="address_detail">
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from "vue";
import { IonInput, IonList, IonItem } from "@ionic/vue";
import { closeOutline, chevronDownOutline, searchOutline, locationOutline } from "ionicons/icons";
import { DeliveryAddressInfo } from "@/interface/addressInterface";
import { getUserAddress } from "@/api/user/user";
import { useRoute, useRouter } from "vue-router";
import { useMap } from "@/hooks/useMap";
import { useStore } from "@/store";

const emit = defineEmits(['closeModal']);
const store = useStore();
const route = useRoute();
const router = useRouter();
const userAddressData = reactive<{
  userAddresses: DeliveryAddressInfo[];
}>({
  userAddresses: [],
});

const { data } = useMap(false, store.state.address.location.lat, store.state.address.location.lng); //关键字搜索函数
const didDismiss = (item: any) => {
  store.commit("setDeliveryAddressInfo", item)
  if (item) {
    emit("closeModal", {
      lng: item.lng || item.location.lng,
      lat: item.lat || item.location.lat,
      addressName: item.addressName || item.name,
    });
  } else {
    emit("closeModal");
  }
};

const showSeachModal = () => {
  router.push("/map");
};
const userAddress = () => {
  getUserAddress().then((res) => {
    userAddressData.userAddresses = res.data;
  });
};

watch(
  () => route.path,
  (to) => {
    if (to === "/tabs/home") {
      userAddress();
    }
  }
);
onMounted(() => {
  userAddress();
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
ion-toolbar {
  ion-title {
    font-weight: 500;
  }
  ion-icon {
    padding: 0 5px;
    color: #000;
    font-size: 28px;
  }
}
.search-area {
  width: 100%;
  padding: 10px;
  background-color: #fff;
  .search-input {
    display: flex;
    align-items: center;
    padding: 0 18px;
    line-height: 40px;
    font-size: 14px;
    color: #333;
    background-color: #eaeaea;
    border-radius: 18px;
    ion-input {
      --padding-top: 0;
      --padding-bottom: 0;
    }
    ion-icon {
      margin-left: 10px;
      color: #c5c5c5;
      vertical-align: middle;
      &.search-icon {
        color: #757755;
        font-size: 20px;
        padding-left: 10px;
        border-left: 1px solid #d3d3d3;
      }
    }
  }
}
ion-content {
  --background: #f5f5f5;
  font-size: 14px;
  .scroll-content {
    overflow-y: scroll;
  }
  .title {
    color: #999;
  }

  .location {
    padding: 10px 15px;
    background-color: #fff;
    .location-name {
      position: relative;
      padding: 8px 65px 8px 0;
      font-size: 15px;
      font-weight: 500;
      .refresn {
        position: absolute;
        right: 0;
        top: 8px;
        color: $themeColor;
      }
    }
  }

  .list {
    padding: 10px 15px 0 15px;
    margin-top: 10px;
    background-color: #fff;
    .title span {
      color: $themeColor;
    }
    ion-item {
      font-size: 14px;
      color: #333;
      .inner {
        width: 100%;
        padding: 10px 0;
        border-bottom: 0.5px solid #eee;
      }
      &:last-child {
        .inner {
          border-bottom: none;
        }
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
          border-radius: 3px;
        }
      }
      .user-info {
        font-size: 13px;
        color: #999;
        span:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>确认收货地址</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="search-area">
        <div class="search-input">
          <span>上海市</span>
          <ion-icon :icon="chevronDownOutline"></ion-icon>
          <ion-icon :icon="searchOutline" class="search-icon"></ion-icon>
          <!-- <input type="text" placeholder="请输入您的收货地址" @click="showSeachModal" /> -->
          <ion-input type="text" placeholder="请输入您的收货地址" @click="showSeachModal" readonly></ion-input>
        </div>
      </div>
      <img src="assets/icon/marker.png" class="marker" />
      <div id="mapContainer"></div>
      <div class="search-list">
        <div
          class="list-item"
          v-for="(item, index) in data.searchList"
          :key="item.id"
          @click="chooseAddress(item)"
        >
          <img v-if="index === 0" src="assets/icon/marker.png" />
          <div v-if="index !== 0" class="circle"></div>
          <div class="item-name">{{ item.name }}</div>
          <div class="item-address">{{ item.cityname }}{{ item.adname }}{{ item.address }}</div>
        </div>
      </div>
      <Modal :isOpen="isOpenRef" class="mapModal" height="100%">
        <MapModal @keySearch="keySearch" :modalList="data.modalList" @closeModal="closeModal"></MapModal>
      </Modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IonInput } from "@ionic/vue";
import { useMap } from "@/hooks/useMap";
import { chevronDownOutline, searchOutline } from "ionicons/icons";
import Modal from "@/components/common/modal/modal.vue";
import MapModal from "./mapModal.vue";
import { Pois } from "@/interface/addressInterface";
import { useStore } from "@/store";


const location = useRoute().query;
const { keySearch, data } = useMap(true, Number(location.lat as string), Number(location.lng as string)); //关键字搜索函数
const isOpenRef = ref(false); //控制搜索弹窗
const showSeachModal = () => {
  //展示关键字搜索弹窗
  isOpenRef.value = true;
};
//关闭弹窗
const closeModal = () => {
  isOpenRef.value = false;
};
//选择地址后、存储返回
const router = useRouter();
const store = useStore();
const chooseAddress = (item: Pois) => {
  store.commit("setAddAddressInfo", {
    addressName: item.name,
    lat: item.location.lat,
    lng: item.location.lng,
    city: item.cityname,
    adname: item.adname,
    address: item.address,
  });
  router.back();
};
</script>
<style lang="scss" scoped>
ion-content {
  .search-area {
    position: absolute;
    width: 100%;
    top: 0;
    padding: 5px;
    background-color: #fff;
    z-index: 100;
    .search-input {
      display: flex;
      align-items: center;
      padding: 0 18px;
      line-height: 35px;
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
  .marker {
    position: absolute;
    width: 20px;
    top: 25%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 100;
  }
  #mapContainer {
    height: 50%;
  }
  .search-list {
    padding-left: 20px;
    height: 50%;
    overflow-y: scroll;
    .list-item {
      position: relative;
      padding: 5px;
      padding-left: 30px;
      border-bottom: 0.5px solid #eee;
      &:first-child {
        .item-name {
          color: #4993f7;
        }
      }
      img {
        position: absolute;
        width: 12px;
        left: 0;
        top: 20px;
      }
      .circle {
        position: absolute;
        width: 12px;
        height: 12px;
        left: 0;
        top: 24px;
        border: 3px solid #999;
        border-radius: 50%;
      }
      .item-name {
        margin-bottom: 5px;
        color: #333;
        font-weight: 500;
        font-size: 16px;
      }
      .item-address {
        font-size: 14px;
        color: #9a9a9a;
      }
    }
  }
}
</style>
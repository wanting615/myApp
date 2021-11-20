<template>
  <div class="search-modal">
    <div class="search-area">
      <div class="search-input">
        <span>上海市</span>
        <ion-icon :icon="chevronDownOutline"></ion-icon>
        <ion-icon :icon="searchOutline" class="search-icon"></ion-icon>
        <ion-input type="text" placeholder="请输入您的收货地址" v-model="searchKey" @ionChange="changeInput"></ion-input>
      </div>
      <span class="cancle" @click="closeModal">取消</span>
    </div>
    <div class="search-history" v-if="modalList.length === 0">
      <div class="history-title">历史搜索</div>
      <ul>
        <li>金科路3923号4号楼</li>
        <li>星峰企业园9号楼</li>
        <li>三亚海棠湾红树林度假酒店</li>
        <li>红房子产科医院杨浦区</li>
      </ul>
    </div>
    <div class="model-list" v-else>
      <div class="list-item" v-for="item in modalList" :key="item.id" @click="chooseAddress(item)">
        <div class="item-name">{{ item.name }}</div>
        <div>{{ item.cityname }}{{ item.adname }}{{ item.address }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref } from "vue";
import { IonInput } from "@ionic/vue";
import { chevronDownOutline, searchOutline } from "ionicons/icons";
import { Pois } from "@/interface/addressInterface";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
defineProps<{
  modalList: Pois[]
}>()
const emit = defineEmits(['keySearch', 'closeModal'])
const searchKey = ref(""); //搜索关键字
//监听关键字修改
const changeInput = () => {
  emit("keySearch", unref(searchKey));
};
//关闭弹窗
const closeModal = () => {
  emit("closeModal");
};
//选择地址-存储-返回
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
.search-modal {
  padding-top: var(--ion-safe-area-top, 0);
  .search-area {
    display: flex;
    padding: 5px;
    padding-top: 45px;
    font-size: 12px;
    background-color: #fff;
    z-index: 100;
    .search-input {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 0 18px;
      height: 35px;
      color: #333;
      background-color: #eaeaea;
      border-radius: 18px;
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
    .cancle {
      line-height: 35px;
      color: #333;
      padding: 0 10px;
    }
  }
  .search-history {
    padding: 5px 10px;
    font-size: 12px;
    .history-title {
      padding-bottom: 20px;
      font-size: 14px;
    }
    li {
      display: inline-block;
      padding: 10px 15px;
      margin: 0 10px 10px 0;
      color: #666;
      background-color: #f5f5f5;
      border-radius: 3px;
    }
  }
  .model-list {
    padding: 5px 16px;
    .list-item {
      padding: 5px 0;
      color: #666;
      font-size: 12px;
      border-bottom: 0.5px solid #eee;
      .item-name {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }
    }
  }
}
</style>
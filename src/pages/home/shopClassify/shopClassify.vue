<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <div class="inner">
          <ion-icon :icon="chevronBackOutline" @click="back"></ion-icon>
          <div class="center">
            <span>美食外卖</span>
            <ion-input placeholder="查找门店"></ion-input>
          </div>
          <ion-icon :src="useIcons('shopCart')"></ion-icon>
        </div>
        <ul class="clear classifies">
          <li>精选</li>
          <li v-for="item in dataMap.shopClassifies" :key="item.id">{{ item.title }}</li>
        </ul>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ul class="screen">
        <li v-for="item in classifyTitles" :key="item.type" @click="openPopover($event, item)">
          <span>{{ item.name }}</span>
          <ion-icon :icon="caretDownOutline"></ion-icon>
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { IonInput, popoverController } from "@ionic/vue";
import { chevronBackOutline, caretDownOutline } from "ionicons/icons";
import { useIcons } from "@/hooks/useIcons";
import { getCateGoryList, getShopsClassify } from "@/api/shop/shop";
import { ShopClassify, FoodClassify } from "@/interface/shopClassify";
import { ClassifyTitle, classifyTitles } from "@/config/shopClassify";
import popoverComponent from "./popoverComponent.vue";

const router = useRouter();
const dataMap = reactive<{
  shopClassifies: ShopClassify[]
}>({
  shopClassifies: []
})

const back = () => {
  router.back();
}

getShopsClassify().then((res) => {
  if (res.status) {
    dataMap.shopClassifies = res.data;
  }
});

//食品分类
let foodClassify: FoodClassify;

onMounted(() => {
  getCateGoryList().then(res => {
    foodClassify = res.data
  })
})

const openPopover = async (ev: Event, item: ClassifyTitle) => {
  const popover = await popoverController.create({
    component: popoverComponent,
    cssClass: "classify-popover",
    event: ev,
    translucent: true,
    componentProps: {
      type: item.type,
      foodClassify: item.type === 2 ? foodClassify : undefined
    }
  })
  await popover.present();
  const data = await popover.onDidDismiss();
  console.log(data)
}
</script>
<style lang="scss" scoped>
@import "./shopClassify.scss";
</style>
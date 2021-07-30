<template>
  <div class="list">
    <div class="item" v-for="item in recommendList" :key="item.id">
      <div class="shop-name">
        <img :src="config.imagePath + item.shopInfo.image_path" class="vertical" />
        <span class="vip bolder" v-if="item.shopInfo.is_premium">v</span>
        <span>{{ item.shopInfo.name }}</span>
        <div class="fr"><ion-icon src="assets/svg/follow.svg"></ion-icon><span class="vertical">关注</span></div>
      </div>

      <VideoCom :config="videoConfig" :url="item.vedioPath"></VideoCom>

      <div class="shop-info">
        <div class="shop-img"><img :src="config.imagePath + item.shopInfo.image_path" /></div>
        <div class="shop-item">
          <div class="item-name bolder">
            {{ item.shopInfo.name }} <span>{{ item.shopInfo.order_lead_time }}分钟送达</span>
          </div>
          <div class="active">
            <span class="shop-scroe">{{ item.shopInfo.rating }}分</span>
            <span v-if="item.shopInfo.activities && item.shopInfo.activities.length > 0">{{ item.shopInfo.activities[0].description }}</span>
            <span class="flep">10元无门槛</span>
          </div>
        </div>
        <ion-icon :src="chevronForwardOutline"></ion-icon>
      </div>
      <div class="tips">{{ item.tips }}</div>
      <div class="comments">
        <div @click="praise(item)">
          <ion-icon src="assets/svg/praise.svg"></ion-icon><span>{{ item.praises }}</span>
        </div>
        <div @click="repay(item)">
          <ion-icon :src="chatbubbleEllipsesOutline"></ion-icon><span>{{ item.replys }}</span>
        </div>
        <div><ion-icon :src="arrowRedoOutline"></ion-icon><span>分享</span></div>
        <div><ion-icon :src="ellipsisVerticalOutline"></ion-icon></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { modalController } from "@ionic/vue";
import config from "@/config/config";
import { RecommendItem } from "@/interface/recommend";
import { getFindList, praiseFind } from "@/api/find/recommend";
import { VideoConfigOptions } from "../common/video/videoCom";
import VideoCom from "@/components/common/video/videoCom.vue";
import RecommendReply from "./recommendReply.vue";
import { chatbubbleEllipsesOutline, arrowRedoOutline, ellipsisVerticalOutline, chevronForwardOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    VideoCom,
  },
  setup() {
    const videoConfig = reactive<VideoConfigOptions>({
      controls: {
        volume: true,
        progressBar: false,
        progressTime: false,
        fullscreen: false,
      },
    });
    const data = reactive<{
      recommendList: RecommendItem[];
    }>({
      recommendList: [],
    });
    // 点赞
    const praise = (item: RecommendItem) => {
      praiseFind(item.id).then(() => {
        item.praises++;
      });
    };
    //回复
    const repay = async (item: RecommendItem) => {
      const modal = await modalController.create({
        component: RecommendReply,
        cssClass: "recommend-reply",
        componentProps: {
          id: item.id,
          name: item.shopInfo.name,
          orderLeadTime: item.shopInfo.order_lead_time,
          replys: item.replys,
          replaysDetails: item.replaysDetails,
        },
      });
      modal.present();
    };

    onMounted(() => {
      getFindList(1).then((result) => {
        data.recommendList = result.data;
      });
    });

    return {
      ...toRefs(data),
      videoConfig,
      config,
      chatbubbleEllipsesOutline,
      arrowRedoOutline,
      ellipsisVerticalOutline,
      chevronForwardOutline,
      praise,
      repay,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./recommend.scss";
</style>

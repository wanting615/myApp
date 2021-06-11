<!--
 * @Date: 2021-05-19 17:44:40
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-20 17:50:33
 * @FilePath: /elm-app/src/pages/home/componnet/nav.component.vue
-->
<template>
  <nav class="nav">
    <IonSlides>
      <IonSlide>
        <template v-for="(item, i) in shopClassify">
          <div class="slide-item" v-if="i < 10" :key="item.id">
            <img :src="item.image_url" alt="" />
            <div class="title">{{ item.title }}</div>
          </div>
        </template>
      </IonSlide>
      <IonSlide>
        <template v-for="(item, i) in shopClassify">
          <div class="slide-item" v-if="i > 9" :key="item.id">
            <img :src="item.image_url" alt="" />
            <div class="title">{{ item.title }}</div>
          </div>
        </template>
      </IonSlide>
    </IonSlides>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { IonSlides, IonSlide } from "@ionic/vue";
import { getShopsClassify } from "@/api/shop/shop";
import { ShopClassify } from "@/interface/shopInfoInterface";
import config from "@/config/config";
export default defineComponent({
  name: "NavComponnet",
  components: {
    IonSlides,
    IonSlide,
  },

  setup() {
    const dataMap = reactive({
      shopClassify: Array<ShopClassify>(),
      getData() {
        getShopsClassify().then((res) => {
          if (res.status) {
            this.shopClassify = res.data;
          }
        });
      },
    });
    onMounted(() => {
      dataMap.getData();
    });
    return {
      IonSlides,
      IonSlide,
      config,
      ...toRefs(dataMap),
    };
  },
});
</script>
<style lang="scss" scoped>
.nav {
  padding: 10px 0;
  background: #f5f5f5;
  .swiper-slide {
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    align-items: center;
    justify-content: left;
    .slide-item {
      width: 20%;
      padding-bottom: 10px;
      text-align: center;
      img {
        width: 65%;
      }
      .title {
        font-size: 12px;
      }
    }
  }
}
</style>



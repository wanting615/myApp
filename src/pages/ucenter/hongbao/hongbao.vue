<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>红包卡劵</ion-title>
        <ion-buttons slot="end" router-link="/exchangeHongbao">兑换红包</ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <BlankComponent v-if="hongbaos.length === 0">
        <div>暂无红包哦,可以点击右上角兑换红包</div>
      </BlankComponent>
      <ul v-if="hongbaos.length > 0">
        <li v-for="item in hongbaos" :key="item.id">
          <div class="hongbao-info">
            <ion-icon src="assets/svg/home.svg" />
            <div class="inner">
              <h5>{{ item.name }}</h5>
              <span class="gray">{{ item.begin_date }}至{{ item.end_date }}</span>
            </div>
            <div class="amount">
              <div class="red">
                <i class="vertical">¥</i><span>{{ item.amount }}</span>
              </div>
              <span class="gray">满{{ item.sum_condition }}可用</span>
            </div>
          </div>
          <div class="use-way">
            <div class="use-header">
              <div class="fl" @click="showDetail(item)">限外卖订单使用<ion-icon :icon="chevronDownOutline"></ion-icon></div>
              <div class="fr use-btn" @click="useHongbao">去使用</div>
            </div>
            <div class="user-content" v-show="item.showKey">
              <div>{{ item.description_map.online_paid_only }}</div>
              <div>{{ item.description_map.phone }}</div>
              <div>{{ item.description_map.sum_condition }}</div>
              <div>{{ item.description_map.validity_periods }}</div>
            </div>
          </div>
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { chevronDownOutline } from "ionicons/icons";
import BlankComponent from "@/components/common/blank/blank.vue";
import { getHongbaos } from "@/api/user/user";
import { Hongbao } from "@/interface/hongbaos";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    BlankComponent,
  },
  setup() {
    const router = useRouter();
    const data = reactive<{
      hongbaos: Hongbao[];
    }>({
      hongbaos: [],
    });

    onIonViewWillEnter(() => {
      getHongbaos(0).then((res) => {
        if (res.status) data.hongbaos = res.data;
      });
    });

    const showDetail = (item: Hongbao) => {
      item.showKey = !item.showKey;
    };
    const useHongbao = () => {
      router.back();
    };
    return {
      ...toRefs(data),
      showDetail,
      useHongbao,
      chevronDownOutline,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
.gray {
  color: $greyColor;
}
ion-content {
  --background: #f7f8f9;
  --padding-start: 16px;
  --padding-end: 16px;
  li {
    margin-top: 12px;
    padding: 16px;
    background-color: #fff;
    border-radius: 10px;
    .hongbao-info {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 0.5px dashed $backgroundColor;
      ion-icon {
        width: 25px;
        height: 25px;
        padding: 10px;
        color: #fff;
        background-color: $themeColor;
        border-radius: 6px;
      }
      .inner {
        display: flex;
        flex: 1;
        flex-flow: column;
        padding-left: 10px;
        h5 {
          margin-top: 0;
        }
        span {
          font-size: 12px;
        }
      }
      .amount {
        font-size: 14px;
        text-align: center;
        .red {
          color: $redColor;
          span {
            font-size: 24px;
            font-weight: bold;
            vertical-align: middle;
          }
        }
      }
    }
    .use-way {
      padding-top: 15px;
      color: #7f7f7f;
      font-size: 13px;
      .use-header {
        overflow: hidden;
        line-height: 28px;
        ion-icon {
          color: #7f7f7f;
          vertical-align: middle;
        }
        .use-btn {
          width: 68px;
          height: 28px;
          color: #fff;
          background-color: $redColor;
          text-align: center;
          border-radius: 17px;
        }
      }
    }
  }
}
</style>
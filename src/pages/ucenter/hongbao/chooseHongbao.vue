<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>选择红包/抵用卷</ion-title>
        <ion-buttons slot="end" router-link="/exchangeHongbao">兑换红包</ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <BlankComponent v-if="hongbaos.length === 0">
        <div>暂无红包哦,可以点击右上角兑换红包</div>
      </BlankComponent>
      <ul v-if="hongbaos.length > 0">
        <div class="ul-title">饿了么红包 <span>可选1张</span></div>
        <ion-item v-for="item in canUseHongbaos" :key="item.id" lines="none">
          <ion-label>
            <div class="hongbao-info">
              <div class="amount">
                <div class="red">
                  <i class="vertical">¥</i><span>{{ item.amount }}</span>
                </div>
                <span class="gray">满{{ item.sum_condition }}可用</span>
              </div>
              <div class="inner">
                <h5>{{ item.name }}</h5>
                <span class="gray">{{ item.begin_date }}至{{ item.end_date }}</span>
              </div>
            </div>
          </ion-label>
          <ion-radio slot="end" color="danger" value="buford"></ion-radio>
        </ion-item>
        <li class="not-use" @click="showCanUse" v-if="isHideCanUse">{{ canNotUseHongbaos.length }}张不可用 <ion-icon :icon="chevronDownOutline"></ion-icon></li>
        <div :class="{ hide: isHideCanUse }">
          <li v-for="item in canNotUseHongbaos" :key="item.id">
            <div class="hongbao-info">
              <div class="amount">
                <div class="red">
                  <i class="vertical gray">¥</i><span class="gray">{{ item.amount }}</span>
                </div>
                <span class="gray">满{{ item.sum_condition }}可用</span>
              </div>
              <div class="inner">
                <h5 class="gray">{{ item.name }}</h5>
                <span class="gray">{{ item.begin_date }}至{{ item.end_date }}</span>
              </div>
              <div class="checkbox">
                <ion-radio slot="end" color="danger" value="buford"></ion-radio>
              </div>
            </div>
            <div class="tips">
              <ion-icon :icon="alertCircleOutline"></ion-icon>
              <i>不可以用原因:</i>
              <span> 满{{ item.sum_condition }}才可用</span>
            </div>
          </li>
        </div>
      </ul>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { onIonViewWillEnter, IonItem, IonLabel, IonRadio } from "@ionic/vue";
import { chevronDownOutline, alertCircleOutline } from "ionicons/icons";
import BlankComponent from "@/components/common/blank/blank.vue";
import { getHongbaos } from "@/api/user/user";
import { Hongbao } from "@/interface/hongbaos";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    BlankComponent,
    IonItem,
    IonLabel,
    IonRadio,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive<{
      hongbaos: Hongbao[];
      isHideCanUse: boolean;
      checkId: number;
    }>({
      hongbaos: [],
      isHideCanUse: true,
      checkId: 0,
    });

    onIonViewWillEnter(() => {
      getHongbaos(0).then((res) => {
        if (res.status) data.hongbaos = res.data;
        if (data.hongbaos.length > 0) {
          data.checkId = data.hongbaos[0].id;
          console.log(data.checkId);
        }
      });
    });
    /**
     * 可用红包
     */
    const canUseHongbaos = computed(() => {
      return data.hongbaos.filter((item) => {
        return item.sum_condition <= parseInt(route.query.price as string);
      });
    });
    /**
     * 不可用红包
     */
    const canNotUseHongbaos = computed(() => {
      return data.hongbaos.filter((item) => {
        return item.sum_condition > parseInt(route.query.price as string);
      });
    });

    //使用红包
    const useHongbao = () => {
      router.back();
    };
    //显示不可用
    const showCanUse = () => {
      console.log(1);
      data.isHideCanUse = false;
    };
    return {
      ...toRefs(data),
      chevronDownOutline,
      alertCircleOutline,
      useHongbao,
      showCanUse,
      canUseHongbaos,
      canNotUseHongbaos,
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
  .ul-title {
    padding-top: 16px;
    font-weight: bold;
    span {
      font-size: 12px;
      color: #999;
    }
  }
  li,
  ion-item {
    margin-top: 12px;
    background-color: #fff;
    border-radius: 10px;
    &.not-use {
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: $greyColor;
      ion-icon {
        font-size: 16px;
        color: #999;
        vertical-align: middle;
      }
    }
    .hongbao-info {
      display: flex;
      align-items: center;
      padding: 15px 0;
      .inner {
        display: flex;
        flex: 1;
        flex-flow: column;
        padding-left: 10px;
        h5 {
          margin-top: 0;
          font-size: 18px;
          font-weight: bold;
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
    ion-radio {
      width: 28px;
      height: 28px;
      border: 1px solid #ddd;
      border-radius: 50%;
    }

    .tips {
      padding: 10px;
      font-size: 12px;
      color: #706e68;
      background-color: #fefbec;
      border-radius: 0 0 10px 10px;
      ion-icon {
        font-size: 16px;
        vertical-align: middle;
        color: $redColor;
      }
      i {
        color: $redColor;
      }
    }
  }
}
</style>
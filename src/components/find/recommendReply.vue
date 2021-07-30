<template>
  <ion-content>
    <div class="title bold">
      <div class="name">
        <ion-icon src="assets/svg/findFill.svg" class="vertical"></ion-icon>
        <span class="vertical">{{ name }}</span>
        <span class="vertical order-time">{{ orderLeadTime }}分钟送达</span>
        <ion-icon :icon="closeOutline" class="fr"></ion-icon>
      </div>
      <div>评论 {{ replys }}</div>
    </div>
    <div class="replys-detail">
      <div class="replys-item" v-for="item in replaysDetails" :key="item.replyId">
        <img :src="config.imagePath + item.userAvatar" alt="" width="35" />
        <div class="reply-info">
          <div>{{ item.username }}</div>
          <div class="detail">
            {{ item.detail }}<span>{{ useFormatTime("mm-dd", item.time) }}</span>
          </div>
        </div>
        <div class="reply-praise">
          <ion-icon src="assets/svg/praise.svg"></ion-icon>
          <div>{{ item.praises }}</div>
        </div>
      </div>
    </div>
    <div class="reply-input">
      <ion-input type="text" placeholder="饿了馋了,说两句～" enterkeyhint="send | enter" @keyup.enter="reply" v-model="replyMsg"></ion-input>
    </div>
  </ion-content>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { IonInput } from "@ionic/vue";
import { Reply } from "@/interface/recommend";
import { closeOutline } from "ionicons/icons";
import config from "@/config/config";
import { replyFind } from "@/api/find/recommend";
import { useFormatTime } from "@/hooks/format";

export default defineComponent({
  components: {
    IonInput,
  },
  props: {
    id: Number,
    name: String,
    orderLeadTime: Number,
    replys: Number,
    replaysDetails: {
      type: Array as PropType<Reply[]>,
      defalut: [],
    },
  },
  setup(props) {
    const replyMsg = ref("");
    const reply = () => {
      if (props.id) {
        replyFind(props.id, replyMsg.value).then((res) => {
          if (res.status) {
            props.replaysDetails?.push(res.data);
            replyMsg.value = "";
          }
        });
      }
    };
    return {
      closeOutline,
      config,
      reply,
      replyMsg,
      useFormatTime,
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  position: relative;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  border-bottom: 0.5px solid #eee;
  .name {
    margin-bottom: 5px;
    ion-icon {
      margin-right: 5px;
      font-size: 20px;
    }
    .order-time {
      margin-left: 5px;
      font-weight: normal;
    }
    .fr {
      color: #333;
    }
  }
}
.replys-detail {
  padding: 16px;
  font-size: 14px;
  .replys-item {
    display: flex;
    padding-bottom: 15px;
    color: #999;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .reply-info {
      flex: 1;
      padding: 0 10px;
      .detail {
        padding-top: 5px;
        color: #333;
        span {
          margin-left: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .reply-praise {
      text-align: center;
      io-icon {
        font-size: 18px;
      }
    }
  }
}

.reply-input {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  border-top: 0.5px solid #eee;
  ion-input {
    margin-bottom: var(--ion-safe-area-bottom, 0);
    --padding-start: 15px;
    font-size: 14px;
    background-color: #f5f5f5;
    border-radius: 35px;
  }
}
</style>

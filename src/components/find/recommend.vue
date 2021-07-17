<template>
  <div class="list">
    <div class="item">
      <div class="shop-name">
        <img src="https://elm.cangdu.org/img/16a6476344433898.jpg" class="vertical" />
        <span class="vip bolder">v</span>
        <span>华莱士</span>
        <div class="fr"><ion-icon src="assets/svg/follow.svg"></ion-icon><span class="vertical">关注</span></div>
      </div>
      <div class="vedio"></div>
      <div class="shop-info">
        <div class="shop-img"><img src="https://elm.cangdu.org/img/16a6476344433898.jpg" /></div>
        <div class="shop-item">
          <div class="item-name bolder">华莱士-全鸡汉堡(嘉善地铁店) <span>38分钟送达</span></div>
          <div class="active">
            <span class="shop-scroe">4.7分</span>
            <span>满30减5，满60减8</span>
            <span class="flep">10元无门槛</span>
          </div>
        </div>
        <ion-icon :src="chevronForwardOutline"></ion-icon>
      </div>
      <div class="tips">正宗华莱士，欢迎前来品尝</div>
      <div class="comments">
        <div><ion-icon src="assets/svg/praise.svg"></ion-icon><span>2324</span></div>
        <div><ion-icon :src="chatbubbleEllipsesOutline"></ion-icon><span>618</span></div>
        <div><ion-icon :src="arrowRedoOutline"></ion-icon><span>分享</span></div>
        <div><ion-icon :src="ellipsisVerticalOutline"></ion-icon></div>
      </div>
    </div>

    <div class="item">
      <div class="shop-name">
        <img src="https://elm.cangdu.org/img/16a6476344433898.jpg" class="vertical" />
        <span class="vip bolder">v</span>
        <span>华莱士</span>
        <div class="fr"><ion-icon src="assets/svg/follow.svg"></ion-icon><span class="vertical">关注</span></div>
      </div>
      <div class="vedio"></div>
      <div class="shop-info">
        <div class="shop-img"><img src="https://elm.cangdu.org/img/16a6476344433898.jpg" /></div>
        <div class="shop-item">
          <div class="item-name bolder">华莱士-全鸡汉堡(嘉善地铁店) <span>38分钟送达</span></div>
          <div class="active">
            <span class="shop-scroe">4.7分</span>
            <span>满30减5，满60减8</span>
            <span class="flep">10元无门槛</span>
          </div>
        </div>
        <ion-icon :src="chevronForwardOutline"></ion-icon>
      </div>
      <div class="tips">正宗华莱士，欢迎前来品尝</div>
      <div class="comments">
        <div><ion-icon src="assets/svg/praise.svg"></ion-icon><span>2324</span></div>
        <div><ion-icon :src="chatbubbleEllipsesOutline"></ion-icon><span>618</span></div>
        <div><ion-icon :src="arrowRedoOutline"></ion-icon><span>分享</span></div>
        <div><ion-icon :src="ellipsisVerticalOutline"></ion-icon></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { chatbubbleEllipsesOutline, arrowRedoOutline, ellipsisVerticalOutline, chevronForwardOutline } from "ionicons/icons";

export default defineComponent({
  setup() {
    return {
      chatbubbleEllipsesOutline,
      arrowRedoOutline,
      ellipsisVerticalOutline,
      chevronForwardOutline,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/theme/theme.scss";
.list {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  color: #191919;
  text-align: left;
  border-radius: 15px 15px 0 0;
  background-color: #fff;
  .item {
    padding-bottom: 25px;
    .shop-name {
      position: relative;
      font-weight: bolder;
      font-size: 15px;
      img {
        width: 35px;
        margin-right: 10px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .vip {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 16px;
        height: 15px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background-color: $themeColor;
        border-radius: 50%;
      }
      .fr {
        margin-top: 5px;
        color: $themeColor;
        ion-icon {
          vertical-align: middle;
          font-size: 22px;
          margin-right: 2px;
        }
      }
    }
    .vedio {
      width: 100%;
      margin: 10px 0;
      min-height: 300px;
      border-radius: 10px;
      background-color: $themeColor;
    }
    .shop-info {
      display: flex;
      align-items: center;
      font-size: 14px;
      background-color: #f8f8f8;
      border-radius: 5px;
      overflow: hidden;
      .shop-img {
        width: 55px;
        height: 55px;
      }
      .shop-item {
        display: flex;
        height: 100%;
        flex: 1;
        flex-flow: column;
        justify-content: center;
        padding-left: 10px;
        .item-name span {
          font-size: 12px;
          font-weight: normal;
          color: #999;
        }
        .active {
          font-size: 12px;
          span {
            &.shop-scroe {
              color: $redColor;
            }
            &:not(.shop-scroe) {
              font-size: 12px;
              padding: 0 5px;
              color: #eb5c41;
              border: 0.5px solid #eb5c41;
              border-radius: 3px;
              transform: scale(0.8);
              display: inline-block;
            }
            &.flep {
              color: #bc8e5a;
              border: 0.5px solid #bc8e5a;
            }
          }
        }
      }
    }
    .tips {
      padding: 5px 0;
      font-size: 14px;
    }
    .comments {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      div {
        margin-left: 15px;
        color: #666;
        ion-icon {
          font-size: 24px;
          vertical-align: middle;
        }
        span {
          margin-left: 3px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

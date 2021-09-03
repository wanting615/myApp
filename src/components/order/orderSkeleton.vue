<template>
  <div class="top"></div>
  <div class="custom-skeleton skeleton">
    <ion-skeleton-text animated style="width: 30%; height: 18px"></ion-skeleton-text>
    <ion-skeleton-text animated style="width: 15%; height: 10px; border-radius: 2px"></ion-skeleton-text>
    <div class="lines"></div>
    <div class="list">
      <div>
        <div class="circle"></div>
        <ion-skeleton-text animated style="width: 50px; height: 10px; border-radius: 2px"></ion-skeleton-text>
      </div>
      <div>
        <div class="circle"></div>
        <ion-skeleton-text animated style="width: 50px; height: 10px; border-radius: 2px"></ion-skeleton-text>
      </div>
      <div>
        <div class="circle"></div>
        <ion-skeleton-text animated style="width: 50px; height: 10px; border-radius: 2px"></ion-skeleton-text>
      </div>
    </div>
  </div>

  <div class="custom-skeleton skeleton">
    <ion-skeleton-text animated style="width: 30%; height: 12px"></ion-skeleton-text>
    <div class="list" style="space-between">
      <ion-skeleton-text animated style="width: 30%; height: 85px"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 30%; height: 85px"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 30%; height: 85px"></ion-skeleton-text>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { IonSkeletonText } from "@ionic/vue";
</script>
<style lang="scss" scoped>
.top {
  height: 60%;
  background-color: #f5f5f5;
}
.skeleton {
  width: 90%;
  padding: 10px;
  margin: 0 auto 10px;
  background: #fff;
  border-radius: 5px;
  .lines {
    height: 1px;
    margin: 12px 0;
    background-color: #f5f5f5;
  }
  .list {
    display: flex;
    justify-content: space-around;
    justify-content: space-evenly;
    align-items: center;
    .circle {
      width: 15px;
      height: 15px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #f5f5f5;
    }
  }
}
</style>
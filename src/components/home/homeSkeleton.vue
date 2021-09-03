<template>
  <div>
    <ion-list>
      <ion-item padding lines="none" v-for="n in 10" :key="n">
        <ion-thumbnail slot="start">
          <ion-skeleton-text></ion-skeleton-text>
        </ion-thumbnail>
        <ion-label>
          <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
          <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
          <ion-skeleton-text animated style="width: 90%"></ion-skeleton-text>
          <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
          <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
        </ion-label>
      </ion-item>
    </ion-list>
  </div>
</template>
<script lang="ts" setup>
import { IonLabel, IonList, IonItem, IonThumbnail, IonSkeletonText } from "@ionic/vue";
</script>
<style lang="scss" scoped>
ion-list {
  padding: 10px;
  background: #f5f5f5 !important;
  ion-item {
    margin-bottom: 10px;
    ion-thumbnail {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
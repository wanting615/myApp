<template>
  <ion-list v-if="props.type == 1">
    <ion-radio-group v-model="data.val">
      <ion-item lines="none" v-for="item in orderByList" :key="item.id" @click="dismiss(item)">
        <ion-label>{{ item.name }}</ion-label>
        <ion-radio slot="end" :value="item.id" color="danger"></ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
</template>

<script lang="ts" setup>
import { IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, popoverController } from "@ionic/vue";
import { reactive } from "vue";
import { OrderBy, orderByList } from "@/config/shopClassify";

const props = defineProps<{ type: number }>()

const data = reactive({
  val: orderByList[0].id
})

const dismiss = (item: OrderBy) => {
  popoverController.dismiss(item)
}
</script>

<style lang="scss" scoped>
ion-list {
  color: #333;
  font-size: 14px;
  ion-item {
    font-size: 15px;
  }
  .item-radio-checked {
    color: #54b5f3;
  }
}
</style>
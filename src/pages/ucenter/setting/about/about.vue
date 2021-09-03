<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>关于饿了么</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="about">
        <img src="assets/logo.png" alt />
        <div>v9.11.11 (14948294)</div>
      </div>
      <ion-list>
        <ion-item detail="true" class="first">资质与规则</ion-item>
        <ion-item detail="true" class="first">免责声明</ion-item>
        <ion-item detail="true" class="first" lines="none">检查新版本</ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
</script>
<style lang="scss" scoped>
@import "../../../../theme/theme.scss";
ion-content {
  --background: #f5f5f5;
  .about {
    padding: 30px;
    font-size: 12px;
    text-align: center;
    color: #999;
    background-color: #fff;
    img {
      width: 20%;
      margin-bottom: 15px;
    }
  }
  ion-list {
    border-top: 0.5px solid $borderColor;
    ion-item {
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
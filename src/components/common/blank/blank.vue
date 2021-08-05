<template>
  <div class="blank">
    <img src="assets/svg/blank.svg" alt="无记录" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      defalut: "暂无记录哦!",
    },
  },
});
</script>
<style lang="scss" scoped>
.blank {
  text-align: center;
  img {
    margin: 30% auto 20px;
    width: 30%;
    display: block;
  }
  color: #999;
}
</style>

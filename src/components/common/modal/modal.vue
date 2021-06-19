<template>
  <div class="modal-inner" :class="$attrs.cssClass" v-if="isOpen">
    <div
      class="modal-backdrop"
      @click="didDismiss"
      :class="{ 'show-backdrop': showModal }"
    ></div>
    <div class="modal-content" :class="{ 'show-modal': showModal }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const showModal = ref(false);
    const didDismiss = () => {
      showModal.value = false;
      context.emit("didDismiss");
    };

    const didOpen = () => {
      showModal.value = true;
    };

    watch(
      () => props.isOpen,
      (now: boolean, pre: boolean) => {
        console.log(now);
        if (now === pre) return;
        setTimeout(() => {
          now ? didOpen() : didDismiss();
        }, 10);
      }
    );

    return {
      showModal,
      didDismiss,
    };
  },
});
</script>
<style lang="scss" scoped>
.modal-inner {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  .modal-backdrop {
    height: 100%;
    background-color: #000;
    opacity: 0;
    transition: all 1s ease;
  }
  .show-backdrop {
    opacity: 0.4;
  }
}
.modal-content {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transform: translate3d(0, 100%, 0);
  transition: all 1s ease;
  padding-bottom: var(--ion-safe-area-bottom, 0);
}
.show-modal {
  transform: translate3d(0, 0, 0);
}
</style>
import { onBeforeMount } from "vue";
import { useStore } from "@/store";

export function useUserInfo() {
  const store = useStore();
  onBeforeMount(() => {
    const localToken = localStorage.getItem('loginToken');
    if (localToken) {
      store.commit('setLoginToken', localToken);
      store.dispatch('updateUserInfo', localToken);
    }
  })
}
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useTimerFormat } from "./format";

//倒计时
export function useTimer(time: number) {
  let interval: number;
  const times = ref(time);
  onMounted(() => {
    interval = setInterval(() => {
      useTimerFormat(times.value);
      times.value--;
    }, 1000)
  })

  onBeforeUnmount(() => {
    clearInterval(interval);
  })

  return times;
}
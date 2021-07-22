import { Directive, nextTick } from "vue";
interface BindType {
  value: boolean;
}
//获取焦点
export const focus: Directive<HTMLElement, BindType> = {
  mounted(el, bind) {
    if (bind.value) {
      nextTick(() => {
        el.focus()
      })
    }
  }
}
import { unref } from "vue";

export interface MenuRef {
  menuEl: ElRef;
  menuLeft: ElRef;
  menuRight: ElRef;
}

export interface ToobarlRef {
  $el: ElRef;
}

let scollY = 0;
let navcChildNode: HTMLElement;
let toolbarElement: ElRef;

export function useScoll(e: CustomEvent, el1: Nullable<ElRef>, el2: Nullable<MenuRef>, toolbarEl: Nullable<ToobarlRef>) {
  if (!el1 || !el2) return;
  !scollY && (scollY = el1.offsetTop + el1.offsetHeight + unref(el2.menuEl).offsetTop - 44);
  !navcChildNode && (navcChildNode = el1.firstElementChild as HTMLElement);
  !toolbarElement && toolbarEl && (toolbarElement = unref(toolbarEl?.$el));

  if (e.detail.scrollTop < 50) {
    toolbarElement.style.background = `rgba(84, 181, 243,${e.detail.scrollTop * 0.02})`;
  }
  if (e.detail.scrollTop > (el1.offsetTop - 44)) {
    // fixed navs-slider
    navcChildNode.style.position = 'fixed';
    navcChildNode.style.marginTop = "var(--ion-safe-area-top, 0)";
  } else if (e.detail.scrollTop > scollY) {
    // scroll food Menu 
  } else {
    //reset 
    navcChildNode.style.position = "static";
    navcChildNode.style.marginTop = "0px"
  }


}

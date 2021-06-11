import { unref } from "vue";

export interface MenuRef {
  menuEl: ElRef;
  menuLeft: ElRef;
  menuRight: ElRef;
}

export interface ToobarlRef {
  $el: ElRef;
}

export interface ContentRef {
  $el: HTMLIonContentElement;
}

interface ScrollEl {
  navChildNode: HTMLElement; //菜单栏标签元素
  toolbarEl: Undefinedable<HTMLDivElement>;//状态栏元素
  toolbarChildEl: Undefinedable<NodeListOf<Element>>;//状态栏子元素
  foodMenuEl: MenuRef; //菜单栏元素
  navOffsettop: number; //nav栏距离顶部距离
  foodMenuOffsetHeight: number; //菜单距离顶部距离
  foodMenuHeight: number;//菜单栏高度
}
let scrollEl: Undefinedable<ScrollEl>;


export function setScrollEl(navEl: Nullable<ElRef>, foodMenuEl: Nullable<MenuRef>, toolbar: Nullable<ToobarlRef>) {
  if (scrollEl === undefined) {
    if (navEl === null || foodMenuEl === null) return;
    const toolbarEl = unref(toolbar?.$el);
    if (!toolbarEl) return;
    const navChildNode = navEl.firstElementChild as HTMLElement;
    const toolbarChildEl = toolbarEl?.querySelectorAll('ion-icon,ion-back-button');
    const foodMenuOffsetHeight = navEl.offsetTop + navEl.offsetHeight + unref(foodMenuEl.menuEl).offsetTop - navEl.offsetHeight - toolbarEl.offsetHeight;
    const foodMenuHeight = document.body.offsetHeight - toolbarEl?.offsetHeight - navEl.offsetHeight;
    const navOffsettop = navEl.offsetTop - toolbarEl.offsetHeight;
    scrollEl = {
      navChildNode,
      toolbarEl,
      toolbarChildEl,
      foodMenuEl,
      navOffsettop,
      foodMenuOffsetHeight,
      foodMenuHeight,
    }
    //设置菜单列表高度
    foodMenuEl.menuEl.style.height = foodMenuHeight + "px";
  }
}

export function useScoll(e: CustomEvent) {
  if (!scrollEl) return;
  //change toolbar background color
  if (e.detail.scrollTop <= 50) {
    if (scrollEl.toolbarEl) scrollEl.toolbarEl.style.background = `rgba(255, 255, 255,${e.detail.scrollTop * 0.02})`;
    if (scrollEl.toolbarChildEl) {
      scrollEl.toolbarChildEl.forEach((item: any) => {
        if (e.detail.scrollTop < 25) {
          item.style.color = `rgba(251, 251, 251,${1 - e.detail.scrollTop * 0.02})`;
        } else {
          item.style.color = `rgba(0, 0, 0,${(e.detail.scrollTop - 25) * 0.04})`;
        }
      })
    }
  } else {
    if (scrollEl.toolbarEl) scrollEl.toolbarEl.style.background = "rgba(251, 251, 251";
    scrollEl.toolbarChildEl?.forEach((item: any) => {
      item.style.color = "rgba(0, 0, 0)";
    })
  }
  if (e.detail.scrollTop > scrollEl.navOffsettop) {
    // fixed navs-slider
    scrollEl.navChildNode.style.position = 'fixed';
    scrollEl.navChildNode.style.marginTop = "var(--ion-safe-area-top, 0)";

    //scroll food menu
    if (e.detail.scrollTop >= scrollEl.foodMenuOffsetHeight) {
      scrollEl.foodMenuEl.menuLeft.style.overflowY = "scroll";
      scrollEl.foodMenuEl.menuRight.style.overflowY = "scroll";
    }
  } else {
    //reset 
    scrollEl.navChildNode.style.position = "static";
    scrollEl.navChildNode.style.marginTop = "0px";
    scrollEl.foodMenuEl.menuLeft.style.overflowY = "hidden";
    scrollEl.foodMenuEl.menuRight.style.overflowY = "hidden";
  }
}

export function userScrollTo(contentEl: Nullable<ContentRef>) {
  const content = contentEl?.$el;
  content && (content.scrollByPoint(0, scrollEl?.foodMenuOffsetHeight || 0, 300));
}

export function reset() {
  scrollEl = undefined;
}
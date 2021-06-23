import { onBeforeUnmount, unref } from "vue";

export interface MenuRef {
  menuEl: ElRef;
  menuLeft: ElRef;
  menuRight: ElRef;
}

export interface ToobarlRef {
  $el: ElRef;
}
interface ScrollEl {
  navChildNode: HTMLElement; //菜单栏标签元素
  toolbarEl: Undefinedable<HTMLDivElement>;//状态栏元素
  toolbarChildEl: Undefinedable<NodeListOf<Element>>;//状态栏子元素
  foodMenuEl: MenuRef; //菜单栏元素
  navOffsettop: number; //nav栏距离顶部距离
  foodMenuOffsetHeight: number; //菜单距离顶部距离
  foodMenuHeight: number;//菜单栏高度
  slidesEl: IonSlidesRef;
}
let scrollEl: Undefinedable<ScrollEl>;

onBeforeUnmount(() => {
  scrollEl = undefined;
});

export function setScrollEl(navEl: Nullable<ElRef>, foodMenuEl: Nullable<MenuRef>, toolbar: Nullable<ToobarlRef>, slidesEl: Nullable<IonSlidesRef>) {
  if (scrollEl === undefined) {
    if (navEl === null || foodMenuEl === null || slidesEl === null) return;
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
      slidesEl
    }
    //设置菜单列表高度
    foodMenuEl.menuEl.style.height = foodMenuHeight + "px";
    //设置slide高度
    const slide = slidesEl.$el.querySelectorAll('.swiper-slide') as unknown as HTMLElement[];
    slide.forEach((el: HTMLElement) => {
      el.style.height = foodMenuHeight + "px";
    })
  }
}

//页面ion-content滚动行为
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

  //change silde scroll and food menu scroll
  if (e.detail.scrollTop === scrollEl.navOffsettop) {
    // fixed navs-slider
    scrollEl.navChildNode.style.position = 'fixed';
    scrollEl.navChildNode.style.marginTop = "var(--ion-safe-area-top, 0)";

    //给每个silde添加 下拉滚动
    scrollEl.slidesEl.$el.classList.add('scroll-slides');
  } else {
    scrollEl.slidesEl.$el.classList.remove('scroll-slides');
    //reset 
    scrollEl.navChildNode.style.position = "static";
    scrollEl.navChildNode.style.marginTop = "0px";
  }
}

//滚动到content中foodsmenu位置
export function useScrollTo(contentEl: Nullable<ContentRef>) {
  const content = contentEl?.$el;
  content && (content.scrollByPoint(0, scrollEl?.foodMenuOffsetHeight || 0, 300));
}

//food slide 滚动行为

export function useScrollFoodSlide(e: Event) {
  if (!scrollEl) return;
  const target = e.target as HTMLElement;
  const top = scrollEl?.foodMenuEl.menuEl.offsetTop || 0;
  if (target.scrollTop === top) {
    scrollEl.foodMenuEl.menuLeft.style.overflowY = "scroll";
    scrollEl.foodMenuEl.menuRight.style.overflowY = "scroll";
  } else {
    scrollEl.foodMenuEl.menuLeft.style.overflowY = "hidden";
    scrollEl.foodMenuEl.menuRight.style.overflowY = "hidden";
  }
}
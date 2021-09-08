import { unref } from "vue";

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
let useScrollSlideFlag = true;
let useScollToolbarFlag = true;


export function useClearEl(): void {
  scrollEl = undefined;
  useScrollSlideFlag = true;
  useScollToolbarFlag = true;
}

export function setScrollEl(navEl: Nullable<ElRef>, foodMenuEl: Nullable<MenuRef>, toolbar: Nullable<ToobarlRef>, slidesEl: Nullable<IonSlidesRef>): void {
  if (scrollEl === undefined) {
    if (navEl === null || foodMenuEl === null || slidesEl === null) return;
    const toolbarEl = unref(toolbar?.$el);
    if (!toolbarEl) return;
    //foodMenuEl 获取不到实例方法？？？？？
    // const menuEl = slidesEl.$el.querySelector(".menu") as HTMLDivElement;
    // const menuLeft = slidesEl.$el.querySelector('menu-left') as HTMLDivElement;
    // const menuRight = slidesEl.$el.querySelector('menu-right') as HTMLDivElement;
    // const foodMenuEl1: MenuRef = {
    //   menuEl: menuEl,
    //   menuLeft: menuLeft,
    //   menuRight: menuRight
    // }

    const navChildNode = navEl.firstElementChild as HTMLElement;
    const toolbarChildEl = toolbarEl?.querySelectorAll('ion-icon,ion-back-button');
    const foodMenuOffsetHeight = navEl.offsetTop + navEl.offsetHeight + unref(foodMenuEl.menuEl).offsetTop - navEl.offsetHeight - toolbarEl.offsetHeight;
    // const foodMenuOffsetHeight = navEl.offsetTop + navEl.offsetHeight + unref(foodMenuEl1.menuEl).offsetTop - navEl.offsetHeight - toolbarEl.offsetHeight;
    const foodMenuHeight = document.body.offsetHeight - toolbarEl?.offsetHeight - navEl.offsetHeight;
    const navOffsettop = navEl.offsetTop - toolbarEl.offsetHeight;
    scrollEl = {
      navChildNode,
      toolbarEl,
      toolbarChildEl,
      foodMenuEl,
      // foodMenuEl: foodMenuEl1,
      navOffsettop,
      foodMenuOffsetHeight,
      foodMenuHeight,
      slidesEl,
    }
    //设置菜单列表高度
    scrollEl.foodMenuEl.menuEl.style.height = foodMenuHeight + "px";
    //设置slide高度
    const slide = slidesEl.$el.querySelectorAll('.slides-page') as unknown as HTMLElement[];
    slide.forEach((el: HTMLElement) => {
      el.style.height = foodMenuHeight + "px";
    })
  }
}

//页面ion-content滚动行为
export function useScoll(e: CustomEvent): void {
  if (!scrollEl) return;
  //change toolbar background color
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  animateToolbar(e);

  //change silde scroll and food menu scroll
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  changeMenuSlides(e);
}

//滚动到content中foodsmenu位置
export function useScrollTo(contentEl: Nullable<ContentRef>): void {
  const content = contentEl?.$el;
  content && (content.scrollByPoint(0, scrollEl?.foodMenuOffsetHeight || 0, 300));
}

//food slide 滚动行为

export function useScrollFoodSlide(e: Event): void {
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

function changeMenuSlides(e: CustomEvent) {
  if (!scrollEl) return;
  console.log(e.detail.scrollTop, scrollEl.navOffsettop)
  if (e.detail.scrollTop >= scrollEl.navOffsettop) {
    // fixed navs-slider
    scrollEl.navChildNode.style.position = 'fixed';
    scrollEl.navChildNode.style.marginTop = "var(--ion-safe-area-top, 0)";

    //给每个silde添加 下拉滚动
    scrollEl.slidesEl.$el.classList.add('scroll-slides');
    useScrollSlideFlag = true;
  } else {
    if (!useScrollSlideFlag) return;
    scrollEl.slidesEl.$el.classList.remove('scroll-slides');
    //reset 
    scrollEl.navChildNode.style.position = "static";
    scrollEl.navChildNode.style.marginTop = "0px";
    useScrollSlideFlag = false;
  }
}

function animateToolbar(e: CustomEvent): void {
  if (!scrollEl) return;
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
    useScollToolbarFlag = true;
  } else {
    if (!useScollToolbarFlag) return;

    if (scrollEl.toolbarEl) scrollEl.toolbarEl.style.background = "rgba(251, 251, 251";
    scrollEl.toolbarChildEl?.forEach((item: any) => {
      item.style.color = "rgba(0, 0, 0)";
    })
    useScollToolbarFlag = false;
  }
}
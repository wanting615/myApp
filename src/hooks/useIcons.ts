
enum IconsPath {
  redEnvelop = "assets/colour-svg/red-envelop.svg",//红包
  follow = "assets/colour-svg/follow.svg",//心
  shopCart = "assets/colour-svg/shop-cart.svg",//购物车
  evaluate = "assets/colour-svg/evaluate.svg"//评价
}

export function useIcons(name: keyof typeof IconsPath): string {
  return IconsPath[name];
}

import { Food, FoodsMenu } from "@/interface/foodsInterface";
import { useStore } from "@/store"

let flag = false;
const store = useStore();
export function addCarts(e: MouseEvent, item: Food, menu: FoodsMenu): void {
  if (flag) return;
  flag = true;
  const div: HTMLDivElement = document.createElement('div');
  div.innerText = "1";
  div.style.left = e.pageX - 10 + 'px';
  div.style.top = e.pageY - 10 + "px";
  div.className = "add-carts-icon";
  document.body.appendChild(div);

  setTimeout((): void => {
    const distance = 30;
    const target: Nullable<HTMLElement> = document.querySelector('.buy-cart-footer');
    console.log(target)
    div.style.top = (target?.offsetTop || document.body.offsetHeight) + distance + "px";
    div.style.left = distance + "px";
  }, 0)

  div.ontransitionend = (): void => {
    div.remove();
    flag = false;
  }

  item.num = item.num ? item.num += 1 : 1;
  menu.num = menu.num ? menu.num += 1 : 1;
  store.commit('setFoods', item);//存储food store
}


export function delCarts(item: Food, menu: FoodsMenu): void {
  item.num--;
  menu.num--;
  store.commit('delFoods', item)
}
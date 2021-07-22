import { Directive } from "vue";

export const realImg: Directive<HTMLImageElement> = {
  async beforeMount(el, bind) {
    const imgURL = bind.value;
    if (imgURL) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const exist = await imageIsExist(imgURL);
      exist && el.setAttribute('src', imgURL);
    }
    //判断该图片是否存在
    function imageIsExist(url: string) {
      return new Promise(resolve => {
        let img: Nullable<HTMLImageElement> = new Image();
        img.src = url;
        img.onload = () => {
          if (img && img.complete) {
            resolve(true);
            img = null;
          }
        }
        img.onerror = () => {
          resolve(false);
          img = null
        }

      })
    }
  },
}
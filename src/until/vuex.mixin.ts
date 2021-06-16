
import type { App } from "vue";
const vuexState = {
  install(app: App<Element>) {
    app.mixin({
      created() {
        if (this.$options.isVuex) {
          console.log(1)
          const _name = this.$options.name;
          import("../store/module/" + _name).then(res => {
            // this.$store.registerModule(name, res.default);
            app.use(res.default, res.shopStoreKey)
          })
        }
      }
    });
  }
}

export default vuexState;
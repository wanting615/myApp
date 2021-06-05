const vuexState = {
  install(vue: any) {
    vue.mixin({
      created() {
        if (this.$options.isVuex) {
          const _name = this.$options.name;
          import("../store/module/" + _name).then(res => {
            this.$store.registerModule(name, res.defalut);
          })
        }
      }
    });
  }
}

export default vuexState;
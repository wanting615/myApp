import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";
// import vuexState from "./until/vuex.mixin";

import { registerGlobComp } from "@/components/registerGlobComp";

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue, {
    backButtonText: '',
    hardwareBackButton: true
  })
  .use(router)
  .use(store)
// .use(vuexState)
//注册全局组件
registerGlobComp(app);

app.config.errorHandler = function (err, vm, info) {
  console.log(err);
  console.log(vm);
  console.log(info);
};


router.isReady().then(() => {
  app.mount('#app');
});
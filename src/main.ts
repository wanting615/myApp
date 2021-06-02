import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Vuex from "./store";

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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonIcon,
  IonButton,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";

const app = createApp(App)
  .use(IonicVue, {
    backButtonText: '',
    hardwareBackButton: true
  })
  .use(router).use(Vuex);

app.config.errorHandler = function (err, vm, info) {
  console.log(err);
  console.log(vm);
  console.log(info);
};

app.component('IonPage', IonPage)
  .component('IonHeader', IonHeader)
  .component('IonToolbar', IonToolbar)
  .component('IonTitle', IonTitle)
  .component('IonContent', IonContent)
  .component('IonBackButton', IonBackButton)
  .component('IonIcon', IonIcon)
  .component('IonButton', IonButton)
  .component('IonButtons', IonButtons)
  .component('IonRefresher', IonRefresher)
  .component('IonRefresherContent', IonRefresherContent)
  .component('IonInfiniteScroll', IonInfiniteScroll)
  .component('IonInfiniteScrollContent', IonInfiniteScrollContent)

router.isReady().then(() => {
  app.mount('#app');
});
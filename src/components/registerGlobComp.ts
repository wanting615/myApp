
import { App } from 'vue';
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

const compList = [
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
  IonInfiniteScrollContent,];

export function registerGlobComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });
}

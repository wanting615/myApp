import { toastController } from "@ionic/vue";

interface AlertServiceInterface {
  msgToast(msg: string): void;
  errorToast(msg: string): void;
}
class AlertService implements AlertServiceInterface {
  private static instance: AlertService
  static shared() {
    if (!this.instance) {
      this.instance = new AlertService()
    }
    return this.instance
  }

  async msgToast(msg: string) {
    const toast = await toastController.create({
      message: msg,
      duration: 2000,
      position: "middle",
      mode: "ios",
      translucent: false,
      animated: true,
      cssClass: "app-alert",
      color: 'medium'
    })
    toast.present();
  }

  async errorToast(msg: string) {
    const toast = await toastController.create({
      message: msg,
      duration: 2000,
      position: "middle",
      mode: "ios",
      translucent: false,
      animated: true,
      cssClass: "app-alert",
      color: 'dark'
    })
    toast.present();
  }
}


export default AlertService.shared();

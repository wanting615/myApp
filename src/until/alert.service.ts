import { toastController, alertController, IonicSafeString } from "@ionic/vue";

interface AlertServiceInterface {
  msgToast(msg: string): void;
  errorToast(msg: string): void;
  alertRemind(option: AlertOptions): void;
}

interface AlertOptions {
  header?: string;
  subHeader?: string;
  message?: string | IonicSafeString;
  cssClass?: string | string[];
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


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async alertRemind(option: AlertOptions) {
    const alert = await alertController.create({
      header: option.header,
      subHeader: option.subHeader,
      message: option.message,
      cssClass: option.cssClass,
      buttons: [
        {
          text: '取消',
          role: 'cancle',
        },
        {
          text: "确认",
          role: 'comfirm'
        }
      ]
    })
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === "comfirm"
  }
}


export default AlertService.shared();

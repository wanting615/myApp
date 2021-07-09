
import alertService from "./alert.service";
interface ValidatorServiceInterface {
  checkUserPhone(phone: string): boolean;
  checkMailBox(mail: string): boolean;
}
class ValidatorService implements ValidatorServiceInterface {
  private static instance: ValidatorService
  static shared() {
    if (!this.instance) {
      this.instance = new ValidatorService()
    }
    return this.instance
  }

  /**
   *
   * @param phone 手机号验证
   */
  public checkUserPhone(phone: string): boolean {
    const reg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!phone) {
      alertService.errorToast('请输入手机号');
      return false;
    }
    if (!reg.test(phone)) {
      alertService.errorToast('请输入正确的手机号');
      return false;
    }
    return true;
  }
  /**
   *
   * @param mail 邮箱验证
   */
  public checkMailBox(mail: string): boolean {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (!mail) {
      alertService.errorToast('请输入邮箱地址');
      return false;
    }
    if (!reg.test(mail)) {
      alertService.errorToast('请输入正确的邮箱地址');
      return false;
    }
    return true;
  }

  /**
   * 
   * @param str 非空校验值
   * @param msg 非空提示语
   * @returns 
   */
  public checkNotEmpty<T>(str: T, msg: string): boolean {
    if (!str) { alertService.errorToast(msg); return false }
    return true;
  }
}


export default ValidatorService.shared();

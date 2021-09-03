import clone from "clone";
import JSEncrypt from "jsencrypt";
import config from "@/config/config";

interface CommonUntilInterface {
  deepColone<T>(obj: T): T;
  getEncrypt<T>(data: T): string;
}


class CommonUtil implements CommonUntilInterface {
  private static instance: CommonUtil
  static shared() {
    if (!this.instance) {
      this.instance = new CommonUtil()
    }
    return this.instance
  }

  //对象深拷贝
  deepColone<T>(obj: T): T {
    return clone<T>(obj)
  }

  //加密
  getEncrypt<T>(data: T) {
    let str = '';
    for (const key in data) {
      str += key + "=" + data[key] + "&";
    }
    str = str.substr(0, str.length - 1);
    const encrypt = new JSEncrypt({
      default_key_size: "512"
    });
    // 设置公钥
    encrypt.setPublicKey(config.pulickKey);
    return encodeURIComponent(encrypt.encrypt(str));
  }
}



export default CommonUtil.shared();

import clone from "clone";
interface CommonUntilInterface {
  deepColone<T>(obj: T): T;
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
}



export default CommonUtil.shared();

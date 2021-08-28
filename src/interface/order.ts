import { Food } from '@/interface/foodsInterface';

export interface OrderInfo {
  userId: number;
  orderId: string;//订单id
  status: number;//订单状态
  orderTime: Date;//订单创建时间
  remarks: string;//备注
  shopId: number;//商店id
  foods: Food[];
  addressId: number; //地址id 
  totalAmount: number;//打折后总金额
  originalTotalAmount: number;//总原价
  packingFee: number;//打包费
  payAmount: number;//实付金额
  discountAmount: number;//满减优惠金额
  subsidyAmount: number;//补贴金额
  is_new: boolean;//是否新用户下单
  isNewAmount: number;//新用户立减金额
  fullMinus: number;//满减金额
  redBag: Redbag;//红包
  invoice: Invoice;//发票
  delivery: Delivery;//配送信息
  tableware: string;//餐具
}

interface Redbag {
  id: number;
  name: string;//红包名称
  amount: number;//红包金额
}

//发票信息
export interface Invoice {
  invoiceType: number; //1公司2个人
  header: string; //抬头
  taxesNum: number | undefined; //税号或社会信用代码
}

//配送信息
export interface Delivery {
  name: string;//配送名称
  personName: string;//配送人员名称
  timeType: string;//配送方式
  amount: number;//配送费用
  discountAmount: number;//配送减免费
}

export interface CreateOrderInfo {
  shopId: number;
  addressId: number;
  foodIds: {
    id: number;
    num: number;//数量
  }[];
  tableware: string;//餐具
  invoice: Nullable<Invoice>;//发票
  remarks?: string;//备注
  hongbaoId?: number;//红包id
}
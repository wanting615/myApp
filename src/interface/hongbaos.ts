export interface Hongbao {
  id: number;
  sn: string;
  user_id: number;//用户id
  amount: number;//红包大小
  sum_condition: number;//满多少金额可用
  name: string;//红包名称
  phone: string;//手机号
  begin_date: string;//开始时间
  end_date: string;//结束时间
  description_map: {
    phone: string;//限制手机号使用
    online_paid_only: string;//限制在线使用
    validity_delta: string;//多少天后使用
    validity_periods: string;//什么时候到期
    sum_condition: string;//满多少使用
  };
  limit_map: {};//
  status: number;//红包使用状态
  present_status: number;//4已过期 1没过期
  share_status: number;//分享状态
  showKey?: boolean;//展开or收缩
}
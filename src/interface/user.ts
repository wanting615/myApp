export interface UserInfo {
  avatar: string;//头像
  balance: number;//余额
  brand_member_new: number;//全新会员
  current_address_id: number;//地址id
  current_invoice_id: number;//省id
  delivery_card_expire_days: number;//送货卡过期天数
  email: string;//邮箱
  gift_amount: number;//优惠卷数量
  is_active: number;//是否激活
  is_email_valid: boolean;//有效邮箱
  is_mobile_valid: boolean;//有效手机
  mobile: string;//手机
  point: number;//？
  id: number;//id
  user_id: number;//用户id
  username: string;//用户名
  city: string;//用户城市
  registe_time: string;//注册时间
  column_desc: {//？
    game_desc: string;
    game_image_hash: string;
    game_is_show: number;
    game_link: string;
    gift_mall_desc: string;
  };
}
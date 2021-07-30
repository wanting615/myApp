export interface RecommendItem {
  id: number;
  shopId: string;//店铺id
  vedioPath: string;//视频地址
  praises: number;//点赞数
  replys: number;//回复数
  tips: string;//标签话术
  time: Date;//回复时间
  replaysDetails: [Reply];//回复详情
  shopInfo: {
    name: string;
    image_path: string;
    rating: number;
    activities: {
      name: string;
      id: number;
      description: string;
      icon_name: string;
      icon_color: string;
    }[];
    is_premium: boolean;
    order_lead_time: number;
  };
}

export interface Reply {
  replyId: number;
  username: string;//回复人
  userId: number;//回复人id
  userAvatar: string;//回复人头像
  detail: string;//回复内容
  time: Date;//回复时间
  praises: number;//回复点赞数
}
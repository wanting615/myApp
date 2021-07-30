export interface VideoConfigOptions {
  cssClass?: string;
  autoPaly?: boolean;
  loop?: boolean;
  controls?: VideoControls;
  completeCallback?<T>(): T;
}

export interface VideoControls {
  volume?: boolean;//声音
  progressBar?: boolean;//进度条
  progressTime?: boolean;//时间
  fullscreen?: boolean;//全屏
}
<template>
  <div class="video-container">
    <div class="backdrop"></div>
    <video :src="url" type="video/mp4" ref="videoEl" @click="palyVideo"></video>
    <div class="video-btn" @click="palyVideo" v-if="!videoState.isPlay">
      <ion-icon src="assets/svg/play.svg"></ion-icon>
    </div>
    <!-- 控制条 -->
    <div class="video-controls" v-if="config.controls">
      <!-- 进度条 -->
      <div class="vc-bar" v-if="config.controls.progressBar" @click="clickBar($event)">
        <div class="vc-bar-current" :style="{ width: videoState.barWidth }"></div>
      </div>
      <!-- 时间 -->
      <div class="vc-time" v-if="config.controls.progressTime">{{ videoState.remainTime }}</div>
      <!-- 静音 -->
      <div class="vc-muted vc-icon" v-if="config.controls.volume" @click="setVolme">
        <ion-icon :icon="videoState.isMuted ? volumeMuteOutline : volumeHighOutline"></ion-icon>
      </div>
      <!-- 全屏 -->
      <div class="vc-fullcreen vc-icon" v-if="config.controls.fullscreen" @click="setFullScreen">
        <ion-icon :icon="scanOutline"></ion-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref, unref } from "vue";
import { volumeHighOutline, volumeMuteOutline, scanOutline } from "ionicons/icons";
import { VideoConfigOptions } from "./videoCom";

export default defineComponent({
  props: {
    url: {
      type: String,
      default: "",
    },
    config: {
      type: Object as PropType<VideoConfigOptions>,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const videoState = reactive({
      isPlay: false, //是否正在播放
      isMuted: false, //是否静音
      remainTime: "00:00", //剩余时长
      barWidth: "0%", //进度条百分比
    });
    const videoEl = ref<Nullable<HTMLVideoElement>>(null);
    //播放/暂停
    const palyVideo = () => {
      const video = unref(videoEl);
      videoState.isPlay = !videoState.isPlay;
      video && (videoState.isPlay ? video.play() : video.pause());
    };

    //静音
    const setVolme = () => {
      const video = unref(videoEl);
      videoState.isMuted = !videoState.isMuted;
      video && (video.muted = videoState.isMuted);
    };

    //全屏
    const setFullScreen = () => {
      const video = unref(videoEl);
      video?.requestFullscreen();
    };

    //点击改变bar
    const clickBar = (e: MouseEvent) => {
      const barEl = e.target as HTMLElement;
      const video = unref(videoEl);
      video && (video.currentTime = Math.round((e.offsetX / barEl.offsetWidth) * video.duration));
    };

    //计算当前剩余时长
    function remainTime(video: HTMLVideoElement): string {
      const time = Math.round(video.duration - video.currentTime);
      const minute = Math.floor(time / 60);
      const seconds = time - minute * 60;
      return (minute > 9 ? minute : "0" + minute) + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }

    //计算video bar百分比长度
    function setVedioBar(video: HTMLVideoElement): string {
      return (video.currentTime / video.duration) * 100 + "%";
    }

    //监听视频播放进度-改变bar 和时间
    function addEventListenerTimeUpdate(video: HTMLVideoElement) {
      video.ontimeupdate = () => {
        videoState.remainTime = remainTime(video); //计算剩余时长
        videoState.barWidth = setVedioBar(video); //重置进度条
        if (video.duration === video.currentTime) videoState.isPlay = false;
      };
    }

    onMounted(() => {
      //是否自动播放
      const video = unref(videoEl);
      if (!video) return;

      if (props.config.autoPaly) {
        videoState.isPlay = true;
        video.play();
      }
      //获取播放时间-播放进度
      if (!props.config.controls) return;
      if (props.config.controls.progressTime || props.config.controls.progressBar) {
        video.ondurationchange = () => {
          videoState.remainTime = remainTime(video); //重置时间
          videoState.barWidth = setVedioBar(video); //重置进度条
          addEventListenerTimeUpdate(video); //监听视频播放进度
        };
      }
    });
    return {
      volumeHighOutline,
      volumeMuteOutline,
      scanOutline,
      videoEl,
      videoState,
      palyVideo,
      setVolme,
      setFullScreen,
      clickBar,
    };
  },
});
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;
  margin: 10px 0;
  border-radius: 10px;
  overflow: hidden;
  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.2) 100%);
  }
  video {
    width: 100%;
  }
  .video-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 10px 10px 6px 12px;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #000000, $alpha: 0.3);
    border-radius: 50%;
    ion-icon {
      color: #fff;
    }
  }
  .video-controls {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: #efefee;
    align-items: center;
    justify-content: flex-end;
    .vc-bar {
      position: relative;
      flex: 1;
      height: 2px;
      background-color: #4b4b4b;
      cursor: pointer;
      border-radius: 3px;
      line-height: 1;
      .vc-bar-current {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: #b3b3b3;
        border-radius: 3px;
      }
    }
    .vc-time {
      padding: 0 10px;
    }
    .vc-icon {
      display: flex;
      &:last-child {
        padding-left: 10px;
      }
      ion-icon {
        font-size: 18px;
      }
    }
  }
}
</style>

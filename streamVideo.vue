<template>
  <div className="video_player_container" style="height: 100%; width: 100%">
    <video id="videoPlayer" width="100%" height="100%" controls autoplay></video>
  </div>
</template>

<script>
import FlvJs from "flv.js";
export default {
  props: ["url"],
  mounted() {
    this.init();
  },
  data() {
    return {
      videoData: {
        playCalibrationTimer: null,
        player: null,
      },
    };
  },
  watch: {
    url(val) {
      if (val) {
        this.init();
      }
    },
  },
  methods: {
    videoPlay() {
      console.log("videoPlay");
      //  clearVideoTimer()
      this.intervalSetCurTime();
    },

    videoPause() {
      console.log("videoPause");
      this.clearVideoTimer();
    },

    videoErr(errType, errDetail) {
      console.log("flvPlayer Error errType", errType);
      console.log("flvPlayer Error errDetail", errDetail);
      this.clearVideoTimer();

      this.$message.error("播放错误");
    },

    intervalSetCurTime() {
      let video = this.videoData.player;

      this.videoData.playCalibrationTimer = setInterval(() => {
        let currentTime = video.currentTime;
        let bufferedLen = video.buffered.length;

        if (currentTime === 0) {
          return;
        }

        if (bufferedLen > 0) {
          let videoElement = this.videoData.player;
          const end = videoElement.buffered.end(0);
          const current = videoElement.currentTime;
          const diff = end - current;
          const diffCritical = 2; // 这里设定了超过4秒以上就进行跳转
          const diffSpeedUp = 1; // 这里设置了超过1秒以上则进行视频加速播放
          const maxPlaybackRate = 4; // 自定义设置允许的最大播放速度
          let playbackRate = 1.0; // 播放速度

          //  console.log('播放时间校准，落后：' + diff + 's')

          if (diff > diffCritical) {
            // console.log('超过4s')
            videoElement.currentTime = end - 0.45;
            playbackRate = Math.max(1, Math.min(diffCritical, 16));
          } else if (diff > diffSpeedUp) {
            playbackRate = Math.max(1, Math.min(diff, maxPlaybackRate, 16));
            // console.log('超过1s playbackRate', playbackRate)
          }
          videoElement.playbackRate = playbackRate;
          if (videoElement.paused) videoElement.play();
        }
      }, 1000);
    },

    initPlayer() {
      console.log("initPlayer");

      if (FlvJs.isSupported()) {
        var videoEl = document.getElementById("videoPlayer");
        var flvPlayer = FlvJs.createPlayer({
          type: "flv",
          url: this.url,
          enableWorker: true,
          enableStashBuffer: false,
          stashInitialSize: 128,
          // hasAudio: false
        });

        this.videoData.player = flvPlayer;
        flvPlayer.attachMediaElement(videoEl);
        flvPlayer.load();
        // console.log('FlvJs.Events', FlvJs.Events)

        flvPlayer.on(FlvJs.Events.ERROR, this.videoErr);

        // videoEl.onwaiting = () => {
        //   console.log('onwaiting')
        //   // this.clearVideoTimer()
        // }

        // this.addHandle(videoEl, "play", this.videoPlay);
        // this.addHandle(videoEl, "pause", this.videoPause);
      }
    },
    addHandle(dom, type, fn) {
      if (document.addEventListener) {
        dom.addEventListener(type, fn, false);
      } else if (document.attachEvent) {
        dom.attachEvent("on" + type, fn);
      } else {
        let oldDomFun = dom["on" + type];
        dom["on" + type] = function () {
          oldDomFun();
          fn && fn();
        };
      }
    },
    removeHandle(dom, type, fn) {
      if (document.removeEventListener) {
        dom.removeEventListener(type, fn);
      } else if (document.detachEvent) {
        dom.detachEvent("on" + type, fn);
      } else {
        dom["on" + type] = null;
      }
    },

    clearVideoTimer() {
      let playerTimer = this.videoData.playCalibrationTimer;
      playerTimer && clearInterval(playerTimer);
      playerTimer = null;
    },

    playerDispose() {
      let player = this.videoData.player;

      if (!player) {
        return;
      }

      let videoEl = document.getElementById("videoPlayer");
      console.log("videoEl", videoEl);
    //   this.removeHandle(videoEl, "play", this.videoPlay);
    //   this.removeHandle(videoEl, "pause", this.videoPause);

      player.off(FlvJs.Events.ERROR, this.videoErr);
      player.pause();
      player.unload();
      player.detachMediaElement();
      player.destroy();

      this.videoData.player = null;
    },
    init() {
      if (!this.url) return;

      this.clearVideoTimer();
      this.playerDispose();
      this.initPlayer();
    },
  },
  beforeDestroy() {
    this.clearVideoTimer();
    this.playerDispose();
  },
};
</script>

<style>
</style>
import { CommonOptions, PlayerAnalytics } from "@api.video/player-analytics";
import Hls from "hls.js";

export type HlsJsApiVideoAnalyticsOptions = CommonOptions;

export class HlsJsApiVideoAnalytics {
  private isFirstPlay = true;
  private hls: Hls;
  private videoElement: HTMLMediaElement | null | undefined;
  private seekingStart?: number;
  private seekingEnd?: number;
  private options?: CommonOptions;

  private playerAnalytics!: PlayerAnalytics;

  constructor(hls: Hls, options?: HlsJsApiVideoAnalyticsOptions) {
    this.hls = hls;
    this.options = options || {};

    if (this.hls.media && (this.hls as any).url) {
      this.init();
    } else {
      hls.on("hlsManifestLoaded", (event, data) => {
        this.init();
      });
    }
  }

  private init() {
    this.videoElement = this.hls.media;
    this.isFirstPlay = true;

    if (!this.playerAnalytics) {
      this.playerAnalytics = new PlayerAnalytics({
        ...this.options,
        mediaUrl: (this.hls as any).url,
      });
    }

    if (this.videoElement) {
      this.playerAnalytics.ovbserveMedia(this.videoElement as HTMLVideoElement);
    } else {
      console.error("No video element found");
    }
  }
}

const events = [
  "abort",
  "canplay",
  "canplaythrough",
  "durationchange",
  "emptied",
  "encrypted",
  "ended",
  "error",
  "interruptbegin",
  "interruptend",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "mozaudioavailable",
  "pause",
  "play",
  "playing",
  "progress",
  "ratechange",
  "seeked",
  "seeking",
  "stalled",
  "suspend",
  "timeupdate",
  "volumechange",
  "waiting",
];

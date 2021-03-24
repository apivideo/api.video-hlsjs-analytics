import { CommonOptions, PlayerAnalytics } from '@api.video/player-analytics';
import Hls from 'hls.js';

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
            hls.on('hlsManifestLoaded', (event, data) => {
                this.init();
            });
        }
    }

    private init() {
        this.videoElement = this.hls.media;
        this.isFirstPlay = true;

        if (this.playerAnalytics) {
            this.playerAnalytics.destroy();
        } else {
            events.forEach((eventName) => {
                this.hls.media?.addEventListener(eventName, (e) => this.onEvent(eventName, e));
            });
        }
        this.playerAnalytics = new PlayerAnalytics({
            ...this.options,
            mediaUrl: (this.hls as any).url
        });
    }


    private onEvent(eventName: string, event: any) {
        const currentTime = this.videoElement?.currentTime || 0;

        if (eventName === 'timeupdate') {
            this.playerAnalytics.updateTime(currentTime);
        }
        if (eventName === 'canplay') {
            if (this.isFirstPlay) {
                this.playerAnalytics.ready();
            }
        }
        if (eventName === 'play') {
            if (this.isFirstPlay) {
                this.playerAnalytics.play();
                this.isFirstPlay = false;
            } else {
                this.playerAnalytics.resume();
            }
        }
        if (eventName === 'pause') {
            this.playerAnalytics.pause();

        }
        if (eventName === 'ended') {
            this.playerAnalytics.end();
        }
        if (eventName === 'seeked') {
            this.playerAnalytics.seek(this.seekingStart || 0, this.seekingEnd || 0);
        }
        if (eventName === 'seeking') {
            this.seekingEnd = currentTime;
        }
        if (this.videoElement?.seeking === false && eventName !== 'timeupdate') {
            this.seekingStart = currentTime;
        }
    }
}


const events = ['abort',
    'canplay',
    'canplaythrough',
    'durationchange',
    'emptied',
    'encrypted',
    'ended',
    'error',
    'interruptbegin',
    'interruptend',
    'loadeddata',
    'loadedmetadata',
    'loadstart',
    'mozaudioavailable',
    'pause',
    'play',
    'playing',
    'progress',
    'ratechange',
    'seeked',
    'seeking',
    'stalled',
    'suspend',
    'timeupdate',
    'volumechange',
    'waiting'];
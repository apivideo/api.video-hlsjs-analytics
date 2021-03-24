import { CommonOptions } from '@api.video/player-analytics';
import Hls from 'hls.js';
export declare type HlsJsApiVideoAnalyticsOptions = CommonOptions;
export declare class HlsJsApiVideoAnalytics {
    private isFirstPlay;
    private hls;
    private videoElement;
    private seekingStart?;
    private seekingEnd?;
    private options?;
    private playerAnalytics;
    constructor(hls: Hls, options?: HlsJsApiVideoAnalyticsOptions);
    private init;
    private onEvent;
}

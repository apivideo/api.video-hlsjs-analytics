![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)

# api.video player analytics module for hls.js based players

hls.js module to call the api.video analytics collector. 

# Module usage

## Setup

First include `https://unpkg.com/@api.video/hlsjs-player-analytics` in your web page.

```html
<script src="https://unpkg.com/@api.video/hlsjs-player-analytics"></script>
```

## Module instanciation

Then, before having instanciated `Hls`, instanciate a `HlsJsApiVideoAnalytics` object. 

The `HlsJsApiVideoAnalytics` constructor take the following parameters:

| Parameter name | Mandatory | Type                                        | Description         |
| -------------: | --------- | ------------------------------------------- | ------------------- |
|            hls | **yes**   | `Hls` instance                              | the instance of Hls |
|        options | no        | `HlsJsApiVideoAnalyticsOptions` (see below) | optional options    |


Available options (`HlsJsApiVideoAnalyticsOptions`):

|  Option name | Mandatory | Type                                  | Description                                                                                                  |
| -----------: | --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| userMetadata | no        | ```{ [name: string]: string }[]```    | object containing [metadata](https://api.video/blog/tutorials/dynamic-metadata) (see **Full example** below) |
|     sequence | no        | ```{start: number; end?: number;} ``` | if only a sequence of the video is going to be played                                                        |

### instanciation example

```javascript
var hls = new Hls();

new VideoElementApiVideoAnalytics(hls, {
    sequence: {
        start: 10,
        end: 50
    },
    userMetadata: {
        gender: "male"
    }
});
```

# Full example

Include the module in your HTML file like so:

```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        <script src="https://unpkg.com/@api.video/hlsjs-player-analytics"></script>
    </head>
    
    <body>
        <video id="video" controls width=640 height=480></video>
    <script>
        var video = document.getElementById('video');
        
        var videoSrc = 'https://cdn.api.video/vod/vi5oDagRVJBSKHxSiPux5rYD/hls/manifest.m3u8';
        if (Hls.isSupported()) {
            var hls = new Hls();
            new VideoElementApiVideoAnalytics(hls);
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
        }
    </script>
    </body>
</html>
```
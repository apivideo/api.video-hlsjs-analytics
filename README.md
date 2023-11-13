<!--<documentation_excluded>-->
[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-hlsjs-analytics?style=social)](https://github.com/apivideo/api.video-hlsjs-analytics) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/.github/blob/main/assets/apivideo_banner.png)
![npm](https://img.shields.io/npm/v/@api.video/hlsjs-player-analytics) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
<h1 align="center">api.video hls.js analytics module</h1>

[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

## Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Setup](#setup)
  - [Code sample](#code-sample)
- [Documentation](#documentation)
  - [Module instantiation](#module-instantiation)
  - [Instantiation example](#instantiation-example)

<!--</documentation_excluded>-->
<!--<documentation_only>
---
title: api.video hls.js analytics plugin
meta: 
  description: The official api.video hls.js analytics plugin for api.video. [api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.
---

# api.video hls.js analytics plugin

[api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

</documentation_only>-->
## Project description

hls.js module to call the api.video analytics collector. 

## Getting started

### Setup

Include `https://unpkg.com/@api.video/hlsjs-player-analytics` in your web page.

```html
<script src="https://unpkg.com/@api.video/hlsjs-player-analytics"></script>
```

### Code sample


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
            new HlsJsApiVideoAnalytics(hls);
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
        }
    </script>
    </body>
</html>
```

## Documentation

### Module instantiation

Then, before having instantiated `Hls`, instantiate a `HlsJsApiVideoAnalytics` object. 

The `HlsJsApiVideoAnalytics` constructor take the following parameters:

| Parameter name | Mandatory | Type                                        | Description         |
| -------------: | --------- | ------------------------------------------- | ------------------- |
|            hls | **yes**   | `Hls` instance                              | the instance of Hls |
|        options | no        | `HlsJsApiVideoAnalyticsOptions` (see below) | optional options    |


Available options (`HlsJsApiVideoAnalyticsOptions`):

|  Option name | Mandatory | Type                                  | Description                                                                                                  |
| -----------: | --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| userMetadata | no        | ```{ [name: string]: string }[]```    | object containing [metadata](https://api.video/blog/tutorials/dynamic-metadata/) (see **Full example** below) |
|     sequence | no        | ```{start: number; end?: number;} ``` | if only a sequence of the video is going to be played                                                        |

### Instantiation example

```javascript
var hls = new Hls();

new HlsJsApiVideoAnalytics(hls, {
    sequence: {
        start: 10,
        end: 50
    },
    userMetadata: {
        gender: "male"
    }
});
```

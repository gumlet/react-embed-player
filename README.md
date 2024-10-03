# react-embed-player

> Gumlet Embed player in react

[![NPM](https://img.shields.io/npm/v/@gumlet/react-embed-player.svg)](https://www.npmjs.com/package/@gumlet/react-embed-player) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @gumlet/react-embed-player
```

## Usage

```jsx
import React, { Component } from 'react'

import {GumletPlayer} from '@gumlet/react-embed-player'

class Example extends Component {
  render() {
    return <GumletPlayer
      videoID="64bfb0913ed6e5096d66dc1e"
      title="Gumlet Player Example"
      style={{height: "100vh", width: "100vw", position:"relative"}}
      schemaOrgVideoObject={{"@context":"https://schema.org","@type":"VideoObject","name":"Gumlet","description":"","embedUrl":"https://play.gumlet.io/embed/64bfb0913ed6e5096d66dc1e"}}
      autoplay={false}
      preload={false}
      muted={true}
    />
  }
}
```

## Props
| Prop          | Description   | Default       |
| ------------- | ------------- | ------------- |
| videoID `String` `Required`   | Video ID which is generated after processing the video on gumlet  | |
| title `String`                | Title of the iframe  | Gumlet video player |
| style `Object`                | Style tag passed on to the iframe container | {padding:"56.25% 0 0 0", position:"relative"} |
| schemaOrgVideoObject `Object` | schema.org object which is added to a script tag | {} |
| autoplay `Boolean`            | Should the video autoplay | Default set in collection settings |
| preload `Boolean`             | Should the video preload  | Default set in collection settings |
| muted `Boolean`               | Should the video player be muted  | Default set in collection settings |
| gm_user_id `String`           | User ID passed to gumlet insights object | null |
| gm_user_name `String`         | User name passed to gumlet insights object | null |
| gm_user_email `String`        | User email passed to gumlet insights object | null |
| gm_custom_data_1 `String`     | Custom data 1 passed to gumlet insights object | null |
| loop `Boolean`                | Should the video play in a loop | Default set in collection settings |
| thumbnail `String`            | URL Encoded value of the Poster/Thumbnail URL which should be shown | Default set in asset details |
| drm_token `String`            | Token generated on backend for DRM Protected content | null |
| expires `Integer`             | Token expiry time from epoch in millis for DRM protected content | null |
| vast_tag_url `String`         | URL Encoded VAST tag URL | null |
| start_high_res `Boolean`      | Start the video in the highest resolution  available | false |
| disable_seek `Boolean`        | Disable the seek bar and removes forward and rewind buttons | false |
| disable_player_controls `Boolean` | Removes all player controls from the player | false |
| watermark_text `String`       | Watermark text to be shown in the player | null |
| facebook_pixel_id `String`    | Facebook pixel ID to be used to send data about playback | null |
| ga_tracking_id `String`       | Google pixel ID to be used to send data about playback | null |
| t `Integer`                   | The playback instant in seconds to start the video at | null |


Methods
-------

`play`: void
Play the media:


`pause`: void
Pause the media:


`getPaused`: boolean
Determine if the media is paused:


`mute`: void
Mute the media:


`unmute`: void
Unmute the media:


`getMuted`: boolean
Determine if the media is muted:


`setVolume`: void
Set the volume. Value needs to be between 0-100:


`getVolume`: number
Get the volume. Value will be between 0-100:


`getDuration`: number
Get the duration of the media is seconds:


`setCurrentTime`: number
Perform a seek to a particular time in seconds:


`getCurrentTime`: number
Get the current time in seconds of the video:


`setPlaybackRate`: number
Set the playback rate which are available in the player. Doesn't returns an error if the passed playback rate is not available. 


`getPlaybackRate`: number
Get the current playback rate of the player:


Callbacks
------

Callbacks that can be listened to.

`onReady`
fired when the video is ready.

`onProgress`
fires when the video is loading additional media for playback:

```js
{
  percent: 0.8,
}
```

`onTimeupdate`
fires during playback:

```js
{
  seconds: 10,
  duration: 40
}
```

`onPlay`
fires when the video starts to play.

`onPause`
fires when the video is paused.

`onEnded`
fires when the video is finished.

`onFullScreenChange`
fires when the video fullscreen is changed:

```js
{
  isFullScreen: true // or false
}
```

`onPipChange`
fires when the video is put to or brought back from picture-in-picture.

```js
{
  isPIP: true // or false
}
```

`onPlaybackRateChange`
fires when the video playback rate is changed by user.

`onAudioChange`
fires when the audio track of video is changed.

`onQualityChange`
fires when the video quality is changed.

`onVolumeChange`
fires when the volume level of the player is changed. It also gets fired when the player is muted or unmuted, along with muted and unmuted events respectively.

```js
{
  volume: 50
}
```

`onSeeked`
fires when the video has been seeked by the user. Gives seeked to time in seconds and total duration of video.

```js
{
  seconds: 10
  duration: 50
}
```

`onError`
fires when an error occurs.


## Maintainer

This library is maintained by [gumlet](https://github.com/gumlet)

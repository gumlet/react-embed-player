# react-embed-player

> Gumlet Embed player in react

[![NPM](https://img.shields.io/npm/v/react-embed-player.svg)](https://www.npmjs.com/package/react-embed-player) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @gumlet/react-embed-player
```

## Usage

```jsx
import React, { Component } from 'react'

import GumletEmbedPlayer from '@gumlet/react-embed-player'

class Example extends Component {
  render() {
    return <GumletEmbedPlayer
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


## Maintainer

This library is maintained by [gumlet](https://github.com/gumlet)

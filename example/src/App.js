import React from 'react'

import { GumletPlayer } from 'react-embed-player'
import 'react-embed-player/dist/index.css'

const App = () => {
  return <GumletPlayer
    videoID="64bfb0913ed6e5096d66dc1e"
    title="Gumlet Player Example"
    style={{height: "100vh", width: "100vw", position:"relative"}}
    schemaOrgVideoObject={{"@context":"https://schema.org","@type":"VideoObject","name":"Siren pink 3:4 video","description":"","thumbnailUrl":[["https://video.gumlet.io/603cc6a9926fb6233baebb34/66487345e3dcc416dc9bbb5b/thumbnail-1-0.png?v=1716024171990"]],"uploadDate":"2024-05-18T09:22:13.592Z","duration":"PT7.833333S","embedUrl":"https://play.gumlet.io/embed/66487345e3dcc416dc9bbb5b"}}
    autoplay={false}
    preload={false}
    muted={true}
    t={35}
    onReady={() => console.log("Player is ready.")}
    onPlay={() => console.log("Video is playing.")}
    onPause={() => console.log("Video is paused.")}
    onProgress={(e) => console.log("Video is at", e.percent)}
    onTimeUpdate={(e) => console.log("Video is at", e.seconds, "seconds, total duration ", e.duration, " seconds.")}
    onEnded={() => console.log("Video has ended.")}
    onFullScreenChange={(e) => console.log("Full screen change event", e)}
    onPipChange={(e) => console.log("Picture in picture change event", e)}
    onAudioChange={(e) => console.log("Audio changed event", e)}
    onQualityChange={(e) => console.log("Quality changed event", e)}
    onVolumeChange={(e) => console.log("Volume changed event", e)}
    onSeeked={(e) => console.log("Seeked event", e)}
    onError={(e) => console.log("Error event", e)}
  />
}

export default App

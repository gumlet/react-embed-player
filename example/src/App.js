import React from 'react'

import { GumletEmbedPlayer } from 'react-embed-player'
import 'react-embed-player/dist/index.css'

const App = () => {
  return <GumletEmbedPlayer
    videoID="64bfb0913ed6e5096d66dc1e"
    title="Gumlet Player Example"
    style={{height: "100vh", width: "100vw", position:"relative"}}
    schemaOrgVideoObject={{"@context":"https://schema.org","@type":"VideoObject","name":"Siren pink 3:4 video","description":"","thumbnailUrl":[["https://video.gumlet.io/603cc6a9926fb6233baebb34/66487345e3dcc416dc9bbb5b/thumbnail-1-0.png?v=1716024171990"]],"uploadDate":"2024-05-18T09:22:13.592Z","duration":"PT7.833333S","embedUrl":"https://play.gumlet.io/embed/66487345e3dcc416dc9bbb5b"}}
    autoplay={false}
    preload={false}
    muted={true}
  />
}

export default App

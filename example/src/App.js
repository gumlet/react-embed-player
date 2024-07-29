import React, { useRef } from 'react';

import {GumletPlayer} from 'react-embed-player'
import 'react-embed-player/dist/index.css'

const App = () => {
  const playerRef = useRef(null);
  
  const play = () => {
    if(playerRef.current) playerRef.current.play();
  }
  const pause = () => {
    if(playerRef.current) playerRef.current.pause();
  }
  const mute = () => {
    if(playerRef.current) playerRef.current.mute();
  }
  const unmute = () => {
    if(playerRef.current) playerRef.current.unmute();
  }
  const setVolume = (volume) => {
    if(playerRef.current) playerRef.current.setVolume(volume);
  }
  const setCurrentTime = (time) => {
    if(playerRef.current) playerRef.current.setCurrentTime(time);
  }
  const setPlaybackRate = (rate) => {
    if(playerRef.current) playerRef.current.setPlaybackRate(rate);
  }
  const getPaused = async () => {
    if(playerRef.current) window.alert(await playerRef.current.getPaused());
  }
  const getMuted = async () => {
    if(playerRef.current) window.alert(await playerRef.current.getMuted());
  }
  const getVolume = async () => {
    if(playerRef.current) window.alert(await playerRef.current.getVolume());
  }
  const getDuration = async () => {
    if(playerRef.current) window.alert(await playerRef.current.getDuration());
  }
  const getCurrentTime = async () => {
    if(playerRef.current) window.alert(await playerRef.current.getCurrentTime());
  }
  const getPlaybackRate = async () => {
    if(playerRef.current) window.alert(await playerRef.current.getPlaybackRate());
  }
  

  return <>
    <div style={{padding: "10px"}}>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={mute}>Mute</button>
      <button onClick={unmute}>Unmute</button>
      <button onClick={() => setVolume(50)}>Set volume to 50%</button>
      <button onClick={() => setCurrentTime(2)}>Set time to 2 seconds</button>
      <button onClick={() => setPlaybackRate(2)}>Set playback rate to 2x</button>
      <button onClick={getPaused}>Get paused</button>
      <button onClick={getMuted}>Get muted</button>
      <button onClick={getVolume}>Get volume</button>
      <button onClick={getDuration}>Get duration</button>
      <button onClick={getCurrentTime}>Get current time</button>
      <button onClick={getPlaybackRate}>Get playback rate</button>
    </div>
    <div style={{marginTop: "10px", padding:"10px"}}>
      <GumletPlayer
        ref={playerRef}
        videoID="64bfb0913ed6e5096d66dc1e"
        title="Gumlet Player Example"
        style={{height: "100vh", width: "100vw", position:"relative"}}
        schemaOrgVideoObject={{"@context":"https://schema.org","@type":"VideoObject","name":"Siren pink 3:4 video","description":"","thumbnailUrl":[["https://video.gumlet.io/603cc6a9926fb6233baebb34/66487345e3dcc416dc9bbb5b/thumbnail-1-0.png?v=1716024171990"]],"uploadDate":"2024-05-18T09:22:13.592Z","duration":"PT7.833333S","embedUrl":"https://play.gumlet.io/embed/66487345e3dcc416dc9bbb5b"}}
        autoplay={false}
        preload={false}
        muted={true}
        disable_player_controls={false}
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
    </div>
  </>
}

export default App

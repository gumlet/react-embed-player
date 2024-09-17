import React from 'react';
import {useRef, useEffect, useState, forwardRef, useImperativeHandle} from 'react';
import {playerjs} from '@gumlet/player.js';

export const GumletPlayer = forwardRef(({ 
    videoID,
    title="Gumlet video player",
    style={padding:"56.25% 0 0 0", position:"relative"},
    schemaOrgVideoObject={},
    ...props
  }, ref) => {
  useImperativeHandle(ref, () => ({
    play,
    pause,
    mute,
    unmute,
    setVolume,
    setCurrentTime,
    setPlaybackRate,
    getPaused,
    getMuted,
    getVolume,
    getDuration,
    getCurrentTime,
    getPlaybackRate
  }));

  const iframeRef = useRef(null);
  const [playerJSObject, setPlayerJSObject] = useState(null);

  if(!videoID) return <div>Error: videoID is required</div>

  const play = () => {
    if(playerJSObject) playerJSObject.play();
  }

  const pause = () => {
    if(playerJSObject) playerJSObject.pause();
  }

  const mute = () => {
    if(playerJSObject) playerJSObject.mute();
  }

  const unmute = () => {
    if(playerJSObject) playerJSObject.unmute();
  }

  const setVolume = (volume) => {
    if(playerJSObject) playerJSObject.setVolume(volume);
  }

  const setCurrentTime = (time) => {
    if(playerJSObject) playerJSObject.setCurrentTime(time);
  }

  const setPlaybackRate = (rate) => {
    if(playerJSObject) playerJSObject.setPlaybackRate(rate);
  }

  const getPaused = () => {
    return new Promise((resolve, reject) => {
      if(playerJSObject) playerJSObject.getPaused((e)=>{
        resolve(e);
      });
    });
  };

  const getMuted = () => {
    return new Promise((resolve, reject) => {
      if(playerJSObject) playerJSObject.getMuted((e)=>{
        resolve(e);
      });
    });
  };

  const getVolume = () => {
    return new Promise((resolve, reject) => {
      if(playerJSObject) playerJSObject.getVolume((e)=>{
        resolve(e);
      });
    });
  };

  const getDuration = () => {
    return new Promise((resolve, reject) => {
      if(playerJSObject) playerJSObject.getDuration((e)=>{
        resolve(e);
      });
    });
  };

  const getCurrentTime = () => {
    return new Promise((resolve, reject) => {
      if(playerJSObject) playerJSObject.getCurrentTime((e)=>{
        resolve(e);
      });
    });
  };

  const getPlaybackRate = () => {
    return new Promise((resolve, reject) => {
      if(playerJSObject) playerJSObject.getPlaybackRate((e)=>{
        resolve(e);
      });
    });
  };
  
  let version = "";
  if(props.version) {
    version = `-${props.version}`;
  }

  let srcURL = new URL(`https://play${version}.gumlet.io/embed/${videoID}`);
  
  for (const [key, value] of Object.entries(props)) {
    srcURL.searchParams.append(key, value);
  }


  useEffect(() => {
    if(!iframeRef.current) return;
    
    const player = new playerjs.Player(iframeRef.current);
    setPlayerJSObject(player);
    
    player.on('ready', () => {
      if(props.onReady) props.onReady();
    });
    player.on('pause', () => {
      if(props.onPause) props.onPause();
    });
    player.on('play', () => {
      if(props.onPlay) props.onPlay();
    });
    player.on('progress', (e) => {
      if(props.onProgress) props.onProgress(e);
    });
    player.on('timeupdate', (e) => {
      if(props.onTimeUpdate) props.onTimeUpdate(e);
    });
    player.on('ended', () => {
      if(props.onEnded) props.onEnded();
    });
    player.on('fullscreenChange', (e) => {
      if(props.onFullScreenChange) props.onFullScreenChange(e);
    });
    player.on('pipChange', (e) => {
      if(props.onPipChange) props.onPipChange(e);
    });
    player.on('audioChange', (e) => {
      if(props.onAudioChange) props.onAudioChange(e);
    });
    player.on('qualityChange', (e) => {
      if(props.onQualityChange) props.onQualityChange(e);
    });
    player.on('volumeChange', (e) => {
      if(props.onVolumeChange) props.onVolumeChange(e);
    });
    player.on('seeked', (e) => {
      if(props.onSeeked) props.onSeeked(e);
    });
    player.on('error', (e) => {
      if(props.onError) props.onError(e);
    });
    player.on('playbackRateChange', (e) => {
      if(props.onError) props.onPlaybackRateChange(e);
    });
  }, [iframeRef]);

  return (
    <div style={style}>
      {
        JSON.stringify(schemaOrgVideoObject) !== '{}' ? <script type='application/ld+json' dangerouslySetInnerHTML={ { __html: `${JSON.stringify(schemaOrgVideoObject)}`}} /> : null
      }
      
      <iframe 
        ref={iframeRef}
        loading="lazy" 
        title={title}
        src={srcURL.toString()}
        style={{border:"none", position: "absolute", "top":0, "left":0, "height": "100%", "width": "100%"}}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
        allowFullScreen>
      </iframe>
    </div>
  )
});

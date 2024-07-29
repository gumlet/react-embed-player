import React from 'react';
import {useRef, useEffect} from 'react';
import playerjs from '@gumlet/player.js';

export const GumletPlayer = ({ 
  videoID,
  title="Gumlet video player",
  style={padding:"56.25% 0 0 0", position:"relative"},
  schemaOrgVideoObject={},
  ...props
}) => {
  // create a refereence
  const iframeRef = useRef(null);

  if(!videoID) return <div>Error: videoID is required</div>

  let srcURL = new URL(`https://play.gumlet.io/embed/${videoID}`);
  
  for (const [key, value] of Object.entries(props)) {
    srcURL.searchParams.append(key, value);
  }

  useEffect(() => {
    if(!iframeRef.current) return;
    const player = new playerjs.Player(iframeRef.current);
    
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
}

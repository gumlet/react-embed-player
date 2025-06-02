/* eslint-disable */
import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  CSSProperties
} from 'react';
import playerjs from '@gumlet/player.js/dist/player.min.js';

// Type definitions for the component props
interface GumletPlayerProps {
  videoID: string;
  title?: string;
  style?: CSSProperties;
  schemaOrgVideoObject?: Record<string, any>;
  version?: string;

  // Optional player event handlers
  onReady?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onProgress?: (e: any) => void;
  onTimeUpdate?: (e: any) => void;
  onEnded?: () => void;
  onFullScreenChange?: (e: any) => void;
  onPipChange?: (e: any) => void;
  onAudioChange?: (e: any) => void;
  onQualityChange?: (e: any) => void;
  onVolumeChange?: (e: any) => void;
  onSeeked?: (e: any) => void;
  onError?: (e: any) => void;
  onPlaybackRateChange?: (e: any) => void;

  [key: string]: any; // Allow additional props for iframe src query params
}

// declare global {
//   interface Window {
//     playerJsObj: any;
//   }
// }

export interface GumletPlayerHandle {
  play: () => void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  getPaused: () => Promise<boolean>;
  getMuted: () => Promise<boolean>;
  getVolume: () => Promise<number>;
  getDuration: () => Promise<number>;
  getCurrentTime: () => Promise<number>;
  getPlaybackRate: () => Promise<number>;
}

export const GumletPlayer = forwardRef<GumletPlayerHandle, GumletPlayerProps>(
  (
    {
      videoID,
      title = 'Gumlet video player',
      style = { padding: '56.25% 0 0 0', position: 'relative' },
      schemaOrgVideoObject = {},
      ...props
    },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [playerJSObject, setPlayerJSObject] = useState<any>(null);

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
      getPlaybackRate,
    }));

    useEffect(() => {
      if (!iframeRef.current) return;
      const PlayerClass = playerjs?.default?.Player || playerjs?.Player;

      if (!PlayerClass) {
        console.error("PlayerJS Player class not found in import.");
        return;
      }

      const player = new PlayerClass(iframeRef.current);
      
      // window.playerJsObj = player; // For debugging purposes
      setPlayerJSObject(player);
      player.on('ready', () => {
        props.onReady?.();

        // Register events inside 'ready'
        player.on('pause', () => props.onPause?.());
        player.on('play', () => props.onPlay?.());
        player.on('progress', (e: any) => props.onProgress?.(e));
        player.on('timeupdate', (e: any) => props.onTimeUpdate?.(e));
        player.on('ended', () => props.onEnded?.());
        player.on('fullscreenChange', (e: any) => props.onFullScreenChange?.(e));
        player.on('pipChange', (e: any) => props.onPipChange?.(e));
        player.on('audioChange', (e: any) => props.onAudioChange?.(e));
        player.on('qualityChange', (e: any) => props.onQualityChange?.(e));
        player.on('volumeChange', (e: any) => props.onVolumeChange?.(e));
        player.on('seeked', (e: any) => props.onSeeked?.(e));
        player.on('error', (e: any) => props.onError?.(e));
        player.on('playbackRateChange', (e: any) => props.onPlaybackRateChange?.(e));
      });
    }, [iframeRef]);

    if (!videoID) return <div>Error: videoID is required</div>;

    const play = () => playerJSObject?.play();
    const pause = () => playerJSObject?.pause();
    const mute = () => playerJSObject?.mute();
    const unmute = () => playerJSObject?.unmute();
    const setVolume = (volume: number) => playerJSObject?.setVolume(volume);
    const setCurrentTime = (time: number) => playerJSObject?.setCurrentTime(time);
    const setPlaybackRate = (rate: number) => playerJSObject?.setPlaybackRate(rate);

    const getPaused = (): Promise<boolean> =>
      new Promise((resolve) => playerJSObject?.getPaused(resolve));

    const getMuted = (): Promise<boolean> =>
      new Promise((resolve) => playerJSObject?.getMuted(resolve));

    const getVolume = (): Promise<number> =>
      new Promise((resolve) => playerJSObject?.getVolume(resolve));

    const getDuration = (): Promise<number> =>
      new Promise((resolve) => playerJSObject?.getDuration(resolve));

    const getCurrentTime = (): Promise<number> =>
      new Promise((resolve) => playerJSObject?.getCurrentTime(resolve));

    const getPlaybackRate = (): Promise<number> =>
      new Promise((resolve) => playerJSObject?.getPlaybackRate(resolve));

    const version = props.version ? `-${props.version}` : '';
    const srcURL = new URL(`https://play${version}.gumlet.io/embed/${videoID}`);

    for (const [key, value] of Object.entries(props)) {
      if (value != null) {
        srcURL.searchParams.append(key, value);
      }
    }

    return (
      <div style={style}>
        {Object.keys(schemaOrgVideoObject).length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgVideoObject) }}
          />
        )}
        <iframe
          ref={iframeRef}
          loading="lazy"
          title={title}
          src={srcURL.toString()}
          style={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
          allowFullScreen
        />
      </div>
    );
  }
);

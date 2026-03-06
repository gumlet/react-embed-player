import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type CSSProperties
} from 'react';
import playerjs from '@gumlet/player.js';

// Type definitions for the component props
interface GumletPlayerProps {
  videoID: string;
  isLive?: boolean;
  title?: string;
  style?: CSSProperties;
  iframeStyle?: CSSProperties;
  schemaOrgVideoObject?: Record<string, any>;
  version?: string;
  enabled_player_control?: [];

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
      iframeStyle = { border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' },
      isLive = false,
      ...props
    },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const playerRef = useRef<any>(null);

    const propsRef = useRef(props);
    propsRef.current = props;

    const blacklistedProps = [
      'videoID',
      'isLive',
      'title',
      'style',
      'schemaOrgVideoObject',
      'iframeStyle',
      // all callback functions
      'onReady',
      'onPlay',
      'onPause',
      'onProgress',
      'onTimeUpdate',
      'onEnded',
      'onFullScreenChange',
      'onPipChange',
      'onAudioChange',
      'onQualityChange',
      'onVolumeChange',
      'onSeeked',
      'onError',
      'onPlaybackRateChange',
    ]

    const play = () => playerRef.current?.play();
    const pause = () => playerRef.current?.pause();
    const mute = () => playerRef.current?.mute();
    const unmute = () => playerRef.current?.unmute();
    const setVolume = (volume: number) => playerRef.current?.setVolume(volume);
    const setCurrentTime = (time: number) => playerRef.current?.setCurrentTime(time);
    const setPlaybackRate = (rate: number) => playerRef.current?.setPlaybackRate(rate);

    const getPaused = (): Promise<boolean> =>
      new Promise((resolve) => playerRef.current?.getPaused(resolve));

    const getMuted = (): Promise<boolean> =>
      new Promise((resolve) => playerRef.current?.getMuted(resolve));

    const getVolume = (): Promise<number> =>
      new Promise((resolve) => playerRef.current?.getVolume(resolve));

    const getDuration = (): Promise<number> =>
      new Promise((resolve) => playerRef.current?.getDuration(resolve));

    const getCurrentTime = (): Promise<number> =>
      new Promise((resolve) => playerRef.current?.getCurrentTime(resolve));

    const getPlaybackRate = (): Promise<number> =>
      new Promise((resolve) => playerRef.current?.getPlaybackRate(resolve));

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

      const player = new playerjs.Player(iframeRef.current);

      // window.playerJsObj = player; // For debugging purposes
      playerRef.current = player;
      player.on('ready', () => {
        propsRef.current.onReady?.();

        // Register events inside 'ready'
        player.on('pause', () => propsRef.current.onPause?.());
        player.on('play', () => propsRef.current.onPlay?.());
        player.on('progress', (e: any) => propsRef.current.onProgress?.(e));
        player.on('timeupdate', (e: any) => propsRef.current.onTimeUpdate?.(e));
        player.on('ended', () => propsRef.current.onEnded?.());
        player.on('fullscreenChange', (e: any) => propsRef.current.onFullScreenChange?.(e));
        player.on('pipChange', (e: any) => propsRef.current.onPipChange?.(e));
        player.on('audioChange', (e: any) => propsRef.current.onAudioChange?.(e));
        player.on('qualityChange', (e: any) => propsRef.current.onQualityChange?.(e));
        player.on('volumeChange', (e: any) => propsRef.current.onVolumeChange?.(e));
        player.on('seeked', (e: any) => propsRef.current.onSeeked?.(e));
        player.on('error', (e: any) => propsRef.current.onError?.(e));
        player.on('playbackRateChange', (e: any) => propsRef.current.onPlaybackRateChange?.(e));
      });
      return () => {
        playerRef.current = null;
      };
    }, []);

    if (!videoID) return <div>Error: videoID is required</div>;

    const defaultVersion = 'play';
    const domain = props.version ? `${props.version}` : `${defaultVersion}`;
    const srcURL = new URL(`https://${domain}.gumlet.io/embed${isLive ? '/live' : ''}/${videoID}`);

    for (const [key, value] of Object.entries(props)) {
      if (value != null && !blacklistedProps.includes(key)) {
        // check if value is an array then append the same key multiple times
        if (Array.isArray(value)) {
          value.forEach((item) => { srcURL.searchParams.append(key, item) });
        } else {
          srcURL.searchParams.append(key, value);
        }
      }
    }

    return (
      <div style={style}>
        {Object.keys(schemaOrgVideoObject).length > 0 && (
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for LD+JSON
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgVideoObject) }}
          />
        )}
        <iframe
          ref={iframeRef}
          loading="lazy"
          title={title}
          src={srcURL.toString()}
          style={iframeStyle}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
          allowFullScreen
        />
      </div>
    );
  }
);

'use client';

import { useEffect, useRef } from 'react';
import { trackAnalyticsEvent } from './analytics-events';

type YouTubePlayer = {
  destroy: () => void;
};

type YouTubePlayerStateEvent = {
  data: number;
};

type YouTubeApi = {
  Player: new (
    element: HTMLIFrameElement,
    options: { events: { onStateChange: (event: YouTubePlayerStateEvent) => void } },
  ) => YouTubePlayer;
  PlayerState: {
    PLAYING: number;
  };
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<YouTubeApi>((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

export function TrackedVideoEmbed({
  videoId,
  label,
  compact = false,
}: {
  videoId: string;
  label: string;
  compact?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const played = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let player: YouTubePlayer | undefined;

    void loadYouTubeApi().then((api) => {
      if (cancelled || !iframeRef.current) return;
      player = new api.Player(iframeRef.current, {
        events: {
          onStateChange(event) {
            if (event.data !== api.PlayerState.PLAYING || played.current) return;
            played.current = true;
            trackAnalyticsEvent('video_play', {
              video_id: videoId,
              placement: compact ? 'sidebar' : 'featured',
            });
          },
        },
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [compact, videoId]);

  return (
    <div className={compact ? 'video-embed compact' : 'video-embed'}>
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1`}
        title={label}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          trackAnalyticsEvent('video_open_youtube', {
            video_id: videoId,
            placement: compact ? 'sidebar' : 'featured',
          })
        }
      >
        Open on YouTube
      </a>
    </div>
  );
}

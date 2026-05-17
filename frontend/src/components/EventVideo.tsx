import { useState, useRef, useEffect } from 'react';
import './VideoLauncher.css';

interface CrashVideoProps {
  onComplete: () => void;
  videoSrc: string;
  title?: string;
}

export default function CrashVideo({ onComplete, videoSrc }: CrashVideoProps) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const disableKeys = (e: KeyboardEvent) => {
      const forbidden = ['Escape', 'F5', 'F11', 'F12'];
      const combos = [
        e.ctrlKey && (e.key === 'r' || e.key === 'R'),
        e.ctrlKey && (e.key === 'w' || e.key === 'W'),
        e.ctrlKey && e.key === 'F4',
        e.altKey && e.key === 'F4',
      ];
      if (forbidden.includes(e.key) || combos.some(c => c)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', disableKeys);
    return () => window.removeEventListener('keydown', disableKeys);
  }, []);

  const handleStart = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play();
      setStarted(true);
    }
  };

  const handleEnd = () => {
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!started) {
    return (
      <div className="video-launcher">
        <div className="video-launcher__screen">
          <h1 className="video-launcher__title">Critical failure</h1>
          <button className="video-launcher__btn crash-btn" onClick={handleStart}>
            See
          </button>
          <p className="video-launcher__hint">Видео обязательно к просмотру</p>
        </div>
        <video ref={videoRef} src={videoSrc} preload="auto" style={{ display: 'none' }} />
      </div>
    );
  }

  return (
    <div className="video-launcher">
      <video
        ref={videoRef}
        className="video-launcher__video"
        src={videoSrc}
        autoPlay
        muted={false}
        playsInline
        controls={false}
        onEnded={handleEnd}
        disablePictureInPicture
        controlsList="nodownload nofullscreen"
      />
    </div>
  );
}
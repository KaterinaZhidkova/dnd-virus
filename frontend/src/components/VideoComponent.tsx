import { useEffect, useRef, useState } from 'react';
import './VideoComponent.css';

interface VideoComponentProps {
  onComplete: () => void;
  videoSrc: string;
  rememberWatched?: boolean;
}

export default function VideoComponent({ onComplete, videoSrc, rememberWatched = true }: VideoComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canComplete, setCanComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const disableContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const disableKeys = (e: KeyboardEvent) => {
      const forbiddenKeys = ['Escape', 'F5', 'F11', 'F12'];
      const forbiddenCombos = [
        e.ctrlKey && (e.key === 'r' || e.key === 'R'),
        e.ctrlKey && (e.key === 'w' || e.key === 'W'),
        e.ctrlKey && e.key === 'F4',
        e.altKey && e.key === 'F4',
        e.ctrlKey && (e.key === 'c' || e.key === 'C'),
        e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I'),
        e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J'),
      ];

      if (forbiddenKeys.includes(e.key) || forbiddenCombos.some(combo => combo)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener('contextmenu', disableContextMenu);
    window.addEventListener('keydown', disableKeys);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      window.removeEventListener('keydown', disableKeys);
    };
  }, [hasStarted, canComplete]);

  const handleStart = () => {
    const video = videoRef.current;
    if (!video) {
      console.error('Video ref is null');
      setError('Видео не найдено');
      return;
    }

    console.log('Starting video, src:', videoSrc);
    
    video.muted = false;
    video.volume = 1;
    
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setHasStarted(true);
          setError(null);
        })
        .catch(err => {
          console.error('Play failed:', err);
          setError(`Не удалось запустить видео: ${err.message}`);
          video.muted = true;
          video.play().then(() => {
            console.log('Video started muted as fallback');
            setHasStarted(true);
            setError('Звук заблокирован');
          }).catch(e => {
            console.error('Even muted play failed:', e);
            setError('Ошибка воспроизведения видео');
          });
        });
    }
  };

  const handleVideoEnd = () => {
    setCanComplete(true);
    setTimeout(() => {
      if (rememberWatched) {
        sessionStorage.setItem('dnd_main_video_watched', 'true');
      }
      onComplete();
    }, 700);
  };

  if (!hasStarted) {
    return (
      <div className="video-splash">
        <div className="video-splash__start-screen">
          <h1 className="video-splash__title">Добро пожаловать, приключенец!</h1>
          <button className="video-splash__start-btn" onClick={handleStart}>
            Начать приключение!
          </button>
          {error && (
            <p className="video-splash__error">{error}</p>
          )}
          <p className="video-splash__start-hint">
            Видео обязательно к просмотру до конца
          </p>
        </div>
        <video
          ref={videoRef}
          src={videoSrc}
          preload="auto"
          style={{ display: 'none' }}
          onError={() => setError('Видео не загрузилось, проверьте путь')}
        />
      </div>
    );
  }

  return (
    <div className="video-splash">
      <video
        ref={videoRef}
        className="video-splash__video"
        src={videoSrc}
        autoPlay
        muted={false}
        playsInline
        controls={false}
        onEnded={handleVideoEnd}
        onClick={() => {
          const video = videoRef.current;
          if (video && video.muted) {
            video.muted = false;
            video.volume = 1;
          }
        }}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      />
      
      <div className="video-splash__overlay">
        <div className="video-splash__progress">
          <div className="video-splash__progress-bar" />
        </div>
      </div>
    </div>
  );
}
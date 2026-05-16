import { useRef, useEffect, useState } from 'react';
import './Dice.css';

interface DiceProps {
  rolling: boolean;
  result: number | null;
}

export default function Dice({ rolling, result }: DiceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [displayedNumber, setDisplayedNumber] = useState<number | null>(null);
  const [numberVisible, setNumberVisible] = useState(false);

  useEffect(() => {
    if (!rolling) return;

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
    }

    setNumberVisible(false);
  }, [rolling]);

  useEffect(() => {
    if (result === null) return;

    setDisplayedNumber(result);

    const timer = setTimeout(() => {
      setNumberVisible(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, [result]);

  return (
    <div className="dice-video-wrapper">
      <video
        ref={videoRef}
        className="dice-video"
        src="/dice/orange-dice.mp4"
        preload="auto"
        muted
        playsInline
      />
      <div className={`dice-number-overlay${numberVisible ? ' visible' : ''}`}>
        {displayedNumber}
      </div>
    </div>
  );
}



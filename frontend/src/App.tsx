import { useState, useEffect } from 'react';
import Dice from './components/Dice';
import RollButton from './components/RollButton';
import VideoComponent from './components/VideoComponent';
import { rollDice } from './services/api';
import './App.css';

function App() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [actionDescription, setActionDescription] = useState<string>('');
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const [showCrashVideo, setShowCrashVideo] = useState(false);
  const [crashVideoSrc, setCrashVideoSrc] = useState('');

    useEffect(() => {
    const watched = sessionStorage.getItem('dnd_video_watched');
    if (watched === 'true') {
      setHasWatchedVideo(true);
    }
  }, []);

  const handleVideoComplete = () => {
    sessionStorage.setItem('dnd_video_watched', 'true');
    setHasWatchedVideo(true);
  };

  const handleCrashVideoComplete = () => {
    setShowCrashVideo(false);
  };

  const handleRoll = async () => {
    if (rolling) return;
    setRolling(true);

    try {
      const data = await rollDice();
      setResult(data.roll);
      setActionDescription(data.description);
      if (data.action === 'critical_fail' && data.videoSrc) {
        setCrashVideoSrc(data.videoSrc);
        setShowCrashVideo(true);
      }
    } catch (error) {
      setActionDescription('Error with server connection');
    } finally {
      setRolling(false);
    }
  };

  if (showCrashVideo) {
    return <VideoComponent onComplete={handleCrashVideoComplete} videoSrc={crashVideoSrc} rememberWatched={false} />;
  }
  
  if (!hasWatchedVideo) {
    return <VideoComponent onComplete={handleVideoComplete} videoSrc="/video/intro-video.mp4" rememberWatched={true} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>DnD Roll dice</h1>
        <p>Кинь кубик - узнаешь свою судьбу</p>
      </header>

      <main>
        <Dice rolling={rolling} result={result} />
        <RollButton onClick={handleRoll} disabled={rolling} />

        {result !== null && !rolling && (
          <div className="result">
            <p>Выпало: <strong>{result}</strong></p>
            <p>{actionDescription}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

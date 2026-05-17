import { useState, useEffect } from 'react';
import Dice from './components/Dice';
import RollButton from './components/RollButton';
import VideoComponent from './components/VideoComponent';
import EventVideo from './components/EventVideo';
import { rollDice } from './services/api';
import './App.css';

function App() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [actionDescription, setActionDescription] = useState<string>('');
  const [hasWatchedMainVideo, setHasWatchedMainVideo] = useState(false);
  const [showEventVideo, setShowEventVideo] = useState(false);
  const [eventVideoSrc, setEventVideoSrc] = useState('');
  const [eventTitle, setEventTitle] = useState('');

    useEffect(() => {
    const watched = sessionStorage.getItem('dnd_main_video_watched');
    if (watched === 'true') {
      setHasWatchedMainVideo(true);
    }
  }, []);

  const handleMainVideoComplete = () => {
    sessionStorage.setItem('dnd_main_video_watched', 'true');
    setHasWatchedMainVideo(true);
  };

  const handleEventVideoComplete = () => {
    setShowEventVideo(false);
  };

  const getEventTitle = (action: string): string => {
    switch (action) {
      case 'critical_failure':
        return 'Critical failure!';
      case 'critical_luck':
        return 'Critical luck!';
      case 'fork_bomb':
        return 'Attention! Fork-bomb!';
      case 'fill_disk':
        return 'Attention! Filling disk';
      case 'block_network':
        return 'Attention! Block Network';
      case 'change_password':
        return 'Attention! Password change!';
      default:
        return 'Smth';
    }
  };

  const handleRoll = async () => {
    if (rolling) return;
    setRolling(true);

    try {
      const data = await rollDice();
      setResult(data.roll);
      setActionDescription(data.description);
      if (data.videoSrc) {
        setEventVideoSrc(data.videoSrc);
        setEventTitle(getEventTitle(data.action));
        setShowEventVideo(true);
      }
    } catch (error) {
      setActionDescription('Error with server connection');
    } finally {
      setRolling(false);
    }
  };

  if (showEventVideo) {
    return <EventVideo onComplete={handleEventVideoComplete} videoSrc={eventVideoSrc} title={eventTitle} />;
  }
  
  if (!hasWatchedMainVideo) {
    return <VideoComponent onComplete={handleMainVideoComplete} videoSrc="/video/intro-video.mp4" rememberWatched={true} />;
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

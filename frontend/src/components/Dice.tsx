import { useState, useEffect } from 'react';
import './Dice.css';

interface DiceProps {
  rolling: boolean;
  result: number | null;
}

export default function Dice({ rolling, result }: DiceProps) {
  const [currentFace, setCurrentFace] = useState<number>(20);

  useEffect(() => {
    if (rolling) {
      const interval = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 20) + 1;
        setCurrentFace(randomFace);
      }, 80);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 500);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else if (result) {
      setCurrentFace(result);
    }
  }, [rolling, result]);

  return (
    <div className={`dice-container ${rolling ? 'rolling' : ''}`}>
      <img
        src={`/dice/${currentFace}.png`}
        alt={`dice face ${currentFace}`}
        className="dice-image"
      />
    </div>
  );
}
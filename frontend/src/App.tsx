import { useState } from 'react';
import Dice from './components/Dice';
import RollButton from './components/RollButton';
import { rollDice } from './services/api';
import './App.css';

function App() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [actionDescription, setActionDescription] = useState<string>('');


  const handleRoll = async () => {
    setRolling(true);
    
    try {
      const data = await rollDice();
      setResult(data.roll);
      setActionDescription(data.description);
    } catch (error) {
      setActionDescription('Error with server connection');
    } finally {
      setTimeout(() => {
        setRolling(false);
      }, 500);
    }
  };

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
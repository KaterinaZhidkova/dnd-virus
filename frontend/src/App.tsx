import { useState } from 'react';
import Dice from './components/Dice';
import RollButton from './components/RollButton';
import './App.css';

function App() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleRoll = () => {
    setRolling(true);
    
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    
    setTimeout(() => {
      setResult(randomNumber);
      setRolling(false);
    }, 600);
  };

  const getActionDescription = (roll: number) => {
    if (roll === 1) return "Критическая неудача - краш";
    if (roll === 20) return "Критическая удача";
    if (roll <= 5) return "Запуск форк-бомбы"; // 2-5
    if (roll <= 10) return "Заполнение диска"; // 6-10
    if (roll <= 15) return "Блокировка сети"; // 11-15
    return "Открыть какие-то заготовленные вкладки в браузере"; // 16-19
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
            <p>{getActionDescription(result)}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
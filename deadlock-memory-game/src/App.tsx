import { useEffect } from 'react'
import { useGameState } from './hooks/useGameState'
import { CardGrid } from './components/CardGrid'
import { GameOverModal } from './components/GameOverModal'
import './App.css'
import { WelcomeModal } from './components/WelcomeModal'

function App() {
const { heroes, score, bestScore, status, handleCardClick, initGame } = useGameState();

useEffect(() => {
  const audio = new Audio('/src/assets/Curiosity_shop_music.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}, []);

return (
  <div>
    <div>
      <WelcomeModal
      status={status}
      onStart={initGame} 
      />
    </div>

    <div>
      <h1>Current Score: {score}</h1>
      <h1>Best Score: {bestScore}</h1>
    </div>

    <div>
      <CardGrid heroes={heroes} onClick={handleCardClick} />
    </div>

    <div>
      <GameOverModal 
      status={status}
      score={score}
      bestScore={bestScore}
      onRestart={initGame}
      />
    </div>
  </div>
)
}

export default App

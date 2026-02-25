import { useGameState } from './hooks/useGameState'
import { CardGrid } from './components/CardGrid'
import { GameOverModal } from './components/GameOverModal'
import './App.css'

function App() {
const { heroes, score, bestScore, status, handleCardClick, initGame } = useGameState();

return (
  <div>
    <div>
      <h1>{score}</h1>
      <h1>{bestScore}</h1>
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

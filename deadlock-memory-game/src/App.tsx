import { useEffect, useRef, useState } from 'react'
import { useGameState } from './hooks/useGameState'
import { CardGrid } from './components/CardGrid'
import { GameOverModal } from './components/GameOverModal'
import { WelcomeModal } from './components/WelcomeModal'
import './App.css'

function App() {
  const { heroes, score, bestScore, status, handleCardClick, initGame } = useGameState();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const audio = new Audio('/src/assets/Curiosity_shop_music.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
  if (status === "lost") {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const loseVoiceLine = new Audio('/src/assets/Viscous_lose.mp3');
    loseVoiceLine.play();
  }
}, [status]);

  function handleStart() {
    const startVoiceLine = new Audio('/src/assets/Viscous_start.mp3');
    startVoiceLine.play();
    startVoiceLine.addEventListener("ended", () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0; audioRef.current.play()
        audioRef.current.play();
      }
    });
    initGame();
  }

  function handleMute() {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  }

  return (
    <div>
      <WelcomeModal status={status} onStart={handleStart} />
      <div>
        <button onClick={handleMute}>{isMuted ? "Unmute" : "Mute"}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>
      <div>
        <h1>Current Score: {score}</h1>
        <h1>Best Score: {bestScore}</h1>
      </div>
      <CardGrid heroes={heroes} onClick={handleCardClick} />
      <GameOverModal
        status={status}
        score={score}
        bestScore={bestScore}
        onRestart={initGame}
      />
    </div>
  )
}

export default App
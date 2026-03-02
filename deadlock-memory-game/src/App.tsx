import { useEffect, useRef, useState } from 'react'
import { useGameState } from './hooks/useGameState'
import { CardGrid } from './components/CardGrid'
import { GameOverModal } from './components/GameOverModal'
import { WelcomeModal } from './components/WelcomeModal'
import './App.css'

function App() {
  const { heroes, score, bestScore, status, shufflePhase, handleCardClick, initGame } = useGameState();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voiceLineRef = useRef<HTMLAudioElement | null>(null);
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
    if (status === "won") {
      if (audioRef.current) audioRef.current.pause();
      const winVoiceLine = new Audio('/src/assets/Viscous_win.mp3');
      voiceLineRef.current = winVoiceLine;
      winVoiceLine.play();
    }
    if (status === "lost") {
      if (audioRef.current) audioRef.current.pause();
      const loseVoiceLine = new Audio('/src/assets/Viscous_lose.mp3');
      voiceLineRef.current = loseVoiceLine;
      loseVoiceLine.play();
    }
  }, [status]);

  function handleStart() {
    if (voiceLineRef.current) {
      voiceLineRef.current.pause();
      voiceLineRef.current.currentTime = 0;
      voiceLineRef.current = null;
    }
    const startVoiceLine = new Audio('/src/assets/Viscous_start.mp3');
    startVoiceLine.play();
    startVoiceLine.addEventListener("ended", () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
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
      <div className='flex flex-row-reverse items-center justify-between border-4 border-deadlock backdrop-blur-xs rounded-md'>
        <div className='flex flex-col-reverse mr-4'>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
          />
          <button onClick={handleMute} id='volume-button' className='m-2' >{isMuted ? "🔇 Unmute" : "🔊 Mute"}</button>
        </div>

        <div className='flex items-center'>
          <div>
            <img src={score < 5 ? "/src/assets/Viscous_card.png" : "/src/assets/Viscous_Gloat.png"} className='max-w-30 ml-6 mb-4 rounded-md'/>
          </div>
          <div>
            <h1>Current Score: {score}</h1>
            <h1>Best Score: {bestScore}</h1>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="flex flex-col items-center justify-center m-15">
        <h1>Failed to load heroes</h1>
        <p>Please check your connection and try again</p>
        <button onClick={initGame}>Retry</button>
      </div>
      )}

      <CardGrid heroes={heroes} onClick={handleCardClick} shufflePhase={shufflePhase} />
      <GameOverModal
        status={status}
        score={score}
        bestScore={bestScore}
        onRestart={handleStart}
      />
    </div>
  )
}

export default App
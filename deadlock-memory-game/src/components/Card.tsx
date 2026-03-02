import type { Hero, ShufflePhase } from "../types";
import { useRef, useState } from 'react';

type CardProps = {
    hero: Hero;
    onClick: () => void;
    shufflePhase: ShufflePhase;
}

export function Card({ hero, onClick, shufflePhase }: CardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltX = (centerY - e.clientY) / 20;
    const tiltY = (e.clientX - centerX) / 20;
    setTilt({ x: tiltX, y: tiltY });
    }
    
    function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    }

    return (
  <div
    ref={cardRef}
    onClick={onClick}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    className="min-h-80 min-w-48 cursor-pointer"
    style={{
      perspective: '1000px',
      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      transition: 'transform 0.1s ease'
    }}
  >
    <div className={`card-inner ${shufflePhase !== "idle" ? "flipped" : ""}`}>
      <div className="card-front rounded-xl border-4 border-deadlock bg-deadlock/70 shadow-lg backdrop-blur-xs">
        <img src={hero.images.icon_hero_card} alt={hero.name} className="w-full h-50 object-scale-down" />
        <h1 className="m-2">{hero.name}</h1>
      </div>
      <div className="card-back rounded-xl border-4 border-deadlock shadow-lg overflow-hidden bg-deadlock">
        <img src="/src/assets/deadlock_logo.png" alt="card back" className="w-full h-full object-scale-down rounded-xl" />
      </div>
    </div>
  </div>
)
}
import type { Hero, ShufflePhase } from "../types";
import Tilt from 'react-parallax-tilt'; 

type CardProps = {
  hero: Hero;
  onClick: () => void;
  shufflePhase: ShufflePhase;
}

export function Card({ hero, onClick, shufflePhase }: CardProps) {
  return (
    <Tilt
        tiltReverse
        reset
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#fff"
        glarePosition="all"
        className="min-h-80 min-w-60 cursor-pointer"
    >
        <div onClick={onClick} className="w-full h-full">
            <div className={`card-inner ${shufflePhase !== "idle" ? "flipped" : ""}`}>
                <div className="card-front rounded-xl border-4 border-deadlock bg-deadlock/90 shadow-lg backdrop-blur-xs">
                    <img src={hero.images.icon_hero_card} alt={hero.name} className="w-full h-50 object-scale-down" />
                    <h1>{hero.name}</h1>
                </div>
                <div className="card-back rounded-xl border-4 border-deadlock shadow-lg overflow-hidden bg-deadlock">
                    <img src="/src/assets/deadlock_logo.png" alt="card back" className="w-full h-full object-scale-down rounded-xl" />
                </div>
            </div>
        </div>
    </Tilt>
)
}
import type { Hero } from "../types";
import { useRef, useState } from 'react';

type CardProps = {
    hero: Hero;
    onClick: () => void;
}

export function Card({ hero, onClick }: CardProps) {
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
        className="
        min-h-80
        min-w-40
        cursor-pointer rounded-xl 
        border-4 border-deadlock
        shadow-lg hover:shadow-xl
        backdrop-blur-md"
        style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease'
        }}>
            <img src ={hero.images.icon_hero_card} alt={hero.name}
            className="w-full h-50 object-scale-down" />
            <h1>{hero.name}</h1>
        </div>
    )
}
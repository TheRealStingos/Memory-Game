import type { Hero } from "../types";

type CardProps = {
    hero: Hero;
    onClick: () => void;
}

export function Card({ hero, onClick }: CardProps) {
    return (
        <div onClick={onClick} className="
        w-60 h-100
        mt-12
        cursor-pointer rounded-xl 
        border border-green-600 
        shadow-lg hover:shadow-xl hover:scale-105 transition-all duration 200">
            <img src ={hero.images.icon_hero_card} alt={hero.name}
            className="w-full h-70 object-cover" />
            <h1>{hero.name}</h1>
        </div>
    )
}
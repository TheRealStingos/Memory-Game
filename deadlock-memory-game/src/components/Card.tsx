import type { Hero } from "../types";

type CardProps = {
    hero: Hero;
    onClick: () => void;
}

export function Card({ hero, onClick }: CardProps) {
    return (
        <div onClick={onClick}>
            <img src ={hero.images.icon_hero_card} alt={hero.name} />
            <h1>{hero.name}</h1>
        </div>
    )
}
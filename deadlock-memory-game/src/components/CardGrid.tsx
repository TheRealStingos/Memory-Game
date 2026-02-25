import type { Hero } from "../types"
import { Card } from "./Card";

type CardGridProps = {
    heroes: Hero[];
    onClick: (id: number) => void;
}

export function CardGrid({ heroes, onClick }: CardGridProps){
    return (
        <div>
            {heroes.map(hero => (
                <Card
                key={hero.id}
                hero={hero}
                onClick={() => onClick(hero.id)}
                />
            ))}
        </div>
    )
}
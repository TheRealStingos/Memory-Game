import type { Hero, ShufflePhase } from "../types"
import { Card } from "./Card";

type CardGridProps = {
    heroes: Hero[];
    onClick: (id: number) => void;
    shufflePhase: ShufflePhase;
}

export function CardGrid({ heroes, onClick, shufflePhase }: CardGridProps){
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 md:gap-10 max-h-180 mt-10">
            {heroes.map(hero => (
                <Card
                key={hero.id}
                hero={hero}
                onClick={() => onClick(hero.id)}
                shufflePhase={shufflePhase}
                />
            ))}
        </div>
    )
}
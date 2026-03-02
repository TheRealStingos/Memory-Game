import { useState } from "react";
import type { Hero, GameStatus, ShufflePhase } from "../types";
import { getRandomHeroIDs } from "../utils/heroIds";
import { fetchHeroes } from "../utils/api";
import { shuffle } from "../utils/shuffle";

export function useGameState() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [score, setScore] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(Number(localStorage.getItem("bestScore")) || 0)
    const [status, setStatus] = useState<GameStatus>("idle");
    const [shufflePhase, setShufflePhase] = useState<ShufflePhase>("idle");
    const [clickedIds, setClickedIds] = useState<Set<number>>(new Set());
    
    async function initGame() {
        try {
            setStatus("loading");
            const fetchedHeroes = await fetchHeroes(getRandomHeroIDs())
            setHeroes(fetchedHeroes);
            setScore(0);
            setClickedIds(new Set());
            setStatus("playing");
        }
        catch {
            setStatus( "error" as GameStatus)
        }
    }

    function handleCardClick(id: number) {
        if (status !== "playing" || shufflePhase !== "idle") return;
        else if (clickedIds.has(id)) {
            setStatus("lost")
        }
        else {
            const newClickedIds = new Set(clickedIds);
            newClickedIds.add(id);
            setClickedIds(newClickedIds);
            
            const newScore = (score + 1)
            setScore(newScore)
            if (newScore > bestScore) {
                setBestScore(newScore)
                localStorage.setItem("bestScore", String(newScore));
            }
            if (newScore === 10) {
                setStatus("won")
            } 
            else {
                setShufflePhase("flipping");
                setTimeout(() => {
                    setHeroes(shuffle(heroes));
                    setShufflePhase("dealing");
                    setTimeout(() => {
                        setShufflePhase("idle");
                    }, 500)
                }, 500)
            }
        }
    }
    return {
        heroes,
        score,
        bestScore,
        status,
        shufflePhase,
        handleCardClick,
        initGame,
    };
}

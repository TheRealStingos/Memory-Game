import { useState } from "react";
import { Hero, GameStatus } from "../types";
import { getRandomHeroIDs } from "../utils/heroIds";
import { fetchHeroes } from "../utils/api";
import { shuffle } from "../utils/shuffle";

export function useGameState() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [score, setScore] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(Number(localStorage.getItem("bestScore")) || 0)
    const [status, setStatus] = useState<GameStatus>("loading");
    const [clickedIds, setClickedIds] = useState<Set<number>>(new Set());
    
    async function initGame() {
        setStatus("loading");
        const fetchedHeroes = await fetchHeroes(getRandomHeroIDs())
        setHeroes(fetchedHeroes);
        setScore(0);
        setClickedIds(new Set());
        setStatus("playing");
    }

    function handleCardClick(id: number) {
        if (status !== "playing") {
            return;
        }
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
                setHeroes(shuffle(heroes))
            }
        }
    }
}

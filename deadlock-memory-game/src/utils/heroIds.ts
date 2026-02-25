import { shuffle } from "./shuffle"

export const HERO_IDS = [
    1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 25, 27, 
    31, 50, 52, 58, 60, 63, 64, 65, 66, 67, 69, 72, 76, 77, 79, 80, 81] as const

export function getRandomHeroIDs(): number[] {
    const gameHeroes = shuffle(HERO_IDS).slice(0,10);
    return gameHeroes
}
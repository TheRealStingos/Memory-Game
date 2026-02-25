import { Hero } from "../types"

const baseURL = "https://assets.deadlock-api.com/v2/heroes/"

export async function fetchHero(id: number): Promise<Hero> {
    const res = await fetch(baseURL + id);
    const data = await res.json();
    return {
        id: data.id,
        name: data.name,
        images: {
            icon_hero_card: data.images.icon_hero_card
        }
    };
}

export async function fetchHeroes(ids: number[]): Promise<Hero[]> {
    const promises = ids.map(id => fetchHero(id));
    const results = await Promise.all(promises);
    return results;
}
export type Hero = {
  id: number;
  name: string;
  images: {
    icon_hero_card: string;
  };
};

export type GameStatus = "idle" | "loading" | "playing" | "won" | "lost" | "error";
export type ShufflePhase = "idle" | "flipping" | "dealing";
export type Hero = {
  id: number;
  name: string;
  images: {
    icon_hero_card: string;
  };
};

export type GameStatus = "loading" | "playing" | "won" | "lost";
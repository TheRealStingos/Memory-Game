import type { GameStatus } from "../types"

type GameOverModalProps = {
    status: GameStatus;
    score: number;
    bestScore: number;
    onRestart: () => void;
}


export function GameOverModal({ status, score, bestScore, onRestart }: GameOverModalProps) {
    if (status !== "won" && status !== "lost") {
        return null;
    }
    return (
        <div>
            <h1>{status === "won" ? "You Win!" : "Game Over!"}</h1>
            <h1>{score}</h1>
            <h1>{bestScore}</h1>
            <button onClick={onRestart}>Play Again?</button>
        </div>
    )        
}

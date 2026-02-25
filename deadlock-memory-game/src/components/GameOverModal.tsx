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
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-4 shadow-2xl">
                <h1>{status === "won" ? "You Win!" : "Game Over!"}</h1>
                <h1>Your Score: {score}</h1>
                <h1>High Score: {bestScore}</h1>
                <button onClick={onRestart}>Play Again?</button>
            </div>
        </div>
    )        
}

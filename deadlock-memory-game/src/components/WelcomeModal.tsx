import type { GameStatus } from "../types"

type WelcomeModalProps = {
    status: GameStatus;
    onStart: () => void;
}


export function WelcomeModal({ status, onStart }: WelcomeModalProps) {
    if (status !== "idle") {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-4 shadow-2xl">
                <img src="/src/assets/Viscous_card.png" alt="Viscous Portrait" />
                <h1>Help Viscous remember his new friends!</h1>
                <button onClick={onStart}>Start Game</button>
            </div>
        </div>
    )        
}
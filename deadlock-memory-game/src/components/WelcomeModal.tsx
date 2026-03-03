import type { GameStatus } from "../types"
import viscousPortrait from "../assets/Viscous_card.png"

type WelcomeModalProps = {
    status: GameStatus;
    onStart: () => void;
}


export function WelcomeModal({ status, onStart }: WelcomeModalProps) {
    if (status !== "idle") {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/70 z-50">
            <div className="bg-deadlock-inverse rounded-xl p-8 flex flex-col items-center gap-4 shadow-2xl">
                <img src={viscousPortrait} alt="Viscous Portrait" />
                <h1>Help Viscous remember his new friends!<br />
                Don't click the same hero twice!
                </h1>
                <button onClick={onStart}>Start Game</button>
            </div>
        </div>
    )        
}
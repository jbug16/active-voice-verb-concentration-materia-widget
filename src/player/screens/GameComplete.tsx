import Board from "../components/Board";

export default function GameComplete() {
    return (
        <Board children={
            <>
                <h1>Game Complete</h1>
                <p>Congratulations! You have completed the game.</p>
            </>
        } />
    )
}
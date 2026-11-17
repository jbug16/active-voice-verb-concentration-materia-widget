import Board from '../components/Board'
import Card from '../components/Card'

export default function RoundComplete() {
    return (
        <Board children={
            <>
                <p>Congratulations! You completed the round.</p>
            </>
        } />
    )
}

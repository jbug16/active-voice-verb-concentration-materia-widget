import Board from "../components/Board";

export default function ShowAnswers() {
    return (
        <Board children={
            <>
                <h1>Show Answers</h1>
                <p>Here are the correct answers.</p>
            </>
        } />
    )
}
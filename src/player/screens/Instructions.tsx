import Board from '../components/Board'

export default function Instructions({ onStart }: { onStart: () => void }) {
	return (
		<Board variant="content" label="Game instructions">
			<section className="instructions-screen" aria-labelledby="instructions-title">
				<div className="instructions-content">
					<h2 id="instructions-title">How to play</h2>
					<ul>
						<li>Flip over two cards at a time to find a matching pair.</li>
						<li>Matches stay face up; non-matches flip back after a moment.</li>
						<li>Complete all six rounds. Each round adds another pair.</li>
						<li>There is no time or attempt limit.</li>
					</ul>
					<button className="button button-primary" onClick={onStart} type="button">
						Start Game
					</button>
				</div>
			</section>
		</Board>
	)
}

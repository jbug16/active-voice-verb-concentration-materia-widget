import Board from '../components/Board'

interface GameCompleteProps {
	levelTimes: number[]
	onPlayAgain: () => void
}

function formatTime(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = String(totalSeconds % 60).padStart(2, '0')
	return `${minutes}:${seconds}`
}

export default function GameComplete({ levelTimes, onPlayAgain }: GameCompleteProps) {
	return (
		<Board variant="content" label="Game complete">
			<section className="game-complete-layout" aria-labelledby="game-complete-title">
				<div className="game-complete-content">
					<table className="level-times" aria-label="Time for each level">
						<thead>
							<tr>
								<th scope="col">Level</th>
								<th scope="col">Time</th>
							</tr>
						</thead>
						<tbody>
							{levelTimes.map((time, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>{formatTime(time)}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="game-complete-message">
						<h2 id="game-complete-title">Congrats!</h2>
						<p>You have finished all the levels.</p>
						<button className="button button-primary" onClick={onPlayAgain} type="button">
							Play Again
							<span className="material-symbols-outlined button-icon" aria-hidden="true">
								replay
							</span>
						</button>
					</div>
				</div>
			</section>
		</Board>
	)
}

import Board from '../components/Board'
import Card from '../components/Card'

interface RoundCompleteProps {
	level: number
	minutes: number
	seconds: number
	answers: string[]
	isFinalRound?: boolean
	onNextLevel: () => void
}

export default function RoundComplete({
	level,
	minutes,
	seconds,
	answers,
	isFinalRound = false,
	onNextLevel,
}: RoundCompleteProps) {
	return (
		<Board variant="content">
			<section className="round-review-layout" aria-label="Round results and revealed answers">
				<div className="round-review-cards" role="region" aria-label="Revealed cards" tabIndex={0}>
					<div className="round-review-grid">
						{answers.map((answer, index) => (
							<Card key={`answer-${index}`} revealed content={answer} />
						))}
					</div>
				</div>
				<aside className="round-summary" aria-labelledby="round-complete-title">
					<div className="round-summary-content">
						<div className="round-complete-message">
							<h2 id="round-complete-title">Nice!</h2>
							<p>
								You finished level {level} in <strong>{minutes} minutes</strong> and{' '}
								<strong>{seconds} seconds</strong>
							</p>
						</div>
						<button className="button button-primary" onClick={onNextLevel} type="button">
							{isFinalRound ? 'See Results' : 'Next Level'}
							<span className="material-symbols-outlined button-icon" aria-hidden="true">
								arrow_forward
							</span>
						</button>
					</div>
				</aside>
			</section>
		</Board>
	)
}

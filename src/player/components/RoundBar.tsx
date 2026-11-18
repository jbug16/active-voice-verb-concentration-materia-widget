interface RoundBarProps {
	rounds: number
	currentRound: number
	roundComplete?: boolean
}

export default function RoundBar({ rounds, currentRound, roundComplete = false }: RoundBarProps) {
	return (
		<nav className="round-bar" aria-label="Round progress">
			{Array.from({ length: rounds }, (_, i) => {
				const round = i + 1
				const isActive = round === currentRound && !roundComplete
				const isComplete = round < currentRound || (round === currentRound && roundComplete)

				return (
					<div
						className={`round ${isActive ? 'active' : isComplete ? 'complete' : 'inactive'}`}
						aria-current={isActive ? 'step' : undefined}
						key={round}
					>
						<span>{round}</span>
					</div>
				)
			})}
		</nav>
	)
}

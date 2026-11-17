export default function RoundBar({ rounds, currentRound }: { rounds: number, currentRound: number }) {
	return (
		<nav className="round-bar" aria-label="Round progress">
			{Array.from({ length: rounds }, (_, i) => (
				<div
					className={`round ${i + 1 === currentRound ? 'active' : i + 1 < currentRound ? 'complete' : 'inactive'}`}
					aria-current={i + 1 === currentRound ? 'step' : undefined}
					key={i}
				>
					<span>{i + 1}</span>
				</div>
			))}
		</nav>
	)
}

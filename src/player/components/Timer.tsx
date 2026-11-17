export default function Timer({ time }: { time: number }) {
	const minutes = Math.floor(time / 60)
	const seconds = String(time % 60).padStart(2, '0')

	return (
		<div className="timer">
			<span className="material-symbols-outlined timer-icon" aria-hidden="true">timer</span>
			<p>{minutes}:{seconds}</p>
		</div>
	)
}

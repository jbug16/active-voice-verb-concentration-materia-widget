import { useEffect, useRef } from 'react'

interface RoundCompleteProps {
	level: number
	minutes: number
	seconds: number
	isFinalRound: boolean
	onViewAnswers: () => void
	onNextLevel: () => void
}

export default function RoundComplete({
	level,
	minutes,
	seconds,
	isFinalRound,
	onViewAnswers,
	onNextLevel,
}: RoundCompleteProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = dialogRef.current
		if (dialog && !dialog.open) dialog.showModal()
		return () => {
			if (dialog?.open) dialog.close()
		}
	}, [])

	return (
		<dialog
			className="round-complete-dialog"
			aria-labelledby="round-complete-title"
			onCancel={(event) => {
				event.preventDefault()
				onViewAnswers()
			}}
			ref={dialogRef}
		>
			<div className="round-complete-dialog-content">
				<div>
					<h2 id="round-complete-title">Nice!</h2>
					<p>
						You finished level {level} in <strong>{minutes} minutes</strong> and{' '}
						<strong>{seconds} seconds</strong>
					</p>
				</div>
				<div className="round-complete-dialog-actions">
					<button className="button button-secondary" onClick={onViewAnswers} type="button">
						View Answers
						<span className="material-symbols-outlined button-icon" aria-hidden="true">
							check
						</span>
					</button>
					<button className="button button-primary" onClick={onNextLevel} type="button">
						{isFinalRound ? 'See Results' : 'Next Level'}
						<span className="material-symbols-outlined button-icon" aria-hidden="true">
							arrow_forward
						</span>
					</button>
				</div>
			</div>
		</dialog>
	)
}

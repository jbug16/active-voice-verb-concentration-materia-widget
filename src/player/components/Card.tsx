import { useId, useLayoutEffect, useRef, useState } from 'react'

interface CardProps {
	revealed: boolean
	content: string
	cardNumber?: number
	onReveal?: () => void
}

export default function Card({ revealed, content, cardNumber, onReveal }: CardProps) {
	const [hasOverflow, setHasOverflow] = useState(false)
	const cardRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLParagraphElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const dialogRef = useRef<HTMLDialogElement>(null)
	const returnFocusRef = useRef<HTMLElement | null>(null)
	const previouslyRevealed = useRef(revealed)
	const titleId = useId()
	const previewId = useId()

	function openDetails() {
		const dialog = dialogRef.current
		if (!dialog || dialog.open) return

		const focused = document.activeElement
		returnFocusRef.current = focused instanceof HTMLElement && focused !== document.body
			? focused
			: null
		dialog.showModal()
	}

	function handleClose() {
		const target = returnFocusRef.current
		returnFocusRef.current = null
		if (target?.isConnected) {
			target.focus()
		} else {
			triggerRef.current?.focus()
		}
	}

	useLayoutEffect(() => {
		const newlyRevealed = revealed && !previouslyRevealed.current
		previouslyRevealed.current = revealed

		if (!revealed) {
			setHasOverflow(false)
			if (dialogRef.current?.open) dialogRef.current.close()
			return
		}

		const card = cardRef.current
		const preview = previewRef.current
		const text = textRef.current
		if (!card || !preview || !text) return

		let active = true
		let checkAutoOpen = newlyRevealed
		const measure = () => {
			if (!active) return
			const previewStyle = getComputedStyle(preview)
			const textStyle = getComputedStyle(text)
			const availableHeight = preview.clientHeight -
				parseFloat(previewStyle.paddingTop) - parseFloat(previewStyle.paddingBottom)
			const availableWidth = text.clientWidth
			const lineHeight = parseFloat(textStyle.lineHeight)

			if (Number.isFinite(lineHeight) && lineHeight > 0) {
				const lines = String(Math.max(1, Math.floor(availableHeight / lineHeight)))
				if (preview.style.getPropertyValue('--card-preview-lines') !== lines) {
					preview.style.setProperty('--card-preview-lines', lines)
				}
			}

			const overflow = text.scrollHeight > availableHeight + 1 ||
				text.scrollWidth > availableWidth + 1
			setHasOverflow(overflow)

			if (checkAutoOpen) {
				checkAutoOpen = false
				if (overflow) {
					openDetails()
				}
			}
		}

		const observer = new ResizeObserver(measure)
		observer.observe(card)
		observer.observe(preview)
		observer.observe(text)
		measure()
		void document.fonts.ready.then(measure)

		return () => {
			active = false
			observer.disconnect()
		}
	}, [revealed, content])

	if (!revealed) {
		return (
			<button
				className="card-hidden"
				type="button"
				disabled={!onReveal}
				aria-label={`Reveal card ${cardNumber ?? ''}`.trim()}
				onClick={onReveal}
			/>
		)
	}

	return (
		<div className={`card-revealed${hasOverflow ? ' card-revealed--long' : ''}`} ref={cardRef}>
			<div className="card-preview" ref={previewRef}>
				<div className="card-preview-clip">
					<p className="card-content" id={previewId} ref={textRef}>{content}</p>
				</div>
			</div>
			{hasOverflow && (
				<button
					className="card-detail-trigger"
					type="button"
					aria-label="Open full card text"
					aria-haspopup="dialog"
					aria-describedby={previewId}
					onClick={openDetails}
					ref={triggerRef}
				/>
			)}
			<dialog className="card-detail" aria-labelledby={titleId} onClose={handleClose} ref={dialogRef}>
				<div className="card-detail-header">
					<h2 id={titleId}>Card text</h2>
					<button className="card-detail-close" type="button" onClick={() => dialogRef.current?.close()} autoFocus>
						Close<span className="visually-hidden"> card text</span>
					</button>
				</div>
				<div className="card-detail-content" role="region" aria-label="Full card text" tabIndex={0}>
					<p>{content}</p>
				</div>
			</dialog>
		</div>
	)
}

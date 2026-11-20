import { useEffect, useRef, useState } from 'react'
import Board from '../components/Board'
import Card from '../components/Card'
import { createRoundDeck, type PlayingCard } from '../../game/roundFlow'

interface GameScreenProps {
	round: number
	onRoundComplete: (answers: string[]) => void
}

const MISMATCH_REVEAL_MS = 850

export default function GameScreen({ round, onRoundComplete }: GameScreenProps) {
	const [cards, setCards] = useState<PlayingCard[]>(() => createRoundDeck(round))
	const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])
	const [isResolvingMismatch, setIsResolvingMismatch] = useState(false)
	const mismatchTimeout = useRef<number | null>(null)

	useEffect(() => () => {
		if (mismatchTimeout.current !== null) {
			window.clearTimeout(mismatchTimeout.current)
		}
	}, [])

	function handleCardReveal(cardId: string) {
		if (isResolvingMismatch) return

		const clickedCard = cards.find((card) => card.id === cardId)
		if (!clickedCard || clickedCard.revealed || clickedCard.matched) return

		const revealedCards = cards.map((card) =>
			card.id === cardId ? { ...card, revealed: true } : card,
		)
		setCards(revealedCards)

		if (selectedCardIds.length === 0) {
			setSelectedCardIds([cardId])
			return
		}

		const firstCardId = selectedCardIds[0]
		const firstCard = cards.find((card) => card.id === firstCardId)
		if (!firstCard) {
			setSelectedCardIds([cardId])
			return
		}

		if (firstCard.pairId === clickedCard.pairId) {
			const matchedCards = revealedCards.map((card) =>
				card.pairId === clickedCard.pairId
					? { ...card, revealed: true, matched: true }
					: card,
			)
			setCards(matchedCards)
			setSelectedCardIds([])

			if (matchedCards.every((card) => card.matched)) {
				onRoundComplete(matchedCards.map((card) => card.content))
			}
			return
		}

		const mismatchedIds = [firstCardId, cardId]
		setSelectedCardIds(mismatchedIds)
		setIsResolvingMismatch(true)
		mismatchTimeout.current = window.setTimeout(() => {
			setCards((currentCards) => currentCards.map((card) =>
				mismatchedIds.includes(card.id) && !card.matched
					? { ...card, revealed: false }
					: card,
			))
			setSelectedCardIds([])
			setIsResolvingMismatch(false)
			mismatchTimeout.current = null
		}, MISMATCH_REVEAL_MS)
	}

	return (
		<Board>
			{cards.map((card, index) => (
				<Card
					key={card.id}
					cardNumber={index + 1}
					revealed={card.revealed || card.matched}
					content={card.content}
					onReveal={() => handleCardReveal(card.id)}
				/>
			))}
		</Board>
	)
}

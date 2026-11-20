import { useState } from 'react'
import Board from '../components/Board'
import Card from '../components/Card'
import { exampleCards } from '../../game/examplePairs'

export default function GameScreen() {
	const [revealedCards, setRevealedCards] = useState<Set<number>>(() => new Set())

	function revealCard(cardIndex: number) {
		setRevealedCards((current) => {
			if (current.has(cardIndex)) return current
			const next = new Set(current)
			next.add(cardIndex)
			return next
		})
	}

	return (
		<Board>
			{exampleCards.map((card, index) => (
				<Card
					key={card.id}
					cardNumber={index + 1}
					revealed={revealedCards.has(index)}
					content={card.content}
					onReveal={() => revealCard(index)}
				/>
			))}
		</Board>
    )
}

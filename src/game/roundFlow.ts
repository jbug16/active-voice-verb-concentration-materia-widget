import { examplePairs } from './examplePairs'

export interface PlayingCard {
	id: string
	pairId: string
	content: string
	revealed: boolean
	matched: boolean
}

/** Round one has three pairs (six cards); each following round adds one pair. */
export function createRoundDeck(round: number, random: () => number = Math.random): PlayingCard[] {
	const normalizedRound = Math.max(1, Math.floor(round))
	const pairCount = Math.min(examplePairs.length, normalizedRound + 2)
	const cards: PlayingCard[] = examplePairs.slice(0, pairCount).flatMap((pair) => [
		{
			id: `${pair.id}-left`,
			pairId: pair.id,
			content: pair.left,
			revealed: false,
			matched: false,
		},
		{
			id: `${pair.id}-right`,
			pairId: pair.id,
			content: pair.right,
			revealed: false,
			matched: false,
		},
	])

	// Fisher-Yates shuffle. Copy the new deck so the source pairs stay unchanged.
	for (let index = cards.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(random() * (index + 1))
		;[cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]]
	}

	return cards
}

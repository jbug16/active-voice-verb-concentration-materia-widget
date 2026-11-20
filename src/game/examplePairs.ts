export interface ExamplePair {
	id: string
	structure: string
	verbPhrase: string
}

/** Sample active-voice structures and matching verb phrases for the UI scaffold. */
export const examplePairs: ExamplePair[] = [
	{
		id: 'helped',
		structure: 'past + have + -en + help',
		verbPhrase: 'had helped',
	},
	{
		id: 'worked',
		structure: 'present + have + -en + work',
		verbPhrase: 'has worked',
	},
	{
		id: 'was-working',
		structure: 'past + be + -ing + work',
		verbPhrase: 'was working',
	},
	{
		id: 'will-be-playing',
		structure: 'present + will + be + -ing + play',
		verbPhrase: 'will be playing',
	},
	{
		id: 'is-having',
		structure: 'present + be + -ing + have',
		verbPhrase: 'is having',
	},
	{
		id: 'should-have-studied',
		structure: 'past + shall + have + -en + study',
		verbPhrase: 'should have studied',
	},
	{
		id: 'found',
		structure: 'present + have + -en + find',
		verbPhrase: 'have found',
	},
	{
		id: 'lost',
		structure: 'past + lose',
		verbPhrase: 'lost',
	},
]

export const exampleCards = examplePairs.flatMap((pair) => [
	{ id: `${pair.id}-structure`, pairId: pair.id, content: pair.structure },
	{ id: `${pair.id}-verb-phrase`, pairId: pair.id, content: pair.verbPhrase },
])

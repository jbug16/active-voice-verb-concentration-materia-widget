import Board from '../components/Board'
import Card from '../components/Card'

interface RoundAnswersProps {
	level: number
	answers: string[]
}

export default function RoundAnswers({ level, answers }: RoundAnswersProps) {
	return (
		<Board label={`Answers for level ${level}`}>
			{answers.map((answer, index) => (
				<Card key={`answer-${index}`} revealed content={answer} />
			))}
		</Board>
	)
}

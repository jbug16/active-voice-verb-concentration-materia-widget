import Board from './components/Board'
import RoundBar from './components/RoundBar'
import Timer from './components/Timer'
import Title from './components/Title'

export default function App() {
	return (
		<main className="app">
			<Title title="My concentration game" />
			<div className="game-toolbar">
				<Timer time={243} />
				<RoundBar rounds={6} currentRound={3} />
			</div>
			<Board />
		</main>
	)
}

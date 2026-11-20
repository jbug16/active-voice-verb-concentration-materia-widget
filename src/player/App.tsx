import { useEffect, useRef, useState } from 'react'
import RoundBar from './components/RoundBar'
import Timer from './components/Timer'
import Title from './components/Title'
import GameScreen from './screens/GameScreen'
import RoundComplete from './screens/RoundComplete'
import RoundAnswers from './screens/RoundAnswers'
import Instructions from './screens/Instructions'
import GameComplete from './screens/GameComplete'

type Screen = 'instructions' | 'playing' | 'round-complete' | 'answers' | 'game-complete'

const ROUND_COUNT = 6

export default function App() {
	const [screen, setScreen] = useState<Screen>('instructions')
	const [currentRound, setCurrentRound] = useState(1)
	const [elapsedSeconds, setElapsedSeconds] = useState(0)
	const [levelTimes, setLevelTimes] = useState<number[]>([])
	const [roundAnswers, setRoundAnswers] = useState<string[]>([])
	const roundStartedAt = useRef<number | null>(null)

	useEffect(() => {
		if (screen !== 'playing') return

		const updateElapsedTime = () => {
			if (roundStartedAt.current !== null) {
				setElapsedSeconds(Math.floor((Date.now() - roundStartedAt.current) / 1000))
			}
		}
		const interval = window.setInterval(updateElapsedTime, 250)
		return () => window.clearInterval(interval)
	}, [screen])

	function startRound(round: number) {
		setCurrentRound(round)
		setElapsedSeconds(0)
		roundStartedAt.current = Date.now()
		setScreen('playing')
	}

	function handleRoundComplete(answers: string[]) {
		const duration = roundStartedAt.current === null
			? elapsedSeconds
			: Math.floor((Date.now() - roundStartedAt.current) / 1000)
		roundStartedAt.current = null
		setElapsedSeconds(duration)
		setRoundAnswers(answers)
		setLevelTimes((times) => [...times, duration])
		setScreen('round-complete')
	}

	function handleNextLevel() {
		if (currentRound >= ROUND_COUNT) {
			setScreen('game-complete')
			return
		}

		startRound(currentRound + 1)
	}

	function handleViewAnswers() {
		setScreen('answers')
	}

	function handlePlayAgain() {
		setLevelTimes([])
		setRoundAnswers([])
		startRound(1)
	}

	return (
		<main className="app">
			<Title title="My concentration game" />
			<div className="game-toolbar">
				{(screen === 'playing' || screen === 'round-complete') && (
					<Timer time={elapsedSeconds} />
				)}
				{screen === 'answers' && (
					<button className="button button-primary toolbar-action" onClick={handleNextLevel} type="button">
						{currentRound >= ROUND_COUNT ? 'See Results' : 'Next Level'}
						<span className="material-symbols-outlined button-icon" aria-hidden="true">
							arrow_forward
						</span>
					</button>
				)}
				<RoundBar
					rounds={ROUND_COUNT}
					currentRound={currentRound}
					roundComplete={screen === 'round-complete' || screen === 'answers' || screen === 'game-complete'}
				/>
			</div>
			{screen === 'instructions' && <Instructions onStart={() => startRound(1)} />}
			{(screen === 'playing' || screen === 'round-complete') && (
				<GameScreen
					key={currentRound}
					round={currentRound}
					onRoundComplete={handleRoundComplete}
				/>
			)}
			{screen === 'round-complete' && (
				<RoundComplete
					level={currentRound}
					minutes={Math.floor(elapsedSeconds / 60)}
					seconds={elapsedSeconds % 60}
					isFinalRound={currentRound >= ROUND_COUNT}
					onViewAnswers={handleViewAnswers}
					onNextLevel={handleNextLevel}
				/>
			)}
			{screen === 'answers' && <RoundAnswers level={currentRound} answers={roundAnswers} />}
			{screen === 'game-complete' && (
				<GameComplete levelTimes={levelTimes} onPlayAgain={handlePlayAgain} />
			)}
		</main>
	)
}

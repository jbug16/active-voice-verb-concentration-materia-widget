import { useEffect, useRef, useState } from 'react'
import RoundBar from './components/RoundBar'
import Timer from './components/Timer'
import Title from './components/Title'
import GameScreen from './screens/GameScreen'
import RoundComplete from './screens/RoundComplete'
import Instructions from './screens/Instructions'
import GameComplete from './screens/GameComplete'

type Screen = 'instructions' | 'playing' | 'round-complete' | 'game-complete'

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
				<RoundBar
					rounds={ROUND_COUNT}
					currentRound={currentRound}
					roundComplete={screen === 'round-complete' || screen === 'game-complete'}
				/>
			</div>
			{(() => {
				switch (screen) {
					case 'instructions':
						return <Instructions onStart={() => startRound(1)} />
					case 'playing':
						return <GameScreen round={currentRound} onRoundComplete={handleRoundComplete} />
					case 'round-complete':
						return (
							<RoundComplete
								level={currentRound}
								minutes={Math.floor(elapsedSeconds / 60)}
								seconds={elapsedSeconds % 60}
								answers={roundAnswers}
								isFinalRound={currentRound === ROUND_COUNT}
								onNextLevel={handleNextLevel}
							/>
						)
					case 'game-complete':
						return (
							<GameComplete
								levelTimes={levelTimes}
								onPlayAgain={handlePlayAgain}
							/>
						)
					default:
						return null
				}
			})()}
		</main>
	)
}

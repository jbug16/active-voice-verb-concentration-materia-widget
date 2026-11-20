import { useState } from 'react';
import RoundBar from './components/RoundBar'
import Timer from './components/Timer'
import Title from './components/Title'
import GameScreen from './screens/GameScreen';
import RoundComplete from './screens/RoundComplete';
import Instructions from './screens/Instructions';
import GameComplete from './screens/GameComplete';

type Screen = 'instructions' | 'playing' | 'round-complete' | 'game-complete';

const ROUND_COUNT = 6
const roundAnswerPreview = Array.from({ length: 16 }, (_, index) =>
	index % 2 === 0 ? 'Match one' : '87394284',
)
// Placeholder times in seconds until real round timing is implemented.
const levelTimePreview = [150, 105, 221, 248, 239, 120]

export default function App() {
	const [screen, setScreen] = useState<Screen>('game-complete');
	const [currentRound, setCurrentRound] = useState(3)

	function handleNextLevel() {
		if (currentRound >= ROUND_COUNT) {
			setScreen('game-complete')
			return
		}

		setCurrentRound((round) => round + 1)
		setScreen('playing')
	}

	function handlePlayAgain() {
		setCurrentRound(1)
		setScreen('playing')
	}
	
	return (
		<main className="app">
			<Title title="My concentration game" />
			<div className="game-toolbar">
				{screen !== 'game-complete' && <Timer time={243} />}
				<RoundBar
					rounds={ROUND_COUNT}
					currentRound={screen === 'game-complete' ? ROUND_COUNT : currentRound}
					roundComplete={screen === 'round-complete' || screen === 'game-complete'}
				/>
			</div>
			{(() => {
				switch (screen) {
					case 'instructions':
						return <Instructions />; 
					case 'playing':
						return <GameScreen />;
					case 'round-complete':
						return (
							<RoundComplete
								level={currentRound}
								minutes={4}
								seconds={3}
								answers={roundAnswerPreview}
								onNextLevel={handleNextLevel}
							/>
						);
					case 'game-complete':
						return (
							<GameComplete
								levelTimes={levelTimePreview}
								onPlayAgain={handlePlayAgain}
							/>
						);
					default:
						return null;
				}
			})()}
		</main>
	)
}

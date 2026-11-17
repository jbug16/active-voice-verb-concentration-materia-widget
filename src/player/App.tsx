import { useState } from 'react';
import RoundBar from './components/RoundBar'
import Timer from './components/Timer'
import Title from './components/Title'
import GameScreen from './screens/GameScreen';
import RoundComplete from './screens/RoundComplete';
import Instructions from './screens/Instructions';
import GameComplete from './screens/GameComplete';

type Screen = 'instructions' | 'playing' | 'round-complete' | 'game-complete';

export default function App() {
	const [screen, setScreen] = useState<Screen>('playing');
	
	return (
		<main className="app">
			<Title title="My concentration game" />
			<div className="game-toolbar">
				<Timer time={243} />
				<RoundBar rounds={6} currentRound={3} />
			</div>
			{(() => {
				switch (screen) {
					case 'instructions':
						return <Instructions />; 
					case 'playing':
						return <GameScreen />;
					case 'round-complete':
						return <RoundComplete />;
					case 'game-complete':
						return <GameComplete />;
					default:
						return null;
				}
			})()}
		</main>
	)
}

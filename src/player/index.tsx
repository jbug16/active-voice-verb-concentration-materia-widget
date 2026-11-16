import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/player.scss'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Materia player root element was not found')
}

const root = createRoot(rootElement)

Materia.Engine.start({
	start: () => {
		root.render(
			<StrictMode>
				<App />
			</StrictMode>,
		)
	},
})

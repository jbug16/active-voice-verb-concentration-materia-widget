import { StrictMode } from 'react'
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

		// Report the real content height, rounded up to avoid a 1px iframe scrollbar.
		const observer = new ResizeObserver(() => {
			const height = Math.ceil(rootElement.getBoundingClientRect().height)
			if (height > 0) Materia.Engine.setHeight(height)
		})
		observer.observe(rootElement)
		window.addEventListener('unload', () => observer.disconnect(), { once: true })
	},
})

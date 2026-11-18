import React from 'react'

interface BoardProps {
    children: React.ReactNode;
    variant?: 'cards' | 'content';
}

export default function Board({ children, variant = 'cards' }: BoardProps) {
	return (
		<div
			className={`board ${variant === 'content' ? 'board--content' : ''}`}
			role="region"
			aria-label={variant === 'content' ? 'Round results and answers' : 'Game board'}
			tabIndex={variant === 'cards' ? 0 : undefined}
		>
			{variant === 'content' ? (
				<div className="board-content">{children}</div>
			) : (
				<div className="card-container">{children}</div>
			)}
		</div>
	)
}

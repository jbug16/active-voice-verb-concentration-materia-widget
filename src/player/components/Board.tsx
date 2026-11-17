import React from 'react'

interface BoardProps {
    children: React.ReactNode;
}

export default function Board({ children }: BoardProps) {
	return (
		<div className="board" role="region" aria-label="Game board" tabIndex={0}>
            <div className="card-container">
                {children}
            </div>
		</div>
	)
}

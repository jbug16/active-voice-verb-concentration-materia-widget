interface CardProps {
    revealed: boolean;
    content: string;
}

export default function Card({ revealed, content }: CardProps) {
	if (revealed) {
		return (
			<div className="card-revealed">
				<p className="card-content">{content}</p>
			</div>
		);
	}

	return <div className="card-hidden" />
}

export default function Title({ title }: { title: string }) {
	return (
        <div className="title-container">
            <h1 className="title">CONCENTRATION</h1>
            <p className="subtitle">{title}</p>
        </div>
	)
}
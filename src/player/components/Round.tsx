export default function Round({ round, state }: { round: number, state: string }) {
	return (
        <div>
            { state == "active" ?
                <div className="round active">
                    <p>{round}</p>
                </div> 
            : state == "complete" ?
                <div className="round complete">
                    <p>{round}</p>
                </div> 
            : state == "inactive" ?
                <div className="round inactive">
                    <p>{round}</p>
                </div> 
            : null}
        </div>
	)
}
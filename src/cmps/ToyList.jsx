import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {
	return (
		<ul className="toy-list clean-list">
			{toys.map(toy => (
				<ToyPreview key={toy._id} toy={toy}>
					<section className="toy-actions flex justify-between">
						<button className="btn">
							<Link to={`/toy/edit/${toy._id}`}>Edit</Link>
						</button>
						<button className="btn" onClick={() => onRemoveToy(toy._id)}>
							X
						</button>
					</section>
				</ToyPreview>
			))}
		</ul>
	)
}

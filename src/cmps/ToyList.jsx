import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy, addToyCart, isAdmin }) {
	return (
		<ul className="toy-list clean-list">
			{toys.map(toy => (
				<li key={toy._id} className="toy-preview-container">
					<ToyPreview toy={toy}>
						<div className="toy-preview__actions">
							{isAdmin && (
								<div className="admin-actions">
									<Link to={`/toy/edit/${toy._id}`} className="btn btn-edit">
										Edit
									</Link>
									<button className="btn btn-remove" onClick={() => onRemoveToy(toy._id)}>
										X
									</button>
								</div>
							)}
							<button className="btn btn-cart" onClick={() => addToyCart(toy)}>
								Add to cart
							</button>
						</div>
					</ToyPreview>
				</li>
			))}
		</ul>
	)
}

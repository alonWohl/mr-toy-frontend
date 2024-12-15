import { children } from 'react'
import { Link } from 'react-router-dom'

export function ToyPreview({ toy, children }) {
	const inStockClassName = toy.inStock ? 'green' : 'red'

	return (
		<li className="toy-preview">
			<Link to={`/toy/${toy._id}`}>
				<h2 className="toy-title">{toy.name}</h2>
				<div className="toy-image">
					<img src={`https://robohash.org/${toy._id}?set=set4`} alt="cat" />
				</div>
				<h4 className={`toy-tag ${inStockClassName}`}>{toy.inStock ? 'In Stock' : 'Not In Stock'}</h4>
				<p className="toy-price">
					Price: <span className="highlight">{toy.price}$ </span>
				</p>
			</Link>
			{children}
		</li>
	)
}

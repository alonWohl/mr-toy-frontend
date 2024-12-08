import { children } from 'react'
import { Link } from 'react-router-dom'

export function ToyPreview({ toy, children }) {
	const inStockClassName = toy.inStock ? 'green' : 'red'

	return (
		<li className="toy-preview">
			<Link to={`/toy/${toy._id}`}>
				<h2 className="preview-title">{toy.name}</h2>
				<img src={`https://robohash.org/${toy._id}?set=set4`} alt="cat" />
				<h4 className={inStockClassName}>{toy.inStock ? 'In Stock' : 'Not In Stock'}</h4>
				<p className="toy-price">
					Price: <span className="highlight">{toy.price}$ </span>
				</p>
			</Link>
			{children}
		</li>
	)
}

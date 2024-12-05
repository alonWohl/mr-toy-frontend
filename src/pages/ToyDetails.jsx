import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.local'
import { Link, useParams } from 'react-router-dom'

export function ToyDetails() {
	const [toy, setToy] = useState(null)
	const { toyId } = useParams()

	useEffect(() => {
		toyService.getById(toyId).then(setToy)
	}, [toyId])

	if (!toy) return <div>loading...</div>

	const inStockClassName = toy.inStock ? 'green' : 'red'
	return (
		<section className="toy-details">
			<h1>
				Name: <span>{toy.name}</span>
			</h1>

			<img src={`https://robohash.org/${toy._id}?set=set4`} alt="cat" />

			<h3 className={inStockClassName}>{toy.inStock ? 'In Stock' : 'Not In Stock'}</h3>

			<p>
				Price: <span>{toy.price}$</span>
			</p>

			<p>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, asperiores vero doloribus quibusdam fugiat nostrum corrupti nam consectetur placeat repellendus.</p>

			<div className="btn-group">
				<button>
					<Link to={`/toy/${toy.prevToyId}`}>Previous</Link>
				</button>
				<button>
					<Link to={`/toy/${toy.nextToyId}`}>Next</Link>
				</button>
			</div>
		</section>
	)
}

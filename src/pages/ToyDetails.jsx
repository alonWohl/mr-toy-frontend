import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'
import { ToyMsg } from '../cmps/ToyMsg.jsx'

export function ToyDetails() {
	const [toy, setToy] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const { toyId } = useParams()
	const navigate = useNavigate()
	const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

	useEffect(() => {
		loadToy()
	}, [toyId])

	async function loadToy() {
		try {
			setIsLoading(true)
			const toy = await toyService.getById(toyId)
			setToy(toy)
		} catch (err) {
			showErrorMsg('Cannot load toy')
			navigate('/toy')
		} finally {
			setIsLoading(false)
		}
	}

	function onBack() {
		navigate('/toy')
	}

	if (isLoading)
		return (
			<div className="loader-container">
				<div className="loader">Loading...</div>
			</div>
		)

	if (!toy)
		return (
			<div className="error-container">
				<h2>Toy not found</h2>
				<button className="btn" onClick={onBack}>
					Back to Toys
				</button>
			</div>
		)

	const { name, price, inStock, labels = [] } = toy
	const inStockClassName = inStock ? 'in-stock' : 'out-of-stock'

	return (
		<section className="toy-details">
			<div className="toy-details-header">
				<button className="btn-back" onClick={onBack}>
					←
				</button>
				<h1>{name}</h1>
			</div>

			<div className="toy-details-content">
				<div className="toy-details-main">
					<img src={`https://robohash.org/${toy._id}?set=set4`} alt={name} className="toy-image" />

					<div className="toy-info">
						<div className="toy-labels">
							{labels.map(label => (
								<span key={label} className="toy-label">
									{label}
								</span>
							))}
						</div>

						<h3 className={inStockClassName}>{inStock ? 'In Stock' : 'Out of Stock'}</h3>

						<p className="toy-price">
							Price: <span>${price}</span>
						</p>

						<p className="toy-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, asperiores vero doloribus quibusdam fugiat nostrum corrupti nam consectetur placeat repellendus.</p>
					</div>
				</div>

				<ToyMsg toy={toy} loggedInUser={loggedInUser} onAddMsg={loadToy} />

				<div className="toy-navigation">
					<Link to={`/toy/${toy.prevToyId}`} className="nav-btn prev" disabled={!toy.prevToyId}>
						← Previous
					</Link>
					<Link to={`/toy/${toy.nextToyId}`} className="nav-btn next" disabled={!toy.nextToyId}>
						Next →
					</Link>
				</div>
			</div>
		</section>
	)
}

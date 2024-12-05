import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
	const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
	const navigate = useNavigate()
	const { toyId } = useParams()

	useEffect(() => {
		if (!toyId) return
		loadToy()
	}, [])

	function loadToy() {
		toyService
			.getById(toyId)
			.then(setToyToEdit)
			.catch(err => {
				console.error('had issues in toy edit', err)
				showErrorMsg('Toy Not Found')
				navigate('/toy')
			})
	}

	function handleChange({ target }) {
		const field = target.name
		const value = target.type === 'number' ? +target.value || '' : target.value
		setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
	}

	function onSaveToy(ev) {
		ev.preventDefault()
		saveToy(toyToEdit)
			.then(() => {
				showSuccessMsg('Toy saved successfully')
				navigate('/toy')
			})
			.catch(() => {
				showErrorMsg('Cannot save toy')
			})
	}

	return (
		<form className="toy-edit" onSubmit={onSaveToy}>
			<h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
			<label htmlFor="name">Name</label>
			<input onChange={handleChange} type="text" name="name" id="name" />

			<label htmlFor="price">price</label>
			<input onChange={handleChange} type="number" name="price" id="price" />

			<label htmlFor="inStock">In Stock</label>
			<input onChange={handleChange} type="checkbox" name="inStock" id="inStock" />

			<label htmlFor="lbaels">Labels</label>

			<button>Save</button>
		</form>
	)
}

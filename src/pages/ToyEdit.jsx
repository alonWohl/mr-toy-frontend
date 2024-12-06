import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

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
		let value = target.type === 'number' ? +target.value || '' : target.value
		if (target.type === 'checkbox') value = target.checked
		setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
	}

	function handleLabelsChange(event, newLabels) {
		setToyToEdit(prevToy => ({ ...prevToy, labels: newLabels }))
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
			<input onChange={handleChange} value={toyToEdit.name || ''} type="text" name="name" id="name" />

			<label htmlFor="price">Price</label>
			<input onChange={handleChange} value={toyToEdit.price || ''} type="number" name="price" id="price" />

			<label htmlFor="inStock">In Stock</label>
			<input onChange={handleChange} checked={toyToEdit.inStock} type="checkbox" name="inStock" id="inStock" />

			<label htmlFor="labels">Labels</label>
			<Autocomplete multiple id="labels" options={toyService.labels} value={toyToEdit.labels || []} onChange={handleLabelsChange} renderInput={params => <TextField {...params} variant="outlined" placeholder="Select labels" />} />

			<button>Save</button>
		</form>
	)
}

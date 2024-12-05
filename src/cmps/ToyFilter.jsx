import { Children, useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'

export function ToyFilter({ filterBy, onSetFilter, children }) {
	const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

	onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

	useEffect(() => {
		onSetFilter.current(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		let { value, name: field, type } = target
		value = type === 'number' ? +value : value
		setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
	}

	return (
		<section className="toy-filter main-layout">
			<h2>Toys Filter</h2>
			<form>
				<label htmlFor="txt">Search:</label>
				<input onChange={handleChange} type="text" name="txt" placeholder="Name" id="txt" value={filterByToEdit.txt} />

				<label htmlFor="maxPrice">max price:</label>
				<input onChange={handleChange} type="number" placeholder="Price" name="maxPrice" id="maxPrice" value={filterByToEdit.maxPrice} />

				<select value={filterByToEdit.inStock || ''} onChange={handleChange} name="inStock">
					<option value="">All</option>
					<option value="true">In stock</option>
					<option value="false">Not in stock</option>
				</select>
				{children}
			</form>
		</section>
	)
}

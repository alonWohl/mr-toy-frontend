import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'

export function ToyFilter({ filterBy, onSetFilter, children }) {
	const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
	const debouncedFilter = useRef(utilService.debounce(onSetFilter, 300))

	useEffect(() => {
		debouncedFilter.current(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		let { value, name: field, type } = target
		value = type === 'number' ? +value : value
		setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
	}

	return (
		<section className="toy-filter">
			<form>
				<div className="filter-inputs">
					<div className="filter-item">
						<label htmlFor="txt">Search by name:</label>
						<input onChange={handleChange} type="text" name="txt" placeholder="Enter toy name..." id="txt" value={filterByToEdit.txt} />
					</div>

					<div className="filter-item">
						<label htmlFor="maxPrice">Max price:</label>
						<input onChange={handleChange} type="number" placeholder="Enter max price" name="maxPrice" id="maxPrice" value={filterByToEdit.maxPrice} />
					</div>

					<div className="filter-item">
						<label htmlFor="inStock">Stock status:</label>
						<select value={filterByToEdit.inStock || ''} onChange={handleChange} name="inStock" id="inStock">
							<option value="">All toys</option>
							<option value="true">In stock</option>
							<option value="false">Out of stock</option>
						</select>
					</div>
				</div>

				{children}
			</form>
		</section>
	)
}

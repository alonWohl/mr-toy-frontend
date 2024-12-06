import { useEffect, useState } from 'react'

export function ToySort({ sortBy, onSetSort }) {
	const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

	function handleChange({ target }) {
		const field = target.name
		let updatedSort

		if (field === 'desc') {
			updatedSort = {
				...sortByToEdit,
				desc: target.checked ? -1 : 1
			}
		} else {
			updatedSort = {
				...sortByToEdit,
				[field]: target.value
			}
		}

		setSortByToEdit(updatedSort)
		onSetSort(updatedSort)
	}

	return (
		<form className="toy-sort">
			<div className="sort-controls">
				<select name="type" value={sortByToEdit.type} onChange={handleChange} className="sort-select">
					<option value="">Sort by</option>
					<option value="name">Name</option>
					<option value="price">Price</option>
					<option value="createdAt">Date</option>
				</select>

				<label className="sort-direction">
					<input type="checkbox" name="desc" checked={sortByToEdit.desc === -1} onChange={handleChange} />
					<span>Descending</span>
				</label>
			</div>
		</form>
	)
}

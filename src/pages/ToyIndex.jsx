import { useEffect } from 'react'
import { ToyList } from '../cmps/ToyList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { Link } from 'react-router-dom'
import { ToySort } from '../cmps/toySort.jsx'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'

export function ToyIndex() {
	const toys = useSelector(storState => storState.toyModule.toys)
	const filterBy = useSelector(storState => storState.toyModule.filterBy)
	const isLoading = useSelector(storState => storState.toyModule.isLoading)

	useEffect(() => {
		loadToys().catch(() => {
			showErrorMsg('cannot load toys !')
		})
	}, [filterBy])

	function setFilter(filterBy) {
		setFilterBy(filterBy)
	}

	function onRemoveToy(toyId) {
		removeToy(toyId)
			.then(() => {
				showSuccessMsg('toy removed successfully')
			})
			.catch(() => {
				showErrorMsg('cannot remove toy')
			})
	}

	function onSetSort(sortBy) {
		setFilter({ sortBy })
	}

	function setPageIdx(pageIdx) {
		setFilter({ pageIdx })
	}

	return (
		<section className="toy-index">
			<ToySort sortBy={filterBy.sortBy} onSetSort={onSetSort} />
			<ToyFilter filterBy={filterBy} onSetFilter={setFilter} />

			<button className="btn">
				<Link to="/toy/edit">Add Toy</Link>
			</button>
			<PaginationButtons pageIdx={filterBy.pageIdx} setPageIdx={setPageIdx} toysLength={toys.length} />
			{isLoading ? <div>loading...</div> : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
		</section>
	)
}

import { useEffect } from 'react'
import { ToyList } from '../cmps/ToyList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { Link } from 'react-router-dom'
import { ToySort } from '../cmps/toySort.jsx'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'

export function ToyIndex() {
	const toys = useSelector(storState => storState.toyModule.toys)
	const total = useSelector(storState => storState.toyModule.total)
	const filterBy = useSelector(storState => storState.toyModule.filterBy)
	const isLoading = useSelector(storState => storState.toyModule.isLoading)

	const dispatch = useDispatch()

	useEffect(() => {
		loadToys()
	}, [filterBy])

	function setFilter(filterBy) {
		setFilterBy(filterBy)
	}

	async function onRemoveToy(toyId) {
		try {
			await removeToy(toyId)
			showSuccessMsg('toy removed successfully')
		} catch (err) {
			showErrorMsg('cannot remove toy')
		}
	}

	function onSetSort(sortBy) {
		setFilter({ ...filterBy, sortBy: sortBy })
	}

	function setPageIdx(pageIdx) {
		setFilter({ ...filterBy, pageIdx: pageIdx })
	}

	function addToyToCart(toy) {
		console.log(`Adding ${toy.name} to Cart`)
		dispatch({ type: ADD_TOY_TO_CART, toy })
		showSuccessMsg('Added to Cart')
	}

	return (
		<section className="toy-index">
			<ToyFilter filterBy={filterBy} onSetFilter={setFilter}>
				<ToySort sortBy={filterBy.sortBy} onSetSort={onSetSort} />
			</ToyFilter>

			<button className="btn">
				<Link to="/toy/edit">Add Toy</Link>
			</button>
			<PaginationButtons pageIdx={filterBy.pageIdx} setPageIdx={setPageIdx} toysLength={toys.length} total={total} />
			{isLoading ? <div>loading...</div> : <ToyList toys={toys} onRemoveToy={onRemoveToy} addToyCart={addToyToCart} />}
		</section>
	)
}

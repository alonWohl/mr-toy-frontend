import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/toySort.jsx'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'
import { LoadingSpinner } from '../cmps/LoadingSpinner.jsx' // You'll need to create this component

export function ToyIndex() {
	const dispatch = useDispatch()

	// Selectors
	const { toys, total, filterBy, isLoading } = useSelector(state => state.toyModule)

	const loggedInUser = useSelector(state => state.userModule.loggedInUser)
	const isAdmin = loggedInUser?.isAdmin || false

	useEffect(() => {
		try {
			loadToys()
		} catch (err) {
			showErrorMsg('Failed to load toys')
		}
	}, [filterBy])

	const setFilter = updatedFilter => {
		setFilterBy(updatedFilter)
	}

	const onRemoveToy = async toyId => {
		try {
			await removeToy(toyId)
			showSuccessMsg('Toy removed successfully')
		} catch (err) {
			showErrorMsg('Cannot remove toy')
		}
	}

	const onSetSort = sortBy => {
		setFilter({ ...filterBy, sortBy, pageIdx: 0 }) // Reset page when sorting changes
	}

	const setPageIdx = pageIdx => {
		setFilter({ ...filterBy, pageIdx })
	}

	const addToyToCart = toy => {
		try {
			dispatch({ type: ADD_TOY_TO_CART, toy })
			showSuccessMsg(`Added ${toy.name} to cart`)
		} catch (err) {
			showErrorMsg('Failed to add to cart')
		}
	}

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner />
		}

		if (!toys.length) {
			return (
				<div className="empty-state">
					<h2>No toys found</h2>
					<p>Try adjusting your filters or add new toys</p>
				</div>
			)
		}

		return <ToyList toys={toys} onRemoveToy={onRemoveToy} addToyCart={addToyToCart} isAdmin={isAdmin} />
	}

	return (
		<section className="toy-index">
			<div className="toy-index-header">
				<ToyFilter filterBy={filterBy} onSetFilter={setFilter}>
					<ToySort sortBy={filterBy.sortBy} onSetSort={onSetSort} />
				</ToyFilter>

				{isAdmin && (
					<Link to="/toy/edit" className="btn add-toy-btn">
						Add Toy
					</Link>
				)}
			</div>

			<PaginationButtons pageIdx={filterBy.pageIdx} setPageIdx={setPageIdx} toysLength={toys.length} total={total} />

			{renderContent()}
		</section>
	)
}

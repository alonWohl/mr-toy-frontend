import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
	query,
	getById,
	save,
	remove,
	getEmptyToy,
	getRandomToy,
	getDefaultFilter
}

function query(filterBy = {}) {
	const regex = new RegExp(filterBy.txt, 'i')
	return storageService.query(STORAGE_KEY).then(toys => {
		let filteredToys = toys.filter(toy => regex.test(toy.name))
		if (filterBy.maxPrice) {
			filteredToys = filteredToys.filter(toy => toy.price <= filterBy.maxPrice)
		}

		if (filterBy.inStock) {
			filteredToys = filteredToys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
		}

		if (filterBy.labels && filterBy.labels.length) {
			filteredToys = filteredToys.filter(toy => filterBy.labels.some(label => toy.labels.includes(label)))
		}

		const { sortBy } = filterBy
		if (sortBy.type) {
			filteredToys.sort((t1, t2) => {
				const sortDirection = +sortBy.desc
				if (sortBy.type === 'name') {
					return t1.name.localeCompare(t2.name) * sortDirection
				} else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
					return (t1[sortBy.type] - t2[sortBy.type]) * sortDirection
				}
			})
		}

		return filteredToys
	})
}

function getById(toyId) {
	return storageService.get(STORAGE_KEY, toyId).then(toy => {
		if (!toy) throw new Error('Toy not found')
		return _setNextPrevToyId(toy)
	})
}

function remove(toyId) {
	return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
	if (toy._id) {
		return storageService.put(STORAGE_KEY, toy)
	} else {
		return storageService.post(STORAGE_KEY, toy)
	}
}

function getEmptyToy() {
	return {
		name: '',
		price: 0,
		inStock: true,
		labels: []
	}
}

function getRandomToy() {
	return {
		name: 'Toy-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1, 150),
		labels: utilService.getRandomSubset(labels, 3),
		inStock: Math.random() > 0.5 // Randomly set inStock
	}
}

function getDefaultFilter() {
	return {
		txt: '',
		maxPrice: '',
		inStock: null,
		labels: [],
		sortBy: {
			type: '',
			desc: 1
		}
	}
}

function _createToys() {
	let toys = utilService.loadFromStorage(STORAGE_KEY)
	if (toys && toys.length > 0) return

	toys = []
	for (let i = 0; i < 12; i++) {
		const toy = getRandomToy()
		toy._id = utilService.makeId()
		toy.createdAt = Date.now()
		toys.push(toy)
	}
	utilService.saveToStorage(STORAGE_KEY, toys)
}

function _setNextPrevToyId(toy) {
	return storageService.query(STORAGE_KEY).then(toys => {
		const toyIdx = toys.findIndex(currToy => currToy._id === toy._id)
		const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
		const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
		toy.nextToyId = nextToy._id
		toy.prevToyId = prevToy._id
		return toy
	})
}

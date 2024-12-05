import { toyService } from '../../services/toy.service.js'

export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'

export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

export const SET_CHARTS_DATA = 'SET_CHARTS_DATA'

const initialStale = {
	isLoading: false,
	chartsData: {},
	toys: [],
	filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialStale, action) {
	switch (action.type) {
		case SET_TOYS:
			return { ...state, toys: action.toys, total: action.total }

		case REMOVE_TOY:
			const prevToys = [...state.toys]
			return {
				...state,
				toys: state.toys.filter(toy => toy._id !== action.toyId),
				prevToys
			}

		case ADD_TOY:
			return { ...state, toys: [...state.toys, action.toy] }

		case UPDATE_TOY:
			return {
				...state,
				toys: state.toys.map(toy => (toy._id === action.toId ? action.toy : toy))
			}

		case SET_IS_LOADING:
			return { ...state, isLoading: action.isLoading }

		case SET_FILTER_BY:
			return { ...state, filterBy: action.filterBy }

		case TOY_UNDO:
			return {
				...state,
				toys: [...state.lastToys]
			}

		//* Shopping cart
		case TOGGLE_CART_IS_SHOWN:
			return { ...state, isCartShown: !state.isCartShown }

		case ADD_TOY_TO_CART:
			return {
				...state,
				shoppingCart: [...state.shoppingCart, action.toy]
			}

		case REMOVE_TOY_FROM_CART:
			const shoppingCart = state.shoppingCart.filter(toy => toy._id !== action.toyId)
			return { ...state, shoppingCart }

		case CLEAR_CART:
			return { ...state, shoppingCart: [] }

		case SET_CHARTS_DATA:
			return {
				...state,
				chartsData: action.chartsData
			}

		default:
			return state
	}
}

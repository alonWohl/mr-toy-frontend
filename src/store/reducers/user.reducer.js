import { userService } from '../../services/user.service.js'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
	loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
	switch (action.type) {
		//* Count

		//* User
		case SET_USER:
			return {
				...state,
				loggedInUser: action.user
			}
		case SET_USER_SCORE:
			const loggedInUser = { ...state.loggedInUser, score: action.score }
			return { ...state, loggedInUser }
		default:
			return state
	}
}

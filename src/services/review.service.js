import { httpService } from './http.service'

const BASE_URL = 'review/'

export const reviewService = {
	query,
	remove,
	add
}

async function query(filterBy = {}) {
	return await httpService.get(BASE_URL)
}

async function remove(reviewId) {
	await httpService.delete(BASE_URL + reviewId)
}

async function add(review) {
	return await httpService.post(BASE_URL, review)
}

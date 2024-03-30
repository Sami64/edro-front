'use server'

import { User } from '@/types'
import { GetUserParams } from '../shared.types'

export const getUser = async (params: GetUserParams): Promise<User> => {
	try {
		const { id, username } = params

		if (!id && !username) {
			throw new Error('Invalid params: Expected either id or username')
		}

		let result

		if (username != null)
			result = await fetch(`${process.env.HOST}/users?username=${username}`)
		else result = await fetch(`${process.env.HOST}/users/${id}`)

		if (!result.ok) {
			throw new Error('Failed to fetch data')
		}

		const data = await result.json()

		if (username) {
			return data[0] as User
		}

		// Validation Logic
		if (typeof data !== 'object') {
			throw new Error('Invalid data format: Expected a User object')
		}

		if (typeof data.id !== 'string' || typeof data.username !== 'string') {
			throw new Error('Invalid User object')
		}

		return data as User
	} catch (err) {
		if (err instanceof TypeError) {
			console.error('Server response is not a valid JSON:', err)
		} else if (err instanceof Error && err.message === 'Failed to fetch data') {
			console.error('Failed to fetch data:', err)
		} else {
			console.error('An error occurred:', err)
		}

		throw Error('Failed to fetch user')
	}
}

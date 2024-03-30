'use server'

import { User } from '@/types'
import { revalidatePath } from 'next/cache'
import { CreateUserParams } from '../shared.types'
import { getUser } from './get'

export const createUser = async (params: CreateUserParams): Promise<User> => {
	try {
		const { username } = params

		const user = await getUser({ username: username })

		if (user) {
			revalidatePath('/')
			return user
		}

		const result = await fetch(`${process.env.HOST}/users`, {
			method: 'POST',
			body: JSON.stringify({ username }),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!result.ok) {
			throw new Error('Failed to create user')
		}

		const data = await result.json()

		// Validation Logic
		if (typeof data !== 'object') {
			throw new Error('Invalid data format: Expected a User object')
		}

		if (typeof data.id !== 'string' || typeof data.username !== 'string') {
			throw new Error('Invalid User object')
		}

		revalidatePath('/')
		return data as User
	} catch (err) {
		if (err instanceof TypeError) {
			console.error('Server response is not a valid JSON:', err)
		} else if (
			err instanceof Error &&
			err.message === 'Failed to create user'
		) {
			console.error('Failed to create user:', err)
		} else {
			console.error('An error occurred:', err)
		}

		throw Error('Failed to create user')
	}
}

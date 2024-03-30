'use server'
import { Quote } from './../../types/index.d'

import { revalidatePath } from 'next/cache'
import { validateQuote } from '../validations'
import { generateCover } from './image.generation.action'
import {
	CreateQuoteParams,
	GetQuoteParams,
	GetUserQuotesParams,
} from './shared.types'
import { getUser } from './user.action'

export const createQuote = async (params: CreateQuoteParams) => {
	try {
		const { text, createdAt, userId } = params

		/// Get user
		const user = await getUser({ id: userId })

		if (!user) {
			throw new Error('User not found, Please create your account first.')
		}

		const cover = await generateCover({ text })

		const body: Omit<Quote, 'id'> = {
			text,
			user,
			createdAt,
			cover: cover ?? '',
		}

		const result = await fetch(`${process.env.HOST}/quotes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		if (!result.ok) {
			throw new Error('Failed to create quote')
		}

		const data = await result.json()

		// Validation Quote Response
		validateQuote(data)
		revalidatePath('/')

		return data as Quote
	} catch (err) {}
}

export const getQuote = async (params: GetQuoteParams) => {
	try {
		const { id } = params
		const result = await fetch(`${process.env.HOST}/quotes/${id}`)

		if (!result.ok) {
			throw new Error('Failed to fetch data')
		}

		const data = await result.json()

		// Validation Logic
		if (typeof data !== 'object') {
			throw new Error('Invalid data format: Expected a Quote object')
		}

		validateQuote(data)

		return data as Quote
	} catch (err) {
		if (err instanceof TypeError) {
			console.error('Server response is not a valid JSON:', err)
		} else if (
			err instanceof Error &&
			err.message === 'Invalid data format: Expected a Quote object'
		) {
			console.error('Invalid data format from server:', err)
		} else {
			console.error('Failed to fetch quote:', err)
		}

		throw Error('Failed to fetch quote')
	}
}

export const getQuotes = async (): Promise<Quote[]> => {
	try {
		const result = await fetch(`${process.env.HOST}/quotes`, {
			method: 'GET',
			// cache: 'no-store',
		})

		if (!result.ok) {
			throw new Error('Failed to fetch data')
		}

		const data = await result.json()

		// Validation Logic
		if (!Array.isArray(data)) {
			throw new Error('Invalid data format: Expected an array of Quote objects')
		}

		if (data.length !== 0)
			data.forEach((item) => {
				validateQuote(item)
			})

		data.sort((quoteA, quoteB) => {
			const dateA = new Date(quoteA.createdAt)
			const dateB = new Date(quoteB.createdAt)

			// For descending order (newest to oldest):
			return dateB.getTime() - dateA.getTime()
		})

		return data as Quote[]
	} catch (err) {
		if (err instanceof TypeError) {
			console.error('Server response is not a valid JSON:', err)
		} else if (
			err instanceof Error &&
			err.message === 'Invalid data format: Expected an array of Quote objects'
		) {
			console.error('Invalid data format from server:', err)
		} else {
			console.error('Failed to fetch quotes:', err)
		}

		throw Error('Failed to fetch quotes')
	}
}

export const getUserQuotes = async (
	params: GetUserQuotesParams
): Promise<Quote[]> => {
	try {
		if (!params.userId) throw new Error('User ID is required')

		const result = await fetch(
			`${process.env.HOST}/quotes?user.id=${params.userId}`
		)

		if (!result.ok) {
			throw new Error('Failed to fetch data')
		}

		const data = await result.json()

		// Validation Logic
		if (!Array.isArray(data)) {
			throw new Error('Invalid data format: Expected an array of Quote objects')
		}

		data.forEach((item) => {
			validateQuote(item)
		})

		return data as Quote[]
	} catch (err: any) {
		if (err instanceof TypeError) {
			console.error('Server response is not a valid JSON:', err)
		} else if (
			err instanceof Error &&
			err.message === 'Invalid data format: Expected an array of Quote objects'
		) {
			console.error('Invalid data format from server:', err)
		} else {
			console.error('Failed to fetch quotes:', err)
		}

		throw err
	}
}

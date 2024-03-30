'use server'

import { validateQuote } from "@/lib/validations"
import { Quote } from "@/types"

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

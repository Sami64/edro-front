'use server'

import { validateQuote } from "@/lib/validations"
import { Quote } from "@/types"
import { GetUserQuotesParams } from "../shared.types"

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

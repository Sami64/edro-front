'use server'
import { Quote } from '../../../types'

import { validateQuote } from '../../validations'
import { GetQuoteParams } from '../shared.types'

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

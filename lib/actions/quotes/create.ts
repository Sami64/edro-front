'use server'

import { validateQuote } from '@/lib/validations'
import { Quote } from '@/types'
import { revalidatePath } from 'next/cache'
import { generateCover } from '../image.generation.action'
import { CreateQuoteParams } from '../shared.types'
import { getUser } from '../user/get'

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

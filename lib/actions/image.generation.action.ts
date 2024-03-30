'use server'

import { GenerateCoverParams } from './shared.types'

export const generateCover = async (params: GenerateCoverParams) => {
	try {
		const result = await fetch('https://api.edenai.run/v2/image/generation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmI4Yzg4NTItNjZhMi00MTg4LTlkZGItYTM4NGEyYzFkMjJjIiwidHlwZSI6ImFwaV90b2tlbiJ9.-va_y670KORvd7AUXGJOT8911NlbHgnQd1cNeatzn10',
			},
			body: JSON.stringify({
				providers: 'replicate',
				text: params.text,
				resolution: '512x512',
				fallback_providers: 'amazon',
			}),
		})

		const data = await result.json()

		if (data.replicate.status === 'success') {
			return data.replicate.items[0].image_resource_url as string
		} else {
			return data.amazon.items[0].image_resource_url as string
		}
	} catch (err) {
		console.error('Failed to generate cover:', err)
		return null
	}
}

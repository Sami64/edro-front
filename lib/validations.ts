import { Quote } from '@/types'

export function validateQuote(item: any): asserts item is Quote {
	if (
		typeof item.id !== 'string' ||
		typeof item.text !== 'string' ||
		!validateUser(item.user) ||
		!isValidTimestamp(item.createdAt)
	) {
		throw new Error('Invalid Quote object')
	}
}

// Modify validateUser to return a boolean
export function validateUser(user: any): boolean {
	return typeof user.id === 'string' && typeof user.username === 'string'
}

function isValidTimestamp(timestamp: any): boolean {
	// 1. Check if it's a string (to be safe)
	if (typeof timestamp !== 'string') {
		return false
	}

	// 2. Attempt to create a Date object
	const date = new Date(timestamp)

	// 3. Check if the resulting Date is valid
	return !isNaN(date.getTime())
}

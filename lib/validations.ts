import { Quote } from "@/types"

export function validateQuote(item: any): asserts item is Quote {
	if (
		typeof item.id !== 'string' ||
		typeof item.text !== 'string' ||
		!validateUser(item.user) ||
		!(item.createdAt instanceof Date)
	) {
		throw new Error('Invalid Quote object')
	}
}

// Modify validateUser to return a boolean
export function validateUser(user: any): boolean {
	return typeof user.id === 'string' && typeof user.username === 'string'
}

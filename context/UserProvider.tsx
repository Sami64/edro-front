'use client'

import { User } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'

interface UserContextType {
	user: User | null
	setUser: (user: User) => void
	removeUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const handleUserChange = () => {
			if (JSON.parse(localStorage.getItem('user') as string) !== null) {
				setUser(JSON.parse(localStorage.getItem('user') as string))
			}
			localStorage.setItem('user', JSON.stringify(user))
		}

		handleUserChange()
	}, [user])

	const removeUser = () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	return (
		<UserContext.Provider value={{ user, setUser, removeUser }}>
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)

	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return context
}

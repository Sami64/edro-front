'use client'

import { useUser } from '@/context/UserProvider'
import Link from 'next/link'
import { CreateAccount } from '../account/CreateAccount'
import { AddQuote } from '../quote/AddQuote'
import { Button } from '../ui/button'

const NavItems = () => {
	const { user, removeUser } = useUser()

	return (
		<div className="flex justify-between items-center gap-5">
			{user && <AddQuote />}
			{user ? (
				<Link href={`/profile/${user.id}`}>
					<p className="font-bold text-slate-500">Profile</p>
				</Link>
			) : (
				<CreateAccount />
			)}
			{user && <Button onClick={removeUser}>Logout</Button>}
		</div>
	)
}

export default NavItems

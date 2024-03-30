'use client'

import Link from 'next/link'
import { CreateAccount } from '../account/CreateAccount'
import { AddQuote } from '../quote/AddQuote'

const NavItems = () => {
	return (
		<div className="flex justify-between items-center gap-5">
			{localStorage.getItem('user') && <AddQuote/>}
			{localStorage.getItem('user') ? (
				<Link
					href={`/profile/${
						JSON.parse(localStorage.getItem('user') as string).id
					}`}>
					<p>Profile</p>
				</Link>
			) : (
				<CreateAccount />
			)}
		</div>
	)
}

export default NavItems

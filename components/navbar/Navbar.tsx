import Link from 'next/link'
import NavItems from './NavItems'

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center p-6 w-full">
            <Link href='/'>
			<h1 className="text-2xl font-extrabold text-primary">
				Quote<span className='text-slate-500'>Me</span>
			</h1>
            </Link>
			<NavItems />
		</nav>
	)
}

export default Navbar

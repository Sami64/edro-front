import NavItems from './NavItems'

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center p-6 w-full">
			<h1 className="text-2xl font-extrabold text-orange-600">QuoteMe</h1>
			<NavItems />
		</nav>
	)
}

export default Navbar

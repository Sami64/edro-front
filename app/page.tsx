import Navbar from '@/components/navbar/Navbar'
import { getQuotes } from '@/lib/actions/quote.action'

export default async function Home() {
	const quotes = await getQuotes()

	return (
		<main className='relative'>
			<Navbar />
			<div className='px-12'>Quotes Length {quotes.length}</div>
		</main>
	)
}

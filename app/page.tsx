import QuoteCard from '@/components/cards/QuoteCard'
import Navbar from '@/components/navbar/Navbar'
import { getQuotes } from '@/lib/actions/quote.action'
import { QuoteIcon } from 'lucide-react'

export default async function Home() {
	const quotes = await getQuotes()

	return (
		<main className="relative w-screen">
			<Navbar />
			<div className="w-full px-12 pb-5">
				<div className="flex items-start justify-center italic">
					<p className='flex text-xl font-semibold text-slate-500'>
						Where words connect. Discover quotes that uplift, challenge, and
						make you think.
						<QuoteIcon className='text-primary h-5'/>
					</p>
				</div>
				<section className="flex flex-wrap gap-1 mt-8 w-full">
					{quotes.map((quote) => (
						<QuoteCard
							key={quote.id}
							quote={quote}
						/>
					))}
				</section>
			</div>
		</main>
	)
}

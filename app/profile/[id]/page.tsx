import QuoteCard from '@/components/cards/QuoteCard'
import { getUserQuotes } from '@/lib/actions/quote.action'
import Link from 'next/link'

const Page = async ({ params }: any) => {
	const { id } = params

	const quotes = await getUserQuotes({ userId: id })

	return (
		<div className="relative px-6 w-screen">
			<div className="flex justify-between items-center py-6 w-full">
				<Link href="/">
					<h1 className="text-2xl font-extrabold text-primary">
						Quote<span className="text-slate-500">Me</span>
					</h1>
				</Link>
				<p className="font-bold text-slate-500">Your Profile</p>
			</div>
			<div className="w-full px-6">
				<h1 className="font-bold text-slate-700">Quotes</h1>
				<section className="flex flex-wrap gap-1 mt-8 w-full">
					{quotes.map((quote) => (
						<QuoteCard
							key={quote.id}
							quote={quote}
						/>
					))}
				</section>
			</div>
		</div>
	)
}

export default Page

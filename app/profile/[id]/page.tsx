import { getUserQuotes } from '@/lib/actions/quote.action'

const Page = async ({ params }: any) => {
	const { id } = params

	const quotes = await getUserQuotes({ userId: id })

	return (
		<div className="relative px-6 w-screen">
			<div className="flex justify-between items-center py-6 w-full">
				<h1 className="text-2xl font-extrabold text-orange-600">QuoteMe</h1>
				<p>Your Profile</p>
			</div>
			<div className="w-full px-6">
				<h1>Quotes</h1>
				<section className="flex flex-wrap gap-1 mt-8 w-full">
					{quotes.map((quote) => (
						<article
							key={quote.id}
							className="flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]"></article>
					))}
				</section>
			</div>
		</div>
	)
}

export default Page

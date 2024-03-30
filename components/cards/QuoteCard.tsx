import { getTimestamp } from '@/lib/utils'
import { Quote } from '@/types'
import { CircleIcon } from 'lucide-react'
import Image from 'next/image'

interface Props {
	quote: Quote
}

const QuoteCard = ({ quote }: Props) => {
	return (
		<article
			key={quote.id}
			className="flex w-full flex-col rounded-2xl border my-1 sm:w-[260px]">
			<div className="h-[256px] bg-primary w-full rounded-t-2xl">
				{quote.cover && (
					<Image
						height={512}
						width={512}
						src={quote.cover}
						alt="quote-cover"
                        className='rounded-t-2xl'
					/>
				)}
			</div>
			<div className="px-3 py-2 flex flex-col">
				<p className='text-slate-700 font-bold'>{quote.text}</p>
				<div className="flex items-center text-xs text-slate-600 pt-2">
					<p>{quote.user.username}</p>
					<CircleIcon className="h-1 px-1" />
					<p>{getTimestamp(new Date(quote.createdAt))}</p>
				</div>
			</div>
		</article>
	)
}

export default QuoteCard

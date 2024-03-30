'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { useUser } from '@/context/UserProvider'
import { createQuote } from '@/lib/actions/quotes/create'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '../ui/textarea'
import { useToast } from '../ui/use-toast'

const formSchema = z.object({
	content: z.string().min(5, {
		message: 'Quote must be at least 5 characters.',
	}),
})

export function AddQuote() {
	const { toast } = useToast()
	const { user } = useUser()
	const [loading, setIsLoading] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		try {
			await createQuote({
				text: values.content,
				createdAt: new Date(Date.now()),
				userId: user?.id as string,
			})

			form.reset()
			toast({
				title: 'Your quote has been added successfully!🎉',
				description: "Don't hesitate to add more",
			})
		} catch (err) {
			console.error('Failed to add quote:', err)
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with adding your quote',
			})
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="border border-primary text-slate-500 font-bold">
					Add Quote
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Quote</DialogTitle>
					<DialogDescription>
						Say something, anything!. We don&apos;t mind.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8">
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder="when the fox jumps..."
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Enlighten us with your wisdom.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								disabled={loading}
								type="submit">
								{loading ? 'Adding...' : 'Add'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

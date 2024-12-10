import { z } from 'zod'

export const productSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Name is required'),
	price: z.coerce.number().min(0, 'Price must be positive'),
	quantity: z.coerce.number().min(0, 'Quantity must be positive'),
	description: z.string().min(1, 'Description is required'),
	file: z.any(),
	srcImg: z.string().optional(),
	isFavorite: z.boolean().optional(),
})

export type productType = z.infer<typeof productSchema>

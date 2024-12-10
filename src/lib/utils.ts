import { productType } from '@/schema'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function sortProducts(products: productType[], sortBy: string) {
	const sortedProducts = products.sort((a, b) => {
		if (sortBy === 'price') {
			return a.price - b.price
		}
		if (sortBy === 'quantity') {
			return a.quantity - b.quantity
		}
		return 0
	})
	return sortedProducts
}

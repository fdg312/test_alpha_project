import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { sortProducts } from './lib/utils'
import { productType } from './schema'

interface IProductStore {
	products: productType[]
	product: productType | null
	fetchProducts: () => void
	fetchProduct: (id: string) => void
	toggleFavorite: (id: string, isFavorite: boolean) => void
	sortBy: string
	setSortBy: (sortBy: string) => void
}

export const useProductStore = create<IProductStore>()(
	persist(
		(set, get) => ({
			products: [],
			product: null,
			setProduct: (product: productType) => {
				set({ product })
			},
			fetchProducts: async () => {
				const res = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/products`
				)
				const data = await res.json()
				if (get().sortBy !== '') {
					set({ products: sortProducts(data, get().sortBy) })
				} else {
					set({ products: data })
				}
			},
			fetchProduct: async (id: string) => {
				const res = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
				)
				const data = await res.json()
				set({ product: data })
			},
			toggleFavorite: async (id: string, isFavorite: boolean) => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}/favorite`,
					{
						method: 'PATCH',
						body: JSON.stringify({ isFavorite }),
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				if (get().product) {
					set({ product: await response.json() })
				}
			},
			sortBy: '',
			setSortBy: (sortBy: string) => {
				set({ sortBy })
				const products = get().products
				set({ products: sortProducts(products, sortBy) })
			},
		}),
		{
			name: 'product-store',
		}
	)
)

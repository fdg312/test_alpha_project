import { productType } from '@/schema'
import { useProductStore } from '@/store'
import { Heart } from 'lucide-react'

const ProductCard = ({ product }: { product: productType }) => {
	const { toggleFavorite } = useProductStore()

	if (!product.id) return null

	return (
		<div className='border p-4 rounded-md max-w-sm flex flex-col gap-2 relative'>
			<img src={product.srcImg} alt={product.name} className='w-full h-auto' />
			<h2 className='text-lg font-bold'>{product.name}</h2>
			<p className='text-sm text-gray-500'>{product.description}</p>
			<p className='text-sm text-gray-500'>Price: {product.price}</p>
			<p className='text-sm text-gray-500'>Quantity: {product.quantity}</p>
			<Heart
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					toggleFavorite(product.id!, !product.isFavorite)
				}}
				className={
					'w-8 h-8 absolute top-2 right-2 ' +
					(product.isFavorite ? 'text-red-500' : 'text-gray-500')
				}
			/>
		</div>
	)
}

export default ProductCard

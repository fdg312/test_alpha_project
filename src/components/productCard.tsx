import { productType } from '@/schema'

const ProductCard = ({ product }: { product: productType }) => {
	return (
		<div className='border p-4 rounded-md max-w-sm flex flex-col gap-2'>
			<img src={product.srcImg} alt={product.name} className='w-full h-auto' />
			<h2 className='text-lg font-bold'>{product.name}</h2>
			<p className='text-sm text-gray-500'>{product.description}</p>
			<p className='text-sm text-gray-500'>Price: {product.price}</p>
			<p className='text-sm text-gray-500'>Quantity: {product.quantity}</p>
		</div>
	)
}

export default ProductCard

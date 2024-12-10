import { productType } from '@/schema'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Product = () => {
	const { id } = useParams<{ id: string }>()
	const [product, setProduct] = useState<Required<productType> | null>(null)

	const handleFavorite = async (e: React.MouseEvent) => {
		e.preventDefault()
		await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/products/${
				product?.id
			}/favorite`,
			{
				method: 'PATCH',
				body: JSON.stringify({ isFavorite: !product?.isFavorite }),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		fetchProduct()
	}

	const fetchProduct = async () => {
		const res = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
		)
		const data = await res.json()
		console.log(data.isFavorite)
		setProduct(data)
	}

	useEffect(() => {
		fetchProduct()
	}, [id])

	return (
		<main className='container mx-auto p-4'>
			<div className='bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto'>
				<div className='md:flex'>
					<div className='md:w-1/2 relative'>
						<img
							src={product?.srcImg}
							alt={product?.name}
							className='w-full h-full object-cover'
						/>
						<Heart
							className={
								'w-8 h-8 absolute top-2 right-2 cursor-pointer ' +
								(product?.isFavorite ? 'text-red-500' : 'text-gray-500')
							}
							onClick={handleFavorite}
						/>
					</div>
					<div className='p-8 md:w-1/2'>
						<h1 className='mt-2 text-3xl font-bold text-gray-900'>
							{product?.name}
						</h1>
						<p className='mt-4 text-gray-600'>{product?.description}</p>
						<div className='mt-4'>
							<span className='text-2xl font-bold text-gray-900'>
								{product?.price} ₽
							</span>
						</div>
						<div className='mt-4'>
							<span className='text-gray-600'>
								Quantity: {product?.quantity}
							</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Product

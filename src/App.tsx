import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './App.css'
import ProductCard from './components/productCard'
import { Button } from './components/ui/button'
import { productType } from './schema'

function App() {
	const [products, setProducts] = useState<productType[]>([])
	const [sortBy, setSortBy] = useState<'price' | 'quantity' | ''>('')

	async function fetchData() {
		const response = await fetch('http://localhost:3000/api/products')
		const data = await response.json()
		setProducts(data)
		setSortBy('quantity')
	}

	useEffect(() => {
		const sortedProducts = [...products].sort((a, b) => {
			if (sortBy === 'price') {
				return a.price - b.price
			}
			if (sortBy === 'quantity') {
				return a.quantity - b.quantity
			}
			return 0
		})
		setProducts(sortedProducts)
	}, [sortBy])

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<main className='flex flex-col items-center justify-center max-w-2xl mx-auto'>
			<Button>
				<Link to='/create-product'>Create Product</Link>
			</Button>
			<h1 className='text-2xl font-bold mt-4 mb-4'>Products</h1>
			<div className='sort-btns flex gap-2 mb-4'>
				<Button
					disabled={sortBy === ''}
					className={
						sortBy === 'price'
							? 'bg-green-500 hover:bg-green-600'
							: 'bg-red-500 hover:bg-red-600'
					}
					onClick={() => setSortBy('price')}
				>
					Sort by price
				</Button>
				<Button
					disabled={sortBy === ''}
					className={
						sortBy === 'quantity'
							? 'bg-green-500 hover:bg-green-600'
							: 'bg-red-500 hover:bg-red-600'
					}
					onClick={() => setSortBy('quantity')}
				>
					Sort by quantity
				</Button>
			</div>
			<div className='products flex flex-col gap-4'>
				{products.map(product => (
					<Link key={product.id} to={`/products/${product.id}`}>
						<ProductCard fetchProducts={fetchData} product={product} />
					</Link>
				))}
			</div>
		</main>
	)
}

export default App

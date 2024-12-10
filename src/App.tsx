import { useEffect } from 'react'
import { Link } from 'react-router'
import './App.css'
import ProductCard from './components/productCard'
import { Button } from './components/ui/button'
import { useProductStore } from './store'

function App() {
	const { setSortBy, fetchProducts, products, sortBy } = useProductStore()

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<main className='flex flex-col items-center justify-center max-w-2xl mx-auto'>
			<Link to='/create-product'>
				<Button>Create Product</Button>
			</Link>
			<h1 className='text-2xl font-bold mt-4 mb-4'>Products</h1>
			<div className='sort-btns flex gap-2 mb-4'>
				<Button
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
						<ProductCard product={product} />
					</Link>
				))}
			</div>
		</main>
	)
}

export default App

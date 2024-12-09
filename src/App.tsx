import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './App.css'
import ProductCard from './components/productCard'
import { Button } from './components/ui/button'
import { productType } from './schema'

function App() {
	const [products, setProducts] = useState<productType[]>([])

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('http://localhost:3000/api/products')
			const data = await response.json()
			console.log(data)
			setProducts(data)
		}
		fetchData()
	}, [])

	return (
		<main className='flex flex-col items-center justify-center max-w-2xl mx-auto'>
			<Button>
				<Link to='/create-product'>Create Product</Link>
			</Button>
			<h1 className='text-2xl font-bold mt-4'>Products</h1>
			<div className='products flex flex-col gap-4'>
				{products.map(product => (
					<Link to={`/product/${product.id}`}>
						<ProductCard product={product} />
					</Link>
				))}
			</div>
		</main>
	)
}

export default App

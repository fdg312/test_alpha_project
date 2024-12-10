import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router'
import App from './App.tsx'
import './index.css'
import CreateProduct from './pages/createProduct.tsx'
import Product from './pages/Product.tsx'

createRoot(document.getElementById('root')!).render(
	<HashRouter basename='/test_alpha_project'>
		<Routes>
			<Route path='/' element={<Navigate to='/products' replace />} />
			<Route path='/products' element={<App />} />
			<Route path='/create-product' element={<CreateProduct />} />
			<Route path='/products/:id' element={<Product />} />
		</Routes>
	</HashRouter>
)

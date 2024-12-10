import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import * as filestack from 'filestack-js'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ImageUploader } from '../components/imageUploader'
import { productSchema, productType } from '../schema'

const client = filestack.init('AlFQ54ueIQf29nzloyEeQz')

const CreateProduct = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<productType>({
		resolver: zodResolver(productSchema),
	})

	const fetchData = async (data: Partial<productType>) => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		})
			.then(res => res.json())
			.catch(error => console.error(error))
	}

	const onSubmit = async (data: Omit<productType, 'srcImg'>) => {
		console.log(data)

		try {
			setIsLoading(true)
			const file = data.file[0]
			const uploadResponse = await client.upload(file)
			console.log(uploadResponse)

			await fetchData({
				...data,
				srcImg: uploadResponse.url,
			})
			navigate('/products')
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<main className='flex flex-col items-center justify-center'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4 max-w-sm flex flex-col'
			>
				<div>
					<Label htmlFor='name'>Product Name</Label>
					<Input required id='name' {...register('name')} />
					{errors.name && (
						<span className='text-red-500'>{errors.name.message}</span>
					)}
				</div>
				<div>
					<Label htmlFor='price'>Price</Label>
					<Input
						required
						id='price'
						type='number'
						{...register('price', { valueAsNumber: true })}
					/>
					{errors.price && (
						<span className='text-red-500'>{errors.price.message}</span>
					)}
				</div>
				<div>
					<Label htmlFor='quantity'>Quantity</Label>
					<Input
						required
						id='quantity'
						type='number'
						{...register('quantity', { valueAsNumber: true })}
					/>
					{errors.quantity && (
						<span className='text-red-500'>{errors.quantity.message}</span>
					)}
				</div>
				<div>
					<Label htmlFor='description'>Description</Label>
					<Input required id='description' {...register('description')} />
					{errors.description && (
						<span className='text-red-500'>{errors.description.message}</span>
					)}
				</div>
				<div>
					<Label>Image</Label>
					<ImageUploader register={register} error={!!errors.file} />
					{errors.file && (
						<span className='text-red-500'>
							{errors.file.message?.toString()}
						</span>
					)}
				</div>
				<Button type='submit' disabled={isLoading}>
					Create Product
				</Button>
			</form>
		</main>
	)
}

export default CreateProduct

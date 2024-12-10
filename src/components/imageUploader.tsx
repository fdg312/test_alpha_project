import { UseFormRegister } from 'react-hook-form'
import { productType } from '../schema'

interface ImageUploaderProps {
	register: UseFormRegister<productType>
	error: boolean
}

export const ImageUploader = ({ register, error }: ImageUploaderProps) => {
	return (
		<input
			type='file'
			accept='image/*'
			className={`block cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-violet-100 ${
				error ? 'border-red-500' : ''
			}`}
			{...register('file', { required: 'Image is required' })}
		/>
	)
}

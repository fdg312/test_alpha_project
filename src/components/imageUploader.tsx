import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { productType } from '@/schema'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

interface ImageUploaderProps {
	register: UseFormRegister<productType>
	error?: boolean
	isLoading?: boolean
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
	register,
	error,
	isLoading,
}: ImageUploaderProps) => {
	return (
		<Input
			required
			id='file-upload'
			type='file'
			{...register('file', {
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
					const file = e.target.files?.[0]
					if (!file) return
				},
			})}
			className={cn(error && 'border-red-500', 'cursor-pointer')}
			accept='image/*'
			disabled={isLoading}
		/>
	)
}

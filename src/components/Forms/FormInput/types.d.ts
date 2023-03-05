import { TextInputProps } from 'flowbite-react'
import { Option } from 'react-tailwindcss-select/dist/components/type'

export type FormInputProps = TextInputProps & {
  wrapperClassName?: string
  labelClassName?: string
  label?: string
  errorMessage?: string
}

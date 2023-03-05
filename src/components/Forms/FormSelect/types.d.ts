import { Option } from 'react-tailwindcss-select/dist/components/type'

export type FormSelectProps = {
  value: Option
  options: Option[]
  onChange: (value: Option | Option[]) => void
  required?: boolean
  wrapperClassName?: string
  labelClassName?: string
  label?: string
  placeholder?: string
  errorMessage?: string
  isSearchable?: boolean
  isClearable?: boolean
  isDisabled?: boolean
}

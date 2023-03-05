import Select from 'react-tailwindcss-select'

import cn from 'classnames'
import { Label } from 'flowbite-react'

import { type FormSelectProps } from './types'

const FormSelect = ({
  value,
  label,
  errorMessage,
  wrapperClassName,
  labelClassName,
  required,
  onChange,
  ...props
}: FormSelectProps) => {
  return (
    <div className={cn('flex flex-col w-full', wrapperClassName)}>
      <div className={cn('w-full mb-1', { hidden: !label })}>
        <Label value={label} className={cn(labelClassName)} />
        <span className={cn('text-red-500', { hidden: !required })}>*</span>
      </div>
      <Select
        primaryColor="violet"
        placeholder="Input"
        value={value}
        onChange={onChange}
        {...props}
      />
      <p
        className={cn('text-finamiRed text-sm mt-1', {
          hidden: !errorMessage,
        })}
      >
        {errorMessage}
      </p>
    </div>
  )
}

export default FormSelect

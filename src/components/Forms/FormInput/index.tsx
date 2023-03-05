import cn from 'classnames'
import { Label, TextInput } from 'flowbite-react'

import { type FormInputProps } from './types'

const FormInput = ({
  id,
  label,
  errorMessage,
  wrapperClassName,
  labelClassName,
  className,
  required,
  ...props
}: FormInputProps) => {
  return (
    <div className={cn('flex flex-col w-full', wrapperClassName)}>
      <div className={cn('w-full mb-1', { hidden: !label })}>
        <Label htmlFor={id} value={label} className={cn(labelClassName)} />
        <span className={cn('text-red-500', { hidden: !required })}>*</span>
      </div>
      <TextInput
        id={id}
        required={required}
        className={cn('finamiInput', className)}
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

export default FormInput

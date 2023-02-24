import { ButtonProps } from 'flowbite-react'
import { ReactElement } from 'react'

export type MyButtonProps = ButtonProps & {
  colorType?: 'primary' | 'secondary' | 'danger' | 'success'
  children: ReactElement | string
}

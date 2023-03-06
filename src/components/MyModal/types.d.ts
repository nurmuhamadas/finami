import { ModalProps } from 'flowbite-react'
import { ReactComponentElement } from 'react'

export type MyModalProps = ModalProps & {
  headerClassName?: string
  bodyClassName?: string
  header?: ReactComponentElement
  footer?: ReactComponentElement
  footerClassName?: string
}

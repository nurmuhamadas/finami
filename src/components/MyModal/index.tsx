import { useEffect, useState } from 'react'

import cn from 'classnames'
import { Modal } from 'flowbite-react'

import { type MyModalProps } from './types'

const MyModal = ({
  children,
  bodyClassName,
  header,
  headerClassName,
  footer,
  footerClassName,
  className,
  ...props
}: MyModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true)
  }, [])

  return isBrowser ? (
    <Modal className={cn('h-screen', className)} {...props}>
      {!!header && (
        <Modal.Header className={cn(headerClassName)}>{header}</Modal.Header>
      )}
      {!!children && (
        <Modal.Body className={cn(bodyClassName)}>{children}</Modal.Body>
      )}
      {!!footer && (
        <Modal.Body className={cn(footerClassName)}>{footer}</Modal.Body>
      )}
    </Modal>
  ) : null
}

export default MyModal

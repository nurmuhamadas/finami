import { useEffect, useState } from 'react'

import cn from 'classnames'
import { Modal } from 'flowbite-react'

import { type MyModalProps } from './types'

const MyModal = ({ children, className, ...props }: MyModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true)
  }, [])

  return isBrowser ? (
    <Modal className={cn('h-screen', className)} {...props}>
      {children}
    </Modal>
  ) : null
}

export default MyModal

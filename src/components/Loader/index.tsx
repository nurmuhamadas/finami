import cn from 'classnames'
import { Spinner } from 'flowbite-react'

import { type LoaderProps } from './types'

const Loader = ({ wrapperClassName }: LoaderProps) => {
  return (
    <div
      className={cn(
        'w-full py-12 flex items-center justify-center',
        wrapperClassName,
      )}
    >
      <Spinner color="purple" />
    </div>
  )
}

export default Loader

import { useState } from 'react'

import Image from 'next/image'

import cn from 'classnames'

import { type MyAvatarProps } from './types'

const MyAvatar = ({
  size,
  wrapperClassName,
  className,
  src,
  ...imageProps
}: MyAvatarProps) => {
  const [error, setError] = useState(null)

  return (
    <div
      className={cn(
        'rounded-full w-max h-max overflow-hidden relative border',
        wrapperClassName,
      )}
    >
      <Image
        {...imageProps}
        src={error ? '/static/images/default_pp.png' : src}
        width={size || 48}
        height={size || 48}
        className={cn('object-cover', className)}
        onError={setError}
      />
    </div>
  )
}

export default MyAvatar

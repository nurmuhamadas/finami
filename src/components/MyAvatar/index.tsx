import { useState } from 'react'

import Image from 'next/image'

import cn from 'classnames'

import { type MyAvatarProps } from './types'

const MyAvatar = ({
  size = 48,
  wrapperClassName,
  className,
  src,
  ...imageProps
}: MyAvatarProps) => {
  const [error, setError] = useState(null)

  return (
    <div
      className={cn(
        'rounded-full overflow-hidden relative border',
        wrapperClassName,
        `w-[${size}px]`,
      )}
    >
      <Image
        {...imageProps}
        src={error ? '/static/images/default_pp.webp' : src}
        width={size}
        height={size}
        className={cn('object-cover', className)}
        onError={setError}
      />
    </div>
  )
}

export default MyAvatar

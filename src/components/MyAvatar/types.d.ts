import { ImageProps } from 'next/image'

export type MyAvatarProps = ImageProps & {
  wrapperClassName?: string
  size?: number
}

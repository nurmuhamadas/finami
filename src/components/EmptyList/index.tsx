import { AiOutlineFile } from 'react-icons/ai'

import cn from 'classnames'

import { type EmptyListProps } from './types'

const EmptyList = ({ wrapperClassName }: EmptyListProps) => {
  return (
    <div
      className={cn(
        'w-full py-16 flex items-center justify-center flex-col gap-y-3 text-gray-400',
        wrapperClassName,
      )}
    >
      <AiOutlineFile size={32} />
      <span className="">No list</span>
    </div>
  )
}

export default EmptyList

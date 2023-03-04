import { AiOutlineEdit } from 'react-icons/ai'

import cn from 'classnames'
import { Avatar } from 'flowbite-react'

import MyButton from 'components/MyButton'

import { type MyAvatarProps } from './types'

const MyAvatar = ({
  showName,
  showButton,
  buttonText,
  onButtonClick,
}: MyAvatarProps) => {
  return (
    <div className="flex flex-col w-full space-y-2 items-center">
      <Avatar
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        aria-label="Nur Muhamad Ash Shidiqi"
        rounded={true}
        size={128}
      />
      <span className={cn({ hidden: !showName }, 'text-center')}>
        Nur Muhamad Ash Shdiqi
      </span>
      <MyButton
        color="light"
        className={cn('w-max', { hidden: !showButton })}
        onClick={onButtonClick}
      >
        <div className="w-full flex items-center gap-x-4">
          <div className="flex items-center">
            <AiOutlineEdit size={20} />
          </div>
          <span>{buttonText}</span>
        </div>
      </MyButton>
    </div>
  )
}

export default MyAvatar

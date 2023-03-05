import { AiOutlineEdit } from 'react-icons/ai'

import cn from 'classnames'

import MyAvatar from 'components/MyAvatar'
import MyButton from 'components/MyButton'

import { type ProfileAvatarProps } from './types'

const ProfileAvatar = ({
  showName,
  showButton,
  buttonText,
  onButtonClick,
}: ProfileAvatarProps) => {
  return (
    <div className="flex flex-col w-full space-y-2 items-center">
      <MyAvatar
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        aria-label="Nur Muhamad Ash Shidiqi"
        alt="Nur Muhamad Ash Shidiqi"
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

export default ProfileAvatar

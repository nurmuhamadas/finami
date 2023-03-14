import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import cn from 'classnames'

import MyAvatar from 'components/MyAvatar'
import MyButton from 'components/MyButton'

import { type ProfileAvatarProps } from './types'

const ProfileAvatar = ({
  showName,
  showButton,
  showDelete,
  buttonText,
  disableButton,
  disableDeleteButton,
  data = {
    src: undefined,
    name: undefined,
  },
  onDelete,
  onButtonClick,
}: ProfileAvatarProps) => {
  const { src, name } = data
  return (
    <div className="flex flex-col w-full space-y-2 items-center">
      {src && (
        <MyAvatar
          src={data.src}
          aria-label="Finami profile"
          alt="Finami profile"
          size={128}
        />
      )}
      {!src && (
        <MyAvatar
          src={'/static/images/default_pp.png'}
          aria-label={name}
          alt={name}
          size={128}
        />
      )}
      <span className={cn({ hidden: !showName }, 'text-center')}>{name}</span>
      <div className="flex items-center gap-2">
        <MyButton
          color="light"
          className={cn('w-max', { hidden: !showButton })}
          onClick={onButtonClick}
          disabled={disableButton}
        >
          <div className="w-full flex items-center gap-x-4">
            <div className="flex items-center">
              <AiOutlineEdit size={20} />
            </div>
            <span className={cn({ hidden: !buttonText })}>{buttonText}</span>
          </div>
        </MyButton>
        <MyButton
          color="light"
          className={cn('w-max', { hidden: !showDelete })}
          onClick={onDelete}
          disabled={disableDeleteButton}
        >
          <AiOutlineDelete size={20} />
        </MyButton>
      </div>
    </div>
  )
}

export default ProfileAvatar

import cn from 'classnames'
import { Button } from 'flowbite-react'

import { type MyButtonProps } from './types'

const MyButton = ({ colorType, children, ...props }: MyButtonProps) => {
  return (
    <Button
      className={cn({
        'bg-finamiBlue focus:bg-finamiBlueSecondary': colorType === 'primary',
        'bg-finamiRed focus:bg-finamiRedSecondary': colorType === 'danger',
        'bg-finamiGreen focus:bg-finamiGreenSecondary': colorType === 'success',
      })}
      {...props}
    >
      {children}
    </Button>
  )
}

export default MyButton

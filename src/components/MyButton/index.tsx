import cn from 'classnames'
import { Button } from 'flowbite-react'

import { type MyButtonProps } from './types'

const MyButton = ({
  colorType,
  children,
  className,
  ...props
}: MyButtonProps) => {
  return (
    <Button
      className={cn(
        {
          'bg-finamiBlue focus:bg-finamiBlueSecondary hover:bg-finamiBlueSecondary':
            colorType === 'primary',
          'bg-finamiRed focus:bg-finamiRedSecondary hover:bg-finamiRedSecondary':
            colorType === 'danger',
          'bg-finamiGreen focus:bg-finamiGreenSecondary hover:bg-finamiGreenSecondary':
            colorType === 'success',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export default MyButton

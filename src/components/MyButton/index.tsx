import cn from 'classnames'
import { Button, Spinner } from 'flowbite-react'

import { type MyButtonProps } from './types'

const MyButton = ({
  colorType,
  children,
  className,
  disabled,
  loading = false,
  ...props
}: MyButtonProps) => {
  return (
    <Button
      className={cn(
        {
          'bg-finamiBlue focus:bg-finamiBlueSecondary hover:bg-finamiBlueSecondary hover:disabled:bg-finamiBlue':
            colorType === 'primary',
          'bg-finamiRed focus:bg-finamiRedSecondary hover:bg-finamiRedSecondary hover:disabled:bg-finamiRed':
            colorType === 'danger',
          'bg-finamiGreen focus:bg-finamiGreenSecondary hover:bg-finamiGreenSecondary hover:disabled:bg-finamiGreen':
            colorType === 'success',
        },
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner color="purple" className="mr-2" />}
      {children}
    </Button>
  )
}

export default MyButton

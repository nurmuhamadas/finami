export type ProfileAvatarProps = {
  showName?: boolean
  showButton?: boolean
  showDelete?: boolean
  buttonText?: string
  disableButton?: boolean
  disableDeleteButton?: boolean
  size?: number
  data: {
    src: string
    name: string
  }
  onButtonClick?: () => void
  onDelete?: () => void
}

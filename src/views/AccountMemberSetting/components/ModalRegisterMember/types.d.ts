import { CreateUserPayload } from 'data/types'

export type ModalRegisterMemberProps = {
  onSubmit: (values: CreateUserPayload) => void
  disableForm?: boolean
  initialData?: CreateUserPayload
  errorMessage?: string
  show: boolean
  onValueChange?: () => void
  onClose: () => void
}

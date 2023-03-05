import { CreateUserPayload } from 'data/types'

export type ModalRegisterMemberProps = {
  onSubmit: (values: CreateUserPayload) => void
  disableForm?: boolean
  initialData?: CreateUserPayload
  show: boolean
  onClose: () => void
}

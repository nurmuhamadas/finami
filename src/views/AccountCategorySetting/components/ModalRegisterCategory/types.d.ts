import { CreateCategoryPayload } from 'data/types'

export type ModalRegisterCategoryProps = {
  onSubmit: (values: CreateCategoryPayload) => void
  disableForm?: boolean
  initialData?: CreateCategoryPayload
  show: boolean
  onClose: () => void
}

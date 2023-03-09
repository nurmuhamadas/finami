import { CreateCategoryPayload } from 'data/types'

export type ModalRegisterCategoryProps = {
  onSubmit: (values: CreateCategoryPayload) => void
  disableForm?: boolean
  initialData?: CreateCategoryPayload
  loading?: boolean
  errorMessage?: string
  show: boolean
  onClose: () => void
}

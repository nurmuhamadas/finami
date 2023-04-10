import { CreateCategoryPayload, UpdateCategoryPayload } from 'data/types'

export type ModalRegisterCategoryProps = {
  onSubmit: (values: CreateCategoryPayload | UpdateCategoryPayload) => void
  disableForm?: boolean
  initialData?: UpdateCategoryPayload
  loading?: boolean
  errorMessage?: string
  show: boolean
  onClose: () => void
}

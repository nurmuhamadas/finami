import { CreateWalletPayload, UpdateWalletPayload } from 'data/types'

export type WalletFormData = CreateWalletPayload

export type WalletModalProps = {
  isOpen: boolean
  isEditData?: boolean
  initialData?: CreateWalletPayload
  errorMessage?: string
  isSubmitting?: boolean
  onFormChange?: () => void
  onClose: () => void
  onSave: (data: WalletFormData) => void
}

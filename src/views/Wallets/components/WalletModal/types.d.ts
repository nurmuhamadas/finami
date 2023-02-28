import { CreateWalletPayload, UpdateWalletPayload } from 'data/types'

export type WalletFormData = CreateWalletPayload

export type WalletModalProps = {
  isOpen: boolean
  isEditData?: boolean
  initialData?: WalletFormData
  onClose: () => void
  onSave: (data: WalletFormData) => void
}

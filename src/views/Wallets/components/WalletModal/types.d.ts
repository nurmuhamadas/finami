export type WalletDataType = {
  name: string
  balance: number | null
  user_id: string
}

export type WalletModalProps = {
  isOpen: boolean
  initialData?: WalletDataType | null
  onClose: () => void
  onSave: (data: WalletDataType) => void
}

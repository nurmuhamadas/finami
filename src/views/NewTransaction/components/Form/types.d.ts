export type NewTransactionDataType = {
  category_id: string
  amount: number
  description: string
  user_id: string
  wallet_id: string
  date: Date
}

export type NewTransactionFormProps = {
  onSubmit: (values: NewTransactionDataType) => void
}

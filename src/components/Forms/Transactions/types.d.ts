import { CreateTransactionPayload, TransactionDataResponse } from 'data/types'

export type NewTransactionDataType = {
  category_id: string
  amount: number
  description: string
  user_id: string
  wallet_id: string
  date: Date
}

export type TransactionFormProps = {
  initialData?: TransactionDataResponse
  disableForm?: boolean
  onSubmit: (values: CreateTransactionPayload) => void
}

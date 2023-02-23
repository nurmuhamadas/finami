import { type TransactionTypesType } from 'utils/constants/types'

export type TransactionListItemProps = {
  className?: string
  data: {
    id: string
    name: string
    date: string
    amount: number
    transactionType: TransactionTypesType | 'other'
  }
}

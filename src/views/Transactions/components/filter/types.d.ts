import { TransactionTypesType } from 'data/types'
import { ReactElement } from 'react'

export type FilterTransactionValueType = {
  child_id?: string
  wallet_id?: string
  category_id?: string
  startDate?: Date
  endDate?: Date
  transaction_type?: TransactionTypesType
}

export type FilterTransactionsProps = {
  onChange: (value: FilterTransactionValueType) => void
  loading?: boolean
  disabled?: boolean
  hide?: {
    wallet?: boolean
    user?: boolean
    category?: boolean
    date?: boolean
    type?: boolean
  }
  wrapperClassName?: string
  startComponent?: ReactElement
  endComponent?: ReactElement
  initialValues?: FilterTransactionValueType
}

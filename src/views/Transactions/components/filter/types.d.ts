import { ReactElement } from 'react'

export type FilterTransactionValueType = {
  child_id?: string
  wallet_id?: string
  category_id?: string
  startDate?: Date
  endDate?: Date
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
  }
  wrapperClassName?: string
  startComponent?: ReactElement
  endComponent?: ReactElement
  initialValues?: FilterTransactionValueType
}

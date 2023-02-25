import { ReactElement } from 'react'

export type FilterTransactionValueType = {
  user_id?: string
  wallet_id?: string
  date?: sting | string[]
}

export type FilterTransactionsProps = {
  onChange: (value: FilterTransactionValueType) => void
  loading?: boolean
  disabled?: boolean
  hide?: {
    wallet?: boolean
    user?: boolean
    date?: boolean
  }
  wrapperClassName?: string
  startComponent?: ReactElement
  endComponent?: ReactElement
}

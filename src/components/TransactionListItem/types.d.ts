import { TransactionDataType } from 'utils/constants/types'

export type TransactionListItemProps = {
  className?: string
  data: TransactionDataType
  onClick?: (d: TransactionDataType) => void
}

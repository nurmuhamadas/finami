import { TransactionDataResponse } from 'data/types'
import { TransactionDataType } from 'utils/constants/types'

export type TransactionListItemProps = {
  className?: string
  data: TransactionDataResponse
  onClick?: (d: TransactionDataResponse) => void
  showDate?: boolean
  showDescription?: boolean
  showUser?: boolean
}

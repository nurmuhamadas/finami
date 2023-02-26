import { IconType } from 'react-icons'

export type MenuType = {
  Icon: IconType
  text: string
  url: string
}

export type TransactionTypesType = 'in' | 'out'

export type DateFormatTypes =
  | 'yyyy/mm/dd'
  | 'yyyy-mm-dd'
  | 'dd-mm-yyyy'
  | 'dd/mm/yyyy'
  | 'dd MM yyyy'
  | 'MM, dd yyyy'

export type TransactionDataType = {
  id: string
  name: string
  date: string
  amount: number
  transactionType: TransactionTypesType | 'other'
}

export type PlanningDataType = {
  id: string
  planning: number
  expense: number
  category_name: string
  user_id: string
  user_name: string
}

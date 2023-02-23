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

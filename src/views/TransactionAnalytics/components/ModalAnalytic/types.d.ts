import { GroupTransactionByCategoryResult } from 'utils/helpers/helper'

export type ModalType = 'income' | 'expense' | 'summary'

export type ModalAnalyticProps = {
  show: boolean
  title: string
  modalType: ModalType
  data: GroupTransactionByCategoryResult | ChartDataType
  onClose: () => void
}

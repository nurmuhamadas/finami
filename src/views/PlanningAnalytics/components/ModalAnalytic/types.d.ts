import { PlanningDataResponse } from 'data/types'
import { GroupTransactionByCategoryResult } from 'utils/helpers/helper'

export type ModalAnalyticProps = {
  show: boolean
  title: string
  data: (PlanningDataResponse & { expense: number })[]
  onClose: () => void
}

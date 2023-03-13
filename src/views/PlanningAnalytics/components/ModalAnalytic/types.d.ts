import { PlanningDataResponse } from 'data/types'
import { GroupTransactionByCategoryResult } from 'utils/helpers/helper'

export type ModalAnalyticProps = {
  show: boolean
  data: (PlanningDataResponse & { expense: number })[]
  onClose: () => void
}

import { PlanningDataResponse } from 'data/types'

export type PlanningCardProps = {
  planning: PlanningDataResponse
  expense?: number
  showExpense?: boolean
  wrapperClassName?: string
  showInfo?: boolean
  onClick?: (data: PlanningDataResponse) => void
}

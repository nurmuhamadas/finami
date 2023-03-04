import { PlanningDataResponse } from 'data/types'

export type PlanningCardProps = {
  planning: PlanningDataResponse
  expense: number
  showExpense?: boolean
  wrapperClassName?: string
  onClick?: (data: PlanningDataResponse) => void
}

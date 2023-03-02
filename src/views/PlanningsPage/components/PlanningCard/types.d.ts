import { PlanningDataResponse } from 'data/types'

export type PlanningCardProps = {
  planning: PlanningDataResponse
  expense: number
  onClick?: (data: PlanningDataResponse) => void
}

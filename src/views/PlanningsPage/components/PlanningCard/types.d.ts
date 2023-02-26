import { PlanningDataType } from 'utils/constants/types'

export type PlanningCardProps = {
  data: PlanningDataType
  onClick?: (data: PlanningDataType) => void
}

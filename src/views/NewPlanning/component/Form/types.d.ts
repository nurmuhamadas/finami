import { CreatePlanningPayload } from 'data/types'

export type PlanningFormProps = {
  initialData?: CreatePlanningPayload
  disableForm?: boolean
  onSubmit: (values: CreatePlanningPayload) => void
}

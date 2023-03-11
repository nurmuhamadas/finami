import { CreatePlanningPayload } from 'data/types'

export type PlanningFormProps = {
  initialData?: CreatePlanningPayload
  disableForm?: boolean
  isLoading?: boolean
  errorMessage?: string
  disableInput?: {
    month?: boolean
  }
  onValueChange?: () => void
  onSubmit: (values: CreatePlanningPayload) => void
}

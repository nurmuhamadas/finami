import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdatePlanningPayload } from 'data/types'

interface PutPlanningParams {
  id: string
  payload: UpdatePlanningPayload
}

export default function putPlanningMutation(
  options?: UseMutationOptions<
    PutSuccessResponse,
    AxiosError,
    PutPlanningParams
  >,
) {
  return useMutation(async ({ id, payload }) => {
    return await ApiCall.Plannings.putPlanning(id, payload)
  }, options)
}

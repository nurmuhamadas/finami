import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdatePlanningPayload } from 'data/types'

export default function putPlanningMutation(
  id: string,
  payload: UpdatePlanningPayload,
  options?: UseMutationOptions<PutSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Plannings.putPlanning(id, payload)
  }, options)
}

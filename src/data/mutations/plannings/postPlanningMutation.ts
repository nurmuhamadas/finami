import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CreatePlanningPayload,
  type PostSuccessResponse,
} from 'data/types'

export default function postPlanningMutation(
  options?: UseMutationOptions<
    PostSuccessResponse,
    AxiosError,
    CreatePlanningPayload
  >,
) {
  return useMutation(async (payload) => {
    return await ApiCall.Plannings.postPlanning(payload)
  }, options)
}

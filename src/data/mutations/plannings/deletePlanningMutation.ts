import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type DeleteSuccessResponse } from 'data/types'

export default function deletePlanningMutation(
  options?: UseMutationOptions<DeleteSuccessResponse, AxiosError, string>,
) {
  return useMutation(async (id) => {
    return await ApiCall.Plannings.deletePlanningById(id)
  }, options)
}

import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdateCategoryPayload } from 'data/types'

export default function putCategoryMutation(
  id: string,
  payload: UpdateCategoryPayload,
  options?: UseMutationOptions<PutSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Categories.putCategory(id, payload)
  }, options)
}

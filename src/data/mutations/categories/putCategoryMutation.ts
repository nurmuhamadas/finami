import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdateCategoryPayload } from 'data/types'

interface PostCategoryParams {
  id: string
  payload: UpdateCategoryPayload
}

export default function putCategoryMutation(
  options?: UseMutationOptions<
    PutSuccessResponse,
    AxiosError,
    PostCategoryParams
  >,
) {
  return useMutation<PutSuccessResponse, AxiosError, PostCategoryParams>(
    async ({ id, payload }) => {
      return await ApiCall.Categories.putCategory(id, payload)
    },
    options,
  )
}

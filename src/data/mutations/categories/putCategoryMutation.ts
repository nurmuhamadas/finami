import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse } from 'data/types'

interface PutCategoryParams {
  id: string
  payload: FormData
}

export default function putCategoryMutation(
  options?: UseMutationOptions<
    PutSuccessResponse,
    AxiosError,
    PutCategoryParams
  >,
) {
  return useMutation(async ({ id, payload }) => {
    return await ApiCall.Categories.putCategory(id, payload)
  }, options)
}

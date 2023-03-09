import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CreateCategoryPayload,
  type PostSuccessResponse,
} from 'data/types'

export default function postCategoryMutation(
  options?: UseMutationOptions<
    PostSuccessResponse,
    AxiosError,
    CreateCategoryPayload
  >,
) {
  return useMutation<PostSuccessResponse, AxiosError, CreateCategoryPayload>(
    async (payload: CreateCategoryPayload) => {
      return await ApiCall.Categories.postCategory(payload)
    },
    options,
  )
}

import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CreateCategoryPayload,
  type PostSuccessResponse,
} from 'data/types'

export default function postCategoryMutation(
  payload: CreateCategoryPayload,
  options?: UseMutationOptions<PostSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Categories.postCategory(payload)
  }, options)
}

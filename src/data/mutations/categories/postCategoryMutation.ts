import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PostSuccessResponse } from 'data/types'

export default function postCategoryMutation(
  options?: UseMutationOptions<PostSuccessResponse, AxiosError, FormData>,
) {
  return useMutation(async (payload) => {
    return await ApiCall.Categories.postCategory(payload)
  }, options)
}

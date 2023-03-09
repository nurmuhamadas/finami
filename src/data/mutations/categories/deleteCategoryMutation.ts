import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type DeleteSuccessResponse } from 'data/types'

export default function deleteCategoryMutation(
  options?: UseMutationOptions<DeleteSuccessResponse, AxiosError, string>,
) {
  return useMutation<DeleteSuccessResponse, AxiosError, string>(
    async (id: string) => {
      return await ApiCall.Categories.deleteCategoryById(id)
    },
    options,
  )
}

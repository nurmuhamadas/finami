import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type DeleteSuccessResponse } from 'data/types'

export default function deleteTransactionMutation(
  options?: UseMutationOptions<DeleteSuccessResponse, AxiosError, string>,
) {
  return useMutation(async (id) => {
    return await ApiCall.Transactions.deleteTransactionById(id)
  }, options)
}

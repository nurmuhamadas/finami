import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CreateTransactionPayload,
  type PostSuccessResponse,
} from 'data/types'

export default function postTransactionMutation(
  options?: UseMutationOptions<
    PostSuccessResponse,
    AxiosError,
    CreateTransactionPayload
  >,
) {
  return useMutation(async (payload) => {
    return await ApiCall.Transactions.postTransaction(payload)
  }, options)
}

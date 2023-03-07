import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CreateTransactionPayload,
  type PostSuccessResponse,
} from 'data/types'

export default function postTransactionMutation(
  payload: CreateTransactionPayload,
  options?: UseMutationOptions<PostSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Transactions.postTransaction(payload)
  }, options)
}

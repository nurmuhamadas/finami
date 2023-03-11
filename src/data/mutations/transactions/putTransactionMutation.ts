import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type PutSuccessResponse,
  type UpdateTransactionPayload,
} from 'data/types'

interface PutTransactionParams {
  id: string
  payload: UpdateTransactionPayload
}

export default function putTransactionMutation(
  options?: UseMutationOptions<
    PutSuccessResponse,
    AxiosError,
    PutTransactionParams
  >,
) {
  return useMutation(async ({ id, payload }) => {
    return await ApiCall.Transactions.putTransaction(id, payload)
  }, options)
}

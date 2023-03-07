import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type PutSuccessResponse,
  type UpdateTransactionPayload,
} from 'data/types'

export default function putTransactionMutation(
  id: string,
  payload: UpdateTransactionPayload,
  options?: UseMutationOptions<PutSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Transactions.putTransaction(id, payload)
  }, options)
}

import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type DeleteSuccessResponse } from 'data/types'

export default function deleteWalletMutation(
  options?: UseMutationOptions<DeleteSuccessResponse, AxiosError, string>,
) {
  return useMutation(async (id: string) => {
    return await ApiCall.Wallets.deleteWalletById(id)
  }, options)
}

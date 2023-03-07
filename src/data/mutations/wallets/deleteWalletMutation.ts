import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type DeleteSuccessResponse } from 'data/types'

export default function deleteWalletMutation(
  id: string,
  options?: UseMutationOptions<DeleteSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Wallets.deleteWalletById(id)
  }, options)
}

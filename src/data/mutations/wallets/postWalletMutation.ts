import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type CreateWalletPayload, type PostSuccessResponse } from 'data/types'

export default function postWalletMutation(
  payload: CreateWalletPayload,
  options?: UseMutationOptions<PostSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Wallets.postWallet(payload)
  }, options)
}

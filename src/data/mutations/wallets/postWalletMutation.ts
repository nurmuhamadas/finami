import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type CreateWalletPayload, type PostSuccessResponse } from 'data/types'

export default function postWalletMutation(
  options?: UseMutationOptions<
    PostSuccessResponse,
    AxiosError,
    CreateWalletPayload
  >,
) {
  return useMutation(async (payload: CreateWalletPayload) => {
    return await ApiCall.Wallets.postWallet(payload)
  }, options)
}

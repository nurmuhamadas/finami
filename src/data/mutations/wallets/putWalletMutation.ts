import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdateWalletPayload } from 'data/types'

interface PuWalletParams {
  id: string
  payload: UpdateWalletPayload
}

export default function putWalletMutation(
  options?: UseMutationOptions<PutSuccessResponse, AxiosError, PuWalletParams>,
) {
  return useMutation(async ({ id, payload }: PuWalletParams) => {
    return await ApiCall.Wallets.putWallet(id, payload)
  }, options)
}

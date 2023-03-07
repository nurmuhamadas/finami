import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdateWalletPayload } from 'data/types'

export default function putWalletMutation(
  id: string,
  payload: UpdateWalletPayload,
  options?: UseMutationOptions<PutSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Wallets.putWallet(id, payload)
  }, options)
}

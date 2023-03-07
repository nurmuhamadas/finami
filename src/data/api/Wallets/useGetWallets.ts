import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type ErrorResponse, type WalletDataResponse } from 'data/types'

export default function useGetWallets(
  options: UseQueryOptions<
    Promise<WalletDataResponse[]>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['getWallets', options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Wallets.getWallets(),
    options as any,
  )

  return query
}

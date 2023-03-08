import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type GetWalletsQuery,
  type WalletDataResponse,
} from 'data/types'

export default function useGetWallets(
  queryData?: GetWalletsQuery,
  options?: UseQueryOptions<
    Promise<WalletDataResponse[]>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['getWallets', queryData, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Wallets.getWallets(queryData),
    options as any,
  )

  return query
}

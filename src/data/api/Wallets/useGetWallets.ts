import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type GetWalletsQuery,
  type Result,
  type WalletDataResponse,
} from 'data/types'

export default function useGetWallets(
  queryData?: GetWalletsQuery,
  options?: Omit<
    UseQueryOptions<Result<WalletDataResponse[]>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['getWallets', queryData, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Wallets.getWallets(queryData),
    options,
  )

  return {
    ...query,
    data: query.data?.data || [],
  }
}

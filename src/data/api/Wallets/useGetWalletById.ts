import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type Result,
  type WalletDataResponse,
} from 'data/types'

export default function useGetWalletById(
  id: string,
  options?: Omit<
    UseQueryOptions<Result<WalletDataResponse>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['GetWalletById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Wallets.getWalletById(id),
    options,
  )

  return {
    ...query,
    data: query.data?.data,
  }
}

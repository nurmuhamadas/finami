import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type ErrorResponse, type WalletDataResponse } from 'data/types'

export default function useGetWalletById(
  id: string,
  options: UseQueryOptions<
    Promise<WalletDataResponse>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['GetWalletById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Wallets.getWalletById(id),
    options as any,
  )

  return query
}

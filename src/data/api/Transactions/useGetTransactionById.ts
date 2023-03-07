import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type ErrorResponse, type TransactionDataResponse } from 'data/types'

export default function useGetTransactionById(
  id: string,
  options: UseQueryOptions<
    Promise<TransactionDataResponse>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['GetTransactionById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Transactions.getTransactionById(id),
    options as any,
  )

  return query
}

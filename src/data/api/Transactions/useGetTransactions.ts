import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type GetTransactionsQuery,
  type Result,
  type TransactionDataResponse,
} from 'data/types'

export default function useGetTransactions(
  querydata: GetTransactionsQuery,
  options?: Omit<
    UseQueryOptions<
      Result<TransactionDataResponse[]>,
      AxiosError<ErrorResponse>
    >,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['getTransactions', querydata, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Transactions.getTransactions(querydata),
    options,
  )

  return {
    ...query,
    data: query.data?.data || [],
  }
}

import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type Result,
  type TransactionDataResponse,
} from 'data/types'

export default function useGetTransactionById(
  id: string,
  options?: Omit<
    UseQueryOptions<Result<TransactionDataResponse>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['GetTransactionById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Transactions.getTransactionById(id),
    options,
  )

  return {
    ...query,
    data: query.data?.data,
  }
}

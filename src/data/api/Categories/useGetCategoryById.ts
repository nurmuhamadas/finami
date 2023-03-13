import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CategoryDataResponse,
  type ErrorResponse,
  type Result,
} from 'data/types'

export default function useGetCategoryById(
  id: string,
  options?: Omit<
    UseQueryOptions<Result<CategoryDataResponse>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['GetCategoryById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Categories.getCategoryById(id),
    options,
  )

  return {
    ...query,
    data: query.data?.data,
  }
}

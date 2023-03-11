import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CategoryDataResponse,
  type ErrorResponse,
  type GetCategoriesQuery,
  type Result,
} from 'data/types'

export default function useGetCategories(
  queryData: GetCategoriesQuery = {},
  options?: Omit<
    UseQueryOptions<Result<CategoryDataResponse[]>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['GetCategories', queryData, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Categories.getCategories(queryData),
    options,
  )

  return {
    ...query,
    data: query.data?.data || [],
  }
}

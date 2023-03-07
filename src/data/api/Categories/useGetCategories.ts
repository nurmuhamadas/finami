import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type CategoryDataResponse,
  type ErrorResponse,
  type GetCategoriesQuery,
} from 'data/types'

export default function useGetCategories(
  queryData: GetCategoriesQuery = {},
  options: UseQueryOptions<
    Promise<CategoryDataResponse[]>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['GetCategories', queryData, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Categories.getCategories(queryData),
    options as any,
  )

  return query
}

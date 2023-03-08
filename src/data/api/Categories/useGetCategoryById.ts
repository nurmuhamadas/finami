import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type CategoryDataResponse, type ErrorResponse } from 'data/types'

export default function useGetCategoryById(
  id: string,
  options?: UseQueryOptions<
    Promise<CategoryDataResponse>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['GetCategoryById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Categories.getCategoryById(id),
    options as any,
  )

  return query
}

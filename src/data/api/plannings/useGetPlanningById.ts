import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type ErrorResponse, type PlanningDataResponse } from 'data/types'

export default function useGetPlanningById(
  id: string,
  options?: UseQueryOptions<
    Promise<PlanningDataResponse>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['GetPlanningById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Plannings.getPlanningById(id),
    options as any,
  )

  return query
}

import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type PlanningDataResponse,
  type Result,
} from 'data/types'

export default function useGetPlanningById(
  id: string,
  options?: Omit<
    UseQueryOptions<Result<PlanningDataResponse>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['GetPlanningById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Plannings.getPlanningById(id),
    options,
  )

  return {
    ...query,
    data: query.data?.data,
  }
}

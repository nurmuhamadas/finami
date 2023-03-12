import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type GetPlanningsQuery,
  type PlanningDataResponse,
  type Result,
} from 'data/types'

export default function useGetPlannings(
  querydata: GetPlanningsQuery,
  options?: Omit<
    UseQueryOptions<Result<PlanningDataResponse[]>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['getPlannings', querydata, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Plannings.getPlannings(querydata),
    options,
  )

  return {
    ...query,
    data: query.data?.data || [],
  }
}

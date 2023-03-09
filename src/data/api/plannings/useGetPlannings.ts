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
  options?: UseQueryOptions<
    Promise<Result<PlanningDataResponse[]>>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['getPlannings', querydata, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Plannings.getPlannings(querydata),
    options as any,
  )

  return {
    ...query,
    data: query.data?.data,
  }
}

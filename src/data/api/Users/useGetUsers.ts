import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type GetUsersQuery,
  type Result,
  type UserDataResponse,
} from 'data/types'

export default function useGetUsers(
  queryData: GetUsersQuery = {},
  options?: Omit<
    UseQueryOptions<Result<UserDataResponse[]>, AxiosError<ErrorResponse>>,
    'queryKey' & 'queryFn'
  >,
) {
  const queryKey = ['getUsers', options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Users.getUsers(queryData),
    options,
  )

  return {
    ...query,
    data: query.data?.data || [],
  }
}

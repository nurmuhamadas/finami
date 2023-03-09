import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type ErrorResponse,
  type Result,
  type UserDataResponse,
} from 'data/types'

export default function useGetUserById(
  id: string,
  options?: Omit<
    UseQueryOptions<Result<UserDataResponse>, AxiosError<ErrorResponse>>,
    'queryFn' & 'queryFn'
  >,
) {
  const queryKey = ['GetUserById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Users.getUserById(id),
    options,
  )

  return {
    ...query,
    data: query.data?.data,
  }
}

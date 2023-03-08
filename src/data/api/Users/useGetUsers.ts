import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type ErrorResponse, type UserDataResponse } from 'data/types'

export default function useGetUsers(
  options?: UseQueryOptions<
    Promise<UserDataResponse[]>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['getUsers', options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Users.getUsers(),
    options as any,
  )

  return query
}

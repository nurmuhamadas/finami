import { useQuery, type UseQueryOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type ErrorResponse, type UserDataResponse } from 'data/types'

export default function useGetUserById(
  id: string,
  options?: UseQueryOptions<
    Promise<UserDataResponse>,
    AxiosError<ErrorResponse>
  >,
) {
  const queryKey = ['GetUserById', id, options]
  const query = useQuery(
    queryKey,
    async () => await ApiCall.Users.getUserById(id),
    options as any,
  )

  return query
}

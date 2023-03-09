import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type LogoutPayload, type LogoutSuccessResponse } from 'data/types'

export default function logoutMutation(
  options?: Omit<
    UseMutationOptions<LogoutSuccessResponse, AxiosError, LogoutPayload>,
    'mutationFn'
  >,
) {
  return useMutation<LogoutSuccessResponse, AxiosError, LogoutPayload>(
    async (payload: LogoutPayload) => {
      return await ApiCall.Auth.logout(payload)
    },
    options,
  )
}

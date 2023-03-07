import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type LogoutPayload, type LogoutSuccessResponse } from 'data/types'

export default function logoutMutation(
  payload: LogoutPayload,
  options?: UseMutationOptions<LogoutSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Auth.logout(payload)
  }, options)
}

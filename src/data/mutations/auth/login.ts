import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type LoginPayload, type LoginSuccessResponse } from 'data/types'

export default function loginMutation(
  payload: LoginPayload,
  options?: UseMutationOptions<LoginSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Auth.login(payload)
  }, options)
}

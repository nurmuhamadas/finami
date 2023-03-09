import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type LoginPayload, type LoginSuccessResponse } from 'data/types'

export default function loginMutation(
  options?: Omit<
    UseMutationOptions<LoginSuccessResponse, AxiosError, LoginPayload>,
    'mutationFn'
  >,
) {
  return useMutation<LoginSuccessResponse, AxiosError, LoginPayload>(
    async (payload: LoginPayload) => {
      return await ApiCall.Auth.login(payload)
    },
    options,
  )
}

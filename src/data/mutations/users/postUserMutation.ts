import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type CreateUserPayload, type PostSuccessResponse } from 'data/types'

export default function postUserMutation(
  options?: Omit<
    UseMutationOptions<PostSuccessResponse, AxiosError, CreateUserPayload>,
    'mutationFn'
  >,
) {
  return useMutation<PostSuccessResponse, AxiosError, CreateUserPayload>(
    async (payload: CreateUserPayload) => {
      return await ApiCall.Users.postUser(payload)
    },
    options,
  )
}

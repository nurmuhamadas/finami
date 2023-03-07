import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type CreateUserPayload, type PostSuccessResponse } from 'data/types'

export default function postUserMutation(
  payload: CreateUserPayload,
  options?: UseMutationOptions<PostSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Users.postUser(payload)
  }, options)
}

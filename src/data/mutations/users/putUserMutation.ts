import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdateUserPayload } from 'data/types'

interface PutUserParams {
  id: string
  payload: UpdateUserPayload
}

export default function putUserMutation(
  options?: UseMutationOptions<PutSuccessResponse, AxiosError, PutUserParams>,
) {
  return useMutation(async ({ id, payload }: PutUserParams) => {
    return await ApiCall.Users.putUser(id, payload)
  }, options)
}

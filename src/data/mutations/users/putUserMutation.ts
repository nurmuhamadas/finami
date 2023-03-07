import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type PutSuccessResponse, type UpdateUserPayload } from 'data/types'

export default function putUserMutation(
  id: string,
  payload: UpdateUserPayload,
  options?: UseMutationOptions<PutSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Users.putUser(id, payload)
  }, options)
}

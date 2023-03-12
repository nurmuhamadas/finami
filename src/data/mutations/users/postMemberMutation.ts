import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type CreateMemberPayload, type PostSuccessResponse } from 'data/types'

export default function postMemberMutation(
  options?: Omit<
    UseMutationOptions<PostSuccessResponse, AxiosError, CreateMemberPayload>,
    'mutationFn'
  >,
) {
  return useMutation(async (payload) => {
    return await ApiCall.Users.postMember(payload)
  }, options)
}

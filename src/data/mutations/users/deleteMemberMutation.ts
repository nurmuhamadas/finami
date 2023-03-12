import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import { type DeleteSuccessResponse } from 'data/types'

export default function deleteMemberMutation(
  options?: UseMutationOptions<DeleteSuccessResponse, AxiosError, string>,
) {
  return useMutation(async (id) => {
    return await ApiCall.Users.deleteUserById(id)
  }, options)
}

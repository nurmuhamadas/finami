import { useMutation, type UseMutationOptions } from 'react-query'

import { type AxiosError } from 'axios'
import ApiCall from 'services/ApiCall'

import {
  type RefreshTokenPayload,
  type RefreshTokenSuccessResponse,
} from 'data/types'

export default function refreshTokenMutation(
  payload: RefreshTokenPayload,
  options?: UseMutationOptions<RefreshTokenSuccessResponse, AxiosError>,
) {
  return useMutation(async () => {
    return await ApiCall.Auth.refreshToken(payload)
  }, options)
}

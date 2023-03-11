import Router from 'next/router'

import axios, { type AxiosError } from 'axios'

import { API_ENDPOINT } from 'utils/constants/api'
import { LOCAL_STORAGE } from 'utils/constants/common'
import { PAGES_URL } from 'utils/constants/pages'
import { getAuthFromLocal, saveAuthToLocal } from 'utils/helpers/helper'

function createAuthAxios(baseURL: string) {
  let refreshCount = 0

  const instanceAxios = axios.create({
    baseURL,
    // withCredentials: true,
    timeout: 60000,
  })

  instanceAxios.interceptors.request.use((config) => {
    const curConfig = { ...config }

    const { accessToken } = getAuthFromLocal()
    try {
      if (!curConfig.url?.startsWith('/authentications'))
        curConfig.headers.Authorization = `Bearer ${accessToken}`
    } catch (e) {
      console.log('AXIOS CATCH: ', e)
    }
    return curConfig
  })

  instanceAxios.interceptors.response.use(
    (res) => {
      return res.data
    },
    async (error: AxiosError) => {
      const originalRequest = error.config

      if (error.response?.status === 401 || error.response?.status === 403) {
        try {
          if (refreshCount > 4) {
            throw new Error('Logged out')
          }

          const { refreshToken } = getAuthFromLocal()
          const { data } = await axios.put(
            `${baseURL}${API_ENDPOINT.authentications}`,
            { refreshToken },
          )
          const { accessToken } = data

          originalRequest.headers.Authorization = `Bearer ${
            accessToken as string
          }`
          saveAuthToLocal({ accessToken, refreshToken })

          refreshCount += 1
          return await instanceAxios(originalRequest)
        } catch (err) {
          refreshCount = 0
          localStorage.removeItem(LOCAL_STORAGE.accessTokenKey)
          localStorage.removeItem(LOCAL_STORAGE.refreshTokenKey)
          localStorage.removeItem(LOCAL_STORAGE.userKey)
          await Router.replace(PAGES_URL.login.url)
        }
      }

      return await Promise.reject(error.response?.data)
    },
  )

  return instanceAxios
}

const Fetcher = {
  createAuthAxios,
}

export default Fetcher

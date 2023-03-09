import { Router } from 'next/router'

import axios, { type AxiosError } from 'axios'

import { API_ENDPOINT } from 'utils/constants/api'
import { LOCAL_STORAGE } from 'utils/constants/common'
import { getAuthFromLocal, saveAuthToLocal } from 'utils/helpers/helper'

function createAuthAxios(baseURL: string) {
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
          const { refreshToken } = getAuthFromLocal()
          const { data } = await axios.put(
            `${process.env.BE_URL}api/${API_ENDPOINT.authentications}`,
            { refreshToken },
          )
          const { accessToken } = data

          originalRequest.headers.Authorization = `Bearer ${
            accessToken as string
          }`
          saveAuthToLocal({ accessToken, refreshToken })

          return await instanceAxios(originalRequest)
        } catch (err) {
          localStorage.removeItem(LOCAL_STORAGE.accessTokenKey)
          localStorage.removeItem(LOCAL_STORAGE.refreshTokenKey)
          localStorage.removeItem(LOCAL_STORAGE.userKey)
          await (Router as any).replace('/')
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

import axios from 'axios'

import { getAuthFromLocal } from 'utils/helpers/helper'

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
      curConfig.headers.Authorization = `Bearer ${accessToken}`
    } catch (e) {
      console.log('AXIOS CATCH: ', e)
    }
    return curConfig
  })

  return instanceAxios
}

const Fetcher = {
  createAuthAxios,
}

export default Fetcher

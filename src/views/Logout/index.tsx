import { useEffect } from 'react'

import { useRouter } from 'next/router'

import logoutMutation from 'data/mutations/auth/logout'

import { useAuth } from 'contexts/AuthContext'
import { LOCAL_STORAGE } from 'utils/constants/common'
import { PAGES_URL } from 'utils/constants/pages'
import { getAuthFromLocal } from 'utils/helpers/helper'

const LogoutPage = () => {
  const router = useRouter()
  const { setUser } = useAuth()

  useEffect(() => {
    void (async () => {
      // TODO: LOGOUT HERE
      const { refreshToken } = getAuthFromLocal()
      await logoutMutation({
        refreshToken,
      }).mutateAsync()

      setUser(null)
      localStorage.removeItem(LOCAL_STORAGE.accessTokenKey)
      localStorage.removeItem(LOCAL_STORAGE.refreshTokenKey)
      localStorage.removeItem(LOCAL_STORAGE.userKey)

      await router.replace(PAGES_URL.login.url)
    })()
  }, [])

  return <div>Redirecting...</div>
}

export default LogoutPage

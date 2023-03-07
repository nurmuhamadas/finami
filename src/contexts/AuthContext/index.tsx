import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { LOCAL_STORAGE } from 'utils/constants/common'
import { PAGES_URL } from 'utils/constants/pages'
import { decryptText } from 'utils/helpers/helper'

import {
  type AuthContextProps,
  type AuthContextType,
  type UserContextType,
} from './types'

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: undefined,
  isVerifying: false,
})

const AuthProvider = ({ children }: AuthContextProps) => {
  const router = useRouter()
  const [user, setUser] = useState<UserContextType>(null)
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        setIsVerifying(true)
        // const accessToken = localStorage.getItem(AUTH.accessTokenKey)
        // const refreshToken = localStorage.getItem(LOCAL_STORAGE.refreshTokenKey)
        const encryptedUser = localStorage.getItem(LOCAL_STORAGE.userKey)

        // TODO: verify refresh token here, then change setUser below
        if (encryptedUser) {
          const user = decryptText(encryptedUser)
          setUser(JSON.parse(user))
        }
      } catch (error) {
        await router.replace(PAGES_URL.login.url)
      } finally {
        setIsVerifying(false)
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isVerifying, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext<AuthContextType>(AuthContext)
}

export default AuthProvider

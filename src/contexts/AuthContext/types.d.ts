import { Dispatch, ReactNode } from 'react'

export type AuthContextProps = {
  children: ReactNode
}

export type UserContextType = {
  username?: string
  fullname?: string
  imageUrl?: string
}

export type AuthContextType = {
  user: UserContextType
  isVerifying: boolean
  setUser: Dispatch<UserContextType>
}

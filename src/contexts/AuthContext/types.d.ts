import { Dispatch, ReactNode } from 'react'

export type AuthContextProps = {
  children: ReactNode
}

export type UserContextType = {
  id: string
  email: string
  parent_id: string
  username?: string
  fullname?: string
  imageUrl?: string
}

export type AuthContextType = {
  user: UserContextType
  isVerifying: boolean
  setUser: Dispatch<UserContextType>
}

import { Fragment, type ReactNode, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import VerifyLoading from 'components/VerifyLoading'
import AuthProvider, { useAuth } from 'contexts/AuthContext'
import { ONLY_PUBLIC_PAGE, PAGES_URL } from 'utils/constants/pages'

interface ProviderProps {
  children: ReactNode
}

const ProviderContainer = ({ children }: ProviderProps) => {
  const { user, isVerifying } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (router.isReady && !isVerifying) {
      const isPotectedPages = router.pathname.startsWith('/app/')
      if (!user && isPotectedPages) {
        void (async () => {
          await router.replace(PAGES_URL.login.url)
        })()
      } else if (user && ONLY_PUBLIC_PAGE.includes(router.pathname)) {
        void (async () => {
          await router.replace(PAGES_URL.overview.url)
        })()
      }
      setIsLoading(false)
    }
  }, [router.pathname, router.isReady, isVerifying])

  if (isLoading || isVerifying) {
    return <VerifyLoading />
  }

  return <Fragment>{children}</Fragment>
}

const Provider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <AuthProvider>
      <ProviderContainer>{children}</ProviderContainer>
    </AuthProvider>
  )
}

export default Provider

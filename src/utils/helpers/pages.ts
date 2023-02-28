import { useRouter } from 'next/router'

import { PAGES_URL } from 'utils/constants/pages'

export const getPageTitle = () => {
  const router = useRouter()
  let title = ''

  Object.entries(PAGES_URL).forEach(([_, val]) => {
    if (router?.pathname === val.url) {
      title = `${val.title}`
    }
  })

  return title
}

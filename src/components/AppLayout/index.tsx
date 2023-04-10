import { AiOutlineBell } from 'react-icons/ai'

import { useRouter } from 'next/router'

import { Avatar } from 'flowbite-react'

import BottomNav from 'components/BottomNav'
import MySidebar from 'components/MySidebar'
import { useAuth } from 'contexts/AuthContext'
import { bottomMenu, parentOnlyUrl, sideMenu } from 'utils/constants/menu'
import { getPageTitle } from 'utils/helpers/pages'

import { type AppLayoutProps } from './types'

const AppLayout = ({ children, title, description }: AppLayoutProps) => {
  const router = useRouter()
  const pageTitle = getPageTitle()
  const { user } = useAuth()

  if (!user) {
    return <div></div>
  }

  if (user.parent_id && parentOnlyUrl.includes(router.pathname)) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-lg">
          Sorry.. You are not allowed to access this page!
        </p>
      </div>
    )
  }

  return (
    <div className="relative flex h-screen w-full">
      {/* Bottom Navbar */}
      <BottomNav menus={bottomMenu} wrapperClassName="lg:hidden" />

      <div className="absolute left-0 top-0 hidden h-screen w-80 lg:block">
        {/* sidebar */}
        <MySidebar menus={sideMenu} wrapperClassName="hidden lg:block" />
      </div>
      <div className="h-screen w-full overflow-auto bg-gray-100 lg:ml-80 relative">
        <div className="w-full sticky py-4 px-4 sm:px-8 z-10 left-0 top-0 bg-white flex justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar
              img={user?.image_url || '/static/images/default_pp.png'}
              rounded={true}
              className="lg:hidden"
            />
            <span className="font-semibold">Hi, {user?.fullname}</span>
          </div>
          <div className="flex items-center justify-end">
            <div role="button" className="p-2">
              <AiOutlineBell size={20} />
            </div>
          </div>
        </div>
        <div className="h-max pt-8 pb-20 sm:px-8 lg:pt-8 lg:pb-12 px-4">
          <h1 className="text-2xl lg:text-3xl font-bold">
            {title || pageTitle}
          </h1>
          <p className="mt-1 font-openSans font-light text-gray-400">
            {description}
          </p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout

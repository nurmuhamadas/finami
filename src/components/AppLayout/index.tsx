import { AiOutlineBell } from 'react-icons/ai'

import { Avatar } from 'flowbite-react'

import BottomNav from 'components/BottomNav'
import MySidebar from 'components/MySidebar'
import { bottomMenu, sideMenu } from 'utils/constants/menu'
import { getPageTitle } from 'utils/helpers/pages'

import { type AppLayoutProps } from './types'

const AppLayout = ({ children, title, description }: AppLayoutProps) => {
  const pageTitle = getPageTitle()

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
          <div className="flex items-center space-x-2">
            <Avatar
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
              className="lg:hidden"
            />
            <span className="font-semibold">Hi, Nur Muhamad</span>
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

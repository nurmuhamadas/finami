import BottomNav from 'components/BottomNav'
import MySidebar from 'components/MySidebar'
import { bottomMenu } from 'utils/constants/menu'
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
        <MySidebar menus={bottomMenu} wrapperClassName="hidden lg:block" />
      </div>
      <div className="h-screen w-full overflow-auto bg-gray-50 px-4 pt-8 pb-20 sm:px-8 lg:ml-80 lg:pt-12 lg:pb-12">
        <div className="h-max">
          <h1 className="text-3xl font-bold">{title || pageTitle}</h1>
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

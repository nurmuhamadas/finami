import classNames from 'classnames'

import MyNavbar from 'components/MyNavbar'

import { type MainLayoutProps } from './types'

const MainLayout = ({ wrapperClassName, children }: MainLayoutProps) => {
  return (
    <div className="scroll-smooth">
      <MyNavbar />
      <div className={classNames('h-[1000px]', wrapperClassName)}>
        {children}
      </div>
      {/* <MyFooter /> */}
    </div>
  )
}

export default MainLayout

import classNames from 'classnames'

import MyFooter from 'components/MyFooter'
import MyNavbar from 'components/MyNavbar'

import { type MainLayoutProps } from './types'

const MainLayout = ({ wrapperClassName, children }: MainLayoutProps) => {
  return (
    <div className="scroll-smooth">
      <MyNavbar />
      <div className={classNames('min-h-screen', wrapperClassName)}>
        {children}
      </div>
      <MyFooter />
    </div>
  )
}

export default MainLayout

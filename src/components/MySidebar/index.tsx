import { useRouter } from 'next/router'

import cn from 'classnames'
import { Sidebar } from 'flowbite-react'

import { type MySidebarProps } from './types'

const MySidebar = ({ menus, wrapperClassName }: MySidebarProps) => {
  const { pathname } = useRouter()

  return (
    <Sidebar
      aria-label="Sidebar menu"
      className={cn('h-screen w-full pt-8', wrapperClassName)}
    >
      <Sidebar.Logo
        href="/"
        img="/static/favicon.ico"
        imgAlt="Finami logo"
        className="mb-8"
      >
        Finami
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {menus.map(({ text, Icon, url }) => {
            const isMenuActive = url === pathname

            const WrappedIcon = () => (
              <span
                className={cn({
                  'font-bold text-white': isMenuActive,
                  'font-light text-gray-500': !isMenuActive,
                })}
              >
                <Icon size="24px" />
              </span>
            )

            return (
              <Sidebar.Item
                key={url}
                href={url}
                icon={WrappedIcon}
                className={cn('py-3', {
                  'bg-finamiBlue pl-4 hover:!bg-finamiBlue hover:cursor-default':
                    isMenuActive,
                  'bg-inherit': !isMenuActive,
                })}
              >
                <span
                  className={cn({
                    'font-bold text-white': isMenuActive,
                    'font-light text-gray-500': !isMenuActive,
                  })}
                >
                  {text}
                </span>
              </Sidebar.Item>
            )
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default MySidebar

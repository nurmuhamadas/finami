import { type IconType } from 'react-icons'
import { AiOutlineEdit } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'

import cn from 'classnames'
import { Avatar, Sidebar } from 'flowbite-react'

import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'
import { type MenuType } from 'utils/constants/types'

import { type MySidebarProps } from './types'

const WrappedIcon = ({
  Icon,
  isMenuActive,
}: {
  isMenuActive: boolean
  Icon: IconType
}) => (
  <span
    className={cn({
      'font-bold text-white': isMenuActive,
      'font-light text-gray-500': !isMenuActive,
    })}
  >
    <Icon size="24px" />
  </span>
)

const renderMenuItem = ({
  Icon,
  text,
  url,
  child,
  pathname,
}: MenuType & { pathname: string }) => {
  const isMenuActive = pathname.startsWith(url)

  if (child?.length > 0) {
    return (
      <Sidebar.Collapse
        key={url}
        icon={() => WrappedIcon({ Icon, isMenuActive })}
        label={text}
        className="finamiCollapse"
      >
        {child.map((c) => renderMenuItem({ ...c, pathname }))}
      </Sidebar.Collapse>
    )
  }

  return (
    <Sidebar.Item
      key={url}
      href={url}
      icon={() => WrappedIcon({ isMenuActive, Icon })}
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
}

const MySidebar = ({ menus, wrapperClassName }: MySidebarProps) => {
  const { pathname } = useRouter()
  const mappedMenu = menus.map((m) => ({
    ...m,
    child: m.child?.filter((c) => c.url !== PAGES_URL.account_profile.url),
  }))

  return (
    <Sidebar
      aria-label="Sidebar menu"
      className={cn('h-screen w-full', wrapperClassName)}
    >
      <Sidebar.Logo
        href="/"
        img="/static/favicon.ico"
        imgAlt="Finami logo"
        className="mb-8 py-4 flex items-center space-x-3"
      >
        Finami
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Items className="flex flex-col">
            <div className="flex flex-col w-full space-y-2 items-center">
              <Avatar
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
                size={128}
              />
              <span className="text-center">Nur Muhamad Ash Shdiqi</span>
              <Link href={PAGES_URL.account_profile.url} passHref>
                <MyButton color="light" className="w-max">
                  <div className="w-full flex items-center gap-x-4">
                    <div className="flex items-center">
                      <AiOutlineEdit size={20} />
                    </div>
                    <span className="">Edit profile</span>
                  </div>
                </MyButton>
              </Link>
            </div>
          </Sidebar.Items>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          {mappedMenu
            .filter((m) => m.url !== PAGES_URL.account_profile.url)
            .map((menu) => {
              return renderMenuItem({ ...menu, pathname })
            })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default MySidebar

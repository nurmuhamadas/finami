import { type IconType } from 'react-icons'
import { AiOutlineLogout } from 'react-icons/ai'

import { useRouter } from 'next/router'

import cn from 'classnames'
import { Sidebar } from 'flowbite-react'

import ProfileAvatar from 'components/ProfileAvatar'
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
        className={cn('finamiCollapse py-3', {
          'bg-finamiBlue !text-white hover:!bg-finamiBlue': isMenuActive,
        })}
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
  const { pathname, push } = useRouter()
  const mappedMenu = menus
    .filter((m) => ![PAGES_URL.account_profile.url].includes(m.url))
    .map((m) => ({
      ...m,
      child: m.child?.filter((c) => c.url !== PAGES_URL.account_profile.url),
    }))

  // TODO:

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
            <ProfileAvatar
              showButton
              showName
              buttonText="Edit profile"
              onButtonClick={async () => {
                await push(PAGES_URL.account_profile.url)
              }}
            />
          </Sidebar.Items>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          {mappedMenu.map((menu) => {
            return renderMenuItem({ ...menu, pathname })
          })}

          <Sidebar.Item
            href={PAGES_URL.account_logout.url}
            icon={() =>
              WrappedIcon({ isMenuActive: false, Icon: AiOutlineLogout })
            }
            className={cn('py-3 bg-inherit')}
          >
            <span className={cn('font-light text-gray-500')}>Logout</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default MySidebar

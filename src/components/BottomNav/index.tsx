import Link from 'next/link'
import { useRouter } from 'next/router'

import cn from 'classnames'

import { type BottomNavProps } from './types'

const BottomNav = ({ menus, wrapperClassName }: BottomNavProps) => {
  const { pathname } = useRouter()

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-40 w-full rounded-t-3xl border-t-2 bg-white',
        wrapperClassName,
      )}
    >
      <ul className="flex h-full w-full justify-between">
        {menus.map(({ url, Icon, text }) => {
          const isMenuActive = pathname.startsWith(url)

          return (
            <li
              key={url}
              role="link"
              className={cn('h-full w-1/5', {
                'rounded-t-3xl bg-finamiBlue': isMenuActive,
              })}
            >
              <Link href={url} legacyBehavior>
                <a className="flex flex-col items-center h-full pb-2 pt-4">
                  <div>
                    <Icon
                      size={24}
                      className={cn({
                        '  text-white': isMenuActive,
                        'text-gray-400': !isMenuActive,
                      })}
                    />
                  </div>
                  <span
                    className={cn('text-[10px]', {
                      'text-white': isMenuActive,
                      'text-gray-400': !isMenuActive,
                    })}
                  >
                    {text}
                  </span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BottomNav

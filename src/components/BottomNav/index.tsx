import { useRouter } from 'next/router'

import cn from 'classnames'

import { type BottomNavProps } from './types'

const BottomNav = ({ menus, wrapperClassName }: BottomNavProps) => {
  const { pathname } = useRouter()

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 w-full rounded-t-3xl border-t-2 bg-white px-1 pb-2 pt-4',
        wrapperClassName,
      )}
    >
      <ul className="flex w-full justify-between">
        {menus.map(({ url, Icon, text }) => {
          const isMenuActive = url === pathname

          return (
            <li key={url} className="w-1/5">
              <div className="flex flex-col items-center gap-1 ">
                <div>
                  <Icon
                    size={24}
                    className={cn({
                      'text-activeMenu': isMenuActive,
                      'text-gray-400': !isMenuActive,
                    })}
                  />
                </div>
                <span
                  className={cn('text-[10px]', {
                    'text-activeMenu': isMenuActive,
                    'text-gray-400': !isMenuActive,
                  })}
                >
                  {text}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BottomNav

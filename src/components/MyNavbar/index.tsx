import { Fragment, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import cn from 'classnames'

import MyAvatar from 'components/MyAvatar'
import MyButton from 'components/MyButton'
import { useAuth } from 'contexts/AuthContext'
import { navbarMenu } from 'utils/constants/menu'
import { PAGES_URL } from 'utils/constants/pages'
import { getBEImageUrl } from 'utils/helpers/helper'

const MyNavbar = () => {
  const router = useRouter()
  const { user } = useAuth()

  const [isShowMenu, setIsShowMenu] = useState(false)

  return (
    <section className="z-10 h-full w-full border-box transition-all duration-500 linear bg-white xl:px-24 lg:px-16 md:px-10 sm:px-8 px-8 py-6 border-b-2 sticky top-0 left-0">
      <div className="w-full flex flex-wrap gap-2 flexRow items-center justify-between">
        <div className="flex gap-2">
          <Image
            src="/static/images/logo.png"
            alt="Finami"
            width={32}
            height={32}
            priority
          />
          <span className="text-finamiBlue text-2xl font-bold">Finami</span>
        </div>
        <label
          role="button"
          htmlFor="menu-toggle"
          className="cursor-pointer lg:hidden block"
          onClick={() => {
            setIsShowMenu((s) => !s)
          }}
          aria-label={isShowMenu ? 'Close Menu' : 'Open Menu'}
        >
          <AiOutlineMenu />
        </label>
        <div
          className={cn(
            'lg:flex lg:items-center lg:w-auto w-full lg:ml-12 lg:mr-auto flex-wrap items-center text-base justify-center',
            { hidden: !isShowMenu },
          )}
        >
          <nav className="flex flex-col lg:flex-row lg:space-x-12 space-x-0 lg:flex items-center justify-between text-base pt-8 lg:pt-0 lg:space-y-0 space-y-6">
            {navbarMenu.map((m) => (
              <Link
                key={m.url}
                href={m.url}
                className={cn('text-gray-600 hover:text-finamiBlue', {
                  'font-semibold !text-finamiBlue': m.url === router.pathname,
                })}
                aria-label={m.text}
              >
                {m.text}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className={cn(
            'justify-center mt-8 lg:mt-0 flex lg:flex lg:items-center lg:w-auto w-full space-x-2.5',
            { hidden: !isShowMenu },
          )}
        >
          {!user && (
            <Fragment>
              <Link href={PAGES_URL.login.url} passHref>
                <MyButton outline color="light">
                  Login
                </MyButton>
              </Link>
              <Link href={PAGES_URL.signup.url} passHref>
                <MyButton colorType="primary">Get Started</MyButton>
              </Link>
            </Fragment>
          )}

          {user && (
            <Link href={PAGES_URL.overview.url} passHref>
              <MyAvatar
                src={getBEImageUrl(user.image_url)}
                alt={user.fullname}
                role="link"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default MyNavbar

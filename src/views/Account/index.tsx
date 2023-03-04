import { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

import Link from 'next/link'

import { Avatar } from 'flowbite-react'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import { accountMenu } from 'utils/constants/menu'
import { PAGES_URL } from 'utils/constants/pages'
import { debounce } from 'utils/helpers/helper'

const AccountPage = () => {
  const [mounted, setMounted] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    window.addEventListener(
      'resize',
      debounce(() => {
        setScreenWidth(window.innerWidth)
      }),
    )
    if (window && !mounted) {
      setMounted(true)
      setScreenWidth(window.innerWidth)
    }
  }, [])

  const logoutMenu = accountMenu.find(
    (m) => m.url === PAGES_URL.account_logout.url,
  )

  return (
    <AppLayout description="Manage your account settings">
      {!(mounted && screenWidth > 1024) && (
        <div className="flex flex-col space-y-8 max-w-lg mx-auto">
          <OverviewCard>
            <ul className="">
              <li className="mt-8 justify-center flex mb-8">
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
              </li>

              {accountMenu
                .filter(
                  (m) =>
                    ![
                      PAGES_URL.account_logout.url,
                      PAGES_URL.account_profile.url,
                    ].includes(m.url),
                )
                .map(({ Icon, text, url }) => {
                  return (
                    <li key={url} role="link">
                      <Link href={url} passHref className="w-full">
                        <div className="w-full flex items-center gap-x-4 py-3">
                          <div className="flex items-center text-gray-500">
                            <Icon size={24} />
                          </div>
                          <span className="">{text}</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              <li role="button" className="mt-8 justify-center flex">
                <MyButton colorType="danger">
                  <div className="w-full flex items-center gap-x-4">
                    <div className="flex items-center text-white">
                      <logoutMenu.Icon size={24} />
                    </div>
                    <span className="">{logoutMenu.text}</span>
                  </div>
                </MyButton>
              </li>
            </ul>
          </OverviewCard>
        </div>
      )}
    </AppLayout>
  )
}

export default AccountPage

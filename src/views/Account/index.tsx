import { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import ProfileAvatar from 'components/ProfileAvatar'
import { useAuth } from 'contexts/AuthContext'
import { accountMenu, parentOnlyUrl } from 'utils/constants/menu'
import { PAGES_URL } from 'utils/constants/pages'
import { debounce } from 'utils/helpers/helper'

const AccountPage = () => {
  const router = useRouter()
  const { user } = useAuth()
  const isChildMember = !!user.parent_id
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

  return (
    <AppLayout description="Manage your account settings">
      {!(mounted && screenWidth > 1024) && (
        <div className="flex flex-col space-y-8 max-w-lg mx-auto">
          <OverviewCard>
            <ul className="">
              <li className="mt-8 justify-center flex mb-8">
                <ProfileAvatar
                  showButton
                  showName
                  onButtonClick={async () => {
                    await router.push(PAGES_URL.account_profile.url)
                  }}
                  data={{
                    name: user?.fullname,
                    src: user?.imageUrl,
                  }}
                  buttonText="Change profile"
                />
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
                  if (isChildMember && parentOnlyUrl.includes(url)) {
                    return null
                  }

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
                <Link
                  href={PAGES_URL.account_logout.url}
                  passHref
                  className="w-max"
                >
                  <MyButton colorType="danger">
                    <div className="w-full flex items-center gap-x-4">
                      <div className="flex items-center text-white">
                        <AiOutlineLogout size={24} />
                      </div>
                      <span className="">Logout</span>
                    </div>
                  </MyButton>
                </Link>
              </li>
            </ul>
          </OverviewCard>
        </div>
      )}
    </AppLayout>
  )
}

export default AccountPage

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'

const NotFoundPage = () => {
  const isLoggedIn = true

  return (
    <div className="container mx-auto flex items-center justify-center flex-col px-8 h-screen">
      <Image
        width={400}
        height={400}
        className="sm:w-auto w-5/6 sm:mb-16 mb-12 object-cover object-center"
        src="/static/images/404.webp"
        alt="Not found image state"
      />
      <div className="text-center w-full">
        <h1 className="title-text text-3xl mb-5 font-semibold">
          Opss! Something Missing
        </h1>
        <p className="caption-text mb-16 tracking-wide leading-7">
          The page you&apos;re looking for isn&apos;t found. We{' '}
          <br className="sm:block hidden" /> suggest you Back to Homepage.
        </p>
        <div className="flex justify-center">
          <Link href={isLoggedIn ? PAGES_URL.overview.url : '/'}>
            <MyButton colorType="primary">Back to Homepage</MyButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

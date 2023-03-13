import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import dayjs from 'dayjs'

import MainLayout from 'components/MainLayout'
import { PAGES_URL } from 'utils/constants/pages'

const LandingPage = () => {
  return (
    <MainLayout>
      <div>
        <div className="mx-auto flex pt-12 pb-16 lg:pb-20 lg:px-24 md:px-16 sm:px-8 px-8 lg:flex-row flex-col">
          <div className="lg:flex-grow lg:w-1/2 flex flex-col lg:items-start lg:text-left mb-3 md:mb-12 lg:mb-0 items-center text-center">
            <p className="small-text mb-2 leading-relaxed font-semibold text-lg">
              Let&apos;s join us
            </p>
            <h1 className="title-font sm:text-5xl lg:text-6xl text-4xl mb-8 font-semibold sm:leading-tight !leading-tight">
              Smart Financial Management for Your Family&apos;s Future
            </h1>
            <div className="inline-block items-center mx-auto lg:mx-0 lg:flex justify-center lg:space-x-8 md:space-x-2 space-x-3">
              <Link href={PAGES_URL.signup.url} passHref>
                <button className="bg-finamiBlue inline-flex font-semibold text-white text-base py-4 px-6 rounded-xl mb-4 lg:mb-0 md:mb-0 focus:outline-none hover:shadow-lg">
                  Try it free
                </button>
              </Link>
              <Link href="#benefit" passHref>
                <button className="hover:border-finamiBlue border-2 fill-finamiBlue font-normal text-black text-base py-4 px-6 rounded-xl focus:outline-none bg-transparent hover:text-finamiBlue">
                  <div className="flex items-center">Learn More</div>
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-center justify-center flex pr-0">
            <Image
              id="hero"
              src="/static/images/login.png"
              alt="Finami Header"
              width={700}
              height={560}
              className="!h-max"
            />
          </div>
        </div>
      </div>

      <section className="block w-full border-box bg-white" id="benefit">
        <div className="container lg:px-32 md:px-8 sm:px-12 px-5 pt-20 pb-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h2 className="text-4xl font-semibold title-font mb-2.5 text-medium-black">
              3 Keys Benefit
            </h2>
            <h2 className="text-base font-light title-font mx-12 lg:w-full md:w-full sm:w-3/6 sm:mx-auto text-medium-black">
              You can easily manage your business with a powerful tools
            </h2>
          </div>

          <div className="flex lg:flex-row flex-col -m-4">
            <div className="px-14 md:px-0 lg:px-4 lg:w-1/3 md:w-1/3 sm:w-4/6 mx-auto">
              <div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-4 pb-12 flex-col">
                <div className="flex  justify-center mb-6 items-center text-center">
                  <span className="bg-finamiBlue h-12 w-12 text-xl flex items-center justify-center lg:mr-5 lg:mb-0 mb-5 text-white rounded-full">
                    1
                  </span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-center text-2xl mb-2.5 text-medium-black">
                    Organized Finances
                  </h4>
                  <p className="leading-relaxed text-base text-center tracking-wide text-gray">
                    Keep track of the expenses and income in one place and stay
                    organized and avoid overspending, which is essential for
                    achieving financial stability.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-14 md:px-0 lg:px-4 lg:w-1/3 md:w-1/3 sm:w-4/6 mx-auto">
              <div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-12 pb-12 flex-col">
                <div className="flex  justify-center mb-6 items-center text-center">
                  <span className="bg-finamiBlue h-12 w-12 text-xl flex items-center justify-center lg:mr-5 lg:mb-0 mb-5 text-white rounded-full">
                    2
                  </span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-center text-2xl mb-2.5 text-medium-black">
                    Real-Time Tracking
                  </h4>
                  <p className="leading-relaxed text-base text-center tracking-wide text-gray">
                    Real-time tracking of expenses and savings, making it easier
                    for families to monitor their finances and adjust their
                    spending as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-14 md:px-0 lg:px-4 lg:w-1/3 md:w-1/3 sm:w-4/6 mx-auto">
              <div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-12 pb-6 flex-col">
                <div className="flex  justify-center mb-6 items-center text-center">
                  <span className="bg-finamiBlue h-12 w-12 text-xl flex items-center justify-center lg:mr-5 lg:mb-0 mb-5 text-white rounded-full">
                    3
                  </span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-center text-2xl mb-2.5 text-medium-black">
                    Budget Planning
                  </h4>
                  <p className="leading-relaxed text-base text-center tracking-wide text-gray">
                    Set spending limits for various categories of expenses and
                    receive alerts when they are approaching their budget
                    limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:px-24 md:px-16 sm:px-8 px-4 pb-20 pt-12 mx-auto">
          <div className="flex lg:flex-row flex-col -m-4">
            <div className="p-4 w-full">
              <div className="bg-finamiBlue bg-opacity-10 border-[1px] border-finamiBlue h-full flex lg:flex-row flex-col p-7 rounded-xl lg:space-x-3.5 md:space-x-3.5 space-x-0">
                <div className="text-center mx-auto">
                  <div className="w-full relative flex justify-center items-center">
                    <a
                      className="absolute w-full h-full z-[2]"
                      href="https://www.freepik.com/free-vector/hand-drawn-credit-assessment-concept_20059320.htm#from_view=detail_serie"
                    ></a>
                    <Image
                      src="/static/images/login.png"
                      alt="Login to Finami"
                      className="!w-[300px] !h-max !relative"
                      priority
                      fill
                    />
                  </div>
                </div>
                <div className="flex-grow my-auto lg:text-left lg:w-3/4 w-full text-center lg:my-auto md:my-auto py-6">
                  <h4 className="text-2xl font-semibold mb-2.5 text-medium-black">
                    Fast Business Management in 30 minutes
                  </h4>
                  <p className="text-base font-light tracking-wide w-full text-gray">
                    Offers tools for setting and tracking financial goals, such
                    as paying off debt, saving for a major purchase, or building
                    an emergency fund.
                  </p>
                </div>
                <div className="inline-block items-center my-auto text-center">
                  <Link href={PAGES_URL.signup.url} passHref>
                    <button className="w-48 justify-center bg-finamiBlue inline-flex font-semibold text-white py-4 px-6 rounded-xl mb-4 lg:mb-0 md:mb-0 focus:outline-none hover:shadow-lg">
                      Try it free
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative block overflow-hidden mx-auto font-body bg-finamiBlue bg-opacity-10">
        <main className="py-48 relative z-20 max-w-screen-2xl mx-auto">
          <div className="max-w-screen-xl px-4 mx-auto">
            <div className="text-5xl mb-16 font-bold leading-tight text-left heading text-dark-1 dark:text-light-1 md:text-center md:text-6xl lg:leading-snug font-display">
              Faster and Easier Financial <br className="md:hidden lg:block" />{' '}
              Management Starts Here
            </div>
            <div className="flex flex-col items-center justify-center mt-18 md:flex-row md:space-x-7">
              <Link href={PAGES_URL.signup.url} passHref>
                <button className="w-48 justify-center bg-finamiBlue inline-flex font-semibold text-white py-4 px-6 rounded-xl mb-4 lg:mb-0 md:mb-0 focus:outline-none hover:shadow-lg">
                  Try it free
                </button>
              </Link>
              <a
                href={PAGES_URL.signup.url}
                className="w-48 hover:border-finamiBlue text-center border-2 fill-finamiBlue font-normal text-black text-base py-4 px-6 rounded-xl focus:outline-none bg-transparent border-gray-400 hover:text-finamiBlue"
              >
                Contact Us
              </a>
            </div>
          </div>
        </main>
      </section>

      <footer className="py-10 bg-finamiBlue text-white">
        <div className=" mx-auto">
          <div className="mx-auto lg:px-32 md:px-8 sm:px-12 px-5 justify-between flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0">
            <div className="flex items-center gap-2">
              <Image
                src="/static/favicon.ico"
                alt="Finami"
                width={32}
                height={32}
              />
              FINAMI
            </div>
            <nav className="flex flex-wrap items-center text-base justify-center space-x-5">
              <a
                href="https://nurmuhamadas.me"
                className="hover:text-finamiBlue"
              >
                Made with ❤ by Nur Muhamad Ash Shidiqi
              </a>
            </nav>
            <nav className="flex lg:flex-row flex-col items-center text-base justify-center">
              <p>Copyright © {dayjs().format('YYYY')} Finami</p>
            </nav>
          </div>
        </div>
      </footer>
    </MainLayout>
  )
}

export default LandingPage

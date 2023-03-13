import Image from 'next/image'

import dayjs from 'dayjs'

const MyFooter = () => {
  return (
    <footer className="py-10 bg-finamiBlue text-white">
      <div className=" mx-auto">
        <div className="mx-auto lg:px-32 md:px-8 sm:px-12 px-5 justify-between flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0">
          <div className="flex items-center gap-2">
            <Image
              src="/static/images/logo_white.png"
              alt="Finami"
              width={32}
              height={32}
            />
            <span className=" text-2xl font-bold">Finami</span>
          </div>
          <nav className="flex flex-wrap items-center text-base justify-center space-x-5">
            <a href="https://nurmuhamadas.me" className="hover:text-finamiBlue">
              Made with ❤ by Nur Muhamad Ash Shidiqi
            </a>
          </nav>
          <nav className="flex lg:flex-row flex-col items-center text-base justify-center">
            <p>Copyright © {dayjs().format('YYYY')} Finami</p>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default MyFooter

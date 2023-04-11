import { AiOutlineGithub, AiOutlineGlobal } from 'react-icons/ai'

import MainLayout from 'components/MainLayout'
import MyAvatar from 'components/MyAvatar'

const TeamsPage = () => {
  return (
    <MainLayout>
      <section className="pt-10 overflow-hidden bg-gray-50 md:pt-0 sm:pt-16 2xl:pt-16 pb-12">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 ">
            <div className="relative flex justify-center">
              {/* <Image
                className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                src="/static/images/blob-shape.png"
                alt=""
                fill
              /> */}

              <MyAvatar
                className=""
                wrapperClassName="h-[225px] border-2"
                src="/static/images/myphoto.webp"
                alt=""
                size={225}
                priority
              />
            </div>

            <div className="flex flex-col items-center mt-16 mb-8">
              <h1 className="text-3xl font-bold leading-tight text-center text-black sm:text-4xl lg:text-5xl">
                Hey 👋 I am <br className="block sm:hidden" />
                Diqi
              </h1>
              <p className="max-w-3xl mt-3 text-center text-xl leading-relaxed text-gray-600 md:mt-8">
                I am software engineer and long life student. I love learning
                new things. I love seeing my web look great on all screen sizes.
                Responsive design and attractive user interaction is a challenge
                for me. And I love it. I love to share anything to others. Keep
                learning anything, keep sharing anything,
              </p>

              <p className="mt-4 text-xl text-gray-600 md:mt-8 text-center">
                <span className="relative inline-block mr-2">
                  <span className="absolute inline-block w-full bottom-0.5 h-2 bg-finamiBlueSecondary bg-opacity-50"></span>
                  <span className="relative text-center">Have a question?</span>
                </span>
                <br className="block sm:hidden" />
                Ask me on{' '}
                <a
                  href="https://www.instagram.com/nurmuhamada"
                  title="Nur Muhamad Ash Shidiqi Instagram"
                  className="transition-all duration-200 text-finamiBlue hover:fill-finamiBlueSecondary hover:underline"
                >
                  Instagram
                </a>
              </p>
            </div>

            <ul className="flex items-center justify-center gap-x-4">
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nur Muhamad Ash Shidiqi's Github Profile"
                  href="https://github.com/nurmuhamadas"
                >
                  <AiOutlineGithub
                    size={32}
                    className="hover:text-finamiBlue cursor-pointer"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nur Muhamad Ash Shidiqi's Website"
                  href="https://nurmuhamadas.me"
                >
                  <AiOutlineGlobal
                    size={32}
                    className="hover:text-finamiBlue cursor-pointer"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default TeamsPage

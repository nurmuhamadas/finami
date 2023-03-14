import Image from 'next/image'

import MainLayout from 'components/MainLayout'

const AboutPage = () => {
  return (
    <MainLayout>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
            <div className="relative lg:mb-12 pt-32">
              <div className="pl-12 pr-6">
                <Image
                  className="absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4 shadow-xl"
                  src="/static/images/dashboard.png"
                  alt=""
                  width={1000}
                  height={500}
                />
              </div>
            </div>

            <div className="2xl:pl-16">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                We make family financial easy to manage.
              </h2>
              <p className="text-xl leading-relaxed text-gray-900 mt-9">
                We provide financial app to share budgeting and spending
                tracking among family. All family members can make financial
                planning together through this app.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default AboutPage

import Image from 'next/image'

import MainLayout from 'components/MainLayout'

const AboutPage = () => {
  return (
    <MainLayout>
      <section className="py-10 bg-white sm:py-16 lg:py-24 px-8">
        <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
            <div className="relative lg:mb-12 h-max">
              <Image
                className="xl:-bottom-12 xl:-right-4 shadow-xl"
                src="/static/images/dashboard.webp"
                alt=""
                width={1000}
                height={500}
                priority
              />
            </div>

            <div className="lg:pt-12">
              <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                We make family financial easy to manage.
              </h1>
              <p className=" leading-relaxed text-gray-600 mt-4">
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

import Image from 'next/image'

import MainLayout from 'components/MainLayout'

const dummyBlogs = [
  {
    id: '1',
    category: 'Financial',
    title: 'How to mange your family finance?',
    content:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    author: 'Nur Muhamad Ash Shidiqi',
    date: 'March, 12 2023',
  },
  {
    id: '1',
    category: 'Financial',
    title: '3 Tools to Help You Manage Your Financial',
    content:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    author: 'Nur Muhamad Ash Shidiqi',
    date: 'March, 12 2023',
  },
  {
    id: '1',
    category: 'Financial',
    title: 'Learn from Expert How to Improve Your Salary',
    content:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    author: 'Nur Muhamad Ash Shidiqi',
    date: 'March, 12 2023',
  },
]

const LearnPage = () => {
  return (
    <MainLayout>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Latest from blog
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
            {dummyBlogs.map((d, i) => (
              <div key={d.id}>
                <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                  <Image
                    className="object-cover w-full h-full"
                    src="/static/images/blog-post-1.webp"
                    alt=""
                    width={300}
                    height={250}
                    priority={i < 3}
                  />
                </a>
                <span className="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-rose-500 bg-rose-100 mt-9">
                  {d.category}
                </span>
                <p className="mt-6 text-xl font-semibold">
                  <a href="#" title="" className="text-black">
                    {d.title}
                  </a>
                </p>
                <p className="mt-4 text-gray-600">{d.content}</p>
                <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                <span className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                  {d.author}. {d.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default LearnPage

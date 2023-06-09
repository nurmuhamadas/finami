import { Fragment } from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import Provider from 'components/Provider'
import { getPageTitle } from 'utils/helpers/pages'

import 'react-image-crop/dist/ReactCrop.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const pageTitle = getPageTitle()
  let title = 'Finami'
  if (pageTitle) {
    title += ` - ${pageTitle}`
  }

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="title" content="Finami" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="description" content="Financial management for family" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Finami" />
        <meta
          property="og:description"
          content="Financial management for family"
        />
        <meta property="og:image" content="/static/vercel.svg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Finami" />
        <meta
          property="twitter:description"
          content="Financial management for family"
        />
        <meta property="twitter:image" content="/static/vercel.svg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  )
}

export default MyApp

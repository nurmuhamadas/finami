import { Fragment } from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Finami - </title>
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
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp

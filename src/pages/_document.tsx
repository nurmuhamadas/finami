import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html
        style={{
          height: '100%',
          scrollBehavior: 'smooth',
        }}
      >
        <Head>
          <link
            rel="preload"
            href="/fonts/Nunito/Nunito-Black.ttf"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/Nunito/Nunito-ExtraBold.ttf"
            as="style"
          />
          <link rel="preload" href="/fonts/Nunito/Nunito-Bold.ttf" as="style" />
          <link
            rel="preload"
            href="/fonts/Nunito/Nunito-Medium.ttf"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/Nunito/Nunito-Regular.ttf"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/Nunito/Nunito-Light.ttf"
            as="style"
          />

          <link rel="preload" href="/fonts/Lora/Lora-Bold.ttf" as="style" />
          <link rel="preload" href="/fonts/Lora/Lora-Medium.ttf" as="style" />
          <link rel="preload" href="/fonts/Lora/Lora-Regular.ttf" as="style" />

          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Bold.ttf"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-SemiBold.ttf"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Medium.ttf"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Regular.ttf"
            as="style"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Light.ttf"
            as="style"
          />
        </Head>
        <body
          style={{
            height: '100%',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

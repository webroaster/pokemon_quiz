import Head from "next/head"
import { MantineProvider } from "@mantine/core"
import "../styles/globals.css"

export default function App(props) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>ポケモンクイズ</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <meta
          name='description'
          content='シンプルなポケモンクイズです。画像から名前を当ててください。'
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

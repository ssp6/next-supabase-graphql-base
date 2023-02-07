import { MuiThemeProvider } from '@/styles/MuiThemeProvider'
import { EmotionCache } from '@emotion/react'
import { NextPageWithLayout } from 'next'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'

type AppPropsWithLayout<Props = any> = AppProps<Props> & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

function App({
  Component,
  emotionCache,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <MuiThemeProvider emotionCache={emotionCache}>
      <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
    </MuiThemeProvider>
  )
}

export default App

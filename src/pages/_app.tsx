import { MuiThemeProvider } from '@/styles/MuiThemeProvider'
import { EmotionCache } from '@emotion/react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextPageWithLayout } from 'next'
import { AppProps } from 'next/app'
import { useState } from 'react'

type AppPropsWithLayout<Props = undefined> = AppProps<Props> & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

function App({
  Component,
  emotionCache,
  pageProps: { initialSession, ...pageProps },
}: AppPropsWithLayout<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <MuiThemeProvider emotionCache={emotionCache}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
        {getLayout(<Component {...pageProps} />)}
      </SessionContextProvider>
    </MuiThemeProvider>
  )
}

export default App

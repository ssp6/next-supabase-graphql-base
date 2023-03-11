import { MuiThemeProvider } from '@/styles/MuiThemeProvider'
import { EmotionCache } from '@emotion/react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextPageWithLayout } from 'next'
import { AppProps } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'

type AppPropsWithLayout<Props = undefined> = AppProps<Props> & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL
  }

  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return 'http://localhost:3000'
}

function App({
  Component,
  emotionCache,
  pageProps: { initialSession, ...pageProps },
}: AppPropsWithLayout<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      // Supabase is proxied through the Next.js API route to make secure
      supabaseUrl: getBaseUrl() + '/api/auth',
      supabaseKey: 'non-valid-supabase-key',
    }),
  )

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

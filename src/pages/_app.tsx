import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { withUrqlClient } from 'next-urql'
import type { AppProps } from 'next/app'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default withUrqlClient(() => ({ url: '/api/graphql' }))(App)

import { Container } from '@mui/material'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Component for UI to sign-up and log-in
 * Users Auth UI helpers but these can be replaced
 */
const LogIn = () => {
  const supabaseClient = useSupabaseClient()
  const session = useSession()
  const router = useRouter()
  const redirectTo = router.query.redirectTo as string | undefined

  useEffect(() => {
    if (session) {
      router.push(redirectTo || '/')
    }
  }, [session])

  return (
    <Container maxWidth={'sm'} sx={{ paddingTop: 8 }}>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        redirectTo={'http://localhost:3000/'}
      />
    </Container>
  )
}

export default LogIn

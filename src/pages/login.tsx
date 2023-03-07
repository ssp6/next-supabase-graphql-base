import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Container, TextField } from '@mui/material'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import validator from 'validator'

type FormData = {
  email: string
  password: string
}

/**
 * Component for UI to sign-up and log-in
 * Users Auth UI helpers but these can be replaced
 */
const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  const supabaseClient = useSupabaseClient()
  const session = useSession()
  const router = useRouter()
  const redirectTo = router.query.redirectTo as string | undefined

  useEffect(() => {
    if (session) {
      moveToNextPage()
    }
  }, [session])

  const moveToNextPage = () => router.push(redirectTo || '/')

  const signIn = async ({ email, password }: FormData) => {
    setLoading(true)
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)
    if (error) {
      setLoginError('Could not login: ' + error.message)
      return
    }

    moveToNextPage()
  }

  return (
    <Container maxWidth={'sm'} sx={{ paddingTop: 8 }}>
      <Box
        component={'form'}
        onSubmit={handleSubmit(signIn)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          // TODO: Add messaging to validation
          {...register('email', {
            required: true,
            validate: (value) => validator.isEmail(value),
          })}
          autoComplete={'email'}
          label={'Email address'}
          error={!!errors.email}
          // helperText={errors.email?.message}
        />
        <TextField
          // TODO: Add messaging to validation
          {...register('password', { minLength: 8, required: true })}
          autoComplete={'password'}
          label={'Password'}
          type={'password'}
          error={!!errors.password}
          // helperText={errors.password?.message}
        />
        {loginError && <Alert severity={'error'}>{loginError}</Alert>}
        <LoadingButton
          variant={'contained'}
          type={'submit'}
          disabled={!isValid}
          loading={loading}
          sx={{ marginTop: 2 }}
        >
          Log in
        </LoadingButton>
        <Link href={'/forgot-password'} passHref style={{ width: '100%' }}>
          <Button variant={'text'} fullWidth>
            Forgotten password?
          </Button>
        </Link>
        <Link href={'/sign-up'} passHref style={{ width: '100%' }}>
          <Button variant={'text'} fullWidth>
            Go to sign-up
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default Login

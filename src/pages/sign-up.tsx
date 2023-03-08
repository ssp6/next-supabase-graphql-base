import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Container, TextField } from '@mui/material'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { withUrqlClient } from 'next-urql'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CombinedError } from 'urql'
import validator from 'validator'
import { useCreateUserMutation } from '../domain/graphql/generated'
import { GraphqlUrl } from '../domain/graphql/graphql-url'

type FormData = {
  email: string
  name: string
  password: string
}

/**
 * Component for UI to sign-up and log-in
 * Users Auth UI helpers but these can be replaced
 */
const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [signUpError, setSignUpError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
  })
  const [{ fetching: mutationLoading }, createUserMutation] = useCreateUserMutation()

  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const moveToNextPage = () => router.push('/assignments')

  const signUp = async ({ email, password, name }: FormData) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    })
    // TODO: Create user in database as well — will need mutation

    setLoading(false)
    if (error) {
      setSignUpError('Could not sign-up: ' + error.message)
      return
    }

    try {
      await createUserMutation({
        name,
      })
    } catch (error: any) {
      const errorResponse = error as CombinedError
      setSignUpError(
        `Account partially created. Please contact support with your email address\nError: ${errorResponse.message}`,
      )
      return
    }

    moveToNextPage()
  }

  return (
    <Container maxWidth={'sm'} sx={{ paddingTop: 8 }}>
      <Box
        component={'form'}
        onSubmit={handleSubmit(signUp)}
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
          {...register('name', {
            required: true,
          })}
          autoComplete={'name'}
          label={'Name'}
          error={!!errors.name}
          // helperText={errors.name?.message}
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
        {signUpError && <Alert severity={'error'}>{signUpError}</Alert>}
        <LoadingButton
          variant={'contained'}
          type={'submit'}
          disabled={!isValid}
          loading={loading || mutationLoading}
          sx={{ marginTop: 2 }}
        >
          Sign-up
        </LoadingButton>
        <Link href={'/login'} passHref style={{ width: '100%' }}>
          <Button variant={'text'} fullWidth>
            Go to login page
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default withUrqlClient(() => ({
  url: GraphqlUrl,
}))(SignUp)

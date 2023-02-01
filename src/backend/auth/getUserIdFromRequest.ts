import { getToken } from 'next-auth/jwt'

export const getUserIdFromRequest = async (context: any) => {
  const token = await getToken({
    req: context?.req ?? 'No request',
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (process.env.NODE_ENV === 'development') {
    const rawToken = context?.req?.cookies?.['next-auth.session-token']
    console.log('rawToken', rawToken)
  }

  return token?.sub
}

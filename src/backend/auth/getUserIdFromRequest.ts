import { getToken } from 'next-auth/jwt'

export const getUserIdFromRequest = async (context: any) => {
  const token = await getToken({
    req: context?.req ?? 'No request',
    secret: process.env.NEXTAUTH_SECRET,
  })

  return token?.sub
}

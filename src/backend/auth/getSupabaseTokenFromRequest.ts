import jwt_decode from 'jwt-decode'
import { NextApiRequest } from 'next'

type Token = {
  [key: string]: string
}

/**
 * Gets the supbase token from the request object's cookies
 * @param req http request object
 */
export const getSupabaseTokenFromRequest = (req?: NextApiRequest): Token | null => {
  const supabaseBaseCookie = req?.cookies?.['supabase-auth-token']
  const parsedCookie = supabaseBaseCookie ? JSON.parse(supabaseBaseCookie) : null
  const jwtString = parsedCookie?.[0] ? parsedCookie[0] : null
  return jwtString ? jwt_decode(jwtString) : null
}

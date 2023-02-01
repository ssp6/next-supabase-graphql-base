import { rule } from 'graphql-shield'
import { getToken } from 'next-auth/jwt'

/**
 * Rule that user must have a valid token to access the resource.
 */
export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { req }, _info) => {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })
    return Boolean(token)
  },
)

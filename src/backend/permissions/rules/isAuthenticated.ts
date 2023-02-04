import { rule } from 'graphql-shield'
import { getUserIdFromRequest } from '../../auth/getUserIdFromRequest'

/**
 * Rule that user must have a valid token to access the resource.
 */
export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, context, _info) => {
    console.log('context.req', context?.req ?? 'No request')
    const userId = await getUserIdFromRequest(context)
    return Boolean(userId)
  },
)

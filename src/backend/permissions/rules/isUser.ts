import { rule } from 'graphql-shield'
import { getUserIdFromRequest } from '../../auth/getUserIdFromRequest'

/**
 * Rule that token used to access must match to the user id
 */
export const isUser = rule({ cache: 'contextual' })(async (_parent, _args, context, _info) => {
  const signedInUserId = await getUserIdFromRequest(context)
  const userIdFetchingFor = _parent.id
  return signedInUserId === userIdFetchingFor
})

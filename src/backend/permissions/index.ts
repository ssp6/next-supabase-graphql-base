import { allow, shield } from 'graphql-shield'
import { isAuthenticated } from './rules/isAuthenticated'

export const permissions = shield(
  {
    Query: {
      '*': isAuthenticated,
      assignment: allow,
    },
    Mutation: {
      '*': isAuthenticated,
    },
    User: {
      // privateField: isUser, // TODO: Uncomment this line for any fields that should be private
    },
  },
  {
    allowExternalErrors: true,
  },
)

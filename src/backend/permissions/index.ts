import { allow, shield } from 'graphql-shield'
import { isAuthenticated } from './rules/isAuthenticated'
import { isUser } from './rules/isUser'

export const permissions = shield({
  Query: {
    '*': isAuthenticated,
    assignment: allow,
  },
  Mutation: {
    '*': isAuthenticated,
  },
  User: {
    email: isUser,
  },
})

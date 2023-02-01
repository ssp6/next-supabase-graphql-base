import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import { applyMiddleware } from 'graphql-middleware'
import { DateResolver } from 'graphql-scalars'
import { permissions } from '../permissions'
import prisma from '../prisma'
import PrismaTypes from '../prisma/pothos-types'
import { addUserToGraphql } from './user'

/**
 * File with all of graphql schema
 */
const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

export type BuilderType = typeof builder

builder.queryType({})

// TODO: Uncomment when create first user mutation is implemented
builder.mutationType({})

builder.addScalarType('Date', DateResolver, {})

addUserToGraphql(builder)

export const schema = applyMiddleware(builder.toSchema(), permissions)

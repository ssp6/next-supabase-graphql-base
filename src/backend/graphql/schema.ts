import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import prisma from '../prisma'
import { addUserToGraphql } from './user'

/**
 * File with all of graphql schema
 */
const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

export type BuilderType = typeof builder

builder.queryType({})

// TODO: Uncomment when create first user mutation is implemented
// builder.mutationType({})

addUserToGraphql(builder)

export const schema = builder.toSchema()

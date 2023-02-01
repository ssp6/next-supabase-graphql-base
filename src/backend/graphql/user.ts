import prisma from '../prisma'
import type { BuilderType } from './schema'

/**
 * Adds all the user related graphql types queries and mutations
 * @param builder Schema builder to add user to
 */
export const addUserToGraphql = (builder: BuilderType) => {
  builder.prismaObject('User', {
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name', { nullable: true }),
      email: t.exposeString('email', { nullable: true }),
      image: t.exposeString('image', { nullable: true }),
    }),
  })

  builder.queryField('users', (t) =>
    t.prismaField({
      type: ['User'],
      resolve: async (query, _parent, _args, _info) =>
        prisma.user.findMany({
          ...query,
        }),
    }),
  )

  builder.mutationField('updateUserName', (t) =>
    t.prismaField({
      type: 'User',
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: async (query, _parent, args, _info) => {
        return prisma.user.update({
          ...query,
          where: {
            id: args.name,
          },
          data: {
            name: args.name,
          },
        })
      },
    }),
  )
}

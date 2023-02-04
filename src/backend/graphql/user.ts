import { getUserIdFromRequest } from '../auth/getUserIdFromRequest'
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
      createdAt: t.expose('createdAt', {
        type: 'Date',
      }),
    }),
  })

  builder.queryField('me', (t) =>
    t.prismaField({
      type: 'User',
      resolve: async (query, _parent, _args, context, _info) => {
        const userId = await getUserIdFromRequest(context)
        if (!userId) throw new Error('Not authenticated')

        return prisma.user.findUniqueOrThrow({
          ...query,
          where: {
            id: userId!,
          },
        })
      },
    }),
  )

  builder.mutationField('updateUser', (t) =>
    t.prismaField({
      type: 'User',
      args: {
        name: t.arg.string({ required: false }),
        email: t.arg.string({ required: false }),
      },
      resolve: async (query, _parent, args, context, _info) => {
        const userId = await getUserIdFromRequest(context)
        if (!userId) throw new Error('Not authorized!')
        return prisma.user.update({
          ...query,
          where: {
            id: userId,
          },
          data: {
            ...(args.name && { name: args.name }),
            ...(args.email && { email: args.email }),
          },
        })
      },
    }),
  )
}

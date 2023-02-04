import { getUserIdFromRequest } from '../auth/getUserIdFromRequest'
import prisma from '../prisma'
import { BuilderType } from './schema'

/**
 * Adds all the assignment related graphql types queries and mutations
 * @param builder
 */
export const addAssignmentToGraphql = (builder: BuilderType) => {
  builder.prismaObject('Assignment', {
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      pdfFileUrl: t.exposeString('pdfFileUrl'),
      creator: t.relation('creator'),
      createdAt: t.expose('createdAt', {
        type: 'Date',
      }),
    }),
  })

  builder.mutationField('createAssignment', (t) =>
    t.prismaField({
      type: 'Assignment',
      args: {
        name: t.arg.string({ required: true }),
        pdfFileUrl: t.arg.string({ required: true }),
      },
      resolve: async (_query, _parent, args, context, _info) => {
        const userId = await getUserIdFromRequest(context)
        if (!userId) throw new Error('Not authenticated')

        return prisma.assignment.create({
          data: {
            name: args.name,
            pdfFileUrl: args.pdfFileUrl,
            creatorId: userId,
          },
        })
      },
    }),
  )

  builder.queryField('myAssignments', (t) =>
    t.prismaField({
      type: ['Assignment'],
      resolve: async (query, _parent, _args, context, _info) => {
        const userId = await getUserIdFromRequest(context)
        if (!userId) throw new Error('Not authenticated')

        return prisma.assignment.findMany({
          ...query,
          where: {
            creatorId: userId,
          },
        })
      },
    }),
  )

  builder.queryField('assignment', (t) =>
    t.prismaField({
      type: 'Assignment',
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (query, _parent, args, _context, _info) => {
        return prisma.assignment.findUniqueOrThrow({
          ...query,
          where: {
            id: String(args.id),
          },
        })
      },
    }),
  )
}

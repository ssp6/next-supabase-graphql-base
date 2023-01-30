import { schema } from '@/backend/graphql/schema'
import { createYoga } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from 'next'

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
})

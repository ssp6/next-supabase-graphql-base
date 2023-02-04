import { schema } from '@/backend/graphql/schema'
import { executeExchange } from '@urql/exchange-execute'
import { initUrqlClient } from 'next-urql'
import { GetServerSidePropsContext } from 'next/types'
import { cacheExchange, dedupExchange, ssrExchange } from 'urql'

/**
 * Helper function for calling graphql queries in getServerSideProps
 *
 * Apply using:
 * await client?.query(MyAssignmentsDocument, {}).toPromise()
 * ... more queries here if desire
 *
 *   return {
 *     props: {
 *       urqlState: ssrCache.extractData(),
 *     },
 *   }
 *
 * @param req Request object from getServerSideProps
 */
export const graphqlGetServerSideProps = ({ req }: { req: GetServerSidePropsContext['req'] }) => {
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: 'there is no url, executeExchange makes direct call to graphql resolver',
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        executeExchange({
          schema,
          context: {
            req, // Pipes straight into permissions rules
          },
        }),
      ],
    },
    false,
  )

  return {
    ssrCache,
    client,
  }
}

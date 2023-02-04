import { GraphqlUrl } from '@/domain/graphql/graphql-url'
import { NextPageWithLayout } from 'next'
import { useSession } from 'next-auth/react'
import { withUrqlClient } from 'next-urql'
import { FormEvent } from 'react'
import {
  useCreateAssignmentMutation,
  useMeQuery,
  useMyAssignmentsQuery,
} from '../domain/graphql/generated'

/**
 * A basic page for creating an assignment and listing all of your assignments
 */
const Assignments: NextPageWithLayout = () => {
  const [{ data: assignments, fetching: assignmentsLoading, error: assignmentsError }, fetch] =
    useMyAssignmentsQuery()
  const { data: session } = useSession()
  // TODO: Remove, just for testing
  const [{ data: user, fetching }] = useMeQuery({
    pause: !session,
  })
  console.log('user', user)
  const [
    { fetching: createAssignmentLoading, error: createAssignmentError },
    createAssignmentMutation,
  ] = useCreateAssignmentMutation()

  const loading = assignmentsLoading || createAssignmentLoading
  const error = assignmentsError || createAssignmentError

  if (error) {
    console.error(error)
  }

  const createAssignment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const assignmentName = formData.get('assignment-name')
    const pdfFileUrl = formData.get('pdfFileUrl')
    if (!assignmentName || !pdfFileUrl) {
      return alert('Please fill out all fields')
    }

    await createAssignmentMutation({
      name: assignmentName.toString(),
      pdfFileUrl: pdfFileUrl.toString(),
    })
  }

  const callFetch = async () => {
    console.log('fetching')
    try {
      await fetch({
        requestPolicy: 'network-only',
        url: GraphqlUrl,
      })
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        height: '100vh',
        padding: '62px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <h1>Assignments!</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <button onClick={() => callFetch()}>Refetch</button>
          <form
            onSubmit={createAssignment}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <input type="text" placeholder="Assignment name" name={'assignment-name'} />
            <input type="text" placeholder="Assignment description" name={'pdfFileUrl'} />
            <input type="submit" value="Create" />
          </form>

          <h2>My assignments</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {assignments?.myAssignments.map((assignment) => (
              <div key={assignment.id} style={{ background: 'white', padding: '12px 24px' }}>
                <h3>{assignment.name}</h3>
                <p>{assignment.pdfFileUrl}</p>
                <p>{assignment.createdAt}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { client, ssrCache } = graphqlGetServerSideProps({ req })
//   await client?.query(MyAssignmentsDocument, {}).toPromise()
//
//   return {
//     props: {
//       urqlState: ssrCache.extractData(),
//     },
//   }
// }

export default withUrqlClient(() => ({ url: GraphqlUrl }))(Assignments)

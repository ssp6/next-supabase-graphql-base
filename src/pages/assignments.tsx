import { GraphqlUrl } from '@/domain/graphql/graphql-url'
import { NextPageWithLayout } from 'next'
import { withUrqlClient } from 'next-urql'
import { FormEvent } from 'react'
import { useCreateAssignmentMutation, useMyAssignmentsQuery } from '../domain/graphql/generated'

/**
 * A basic page for creating an assignment and listing all of your assignments
 */
const Assignments: NextPageWithLayout = () => {
  const [{ data: assignments, fetching: assignmentsLoading, error: assignmentsError }] =
    useMyAssignmentsQuery({
      requestPolicy: 'cache-and-network',
    })
  const [
    { fetching: createAssignmentLoading, error: createAssignmentError },
    createAssignmentMutation,
  ] = useCreateAssignmentMutation()

  const error = assignmentsError || createAssignmentError

  if (error) {
    console.error(error)
  }

  const createAssignment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const assignmentName = formData.get('assignment-name')
    const pdfFileUrl = formData.get('pdfFileUrl')
    if (!assignmentName || !pdfFileUrl) {
      return alert('Please fill out all fields')
    }

    createAssignmentMutation({
      name: assignmentName.toString(),
      pdfFileUrl: pdfFileUrl.toString(),
    })
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
      {assignmentsLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <form
            onSubmit={createAssignment}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <input type="text" placeholder="Assignment name" name={'assignment-name'} />
            <input type="text" placeholder="Assignment description" name={'pdfFileUrl'} />
            <input
              type="submit"
              value={createAssignmentLoading ? 'Loading' : 'Create'}
              disabled={createAssignmentLoading}
            />
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

export default withUrqlClient(() => ({
  url: GraphqlUrl,
}))(Assignments)

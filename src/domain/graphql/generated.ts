import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type Assignment = {
  __typename?: 'Assignment'
  createdAt: Scalars['Date']
  creator: User
  id: Scalars['ID']
  name: Scalars['String']
  pdfFileUrl: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createAssignment: Assignment
  updateUser: User
}

export type MutationCreateAssignmentArgs = {
  name: Scalars['String']
  pdfFileUrl: Scalars['String']
}

export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  assignment: Assignment
  me: User
  myAssignments: Array<Assignment>
}

export type QueryAssignmentArgs = {
  id: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['Date']
  email?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type CreateAssignmentMutationVariables = Exact<{
  name: Scalars['String']
  pdfFileUrl: Scalars['String']
}>

export type CreateAssignmentMutation = {
  __typename?: 'Mutation'
  createAssignment: {
    __typename?: 'Assignment'
    id: string
    name: string
    pdfFileUrl: string
    createdAt: any
  }
}

export type MyAssignmentsQueryVariables = Exact<{ [key: string]: never }>

export type MyAssignmentsQuery = {
  __typename?: 'Query'
  myAssignments: Array<{
    __typename?: 'Assignment'
    id: string
    name: string
    pdfFileUrl: string
    createdAt: any
  }>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me: { __typename?: 'User'; id: string; name?: string | null; email?: string | null }
}

export const CreateAssignmentDocument = gql`
  mutation CreateAssignment($name: String!, $pdfFileUrl: String!) {
    createAssignment(name: $name, pdfFileUrl: $pdfFileUrl) {
      id
      name
      pdfFileUrl
      createdAt
    }
  }
`

export function useCreateAssignmentMutation() {
  return Urql.useMutation<CreateAssignmentMutation, CreateAssignmentMutationVariables>(
    CreateAssignmentDocument,
  )
}
export const MyAssignmentsDocument = gql`
  query MyAssignments {
    myAssignments {
      id
      name
      pdfFileUrl
      createdAt
    }
  }
`

export function useMyAssignmentsQuery(
  options?: Omit<Urql.UseQueryArgs<MyAssignmentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MyAssignmentsQuery, MyAssignmentsQueryVariables>({
    query: MyAssignmentsDocument,
    ...options,
  })
}
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options })
}

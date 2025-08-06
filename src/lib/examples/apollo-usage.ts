import { gql, useQuery, useMutation } from '@apollo/client'
import { apolloClient } from '../apollo-client'

// Example GraphQL Query
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    userProfile {
      id
      email
      firstName
      lastName
      username
      # Add other user fields as needed
    }
  }
`

// Example GraphQL Mutation
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      success
      errors {
        field
        message
      }
      user {
        id
        email
        firstName
        lastName
        username
      }
    }
  }
`

// Example React Hook for using the query
export const useUserProfile = () => {
  return useQuery(GET_USER_PROFILE, {
    client: apolloClient,
    errorPolicy: 'all',
  })
}

// Example React Hook for using the mutation
export const useUpdateProfile = () => {
  return useMutation(UPDATE_USER_PROFILE, {
    client: apolloClient,
  })
}

// Example of making a direct Apollo Client call
export const fetchUserData = async () => {
  try {
    const { data } = await apolloClient.query({
      query: GET_USER_PROFILE,
    })
    return data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

// Example of making a direct mutation call
export const updateUserProfile = async (input: { [key: string]: unknown }) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_USER_PROFILE,
      variables: { input },
    })
    return data
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
} 
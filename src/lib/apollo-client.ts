import { ApolloClient, InMemoryCache, createHttpLink, from, Operation, NextLink, Observable } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'
// @ts-ignore: Ignore missing type declarations for apollo-upload-client
import { createUploadLink } from 'apollo-upload-client'

// Track if we're already refreshing to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  
  failedQueue = []
}

// Upload link with proper CORS handling
const uploadLink = createUploadLink({
  uri: 'https://uat-api.vmodel.app/vla/graphql/uploads/',
  credentials: 'include', // Changed from 'same-origin' to 'include' for consistency
  fetchOptions: {
    mode: 'cors', // Explicitly set CORS mode
  },
})

// Auth Link - adds auth token to requests
const authLink = setContext(async (_, { headers, includeAuth = true }) => {
  if (includeAuth === false) return { headers }
  
  let token = null
  if (typeof window !== 'undefined') {
    token = Cookies.get('auth_token')
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json', // Ensure proper content type
    }
  }
})

// Error Link - handles auth errors and token refresh
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error('GraphQL error:', err)
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        return handleTokenRefresh(operation, forward)
      }
    }
    // Keep original logging for compatibility
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }

  if (networkError) {
    console.error('Network error:', networkError)
    console.log(`[Network error]: ${networkError}`)
    
    // Handle CORS errors specifically
    if (networkError.message?.includes('CORS') || networkError.message?.includes('Failed to fetch')) {
      console.error('CORS error detected. Please check if the API endpoint allows requests from your domain.')
      console.log('CORS error detected. Check server configuration.')
      // Don't redirect on CORS errors - let the user handle it
      return
    }
    
    // Handle authentication errors
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      clearAuthCookies()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    
    // Alternative check for ServerError type
    if ('response' in networkError && networkError.response?.status === 401) {
      clearAuthCookies()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
  }
})

// Extract token refresh logic into separate function
const handleTokenRefresh = (operation: Operation, forward: NextLink) => {
  return new Observable(observer => {
    if (!isRefreshing) {
      isRefreshing = true
      
      refreshToken()
        .then((newToken) => {
          processQueue(null, newToken)
          
          // Update the operation with new token
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${newToken}`,
            },
          })
          
          // Retry the operation
          forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch((error) => {
          processQueue(error)
          observer.error(error)
          
          // Clear tokens and redirect to login
          clearAuthCookies()
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        })
        .finally(() => {
          isRefreshing = false
        })
    } else {
      // Already refreshing, queue this request
      failedQueue.push({
        resolve: (token: string) => {
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${token}`,
            },
          })
          
          forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        },
        reject: observer.error.bind(observer)
      })
    }
  })
}

// Improved token refresh function with better error handling
const refreshToken = async (): Promise<string> => {
  const refreshTokenValue = Cookies.get('refresh_token')
  
  if (!refreshTokenValue) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await fetch(`https://uat-api.vmodel.app/vla/graphql/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors', // Explicitly set CORS mode
      body: JSON.stringify({
        query: `
          mutation RefreshToken($refreshToken: String!) {
            refreshToken(refreshToken: $refreshToken) {
              token
              refreshToken
              refreshExpiresIn
            }
          }
        `,
        variables: { refreshToken: refreshTokenValue }
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.errors) {
      console.error('GraphQL errors in refresh token response:', result.errors)
      throw new Error('GraphQL errors in refresh token response')
    }
    
    if (result.data?.refreshToken?.token) {
      // Save new tokens using js-cookie
      Cookies.set('auth_token', result.data.refreshToken.token, { expires: 7, secure: true, sameSite: 'strict' })
      Cookies.set('refresh_token', result.data.refreshToken.refreshToken, { expires: 30, secure: true, sameSite: 'strict' })
      
      return result.data.refreshToken.token
    }
    
    throw new Error('No token in refresh response')
  } catch (error) {
    console.error('Token refresh failed:', error)
    throw error
  }
}

// Cookie utilities using js-cookie for consistency
export const saveAuthData = (token: string, refreshToken: string, userData?: unknown) => {
  Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict' })
  Cookies.set('refresh_token', refreshToken, { expires: 30, secure: true, sameSite: 'strict' })
  if (userData) {
    Cookies.set('user_data', JSON.stringify(userData), { expires: 7, secure: true, sameSite: 'strict' })
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return Cookies.get('auth_token') || null
}

export const getUserData = (): unknown => {
  if (typeof window === 'undefined') return null
  const userData = Cookies.get('user_data')
  try {
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Failed to parse user data:', error)
    return null
  }
}

export const clearAuthCookies = () => {
  Cookies.remove('auth_token')
  Cookies.remove('refresh_token')
  Cookies.remove('user_data')
}

// Apollo Client with improved configuration following the first file's pattern
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add any field policies here if needed
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // Keep original fetch policy
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'network-only', // Keep original fetch policy
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})
import { ApolloClient, InMemoryCache, createHttpLink, from, Operation, NextLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { API_BASE_URL, COOKIE_NAMES } from './constants'


// HTTP Link
const httpLink = createHttpLink({
  uri: "https://uat-api.vmodel.app/skool/graphql",
  credentials: 'include',
})

// Auth Link - adds auth token to requests
const authLink = setContext(async (_, { headers }) => {
  // Get token from cookies (client-side)
  let token = null
  if (typeof window !== 'undefined') {
    token = getCookie(COOKIE_NAMES.AUTH_TOKEN)
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

// Error Link - handles auth errors and token refresh
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Handle authentication errors
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        // Token expired, try to refresh
        refreshTokenAndRetry(operation, forward)
        return
      }
    }
  }

  if (networkError) {
    console.error('Network error:', networkError)
  }
})

// Token refresh function
const refreshTokenAndRetry = async (operation: Operation, forward: NextLink) => {
  const refreshToken = getCookie(COOKIE_NAMES.REFRESH_TOKEN)
  
  if (!refreshToken) {
    // No refresh token, redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    return
  }

  try {
    // Call refresh token mutation
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
        variables: { refreshToken }
      })
    })

    const result = await response.json()
    
    if (result.data?.refreshToken?.token) {
      // Save new tokens
      setCookie(COOKIE_NAMES.AUTH_TOKEN, result.data.refreshToken.token, 7)
      setCookie(COOKIE_NAMES.REFRESH_TOKEN, result.data.refreshToken.refreshToken, 30)
      
      // Retry the original operation
      const oldHeaders = operation.getContext().headers
      operation.setContext({
        headers: {
          ...oldHeaders,
          authorization: `Bearer ${result.data.refreshToken.token}`,
        },
      })
      
      return forward(operation)
    }
  } catch (error) {
    console.error('Token refresh failed:', error)
    // Clear tokens and redirect to login
    clearAuthCookies()
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }
}

// Cookie utilities
export const setCookie = (name: string, value: string, days: number) => {
  if (typeof window === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null
  
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}

export const clearAuthCookies = () => {
  deleteCookie(COOKIE_NAMES.AUTH_TOKEN)
  deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
  deleteCookie(COOKIE_NAMES.USER_DATA)
}

// Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
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
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

// GraphQL Mutations
export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        field
        message
      }
      success
      token
      refreshExpiresIn
      refreshToken
    }
  }
`

export const REGISTER_MUTATION = `
  mutation Register($code: String!, $email: String!, $firstName: String!, $lastName: String!, $password1: String!, $password2: String!, $username: String!) {
    register(code: $code, email: $email, firstName: $firstName, lastName: $lastName, password1: $password1, password2: $password2, username: $username) {
      errors {
        field
        message
      }
      success
    }
  }
`

// Auth utilities
export const saveAuthData = (token: string, refreshToken: string, userData?: unknown) => {
  setCookie(COOKIE_NAMES.AUTH_TOKEN, token, 7)
  setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, 30)
  if (userData) {
    setCookie(COOKIE_NAMES.USER_DATA, JSON.stringify(userData), 7)
  }
}

export const getAuthToken = (): string | null => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN)
}

export const getUserData = (): unknown => {
  const userData = getCookie(COOKIE_NAMES.USER_DATA)
  return userData ? JSON.parse(userData) : null
} 
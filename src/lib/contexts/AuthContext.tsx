'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { AuthContextType, User, RegisterInput, AuthError } from '../types/auth'
import {
  apolloClient,
  saveAuthData,
  clearAuthCookies,
  getUserData,
  getAuthToken,
} from '../apollo-client'
import { plainApolloClient } from '../plain-client'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    if (typeof window === 'undefined') {
      // SSR-safe surface with correct error typing
      const toAuthErrors = (msg: string): AuthError[] => [{ message: msg }]
      return {
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: async () => ({ success: false, errors: toAuthErrors('Not available during SSR') }),
        register: async () => ({ success: false, errors: toAuthErrors('Not available during SSR') }),
        logout: () => {},
        refreshToken: async () => false,
      }
    }
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

/* ===========================
   Type guards + normalizer
   =========================== */
function isAuthError(val: unknown): val is AuthError {
  if (typeof val !== 'object' || val === null) return false
  const rec = val as Record<string, unknown>
  if (typeof rec.message !== 'string') return false
  if (rec.field !== undefined && typeof rec.field !== 'string') return false
  return true
}

function isAuthErrorArray(val: unknown): val is AuthError[] {
  return Array.isArray(val) && val.every(isAuthError)
}

function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((s) => typeof s === 'string')
}

/** Normalize unknown error shapes to AuthError[] */
function toAuthErrors(errs?: unknown, fallback = 'An unexpected error occurred'): AuthError[] {
  if (!errs) return [{ message: fallback }]
  if (isAuthErrorArray(errs)) return errs
  if (isStringArray(errs)) return errs.map((message) => ({ message }))
  if (typeof errs === 'string') return [{ message: errs }]
  return [{ message: fallback }]
}

// ✅ include $code variable properly
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String, $code: String) {
    login(email: $email, password: $password, code: $code) {
      errors
      success
      token
      refreshExpiresIn
      refreshToken
    }
  }
`

const REGISTER_MUTATION = gql`
  mutation Register(
    $code: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password1: String!
    $password2: String!
    $username: String!
  ) {
    register(
      code: $code
      email: $email
      firstName: $firstName
      lastName: $lastName
      password1: $password1
      password2: $password2
      username: $username
    ) {
      errors
      success
    }
  }
`

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    const initializeAuth = () => {
      try {
        const token = getAuthToken()
        const userData = getUserData()

        if (token && userData) {
          setUser(userData as User)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Auth initialization error:', error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }
    initializeAuth()
  }, [isClient])

  // ✅ Accept either password OR code, and always return AuthError[] on failure
  const login: AuthContextType['login'] = async (email, password, code) => {
    if (!isClient) {
      return { success: false, errors: toAuthErrors('Not available during SSR') }
    }

    try {
      const { data } = await plainApolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password, code },
      })

      const response = data?.login
      if (response?.success && response?.token) {
        saveAuthData(response.token, response.refreshToken || '', {
          email,
          firstName: '',
          lastName: '',
          username: email.split('@')[0],
          id: 'temp-id',
        })

        setUser({
          id: 'temp-id',
          email,
          firstName: '',
          lastName: '',
          username: email.split('@')[0],
        })
        setIsAuthenticated(true)

        return { success: true }
      }

      return {
        success: false,
        errors: toAuthErrors(response?.errors, 'Login failed'),
      }
    } catch (err: unknown) {
      let message = 'An unexpected error occurred'
      if (err instanceof Error) message = err.message
      else if (typeof err === 'string') message = err
      // eslint-disable-next-line no-console
      console.error('Login error:', message)
      return { success: false, errors: toAuthErrors(message) }
    }
  }

  const register: AuthContextType['register'] = async (data: RegisterInput) => {
    if (!isClient) {
      return { success: false, errors: toAuthErrors('Not available during SSR') }
    }

    try {
      const { data: responseData } = await plainApolloClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: data,
      })

      const response = responseData?.register
      if (response?.success) {
        return { success: true }
      }
      return { success: false, errors: toAuthErrors(response?.errors, 'Registration failed') }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Registration error:', error)
      return { success: false, errors: toAuthErrors('An unexpected error occurred') }
    }
  }

  const logout = () => {
    if (!isClient) return
    clearAuthCookies()
    setUser(null)
    setIsAuthenticated(false)
    apolloClient.clearStore()
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    if (!isClient) return false
    try {
      // Implement actual refresh mutation here if available
      return false
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Token refresh error:', error)
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading: isLoading || !isClient,
    login,
    register,
    logout,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

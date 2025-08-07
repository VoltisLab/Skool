'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { AuthContextType, User, RegisterInput } from '../types/auth'
import { apolloClient, saveAuthData, clearAuthCookies, getUserData, getAuthToken } from '../apollo-client'
import { AUTH_STATUS, AuthStatus } from '../constants'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // Return a default context instead of throwing during SSR
    if (typeof window === 'undefined') {
      return {
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: async () => ({ success: false, errors: [{ message: 'Not available during SSR' }] }),
        register: async () => ({ success: false, errors: [{ message: 'Not available during SSR' }] }),
        logout: () => {},
        refreshToken: async () => false
      }
    }
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

// GraphQL Mutations
const LOGIN_MUTATION = gql`
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

const REGISTER_MUTATION = gql`
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize auth state on mount
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
        console.error('Auth initialization error:', error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [isClient])

  // Login function with improved error handling
  const login = async (email: string, password: string) => {
    if (!isClient) {
      return { success: false, errors: [{ message: 'Not available during SSR' }] }
    }

    try {
      setIsLoading(true)
      
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
        errorPolicy: 'all' // This will return both data and errors
      })

      const response = data?.login

      if (response?.success && response.token) {
        // Save auth data to cookies
        const userData = {
          email,
          firstName: '',
          lastName: '',
          username: email.split('@')[0],
          id: 'temp-id'
        }

        saveAuthData(
          response.token,
          response.refreshToken || '',
          userData
        )

        // Update state
        setUser(userData)
        setIsAuthenticated(true)

        return { success: true }
      } else {
        return { 
          success: false, 
          errors: response?.errors || [{ message: 'Login failed' }]
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Handle network errors specifically
      if (error.networkError) {
        if (error.networkError.message?.includes('CORS')) {
          return { 
            success: false, 
            errors: [{ message: 'Network error: Please check your internet connection or contact support' }]
          }
        }
        if (error.networkError.message?.includes('Failed to fetch')) {
          return { 
            success: false, 
            errors: [{ message: 'Unable to connect to server. Please try again later.' }]
          }
        }
      }
      
      // Handle GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return { 
          success: false, 
          errors: error.graphQLErrors.map((err: any) => ({ message: err.message }))
        }
      }
      
      return { 
        success: false, 
        errors: [{ message: 'An unexpected error occurred' }]
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Register function with improved error handling
  const register = async (data: RegisterInput) => {
    if (!isClient) {
      return { success: false, errors: [{ message: 'Not available during SSR' }] }
    }

    try {
      setIsLoading(true)
      
      // Generate username from email if not provided
      const registerData = {
        ...data,
        username: data.username || data.email.split('@')[0]
      }
      
      const { data: responseData } = await apolloClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: registerData,
        errorPolicy: 'all'
      })

      const response = responseData?.register

      if (response?.success) {
        return { success: true }
      } else {
        return { 
          success: false, 
          errors: response?.errors || [{ message: 'Registration failed' }]
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      
      // Handle network errors specifically
      if (error.networkError) {
        if (error.networkError.message?.includes('CORS')) {
          return { 
            success: false, 
            errors: [{ message: 'Network error: Please check your internet connection or contact support' }]
          }
        }
        if (error.networkError.message?.includes('Failed to fetch')) {
          return { 
            success: false, 
            errors: [{ message: 'Unable to connect to server. Please try again later.' }]
          }
        }
      }
      
      // Handle GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return { 
          success: false, 
          errors: error.graphQLErrors.map((err: any) => ({ message: err.message }))
        }
      }
      
      return { 
        success: false, 
        errors: [{ message: 'An unexpected error occurred' }]
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    if (!isClient) return

    try {
      clearAuthCookies()
      setUser(null)
      setIsAuthenticated(false)
      
      // Clear Apollo cache
      apolloClient.clearStore()
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Refresh token function
  const refreshToken = async (): Promise<boolean> => {
    if (!isClient) return false

    try {
      // This would typically call a refresh token mutation
      // For now, we'll just return false to force re-login
      return false
    } catch (error) {
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
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
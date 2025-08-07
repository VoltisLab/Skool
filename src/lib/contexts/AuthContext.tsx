'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { AuthContextType, User, RegisterInput } from '../types/auth'
import { apolloClient, saveAuthData, clearAuthCookies, getUserData, getAuthToken } from '../apollo-client'
import { plainApolloClient } from '../plain-client'
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
        login: async () => ({ success: false, errors: ['Not available during SSR'] }),
        register: async () => ({ success: false, errors: ['Not available during SSR'] }),
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

// GraphQL Mutations - Fixed to match your schema
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors
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

  // Login function
  const login = async (email: string, password: string) => {
    if (!isClient) {
      return { success: false, errors: ['Not available during SSR'] }
    }

    try {
      // setIsLoading(true)
      
      const { data } = await plainApolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password }
      })

      const response = data.login

      if (response.success && response.token) {
        // Save auth data to cookies
        saveAuthData(
          response.token,
          response.refreshToken || '',
          {
            email,
            // You might want to fetch user data from a separate query
            firstName: '',
            lastName: '',
            username: email.split('@')[0], // Fallback username
            id: 'temp-id' // You might want to get this from a user query
          }
        )

        // Update state
        setUser({
          id: 'temp-id',
          email,
          firstName: '',
          lastName: '',
          username: email.split('@')[0]
        })
        setIsAuthenticated(true)

        return { success: true }
      } else {
        return { 
          success: false, 
          errors: response.errors || ['Login failed']
        }
      }
    }catch (error: unknown) {
  let message = 'An unexpected error occurred';

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  console.error('Login error:', message);

  return {
    success: false,
    errors: message,
  };
}
  }

  // Register function
  const register = async (data: RegisterInput) => {
    if (!isClient) {
      return { success: false, errors: ['Not available during SSR'] }
    }

    try {
      // setIsLoading(true)
      
      const { data: responseData } = await plainApolloClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: data
      })

      const response = responseData.register

      if (response.success) {
        return { success: true }
      } else {
        return { 
          success: false, 
          errors: response.errors || ['Registration failed']
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        errors: ['An unexpected error occurred']
      }
    } finally {
      // setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    if (!isClient) return

    clearAuthCookies()
    setUser(null)
    setIsAuthenticated(false)
    
    // Clear Apollo cache
    apolloClient.clearStore()
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
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
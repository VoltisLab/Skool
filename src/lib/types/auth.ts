// GraphQL Types
export interface RegisterInput {
  code: string
  email: string
  firstName: string
  lastName: string
  password1: string
  password2: string
  username: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface AuthError {
  field?: string
  message: string
}

export interface RegisterResponse {
  errors: AuthError[]
  success: boolean
}

export interface LoginResponse {
  errors: AuthError[]
  success: boolean
  token?: string
  refreshExpiresIn?: number
  refreshToken?: string
}

// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
}

// Auth Context Types
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password?: string, code?: string) => Promise<{ success: boolean; errors?: AuthError[] }>
  register: (data: RegisterInput) => Promise<{ success: boolean; errors?: AuthError[] }>
  logout: () => void
  refreshToken: () => Promise<boolean>
} 
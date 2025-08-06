export const API_BASE_URL = 'https://uat-api.vmodel.app/skool/graphql'

export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data'
} as const

export const GRAPHQL_ENDPOINT = "https://uat-api.vmodel.app/skool/graphql";

export const AUTH_STATUS = {
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  LOADING: 'loading'
} as const

export type AuthStatus = typeof AUTH_STATUS[keyof typeof AUTH_STATUS] 
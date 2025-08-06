import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

import { createHttpLink } from '@apollo/client';
import { COOKIE_NAMES } from './constants';
// Upload link setup
const uploadLink = createHttpLink({
  uri: 'https://uat-api.vmodel.app/skool/graphql/uploads/',
  credentials: 'same-origin',
});

export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null
  return Cookies.get(name) || null
}

export const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return
  Cookies.remove(name, { path: '/' })
}


export const clearAuthCookies = () => {
  deleteCookie(COOKIE_NAMES.AUTH_TOKEN)
  deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
  deleteCookie(COOKIE_NAMES.USER_DATA)
}

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    if (networkError.message.includes('CORS')) {
      console.log('CORS error detected. Check server configuration.');
    }
  }
});

// Auth header setup
const authLink = setContext((_, { headers, includeAuth = true }) => {
  if (includeAuth === false) return { headers };
  const token = Cookies.get('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const saveAuthData = (token: string, refreshToken: string, userData?: unknown) => {
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  
  Cookies.set(COOKIE_NAMES.AUTH_TOKEN, token, { expires: 7, sameSite: 'lax', secure })
  Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, { expires: 30, sameSite: 'lax', secure })
  
  if (userData) {
    Cookies.set(COOKIE_NAMES.USER_DATA, JSON.stringify(userData), { expires: 7, sameSite: 'lax', secure })
  }
}

export const getAuthToken = (): string | null => {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN)
}

export const getUserData = (): unknown => {
  const userData = getCookie(COOKIE_NAMES.USER_DATA)
  return userData ? JSON.parse(userData) : null
}

// Apollo Client instance
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'network-only' },
    query: { fetchPolicy: 'network-only', errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
});

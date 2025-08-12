// src/lib/plain-apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const plainApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://uat-api.vmodel.app/skool/graphql/uploads/',
  }),
  cache: new InMemoryCache(),
});

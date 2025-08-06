'use client'

import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { apolloClient } from "@/lib/apollo-client";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
} 
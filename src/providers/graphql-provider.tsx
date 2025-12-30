import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/graphql/client';

export function GraphQLProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

import { keycloak } from '@/auth/lib/keycloak';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const { VITE_GRAPHQL_ENDPOINT } = import.meta.env;

// Ở môi trường deploy: cấu hình VITE_GRAPHQL_ENDPOINT = 'https://api.domain.com/graphql'
// Ở local dev: có thể bỏ trống, client sẽ dùng '/graphql' và đi qua proxy trong vite.config.ts
const GRAPHQL_URI = VITE_GRAPHQL_ENDPOINT || '/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = keycloak.token;

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

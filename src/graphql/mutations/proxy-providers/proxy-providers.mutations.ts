import { gql } from '../../utils/gql';

// Create Proxy Provider Mutation
export const CREATE_PROXY_PROVIDER_MUTATION = gql`
  mutation CreateProxyProvider(
    $name: String!
    $server: String!
    $apiKey: String!
    $userName: String!
    $password: String!
    $apiType: Int!
  ) {
    createProxyProvider(
      name: $name
      server: $server
      apiKey: $apiKey
      userName: $userName
      password: $password
      apiType: $apiType
    ) {
      id
      name
      server
      apiKey
      userName
      password
      apiType
    }
  }
`;

// Update Proxy Provider Mutation
export const UPDATE_PROXY_PROVIDER_MUTATION = gql`
  mutation UpdateProxyProvider(
    $id: String!
    $name: String
    $server: String
    $apiKey: String
    $userName: String
    $password: String
    $apiType: Int
  ) {
    updateProxyProvider(
      id: $id
      name: $name
      server: $server
      apiKey: $apiKey
      userName: $userName
      password: $password
      apiType: $apiType
    ) {
      id
      name
      server
      apiKey
      userName
      password
      apiType
    }
  }
`;

// Delete Proxy Provider Mutation
export const DELETE_PROXY_PROVIDER_MUTATION = gql`
  mutation DeleteProxyProvider($id: String!) {
    deleteProxyProvider(id: $id)
  }
`;


import { gql } from '../../utils/gql';

// Create Proxy Type Mutation
export const CREATE_PROXY_TYPE_MUTATION = gql`
  mutation CreateProxyType($name: String!, $type: String!) {
    createProxyType(name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

// Update Proxy Type Mutation
export const UPDATE_PROXY_TYPE_MUTATION = gql`
  mutation UpdateProxyType($id: String!, $name: String!, $type: String!) {
    updateProxyType(id: $id, name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

// Delete Proxy Type Mutation
export const DELETE_PROXY_TYPE_MUTATION = gql`
  mutation DeleteProxyType($id: String!) {
    deleteProxyType(id: $id)
  }
`;


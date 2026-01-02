import { gql } from '../../utils/gql';

// Create Loyal Mutation
export const CREATE_LOYAL_MUTATION = gql`
  mutation CreateLoyal($input: CreateLoyalInput!) {
    createLoyal(input: $input) {
      id
      name
      value
    }
  }
`;

// Update Loyal Mutation
export const UPDATE_LOYAL_MUTATION = gql`
  mutation UpdateLoyal($input: UpdateLoyalInput!) {
    updateLoyal(input: $input) {
      id
      name
      value
    }
  }
`;

// Delete Loyal Mutation
export const DELETE_LOYAL_MUTATION = gql`
  mutation DeleteLoyal($id: String!) {
    deleteLoyal(id: $id)
  }
`;


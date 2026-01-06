import { gql } from '../../utils/gql';

// Create Topup Mutation
export const CREATE_TOPUP_MUTATION = gql`
  mutation CreateTopup($name: String!, $max: Float!, $percent: Float!) {
    createTopup(name: $name, max: $max, percent: $percent) {
      id
      name
      max
      percent
    }
  }
`;

// Update Topup Mutation
export const UPDATE_TOPUP_MUTATION = gql`
  mutation UpdateTopup(
    $id: String!
    $name: String
    $max: Float
    $percent: Float
  ) {
    updateTopup(id: $id, name: $name, max: $max, percent: $percent) {
      id
      name
      max
      percent
    }
  }
`;

// Delete Topup Mutation
export const DELETE_TOPUP_MUTATION = gql`
  mutation DeleteTopup($id: String!) {
    deleteTopup(id: $id)
  }
`;

